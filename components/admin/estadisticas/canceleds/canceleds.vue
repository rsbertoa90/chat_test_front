<template>
    <div class="row">
        <div class="col-12 col-lg-6">
            <table class="table table-striped">
                <thead>
                    <th>
                        Mes
                    </th>
                    <th>
                        cancelados
                    </th>
                    <th>
                        $$
                    </th>
                </thead>
                <tbody>
                    <tr>
                        <td>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return{
            months:['enero','febrero','marzo','abril','mayo','junio','julio','agosto','setiembre','octubre','noviembre','diciembre']

        }
    },
    computed:{
        corders()
        {
            return this.$store.getters.getCanceledOrders;
        },
        tdata(){
            if(this.corders)
            {
                let res=[];

                this.corders.forEach(order => {
                    res.forEach
                })
            }
        }
    }
}
</script>
