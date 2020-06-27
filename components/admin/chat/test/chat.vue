<template>
      <div class="d-flex flex-column w-100" v-if="conversation">
        <div v-for="message in conversation.messages" :key="message.id" class="d-flex" :class="{'client-message':!message.admin, 'admin-message':message.admin}">
            <div v-if="message.url" class="miniature-img">
                <img :src="imagePath(message.url)" >
            </div>
            <span class="mt-1 message"  v-if="message.content">
                {{message.content}}
            </span>
        </div>
        <div class="mt-4 d-flex row">
            <input v-model="newMessage" type="text" class="form-control col-10">
            <button @click="sendMessage">ENVIAR</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newMessage:''
        }
    },
    computed:{
        conversation()
        {
            
            return this.$store.getters.getActiveConversation
        }
    },
    methods:{
        sendMessage()
        { 
            let data = {
                conversation_id:this.conversation.id,
                content:this.newMessage
            }
            this.$axios.post('/message',data)
                .then(()=>{
                    this.$store.dispatch('fetchConversation',this.conversation.client_id)
                        .then(()=>{
                            console.log(this.conversation)
                        });
                    this.newMessage='';
                });
        }
    }
}
</script>

<style lang="scss" scoped>
.message{
    max-width: 80%;
}

.admin-message{
    color:red;
    justify-content: flex-end;
}
</style>
