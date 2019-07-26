<template>
    <appcategory v-if="obj" :category="obj"></appcategory>
</template>


<script>
import appcategory from '@/components/category/Category.vue';
export default {
    name:'category-decider',
    components:{appcategory},
    layout:'categories',
    
    head() {
        let canonical ='https://matesfabi.com'+this.$route.path;
        
        return {
              link:[
                {rel:'canonical',href:canonical}

            ],
            titleTemplate: this.metatitle,
            meta: [
                { name: 'description', content: this.metadescription, hid:'description' },
                { property:'og:url', content:canonical}

            ]
        }
    },

    computed:{
          obj()
        {
            if(this.categories){

                let res = null;
                    res  = this.categories.find(c => {
                       let slug = '/'+c.slug;
                        slug =slug.replace('//','/');
                        let param = '/' + this.$route.params.category;
                        param =param.replace('//','/');
                        return slug == param;
                   });
                
                 
                  if(res){
                      return res;
                  }else{
                      this.$router.push('/');
                  }          
            }
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
