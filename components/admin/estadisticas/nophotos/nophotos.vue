<template>
    <div>
        <table class="table table-bordered table-striped">
            <thead>
                <th>Codigo</th>
                <th>Producto</th>
            </thead>
            <tbody>
                <tr v-for="p in nophotoproducts" :key="p.id">
                    <td>{{p.code}}</td>
                    <td>{{p.name}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
export default {
    computed:{
        nophotoproducts()
        {
            let res = [];
            if(this.categories){
                this.categories.forEach(c => {
                    let prods = this.notPaused(c.products);
                    if(prods){
                        prods.forEach(p => {
                            if (!p.images || !p.images[0])
                            {
                                res.push(p)
                            }
                        })
                    }
                })
            }
            return res;
        }
    }
}
</script>
