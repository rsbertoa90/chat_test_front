<template>
      <div>
            <navbar-mobile v-if="$mq != 'lg'"></navbar-mobile>
            <navbar-wide v-else></navbar-wide>
      </div>

</template>
<script>
import navbarMobile from './navbar/Navbar-mobile.vue'
import navbarWide from './navbar/Navbar-wide.vue'
export default {
    components : {
        navbarMobile,
        navbarWide

    }
}
</script>


<style scoped>
    .bg-turquesa {
        background-color: turquoise;
    }
    


</style>
