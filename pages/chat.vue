<template>
    <div class="chat-container row">
        <div class=" col-12 col-lg-9 h-100">
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
    mounted() {
        if (!this.user) {
            this.$router.push("/");
        } else if (this.admin) {
            this.$router.push("/admin/chat");
        } else {
            this.$store.dispatch("fetchConversation", this.user.id);
        }
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