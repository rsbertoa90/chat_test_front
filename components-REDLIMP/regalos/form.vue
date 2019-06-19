<template>
    <div>
        
        <form id="form" ref="form" enctype="multipart/form-data" method="post" action="/regalos-empresariales">
            <input type="hidden" name="_token" :value="csrf">
            <div class="form-group row">
                <label class="col-12 col-lg-4">Nombre</label>
                <input required  class=" form-control col-12 col-lg-8" type="text" name="name" v-model="formData.name">
            </div>
            <div class="form-group row">
                <label class="col-12 col-lg-4" for="">Email</label>
                <input name="email" required  class=" form-control col-12 col-lg-8" type="text" v-model="formData.email">
            </div>
            <div class="form-group row">
                <label class="col-12 col-lg-4" for="">Telefono</label>
                <input name="phone" class=" form-control col-12 col-lg-8" type="text" v-model="formData.phone">
            </div>
            <div class="form-group row">
                <label class="col-12 col-lg-4" for="">¿Que productos te interesa personalizar?</label>
                <input  name="products"  required class=" form-control col-12 col-lg-8" type="text" v-model="formData.products">
            </div>
            <div class="form-group row">
                <label class="col-12 col-lg-4" for="">Cantidad</label>
                <input name="qty" required class=" form-control col-12 col-lg-8" type="number" min="0" v-model="formData.qty">
            </div>
            <div class="form-group row">
                <label class="col-12 col-lg-4" for="">¿Para cuando lo necesitas?</label>
                <input name="date" required class=" form-control col-12 col-lg-8" type="date" v-model="formData.date">
            </div>
            <div class="form-group row">
                <label class="col-12 col-lg-4">Mandanos tu diseño</label>
                <label class="btn btn-lg btn-outline-info  col-4">
                    Subir archivo <input name="image" type="file" style="display: none;" @change="file=true">
                </label>
                <span v-if="file" class="text-warning mt-2 col-4">Archivo subido</span>
            </div>
            <button class="col-12 col-lg-4 offset-lg-4 btn btn-outline-success btn-lg" @click.prevent="submit">Enviar</button>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            csrf:window.csrf,
            file:null,
            formData:{
                name : '',
                email : '',
                phone: '',
                products: '',
                qty : 0,
                date: null,
        }
   
        }
    },
    methods:{
        submit(){
            var vm = this;
            if (this.formValid())
            {
                swal('Mensaje enviado','Nos comuicaremos con usted a la brevedad','success')
                    .then (response => {
                        $(vm.$refs.form).submit();
                    });
            }
        },
        formValid(){
            let fd = this.formData;
            if (fd.name && fd.email && fd.products && fd.qty && fd.date){
                return true;
            }
            else {
                swal('No pudimos enviar tu pedido','Por favor completa todos los campos','error');
                return false;
            }
        }
    }
}
</script>

<style scoped>
    
</style>
