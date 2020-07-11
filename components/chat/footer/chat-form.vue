<template>
<div>
     <attachment 
        :file="file"
        @cancelAttach="resetFile()"
        @isATicketChange="isATicketChange" />

    <form v-if="conversation" @submit.prevent="onSubmit" class="d-flex align-items-center message-form">
        <textarea v-on:keyup.enter="enterSend" v-model="newMessage" :rows="inputRows" type="text" class="newmessage-input form-control mat material-shadow-1 roboto" />
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
   
</div>
</template>

<script>
import attachment from './attachment.vue'
export default {
    components:{attachment},
    props: ["conversation"],
    data() {
        return {
            isATicket:true,
            file: null,
            newMessage: "",
            imWriting: false,
            file:null,
            preview:null
        };
    },
    mounted(){
        if(this.admin)
        {
            this.isATicket=false;
        }
    },
    methods: {
        enterSend()
        {
            if( this.$mq=='lg' && this.newMessage )
            {
                this.onSubmit();
            }
        },
        isATicketChange(e)
        {
            this.isATicket = e;
            this.onSubmit();
        },
        
        onFileChange(e) {
            this.file = e.target.files[0];
        },
        onSubmit() {
            if(this.fastAnswer)
            {
                this.$emit('sendFastAnswer',this.fastAnswer.id);
            }
            else
            {
                let fdata = new FormData();
                let shouldSend = false;
    
                if (this.file) {
                    shouldSend = true;
                    fdata.append("image", this.file);
                }
    
                if (this.newMessage.trim()) {
                    shouldSend = true;
                    fdata.append("content", this.newMessage);
                }
    
                if (shouldSend) {
                    fdata.append("conversation_id", this.conversation.id);
                    fdata.append("prio_auto", (this.file && this.isATicket) ? 1 : 0);
                    this.$emit('sendMessage', {fdata: fdata, isATicket: (this.file && this.isATicket) } );
                }
            }
            this.newMessage = "";
            this.resetFile();
        },

        resetFile() {
            this.$refs.fileInput.value = "";
            this.file = null;
         
        }
    },
    computed: {
        inputRows(){
            if(!this.newMessage){return 1}
            else{
                let n = this.$mq == 'lg' ? 85 : 23;
                let res = Math.ceil(this.newMessage.length / n);
                return res < 6 ? res : 5;
            }
        },
        fastAnswers(){
            return this.$store.getters.getFastAnswers;
        },
        fastAnswer(){
            if(this.fastAnswers && this.newMessage)
            {
                let txt = this.newMessage.trim();
                if(txt.charAt(0) == '/')
                {
                    let res = null;
                    this.fastAnswers.forEach(fa => {
                        txt = txt.replace('/','');
                        let short = fa.shortcut.replace('/','');
                        if(txt.trim() == short.trim())
                        {
                            res = fa;
                        }
                    });
                    return res;
                }
            }
        },
        isSendDisabled() {
            return !this.newMessage.trim().length && !this.file;
        }
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
.newmessage-input{
    resize:none;
}

.message-form {
    padding: 0 8px;
    width: 100%;
    align-items: center;
}
.message-form input {
    margin: 8px 0 8px 2em;
    flex-grow: 1;
    // height: px;
    color: rgba(0,0,0,0.75);
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
    margin: 0 0.25em;
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