<template>
    <div>
        <div>
            <h1>Banner informativo</h1>
        </div>

     
       
        <div class="row mt-4">
            <div class="col-6">
                <div class="d-flex flex-column">
                    <div class="miniature">
                        <img v-if="info_banner_wide" :src="info_banner_wide">
                    </div>
                    <div>
                        <label class="btn btn-info" >
                            Cargar imagen version grande
                            <input @change="imgloaded('info_banner_wide')" type="file" ref="info_banner_wide" class="display-none">
                        </label>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="d-flex flex-column">
                    <div class="miniature">
                        <img v-if="info_banner_mobile" :src="info_banner_mobile">
                    </div>
                    <div>
                        <label  class="btn btn-info" >
                                Cargar imagen version mobile
                                <input @change="imgloaded('info_banner_mobile')" type="file" ref="info_banner_mobile" class="display-none">
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="info_banner_wide && info_banner_mobile">
            <button class="btn btn-success" @click="save">guardar</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            show1:false,
            info_banner_wide:null,
            info_banner_mobile:null,
            url:null,
            
        }
    },
    methods:{

       
        saveimg(img){
                var vm =this;
                const file = this.$refs[img].files[0];
                if (file == null){
                    swal('No se ha seleccionado una imagen','','error');
                } else {

                    this.file = file;
                    // console.log(file);
                    
                    
                    var fdata =  new FormData();
                    fdata.append('image',file);
                    fdata.append('name',img)
                    fdata.append('code',img)
                    fdata.append('url',this.url)
              
                    // console.log(fdata);
                    this.$axios.post('/appimage',fdata)
                    
    
                   
                }

        },
       save (){
               this.saveimg('info_banner_wide');
               this.saveimg('info_banner_mobile');
               this.$store.commit('setLoading',true);
               setTimeout(() => {
                    this.$store.commit('setLoading',false);
                   this.$router.push('/');
               }, 900);

        
        },
        imgloaded(img)
        {
            const file = this.$refs[img].files[0];
            this[img] = URL.createObjectURL(file);

        }
    },
    mounted(){
        this.$axios.get('/appimage/info_banner_wide')
            .then(r => {
                if(r.data)
                {
                    this.url = r.data.url;
                }
            })
    }
}
</script>


<style lang="scss" scoped>
.display-none{
    display: none;
}

.miniature{
    width:120px;
}

.img-container{
    height: 250px;
    width:300px;
    overflow: hidden;
    margin-bottom: 20px;
}
</style>
