<template>
<no-ssr>
    <div class="container">
        <div class="row">
            <div class=" col-3">
                <conversations></conversations> 
            </div>
            <div class="col-6">
                <chat></chat> 
            </div>
            <div class="col-3">
                <notes></notes>
            </div>
        </div>
    </div>
</no-ssr>
</template>


<script>
import notes from './notes.vue'
 import conversations from './conversations.vue';
import chat from '@/components/chat/test/socketTest.vue'; 
export default {
     components:{conversations,chat,notes}, 
     mounted()
     {
         this.$store.dispatch('fetchAllConversations');
     }
}
</script>

