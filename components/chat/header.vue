<template>
    <admin v-if="admin" :conversation="conversation" />
    <client v-else :conversation="conversation" />
</template>

<script>
import admin from './header/admin.vue';
import client from './header/client.vue';
export default {
    name: "chat-header",
    props: ["conversation"],
    components: { admin, client },
    mounted() {
        console.log("header mounted");
        console.log(this.admin);

    }
}
</script>

<style scoped>

</style>