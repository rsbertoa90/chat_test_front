<template>
    <div>
        <div v-if="admin" class="top-space"></div>
       <navMobile v-if="$mq!='lg'"></navMobile>
       <navWide v-if="$mq == 'lg'"></navWide>
    </div>
</template>


<script>
import navMobile from './nav/mobile.vue';
import navWide from './nav/wide.vue';
/* import navWide from './nav-admin.vue'; */
export default {
    components:{navMobile,navWide},
    computed:{
        user(){
            return this.$store.getters.getUser;
        }
    }

}
</script>


<style scoped>
    .top-space{
        width:100vw;
        height: 200px;
    }

    @media(max-width:600px){
        .top-space{
            height: 50px;
        }
    }
</style>