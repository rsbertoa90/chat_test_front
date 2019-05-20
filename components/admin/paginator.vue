<template>
<nav v-if="total > 1" aria-label="Paginator">
  <ul class="pagination">
    <li class="page-item" :class="{'disabled':selectedPage==1}">
      <a class="page-link" 
         @click="select(selectedPage-1)" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    
    <li class="page-item"
         :class="{'active':selectedPage==page,}" 
         v-for="page in pages" :key="page">
        <div class="page-link" 
             @click="select(page)">{{page}}</div>
    </li>
    
    
    <li class="page-item" :class="{'disabled':selectedPage==total}">
      <a class="page-link"
           @click="select(selectedPage+1)" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>
</template>


<script>
export default {
    props:['selectedPage','products','productsPerPage'],
    computed:{
        total(){
            if(this.products){
                return  this.products.length / this.productsPerPage;
                
        
            }
        },
        pages(){
            let total = this.total;
            if (total % 1 != 0){total++}
            let res = [];
            for (var i=1 ; i < total ; i++){
                res.push(i);
            }
            return res;
        }
    },
    methods:{
        
        select(page)
        {
            this.$emit('selectPage',page);
        }
    }
}
</script>

<style lang="scss" scoped>
.pagination{
    display: flex;
    flex-wrap: wrap;
}
</style>

