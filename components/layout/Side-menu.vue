<template>

        <div >
                <div class="side-borders">
                   <ul clas="d-flex pl-4">
                       <li v-for="category in categories" :key ="category.id">
                           <nuxt-link :to="category.slug">
                            <span class="fa fa-chevron-right"></span>   {{category.name| ucFirst}}
                           </nuxt-link>
                       </li>
                   </ul>
                </div>


          <!--    <bannerRedlimp></bannerRedlimp> -->
        </div>
 
</template>

<script>
import bannerRedlimp from '../banners/redlimp.vue'
import { mapGetters } from 'vuex';
export default {
    components:{
        bannerRedlimp
    },
    computed : {
           ...mapGetters({
                categories : 'getCategories'
            }),
    }
}
</script>

<style lang="scss" scoped>

$color-first : #b2037a;

// El verde es 09cca2 
$color-second : #09cca2;

// Rosa fuerte es ff0aaf
$color-focus: #ff0aaf; 

// Rosa claro es ff97dd
$color-back: #ff97dd;


    .side-borders{
        border-left: 1px solid #aaaaaa;
       // margin-left: 11%;
    }

    ul{
        li{
            display: block;
            a{
                display: block;
                padding: 5px;
                font-weight: bold;
                font-size: 1.2rem;
               
              
                &:hover{
                    background-color: #eee;
                    border-left: 3px solid $color-second;
                    text-decoration: none;
                    color: darken($color-second,10%);
                    font-weight: bold;
                }
            }
        }
    }
</style>

