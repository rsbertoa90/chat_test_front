<template>
    <div class="app-container">
      <navbar></navbar>
      <div class="row vw-100">
        
        <div class="col-12 w-66">
           <nuxt />
        </div>
        <div class="bottom-space"></div>
      </div>
       
    </div>
</template>

<script>
import sideCategoriesPannel from '@/components/category/side-pannel.vue'
import navbar from '@/components/Navbar.vue'
import totalBouncer from '@/components/total-bouncer/total-bouncer.vue';
export default {
  components:{navbar,sideCategoriesPannel,totalBouncer}
}
</script>


<style>
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
