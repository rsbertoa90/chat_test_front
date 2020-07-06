<template>
    <div
        v-if="empty"
        class="d-flex justify-content-center align-items-center h-100 chat-background"
    >
        <h4 class="d-flex roboto">Chat vacío.</h4>
    </div>
    <div
        v-else
        id="conversation"
        ref="conversation"
        class="d-flex flex-column-reverse flex-grow-1 scrollbar-custom h-0 pb-2 chat-background"
        @click="scrollToBottom" >
        <div
            class="d-flex item-container"
            v-for="(item, index) in items"
            :key="index"
            :class="getItemContainerClass(item)"
        >
            <date-separator v-if="item.type=='DS'" :date="item.date" />
            <!--    @hook:mounted="$emit('childMounted', items.length-1 == index)"/> -->
                
            <message
                v-if="item.type.startsWith('M')"
                :message="item" />
                <!-- @hook:mounted="$emit('childMounted', items.length-1 == index)" -->
            
        </div>
        <div class="enviando" v-if="loadingMessage">
            <h1>ENVIANDO MENSAJE...</h1>
        </div>
    </div>
</template>

<script>
import message from "./conversation/message.vue";
import dateSeparator from "./conversation/date-separator.vue";
export default {
    props: ["conversation"],
    components: { message, dateSeparator },
    mounted() {
        /*  */
        // this.scrollToBottom();
    },
    computed: {
        loadingMessage() {
            return this.$store.getters.getLoadingMessage;
        },
        empty() {
            return !(
                this.conversation &&
                this.conversation.messages &&
                this.conversation.messages.length > 0
            );
        },
        items() {
            if (!this.empty) {
                let items = [];
                this.conversation.messages.forEach((message, i) => {
                    const messageItem = {
                        ...message,
                        type: this.isMessageSent(message) ? "MS" : "MR"
                    };
                    if (i < this.conversation.messages.length - 1) {
                        const next = this.conversation.messages[i + 1]; // next, el siguiente mas antiguo
                        messageItem.firstOfGroup = this.isMessageSent(message) !== this.isMessageSent(next)
                        items.push(messageItem); 
                        if (isDayChanged(message, next)) {
                            items.push({ type: "DS", date: message.created_at });
                        }
                    } else { // si es el mas antiguo
                        messageItem.firstOfGroup = true;
                        items.push(messageItem);
                        items.push({ type: "DS", date: message.created_at})
                    }
                });
                return items;
            }
        }
    },
    methods: {
        getItemContainerClass(item) {
            return {
                "day-separator": item.type == "DS",
                "sent-message": item.type == "MS",
                "received-message": item.type == "MR",
                "first-of-group": item.firstOfGroup
            }; /*
            switch (item.type) {
                case "DS":
                    return { "day-separator": true };
                case "MS":
                    return { "sent-message": true };
                case "MR":
                    return { "received-message": true };
            } */
        },
        scrollToBottom() {
            var vm = this;
            setTimeout(() => {
                if (
                    vm.conversation &&
                    vm.conversation.messages &&
                    vm.conversation.messages.length &&
                    vm.$refs.conversation
                ) {
                    vm.$refs.conversation.scrollTop =
                        vm.$refs.conversation.scrollHeight;
                }
            }, 250);
        },
        isMessageSent(message) {
            return !(this.admin ^ message.admin);
        }
    },
    watch: {
        conversation(n, o) {
            this.scrollToBottom();
            
        },
        'conversation.messages'() {
            this.scrollToBottom();
        }
    }
};
function isDayChanged(a, b) {
    return a.created_at.slice(0, 10).localeCompare(b.created_at.slice(0, 10));
}
</script>

<style lang="scss" scoped>
#conversation {
    height: 0;
    //    overflow-y: scroll;
    //    scroll-behavior: smooth;
}
.chat-background {
    min-height: 50vh;
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

.sent-message.first-of-group .message {
    border-top-right-radius: 0;
}

.sent-message.first-of-group .message:after {
    position: absolute;
    content: "◤";
    color: #dff6c7;
    right: -19px;
    top: -8px;
    font-size: 20px;
    width: 20px;
    text-shadow: 1px 1px #ccc;
}

.received-message.first-of-group .message {
    border-top-left-radius: 0;
}

.received-message.first-of-group .message:after {
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

</style>