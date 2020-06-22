<template>
    <div class="fcc" v-if="conversation">
        <div>
            dar prioridad
            <input type="checkbox" v-model="conversation.prio_manual" @change="update('prio_manual')">
        </div>  
        
        <div class="mt-4">
            <textarea v-model.lazy="conversation.comments" @change="update('comments')" class="form-control" placeholder="ESCRIBIR" cols="30" rows="10"></textarea>            
        </div>

        <div class="mt-4">
            LISTA DE PEDIDOS DE USUARIO
        </div>

        <div class="mt-4">
            LISTA DE NOTITAS
        </div>
    
    </div>    
</template>


<script>
export default {
    computed:{
        conversation(){
            return this.$store.getters.getActiveConversation
        }
    },
    methods:{
        update(field)
        {
            let value=null;
            if(field == 'prio_manual')
            {
                value = this.conversation.prio_manual ? 1 : 0;
            }else{
                value= this.conversation[field]
            }
            let data={
                conversation_id:this.conversation.id,
                field:field,
                value:value
            }
            this.$axios.put('/conversation',data);
        }
    }
}
</script>


<style lang="scss" scoped>

</style>
