

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
            res.replace('//','/'); 
            res.replace('//','/');
            return res; 
          }
        }
      },
      dev(){
         return process.env.NODE_ENV !== 'production';
      },
      imagePath(path)
      {
         let dev = process.env.NODE_ENV !== 'production';
         let res = dev ? 'http://localhost:8000' : 'https://matesdefabrica.com';
         res+=path.trim();
         res.replace('//','/');
         res.replace('//','/');
         res.replace('//','/');
         return res;
      },
     
    },
     computed: {
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
       }
     }
})