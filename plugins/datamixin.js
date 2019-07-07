

import Vue from 'vue'

Vue.mixin({
    methods:{
      orderArray(array,field)
      {
        //console.log(field);
        return array.sort((a,b) => {
          if(a[field] < b[field]){
           // console.log(a[field],b[field])
            return -1
          }
          if(a[field] > b[field]){
           // console.log(a[field],b[field])
            return 1
          }
          return 0;
        })
      },
      downloadImage(image)
      {
        if(image && image.url)
        {
          if(process.browser){
            let path= this.backendpath+'/download-image/'+image.id;
            var win = window.open(path, '_blank');
            win.focus();
          }
        }
      },
      notPaused(products){
        if(products && products.length > 0){
          return products.filter(p=>{
            return !p.paused;
          })
        }
      },
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
         
           let res = this.$axios.defaults.baseURL == 'http://localhost:8000/api' ;

          /*   console.log('devmode', this.$axios.defaults.baseURL, res); */
            return res;
          },
         backendpath() {
          
           let res = this.devmode ? 'http://127.0.0.1:8000' : 'https://back.mayoristamaju.com';
       /*    console.log('backendpath',res); */
           return res;
         },
       noImage()
       {
        return this.imagePath('/storage/images/app/no-image.png');
       },
       loadingImage(){
         return this.imagePath('/storage/images/app/loading-image.jpg');
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
     isSuper() {
       return (this.user && (this.user.email == 'rsbertoa90@gmail.com' || this.user.email == 'roominagii@gmail.com'));
     },
       categories() {
         return this.$store.getters.getCategories;
       },
       total() {
           return this.$store.getters.getTotal;
         },
         list() {
           return this.$store.getters.getList;
         },
         firstload(){
           return this.$store.getters.getFirstload;
         },
         orders(){
           return this.$store.getters.getOrders;
         }
     },
    
})