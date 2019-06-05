<template>

        <div >
                <div class="side-borders">
                   <ul clas="d-flex pl-4">
                       <li v-for="category in categories" :key ="category.id">
                           <a :href="category.slug">
                                {{category.name| ucFirst}}
                           </a>
                       </li>
                   </ul>
                </div>
        </div>
 
</template>

<script>
import { mapGetters } from 'vuex';
export default {
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
$color-focus: #009bc8; 

// Rosa claro es ff97dd
$color-back: #ff97dd;


    .side-borders{
        border-left: 1px solid #aaaaaa;
        margin-left: 7%;
    }

    ul{
        li{
            display: block;
            a{
                display: block;
                padding: 5px;
                font-weight: bold;
                font-size: 1.2rem;
               
                &:before{
                    content: "\f105"; 
                    font-family: FontAwesome;
                    display: inline-block;
                    width: 1rem; 
                }
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

