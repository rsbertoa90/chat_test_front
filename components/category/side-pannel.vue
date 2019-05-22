<template>
    <div class="d-flex flex-column">
        <h2 class="font-weight-bold mt-4">CATEGORIAS DE PRODUCTOS EN MATES DE FABRICA</h2>
        <div class="categories-container">
            <div class="vertical-spacing"></div>
            <div class="category-card clickable" v-for="category in categoriesWithImages" :key="category.slug">
                <nuxt-link :to="category.slug" 
                class="text-center d-flex justify-content-center flex-column"
                :class="{'selected':isSelected(category)}">
                    <div class="image-container">
                        <v-lazy-image :src="imagePath(category.image)"></v-lazy-image>
                    </div>
                    <span>{{category.name | ucFirst}}</span>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed:{
        categoriesWithImages()
        {
            return this.categories.filter(c=>{
                return c.image != null;
            })
        }
    },
    methods:{
        isSelected(category)
        {
            let res =false;
            let hasparam = this.$route.params.hasOwnProperty('category');
            if(hasparam){
                let slug = '/'+category.slug;
                slug =slug.replace('//','/');
                let param = '/' + this.$route.params.category;
                param =param.replace('//','/');
                res = slug == param;
            }
            return res;
        }
    }
}
</script>

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
    color:#707070;
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
        padding-right:60px;
    }

    .category-card:nth-child(even){
        margin-top:28px;
    }

    .category-card{
        width:50%;
        padding:5px;

    }
</style>
