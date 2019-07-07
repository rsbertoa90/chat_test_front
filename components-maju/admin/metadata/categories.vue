<template>
    <div class="row">
        <div class="col-12">
            <h2>Descripciones y metadata de Categorias</h2>
            <hr>
        </div>
        
        <div class="col-12 col-lg-4 d-flex flex-column scroll-y">
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
                        URL
                    </label>
                    <textarea rows="2" v-model.lazy.trim="selected.slug" @change="saveSlug(selected)" 
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
                <div class="p2 row">
                    <label class="col-12 col-lg-4">
                        Palabras clave para busqueda
                    </label>
                    <textarea rows="5" v-model.lazy.trim="selected.keywords" @change="save(selected,'keywords')" 
                        type="text" class="col-12 col-lg-8 form-control"></textarea>
                </div>

                <div class="row mt-4">
                    <div class="col-6 overflow-hidden">
                        <img :src="imagePath(selected.image)" :alt="selected.name" style="width:100px">
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
            return this.$store.getters.getCategories;
        }
    },
    data(){
        return{
            selected : null,
           
        }
    },
    methods :{
        bindFile(e){
            var vm=this;
            var fileUploadFormData=new FormData();
            var file = e.target.files[0];
            var ext = file.name.split('.').pop();
            if (ext == 'png' || ext == 'jpg' || ext == 'jpeg' || ext == 'gif' || ext == webp){
                fileUploadFormData.append('image', e.target.files[0]);
                fileUploadFormData.append('id', this.selected.id);
                this.$axios.post('/category/image', fileUploadFormData)
                    .then(res => {
                        vm.$store.dispatch('fetchCategories');
                        setTimeout(() => {
                            vm.selected = vm.categories.find(c=>{
                                return vm.selected.id == c.id;
                            });
                        }, 200);
                    });
                       
            }
        },
        save(category,field){
            var data = {
                id : category.id,
                field : field,
                value : category[field]
            }
            this.$axios.put('/category',data);
        },
        saveSlug(category){
            if(this.selected.slug){

                this.selected.slug  = this.selected.slug.replace(/\s+/g, '-').toLowerCase().trim();
                
                let dups = this.categories.find(c => {
                    return c.slug === this.selected.slug && c.id != this.selected.id;
                });

                if (dups){
                    swal('Cuidado!','Ya existe una categoria con esa URL','warning');
                }else{
                    this.save(category,'slug');
                }
            }
        }
    },
    watch:{
        'selected.slug'(){
            if(this.selected.slug){

                this.selected.slug  = this.selected.slug.replace(/\s+/g, '-').toLowerCase().trim();
            }
        }
    },
    

}
</script>

<style scoped>
img{
    width: 100%;
}
    .overflow-hidden{
        overflow: hidden;
    }

.scroll-y{
    height:500px;
    overflow-y:scroll;

}
</style>