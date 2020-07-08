<template>
    <div v-if="autoMessages">
        <amRow class=" mt-4" :ma="ma" v-for="ma in autoMessages" :key="ma.id" >
            
        </amRow>
    </div>
</template>

<script>
import amRow from './am-row.vue'
export default {
    components:{amRow},
    data() {
        return {
            autoMessages:null
        }
    },
    mounted()
    {
        this.$axios.get('/auto-messages')
            .then(r => {
                this.autoMessages = r.data;
            })
    }
}
</script>
