<template>
    <div class="d-flex flex-column chat">
        <chatHeader v-if="conversation" :conversation="conversation" />
        <div
            v-if="conversation"
            class="d-flex flex-column flex-grow-1"
            @mouseover="iSawTheMessages()"
        >
            <conversation 
                :conversation="conversation" 
                ref="conversation"/>
           
            <chat-footer
                :conversation="conversation"
                @writingChange="onWritingChange"
                @sendMessage="onSendMessage"/>

        </div>
        <div v-else class="d-flex justify-content-center align-items-center flex-grow-1">
            <span class="d-flex">Seleccione una conversación.</span>
        </div>
    </div>
</template>

<script>
import chatHeader from "./header.vue";
import conversation from "./conversation.vue";
import chatFooter from "./footer.vue";

export default {
    components: { chatHeader, conversation, chatFooter },
    data() {
        return {
            hesWriting: false,
            imOnline: true,
            hesOnline: false,
/*
            imageUploaded: false,
            file: null
            */
        };
    },
    mounted() {
        var vm = this;
        /* conecto al socket */
        this.socket = this.$nuxtSocket({
            channel: "/index",
            reconnection: true
        });

        //cuando recibo un mensaje por el socket
        this.socket.on("newMessage", data => {
            if (
                data.user_id != vm.user.id &&
                data.conversation_id == vm.conversation.id
            ) {
                this.$store.commit(
                    "addMessageToActiveConversation",
                    data.message
                );
                this.conversation.unreads += 1;
                this.$refs.conversation.scrollToBottom();
                if (this.admin) {
                    this.$store.commit(
                        "relocateConversation",
                        this.conversation
                    );
                }
            }
        });

        //Cuando el server me avisa que el otro vio mis mensajes
        this.socket.on("heSawMyMessages", data => {
            if (
                data.user_id != vm.user.id &&
                data.conversation_id == vm.conversation.id
            ) {
                //me aseguro q el mensaje no es mio

                vm.$store.commit("heSawMyMessages", {
                    conversation_id: vm.conversation.id,
                    admin: vm.admin ? 1 : 0
                });
            }
        });
    },

    computed: {
        conversation() {
            return this.$store.getters.getActiveConversation;
        },
        conversations() {
            return this.$store.getters.getConversations;
        }
    },
    watch: {

        conversation(n, o) {
            if (this.conversation) {
                /* conecto a la sala */
                this.socket.emit("joinRoom", this.conversation.id);
            }
        },
        "conversation.unreads"() {
            if (this.admin && this.conversation) {
                this.$store.commit("changeUnreads", {
                    conversation_id: this.conversation.id,
                    unreads: this.conversation.unreads
                });
            }
        }
    },
    methods: {

        iSawTheMessages() {
            // console.log("isSawTheMessages");
            if (this.conversation.unreads) {
                var vm = this;
                this.$axios.put(`/view-messages/${this.conversation.id}`);

                let data = {
                    conversation_id: vm.conversation.id,
                    user_id: vm.user.id,
                    admin: vm.admin
                };
                this.socket.emit("iSawHisMessages", data);

                this.$store.commit("iSawHisMessages", {
                    conversation_id: vm.conversation.id,
                    admin: vm.admin ? 1 : 0
                });
                this.conversation.unreads = 0;
            }
        },
        socketMessage(message) {
            let data = {
                user_id: this.user.id,
                conversation_id: this.conversation.id,
                message: message
            };
            this.socket.emit("sendNewMessage", data);
        },
        onSendMessage(event) {
            /*
            console.log("sendMessage");
            console.log(event.fdata);
            console.log("isATicket " + event.isATicket);
            */
            
            var vm = this;
            this.$axios.post("/message", event.fdata).then(r => {
                vm.socketMessage(r.data);
                vm.$store.commit("addMessageToActiveConversation", r.data);
                vm.$refs.conversation.scrollToBottom();

                if (this.admin) {
                    let d = {
                        field: "last_message",
                        value: r.data,
                        conversation_id: this.conversation.id
                    };
                    this.$store.commit("updateConversation", d);
                    this.$store.commit(
                        "relocateConversation",
                        this.conversation
                    );
                }
            });

            if (event.isATicket) {
                const data = {
                    conversation_id: this.conversation.id,
                    field: "prio_auto",
                    value: true
                };
                if (this.admin) {
                    this.$store.commit("updateConversation", data);
                }
                this.socket.emit("updateConversation", data);
            }
        },
        onWritingChange(writing) {
            console.log("onWritingChange");
            const data = {
                conversation_id: this.conversation.id,
                writing: writing,
                user_id: this.user.id
            };
            this.socket.emit("imWriting", data);
            this.iSawTheMessages();
        }
    }
};
</script>

<style lang="scss" scoped>

.display-none {
    display: none;
}


.chat {
    //height: 100%;
    min-height: 100%;
}
.empty {
    box-sizing: border-box;
}
</style>
