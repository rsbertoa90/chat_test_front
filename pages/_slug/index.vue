<template>
    <decider></decider>
</template>


<script>
import decider from '@/components/supercategory/decider.vue';
export default {
    name:'category-decider',
    components:{decider},
    head() {
        return {
            titleTemplate: this.metatitle,
            meta: [
                { name: 'description', content: this.metadescription }

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
                    let param = '/' + this.$route.params.slug;
                    param =param.replace('//','/');
                    return slug == param;
               });
               if(!res){
                     res  = this.supercategories.find(c => {
                        let slug = '/'+c.slug;
                        slug =slug.replace('//','/');
                        let param = '/' + this.$route.params.slug;
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
