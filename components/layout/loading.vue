<template>
    <div class="overlay" v-if="loading || firstload">
        <div class="dot-container">
            <dot-loader :loading="loading || firstload" size="200px"></dot-loader>
        </div>
    </div>
</template>

<script>
import dotLoader from 'vue-spinner/src/DotLoader.vue';
export default {
    components:{dotLoader},
    computed:{
        loading(){
            return this.$store.getters.getLoading;
        }
    }
}
</script>

<style lang="scss" scoped>
.overlay{
    background-color: #cccd;
    width:100vw;
    height: 100vh;
    position:fixed;
    top:0;
    left:0;
    display:flex;
    justify-content: center;
    align-items:center;
    z-index:999;
}

.dot-container{
    display:flex;
    width:200px;
    height: 200px;
}
</style>
