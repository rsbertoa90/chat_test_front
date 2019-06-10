<template>
    <div class="overlay" v-if="loading">
        <div class="loading-spinner">
            <dot-loader :loading="loading" size="50"></dot-loader>
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
    background-color: #ccc9;
    width:100vw;
    height: 100vh;
    position:fixed;
    top:0;
    left:0;
    display:flex;
    justify-content: center;
    align-items:center;
    z-index:999;
    .loading-spinner{
        width:200px;
        height: 200px;
    }
}
</style>
