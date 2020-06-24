<template>
    <div class="d-flex flex-column conversation">
        <div class="d-flex item-container" v-for="item in items" :class="getItemContainerClass(item)">

            <span v-if="item.type=='DS'" class="day">{{item.day | date}}</span>

            <div v-if="item.type.startsWith('M')" class="message" :class="getMessageClass(item)">
                <div v-if="item.url" class="miniature-img">
                    <img :src="imagePath(item.url)" />
                </div>
                <span class="content" v-if="item.content">{{item.content}}</span>
                <span class="time">{{item.created_at | time}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["adminView", "conversation"],
    computed: {
        items() {
            this.conversation.messages.sort((a, b) => a.id - b.id);
            let items = [{
                type: 'DS', // Day Separator
                day: this.conversation.messages[0].created_at
            }];
            this.conversation.messages.forEach((message, i) => {
                if(i > 0 && isDayChanged(message, this.conversation.messages[i-1])) {
                    items.push({
                        type: 'DS',
                        day: message.created_at
                    })
                }
                message.type = this.isMessageSent(message) ? 'MS' : 'MR';
                items.push(message);
            });
            return items;
        }
    },
    methods: {
        isMessageSent(message) {
            return (this.adminView && message.admin_id) ||
                (!this.adminView && !message.admin_id);
        },
        getItemContainerClass(item) {
            switch(item.type) {
                case 'DS':
                    return { 'day-separator': true };
                case 'MS':
                    return { 'sent-message': true };
                case 'MR':
                    return { 'received-message': true };
            }
        },
        getMessageClass(message) {
            let sent = this.isMessageSent(message);
            return { sent: sent, received: !sent };
        }
    }
}

function isDayChanged(message, previousMenssage) {
    return previousMenssage.created_at.slice(0,10)
        .localeCompare(message.created_at.slice(0,10));
}

function formatDate(stringDate) {
    let date = new Date(stringDate);
    return date.toLocaleDateString();
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

.day-separator>.day {
    color: #8A8585;
    background: #DCE9E9;
    border-radius: 8px;
    box-shadow: 1px 1px #bbbbbb;
    font: Regular 10px/67px Roboto;
    text-align: center;
    padding: 4px 32px;
}

.message {
    width: auto;
    min-width: 100px;
    border-radius: 8px;
    box-shadow: 1px 1px #bbbbbb;
    padding: 4px 8px 0 8px;
    margin: auto 16px;
}

.message.sent {
    background: #dff6c7;
}
.message.received {
    background: #ffffff;
}

.item-container.sent-message+.item-container.received-message, 
.item-container.received-message + .item-container.sent-message {
    margin-top: 16px;
}

.message>.content {
    padding-right: 8px;
}
.message>.time {
    display: block;
    text-align: right;
    font-size: 12px;
    color: #BAD3A3
}
</style>