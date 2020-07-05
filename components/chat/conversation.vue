<template>
    <div v-if="!empty" id="conversation" ref="conversation"
        class="d-flex flex-column flex-grow-1 scrollbar-custom h-0 pb-2 chat-background">
        <div class="d-flex item-container" v-for="item in items" :key="item.id" :class="getItemContainerClass(item)">
            <date-separator v-if="item.type=='DS'" :date="item.date"/>
            <message v-if="item.type.startsWith('M')" :message="item"/>
        </div>
        <div class="enviando" v-if="loadingMessage">
               <h1> ENVIANDO MENSAJE... </h1>
        </div>
    </div>
    <div v-else class="d-flex justify-content-center align-items-center h-100 chat-background">
        <span class="d-flex roboto">Chat vacío.</span>
    </div>
</template>

<script>
import message from './conversation/message.vue';
import dateSeparator from './conversation/date-separator.vue'
export default {
    props: ["conversation"],
    components: {message, dateSeparator },
    mounted() {
        this.scrollToBottom();
    },
    computed: {
        loadingMessage(){
            return this.$store.getters.getLoadingMessage;
        },
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
                        date: this.conversation.messages[0].created_at
                    }
                ];
                this.conversation.messages.forEach((message, i) => {
                    if (
                        i > 0 &&
                        isDayChanged(message, this.conversation.messages[i - 1])
                    ) {
                        items.push({
                            type: "DS",
                            date: message.created_at
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
            var vm = this;
            setTimeout(() => {
                if (
                    vm.conversation 
                    && vm.conversation.messages 
                    && vm.conversation.messages.length
                    && vm.$refs.conversation
                    && vm.$refs.conversation.lastChild
                )
                {
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

}

:not(.received-message) + .received-message .message {
    border-top-left-radius: 0;
}

</style>