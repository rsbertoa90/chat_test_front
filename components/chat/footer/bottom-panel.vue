<template>
    <div class="pl-4 pr-4 pb-2">
        <div class="row" v-if="btnFas && btnFas.length">
            <div class="col-3 mt-2" v-for="fan in btnFas" :key="fan.id">
                <button class="btn btn-info btn-block fa-btn" @click="send(fan.id)" >
                    {{fan.shortcut}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted(){
        this.$store.dispatch('fetchFastAnswers');
    },
    computed:{
        fas(){
          return this.$store.getters.getFastAnswers;  
        },
        btnFas(){
            if(this.fas)
            {
                console.log('fas',this.fas);
                return this.fas.filter(fan => {
                    return fan.onChat;
                })
            }
        }
    },
    methods:{
        send(id)
        {
            this.$emit('sendFastAnswer',id)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>