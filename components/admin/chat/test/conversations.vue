<template>
    <div class="fcc mt-4" v-if="conversations">
        <div class="conversation-block" v-for="conversation in conversations" :key="conversation.id" @click="setActiveConversation(conversation)">
            {{conversation.client.name}}
        </div>
    </div>
</template>

<script>
export default {
    computed:
    {
        conversations()
        {
            return this.$store.getters.getConversations;
        }
    },
    methods:{
        setActiveConversation(c)
        {
            this.$store.dispatch('fetchConversation',c.client_id);
        }
    }
}
</script>

<style lang="scss" scoped>
.conversation-block{
    width:100%;
    border:1px solid #000;
    cursor:pointer;

}
</style>
