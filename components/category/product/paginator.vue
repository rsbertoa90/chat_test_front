<template>
    
        <div class="row mt-4" v-if="pages > 1">
            <div class="col-12 col-lg-4 offset-lg-8 ">
                   
                <div v-if="pages > 1" class="justify-content-center d-flex">
                    <button v-if="page != 1" class=" bg-transparent"
                            @click="$emit('pagedown')">
                        <span class="fa fa-chevron-left"></span>
                    </button>
                    <button v-for="p in pagination" :key="p" 
                            class=" bg-transparent"
                            :class="{'text-focus' : page == p }"
                            @click="$emit('setpage',p)">
                        <span> {{p}} </span>
                    </button>
                    
                    <button v-if="page != pages" class=" bg-transparent"
                            @click="$emit('pageup')">
                        <span class="fa fa-chevron-right"></span>
                    </button>
                </div>
            
            </div>
        </div>
</template>

<script>

export default {
props:['products','page'],
data(){
    return{
          show:12,
    }
},
methods:{
     paginatedProducts(pages){
            
            
            if (pages &&  this.products.length > 0){
                
                let prods = this.products.filter(p => {
                    return !p.paused
                    });

                    let from = (this.page-1)*this.show;
                    let to = from + this.show;
                    prods = prods.slice(from,to);
                   // console.log('prods',prods);
                    this.$emit('setPaginatedProducts',prods)
                
            }
        },
},
computed:{
     pages(){
            let prods = this.products.filter(p => {return !p.paused});

            let res  =  Math.ceil(prods.length / this.show);
            
           /* if (this.products>this.show && this.products.length % this.show > 0){
               res++;
           } */
           //console.log(this.products.length);
           //console.log(res);
          // console.log(prods.length, res);
            this.paginatedProducts(res);
           return res;
        },
        pagination(){
           
                let array = [];
                for (var i = 1; i <= this.pages ;i++)
                {
                    array.push(i);
                }
            
                return array;
            
          
            
        },
       
        
       
      
    },
}    

</script>
