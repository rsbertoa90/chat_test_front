<template>
    <div v-if="conversation" class="form-container d-flex flex-column">
        <attachment 
            :file="file"
            @cancelAttach="$refs.form.resetFile()"
            @isATicketChange="isATicket = $event" />

        <chat-form ref="form"
            :conversation="conversation"
            :isATicket="isATicket"
            @fileChange="file=$event" 
            @writingChange="$emit('writingChange', $event)" 
            @sendMessage="$emit('sendMessage', $event)" />

<!--
        <form
            v-if="conversation"
            @submit.prevent="send"
            class="d-flex align-items-center message-form"
        >
            <input
                v-model="newMessage"
                type="text"
                class="form-control mat material-shadow-1"
            />
            <label class="adj-btn d-flex">
                <i class="material-icons">attach_file</i>
                <input
                    @change="onFileChange"
                    type="file"
                    name="file"
                    accept="image/x-png, image/gif, image/jpeg"
                    class="display-none"
                    ref="fileInput"
                />
            </label>
            <button type="submit" :disabled="isSendDisabled" class="d-flex mat">
                <i class="material-icons">send</i>
            </button>
        </form>
        -->
        <bottom-panel />
    </div>
</template>

<script>
import attachment from './footer/attachment.vue';
import chatForm from './footer/chat-form.vue';
import bottomPanel from './footer/bottom-panel.vue'
export default {
    props: ["conversation"],
    components: {attachment, chatForm, bottomPanel},
    data() {
        return {
            isATicket: true,
            newMessage: "",
            imWriting: false,
//            imageUploaded: false,
            file: null
        };
    },
    computed: {

    },
    methods: {
        /*
        onSendMessage() {
            var fdata = new FormData();
            var shouldSend = false;

            if (this.file) {
                shouldSend = true;
                fdata.append("image", file);
            }

            if (this.newMessage.trim()) {
                shouldSend = true;
                fdata.append("content", this.newMessage);
            }

            if (shouldSend) {
                fdata.append("conversation_id", this.conversation.id);
                fdata.append("prio_auto", this.isATicket ? 1 : 0);
                this.$emit('sendMessage', {fdata: fdata, isATicket: this.isATicket} );
            }
            this.newMessage = "";
            this.resetFileInput();
        },*/
    },
    watch: {
        /*
        newMessage() {
            if (
                (this.newMessage.trim() && !this.imWriting) ||
                (!this.newMessage.trim() && this.imWriting)
            ) {
                this.imWriting = !this.imWriting;
                this.$emit('writingChange', this.imWriting);
            }
        }
        */
    }
};

</script>

<style lang="scss" scoped>
.form-container {
    background: #e4e4e4;
    border-top: solid 1px #e6e6e6;
    outline: none;
    z-index: 2;
    box-shadow: 0 -2px 4px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

</style>