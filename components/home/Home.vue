<template>
<div class="container">

    <div class="row p-3">
            <home-banner></home-banner>
            <br>
            <br>
            <home-info></home-info>
            <br><br>
            <home-offers></home-offers>

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
