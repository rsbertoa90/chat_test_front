<template>
    <div>
        <table class="table table-striped">
            <thead>
                <th>Motivo</th>
                <th>Cantidad</th>
                <th>$$</th>
            </thead>
            <tbody>

                <tr v-for="d in tdata" :key="d.cancelation">
                    <td>{{d.cancelation}}</td>
                    <td>{{d.orders}}</td>
                    <td>${{d.total |price}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props:['data'],

    computed:{
        tdata(){
            let res = [];

            this.data.list.forEach(order => {
                let exists = res.find(r => {
                    return r.cancelation == order.cancelation;
                });

                if (exists){
                    exists.orders++;
                    exists.list.push(order);
                    exists.total+=order.total;
                }else{
                    let newr = {
                        orders:1,
                        list:[order],
                        cancelation:order.cancelation,
                        total:order.total
                    }
                    res.push(newr);
                }
            })

            return this.orderArray(res,'orders').reverse();
        }
    }

}
</script>
