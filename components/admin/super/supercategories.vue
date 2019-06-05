<template>
    <div class="row">
        <div class="col-12">
            <h2>Descripciones y metadata de Supercategorias</h2>
            <hr>
        </div>
        
        <div class="col-12 col-lg-4 d-flex flex-column">
            <button v-for="supercategory in supercategories" 
                    :key="supercategory.id"
                    @click="selected=supercategory"
                    class="btn btn-block bg-first white-bold"
                    :class="{'bg-focus' : selected == supercategory}">
                    {{supercategory.name}}
            </button>
        </div>
        <div class="col-12 col-lg-8">
            <div v-if="selected">
                <h2> {{selected.name}} </h2>

                <div class="p2 row">
                    <label class="col-12 col-lg-4">
                        Descripcion
                    </label>
                    <textarea rows="5" v-model.lazy.trim="selected.description" @change="save(selected,'description')" 
                        type="text" class="col-12 col-lg-8 form-control"></textarea>
                </div>
                <div class="p2 row">
                    <label class="col-12 col-lg-4">
                        Descripcion para HOME
                    </label>
                    <textarea rows="5" v-model.lazy.trim="selected.homedescription" @change="save(selected,'homedescription')" 
                        type="text" class="col-12 col-lg-8 form-control"></textarea>
                </div>
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

                <div class="row mt-4">
                    <div class="col-6">
                        <img :src="imagePath(selected.image)" :alt="selected.name">
                    </div>
                    <div class="col-6 d-flex align-items-end">
                        <label class="btn btn-block btn-outline-info btn-file">
                            Cargar imagen <input @change="bindFile" type="file" style="display: none;" accept="image/*">
                        </label>
                    </div>
                </div>
            </div>
          
        </div>
    </div>
</template>

<script>
export default {
    computed : {
        supercategories(){
            return this.$store.getters.getSupercategories;
        }
    },
    data(){
        return{
            selected : null,
           
        }
    },
    methods :{
        bindFile(e){
             var fileUploadFormData=new FormData();
            var file = e.target.files[0];
            var ext = file.name.split('.').pop();
            if (ext == 'png' || ext == 'jpg' || ext == 'jpeg' || ext == 'gif' || ext == webp){
                fileUploadFormData.append('image', e.target.files[0]);
                fileUploadFormData.append('id', this.selected.id);
                this.$axios.post('/supercategory/image', fileUploadFormData)
                        .then(response => {
                            setTimeout(() => {
                                window.location.replace('/admin/metadata');
                            }, 500);
                        });
            }
        },
        save(supercategory,field){
            var data = {
                id : supercategory.id,
                field : field,
                value : supercategory[field]
            }
            this.$axios.put('/supercategory',data);
        }
    }

}
</script>
