<template>
    <div class="fcc w-100" v-if="conversation">
        <div
            v-for="message in conversation.messages"
            :key="message.id"
            class="encuadre"
            :class="[message.admin_id ? 'align-self-start' : 'align-self-end']"
        >
            <div v-if="message.url" class="miniature-img">
                <img :src="imagePath(message.url)" />
            </div>
            <div
                class="mt-1"
                v-if="message.content"
                :class="{'admin-message':message.admin_id}"
            >{{message.content}}</div>
        </div>
        <div class="mt-4 d-flex row">
            <input v-model="newMessage" type="text" class="form-control col-10" />
            <button @click="sendMessage">ENVIAR</button>
        </div>
    </div>
</template>

<script>
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
            /* EVENTUALMENTE SERA SI HAY TEXTO DE NUEVO MENSAJE O HAY ARCHIVO ADJUNTO */
            if (this.newMessage.trim()) {
                let data = {
                    conversation_id: this.conversation.id,
                    content: this.newMessage
                };
                this.$axios.post("/message", data).then(() => {
                    this.newMessage = "";
                    this.$store
                        .dispatch("fetchConversation", this.user.id)
                        .then(() => {
                            console.log(this.conversation);
                        });
                });
            }
        }
    }
};
</script>


<style>
.admin-message {
    text-align: right;
    display: flex;
    justify-content: flex-end;
    color: red;
}
.encuadre {
    border: 1px solid #000;
}

.miniature-img {
    width: 150px;
}
</style>