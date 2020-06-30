<template>
    <div v-if="conversation" class="d-flex flex-column h-100 chat">
        <div
            v-if="!empty"
            id="conversation"
            class="d-flex flex-column h-100 chat-background"
            ref="conversation"  @mouseover="iSawTheMessages()">
            <div
                class="d-flex item-container"
                v-for="item in items" :key="item.id"
                :class="getItemContainerClass(item) ">
                <span v-if="item.type=='DS'" class="day">{{item.day | date}}</span>

                <div
                    class="message"
                    :ref="'messageRef'+item.id"
                    v-if="item.type.startsWith('M')"
                    :class="getMessageClass(item)"
                >
                    <div v-if="item.url" class="miniature-img">
                        <img :src="imagePath(item.url)" />
                    </div>
                    <span class="content" v-if="item.content">{{item.content}}</span>
                    <div class="info"> 
                        <span class="mr-4 time" v-if="admin && item && item.admin && item.user && item.user.id != user.id">Enviado por {{item.user.name}}</span>
                        <span class="mr-4 time" v-if="admin && item && item.admin && item.user && item.user.id == user.id">Enviado por MI</span>
                        <span class="time">{{item.created_at | time}}</span>
                        <span 
                            v-if="item.type=='MS'"
                            class="status fas"
                            :class="getCheckedIconClass(item)"
                        ></span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="d-flex justify-content-center align-items-center h-100 chat-background">
            <span class="d-flex">Chat vacío.</span>
        </div>

        <form v-if="conversation" @submit.prevent="sendMessage" class="d-flex message-form">
            <input v-model="newMessage" type="text" class="form-control" @keypress="iSawTheMessages()" />
            <button
                type="submit"
                :disabled="isSendDisabled"
                class="d-flex justify-conenten-center align-items-center h-100"
            >
                <!-- <i class="fas fa-chevron-circle-right"></i> -->
                <i class="fas d-flex">&#10148;</i>
            </button>
        </form>
    </div>
    <div v-else class="d-flex justify-content-center align-items-center h-100">
        <span class="d-flex">Seleccione una conversación.</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newMessage: "",
        };
    },
    mounted() {
        var vm = this;
        /* conecto al socket */
        this.socket = this.$nuxtSocket({
            channel: '/index',
            reconnection: true
        });  
       
        this.scrollToBottom();

        //cuando recibo un mensaje por el socket
        this.socket.on('newMessage', data => {
            if(data.user_id != vm.user.id && data.conversation_id == vm.conversation.id)
            {
                this.$store.commit('addMessageToActiveConversation',data.message);
                this.conversation.unreads+=1;
                this.scrollToBottom();
                if(this.admin){
                    this.$store.commit('relocateConversation',this.conversation);
                }
            }
        });

         //Cuando el server me avisa que el otro vio mis mensajes
        this.socket.on('heSawMyMessages', data => {
            if(data.user_id != vm.user.id && data.conversation_id == vm.conversation.id){ //me aseguro q el mensaje no es mio
                
                vm.$store.commit('heSawMyMessages',{conversation_id : vm.conversation.id,
                                                    admin : vm.admin ? 1:0});
            }
        });
    },
    computed: {
        conversation() {
            return this.$store.getters.getActiveConversation;
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
            return this.newMessage.trim().length == 0;
        }
    },
    watch: {
        conversation(n, o) {
            setTimeout(() => {
                this.scrollToBottom();
            }, 500);

            if (this.conversation)
            {
                /* conecto a la sala */
                this.socket.emit('joinRoom',this.conversation.id);
            }
        },
        'conversation.unreads'(){
            if(this.admin)
            {
                this.$store.commit('changeUnreads',{conversation_id:this.conversation.id,unreads:this.conversation.unreads})
            }
        }
    },
    methods: {
          iSawTheMessages()
        {
            if(this.conversation.unreads)
            {
                var vm =this;
                this.$axios.put(`/view-messages/${this.conversation.id}`)
                   
                let data = {
                    conversation_id : vm.conversation.id,
                    user_id : vm.user.id,
                    admin : vm.admin
                }
                this.socket.emit('iSawHisMessages',data);
                
                this.$store.commit('iSawHisMessages',{conversation_id : vm.conversation.id,
                                                        admin : vm.admin ? 1:0});
                this.conversation.unreads=0;
            }
        },
        socketMessage(message)
        {
            let data = {
                user_id : this.user.id,
                conversation_id: this.conversation.id,
                message : message
            }
            this.socket.emit('sendNewMessage',data);

        },

        sendMessage() {
            var vm = this;
            if (this.newMessage.trim()) {
                let data = {
                    conversation_id: this.conversation.id,
                    admin: this.admin,
                    content: this.newMessage
                };
                this.newMessage = "";
                this.$axios.post('/message',data)
                    .then(r => {
                        vm.socketMessage(r.data);
                        vm.$store.commit('addMessageToActiveConversation',r.data);  
                        vm.scrollToBottom();

                         if(this.admin)
                        {
                            let d = {
                                field:'last_message',
                                value:r.data,
                                conversation_id:this.conversation.id
                            }
                            this.$store.commit('updateConversation',d);
                            this.$store.commit('relocateConversation',this.conversation);
                        }
               
               });

               
               
            }
        },
        scrollToBottom() {
            /* if (this.$refs.conversation){
                this.$refs.conversation.scrollTop = this.$refs.conversation.scrollHeight;
            } */
            if(this.conversation && this.conversation.messages && this.conversation.messages.length)
            {
                setTimeout(() => {
                    let lastMessage = this.conversation.messages[this.conversation.messages.length-1];
                    let refId = 'messageRef'+lastMessage.id;
                    if(this.$refs[refId])
                    {
                        this.$refs[refId][0].scrollIntoView();
                    }
                    
                }, 500);
            }
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
.chat {
    height: 100%;
    max-height: 85vh;
}
.empty {
    box-sizing: border-box;
}
.chat-background {
    background: #e5ddd5;
}
#conversation {
    overflow-y: scroll;
    scroll-behavior: smooth;
}

.item-container {
    width: auto;
    margin: 2px auto;
}

.item-container.day-separator {
    align-self: center;
    margin: 4px auto;
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
}

.message.sent {
    background: #dff6c7;
}
.message.received {
    background: #ffffff;
}

:not(.sent-message) + .sent-message .message{
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
.message-form {
    background: #e4e4e4;
    border-top: solid 1px #e6e6e6;
    //box-sizing: content-box;
    // padding: 8px;
    outline: none;
    z-index: 2;
}
.message-form input {
    margin: 8px 0 8px 8px;
    flex-grow: 1;
    // height: px;
    border-radius: 19px;
    border: 0;
}
.message-form input:focus {
    box-shadow: none;
}

.message-form button {
    border: none;
    background: transparent;
    padding: 0;
    outline: none;
    // height: 38px;
    color: #6fcea3;
    margin: 0 8px 0 0;
}
.message-form button:disabled {
    color: #cccccc !important;
}
.message-form button:hover {
    color: #5db68e;
}
.message-form button:active {
    color: #36a774;
}

.message-form button i {
    font-size: 50px;
    height: 100%;
}
</style>
