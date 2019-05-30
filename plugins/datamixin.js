

import Vue from 'vue'

Vue.mixin({
    methods:{
      productSlug(product)
      {
        if (this.categories)
        {
          let cat = this.categories.find(c=>{
            return c.id == product.category_id;
          });

          if (cat){
            let res = cat.slug + '/' + product.slug;
           res= res.replace('//','/'); 
           res= res.replace('//','/'); 
           
            return res; 
          }
        }
      },
   
    
      imagePath(path)
      {
        
         if (path == null){
           return this.noImage;
         }
         else{
           if (typeof path === 'object') {
             if (path.url){
               path = path.url;
             }
           }

           let res = this.backendpath;
           res+=path.trim();
           res=res.replace('//','/');
           res=res.replace('//','/');
           res = res.replace(':/', '://');
           return res;
         }
      },
     
    },
     computed: {
          devmode() {
            console.log('devmode',process.env.NODE_ENV);
            return process.env.NODE_ENV !== 'production';
          },
         backendpath() {
          
           let res = this.devmode ? 'http://127.0.0.1:8000' : 'https://back.matesdefabrica.com';
          console.log('backendpath',res);
           return res;
         },
       noImage()
       {
        return this.imagePath('/storage/images/app/no-image.png');
       },
       config(){
        return this.$store.getters.getConfig;
       },
       user() {
         return this.$store.getters.getUser;
       },
       admin(){
        return this.user && this.user.role_id<3;
       },
       categories() {
         return this.$store.getters.getCategories;
       },
       total() {
           return this.$store.getters.getTotal;
         },
         list() {
           return this.$store.getters.getList;
         }
     }
})