<template>

    <div class="fcc w-100" v-if="conversation">
        <div v-for="message in conversation.messages" :key="message.id"  class="encuadre" :class="{'align-self-start':!message.admin_id, 'align-self-end':message.admin_id}">
            <div v-if="message.url" class="miniature-img">
                <img :src="imagePath(message.url)">
            </div>
            <div class="mt-1" v-if="message.content" :class="{'admin-message':message.admin_id}">
                {{message.content}}
            </div>
        </div>
        <div class="mt-4 d-flex row">
            <input v-model="newMessage" type="text" class="form-control col-10">
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
           
        }
    },
    computed:{
        conversation()
        {
            return this.$store.getters.getActiveConversation;
        }
    },
    mounted() {
         this.socket = this.$nuxtSocket({
            channel: '/index',
            reconnection: false
        });     

        /* Listen for events: */
        
        this.socket.on('asdServerAnswer',()=>{console.log('asd')});


        this.socket
        .on('mServerAnswer', (msg, cb) => {
            console.log('recibo nuevo mensaje',msg);
            return "RESPUESTA";
        });

    },
    methods:
    {
         
        socketMessage() {
            console.log('emito nuevo mensaje');
            /* Emit events */
            this.socket.emit('asd');
            
            this.socket.emit('m', {
                hello: 'world' 
            }, (resp) => {
               
                console.log('resp',resp)
                /* Handle response, if any */
            })
        },

        sendMessage(){
            /* EVENTUALMENTE SERA SI HAY TEXTO DE NUEVO MENSAJE O HAY ARCHIVO ADJUNTO */
            if(this.newMessage.trim()){
                let data = {
                    conversation_id : this.conversation.id,
                    content:this.newMessage
                }
                this.$axios.post('/message',data)
                    .then(() => {
                        this.socketMessage();
                        this.newMessage='';
                        this.$store.dispatch('fetchConversation',this.user.id)
                    });
            }
        }
    }
}
</script>


<style>
.admin-message{
    text-align: right;
    display: flex;
    justify-content: flex-end;
    color:red;
}
.encuadre{
    border:1px solid #000;
}

    .miniature-img{
        width:150px;
    }
</style>