<template>
    <div>
        <div v-for="custom in customs" :key="custom.id" class="row p-2 m-2">
            <label class="col-12 col-lg-4"> {{custom.code}} </label>
            <textarea v-model.lazy="custom.text"
                    @change="update(custom)"
                    class="form-control col-12 col-lg-8"></textarea>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            customs:[]
        }


    },
    created(){
        this.$axios.get('/api/custom-texts')
            .then(res=>{
                this.customs = res.data;
            })
    },
    methods:{
        update(custom){
            let data={
                id : custom.id,
                value : custom.text,
                field : 'text'
            }
            this.$axios.put('/admin/customtext',data);
        }
    }
}
</script>
