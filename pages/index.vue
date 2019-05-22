<template>
    <div class="container">
        <div class="row" v-for="c in categories" :key="c.slug">
            <nuxt-link :to="c.slug">
            <h2>{{c.name}}</h2>  
            </nuxt-link>
            <div class="col-12" v-for="p in c.products" :key="p.slug">
                  <nuxt-link :to="productSlug(p)">
                   {{p.name}}
                  </nuxt-link> 
            </div>
        </div>
    </div>
</template>


<script>
export default {
  name:'home',

}
</script>
