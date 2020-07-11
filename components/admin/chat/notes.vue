<template>
<div v-if="conversation" class="d-flex flex-column h-100 inner-bottom-fade">
    <div class="d-flex flex-column">
        <div id="header-row-1"></div>
        <div id="header-row-2" class="d-flex align-items-center">
            <span class="pl-3 roboto">Datos del Cliente</span>
        </div>
    </div>
    <div class="scrollbar-custom right-pannel">
        
        <div class="d-flex justify-content-between align-items-center p-3">
            <span class="roboto">Dar Prioridad</span>
            <input type="checkbox" class="form-control prio-check" v-model="conversation.prio_manual" @change="update('prio_manual')">
        </div>
        <div class="d-flex" v-if="conversation.prio_auto">
            <button class="btn btn-block btn-prio-auto roboto" @click="removePrioAuto()">
                YA RECIBIMOS EL PAGO
            </button>
        </div>  
        <span class="divider"></span>
        <div class="p-2">
            <textarea v-model.lazy="conversation.comments" @change="update('comments')"
                 class="w-100 p-2 roboto" placeholder="Escribir" rows="6"></textarea>            
        </div>
        <span class="divider"></span>
        <div class="p-3">
            <orderList :orderss="conversation.client.orders"></orderList>
        </div>
        <span class="divider"></span>
        <div>
            <noteList :conversation="conversation"></noteList>
        </div>
    
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
    mounted(){
        this.socket = this.$nuxtSocket({
            channel: "/index",
            reconnection: true
        });
        this.socket.emit("joinRoom", 'admins');


        this.socket.on('reconnect', () => {
                this.socket.emit("joinRoom", 'admins');
        })
    },
    methods:{
        removePrioAuto()
        {
            this.conversation.prio_auto = false;
            let data = {
                conversation_id : this.conversation.id,
                field:'prio_auto',
                value:false,
            }
            this.$store.commit('updateConversation',data);
            this.$axios.put('/conversation',data);
            this.socket.emit('updateConversation',data); 
        },
        update(field)
        {
            var vm =this;
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
            this.socket.emit('updateConversation',data); 
        }
    },
   
}
</script>


<style lang="scss" scoped>
#header-row-1 {
    height: 19px;
    background: #ff0aaf;
}
#header-row-2 {
    height: 45px;
    background: #b54479;
    span {
        color: white;
        font-weight: bold;
    }
}
.btn-prio-auto{
    background-color:#09cca2;
    color:#fff;
    font-weight: bold;
    text-align:center;
}
.prio-check{
    width:20px;
    cursor:pointer
}
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
