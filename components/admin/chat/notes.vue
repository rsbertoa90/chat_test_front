<template>
    <div class="h-100 scrollbar-custom right-pannel" v-if="conversation">
        <div class="d-flex justify-content-between align-items-center p-3">
            <span>Dar Prioridad</span>
            <input type="checkbox" v-model="conversation.prio_manual" @change="update('prio_manual')">
        </div>  
        <span class="divider"></span>
        <div class="p-3">
            <textarea v-model.lazy="conversation.comments" 
                @change="update('comments')" class="w-100 p-2" placeholder="Escribir" rows="6"></textarea>            
        </div>
        <span class="divider"></span>
        <div  class="p-3">
            <orderList :orderss="conversation.client.orders"></orderList>
        </div>
        <span class="divider"></span>
        <div>
            <noteList :conversation="conversation"></noteList>
        </div>
    
    </div>    
</template>


<script>
import orderList from "./orderList";
import noteList from "./noteList";
export default {
    components: {
        orderList, noteList
    },
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

            this.$store.commit('updateConversation',data);
        }
    },
    updated() {
     /*    console.log("notes");
        console.log(this.conversation); */
    }
}
</script>


<style lang="scss" scoped>
.right-pannel{
//    max-height:85vh;
    overflow-x: hidden;
}
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
    //background: #fcfcfc;
    border-top: 1px solid #fff;
}
textarea:focus {
    box-shadow: 1px 1px 4px #ccc;

}
</style>
