<template>
    <div class="d-flex flex-column h-100 panel inner-bottom-fade">
        <div class="d-flex flex-column">
            <div id="header-row-1" class=""></div>
            <div id="header-row-2" class="d-flex justify-between align-items-center">
                 <img :src="imagePath('/storage/images/app/newlogo.png')" alt="fondo" >
            </div>
            <div id="header-row-3" class="d-flex justify-between align-content-center">
                    <button @click="resetSearch" :disabled="!filter" class="d-flex flex-column justify-content-center mat mx-3">
                        <i v-if="filter" class="material-icons">arrow_back</i>
                        <i v-else class="material-icons">search</i>
                    </button>

                <input v-debounce:300ms="search" v-model="searchTerm" type="text" placeholder="Buscar" class="mat roboto" />
            </div>
        </div>
        <div class="conversations scrollbar-custom" v-if="conversations" v-scroll="onScroll">
            <transition-group enter-active-class="animated pulse" leave-active-class="animated fadeOut">
                <conversation class="transition-all"
                    v-for="conversation in conversations"
                    :key="conversation.id"
                    :conversation="conversation"
                    @leaveConversation="leaveConversation"
                    @joinConversation="joinConversation"
                />
            </transition-group>
        </div>
    </div>
</template>

<script>
import conversation from "./conversation";
export default {
    data() {
        return {
            searchTerm: "",
            searching:false,
            loadingMore: false,
        };
    },
    components: { conversation },
    mounted() {
     
        var vm = this;

        this.socket = this.$nuxtSocket({
            channel: "/index",
            reconnection: true
        });
        this.socket.emit("joinRoom", 'admins');
        
        this.socket.on('reconnect', () => {
            this.socket.emit("joinRoom", 'admins');
        })

        this.socket.on('checkConversationInList',id => {
          
            let exists = vm.conversations.find( c => {return c.id == id});
            if(!exists && !this.searching)
            {
                this.$store.dispatch('addOneConversation',id);
            }
        });

        this.socket.on("newMessage", data => {
            if(data.user_id != this.user.id){
                this.$store.commit('newMessage',data);
            }
        });

        this.socket.on('hesWriting', data => {
            if(data.user_id != this.user.id){
                let d = {
                     conversation_id : data.conversation_id,
                     field: 'hesWriting',
                     value: data.writing
                 } 
                 
                 this.$store.commit('updateConversation',d);
                 d.field =  'hesOnline';
                 d.value = true;
                 this.$store.commit('updateConversation',d);
            }

        });

        this.socket.on('someoneJoined', data => {
             if(data.user_id != this.user.id){
                 this.$store.commit('ConversationSomeoneJoined',data);
             }
            
        });

        this.socket.on('someoneLeaved', data => {
            if(data.user_id != this.user.id)
            {
                this.$store.commit('ConversationSomeoneLeaved',data);
            }
        });

        this.socket.on('isdisconnecting',data=>{
             if(data.socket_id != this.socket.id){
                 this.$store.commit('ConversationSomeoneLeaved',data);
             }
        });

        this.socket.on('hesInTheConversation',data => {
            console.log('conversations - hes in the conversation',data);
            this.$store.commit('conversationTaken',data);
        });

        this.socket.on('conversationUpdated', data => {
             if(data.user_id != this.user.id){
                this.$store.commit('updateConversation',data);
             }
        });

        this.socket.on('checkTaken', data => {
            console.log('conversations - check taken',data);
            if(this.user.id != data.id)
            {
                if(this.activeConversation)
                {
                    let data = {
                        conversation_id : this.activeConversation.id,
                        user:{
                            socket_id : this.socket.id,
                            id:this.user.id,
                            name:this.user.name
                        }
                    }  
    
                     console.log(' conversations - emit im in the conversation',data);
                    this.socket.emit('imInTheConversation',data);
                }            
            }
        })



    },
    computed: {
        conversationsSearchTerm(){
            return this.$store.getters.getConversationsSearchTerm;
        },
        conversationsPagination(){
            return this.$store.getters.getConversationsPagination;
        },
        moreConversationsFetchUrl()
        {
            if(this.conversationsPagination && this.conversationsPagination.last_page > this.conversationsPagination.current_page)
            {
                return this.conversationsPagination.next_page_url;
            }
        },
        conversations() {
            return this.$store.getters.getConversations;
        },
        filter() {
            return this.searchTerm.trim();
        },
        activeConversation(){
            return this.$store.getters.getActiveConversation;
        }
       
    },
    watch:{
        conversations(){
            this.socket.emit('checkConversationsTaken',{user:this.user});
        }
    },
    methods: {
        resetSocket(){
            var vm = this;
            if(this.socket && this.socket.disconnected){
                this.socket.connect();    
            }
        },
        checkSocket(){
            console.log('check socket', this.socket.disconnected)
            if(this.socket.disconnected)
            {
                console.log('disconnected, reset');
                this.resetSocket();
                this.$store.dispatch('fetchConversations');
            }
        },
        leaveConversation(e){
            e.socket_id = this.socket.id;
            this.socket.emit('leaveConversation',e);    
        },
        joinConversation(e)
        {
            let data = e;
            data.admin  = this.admin;
            e.user.socket_id = this.socket.id;
            this.socket.emit('joinConversation',data);
        },
        search()
        {
            var vm = this;
            this.$store.commit('setConversationsSearchTerm',this.filter);
            this.$store.dispatch('fetchConversations')
                    .then(() => {
                            if(this.filter){
                                vm.searching=true;
                            }else{
                                vm.searching=false;
                            }
                    });

        },
        resetSearch(){
            if(this.searching)
            {
                this.searchTerm = '';
                this.searching = false;
                this.search();
            }
        },
        loadMoreConversations()
        {
            if(this.moreConversationsFetchUrl && !this.loadingMore)
            {
                this.loadingMore = true;
                this.$store.dispatch('fetchMoreConversations',this.moreConversationsFetchUrl).then(() => {
                    this.loadingMore = false;
                });
            }
        },
        onScroll(e, p) {
            if(p.scrollTop + 100 > e.target.scrollHeight - e.target.clientHeight) {
                this.loadMoreConversations()
            }
        }
    },

};
</script>

<style lang="scss" scoped>
.transition-all{
    transition: all 0.5s;
}
.panel {
    z-index: 1;
}
#header-row-1 {
    height: 19px;
    background: #ff0aaf;
}
#header-row-2 {
    height: 45px;
    background: #b54479;
    img {
        margin-left: 16px;
        max-width: 45px;
        max-height: 45px;
    }
}
#header-row-3 {
    height: 52px;
    box-shadow: 0 1px 4px rgba(0,0,0,.25);
    clip-path: inset(0 0 -4px 0);
    input {
        font-size: 16px;
    }
}
.conversations {
}

</style>
