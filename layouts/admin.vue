<template>
    <div class="app-container">
      <navbar></navbar>
        <no-ssr placeholder="ADMIN">
            <nuxt />
        </no-ssr>
        
          <apploading v-if="loading"></apploading>
     
    </div>
</template>

<script>
import navbar from '@/components/layout/Navbar.vue'
import apploading from '@/components/layout/loading.vue';
export default {
  components:{navbar,apploading},
  computed:{
    loading(){
      return this.$store.getters.getLoading;
    }
  },
   mounted(){
         if(this.$store.getters.getLoading && this.firstload){
         //  console.log('quitar loading');
           setTimeout(() => {
              this.$store.commit('setLoading',false);
              this.$store.commit('setFirstload');
           }, 100);

           setTimeout(() => {
              if (!this.admin && process.browser){
                window.location.replace('/');
              }
           }, 600);
         
       }

       

        
     }
}
</script>


<style>
 .app-container{
        width:98.5vw;
        margin:0;
        padding:1%;
        border:1px solid #868686;
        overflow: hidden;
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
</style>
