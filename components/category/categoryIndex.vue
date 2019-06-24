<template>

<div v-if="category && category.products" class="row" :key="$route.path">
    <div class="col-12 row p-0 m-0">    
        <div class="red-ribbon col-12">
            <div class="logo-square" v-if="category.image">
                <img :src="imagePath(category.image)" :alt="category.name">
            </div>
            <div class="name-container">
                <h1  class=" font-weight-bold" >
                    {{category.name|uc}}
                </h1>
            </div>
            <div col-lg-3>

            </div>
        </div>
        <div class="col-12">   
            <info-row></info-row>
        </div>
        <div class="col-12 descri" v-if="category.description">
           <p> {{category.description |ucFirst}} </p>
        </div>
        <div class="col-12 mt-4 row">
            <div class="col-12 col-lg-4 mt-2" v-for="p in category.products" :key="p.code">
                <productCard class="border-grey" :product="p"></productCard>
            </div>
        </div>
    </div>

        
           
</div>
</template>


<script>
import infoRow from '../layout/info-row.vue';
import productCard from './product/small-card.vue';

export default {
    components:{productCard,infoRow},
    data(){
        return{
            yStyle:'top:100px',
           
        }
    },
    metaInfo(){
        return{
            title: this.metatitle,
            meta:[
                {name:'description',vmid:'description',content:this.metadescription}
            ]
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
        metatitle(){
            if (this.category)
            {
               return this.category.metatitle ? this.category.metatitle : this.category.name+' '+"por mayor";
            }
        },
        metadescription(){
            if (this.category){
                if (this.category.metadescription){ return this.category.metadescription}
                else if (this.category.description){ return this.category.description}
                else {return this.metatitle}
            }

        },
        categories(){
            return this.$store.getters.getNotPaused;
        },
        category(){
            if (this.categories)
            {
                return this.categories.find (cat => {
                    return cat.slug === '/'+this.$route.params.category;
                });
            }
        }
    },
     mounted () {
    window.addEventListener('scroll', this.handleScroll);

    
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style lang="scss" scoped>
.name-container{
    width:80vw;
    
}
.descri{
    font-size:1.3rem;
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
    
 .logo-square{
        background-color: #fff;
        border: 3px solid #868686;
        font-size:2rem;
        color:#D52B1E;
        /* padding:5px; */
        display: flex;
        justify-content: center;
        align-items:center;
        height:75px;
        width:175px;
        margin-right:15px;
        overflow:hidden;
        img{
            width:100%;
        }
}


h1{
    font-size: 2rem;
    white-space: nowrap;
}


@media(max-width:600px){
    .red-ribbon{
        margin-top: 20px;
        width:100vw;
        height: 90px;
        h1{
            margin-left:10px;
            font-size:1.3rem;
            white-space:normal;
          
        }
    }
}


</style>
