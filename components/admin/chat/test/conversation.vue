<template>
    <div class="d-flex conversation-box" @click="setActiveConversation(conversation)">
        <div v-if="isSelected" class="selected"></div>
        <div
            class="d-flex flex-column justify-content-between flex-fill box-content"
            :class="{'prio-auto': conversation.prio_manual || conversation.prio_auto}"
        >
            <div class="d-flex justify-content-between">
                <div class="username">{{conversation.client.name}}</div>
                <div class="time">10:14</div>
            </div>
            <div class="d-flex justify-content-between info">
                <div class="last-message-preview">Blalala</div>
                <div class="unreads">2</div>
            </div>
        </div>
        <div v-if="conversation.prio_manual" class="prio-manual"></div>
    </div>
</template>
<script>
export default {
    props: ["conversation"],
    computed: {
        isSelected  () {
            return this.conversation && 
                this.$store.getters.getActiveConversation &&
                this.$store.getters.getActiveConversation.id == this.conversation.id; 
        },
        
    },
    methods: {
        setActiveConversation(c) {
            this.$store.dispatch("fetchConversation", c.client_id);
        }
    },
    mounted() {
        console.log(this.conversation);
    }
};
</script>justify-content-between
<style lang="scss" scoped>
.conversation-box {
    border-top: 1px ridge #fff;
    height: 74px;
    margin-bottom: 6px;
    box-shadow: 1px 1px 2px #c0c0c0;
}

.box-content {
    padding: 12px 8px 12px 20px;
}

.selected {
    background: #77cd2e;
    // min-width: 6px;width
    width: 4px;
    margin-right: -4px;
    z-index:3;
}

.username {
    color: #3c3c59;
}

.prio-manual {
    background: #21d1ab;
    width: 12px;
    min-width: 12px;
}
.prio-auto {
    background: #dce9ea;
}
.last-message-preview {
    color: #aeb1b8;
}
.time {
    width: auto;
    color: #7DDE7F;
    font-size:12px;
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