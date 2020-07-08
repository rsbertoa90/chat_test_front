<template>
    <div v-if="empty"
         class="d-flex justify-content-center align-items-center h-100 chat-background">
        <h4 class="d-flex roboto">Conversación vacía.</h4>
    </div>
    <div id="conversation-container" v-else class="d-flex flex-column flex-grow-1 h-0" @mouseover="onMouseover">

        <div id="goto-bottom" v-if="!isScrollInBottomZone" @click="scrollToBottom" class="material-shadow-2">
            <span v-if="hasUnreadMessages">ver mensajes nuevos</span>
            <i class="material-icons">expand_more</i>
        </div>

        <div
            id="conversation"
            ref="conversation"
            class="d-flex flex-column-reverse flex-grow-1 h-0 scrollbar-custom chat-background"
            v-scroll="onScroll">

            <progress-bar v-if="loadingMessage"/>

            <div
                class="d-flex item-container"
                v-for="(item, index) in items"
                :key="index"
                :class="getItemContainerClass(item)"
            >
                <date-separator v-if="item.type=='DS'" :date="item.date"/>
                <!-- @hook:mounted="$emit('childMounted', items.length-1 == index)"/> -->

                <message
                    v-if="item.type.startsWith('M')"
                    :message="item"/>
                <!-- @hook:mounted="$emit('childMounted', items.length-1 == index)" -->
            </div>

        </div>
    </div>
</template>

<script>
import message from "./conversation/message.vue";
import dateSeparator from "./conversation/date-separator.vue";
import progressBar from "@/components/common/progress-bar-indeterminate.vue"

export default {
    props: ["conversation", "chatMessages"],
    components: {message, dateSeparator, progressBar},
    data() {
        return {
            loadingMore: false,
            isScrollInBottomZone: true
        };
    },
    mounted() {
        /*  */
        // this.scrollToBottom();

    },
    computed: {
        chatMessagesPagination() {
            return this.$store.getters.getChatMessagesPagination;
        },
        moreMessagesUrl() {
            if (this.chatMessagesPagination && this.chatMessagesPagination.last_page > this.chatMessagesPagination.current_page) {
                return this.chatMessagesPagination.next_page_url;
            }
        },
        loadingMessage() {
            return this.$store.getters.getLoadingMessage;
        },
        empty() {
            return !(
                this.conversation &&
                this.chatMessages &&
                this.chatMessages.length > 0
            );
        },
        items() {
            if (!this.empty) {
                let items = [];
                this.chatMessages.forEach((message, i) => {
                    const messageItem = {
                        ...message,
                        type: this.isMessageSent(message) ? "MS" : "MR"
                    };
                    if (i < this.chatMessages.length - 1) {
                        const next = this.chatMessages[i + 1]; // next, el siguiente mas antiguo
                        messageItem.firstOfGroup = this.isMessageSent(message) !== this.isMessageSent(next)
                        items.push(messageItem);
                        if (isDayChanged(message, next)) {
                            items.push({type: "DS", date: message.created_at});
                        }
                    } else { // si es el mas antiguo
                        messageItem.firstOfGroup = true;
                        items.push(messageItem);
                        items.push({type: "DS", date: message.created_at})
                    }
                });
                return items;
            }
        },

        hasUnreadMessages() {
            return this.conversation.unreads && !this.isScrollInBottomZone;
        }
    },
    methods: {
        loadMoreMessages() {
            if (this.moreMessagesUrl && !this.loadingMore) {
                this.loadingMore = true;
                this.$store.dispatch('fetchMoreChatMessages', this.moreMessagesUrl).then(() => {
                    this.loadingMore = false;
                });
            }
        },
        getItemContainerClass(item) {
            return {
                "day-separator": item.type == "DS",
                "sent-message": item.type == "MS",
                "received-message": item.type == "MR",
                "first-of-group": item.firstOfGroup
            };
        },
        scrollToBottom() {
            var vm = this;
            setTimeout(() => {
                if (
                    vm.conversation &&
                    vm.chatMessages &&
                    vm.chatMessages.length &&
                    vm.$refs.conversation
                ) {
                    vm.$refs.conversation.scrollTop =
                        vm.$refs.conversation.scrollHeight - vm.$refs.conversation.clientHeight;
                }
            }, 250);
        },
        isMessageSent(message) {
            return !(this.admin ^ message.admin);
        },
        onScroll(e, p) {
            // isScrollInBottomZone = está viendo parte de la zona que es visible cuando el scroll completamente bajo
            this.isScrollInBottomZone = this.$refs.conversation.scrollTop >
                this.$refs.conversation.scrollHeight - 2 * this.$refs.conversation.clientHeight;

            if (p.scrollTop < 100) {
                this.loadMoreMessages()
            }
        },
        onMouseover() {
            if(!this.hasUnreadMessages) {
                this.$emit('iSawTheMessages');
            }
        }
    },
    watch: {
        /*
        conversation: {
            handle: function (n, o) {
                console.log(n);
                // this.scrollToBottom()
            },
            deep: true
        },*/
        'chatMessages'() {
            if (this.isScrollInBottomZone && this.conversation.unreads) {
                this.scrollToBottom();
            }
        },
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

#conversation-container {
    position: relative;
}

#goto-bottom {
    position: absolute;
    cursor: pointer;
    bottom: 1rem;
    right: 1rem;
    background: #E5D3DF;
    border-radius: 1.5rem;
    width: auto;
    height: 3rem;
    min-width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    color: #444;
    // padding: 0.5rem;
    i {
       // margin-right: 1rem;
        font-size: 32px;

    }
    span {
        margin-left: 1rem;
    }
}

.chat-background {
    min-height: 50vh;
    background: #e5ddd5;
}

.item-container ~ .item-container {
    width: auto;
    margin: 2px auto;
}

.item-container {
    width: auto;
    margin: 2px auto;
    margin-bottom: 2rem;
}

.item-container.day-separator {
    align-self: center;
    margin: 1rem auto;
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
    margin-bottom: 1rem;
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
