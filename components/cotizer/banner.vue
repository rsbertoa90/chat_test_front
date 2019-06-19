<template>
<div class="neg-margins">
    <div class="red-ribbon col-12">
        <div class="cart-logo-square">
            <fa-icon icon="shopping-cart"></fa-icon>
        </div>
        <h1  class=" font-weight-bold">
                HACE TU PEDIDO
        </h1>
        <div col-lg-3>
            
        </div>
    </div>
    <div v-if="searchTerm && searchTerm.length > 1" class="col-12 mb-4 mt-4">
            <h2>Resultados de busqueda para "{{searchTerm}}" </h2>
    </div>
    
    <div class="col-12">
        <info-row></info-row>
    </div>
    <div v-if="description" class="mt-3 p-2">
        <h5 >
            {{ description }}
        </h5>
    </div>
</div>
</template>}

<script>
import infoRow from '../layout/info-row.vue';
export default {
    components:{
        infoRow
    },
    data(){
        return{
            
            pos:true,
            customText:null
        }
    },
    computed:{
        searchTerm(){
            return this.$store.getters.getSearchTerm;
        },
        configs()
        {
            return this.$store.getters.getConfig;
        },
       description(){
           let meta = this.$store.getters.getMeta('cotizador');
           return meta.description;
       }
    },
    created(){
        var vm=this;
          
        this.$axios.get('/api/custom-text/banner')
            .then(res => {
                this.customText = res.data;
            });

     
    }
}
</script>


<style scoped lang="scss">

.red-ribbon{
    background-color: #D52B1E;
    width:100%;
    height:50px;
    display:flex;
    align-items:center;
    justify-content: space-around;
    color:#fff;
    margin-bottom:20px;
    margin-top:10px;
    
    .cart-logo-square{
        background-color: #fff;
        border: 3px solid #868686;
        font-size:2rem;
        color:#D52B1E;
        /* padding:5px; */
        display: flex;
        justify-content: center;
        align-items:center;
        height:75px;
        width:100px;
        margin-right:20px;
    }
}


.banner-font{
    font-size:1.25rem;
}
.colorRed{
    color:red;
     transition: ease 1s;
}
.colorBlue{
    color:blue;
     transition: ease 1s;
}
    .todaright{
          display: inline-flex;
        transform: rotate(15deg);
       
        transition: ease 1s;
    }
    .todaleft{
        display: inline-flex;
         transform: rotate(-15deg);
        
         transition: 1s ease;
    }

    .dared{
         /* transform: rotate(-15deg); */
         color:red;
         transition: 1s ease;
    }
    .dablue{
         color:blue;
        transition: ease 1s;
    }

    .neg-margins{
    margin-right: -7%;
    margin-left: -4.3%;
    margin-top:-5px;
}
h1{
    font-size: 2rem;
    white-space: nowrap;
}

@media(max-width:600px){
    h1{
        font-size: 1.6rem;
    }
}

</style>