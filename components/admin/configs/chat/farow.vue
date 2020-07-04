<template>
     <div class="row mt-4" v-if="fa">
        <div class="col-2 p-0">
            <h4>
                /{{fa.shortcut}}
            </h4>
        </div>
        <div class="col-3">
            <textarea @change="update('content')" class="form-control" type="text" v-model="fa.content" rows="6" />
        </div>
        <div class="col-2" >
                <a v-if="!preview && fa.url" :href="imagePath(fa.url)" target="_blank">
                    <img :src="imagePath(fa.url)">
                </a>
                <img :src="preview" v-if="preview">
        </div>
        <div class="col-1 d-flex align-items-center">
              <label class="adj-btn btn text-center btn-info btn-sm ">
                        <span v-if="fa.url">
                            CAMBIAR IMAGEN
                        </span>
                        <span v-else>
                            AGREGAR IMAGEN
                        </span>
                        <input
                            @change="onFileChange"
                            type="file"
                            name="file"
                            accept="image/x-png, image/gif, image/jpeg"
                            class="display-none"
                        />
                </label>
        </div>
        <div class="col-1 d-flex align-items-center">
            <button v-if="preview" class="btn btn-primary" @click="changeImg()">GUARDAR</button>
        </div>
        <div class="col-2 fcc">
            <button class="btn btn-sm btn-danger" @click="destroy()">
                <span class="fa fa-trash"></span>
            </button>
            
            <input type="checkbox" class="form-control mt-2" v-model="fa.onChat" @change="update('onChat')">
            
            
                <input type="number" v-model="fa.order" @change="update('order')" class="form-control mt-3">
            
        </div>
    </div>
</template>

<script>
export default {
    props:['fa'],
    data() {
        return {
              preview:null,
              imageUploaded:false,
        }
    },
    methods:{
        destroy(){
            var vm = this;
            this.$axios.delete(`/fast-answer/${this.fa.id}`)
                .then(()=>{
                    let fas = vm.$store.getters.getFastAnswers;
                    fas = fas.filter(f => {return f.id != vm.fa.id });
                    this.$store.commit('setFastAnswers',fas);
                });
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.preview = URL.createObjectURL(file);
            this.imageUploaded = true;
        },
        update(field)
        {
            let data = {
                id:this.fa.id,
                field:field,
                value:this.fa[field]
            }
            this.$axios.put('/fast-answer',data);
        },
        changeImg()
        {
            if (this.preview) {
            var vm = this;
            var fdata = new FormData();
            fdata.append('id',this.fa.id);
            var file = $('input[type="file"]')[0].files[0];
            if (file) {
                console.log('append file',file);
                fdata.append("image", file);
                console.log('fdata',fdata,this.fa.id)
                this.$axios.post('/fast-answer-image',fdata)
                        .then(r => {
                            if(r.data && r.data.url)
                            {
                                this.fa.url = r.data.url;
                                this.preview=null;
                            }
                    });
                }
            }
        }
    }
}
</script>
