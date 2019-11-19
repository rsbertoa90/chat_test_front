<template>
    <div class="mt-4">
        <a target="_blank" href="https://forms.gle/mhsr13L6UfeopeSo8" rel="noreferrer">
            <v-lazy-image v-if="$mq=='lg'" :src="imagePath('/storage/images/app/proveedores-wide.jpg')">
            </v-lazy-image>
            <v-lazy-image v-else :src="imagePath('/storage/images/app/proveedores-mob.jpg')">
            </v-lazy-image>
        </a>
        <div class="mt-4">
            <a target="_blank" class="mt-4" href="https://www.facebook.com/mayoristaMatesFabi/photos/a.178501952868765/438237730228518/?type=3&theater" rel="noreferrer">
                <v-lazy-image v-if="$mq=='lg'" :src="imagePath('/storage/images/app/sorteow.jpg')">
                </v-lazy-image>
                <v-lazy-image v-else :src="imagePath('/storage/images/app/sorteom.jpg')">
                </v-lazy-image>
            </a>
        </div>
    </div>
</template>


<script>
export default {
    
}
</script>


<style lang="scss" scoped>

</style>
