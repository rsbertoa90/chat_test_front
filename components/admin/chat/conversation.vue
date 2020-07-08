<template>
    <div v-if="conversation" class="d-flex conversation-box top-shine" @click="setActiveConversation(conversation)" :class="{'taken':conversation.taken_by}">
        <div
            class="d-flex flex-column justify-content-between flex-fill box-content"
            :class="conversationClass" >
            <div class="d-flex justify-content-between align-content-center">
                <span class="userid roboto">{{conversation.client.id}}</span>
                <div class="username roboto">{{conversation.client.name}}</div>
                <div
                    v-if="conversation.last_message"
                    class="time"
                >{{ conversation.last_message.created_at | time }}</div>
            </div>

            <div v-if="!conversation.taken_by">
                <div v-if="conversation.last_message && !hesWriting" class="d-flex justify-content-between info">
                    <div class="last-message-preview roboto">
                        {{ conversation.last_message.content }}
                    </div>
                    <div class="unreads roboto" v-if="conversation.unreads">
                        {{conversation.unreads}}
                    </div>
                </div>
                <div v-if="hesWriting">
                    <span class="text-green roboto">escribiendo...</span>
                </div>
            </div>
            <div v-if="conversation.taken_by && conversation.taken_by.id != user.id">
                <span class="text-green roboto">{{conversation.taken_by.name}} hablando</span>
            </div>
        </div>
        <div v-if="isSelected" class="selected"></div>
    </div>
</template>
<script>
export default {
    props: ["conversation"],
    data() {
        return {
            hesWriting:false,
            hesOnline:false
        }
    },
    mounted(){
         var vm = this;
        /* conecto al socket */
        this.socket = this.$nuxtSocket({
            channel: "/index",
            reconnection: true
        });

        if (this.conversation) {
            /* conecto a la sala */
            this.socket.emit("joinRoom", this.conversation.id);
        }

        this.socket.on("newMessage", data => {
            if (
                this.admin != data.message.admin &&
                data.conversation_id == vm.conversation.id
            ) {
                this.conversation.unreads += 1;
                let d = {
                    field: "last_message",
                    value: data.message,
                    conversation_id: this.conversation.id
                };
                this.$store.commit("updateConversation", d);

                if(this.admin)
                {
                    this.$store.commit("relocateConversation",this.conversation);
                }
            }
        });

        this.socket.on('hesWriting', data => {
            if(data.conversation_id == this.conversation.id && this.user.id != data.user_id)
            this.hesWriting = data.writing;
        });

        this.socket.on('someoneJoined', data => {
            if(data.user.id != this.user.id && data.conversation_id == this.conversation.id)
            {
                this.conversation.taken_by = data.user;
                this.hesOnline = true;
            }
        });

        this.socket.on('someoneLeaved', data => {
            if(data.user_id != this.user.id
                && data.conversation_id == this.conversation.id
                && this.conversation.taken_by
                && this.conversation.taken_by.id == data.user_id)
            {
                this.conversation.taken_by = null;
                this.hesOnline = false;
            }
        });

        this.socket.on('isdisconnecting',data=>{
            if(vm.conversation
               && vm.conversation.taken_by
               && vm.conversation.taken_by.socket_id == data.socket_id
               && vm.conversation.id == data.conversation_id)
            {
                vm.conversation.taken_by = null;
            }else if(vm.conversation.id == data.conversation_id)
            {
                vm.hesWriting = false;
                vm.hesOnline = false;
            }
        });


            this.socket.on('checkTaken',conversation_id => {
                if( this.conversation
                    && this.activeConversation
                    && this.activeConversation.id == this.conversation.id
                    && conversation_id == this.activeConversation.id )
                    {
                        let data = {
                            conversation_id : conversation_id,
                            user:{
                                socket_id : this.socket.id,
                                id:this.user.id,
                                name:this.user.name
                            }
                        }
                        this.socket.emit('imInTheConversation',data);
                    }
            });

            this.socket.on('hesInTheConversation',data => {
                if(this.conversation)
                {
                    this.conversation.taken_by = data.user;
                }
            });

            this.socket.on('conversationUpdated', data => {
                if(this.conversation.id == data.conversation_id)
                {
                    this.conversation[data.field] = data.value;
                    this.$store.commit('relocateConversation',this.conversation);
                }
            });





    },
    computed: {
        isSelected() {
            return (
                this.conversation &&
                this.activeConversation &&
                this.activeConversation.id ==
                    this.conversation.id
            );
        },
        conversationClass() {
            return {
                "prio-auto": this.conversation.prio_auto,
                "prio-manual": this.conversation.prio_manual
            };
        },
        unreads() {
            return 0;
        },
        activeConversation()
        {
            return this.$store.getters.getActiveConversation;
        }
    },
    methods: {

        setActiveConversation(c) {
            /* Si ya tengo una conversacion activa,primero aviso que la dejo */
            if(this.activeConversation)
            {
                let data = {
                    conversation_id : this.activeConversation.id,
                    user_id : this.user.id
                }
                this.socket.emit('leaveConversation',data);
                this.$store.commit('setActiveConversation',null);
            }

            if(!this.conversation.taken_by || this.conversation.taken_by.id == this.user.id)
            {
                this.$store.dispatch("fetchConversation", c.client_id)
                    .then( () => {
                        this.$store.dispatch('fetchChatMessages',this.conversation.id);
                    });
                let data = {
                    conversation_id:this.conversation.id,
                    user:{
                        socket_id:this.socket.id,
                        id:this.user.id,
                        name:this.user.name
                    }
                }
                this.socket.emit('joinConversation',data);
                this.$store.commit('setHesWriting',this.hesWriting);
                this.$store.commit('setHesOnline',this.hesOnline);
            }else{
                console.log(this.conversation.taken_by.name,' esta hablando con este cliente');
            }
        }
    },

    beforeDestroy()
    {
        /* Si soy administrador aviso que YA NO estoy hablando con este cliente */
            if(this.activeConversation)
            {
                let data = {
                    conversation_id : this.activeConversation.id,
                    user_id : this.user.id
                }
                this.socket.emit('leaveConversation',data);
                this.$store.commit('setActiveConversation',null);
            }
    },
};
</script>
<style lang="scss" scoped>
.taken{
    background-color: #ccc6;
}
.conversation-box {
    cursor: pointer;
    // border-top: 1px ridge #fff;
    background-color: #fff;
    height: 74px;
    margin-bottom: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,.25);
}

.box-content {
    padding: 12px 8px 12px 20px;
    min-width: 0;
}

.selected {
    background: #21d1ab;
    width: 12px;
    min-width: 12px;
    z-index: 3;
}

.userid {
    background: #e8a1fe;
    height: 17px;
    margin: auto 12px auto 0;
    padding: 0px 6px;
    color: white;
    font-size: 12px;
    font-weight: bold;
    border-radius: 8px;
}

.username {
    color: rgba(60, 60, 90, 1);
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.prio-manual {
    background: rgba(178, 3, 122, 0.09);
}
.prio-auto {
    background: rgba(220, 233, 233, 1);
}
.last-message-preview {
    font-size: 14px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #aeb1b8;
}
.time {
    font-size: 12px;
    font-weight: bold;
    width: auto;
    color: #7dde7f;
}
.text-green{
    font-size: 14px;
    color:#77cd2e;
}
.unreads {
    color: white;
    font-weight: bold;
    font-size: 13px;
    width: 20px;
    min-width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #77cd2e;
    text-align: center;
}
</style>
