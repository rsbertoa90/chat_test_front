<template>
  <div>
     
         <form ref="form" @submit.prevent="save" class="form form-inline row ml-1">
               <div class="col-3 row">
                 <label for="" class="col-12">Codigo</label>
                 <input required v-model.trim="formData.code" type="text" class="col-12">
             </div>
             <div class="col-3 row">
                 <label for="" class="col-12">Categoria</label>
                 <select required  id="" v-model.trim="formData.category_id" class="col-12 form-control">
                     <option  v-for="category in categories" 
                             :key="category.id"
                             :value="category.id" >
                        {{category.name}}
                     </option>
                     <option value="new">Nueva</option>
                 </select>
                 <input v-model.trim="newCategory"
                        v-if="formData.category_id=='new'" 
                        placeholder="Nueva Categoria" 
                        type="text">
             </div>
             <div class="col-3 row">
                 <label for="" class="col-12">Producto</label>
                 <textarea  rows="2" required  v-model.trim="formData.name" type="text" class="col-12"> </textarea>
             </div>
          
             <div  class="col-3 row">
                 <label for="" class="col-12">Precio</label>
                 <input min='0' step=".01" required v-model.trim="formData.price"  type="number" class="col-12">
             </div>
             <button type="submit" class="btn btn-outline-success align-self-end justify-self-end"> GUARDAR </button>
         </form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                newCategory :null,
                formData: {

                    price :null,
                    pck_price :null,
                    pck_units :null,
                    category_id : null,
                    name : null,
                    code :null
                }
            }
        },
        methods : {
            valid(){
                var vm = this;
                var duplicated = null;
                this.categories.forEach(el => {
                    let e = el.products.find(p => {
                        return p.code == vm.formData.code;
                    });
                    if (e != null){
                        duplicated = e;
                    }
                });

                if (duplicated!=null){
                    swal('error','ya existe un producto con el codigo'+vm.formData.code,'error');
                } 
                else {return true;}
            },
            resetForm(){
                this.formData =  {
                    price :null,
                    category_id : null,
                    name : null,
                    code :null
                }
            },
            save()
            {
                var vm = this;
                if (this.valid()){

                    if (this.formData.category_id == 'new')
                    {
                        
                         var duplicated = this.categories.find(function(el){
                             return el.name.toLowerCase() == vm.newCategory.toLowerCase();
                         }); 
                         if (duplicated != null){
                             swal ('Error', `Ya existe la categoria ${vm.newCategory}`,'error');
                         }else {
                             vm.$axios.post('/category/',{name : this.newCategory})
                                .then(response => {
                                    var category = response.data;
                                    vm.formData.category_id = category.id;
                                    vm.$axios.post('/product',vm.formData)
                                        .then(response => {
                                            vm.$emit('productSaved',response.data);
                                            //   console.log(response.data);
                                            swal('Product guardado','','success');
                                            vm.resetForm();
                                        
                                    });
                                });
                         }
                    }
                    else {
                        vm.$axios.post('/product',vm.formData).then(response => {
                            vm.$emit('productSaved',response.data);
                            // console.log(response.data);
                            swal('Product guardado','','success');
                            vm.resetForm();
                            
                        });
                    }
                }
                
            }
        },
       
    }
</script>