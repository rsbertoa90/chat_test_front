<template>
    <appcategory></appcategory>
</template>


<script>
import appcategory from '@/components/category/categoryIndex.vue';
export default {
    name:'category-decider',
    components:{appcategory},
    layout:'categories',
    head() {
          let canonical =this.backendpath+this.$route.path;
        //console.log(canonical);
        return {
              link:[
                {rel:'canonical',href:canonical}
            ],
            titleTemplate: this.metatitle,
            meta: [
                { name: 'description', content: this.metadescription, hid:'description' }

            ]
        }
    },

    computed:{
          obj()
        {
            let res = null;
                res  = this.categories.find(c => {
                   let slug = '/'+c.slug;
                    slug =slug.replace('//','/');
                    let param = '/' + this.$route.params.category;
                    param =param.replace('//','/');
                    return slug == param;
               });
               if(!res){
                     res  = this.supercategories.find(c => {
                        let slug = '/'+c.slug;
                        slug =slug.replace('//','/');
                        let param = '/' + this.$route.params.category;
                        param =param.replace('//','/');
                        return slug == param;
                    });
               }    
        
             return res;
        },
          metatitle(){
            if (this.obj )
            {
                
                return this.obj.metatitle ? this.obj.metatitle : this.obj.name+'  POR MAYOR '            }else{return ''}
            
        },
        metadescription(){
            if (this.obj){
                if (this.obj.metadescription)
                {
                    return this.obj.metadescription;
                }
                else if (this.obj.description)
                {
                    return this.obj.description;
                }
                else return this.obj.name+" "+' POR MAYOR ';
                    
            }  else{return ''}
            
        },
    }
}
</script>
