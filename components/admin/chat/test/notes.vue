<template>
    <div class="p-0 m-0" v-if="conversation">
        <div class="d-flex justify-content-between align-items-center m-3 w-auto">
            <span>Dar prioridad</span>
            <input type="checkbox" v-model="conversation.prio_manual" @change="update('prio_manual')">
        </div>  
        <span class="divider"></span>
        <div class="m-3 w-auto">
            <textarea v-model.lazy="conversation.comments" 
                @change="update('comments')" class="w-100 p-2" placeholder="ESCRIBIR" rows="10"></textarea>            
        </div>
        <span class="divider"></span>
        <div class="m-3 w-auto">
            LISTA DE PEDIDOS DE USUARIO
        </div>
        <span class="divider"></span>
        <div class="m-3 w-auto">
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
.divider {
    display: block;
    width: 100%;
    margin: 2px 0;
    border-top: 1px solid rgba(0,0,0,0.25);
}
.checkbox {
    width:16px;
    height: 16px;
}

textarea {
    outline: none;
    border: 0;
    border-radius: 0;
    background: #fcfcfc;
    border-top: 1px solid #fff;
    box-shadow: 1px 1px 2px #ccc;
}
textarea:focus {
    box-shadow: 2px 2px 4px #c0c0c0;
}
</style>
