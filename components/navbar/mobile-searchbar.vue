<template>
    <div class="searchbar"  :class="{'searchbar-focused':focused}">
        <input @focus="focused=true" @blur="focused=false" 
              type="text" class="search-input" 
              :class="{'focused':focused}">
        <span class="fa fa-search icon"></span>
    </div>
</template>

<script>
export default {
    data(){
        return{
            focused:false
        }
    }
}
</script>

<style lang="scss" scoped>
    .searchbar{
      &.searchbar-focused{
          margin-left:0;
          transition: all .3s;
          width:99vw;
          z-index: 999;
      }
       transition: all .3s;
        margin-left:27vw;
    
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width:44vw;
        position:relative;
        margin-top:4px;
        height: 43px;
        .search-input{
            -webkit-appearance: none;
            border:none;
            width:100%;
            padding-left:40px;
             height: 43px;
             border-radius:15px;
        }
        .icon{
            position:absolute;
            left:5px;

        }
    }
</style>