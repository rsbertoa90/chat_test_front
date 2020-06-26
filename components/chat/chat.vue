<template>
    <div class="chat" v-if="conversation">
        <div class="d-flex flex-column conversation">
            <div
                class="d-flex item-container"
                v-for="item in items"
                :class="getItemContainerClass(item)"
            >
                <span v-if="item.type=='DS'" class="day">{{item.day | date}}</span>

                <div
                    v-if="item.type.startsWith('M')"
                    class="message"
                    :class="getMessageClass(item)"
                >
                    <div v-if="item.url" class="miniature-img">
                        <img :src="imagePath(item.url)" />
                    </div>
                    <span class="content" v-if="item.content">{{item.content}}</span>
                    <div class="info">
                        <span
                            v-if="item.type=='MS'"
                            class="status fas"
                            :class="getCheckedIconClass(item)"
                        ></span>
                        <span class="time">{{item.created_at | time}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="chat-input">
            <input v-model="newMessage" type="text" class="form-control" />
            <button @click="sendMessage" :disabled="isSendDisabled">
                <i class="fas fa-chevron-circle-right"></i>
            </button>
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
        },
        items() {
            this.conversation.messages.sort((a, b) => a.id - b.id);
            let items = [
                {
                    type: "DS", // Day Separator
                    day: this.conversation.messages[0].created_at
                }
            ];
            this.conversation.messages.forEach((message, i) => {
                if (
                    i > 0 &&
                    isDayChanged(message, this.conversation.messages[i - 1])
                ) {
                    items.push({
                        type: "DS",
                        day: message.created_at
                    });
                }
                message.type = this.isMessageSent(message) ? "MS" : "MR";
                items.push(message);
            });
            return items;
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
                    admin_id: this.admin ? this.user.id : null,
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
        },
        isMessageSent(message) {
            return (
                (this.admin && message.admin_id) ||
                (!this.admin && !message.admin_id)
            );
        },
        getItemContainerClass(item) {
            switch (item.type) {
                case "DS":
                    return { "day-separator": true };
                case "MS":
                    return { "sent-message": true };
                case "MR":
                    return { "received-message": true };
            }
        },
        getMessageClass(message) {
            let sent = this.isMessageSent(message);
            return { sent: sent, received: !sent };
        },
        getCheckedIconClass(message) {
            return {
                "fa-check": !message.sended,
                "fa-check-double": message.sended,
                viewed: message.viewed
            };
        },
    },
};

function isDayChanged(message, previousMenssage) {
    return previousMenssage.created_at
        .slice(0, 10)
        .localeCompare(message.created_at.slice(0, 10));
}
</script>

<style lang="scss" scoped>
.conversation {
    height: 320px;
    overflow-y: scroll;
    background: #e5ddd5;
}

.item-container {
    width: auto;
    margin: 2px auto;
}

.item-container.day-separator {
    align-self: center;
    margin: 4px auto;
}

.item-container.received-message {
    align-self: flex-start;
    margin-left: 16px;
}

.item-container.sent-message {
    align-self: flex-end;
    margin-right: 16px;
}
.item-container.sent-message + .item-container.received-message,
.item-container.received-message + .item-container.sent-message {
    margin-top: 16px;
}
.day-separator > .day {
    color: #8a8585;
    background: #dce9e9;
    border-radius: 8px;
    box-shadow: 1px 1px #bbbbbb;
    font: Regular 10px/67px Roboto;
    text-align: center;
    padding: 4px 32px;
}

.item-container.sent-message + .item-container.received-message,
.item-container.received-message + .item-container.sent-message {
    margin-top: 16px;
}

.message {
    width: auto;
    min-width: 100px;
    border-radius: 8px;
    box-shadow: 1px 1px #bbbbbb;
    padding: 4px 8px 0 8px;
    margin: auto 16px;
    position: relative;
}

.message.sent {
    background: #dff6c7;
}
.message.received {
    background: #ffffff;
}

:not(.sent-message) + .sent-message :after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-left-color: #dff6c7;
    border-right: 0;
    border-top: 0;
    margin-top: -23px;
    margin-right: -14px;
    z-index: 100;
}

:not(.received-message) + .received-message :before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-right-color: #ffffff;
    border-left: 0;
    border-top: 0;
    margin-top: -23px;
    margin-left: -14px;
    z-index: 100;
}

.message > .content {
    padding-right: 8px;
}
.info {
    display: flex;
    flex-direction: row-reverse;
    color: #bad3a3;
}
.time {
    display: flex;
    font-size: 12px;
}
.status {
    display: flex;
    font-size: 10px;
    margin-top: 3px;
    margin-left: 2px;
}
.viewed {
    color: #5bc8f4;
}
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
.chat-input button:disabled {
    color: #cccccc !important;
}
.chat-input button:hover {
    color: #5db68e;
}
.chat-input button:active {
    color: #36a774;
}

.chat-input button i {
    font-size: 38px;
}
</style>
