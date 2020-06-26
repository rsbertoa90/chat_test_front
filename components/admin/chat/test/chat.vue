<template>
    <div class="chat" v-if="conversation">
        <ConversationLine adminView="true" :conversation="conversation" />
        <div class="chat-input">
            <input v-model="newMessage" type="text" class="form-control"/>
            <button @click="sendMessage" :disabled="isSendDisabled">
                <i class="fas fa-chevron-circle-right"></i>
            </button>
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
        },
        isSendDisabled() {
            return this.newMessage.trim().length == 0;
        }
    },
    methods: {
        sendMessage() {
            if (this.newMessage.trim()) {
                let data = {
                    conversation_id: this.conversation.id,
                    admin_id: this.user.id,
                    content: this.newMessage
                };
                this.$axios.post("/message", data).then(() => {
                    this.$store
                        .dispatch(
                            "fetchConversation",
                            this.conversation.client_id
                        )
                        .then(() => {
                            console.log(this.conversation);
                        });
                    this.newMessage = "";
                });
            }
        }
    },
    components: { ConversationLine }
};
</script>

<style lang="scss" scoped>
.chat {
    display: flex;
    flex-direction: column;
}
.chat-input {
    display: flex;
    background: #e4e4e4;
    border-top: solid 1px #e8e8e8;
    padding: 8px 12px;
    outline: none;
}
.chat-input input {
    flex-grow: 1;
    height: 38px;
    border-radius: 19px;
    border: 0;
}
.chat-input input:focus {
    box-shadow: none;
}

.chat-input button {
    border: none;
    background: transparent;
    padding: 0;
    outline: none;
    height: 38px;
    color: #6fcea3;
    margin-left: 4px;
 }
.chat-input button:disabled {color: #cccccc!important;}
.chat-input button:hover { color: #5db68e;}
.chat-input button:active { color: #36a774;}

.chat-input button i {
    font-size: 38px;
}
</style>
