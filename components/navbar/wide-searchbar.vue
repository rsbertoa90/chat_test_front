<template>
    <div class="searchbar">
        <input @focus="focused=true" 
              type="text" class="search-input" >
        <span class="fa fa-search icon"></span>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .searchbar{
     
       position:relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width:100%;
    
        margin-top:4px;
        height: 43px;
        
        .search-input{
            -webkit-appearance: none;
            border:none;
            width:100%;
            padding-left:40px;
            height: 50px;
            border-radius:15px;
            box-shadow: 2px 2px 2px 0px #000;
            &:focus{
                border:none;
                outline: none;
            }
        }
        .icon{
            position:absolute;
            left:5px;
        }
    }
</style>