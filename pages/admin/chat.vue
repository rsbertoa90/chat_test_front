<template>
    <div class="chat-container">
        <chat></chat>
    </div>
</template>

<script>
import chat from "@/components/admin/chat/ChatPage.vue";
export default {
    layout: "admin",
    middleware: "checkAdmin",
    components: { chat },
    name: "adminChat"
};
</script>

<style scoped>
.chat-container {
    background: #FAFAFA;
}
</style>
