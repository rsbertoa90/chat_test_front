<template>
    <admin v-if="admin" :conversation="conversation" 
        @hook:mounted="$emit('childMounted', true)" 
        @hook:destroyed="$emit('childMounted', false)"/>
    
    <client v-else :conversation="conversation"
        @hook:mounted="$emit('childMounted', true)" 
        @hook:destroyed="$emit('childMounted', false)"/>

</template>

<script>
import admin from './header/admin.vue';
import client from './header/client.vue';
export default {
    name: "chat-header",
    props: ["conversation"],
    components: { admin, client }
    
}
</script>

<style scoped>

</style>