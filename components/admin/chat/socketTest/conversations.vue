<template>
    <div class="fcc mt-4" v-if="conversations && conversations.length">
        <div class="conversation-block" v-for="conversation in conversations" :key="conversation.id" @click="setActiveConversation(conversation)">
            <span v-if="conversation.client">
                {{conversation.client.name}}
            </span>
            <span v-else>
                {{conversation}}
            </span>
            <span v-if="conversation.newMessages">nuevos mensajes: {{conversation.newMessage}}</span>
        </div>
    </div>
</template>

<script>
export default {
    mounted(){
        if(!this.socket)
        {
            this.socket = this.$nuxtSocket({
                channel: '/index',
                reconnection: false
            });     
        }

         var vm  = this;
        //Cuando el server me avisa q hay un mensaje nuevo
        this.socket.on('newMessage', data => {
            if(data.user_id != vm.user.id)
            {
               let conversation =  this.conversations.find(c => {
                   return c.id == data.conversation_id;
               })
               if(!conversation.newMessages)
               {
                   vm.$set(conversation,'newMessages',1);   
               }else{
                   conversation.newMessages++;
               }
            }
        });


    },
    computed:
    {
        conversations()
        {
            return this.$store.getters.getConversations;
        }
    },
    methods:{
        newMessages(conversation)
        {
            return conversation.messages.filter(m => {
                return  (!m.admin && !m.viewed)
            }).length
        },
        setActiveConversation(c)
        {
            this.$store.dispatch('fetchConversation',c.client_id);
        },

    }
}
</script>

<style lang="scss" scoped>
.conversation-block{
    width:100%;
    border:1px solid #000;
    cursor:pointer;

}
</style>
