<template>
    <div class="row ">
        <div class="col-12">
            <h2>Metadata de paginas</h2>
            <hr>
        </div>
   
        
        <hr>

        <div class="col-12 col-lg-4 d-flex flex-column">
            <button v-for="meta in metadatas" 
                    :key="meta.id"
                    @click="selected=meta"
                    class="btn btn-block bg-first white-bold"
                    :class="{'bg-focus' : selected == meta}">
                    {{meta.page | ucFirst}}
            </button>
        </div>
        <div class="col-12 col-lg-8">
            <div v-if="selected">
                <h2> {{selected.page | ucFirst}} </h2>

                <div class="p2 row">
                    <label class="col-12 col-lg-4">
                        Meta Titutlo
                    </label>
                    <textarea rows="5" v-model.lazy.trim="selected.metatitle" @change="save(selected,'metatitle')" 
                        type="text" class="col-12 col-lg-8 form-control"></textarea>
                </div>
                <div class="p2 row">
                    <label class="col-12 col-lg-4">
                        Meta Descripcion
                    </label>
                    <textarea rows="5" v-model.lazy.trim="selected.metadescription" @change="save(selected,'metadescription')" 
                        type="text" class="col-12 col-lg-8 form-control"></textarea>
                </div>
            </div>
          
        </div>
    </div>
</template>

<script>
export default {
    
    data(){
        return{
            selected : null,
            metadatas : []
        }
    },
    
    created(){
        this.$http.get('/api/metadatas')
            .then(response => {
                this.metadatas = _.sortBy(response.data,'page');
                
            });
    },
    methods :{
        save(meta,field){
            var data = {
                page : meta.page,
                field : field,
                value : meta[field]
            }
            this.$http.put('/super/metadata',data);
        }
    }

}
</script>
