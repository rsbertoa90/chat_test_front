<template>
<div>
     <chatComponent></chatComponent> 
</div>
</template>

<script>
import chatComponent from '@/components/admin/chat/socketTest/ChatPage.vue';
export default {
    layout:'admin',
    middleware:'checkAdmin',
    components:{chatComponent},
    name:'adminChat'
}
</script>
