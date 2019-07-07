<template>
    <div>
        <table v-if="rows && rows.length>0" class="table table-striped">
            <thead>
                <th>failed_at</th>
               <!--  <th>payload</th> -->
                <th>exception</th>
                <!-- <th> - </th> -->
            </thead>
            <tbody>
                <tr v-for="row in rows" :key="row.id">
                    <td style="width:80px"> {{row.failed_at}} </td>
                    <!-- <td> {{row.payload}} </td> -->
                    <td class=" truncate"> {{row.exception}} </td>
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
        this.$axios.get('/api/failed-jobs')
            .then(res => {
                this.rows = res.data;
            });
    }
}
</script>

<style scoped lang="scss">
    
td{
    max-width: 30vw;
    max-height: 300px;
    white-space: normal;
    max-height: 100px;
}

.truncate {

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>