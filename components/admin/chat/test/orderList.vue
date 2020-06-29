<template>
    <div>
        <div class="mb-2">Lista de Pedidos</div>
        <ul>
            <li v-for="order in orderss">
                <a class="order-link" :href="`${backendpath}/pdf/${order.id}`" target="_blank">{{ order.created_at | date }}</a>
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