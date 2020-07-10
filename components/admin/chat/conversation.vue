<template>
    <div v-if="conversation" class="d-flex conversation-box top-shine" @click="setActiveConversation(conversation)" :class="{'taken':conversation.taken_by}">
        <div
            class="d-flex flex-column justify-content-between flex-fill box-content"
            :class="conversationClass" >
            <div class="d-flex justify-content-between align-content-center">
                <span class="userid roboto">{{conversation.client.id}}</span>
                <div class="username roboto">{{conversation.client.name}}</div>
                <div
                    v-if="conversation.last_message"
                    class="time"
                >{{ conversation.last_message.created_at | time }}</div>
            </div>

            <div v-if="!conversation.taken_by">
                <div v-if="conversation.last_message && !conversation.hesWriting" class="d-flex justify-content-between info">
                    <div class="last-message-preview roboto">
                        {{ conversation.last_message.content }}
                    </div>
                    <div class="unreads roboto" v-if="conversation.unreads">
                        {{conversation.unreads}}
                    </div>
                </div>
                <div v-if="conversation.hesWriting">
                    <span class="text-green roboto">escribiendo...</span>
                </div>
            </div>
            <div v-if="conversation.taken_by && conversation.taken_by.id != user.id">
                <span class="text-green roboto">{{conversation.taken_by.name}} hablando</span>
            </div>
        </div>
        <div v-if="isSelected" class="selected"></div>
    </div>
</template>
<script>
export default {
    props: ["conversation"],
    computed: {
        isSelected() {
            return (
                this.conversation &&
                this.activeConversation &&
                this.activeConversation.id ==
                    this.conversation.id
            );
        },
        conversationClass() {
            return {
                "prio-auto": this.conversation.prio_auto,
                "prio-manual": this.conversation.prio_manual
            };
        },
       
        activeConversation()
        {
            return this.$store.getters.getActiveConversation;
        }
    },
    methods: {

        setActiveConversation(c) {
            /* Si ya tengo una conversacion activa,primero aviso que la dejo */
            var data;

            if(this.activeConversation)
            {
                 data = {
                    conversation_id : this.activeConversation.id,
                    user_id : this.user.id
                }
                this.$emit('leaveConversation',data);

                this.$store.commit('setActiveConversation',null);
            }

            if(!this.conversation.taken_by || this.conversation.taken_by.id == this.user.id)
            {
                this.$store.dispatch("fetchConversation", c.client_id)
                    .then( () => {
                        this.$store.dispatch('fetchChatMessages',this.conversation.id);
                    });
                 data = {
                    conversation_id:this.conversation.id,
                    user:{
                        id:this.user.id,
                        name:this.user.name
                    }
                }
                this.$emit('joinConversation',data);
                this.$store.commit('setHesWriting',this.conversation.hesWriting);
                this.$store.commit('setHesOnline',this.conversation.hesOnline);
            }
        }
    },

    beforeDestroy()
    {
        /* Si soy administrador aviso que YA NO estoy hablando con este cliente */
            if(this.activeConversation)
            {
                let data = {
                    conversation_id : this.activeConversation.id,
                    user_id : this.user.id
                }
                this.$emit('leaveConversation',data);
                this.$store.commit('setActiveConversation',null);
            }
    },
};
</script>
<style lang="scss" scoped>
.taken{
    background-color: #ccc6;
}
.conversation-box {
    cursor: pointer;
    // border-top: 1px ridge #fff;
    background-color: #fff;
    height: 74px;
    margin-bottom: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,.25);
}

.box-content {
    padding: 12px 8px 12px 20px;
    min-width: 0;
}

.selected {
    background: #21d1ab;
    width: 12px;
    min-width: 12px;
    z-index: 3;
}

.userid {
    background: #e8a1fe;
    height: 17px;
    margin: auto 12px auto 0;
    padding: 0px 6px;
    color: white;
    font-size: 12px;
    font-weight: bold;
    border-radius: 8px;
}

.username {
    color: rgba(60, 60, 90, 1);
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.prio-manual {
    background: rgba(178, 3, 122, 0.09);
}
.prio-auto {
    background: rgba(220, 233, 233, 1);
}
.last-message-preview {
    font-size: 14px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #aeb1b8;
}
.time {
    font-size: 12px;
    font-weight: bold;
    width: auto;
    color: #7dde7f;
}
.text-green{
    font-size: 14px;
    color:#77cd2e;
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
