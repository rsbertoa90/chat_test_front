<template>
    <div v-if="surveys">
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            surveys:null
        }
    },

    mounted(){
        this.$axios.get('/ecsurvey')
            .then(r=>{
                this.surveys=r.data;
            });
    }
}
</script>
