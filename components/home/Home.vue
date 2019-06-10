<template>
<div class="container ">

    <div class="row p-lg-3">
            <home-banner class="mt-4"></home-banner>
            <br>
            <br>
            <home-info class="mt-4"></home-info>
            <br><br>
            <home-offers class="mt-4"></home-offers>

    </div>
</div>
</template>

<script>
import homeBanner from './banner.vue'
import homeInfo from './info.vue'
import homeOffers from './offers.vue'
export default {
    components: {
        homeBanner,
        homeInfo,
        homeOffers
    }
}
</script>


