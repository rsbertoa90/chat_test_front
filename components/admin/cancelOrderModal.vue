<template>
    <div>
        <appModal @close="$emit('close')">
            <div class="d-flex flex-column justify-content-center align-items-center">
                <h1 class="text-center">Motivo de cancelacion</h1>
                <div class="radio d-flex flex-column">
                    <label class="radio" v-for="option in options" :key="option">
                        <input type="radio" name="motive" :value="option" v-model="motive">
                        {{option}}
                    </label>
                </div>
                <div v-if="motive=='Otro'">
                    <textarea class="form-control" rows="4" v-model="other"></textarea>
                </div>
                <div>
                    <button class="btn btn-outline-secondary" @click="$emit('close')">Atras</button>
                    <button class="btn btn-outline-info" @click="save">Guardar</button>
                </div>
            </div>
        </appModal>
    </div>    
</template>

<script>
import appModal from '@/components/Modal.vue'
export default {
props:['order'],
components:{appModal},
data(){
    return{
        other:'',
        options:[
            'No poder elegir modelos y colores',
            'Por demora en confirmar el stock',
            'Por demora en armado y envio de pedido',
            'Es un pedido de prueba',
            'Otro'
        ],
        motive:null
    }
},
methods:{
    validate()
    {
        if(this.motive == null)
        {
              swal('Error','Por favor seleccione el motivo de cancelación','error');
              return false;
        }
        if(this.motive=='Otro')
        {
            if(this.other.length < 3)
            {
                swal('Error','Por favor escriba el motivo de cancelación','error');
                return false;
            } else
            {
                return true;
            }
        }
        return true;
    },
    save()
    {
            if(this.validate())
            {
                if(this.motive=='Otro')
                {
                    this.motive += (' '+this.other);
                }

                this.order.status='cancelado';
                this.order.cancelation=this.motive;

                
                let data = {
                    order : this.order.id,
                    field : 'cancelation',
                    value : this.motive
                    }
                this.$axios.put('/order',data);
                 data = {
                    order : this.order.id,
                    field : 'status',
                    value : 'cancelado'
                    }
                this.$axios.put('/order',data);
                this.$emit('close');    
            }
    }
}
}
</script>

