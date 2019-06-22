<template>
    <div  v-if="categories" >
        <div class="heading">
            <h3>Categorias:</h3>
        </div>
        <ul class="scrollable-pannel">
            <li v-for="category in categories" :key="category.name"
                :class="{'selected':$route.path == category.slug}">
                <nuxt-link class="d-flex align-items-center" :to="category.slug">

                    <div class="img-container" v-if="category.image" >
                        <v-lazy-image :src="imagePath(category.image)" :alt="category.name"></v-lazy-image>
                    </div>
                    <span class="ml-1">
                        {{category.name}}
                    </span>
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    
    computed:{
        searchTerm(){
            return this.$store.getters.getSearchTerm;
        },
        categories()
        {
            return this.$store.getters.getNotPaused;
        }
    },
   
    
   
}
</script>


<style lang="scss" scoped>

    .heading{
        background-color: #D52B1E;
        color:#fff;
        display: flex;
        width:100%;
        justify-content: center;
        align-items: center;
        padding-bottom:5px;
        border-right:1px solid #fff;
       
    }
    .selected{
        border-left:2px solid #D52B1E;
        background-color: #D52B1E33;
    }




    .scrollable-pannel{
        border:1px solid #D52B1E;
        background-color: #fff;
        padding: 0 20px;
        height: 422px;
        max-width:300px;
        overflow-y: scroll;
        width:100%;
        z-index:100;
        ul{
            display: flex;
            flex-direction: column;
            margin:0;
            padding:0;
            padding-left:5px;
            a{
                color:#000;
                margin-left:5px;
            }
            }
        }
    

    .img-container{
        width:85px;
        img{
            width:85px;
        }
    }
    ul{
        list-style: none;
        li{
            cursor: pointer;
            &:hover{
                transform: scale(1.13);
                z-index:300;
                background-color: #D52B1E33;
            }
        }
    }
     a:hover{
        color:#000;
    }


</style>
