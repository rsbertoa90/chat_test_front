<template>
   <div class="fixed-pannel"   :style="yStyle">
            <categories-pannel></categories-pannel>
    </div>
</template>

<script>
import categoriesPannel from './categories-pannel.vue';
export default {
    components:{categoriesPannel},
     data(){
        return{
            yStyle:'top:100px',
           
        }
    },
    computed:{
        user(){
            return this.$store.getters.getUser;
        }
    },
      methods:{
        handleScroll(e){
            if(process.browser){

                let def = 100;
                if (this.user && this.user.role_id<3){
                    def = 120;
                }
                let ypos=window.scrollY;
               let wh = window.document.documentElement.clientHeight;
               let innerh = window.innerHeight;
               let scrollh = document.body.scrollHeight;
               let posicion = scrollh - (innerh+ypos);
               
                let fixedy =def;
                if (posicion < 450)
                {
                     fixedy = posicion - 450 + def;
                }
                
                
                if (this.ypos < 3){
                    fixedy = def;
                }
                this.yStyle = 'top:'+fixedy+'px';
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


<style scoped lang="scss">
     .fixed-pannel{
        position:fixed;
        width:300px;
        z-index:50;
        top:120px;
        left:20px;
    }
</style>