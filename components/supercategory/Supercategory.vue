<template>
    <div class="container" v-if="supercategory">
        <div class="row">
            <div class="col-12">
                <h1> ARTICULOS DE {{supercategory.name | uc}} </h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-lg-6">
                <v-lazy-image v-if="supercategory.image"  :src="imagePath(supercategory.image)" :alt="supercategory.name" />
            </div>
            <div class="col-12 col-lg-6 ">
                
                  <span class="texto"> {{supercategory.description}} </span>  
            
            </div>
        </div>
    
        <div>
            <app-categories :supercategory="supercategory"></app-categories>
        </div>
     
    </div>
</template>

<script>
import appCategories from './categories.vue'
export default {
    components:{appCategories},
    props : ['supercategory'],
    computed : {
        
     
       
        pagination(){
            if (this.pages <= 6){
                let array = [];
                for (var i = 1; i < this.pages ;i++)
                {
                    array.push(i);
                }
                return array;
            }
            else {
                let current = this.page;
                if(current >= this.pages){
                    return [1,current-4,current-3,current-2,current-1,current];
                }
                else if (current >= this.pages-1){
                    return [1,current-2,current-1,current,this.pages];
                }
                else if (current > 2){
                    return [1,current-1,current,current+1,this.pages];
                }else if (current == 1){
                    return [1,2,3,4,5,this.pages];
                }else if (current == 2){
                    return [1,2,3,4,this.pages];
                }
            }
        },
      
      
    },
    data(){
        return{
            display : 'grid',
            sortby : 'name',
            order : 'desc',
            showOptions :[3,6,9,12],
            show:12,
            page:1,
        }
    },
    watch : {
        show(){
            this.page = 1 ;
        }
    }
}
</script>

<style lang="scss" scoped>
    .links{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        background-color: #6e6c6c44;
        font-size: .75rem;
        font-weight: bold;
        div{
             display: flex;
                justify-content: center;
                align-items: center;
        }
    }
    .form-control{
        font-size: .7rem;
        padding: 0;
    }
    @media(max-width: 990px){
        .links{
            margin-left: -11%;
            margin-right: -20%;
        }
    }
</style>
