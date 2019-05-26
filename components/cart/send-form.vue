<template>
    <div class="w-100">
        
        <div class="field mt-0">
            <label>Nombre y apellido<span class="ast">*</span></label>
            <input type="text" class="input-field" v-model="formData.client">
        </div>
        <div class="field">
            <label>¿Retiras o te lo enviamos?  <span class="ast">*</span>  </label>
            <div class="d-flex">
                <div class="d-flex">
                    <label class="checkbox-label">
                        <input class="input-check"  type="radio" name="shipping" v-model="formData.shipping" :value="false">
                        Retiro
                    </label>
                    <label class="checkbox-label">
                        <input class="input-check"  type="radio" name="shipping" v-model="formData.shipping" :value="true">
                        Envío
                    </label>
                </div>
            </div>
        </div>
        <template v-if="formData.shipping">
            <div class="field">
                <label>Provincia<span class="ast">*</span></label>
                <select v-model="state" class="form-control input-field select-field">
                    <option v-for="st in states" :key="st.name" :value="st">{{st.name}}</option>
                </select>
            </div>
            <div class="field">
                <label>Ciudad<span class="ast">*</span></label>
                <select v-if="state" v-model="formData.city_id" class="form-control input-field select-field">
                    <option v-for="ct in state.cities" :key="ct.name" :value="ct.id">{{ct.name}}</option>
                </select>
            </div>
            <div class="field">
                <label>Transporte<span class="ast">*</span></label>
                <input type="text" class="input-field" v-model="formData.transport">
            </div>
            <div class="field">
                <label>Código Postal</label>
                <input type="text" class="input-field" v-model="formData.cp">
            </div>
            <div class="field">
                <label>Direccion</label>
                <input type="text" class="input-field" v-model="formData.address">
            </div>
        </template>
        <div class="d-flex mt-4 row">
            <div class="field col-5">
                <label > Cod Area <span class="ast">*</span> </label>
                <input type="text" class="input-field" v-model="phone.code">
            </div>
            <div class="field col-7">
                <label class="nowrap"> Numero telefono <span class="ast">*</span> </label>
                <input type="text" class="input-field" v-model="phone.number">
            </div>
        </div>
         <div class="field">
            <label>Email<span class="ast">*</span></label>
            <input type="mail" class="input-field" v-model="formData.email">
        </div>
         <div class="field">
            <label> Mensaje </label>
            <textarea rows="2" type="text" class="input-field" v-model="formData.message" />
        </div>
        <div class="d-flex justify-content-end mr-4">
            <button class="btn btn-send bordered clickable" @click="confirmSend">
                ENVIAR
                <span class="fa fa-chevron-right"></span>
            </button>
        </div>
    </div>
</template>


<script>
export default {
   
    data(){
        return{
        state:null,
        phone : {
            code: '',
            number: '',
            whatsapp: false
        },
        formData : {
            shipping:false,
            cp:'',
            address:'',
            transport:'',
            city_id:null,
            message : '',
            phone : '',
            email : '',
            client:'',
        },
        }
    },
    computed:{
        states(){
            return this.$store.getters.getStates;
        }
    
    },
    methods : {
        validateEmail(email) {
          
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          
            return re.test(String(email).toLowerCase());
        },
        formValid()
        {
            if (this.phone.code.length < 2 || this.phone.number.length < 4 ){
                 swal('Hay algo mal con el telefono','','error');
                 return false; 
            }
            else if(!this.formData.client || this.formData.client.trim() == '')
            {
                 swal('El campo "Nombre y Apellido" es obligatorio ','','error');
                 return false; 
            }
            else if (!this.validateEmail(this.formData.email) && this.user.role_id > 2)
            {
                swal('Hay algo mal con el mail','','error');
                return false;
            }else if (this.list.length <= 0) 
            {   
                swal('No hay productos seleccionados','','error');
                return false;
            } else if (this.total < this.minBuy)
            {
                swal('El minimo de compra es de $'+this.minBuy,'','error');
                return false;
            } else {return true;}
        },
        confirmSend(){
            var vm = this;

            /* Convierto el campo  telefono en un string para formdata */
            let wha = this.phone.whatsapp ? 'Whatsapp' : 'Llamar por telefono'
            this.formData.phone = this.phone.code + ' - ' + this.phone.number + ' - ' +wha;
            

            if (this.formValid()){
                if (this.formData.shipping){

                    swal({
                       title: "Importante!",
                       text: "La eleccion del transporte y el costo de envío corren por cuenta del cliente. Mates de Fabrica no se hace responsable de eventuales daños que pueda ocasionar la empresa de transporte.",
                       icon: "warning",
                       buttons: [
                           'Cancelar',
                           'Continuar'
                       ],
                        confirmButtonColor: '#8CD4F5',
                        cancelButtonText: 'Cancel',
                     /*   dangerMode: true, */
                       }).then(function(isConfirm) {
                       if (isConfirm) {
                           vm.send();
                       } 
                       });
                }
                else {
                    vm.send();
                }
               
            }

        },
        compactList(){
            let res = [];
            this.list.forEach(item => {
                let compactItem = {
                    id : item.id,
                    units: item.units
                };
                res.push(compactItem);
                
            });
            return res;
        },
        send(){
                
                var data = this.formData;
                let list = this.compactList();
                data.list = JSON.stringify(list);
                data.total = this.total;
             /*    data['_token'] = window.csrf; */
                if (data.shipping){
                    data.shipping = 1;
                } else {data.shipping = 0;}
                
                var vm = this;
                vm.$store.commit('setLoading',true);
                vm.$axios.post('/cotizer/send',data)
                    .then(response => {
                        swal('Enviamos tu presupuesto', 'Te estaremos contactando a la brevedad','success')
                                .then(confirm => {window.location.replace('/')});
                    });
        }
    }    
}
</script>


<style scoped lang="scss">
.btn-send{
    width:125px;
    height: 50px;
    color:#ffF;
    background-color: #F2B742;
    font-size: 22px;
    display: flex;
    justify-content: center;
    align-items:center;
    .fa{
        font-size: 30px;
        margin-left:15px;
    }
}



    .nowrap{
        white-space: nowrap;
    }

    .checkbox-label{
        margin-left: 20px;
        .input-check{
            width:30px;
            height:30px;
            color:#DB1B73;
            margin-right: 10px;
        }
    }

    .field{
        margin-top:30px;
        font-size:20px;
        label{
            display:flex;
            align-items:center;
             font-size:20px;
        }
        .input-field{
            outline:none;
            border:none;
            border-bottom:1px solid #DB1B73;
            width:100%;
        }
    }

    .ast{
        color:#DB1B73;
        font-size:25px;
    }
</style>
