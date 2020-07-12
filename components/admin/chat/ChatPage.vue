<template>
<no-ssr>
    <div class="container-fluid admin-chat">
        <div class="row h-100">
            <div class="col col-3 h-100 p-0">
                <conversations></conversations>
            </div>
            <div class="col col-6 h-100 p-0 " v-if="activeConversation">
                <chat></chat>
            </div>
            <div class="col col-3 h-100 p-0"  v-if="activeConversation">
                <notes></notes>
            </div>
        </div>
    </div>
</no-ssr>
</template>


<script>
import notes from './notes.vue';
import conversations from './conversations.vue';
import chat from '@/components/chat/chat.vue';
export default {
     components:{conversations,chat,notes},
     mounted() {
         this.$store.dispatch('fetchConversations');
     },
     computed:{
         activeConversation()
         {
             return this.$store.getters.getActiveConversation ;
         }
     }
}
</script>
<style scoped lang="scss">
.admin-chat {
    height: 85vh;
    margin: 0 auto;
    background: #fff;
    box-shadow: 1px 1px 4px rgba(0,0,0,.25);
}
</style>
