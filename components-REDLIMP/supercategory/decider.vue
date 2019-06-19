<template>
    <div>
        <Category :category="objectProp"  v-if="comp=='Category'"></Category>
        <SuperCategory :supercategory="objectProp"  v-if="comp=='SuperCategory'"></SuperCategory>
        <err404  v-if="comp=='err404'"></err404>
    </div>
</template>

<script>
import SuperCategory from './Supercategory.vue';
import Category from '../category/Category.vue';
import err404 from './err404.vue';
export default {
    name:'decider',
    components:{Category,SuperCategory,err404},
    data(){
        return{
            objectProp:null
        }
    },
  
    computed:{
     
        comp(){
            if (this.categories && this.supercategories)
            {
               
               let param = this.$route.params.slug;
               console.log(param);

                let category = this.categories.find (cat => {
                    let slug = '/'+cat.slug;
                    slug = slug.replace('//','/');
                    slug = slug.replace('//','/');
                    return slug === '/'+this.$route.params.slug;
                });

                if (!category)
                {
                    let superC = this.supercategories.find (cat => {
                        let slug = '/'+cat.slug;
                        slug = slug.replace('//','/');
                        slug = slug.replace('//','/');
                        return slug === '/'+this.$route.params.slug;
                    });
                    if(superC){
                        this.objectProp= superC;
                        return  "SuperCategory";
                    } else{
                       return  'err404';
                    }
                } else{
                    this.objectProp= category;
                    return 'Category';

                }
                
            
            }
        },
       
    }
}
</script>
