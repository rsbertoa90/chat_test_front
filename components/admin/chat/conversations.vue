<template>
    <div class="conversations" v-if="conversations">
        <conversation 
            v-for="conversation in conversations" :key="conversation.id"
            :conversation="conversation"
        />
    </div>
</template>

<script>
import conversation from './conversation';
export default {
    components: { conversation },
    computed: {
        conversations() {
            return this.$store.getters.getConversations;
        }
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
.conversations {
    max-height: 85vh;
    overflow-y:scroll;
    box-shadow: 1px 0 1px #ccc;
    z-index: 1;
}
</style>
