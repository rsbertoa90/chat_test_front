<template>
    <div class="d-flex conversation-box" @click="setActiveConversation(conversation)">
        <div
            class="d-flex flex-column justify-content-between flex-fill box-content"
            :class="conversationClass"
        >
            <div class="d-flex justify-content-between align-content-center">
                <span class="userid">{{conversation.client.id}}</span>
                <div class="username">{{conversation.client.name}}</div>
                <div
                    v-if="conversation.last_message"
                    class="time"
                >{{ conversation.last_message.created_at | time }}</div>
            </div>
            <div v-if="conversation.last_message" class="d-flex justify-content-between info">
                <div class="last-message-preview">{{ conversation.last_message.content }}</div>
                <div class="unreads" v-if="conversation.unreads">{{conversation.unreads}}</div>
            </div>
        </div>
        <div v-if="isSelected" class="selected"></div>
    </div>
</template>
<script>
export default {
    props: ["conversation"],
    mounted() {
        var vm = this;
        /* conecto al socket */
        this.socket = this.$nuxtSocket({
            channel: "/index",
            reconnection: true
        });

        if (this.conversation) {
            /* conecto a la sala */
            this.socket.emit("joinRoom", this.conversation.id);
        }

        this.socket.on("newMessage", data => {
            if (
                this.admin != data.message.admin &&
                data.conversation_id == vm.conversation.id
            ) {
                this.conversation.unreads += 1;
                let d = {
                    field: "last_message",
                    value: data.message,
                    conversation_id: this.conversation.id
                };
                this.$store.commit("updateConversation", d);
            }
        });
    },
    computed: {
        isSelected() {
            return (
                this.conversation &&
                this.$store.getters.getActiveConversation &&
                this.$store.getters.getActiveConversation.id ==
                    this.conversation.id
            );
        },
        conversationClass() {
            return {
                "prio-auto": this.conversation.prio_auto,
                "prio-manual": this.conversation.prio_manual
            };
        },
        unreads() {
            return 0;
        }
    },
    methods: {
        setActiveConversation(c) {
            this.$store.dispatch("fetchConversation", c.client_id);
        }
    },
    update() {
        console.log("conversation");
        console.log(this.conversation);
    }
};
</script>justify-content-between
<style lang="scss" scoped>
.conversation-box {
    cursor: pointer;
    border-top: 1px ridge #fff;
    height: 74px;
    margin-bottom: 6px;
    box-shadow: 1px 1px 2px #c0c0c0;
}

.box-content {
    padding: 12px 8px 12px 20px;
    min-width: 0;
}

.selected {
    background: #21d1ab;
    width: 12px;
    min-width: 12px;
    z-index: 3;
}

.userid {
    background: #e8a1fe;
    height: 1rem;
    margin: auto 6px auto 0;
    padding: 0px 5px;
    color: white;
    font-size: 0.7rem;
    border-radius: 0.7rem;
}

.username {
    color: rgba(60, 60, 90, 1);
}

.prio-manual {
    background: rgba(178, 3, 122, 0.09);
}
.prio-auto {
    background: rgba(220, 233, 233, 1);
}
.last-message-preview {
    font-size: 16px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #aeb1b8;
}
.time {
    width: auto;
    color: #7dde7f;
    font-size: 12px;
}
.unreads {
    color: white;
    font-weight: bold;
    font-size: 13px;
    width: 20px;
    min-width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #77cd2e;
    text-align: center;
}
</style>