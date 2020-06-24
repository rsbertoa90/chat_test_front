<template>
    <div class="d-flex w-100 flex-column" v-if="conversation">
        <ConversationLine adminView="true" :conversation="conversation"/>
        <div class="mt-4 d-flex row">
            <input v-model="newMessage" type="text" class="form-control col-10" />
            <button @click="sendMessage">ENVIAR</button>
        </div>
    </div>
</template>

<script>
import ConversationLine from "@/components/chat/ConversationLine";
export default {
    data() {
        return {
            newMessage: ""
        };
    },
    computed: {
        conversation() {
            return this.$store.getters.getActiveConversation;
        }
    },
    methods: {
        sendMessage() {
            let data = {
                conversation_id: this.conversation.id,
                admin_id: this.user.id,
                content: this.newMessage
            };
            this.$axios.post("/message", data).then(() => {
                this.$store
                    .dispatch("fetchConversation", this.conversation.client_id)
                    .then(() => {
                        console.log(this.conversation);
                    });
                this.newMessage = "";
            });
        }
    },
    components: { ConversationLine }
};
</script>

<style lang="scss" scoped>

</style>
