<template>
    <div
        v-if="!empty"
        id="conversation"
        class="d-flex flex-column flex-grow-1 scrollbar-custom h-0 pb-2 chat-background"
        ref="conversation"
    >
        <div
            class="d-flex item-container"
            v-for="item in items"
            :key="item.id"
            :class="getItemContainerClass(item)"
        >
            <span v-if="item.type=='DS'" class="day">{{item.day | date}}</span>

            <div
                class="message"
                :ref="'messageRef'+item.id"
                v-if="item.type.startsWith('M')"
                :class="getMessageClass(item)"
            >
                <a :href="imagePath(item.url)" target="_blank" v-if="item.url">
                    <img :src="imagePath(item.url)" class="miniature-img" />
                </a>
                <span class="content" v-if="item.content">{{item.content}}</span>
                <div class="info">
                    <span
                        v-if="admin && item && item.admin && item.user && item.user.id != user.id"
                        class="mr-3 time"
                    >enviado por {{item.user.name}}</span>
                    <span
                        v-if="admin && item && item.admin && item.user && item.user.id == user.id"
                        class="mr-3 time"
                    >enviado por ti</span>
                    <span class="time">{{ item.created_at | time }}</span>
                    <span
                        v-if="item.type=='MS'"
                        class="status fas"
                        :class="getCheckedIconClass(item)"
                    ></span>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="d-flex justify-content-center align-items-center h-100 chat-background">
        <span class="d-flex">Chat vacío.</span>
    </div>
</template>

<script>
export default {
    props: ["conversation"],
    mounted() {
        this.scrollToBottom();
    },
    computed: {
        /*
        conversation() {
            return this.$store.getters.getActiveConversation;
        },
        */
        empty() {
            return !(
                this.conversation &&
                this.conversation.messages &&
                this.conversation.messages.length > 0
            );
        },
        items() {
            if (!this.empty) {
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
            }
        }
    },
    methods: {
        getMessageClass(message) {
            let sent = this.isMessageSent(message);
            return { sent: sent, received: !sent };
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
        scrollToBottom() {
            /* if (this.$refs.conversation){
                this.$refs.conversation.scrollTop = this.$refs.conversation.scrollHeight;
            } */
            var vm = this;
            setTimeout(() => {
                if (
                    vm.conversation &&
                    vm.conversation.messages &&
                    vm.conversation.messages.length
                ) {
                    /*
                    let lastMessage =
                        vm.conversation.messages[
                            vm.conversation.messages.length - 1
                        ];
                    let refId = "messageRef" + lastMessage.id;
                    if (vm.$refs[refId] && vm.$refs[refId][0]) {
                        vm.$refs[refId][0].scrollIntoView();
                    }
                    */
                    vm.$refs.conversation.scrollTop =
                        vm.$refs.conversation.lastChild.offsetTop - 40;
                }
            }, 100);
        },
        isMessageSent(message) {
            return (
                (this.admin && message.admin) || (!this.admin && !message.admin)
            );
        },
        getCheckedIconClass(message) {
            return {
                "fa-check": !message.sended,
                "fa-check-double": message.sended,
                viewed: message.viewed
            };
        }
    },
    watch: {
        conversation(n, o) {
            console.log("conversation has changed")
            setTimeout(() => {
                this.scrollToBottom();
            }, 500);
        }
    }
};
function isDayChanged(message, previousMenssage) {
    return previousMenssage.created_at
        .slice(0, 10)
        .localeCompare(message.created_at.slice(0, 10));
}
</script>

<style lang="scss" scoped>
#conversation {
    height: 0;
    //    overflow-y: scroll;
    //    scroll-behavior: smooth;
}
.chat-background {
    background: #e5ddd5;
}
.item-container {
    width: auto;
    margin: 2px auto;
}

.item-container.day-separator {
    align-self: center;
    margin: 4px auto;
    font-family: "Roboto", sans-serif !important;
}

.item-container.received-message {
    align-self: flex-start;
    margin-left: 16px;
    margin-right: 24px;
}

.item-container.sent-message {
    align-self: flex-end;
    margin-right: 16px;
    margin-left: 24px;
}
.item-container.sent-message + .item-container.received-message,
.item-container.received-message + .item-container.sent-message {
    margin-top: 16px;
}

.item-container.sent-message + .item-container.received-message,
.item-container.received-message + .item-container.sent-message {
    margin-top: 16px;
}
.day-separator > .day {
    color: #8a8585;
    background: #dce9e9;
    border-radius: 8px;
    box-shadow: 1px 1px #ccc;
    font: Regular 10px/67px Roboto;
    text-align: center;
    padding: 4px 32px;
}
.message {
    width: auto;
    min-width: 100px;
    border-radius: 8px;
    box-shadow: 1px 1px #ccc;
    padding: 4px 8px 0 8px;
    margin: auto 16px;
    position: relative;
    display: flex;
    flex-direction: column;
}

.message.sent {
    background: #dff6c7;
}
.message.received {
    background: #ffffff;
}

:not(.sent-message) + .sent-message .message {
    border-top-right-radius: 0;
}

:not(.sent-message) + .sent-message .message:after {
    position: absolute;
    content: "◤";
    color: #dff6c7;
    right: -19px;
    top: -8px;
    font-size: 20px;
    width: 20px;
    text-shadow: 1px 1px #ccc;
    /*
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
    */
}

:not(.received-message) + .received-message .message:after {
    position: absolute;
    content: "◥";
    color: #ffffff;
    left: -14px;
    top: -8px;
    font-size: 20px;
    text-align: end;
    width: 14px;
    overflow: hidden;
    text-shadow: 0 1px #ccc;
    /*
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
    */
}

:not(.received-message) + .received-message .message {
    border-top-left-radius: 0;
}

.message > .content {
    padding-right: 8px;
}
.info {
    display: flex;
    justify-content: flex-end;
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
</style>