<template>
    <div>
        <table v-if="rows && rows.length>0" class="table table-striped">
            <thead>
                <th>failed_at</th>
                <th>payload</th>
                <th>exception</th>
                <th> - </th>
            </thead>
            <tbody>
                <tr v-for="row in rows" :key="row.id">
                    <td> {{row.failed_at}} </td>
                    <td> {{row.payload}} </td>
                    <td> {{row.exception}} </td>
                </tr>
            </tbody>
        </table>

        <div v-if="!rows || rows.length == 0">
            <h1>Nada por aqui</h1>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return{
            rows:null
        }
    },
    created(){
        this.$http.get('/api/failedjobs')
            .then(res => {
                this.rows = res.data;
            });
    }
}
</script>
