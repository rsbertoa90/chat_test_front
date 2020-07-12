 <template>
    <div class="d-flex flex-column chat" >
        <chatHeader
            v-if="conversation"
            :conversation="conversation"
            @childMounted="childMounted.chatHeader=$event"/>

        <div v-if="conversation" class="d-flex flex-column flex-grow-1" >
            <conversation
                :conversation="conversation"
                :chatMessages="chatMessages"
                ref="conversation"
                @iSawTheMessages="iSawTheMessages"
                @sendFastAnswer="sendFastAnswer"
                @hook:mounted="childMounted.conversation=true"
                @hook:destroyed="childMounted.conversation=false"
            />

            <chat-footer
                :conversation="conversation"
                @writingChange="onWritingChange"
                @sendMessage="onSendMessage"
                @sendFastAnswer="sendFastAnswer"
                @mouseover="iSawTheMessages()"
                @childMounted="childMounted.chatFooter=$event"
            />

        </div>
        <div v-else class="d-flex justify-content-center align-items-center flex-grow-1">
            <h4 class="d-flex roboto">Seleccione una conversación.</h4>
        </div>
    </div>
</template>

<script>
import chatHeader from "./header.vue";
import conversation from "./conversation.vue";
import chatFooter from "./footer.vue";

export default {
    components: { chatHeader, conversation, chatFooter },
    data() {
        return {
            imOnline: true,
            imageUploaded: false,
            file: null,
            childMounted: {
                chatHeader: false,
                conversation: false,
                chatFooter: false
            }
        };
    },
    mounted() {
        var vm = this;
        /* conecto al socket */
        this.socket = this.$nuxtSocket({
            channel: "/index",
            reconnection: true
        });
        
        if(this.admin)
        {
            this.socket.emit("joinRoom", 'admins');

            this.socket.on('reconnect', () => {
                    this.socket.emit("joinRoom", 'admins');
            })
        }

        this.socket.on('disconnect', () => {
            console.log(' ON DISCONNECT')
            this.checkSocket();
        })

        //cuando recibo un mensaje por el socket
        this.socket.on("newMessage", data => {
            if (
                data.user_id != vm.user.id 
                && vm.conversation
                && data.conversation_id == vm.conversation.id
            ) {
                this.$store.dispatch(
                    "addMessageToActiveConversation",
                    data.message
                );

                if(this.conversation)
                {
                    this.conversation.unreads += 1;
                    // this.$refs.conversation.scrollToBottom();
                    if (this.admin) {
                        this.$store.commit(
                            "relocateConversation",
                            this.conversation
                        );
                    }
                }
            }
        });

        //Cuando el server me avisa que el otro vio mis mensajes
        this.socket.on("heSawMyMessages", data => {
            if (
                data.user_id != vm.user.id
                && vm.conversation
                && data.conversation_id == vm.conversation.id
            ) {
                //me aseguro q el mensaje no es mio
                vm.$store.commit("heSawMyMessages", {
                    conversation_id: vm.conversation.id,
                    admin: vm.admin ? 1 : 0
                });
            }
        });

         this.socket.on('hesWriting', data => {
            
         
            if( this.conversation 
                && data.conversation_id == this.conversation.id
                && this.user.id != data.user_id)
                {
                    this.$store.commit('setHesWriting',data.writing);
                    if(!this.hesOnline){
                        this.$store.commit('setHesOnline',true);
                    }
                }

        });

         this.socket.on('someoneJoined', data => {
            if(data.user.id != this.user.id
                && this.conversation
                && data.conversation_id == this.conversation.id)
            {
                this.$store.commit('setHesOnline',true);
            }
        });

        this.socket.on('someoneLeaved', data => {
            if(data.user_id != this.user.id
                && this.conversation
                && data.conversation_id == this.conversation.id
            )
            {
                this.$store.commit('setHesOnline',false);
                this.$store.commit('setHesWriting',false);
            }
        });

         this.socket.on('isdisconnecting',data=>{
             if(vm.conversation
               && vm.conversation.id == data.conversation_id)
            {
                this.$store.commit('setHesOnline',false);
                this.$store.commit('setHesWriting',false);
            }
        });

        if(this.admin){
            this.isATicket=false;
        }
    },

    computed: {
        firstMessage(){
            return this.$store.getters.getFirstMessage;
        },
        hesWriting(){
            return this.$store.getters.getHesWriting;
        },
        hesOnline(){
            return this.$store.getters.getHesOnline;
        },
        conversation() {
            return this.$store.getters.getActiveConversation;
        },
        chatMessages(){
            return this.$store.getters.getChatMessages;
        },
        conversations() {
            return this.$store.getters.getConversations;
        },
        allMounted() {
            return Object.values(this.childMounted).reduce((a,b)=>a && b);
        },
    },
    watch: {
        
        'socket.connected'(){
            console.log('SOCKET STATUS ',socket.connected);
        },
        conversation(n, o) {
            if (this.conversation && !this.admin) {
                /* conecto a la sala */
                this.socket.emit("joinRoom", this.conversation.id);
                 this.socket.on('reconnect', () => {
                    this.socket.emit("joinRoom", this.conversation.id);
                 })
            }
        },
        "conversation.unreads"() {
            if (this.admin && this.conversation) {
                this.$store.commit("changeUnreads", {
                    conversation_id: this.conversation.id,
                    unreads: this.conversation.unreads
                });
            }
        },
      
    },
    methods: {
        reset(){
            if(this.socket && this.socket.disconnected){
                if (this.conversation) {
                    this.socket.connect();
                    let room  = this.conversation.id;
                    if(this.admin){
                        room = 'admins';
                    }
                   this.socket.emit("joinRoom", room);
                    this.socket.on('reconnect', () => {
                       this.socket.emit("joinRoom", room);
                    })
                   this.$store.dispatch('fetchChatMessages', this.conversation.id)
                       .then( () => {
                           console.log('reconectado? -> disconeected: ' , this.socket.disconnected)
                       });
                }  
            }
        },
        checkSocket(){
            console.log('check socket', this.socket.disconnected)
            if(this.socket.disconnected)
            {
                console.log('disconnected, reset');
                this.reset();
            }
        },
        iSawTheMessages() {
            this.checkSocket();
            if (this.conversation && this.conversation.unreads) {
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

                /* si es un cliente quito el unreads para que se quite la notificacion del icono de mensaje */
                if(this.user && !this.admin)
                {
                    this.$store.commit('setUnreads',0);
                }
            }
        },
        socketMessage(message) {
            this.checkSocket();
            let data = {
                firstMessage:this.firstMessage,
                user_id: this.user.id,
                conversation_id: this.conversation.id,
                message: message,
                admin:this.admin
            };
           
            this.socket.emit("sendNewMessage", data);
            if(this.firstMessage)
            {
                this.$store.commit('setFirstMessage',false);
            }
        },
        messageSended(r)
        {
            var vm = this;
            vm.$store.dispatch("addMessageToActiveConversation", r.data)
                .then(()=>{
                    vm.$refs.conversation.scrollToBottom();
                });

            if (this.admin)
            {
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
            vm.socketMessage(r.data);
            vm.$store.commit('setLoadingMessage',false);
        },
        sendFastAnswer(e){
            this.checkSocket();
            var vm = this;
            let data = {
                conversation_id: this.conversation.id,
                fa_id:e
            }
            vm.$store.commit('setLoadingMessage',true);
            this.$axios.post('/send-fast-answer',data)
                .then(r => {
                    vm.messageSended(r);
                });
        },
        onSendMessage(event) {
            var vm = this;
            vm.$store.commit('setLoadingMessage',true);
            this.$axios.post("/message", event.fdata).then(r => {
                vm.messageSended(r);

                if (event.isATicket) {
                const data = {
                    conversation_id: this.conversation.id,
                    field: "prio_auto",
                    value: true,
                    admin:this.admin
                };
                
                this.socket.emit("updateConversation", data);
            }
            });
           
        },
        onWritingChange(writing) {
            this.checkSocket();
            const data = {
                conversation_id: this.conversation.id,
                writing: writing,
                user_id: this.user.id,
                admin:this.admin
            };
            this.socket.emit("imWriting", data);
            this.iSawTheMessages();
        },
       
    }
};
</script>

<style lang="scss" scoped>

.display-none {
    display: none;
}


.chat {
    //height: 100%;
    min-height: 100%;
}

h4 {
    color: rgba(0,0,0,.5);
}
</style>
