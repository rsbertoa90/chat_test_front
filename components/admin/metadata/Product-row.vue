<template>
    <tr v-if="product">
        <td>
            <img v-if="product.images && product.images.length > 0" 
                :src="imagePath(product.images[0])" 
                style="width :150px" 
                :alt="product.name" >
            <img v-else :src="noImage" :alt="product.name" >
        </td>
        <td>
            {{product.name}}
            <textarea  placeholder="URL" rows="1" type="text" v-model.lazy="product.slug" 
                    @change="saveSlug(product,'slug')" class="form-control"></textarea>
        </td>
       <!--  <td >
             <textarea  placeholder="Meta titulo" rows="2" type="text" v-model.lazy="product.metatitle" 
                    @change="saveChange(product,'metatitle')" class="form-control"></textarea>
        </td>
        <td>
             <textarea  placeholder="descripcion" rows="3" type="text" v-model.lazy="product.description" 
                    @change="saveChange(product,'description')" class="form-control"></textarea>
        </td>
        <td>
             <textarea  placeholder="meta descripcion" rows="3" type="text" v-model.lazy="product.metadescription" 
                    @change="saveChange(product,'metadescription')" class="form-control"></textarea>
        </td> -->
        
       
     
      
       
    </tr>
</template>

<script>

export default {
  
    props:['product'],
  
    methods:{
         saveSlug(){
            this.product.slug  = this.product.slug.replace(/\s+/g, '-').toLowerCase().trim();
                this.saveChange(this.product,'slug');
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
            
          
         
    },
    watch:{
        'product.slug'(){
            if(this.product.slug)
            {
                this.product.slug  = this.product.slug.replace(/\s+/g, '-').toLowerCase().trim();
            }
        }
    },
    mounted()
    {
        if (this.product && !this.product.slug)
        {   
           this.product.slug = this.product.name;
           this.product.slug  = this.product.slug.replace(/\s+/g, '-').toLowerCase().trim(); 
            this.saveChange(this.product,'slug');
        }
    }
}
</script>

<style scoped lang="scss">
    


input[type="checkbox"]{
    width: 25px;
    margin:  10px;
    height: 20px;
}


.smallField{width: 80px;}
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
