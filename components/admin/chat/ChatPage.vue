<template>
<no-ssr>
    <div class="container admin-chat">
        <div class="row h-100">
            <div class="col col-3 h-100 p-0">
                <conversations></conversations> 
            </div>
            <div class="col col-6 h-100 p-0 ">
                <!-- <chat-header></chat-header> -->
                <chat></chat> 
            </div>
            <div class="col col-3 h-100 p-0">
                <notes></notes>
            </div>
        </div>
    </div>
</no-ssr>
</template>


<script>
import chatHeader from './chat-header.vue';
import notes from './notes.vue';
import conversations from './conversations.vue';
import chat from '@/components/chat/chat.vue';
export default {
     components:{conversations,chat,notes,chatHeader},
     mounted() {
         this.$store.dispatch('fetchAllConversations');
     }
}
</script>
<style scoped lang="scss">
.admin-chat {
    height: 85vh;
    margin:0 auto;
    background: #fff;
    box-shadow: 1px 1px 2px #ccc;
}
</style>
