<template>

    <div class="fcc w-100" v-if="conversation && connected"  >
        <h1 v-if="admin">{{user.name}} --> {{conversation.client.name}}</h1>
        <h1 v-else>{{user.name}} --> MATES FABI</h1>
        <div class="messages-scroller" @mouseover="iSawTheMessages()" >
            <div v-for="message in conversation.messages" :key="message.id"  class="encuadre" :class="{'align-self-start':!message.admin, 'align-self-end':message.admin}">
                <div v-if="message.url" class="miniature-img">
                    <img :src="imagePath(message.url)">
                </div>
                <div class="mt-1" v-if="message.content" :class="{'admin-message':message.admin}">
                    {{message.content}}
                </div>
                <div :class="{'admin-message':message.admin}">
                    Enviado: {{message.sended}} -- Visto: {{message.viewed}}
                </div>
            </div>
            
        </div>
        <div class="mt-4 d-flex row">
            <input v-model="newMessage" type="text" class="form-control col-10" @keypress="iSawTheMessages()">
            <button @click="sendMessage">ENVIAR</button>
        </div>
    <socket-status :status="socketStatus"></socket-status>
    </div>
</template>

<script>

import SocketStatus from 'nuxt-socket-io/components/SocketStatus.vue'
export default {
    components:{SocketStatus},
    data() {
        return {
            newMessage:'',
            socketStatus:{},
            connected:false,
            newMessages:false,
           
        }
    },
    computed:{
        
        conversation()
        {
            return this.$store.getters.getActiveConversation;
        }
    },
    watch:{
        conversation()
        {
            if(this.conversation)
            {
                this.socket.emit('joinRoom',this.conversation.id);
                this.connected =true;
                this.chekNewMessages();
            }
        }
    },
    mounted() {
        var vm = this;
       
        this.socket = this.$nuxtSocket({
            channel: '/index',
            reconnection: false
        });  
        
        /* Listen for events: */
        var vm  = this;
        //Cuando el server me avisa q hay un mensaje nuevo
        this.socket.on('newMessage', data => {
            if(data.user_id != vm.user.id && data.conversation_id == vm.conversation.id)
            {
                this.$store.commit('addMessageToActiveConversation',data.message);
                this.newMessages=1;
                console.log('Agrego el mensaje nuevo');
            }else{
                console.log('llego un mensaje del server, pero no es para mi');
            }
        });

        //Cuando el server me avisa que el otro vio mis mensajes
        this.socket.on('heSawMyMessages', data => {
            if(data.user_id != vm.user.id && data.conversation_id == vm.conversation.id){ //me aseguro q el mensaje no es mio
                
                vm.$store.commit('heSawMyMessages',{conversation_id : vm.conversation.id,
                                                    admin : vm.admin ? 1:0});
                console.log('Marco MIS mensajes como vistos')
            }
        });
    },
    methods:
    {
        chekNewMessages(){
            var vm = this;
            if(this.conversation)
            {
             let  notRead = this.conversation.messages.filter(m => {
                  console.log(m.viewed,m.admin,vm.admin ? 1:0)
                  return !m.viewed && ( m.admin != (vm.admin ? 1:0) )
              })
              this.newMessages =  notRead ? 1 : 0;
            }
        },
        iSawTheMessages()
        {
            if(this.newMessages)
            {
                console.log('hay mensajes no vistos');
                var vm =this;
                this.$axios.put(`/view-messages/${this.conversation.id}`)
                    .then(r => {
                        let data = {
                            conversation_id : vm.conversation.id,
                            user_id : vm.user.id,
                            admin : vm.admin
                        }
                        console.log('emito evento al socket para avisar a la otra parte que vi los mensajes');
                        this.socket.emit('iSawHisMessages',data);
                        
                        this.$store.commit('iSawHisMessages',{conversation_id : vm.conversation.id,
                                                                admin : vm.admin ? 1:0});
                        this.newMessages = 0;
                });
            }else{
                console.log('todos los mensajes del otro ya los vi');
            }
        },

       
         
        socketMessage(message)
        {
         
         /* Si descubro como enviar por socket a destinatario especifico mando el objeto mesage completo */
        let data = {
             user_id : this.user.id,
             conversation_id: this.conversation.id,
             message : message
         }
     
         this.socket.emit('sendNewMessage',data);
            
        },

        sendMessage()
        {
            /* EVENTUALMENTE SERA SI HAY TEXTO DE NUEVO MENSAJE O HAY ARCHIVO ADJUNTO */
            var vm = this;
            if(this.newMessage.trim())
            {
                let data = {
                    conversation_id : this.conversation.id,
                    content:this.newMessage
                }
               
                this.newMessage='';
                
                this.$axios.post('/message',data)
                    .then(r => {
                        vm.socketMessage(r.data);
                        console.log('esto deberia agregar al array de conversacion actual',r.data);
                        vm.$store.commit('addMessageToActiveConversation',r.data);  
                    });
            }
        }
    }
}
</script>


<style>
.messages-scroller
{
    max-height:400px;
    overflow-y:scroll;
}
.admin-message{
    text-align: right;
    display: flex;
    justify-content: flex-end;
    color:red;
}
.encuadre{
    border:1px solid #000;
    padding: 5px 10px;
}

    .miniature-img{
        width:150px;
    }
</style>