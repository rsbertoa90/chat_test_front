<template>
     <div >
        <button v-if="config && !config.maintenance" @click="toggleMaintenance"
        class="btn btn-outline-danger btn-lg" >
            Ocultar cotizador al publico        
        </button> 

        <button v-else @click="toggleMaintenance"
        class="btn btn-outline-success btn-lg" >
            Mostrar cotizador al publico
        </button> 
     </div>
</template>

<script>
export default {
    computed:{
        config(){
            return this.$store.getters.getConfig;
        }
    },
    methods:{
        toggleMaintenance(){
                if (this.config.maintenance){
                    this.config.maintenance = 0;
                }else {this.config.maintenance =1;}

                this.$axios.put('/admin/config',{field:'maintenance',value:this.config.maintenance})
            },
    }
}
</script>
