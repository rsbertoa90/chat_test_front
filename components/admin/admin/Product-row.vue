<template>  
<tbody>

        <tr>
            <td rowspan="2">
                <img v-if="product.images && product.images.length > 0" 
                    :src="imagePath(product.images[0])" 
                    style="width :150px" 
                    :alt="product.name" 
                    @click="imgModal()">
                <img v-else :src="noImage" :alt="product.name"  @click="imgModal(product)">
            </td>
             <td colspan="6">
                <textarea placeholder="NOMBRE" rows="1" type="text" v-model.lazy="product.name" 
                @change="saveChange(product,'name')" class="form-control"></textarea>
            </td>
           
        </tr>
        <tr>
            <td>
                <input v-model.lazy="product.code" @change="saveChange(product,'code')" 
                        type="text" class="form-control smallField">
            </td>
           
            <td>
                <select class="form-control" v-model="product.category_id"
                        @change="changed(product,'category')" >
                    <option v-for="category in categories" 
                            :key="category.id" 
                            :value="category.id"
                            :selected ="product.category.id == category.id"
                            > 
                        {{category.name}} 
                    </option>
                </select>
            </td>
            <td>
                <div class="d-flex">
                    <div class="relative">

                        <span class="input-icon">$</span>
                        <input v-model.lazy="product.price" @change="saveChange(product,'price')"
                            type="number" step=".01" class=" form-control smallField">
                    </div>
                </div>
                            
            
            
            </td>
           
           
            <td class="d-flex flex-column justify-content-center align-items-center p-0">
            <!--  <input class="form-control" type="checkbox" v-model="product.selected"> -->
                <button @click.prevent="deleteProduct(product)" class="btn btn-sm btn-outline-danger m-1">
                    <fa-icon icon="trash"></fa-icon>
                </button>
                <button @click.prevent="togglePause(product)" class="btn btn-sm m-1" :class="{'btn-info' : !product.paused, 'btn-success': product.paused}">
                    <fa-icon v-if="product.paused" icon="play" class="text-white"></fa-icon>
                    <fa-icon v-else icon="pause-circle" class="text-white"></fa-icon>
                </button>
                <button @click.prevent="toggleOffer(product)" class="btn btn-sm m-1" :class="{'btn-secondary' : !product.offer, 'btn-info': product.offer}">
                    Oferta
                </button>
                <button @click.prevent="toggleFirst(product)" class="btn btn-sm m-1" :class="{'btn-secondary' : !product.first, 'btn-warning': product.first}">
                    Ver primero
                </button>
                
            </td>
            <image-modal v-if="product && showModal" :product="product"  
                                ref="modal" @refresh="refresh()"
                            @closedModal="showModal=false">
            </image-modal>
        </tr>
</tbody>
  
</template>

<script>
import imageModal from './Img-modal.vue';
export default {
    components:{imageModal},
    props:['product'],
    data(){return{
        showModal:false,
        hasUnitPrice :false
    }},
    
    mounted(){
            if(this.product && this.product.unit_price && this.product.unit_price > 0){
                this.hasUnitPrice =true;
            }
    },
    watch:{
        'product.unit_price'(){
            if(this.product.unit_price <= 0){
                this.hasUnitPrice = false;
            }
        }
    },
    methods:{
        validate(){
            let u = this.product.pck_units;
            let p = this.product.price;
            let pp = this.product.pck_price;
            //console.log(u,p,pp);
            if (u < 1){
                swal('CUIDADO','Unidades no puede ser menor que 1','error');
                return false;
            }
            if (u > 1 && p == pp ){
                swal('CUIDADO','Los precios deberian ser iguales SOLO si unidades es = a 1','error');
                return false;
            }
            else if (u == 1 && p != pp){
                swal('CUIDADO','Si unidades es 1 ambos precios deberian ser iguales','error');
                return false;
            }
            else if ((u > 1 && p < pp) && p != 0){
                swal('CUIDADO','El precio por mayor deberia ser MENOR que el precio normal','error');
                return false;
            }
            else{
                return true;
            }
            



        },
            refresh(){
                this.$emit('refresh');
            },
            saveChange(product,field){
                
                    var data = {
                        product : product.id,
                        field : field,
                        value : product[field]
                    }
                   this.$axios.put('/product',data);
                
              
            },
            togglePause(product){
                var vm = this;
                product.paused = !product.paused;
                vm.saveChange(product,'paused');
                
            },
            toggleOffer(product){
                var vm = this;
                product.offer = !product.offer;
                vm.saveChange(product,'offer');
              

                
            },
            toggleFirst(product){
                var vm = this;
                product.first = !product.first;
                vm.saveChange(product,'first');
                
            },
            deleteProduct(product){
                var vm = this;
                swal({
                    title: "¿Estas seguro de elimiar este producto?",
                    text: "",
                    type: "warning",
                    buttons: [
                        'Cancelar',
                        'Borrar!'
                    ],
                    dangerMode: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Borrar!',
                    cancelButtonText: "Cancelar!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }).then((isConfirm) => {
                    if (isConfirm){
                         this.$axios.delete('/product/'+product.id)
                            .then(response => {
                         vm.$emit('refresh');   
                    });

                    } 
                })      
                
               
            },
            
            changed(product,field){ 
               this.saveChange(product,field+'_id');
                
            },
            imgModal(){

            
                this.showModal = true;

               setTimeout(() => {
                   let element = this.$refs.modal.$el;
                   $(element).modal('show');
               }, 100);
            },
    }
}
</script>

<style scoped lang="scss">
    
.relative{
    position:relative;
}

.input-icon{
    position:absolute;
    left:1px;
    top:7px;
}

input[type="checkbox"]{
    width: 25px;
    margin:  10px;
    height: 20px;
}


.smallField{width: 90px;}
td {min-width: 120px;}
.btn-link {color : black;}
    td img {
        width: 10vw;
    }
   @media(max-width: 600px){
       table,.container,.card,.card-body {font-size: 0.66rem ; padding : 0}
       
       th,td, input{
           white-space:nowrap;
           width: 13vw;
           padding: 2px;
       }
       
       
        
       .nametd {width: 25vw;}
   }
</style>
