<template>
    <div class="fcc mt-4">
        <h4>Mis pedidos</h4>
        <div class="fcc orders" v-if="orderss">
            <ul>
                <li v-for="order in orderss" :key="order.id">
                    <a class="order-link roboto" :href="`${backendpath}/pdf/${order.id}`" target="_blank">
                        {{ order.created_at | date }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderss:null
        }
    },
    mounted(){
        this.$axios.get('/user-orders')
            .then(r => {
                this.orderss = r.data;
            })
    }
}
</script>

<style lang="scss" scoped>
.orders{
    max-height: 85vh;
    overflow-y:scroll;
}
</style>
