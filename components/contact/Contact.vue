<template>
<div  class="row">
   <!--  <div class="col-3" v-if="$mq=='lg'">
        <div>
            <categories-pannel></categories-pannel>
        </div>
    </div> -->
    <div class="col-12 row p-0 m-0">    
        <div class="red-ribbon col-12">
            <div class="logo-square" >
                <fa-icon icon="envelope"></fa-icon>
            </div>
            <h1  class=" font-weight-bold" >
                Contactate con Bazar Mayorista Maju
            </h1>
            <div col-lg-3>

            </div>
        </div>
        <div class="col-12">   
            <info-row></info-row>
        </div>
        <div class="col-12 descri" v-if="description">
           <p> {{description |ucFirst}} </p>
        </div>
        <div class="col-12 mt-4 row">
           <contact-form></contact-form>
        </div>
    </div>

        
           
</div>
</template>


<script>
import contactForm from './contact-form.vue'
import infoRow from '../layout/info-row.vue';
import categoriesPannel from '../home/floating-categories-pannel.vue';
import metaMixin from '@/plugins/metadataMixin.js';
export default {
    layout:'categories',
    mixins:[metaMixin],
    components:{contactForm,categoriesPannel,infoRow},
    data(){
        return{
            yStyle:'top:100px'
            
        }
    },
  
   methods:{
        handleScroll(e){
            if(process.browser){

                let def = 100;
                let ypos=window.scrollY;
               let wh = window.document.documentElement.clientHeight;
               let innerh = window.innerHeight;
               let scrollh = document.body.scrollHeight;
               let posicion = scrollh - (innerh+ypos);
               
                let fixedy =100;
                if (posicion < 450)
                {
                     fixedy = posicion - 450 + 100;
                }
                
                
                this.yStyle = 'top:'+fixedy+'px';
            }
        
        }
    },
    computed:{
        
        products(){
            return this.$store.getters.getOffers;
        }
       
        
    },
     mounted() {
        window.addEventListener('scroll', this.handleScroll);

    
  },
  destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style lang="scss" scoped>

.descri{
    font-size:1.3rem;
}
    .fixed-pannel{
        position:fixed;
        top:55px;
        left:20px;
    }

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
  
    
    
   
}

h1{
    font-size: 2rem;
    white-space: nowrap;
}
.logo-square{
    width:189px;
}
@media(max-width:600px){
    .red-ribbon{
        height: 60px;
        margin-top: 20px;
        width:100vw;
        h1{
            margin-left:10px;
            font-size:1.5rem;
               white-space: normal;
       
        }
    }
}


</style>
