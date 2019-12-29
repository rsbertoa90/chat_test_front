<template>
    <div class="mt-4">
        <nuxt-link  to="/participa-del-sorteo">
            <v-lazy-image v-if="$mq=='lg'" :src="imagePath('/storage/images/app/proveedores-wide.jpg')">
            </v-lazy-image>
            <v-lazy-image v-else :src="imagePath('/storage/images/app/proveedores-mob.jpg')">
            </v-lazy-image>
        </nuxt-link>
        <!--  <div class="mt-4">
            <nuxt-link  class="mt-4" to="/participa-del-sorteo">
                <v-lazy-image v-if="$mq=='lg'" :src="imagePath('/storage/images/app/sorteohomew.jpg')">
                </v-lazy-image>
                <v-lazy-image v-else :src="imagePath('/storage/images/app/sorteohomem.jpg')">
                </v-lazy-image>
            </nuxt-link>
        </div>  -->
    </div>
</template>


<script>
export default {
    
}
</script>


<style lang="scss" scoped>

</style>
