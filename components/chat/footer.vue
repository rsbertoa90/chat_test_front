<template>
    <div v-if="conversation" class="form-container d-flex flex-column">
        <attachment @attachChange="onAttachChange" />
        <!--
        <div class="row w-100 d-flex justify-content-between pl-4 mb-3" v-if="preview">
            <div class="col-4">
                <div class="preview-img">
                    <img :src="preview" v-if="preview" />
                </div>
            </div>
            <div class="col-7 fcc" v-if="!admin">
                <div
                    class="d-flex justify-content-center text-center mt-2 isaticket-q"
                >¿ ESTAS ADJUNTANDO UN COMPROBANTE DE PAGO ?</div>
                <div class="d-flex justify-content-around mt-2">
                    <button
                        class="btn btn-lg isaticket-a"
                        @click="isATicket=true"
                        :class="{'btn-success':isATicket,'btn-secondary':!isATicket}"
                    >SI</button>
                    <button
                        class="btn btn-lg isaticket-a"
                        @click="isATicket=false"
                        :class="{'btn-danger':!isATicket,'btn-secondary':isATicket}"
                    >NO</button>
                </div>
            </div>
            <div class="col-1 p-0 d-flex flex-column">
                <button class="mat m-1" @click="resetFileInput()">
                    <i class="material-icons">close</i>
                </button>
            </div>
        </div>
        -->
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
        <bottom-panel />
    </div>
</template>

<script>
import attachment from './footer/attachment.vue';
import form from './footer/form.vue';
import bottomPanel from './footer/bottom-panel.vue'
export default {
    props: ["conversation"],
    components: {attachment, form, bottomPanel},
    data() {
        return {
            preview: null,
            isATicket: true,
            newMessage: "",
            imWriting: false,
//            imageUploaded: false,
            file: null
        };
    },
    computed: {
        isSendDisabled() {
            return !this.newMessage.trim().length && !this.preview;
        }
    },
    methods: {
        /*
        onFileChange(e) {
            const file = e.target.files[0];
            if (file) {
                this.preview = URL.createObjectURL(file);
                this.imageUploaded = true;
            }
        },
        resetFileInput() {
            this.$refs.fileInput.value = "";
            this.preview = null;
            this.imageUploaded = false;
        }, */
        onAttachChange(e) {
            this.preview = e.preview;
            this.file = e.file;
            this.isATicket = this.isATicket;
        },
        send() {
            var fdata = new FormData();
            var shouldSend = false;

            if (this.preview) {
                // var file = $('input[type="file"]')[0].files[0];
                if (this.file) {
                    shouldSend = true;
                    fdata.append("image", file);
                }
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
        },
    },
    watch: {
        newMessage() {
            if (
                (this.newMessage.trim() && !this.imWriting) ||
                (!this.newMessage.trim() && this.imWriting)
            ) {
                this.imWriting = !this.imWriting;
                this.$emit('writingChange', this.imWriting);
            }
        }
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
.message-form {
    padding: 0 8px;
    width: 100%;
    align-items: center;
}
.message-form input {
    margin: 8px 0;
    flex-grow: 1;
    // height: px;
    border-radius: 19px;
    border: 0;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
}
.message-form input:focus {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}

.message-form button,
.adj-btn {
    border: none;
    background: transparent;
    padding: 0;
    outline: none;
    // height: 38px;
    color: #6fcea3;
    margin: 0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
    transition: box-shadow 0.15s ease-in-out;
    cursor: pointer;
}
.message-form button:disabled {
    color: #cccccc !important;
}
.message-form button:hover,
.adj-btn {
    color: #5db68e;
}
.message-form button:active {
    color: #36a774;
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.25);
}

.message-form button i,
.adj-btn i {
    font-size: 32px;
}

</style>