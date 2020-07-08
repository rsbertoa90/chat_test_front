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

        this.socket.on('checkConversationInList',id => {
            let exists = vm.conversations.find( c => {return c.id == id});
            if(!exists && !this.searching)
            {
                this.$store.dispatch('addOneConversation',id);
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
        }
    },
    methods: {
        search()
        {
            console.log('searching...')
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
