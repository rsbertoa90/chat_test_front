<template>
    <div class="row vw100 text-center p-3">
        <h1>TODOS LOS PRODUCTOS</h1>
          <div class="categories-container">
              <div class="w-50 d-flex flex-column justify-content-start">
                  <info></info>
                    <div class="category-card" v-for="category in evens" :key="category.slug">
                        <nuxt-link :to="category.slug" 
                        class="text-center d-flex justify-content-center flex-column">
                            <div class="image-container">
                                <v-lazy-image :src="imagePath(category.image)"></v-lazy-image>
                            </div>
                            <span class="name">{{category.name | ucFirst}}</span>
                        </nuxt-link>
                    </div>

              </div>
              <div class="w-50 d-flex flex-column justify-content-start">
                    <div class="category-card" v-for="category in odds" :key="category.slug">
                        <nuxt-link :to="category.slug" 
                        class="text-center d-flex justify-content-center flex-column">
                            <div class="image-container">
                                <v-lazy-image :src="imagePath(category.image)"></v-lazy-image>
                            </div>
                            <span class="name">{{category.name | ucFirst}}</span>
                        </nuxt-link>
                    </div>

              </div>
        </div>

    </div>
</template>


<script>
import info from '@/components/info/Info.vue';
export default {
components:{info},
  name:'categorias',
  mounted(){
      if (this.$mq == 'lg'){
          this.$router.push('/');
      }
  },
   computed:{
        categoriesWithImages()
        {
            return this.categories.filter(c=>{
                return c.image != null;
            })
        },
        evens(){
            let res = [];
            for (let i = 0; i < this.categories.length; i++){
                if (i % 2 == 0){
                    res.push(this.categories[i]);
                }
            }
            return res;
        },
        odds(){
             let res = [];
            for (let i = 0; i < this.categories.length; i++){
                if (i % 2 != 0){
                    res.push(this.categories[i]);
                }
            }
            return res;
        }
    },
}
</script>

<style lang="scss" scoped>
h1{
    font-size:20px;
    display: flex;
    text-align: center;
    width:100%;
    justify-content: center;
}
</style>

<style lang="scss" scoped>


a{
      transition:all .3s;
}
.selected{
  
        transform:scale(1.1);
        transition:all .3s;
        font-weight: bold;
        background-color: #DB1B73;
        border-radius: 15px;
        padding:2px;
        color:#fff;
        span{color:#fff;}
         box-shadow:  2px 2px 2px #000000 ;
   
}
.image-container{
  
    background-color: #fff;
    border-radius: 15px;
    border: 1px solid #707070;
    overflow: hidden;
    padding:5px;
    box-shadow:  2px 2px 2px #000000 ;
}

span{
    color:#000;
    font-size: 20px;
}
h2{
    font-size: 20px;
}
   
    .categories-container{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin-top:20px;
   
    }

    /* .category-card:nth-child(odd){
        margin-top:28px;
    } */

    .category-card{
        width:100%;
        padding:5px;


}
</style>
