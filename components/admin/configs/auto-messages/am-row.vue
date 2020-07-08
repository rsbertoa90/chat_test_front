<template>
     <div class="row mt-4" v-if="ma">
        <div class="col-2 p-0">
            <h4>
                {{ma.event}}
            </h4>
        </div>
        <div class="col-3">
            <textarea @change="update('content')" class="form-control" type="text" v-model="ma.content" rows="6" />
        </div>
        <div class="col-2" >
                <a v-if="!preview && ma.url" :href="imagePath(ma.url)" target="_blank">
                    <img :src="imagePath(ma.url)">
                </a>
                <img :src="preview" v-if="preview">
        </div>
        <div class="col-2 d-flex align-items-center">
              <label class="adj-btn btn text-center btn-info btn-sm ">
                        <span v-if="ma.url">
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
        <div class="col-2 d-flex align-items-center">
            <button v-if="preview" class="btn btn-primary" @click="changeImg()">GUARDAR</button>
        </div>
       
    </div>
</template>

<script>
export default {
    props:['ma'],
    data() {
        return {
              preview:null,
              imageUploaded:false,
        }
    },
    methods:{
     
        onFileChange(e) {
            const file = e.target.files[0];
            this.preview = URL.createObjectURL(file);
            this.imageUploaded = true;
        },
        update(field)
        {
            let data = {
                id:this.ma.id,
                field:field,
                value:this.ma[field]
            }
            this.$axios.put('/auto-messages',data);
        },
        changeImg()
        {
            if (this.preview) {
            var vm = this;
            var fdata = new FormData();
            fdata.append('id',this.ma.id);
            var file = $('input[type="file"]')[0].files[0];
            if (file) {
                console.log('append file',file);
                fdata.append("image", file);
                console.log('fdata',fdata,this.ma.id)
                this.$axios.post('/auto-message-image',fdata)
                        .then(r => {
                            if(r.data && r.data.url)
                            {
                                this.ma.url = r.data.url;
                                this.preview=null;
                            }
                    });
                }
            }
        }
    }
}
</script>
