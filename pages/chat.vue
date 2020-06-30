<template>
    <div class="chat-container row">
        <div class="col col-12 col-xl-9 h-100">
            <chat></chat>
        </div>
    </div>
</template>

<script>
import chat from "@/components/chat/chat.vue";
export default {
    components: { chat },
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
}
</style>