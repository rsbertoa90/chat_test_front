export default {
   
    computed: {
       categories(){
           return this.$store.getters.getCategories;
       },
       config()
       {
           return this.$store.getters.getCofig;
       },
       user(){
           return this.$store.getters.getUser;
       },
       states(){
           return this.$store.getters.getStates;
       },
       super(){
           return (this.user && (this.user.email ==  'rsbertoa90@gmail.com' || this.user.email=='roominagii@gmail.com'));
       }
       
    },
    methods:{
        notPaused(category)
        {
            if(category){
                return category.products.filter(p=>{
                    return !p.paused;
                });
            }
        }
    }
}