<template>
<div>
     <chatComponent></chatComponent> 
</div>    
</template>

<script>
import chatComponent from '@/components/chat/test/UserChat.vue'
export default {
components:{chatComponent},
mounted(){
    if(!this.user)
    {
        this.$router.push('/');
    }else if(this.admin)
    {
        this.$router.push('/admin/chat');
    }else{
        this.$store.dispatch('fetchConversation',this.user.id);
    }
}    
}
</script>


