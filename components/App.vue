<template>
    <div class="app-container">
        <userLayout v-if="!user || user.role_id > 2"></userLayout>
        <admin-layout v-if="user && user.role_id < 3"></admin-layout>
        <total-bouncer v-if="$route.path != '/carrito'"></total-bouncer>
        <div v-if="loading" class="loader">
            <fade-loader :loading="loading" size="200px"></fade-loader>
        </div>
    </div>  
</template>

<script>
import totalBouncer from './layout/total-bouncer/total-bouncer.vue';
import userLayout from './layout/User-layout.vue';
import adminLayout from './layout/Admin-layout.vue';
export default {
    components:{
        userLayout,adminLayout,totalBouncer
    },
    computed:{
        user(){
            return this.$store.getters.getUser;
        },
        loading()
        {
            return this.$store.getters.getLoading;
        },

    }
}
</script>


<style lang="scss" scoped>
    .app-container{
        width:98.5vw;
        margin:0;
        padding:1%;
        border:1px solid #868686;
        overflow: hidden;
    }

    .loader {
    position : fixed;
    height: 100%;
    width: 100%;
    z-index: 110;
    background-color: #ddddddaa;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 5%;
}



</style>

