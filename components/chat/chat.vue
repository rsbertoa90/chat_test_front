<template>
    <div class="d-flex flex-column chat">
        <chatHeader v-if="conversation" :conversation="conversation" />
        <div v-if="conversation" class="d-flex flex-column flex-grow-1" @mouseover="iSawTheMessages()">
            <conversation :conversation="conversation" ref="conversation" />

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
import chatHeader from './header.vue';
import conversation from './conversation.vue';
import chatFooter from './footer.vue';

export default {
    components: { chatHeader, conversation, chatFooter },
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
                this.$refs.conversation.scrollToBottom();
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
            console.log("isSawTheMessages");
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
                    vm.$refs.conversation.scrollToBottom();

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

    }
};

</script>

<style lang="scss" scoped>

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
