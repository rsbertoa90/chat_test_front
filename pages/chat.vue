<template>
    <div class="chat-container row">
        <div class=" col-12 col-lg-9 p-0 h-100">
            <chat></chat>
        </div>
        <div class="col-12 col-lg-3" v-if="$mq!='lg'">
            <userOrders></userOrders>
        </div>
    </div>
</template>

<script>
import userOrders from '@/components/chat/orders.vue';
import chat from "@/components/chat/chat.vue";
export default {
    components: { chat,userOrders },
    layout:'clean',
    computed:{
        conversation(){
            return this.$store.getters.getActiveConversation;
        }
    },
    mounted() {
        if (!this.user) {
            this.$router.push("/");
        } else if (this.admin) {
            this.$router.push("/admin/chat");
        } else {
            this.$store.dispatch("fetchConversation", this.user.id)
                // agregue esto para que le llegue chatMessages dentro de chat.
                // Me base en como lo hace en conversation del admin, en setActiveConversation
                .then(() => {
                this.$store.dispatch('fetchChatMessages', this.$store.getters.getActiveConversation.id);
            });
        }

        setTimeout(() => {
            window.scrollTo(0,document.body.scrollHeight);
        }, 1000);
    }
};
</script>
<style scoped>
.chat-container {
    background: #FAFAFA;
    height: 90vh;
    font-family: 'Roboto';
}
</style>
