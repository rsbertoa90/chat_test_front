<template>
<div class="container mt-4">
    <div class="mt-4 row">
        <div class="col-12" 
              v-for="category in categories" 
              :key="category.id">
              
            <div class="card" >
                <nuxt-link :to="category.slug"  class="d-block w-100" >
                    <v-lazy-image class="card-img-top onhover" :src="imagePath(category.image)" 
                                            :alt="category.name" />
                    <div class="card-body">
                        <h5 class="card-title" > {{category.name | ucFirst}} </h5>
                        <p v-if="category.homedescription" class="card-text crop-text texto"> {{category.homedescription}} </p>
                    </div>
                </nuxt-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    computed : {
        categories(){
            return this.$store.getters.getCategories;
        }
    }
}
</script>

<style scoped lang="scss">
      
</style>
