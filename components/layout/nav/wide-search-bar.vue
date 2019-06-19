<template>
    <div class="search-bar row mr-2 ml-4 d-flex align-items-center bg-white justify-content-between pr-3">
        <input placeholder="BUSCAR" type="text" @focus="focused = true" 
                @blur="focused=false" class=" search-field" 
                v-model="term" @keyup.enter="search">
        |
        <button class="search-btn" @click="search">
            <fa-icon icon="search"></fa-icon>
        </button>
    
    </div>
</template>

<script>
export default {
    data(){
        return{
            focused:false,
            term:'',
        }
    },
    mounted(){
        if (this.searchTerm){
            this.term = this.searchTerm;
        }
    },
    computed:{
        searchTerm()
        {
            return this.$store.getters.getSearchTerm;
        }
    },
    methods:{
        search(){
            if (this.term.trim().length > 1){
                this.$store.commit('setSearchTerm',this.term);
                if(this.$route.path != "/cotizador")
                {
                    this.$router.push('/cotizador');
                }
            }
        }
    },
    watch:{
        searchTerm(){
            if (this.searchTerm.trim() == "")
            {
                this.term = "";
            }
        }
    }

    /* Hacer interaccion con searchTerm de store */
}
</script>


<style lang="scss" scoped>
    .search-bar{
        position:relative;
        width : 50vw;
        height: 30px;

    }

    .search-btn{
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        border:none;
        cursor: pointer;
    }
   
    .search-field{
        border:none;
        height:30px;
        padding-left:20px;
        color:#868686;
        width: 90%;
        &:focus{
            border:none;
            outline:none;
        }
       
      
    }

    .search-back-arrow{
         position:fixed;
        top:15px;
        left:7px;
        color:#868686;
        z-index:250;
        color:#000;
    }

</style>
