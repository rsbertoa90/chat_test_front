<template>
    <div>
        <div class="mb-2 roboto">Lista de Pedidos</div>
        <ul>
            <li v-for="order in orderss" :key="order.id">
                <a class="order-link roboto" :href="`${backendpath}/pdf/${order.id}`" target="_blank">{{ order.created_at | date }}</a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: ["orderss"]
};
</script>
<style scoped>
.order-link {
    color: #63AECE;
    font-size: 14px;
}
</style>