<template>
    <div class="app-container mt-4">
      <navbar></navbar>
      <div class="row vw-100 mt-4">
        
        <div class="col-12 w-66 mt-4">
          <keep-alive include="carrito">
              <nuxt />
          </keep-alive>
        </div>
        <div class="bottom-space"></div>
      </div>
       
            <apploading v-if="ldng || firstload"></apploading>
    </div>
</template>

<script>
import apploading from '@/components/layout/loading.vue';
import navbar from '@/components/layout/Navbar.vue'
/* import totalBouncer from '@/components/total-bouncer/total-bouncer.vue'; */
export default {
  components:{navbar,apploading},
   mounted(){
       if(this.$store.getters.getLoading || this.firstload){
         
          
              this.$store.commit('setFirstload');
         
         }
       
   },
   computed:{
     ldng(){
       return this.$store.getters.getLoading;
     }
   }
}
</script>


<style scoped lang="scss">
.bottom-space{
  width:100vw;
  height:200px;
}
 .app-container{
        width:98.5vw;
        margin:0;
        padding:1%;
        /* border:1px solid #868686; */
        border:none;
        overflow: hidden;
        background-color: #fff;
    }


html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

@media(min-width:660px){
  .w-66{
  width:66vw;
}
}
</style>
