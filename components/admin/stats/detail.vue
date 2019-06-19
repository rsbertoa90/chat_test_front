<template>
<div>
    <div v-if="orders">
        <table class="table table-striped">
            <thead>
                <th>NOMBRE</th>
                <th>MONTO</th>
                <th>ESTADO</th>
            </thead>
            <tbody> 
                <tr v-for="o in orders" :key="o.id">
                    <td>{{o.name}}</td>
                    <td>${{o.total |price}}</td>
                    <td>{{o.status}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>


<script>
export default {
    props:['orders']
}
</script>
