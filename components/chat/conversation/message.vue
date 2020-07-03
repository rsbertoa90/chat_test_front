<template>
    <div class="message" :ref="'messageRef'+message.id" :class="messageClass">
        <a :href="imagePath(message.url)" target="_blank" v-if="message.url">
            <img :src="imagePath(message.url)" class="miniature-img" />
        </a>
        <span class="content" v-if="message.content">{{message.content}}</span>
        <div class="info">
            <span v-if="admin && message.admin" class="mr-3 time">
                {{sentByText}}
            </span>
            <span class="time">{{ message.created_at | time }}</span>
            <span v-if="message.type=='MS'" class="status fas" :class="statusIconClass"></span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["message"],
    computed: {
        messageClass() {
            let sent = this.isMessageSent;
            return { sent: sent, received: !sent };
        },
        isMessageSent() {
            return (
                (this.admin && this.message.admin) || (!this.admin && !this.message.admin)
            );
        },
        sentByText() {
            return this.message.user && this.message.user.id != this.user.id ?
                "enviado por " + this.message.user.name : "enviado por tí";
        },
        statusIconClass() {
            return {
                "fa-check": !this.message.sended,
                "fa-check-double": this.message.sended,
                viewed: this.message.viewed
            };
        }

    }
};
</script>

<style lang="scss" scoped>
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