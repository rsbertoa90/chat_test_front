<template>
    <div class="d-flex flex-column chat">
        <div v-if="admin && conversation" class="d-flex align-items-center header">
            <i class="material-icons">textsms</i>
            <div class="ml-2">
                <div id="header-name">{{conversation.client.name}}</div>
                <div v-if="hesWriting" class="header-status">escribiendo...</div>
                <div v-if="hesOnline" class="header-status">en linea</div>
            </div>
        </div>
        <div v-if="conversation" class="d-flex flex-column flex-grow-1">
            <div
                v-if="!empty"
                id="conversation"
                class="d-flex flex-column flex-grow-1 scrollbar-custom h-0 pb-2 chat-background"
                ref="conversation"
                @mouseover="iSawTheMessages()"
            >
                <div
                    class="d-flex item-container"
                    v-for="item in items"
                    :key="item.id"
                    :class="getItemContainerClass(item)"
                >
                    <span v-if="item.type=='DS'" class="day">{{item.day | date}}</span>

                    <div
                        class="message"
                        :ref="'messageRef'+item.id"
                        v-if="item.type.startsWith('M')"
                        :class="getMessageClass(item)"
                    >
                        <a :href="imagePath(item.url)" target="_blank" v-if="item.url">
                            <img :src="imagePath(item.url)" class="miniature-img" />
                        </a>
                        <span class="content" v-if="item.content">{{item.content}}</span>
                        <div class="info">
                            <span
                                v-if="admin && item && item.admin && item.user && item.user.id != user.id"
                                class="mr-3 time"
                            >enviado por {{item.user.name}}</span>
                            <span
                                v-if="admin && item && item.admin && item.user && item.user.id == user.id"
                                class="mr-3 time"
                            >enviado por ti</span>
                            <span class="time">{{ item.created_at | time }}</span>
                            <span
                                v-if="item.type=='MS'"
                                class="status fas"
                                :class="getCheckedIconClass(item)"
                            ></span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-else
                class="d-flex justify-content-center align-items-center h-100 chat-background"
            >
                <span class="d-flex">Chat vacío.</span>
            </div>
            <div v-if="conversation" class="form-container d-flex flex-column">
                <div class="row w-100 d-flex justify-content-between pl-4 mb-3" v-if="preview">
                    <div class="col-4">
                        <div class="preview-img">
                            <img :src="preview" v-if="preview" />
                        </div>
                    </div>
                    <div class="col-7 fcc" v-if="!admin">
                        <div
                            class="d-flex justify-content-center text-center mt-2 isaticket-q"
                        >¿ ESTAS ADJUNTANDO UN COMPROBANTE DE PAGO ?</div>
                        <div class="d-flex justify-content-around mt-2">
                            <button
                                class="btn btn-lg isaticket-a"
                                @click="isATicket=true"
                                :class="{'btn-success':isATicket,'btn-secondary':!isATicket}"
                            >SI</button>
                            <button
                                class="btn btn-lg isaticket-a"
                                @click="isATicket=false"
                                :class="{'btn-danger':!isATicket,'btn-secondary':isATicket}"
                            >NO</button>
                        </div>
                    </div>
                    <div class="col-1 p-0 d-flex flex-column">
                        <button class="mat m-1" @click="resetFileInput()">
                            <i class="material-icons">close</i>
                        </button>
                    </div>
                </div>
                <form
                    v-if="conversation"
                    @submit.prevent="sendMessage"
                    class="d-flex align-items-center message-form"
                >
                    <input
                        v-model="newMessage"
                        type="text"
                        class="form-control mat material-shadow-1"
                        @keypress="iSawTheMessages()"
                    />
                    <label class="adj-btn d-flex">
                        <i class="material-icons">attach_file</i>
                        <input
                            @change="onFileChange"
                            type="file"
                            name="file"
                            accept="image/x-png, image/gif, image/jpeg"
                            class="display-none"
                            ref="fileInput"
                        />
                    </label>
                    <button type="submit" :disabled="isSendDisabled" class="d-flex mat">
                        <i class="material-icons">send</i>
                    </button>
                </form>
            </div>
        </div>
        <div v-else class="d-flex justify-content-center align-items-center flex-grow-1">
            <span class="d-flex">Seleccione una conversación.</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isATicket: true,
            newMessage: "",
            imWriting: false,
            hesWriting: false,

            imOnline: true,
            hesOnline: false,

            imageUploaded: false,
            file: null,
            preview: null
        };
    },
    mounted() {
        var vm = this;
        /* conecto al socket */
        this.socket = this.$nuxtSocket({
            channel: "/index",
            reconnection: true
        });

        this.scrollToBottom();

        //cuando recibo un mensaje por el socket
        this.socket.on("newMessage", data => {
            if (
                data.user_id != vm.user.id &&
                data.conversation_id == vm.conversation.id
            ) {
                this.$store.commit(
                    "addMessageToActiveConversation",
                    data.message
                );
                this.conversation.unreads += 1;
                this.scrollToBottom();
                if (this.admin) {
                    this.$store.commit(
                        "relocateConversation",
                        this.conversation
                    );
                }
            }
        });

        //Cuando el server me avisa que el otro vio mis mensajes
        this.socket.on("heSawMyMessages", data => {
            if (
                data.user_id != vm.user.id &&
                data.conversation_id == vm.conversation.id
            ) {
                //me aseguro q el mensaje no es mio

                vm.$store.commit("heSawMyMessages", {
                    conversation_id: vm.conversation.id,
                    admin: vm.admin ? 1 : 0
                });
            }
        });
    },

    computed: {
        conversation() {
            return this.$store.getters.getActiveConversation;
        },
        conversations() {
            return this.$store.getters.getConversations;
        },
        empty() {
            return !(
                this.conversation &&
                this.conversation.messages &&
                this.conversation.messages.length > 0
            );
        },
        items() {
            if (!this.empty) {
                this.conversation.messages.sort((a, b) => a.id - b.id);
                let items = [
                    {
                        type: "DS", // Day Separator
                        day: this.conversation.messages[0].created_at
                    }
                ];
                this.conversation.messages.forEach((message, i) => {
                    if (
                        i > 0 &&
                        isDayChanged(message, this.conversation.messages[i - 1])
                    ) {
                        items.push({
                            type: "DS",
                            day: message.created_at
                        });
                    }
                    message.type = this.isMessageSent(message) ? "MS" : "MR";
                    items.push(message);
                });
                return items;
            }
        },
        isSendDisabled() {
            return !this.newMessage.trim().length && !this.preview;
        }
    },
    watch: {
        newMessage() {
            if (
                (this.newMessage.trim() && !this.imWriting) ||
                (!this.newMessage.trim() && this.imWriting)
            ) {
                this.imWriting = !this.imWriting;
                let data = {
                    conversation_id: this.conversation.id,
                    writing: this.imWriting,
                    user_id: this.user.id
                };
                this.socket.emit("imWriting", data);
            }
        },
        conversation(n, o) {
            setTimeout(() => {
                this.scrollToBottom();
            }, 500);

            if (this.conversation) {
                /* conecto a la sala */
                this.socket.emit("joinRoom", this.conversation.id);
            }
        },
        "conversation.unreads"() {
            if (this.admin && this.conversation) {
                this.$store.commit("changeUnreads", {
                    conversation_id: this.conversation.id,
                    unreads: this.conversation.unreads
                });
            }
        }
    },
    methods: {
        onFileChange(e) {
            const file = e.target.files[0];
            if (file) {
                this.preview = URL.createObjectURL(file);
                this.imageUploaded = true;
            }
        },
        resetFileInput() {
            this.$refs.fileInput.value = "";
            this.preview = null;
            this.imageUploaded = false;
        },
        iSawTheMessages() {
            if (this.conversation.unreads) {
                var vm = this;
                this.$axios.put(`/view-messages/${this.conversation.id}`);

                let data = {
                    conversation_id: vm.conversation.id,
                    user_id: vm.user.id,
                    admin: vm.admin
                };
                this.socket.emit("iSawHisMessages", data);

                this.$store.commit("iSawHisMessages", {
                    conversation_id: vm.conversation.id,
                    admin: vm.admin ? 1 : 0
                });
                this.conversation.unreads = 0;
            }
        },
        socketMessage(message) {
            let data = {
                user_id: this.user.id,
                conversation_id: this.conversation.id,
                message: message
            };
            this.socket.emit("sendNewMessage", data);
        },

        sendMessage() {
            var vm = this;
            var fdata = new FormData();
            var shouldSend = false;

            if (this.preview) {
                var file = $('input[type="file"]')[0].files[0];
                if (file) {
                    shouldSend = true;
                    fdata.append("image", file);
                }
            }

            if (this.newMessage.trim()) {
                shouldSend = true;
                fdata.append("content", this.newMessage);
            }

            if (shouldSend) {
                fdata.append("conversation_id", this.conversation.id);
                fdata.append("prio_auto", this.isATicket ? 1 : 0);
               
               this.$axios.post("/message", fdata).then(r => {
                    vm.socketMessage(r.data);
                    vm.$store.commit("addMessageToActiveConversation", r.data);
                    vm.scrollToBottom();

                    if (this.admin) {
                        let d = {
                            field: "last_message",
                            value: r.data,
                            conversation_id: this.conversation.id
                        };
                        this.$store.commit("updateConversation", d);
                        this.$store.commit(
                            "relocateConversation",
                            this.conversation
                        );
                    }
                });
            }

            this.newMessage = "";
            this.resetFileInput();

            if (this.isATicket) {
                let data = {
                    conversation_id: this.conversation.id,
                    field: "prio_auto",
                    value: true
                };
                if (this.admin) {
                    this.$store.commit("updateConversation", data);
                }
                this.socket.emit("updateConversation", data);
            }
        },
        scrollToBottom() {
            /* if (this.$refs.conversation){
                this.$refs.conversation.scrollTop = this.$refs.conversation.scrollHeight;
            } */
            
            var vm = this;
            setTimeout(() => {
                if (
                    vm.conversation &&
                    vm.conversation.messages &&
                    vm.conversation.messages.length
                ) {
                    /*
                    let lastMessage =
                        vm.conversation.messages[
                            vm.conversation.messages.length - 1
                        ];
                    let refId = "messageRef" + lastMessage.id;
                    if (vm.$refs[refId] && vm.$refs[refId][0]) {
                        vm.$refs[refId][0].scrollIntoView();
                    }
                    */
                    vm.$refs.conversation.scrollTop = vm.$refs.conversation.lastChild.offsetTop - 40;
                }
            }, 100);
        },
        isMessageSent(message) {
            return (
                (this.admin && message.admin) || (!this.admin && !message.admin)
            );
        },
        getItemContainerClass(item) {
            switch (item.type) {
                case "DS":
                    return { "day-separator": true };
                case "MS":
                    return { "sent-message": true };
                case "MR":
                    return { "received-message": true };
            }
        },
        getMessageClass(message) {
            let sent = this.isMessageSent(message);
            return { sent: sent, received: !sent };
        },
        getCheckedIconClass(message) {
            return {
                "fa-check": !message.sended,
                "fa-check-double": message.sended,
                viewed: message.viewed
            };
        }
    }
};

function isDayChanged(message, previousMenssage) {
    return previousMenssage.created_at
        .slice(0, 10)
        .localeCompare(message.created_at.slice(0, 10));
}
</script>

<style lang="scss" scoped>
.header {
    background: rgba(178, 125, 161, 0.333);
    height: 64px;
    i {
        margin-left: 126px;
        font-size: 24px;
        color: #565656;
    }
}
#header-name {
    //margin-top: 12px;
    font-size: 18px;
    font-family: "Roboto";
    line-height: 20px;
    color: #565656;
}
.header-status {
    font-size: 10px;
    font-family: "Roboto";
    color: rgba(0, 0, 0, 0.25);
}
.miniature-img {
    cursor: pointer;
    width: 200px;
}
.isaticket-q {
    font-weight: bold;
    font-size: 20px;
}
.isaticket-a {
    width: 65px;
}

.display-none {
    display: none;
}

.preview-img {
    width: 120px;
    margin-top: 10px;
}

.chat {
    //height: 100%;
    min-height: 100%;
}
.empty {
    box-sizing: border-box;
}
.chat-background {
    background: #e5ddd5;
}
#conversation {
    height: 0;
    //    overflow-y: scroll;
    //    scroll-behavior: smooth;
}

.item-container {
    width: auto;
    margin: 2px auto;
}

.item-container.day-separator {
    align-self: center;
    margin: 4px auto;
    font-family: "Roboto", sans-serif !important;
}

.item-container.received-message {
    align-self: flex-start;
    margin-left: 16px;
    margin-right: 24px;
}

.item-container.sent-message {
    align-self: flex-end;
    margin-right: 16px;
    margin-left: 24px;
}
.item-container.sent-message + .item-container.received-message,
.item-container.received-message + .item-container.sent-message {
    margin-top: 16px;
}

.item-container.sent-message + .item-container.received-message,
.item-container.received-message + .item-container.sent-message {
    margin-top: 16px;
}
.day-separator > .day {
    color: #8a8585;
    background: #dce9e9;
    border-radius: 8px;
    box-shadow: 1px 1px #ccc;
    font: Regular 10px/67px Roboto;
    text-align: center;
    padding: 4px 32px;
}
.message {
    width: auto;
    min-width: 100px;
    border-radius: 8px;
    box-shadow: 1px 1px #ccc;
    padding: 4px 8px 0 8px;
    margin: auto 16px;
    position: relative;
    display: flex;
    flex-direction: column;
}

.message.sent {
    background: #dff6c7;
}
.message.received {
    background: #ffffff;
}

:not(.sent-message) + .sent-message .message {
    border-top-right-radius: 0;
}

:not(.sent-message) + .sent-message .message:after {
    position: absolute;
    content: "◤";
    color: #dff6c7;
    right: -19px;
    top: -8px;
    font-size: 20px;
    width: 20px;
    text-shadow: 1px 1px #ccc;
    /*
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-left-color: #dff6c7;
    border-right: 0;
    border-top: 0;
    margin-top: -23px;
    margin-right: -14px;
    z-index: 100;
    */
}

:not(.received-message) + .received-message .message:after {
    position: absolute;
    content: "◥";
    color: #ffffff;
    left: -14px;
    top: -8px;
    font-size: 20px;
    text-align: end;
    width: 14px;
    overflow: hidden;
    text-shadow: 0 1px #ccc;
    /*
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-right-color: #ffffff;
    border-left: 0;
    border-top: 0;
    margin-top: -23px;
    margin-left: -14px;
    z-index: 100;
    */
}

:not(.received-message) + .received-message .message {
    border-top-left-radius: 0;
}

.message > .content {
    padding-right: 8px;
}
.info {
    display: flex;
    justify-content: flex-end;
    color: #bad3a3;
}

.time {
    display: flex;
    font-size: 12px;
}
.status {
    display: flex;
    font-size: 10px;
    margin-top: 3px;
    margin-left: 2px;
}
.viewed {
    color: #5bc8f4;
}
.form-container {
    background: #e4e4e4;
    border-top: solid 1px #e6e6e6;
    outline: none;
    z-index: 2;
    box-shadow: 0 -2px 4px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.message-form {
    padding: 0 8px;
    width: 100%;
    align-items: center;
}
.message-form input {
    margin: 8px 0;
    flex-grow: 1;
    // height: px;
    border-radius: 19px;
    border: 0;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
}
.message-form input:focus {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}

.message-form button,
.adj-btn {
    border: none;
    background: transparent;
    padding: 0;
    outline: none;
    // height: 38px;
    color: #6fcea3;
    margin: 0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
    transition: box-shadow 0.15s ease-in-out;
    cursor: pointer;
}
.message-form button:disabled {
    color: #cccccc !important;
}
.message-form button:hover,
.adj-btn {
    color: #5db68e;
}
.message-form button:active {
    color: #36a774;
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.25);
}

.message-form button i,
.adj-btn i {
    font-size: 32px;
}
</style>
