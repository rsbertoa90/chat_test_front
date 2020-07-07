

import Vue from 'vue'

Vue.mixin({
    methods:{
     

      normalizeString(string)
      {
          return string.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      },
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
            if(p.stock_managed){
              return (!p.paused && p.stock_units > 0)
            }
            else{
              return !p.paused;
            } 
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
          hidePricesMessage(){
              let meta = this.$store.getters.getMeta('precios-ocultos');
              if(meta && meta.metadescription){
                return meta.metadescription.trim().replace(/\n/g, "<br />");
              }
              else return null;
          },
          devmode() {
         
           let res = this.$axios.defaults.baseURL == 'http://localhost:8000/api' ;

          /*   console.log('devmode', this.$axios.defaults.baseURL, res); */
            return res;
          },
         backendpath() {
          
           let res = this.devmode ? 'http://127.0.0.1:8000' : 'https://back.dominiodepruebas.ml';
       /*    console.log('backendpath',res); */
           return res;
         },
       noImage()
       {
        return this.imagePath('/storage/images/app/no-photo.png');
        image
       },
       loadingImage(){
         return this.imagePath('/storage/images/app/loading-image.jpg');
       },
       config(){
        return this.$store.getters.getConfig;
       },
       hidePrices(){
        return (this.config && this.config.hide_prices && !this.admin); 
       },
       user() {
         return this.$store.getters.getUser;
       },
       admin(){
        return this.user && this.user.role_id < 3;
       },
     isSuper() {
       return (this.user && (this.user.email == 'rsbertoa90@gmail.com' || this.user.email == 'roominagii@gmail.com'));
     },
       categories() {
         return this.$store.getters.getCategories;
       },
       notPausedCategories(){
         return this.categories.filter(c => {
            let prods =  this.notPaused(c.products);
            return (prods && prods.length);
         })
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