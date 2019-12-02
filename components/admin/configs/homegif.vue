<template>
    <div>
        <div>
            <h1>Cargar imagenes de GIF en HOME</h1>
        </div>
        <div v-if="img1 && img2">
            <div class="img-container">
                <img :src="img1" v-if="show1">
                <img :src="img2" v-if="!show1">
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <div class="d-flex flex-column">
                    <div class="miniature">
                        <img v-if="img1" :src="img1">
                    </div>
                    <div>
                        <label class="btn btn-info" >
                            Cargar imagen 1
                            <input @change="imgloaded('img1')" type="file" ref="img1" class="display-none">
                        </label>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="d-flex flex-column">
                    <div class="miniature">
                        <img v-if="img2" :src="img2">
                    </div>
                    <div>
                        <label  class="btn btn-info" >
                                Cargar imagen 2
                                <input @change="imgloaded('img2')" type="file" ref="img2" class="display-none">
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="img1 && img2">
            <button class="btn btn-success" @click="save">guardar</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            show1:false,
            img1:null,
            img2:null
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
                    fdata.append('name','homegif')
                    fdata.append('code',img)
              
                    // console.log(fdata);
                    this.$axios.post('/appimage',fdata)
                    
    
                   
                }

        },
       save (){
               this.saveimg('img1');
               this.saveimg('img2');
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
        setInterval(()=>{
            this.show1=!this.show1;
           // console.log(this.show1)
        },200)
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
