<template>
    <div class="fcc">
        <button class="button btn-lg btn-primary" @click="makeNew = !makeNew">
            NUEVO ATAJO
        </button>
        <div class="new fcc mt-4" v-if="makeNew">
            <div class="row">
                <label for="" class="col-3">
                    Atajo
                </label>
                <input @keydown.space.prevent class="form-control col-3" type="text" v-model="newfa.shortcut" >
            </div>
            <div class="row">
                <label for="" class="col-3">
                    Texto
                </label>
                <textarea  class="form-control col-3" type="text" v-model="newfa.content" rows="6" />
            </div>
            <div class="row mt-2">
                <label for="" class="col-3">
                    
                </label>
                <div class="col-3 d-flex align-items-center">
                    <label class="adj-btn btn text-center btn-info btn-sm ">
                        SUBIR IMAGEN
                        <input
                            @change="onFileChange"
                            type="file"
                            name="file"
                            accept="image/x-png, image/gif, image/jpeg"
                            class="display-none"
                        />
                    </label>
                </div>
                <div class="preview col-3" v-if="preview">
                    <img :src="preview">
                </div>
            </div>
            <div class="row">
                <button class="btn btn-lg btn-primary" @click="saveNew()" :disabled="!newfa.shortcut || (!newfa.content && !preview)" >GUARDAR</button>
            </div>
        </div>
        
        <div   v-if="fastAnswers">
                <farow :fa="fa" v-for="fa in fastAnswers" :key="fa.id">
                </farow>
        </div>
    </div>
</template>

<script>
import farow from './farow.vue'
export default {
    components:{farow},
    data() {
        return {
            makeNew:false,
            preview:null,
            imageUploaded:false,
            newfa:{
                shortcut:'',
                content:'',
            }
        }
    },
    mounted(){
        this.$store.dispatch('fetchFastAnswers');
    },
    computed:{
        fastAnswers()
        {
            return this.$store.getters.getFastAnswers;
        }
    },
    watch:{
        'newfa.shortcut'()
        {
            this.newfa.shortcut = this.newfa.shortcut.replace('/','');
            this.newfa.shortcut = this.newfa.shortcut.replace(' ','');
        }
    },
    methods:{
        onFileChange(e) {
            const file = e.target.files[0];
            this.preview = URL.createObjectURL(file);
            this.imageUploaded = true;
        },
        saveNew(){
            var vm = this;
            var fdata = new FormData();

            if (this.preview) {
                var file = $('input[type="file"]')[0].files[0];
                if (file) {
                    fdata.append("image", file);
                }
            }
            
            fdata.append("shortcut", this.newfa.shortcut);
            fdata.append("content", this.newfa.content);

            this.$axios.post('/fast-answer',fdata)
                .then(r => {
                    vm.preview=null;
                    vm.newfa={content:'',shortcut:''}
                    vm.fastAnswers.push(r.data);
                    console.log(r.data);
                });
        
        },
        update(){}
    }
}
</script>


<style lang="scss" scoped>
.miniature{
    width:150px;
}
</style>
