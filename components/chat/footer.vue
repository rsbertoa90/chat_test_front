<template>
    <div v-if="conversation" class="form-container d-flex flex-column">
        <attachment 
            :file="file"
            @cancelAttach="$refs.form.resetFile()"
            @isATicketChange="isATicket=$event" />

        <chat-form ref="form"
            :conversation="conversation"
            :isATicket="isATicket"
            @fileChange="file=$event" 
            @writingChange="$emit('writingChange', $event)" 
            @sendMessage="$emit('sendMessage', $event)"
            @sendFastAnswer="sendFastAnswer" 
            @hook:mounted="childMounted.chatForm=true"
            @hook:destroyed="childMounted.chatForm=false"/>
        
        <bottom-panel 
            v-if="admin" 
            @sendFastAnswer="sendFastAnswer" 
            @hook:mounted="childMounted.bottomPanel=true" 
            @hook:destroyed="childMounted.bottomPanel=false"/>
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
            isATicket: false,
            file: null,
            childMounted: {
                chatForm: false,
                bottomPanel: false
            }
        };
    },
    methods:{
        sendFastAnswer(e)
        {
            this.$emit('sendFastAnswer',e);
        }
    },
    watch: {
        childMounted: {
            deep: true,
            handler: function(v) {
                this.$emit('childMounted', Object.values(v).reduce((a,b) => a && b));
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
    box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.1);
    clip-path: inset(-4px 0 0 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

</style>