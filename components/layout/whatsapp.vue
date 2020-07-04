<template>
<div v-if="!admin">
    <a class="floating" rel="noreferrer" target="_blank" v-if="!user" href="https://wa.me/541130085414">
        <span class="fab fa-whatsapp"></span>
    </a>

    <nuxt-link to="/chat" v-if="user" class="floating" >
        <div class="chat" :class="{'unreads':unreads}">
            <span class="far fa-comment" v-if="!unreads"></span>
            <span class="far fa-comment-dots" v-if="unreads"></span>
        </div>
    </nuxt-link>
</div>
</template>

<script>
export default {
    data() {
        return {
            conversation_id:null
        }
    },    
    computed:{
        unreads(){
           return this.$store.getters.getUnreads;      
        }
    },
    mounted(){
        var vm = this;
        if(this.user)
        {
            this.$axios.get('/unreads')
                .then(r => {
                    if(r.data && r.data.unreads)
                    {
                        this.$store.commit('setUnreads',r.data.unreads);
                    }
                    if(r.data && r.data.conversation_id)
                    {
                        this.conversation_id = r.data.conversation_id;
                    }
            });
            
            this.socket = this.$nuxtSocket({
                channel: "/index",
                reconnection: true
            });

            this.socket.on('newMessage',data => {
                if(data.message.admin)
                {
                     this.$store.commit('setUnreads',vm.unreads + 1);
                }
            });
        }
    },
    watch:{
        conversation_id(){
            if(this.conversation_id)
            {
                this.socket.emit("joinRoom", this.conversation_id);
            }
        }
    }
}
</script>


<style scoped>
.unreads{
    animation-name: unranim;
    animation-direction: alternate;
    animation-duration: 1s;
    animation-iteration-count: infinite;
}

@keyframes unranim {
    from {
        font-size: 40px;
        color:#000;
        }
    to {font-size: 60px;
       
        color:red;}
}

.chat{
    font-size: 40px;

}
.floating{
        cursor: pointer;
        position: fixed;
        z-index:100;
        bottom:10px;
        right:10px;
        display:flex;
        justify-content:center;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 1.1rem;
        padding: 5px;
        border-radius: 10%;
        border: 3px solid #25D366;
        background-color:transparent;
        background-color: #fff;
    }
    .fa-whatsapp{
        color: #25D366;
        font-size: 2rem;
        font-weight: bold;
        /* margin-right: 10px; */
        
    }
</style>