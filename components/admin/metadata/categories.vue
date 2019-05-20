<template>
    <div class="row">
        <div class="col-12">
            <h2>Descripciones y metadata de Categorias</h2>
            <hr>
        </div>
        
        <div class="col-12 col-lg-4 d-flex flex-column">
            <button v-for="category in categories" 
                    :key="category.id"
                    @click="selected=category"
                    class="btn btn-block bg-first white-bold"
                    :class="{'bg-focus' : selected == category}">
                    {{category.name}}
            </button>
        </div>
        <div class="col-12 col-lg-8">
            <div v-if="selected">
                <h2> {{selected.name}} </h2>

                <div class="p2 row">
                    <label class="col-12 col-lg-4">
                        Url
                    </label>
                    <textarea rows="1" v-model.lazy.trim="selected.slug" @change="saveSlug(selected)" 
                        type="text" class="col-12 col-lg-8 form-control"></textarea>
                </div>
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
                        <img :src="selected.image" :alt="selected.name">
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
        categories(){
            return this.$store.getters['getCategories'];
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
                this.$http.post('/super/category/image', fileUploadFormData)
                        .then(response => {
                           window.location.replace('/super');
                        });
            }
        },
        save(category,field){
            var data = {
                id : category.id,
                field : field,
                value : category[field]
            }
            this.$http.put('/admin/category',data);
        },
         saveSlug(category){
            
                category.slug  = category.slug.replace(/\s+/g, '-').toLowerCase().trim();
                category.slug =category.slug.replace('%','');
                category.slug =category.slug.replace('°','');
               

                let dups = this.categories.find(c => {
                    return c.slug === category.slug && c.id != category.id;
                });

                if (dups){
                    swal('Cuidado!','Ya existe una categoria con esa URL','warning');
                }else{
                    this.save(category,'slug');
                }
            
        }
    }

}
</script>
