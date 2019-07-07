<template>
    <div class="mt-4 p-4">
        <h2>Slider</h2>
        <!-- Sample -->
        <div class="row" v-if="this.slides && this.slides[this.selected]">
            <div class="col-12 col-lg-6 offset-lg-2 img-container">
                
            <transition  leave-active-class="animated slideOutRight position-absolute" >
                <img :key="slides[this.selected].id" :src="imagePath(slides[this.selected].image)" >
            </transition>
                
                
                <button class="btn btn-danger delete-button"><fa-icon icon="times"></fa-icon></button>
                <div class="controls">
                    <button class="btn btn-info" @click="selected--"> <fa-icon icon="chevron-left"></fa-icon> </button>
                    <button class="btn btn-info" @click="selected++"> <fa-icon icon="chevron-right"></fa-icon> </button>
                </div>
            </div>
            <div class="col-12 ">
                <label class="col-6 col-lg-2">Leyenda</label>
                <textarea rows="2"  type="text" v-model="slides[selected].alt" />
            </div>
            <div class="col-12">
                <label class="col-6 col-lg-2" for="">URL destino</label>
                <input type="text" v-model="slides[selected].url">
            </div>
        </div>

        <button @click="shoNewSlidePannel = !shoNewSlidePannel" class="mt-4 btn btn-outline-info">Nueva Slide</button>
        <!-- New slide -->
        <div class="form row" v-if="shoNewSlidePannel">
            <div class="col-12">
                <label class="col-6" >Url destino</label>
                <input type="text" class="col-6" v-model="newSlide.url">
            </div>
            <div class="col-12">
                <label for="" class="col-6"> Alt </label>
                <textarea rows="2" type="text" class="col-6" v-model="newSlide.alt" />
            </div>
            <div class="col-12">
                <label class="btn btn-block btn-outline-info btn-file">
                    Cargar imagen <input ref="file" @change="fileSelected =true"  type="file" style="display: none;" accept="image/*">
                </label>
                <span v-if="fileSelected"> Imagen subida </span>
            </div>
            <div class="col-12">
                <button class="btn btn-outline-info" v-if="valid" @click="send">
                    Guardar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            selected:0,
            shoNewSlidePannel:false,
            slides:[],
            fileSelected:false,
            newSlide:{
                url:'',
                alt:'',
                slider:'home'
            }
        }
    },
    created(){
        this.refresh();

        
    },
    computed:{
        valid(){
            return  (
                this.fileSelected &&
                this.newSlide.url &&
                this.newSlide.alt
            )
        }
    },
    watch:{
        selected()
        {
            if (this.selected < 0){
                this.selected = this.slides.length-1;
            }
            else if (! this.slides[this.selected])
            {
                this.selected = 0;
            }
        }
    },
    methods:{
        refresh(){
            this.selected=0;
            this.$axios.get('/api/slides')
            .then(res => {
                this.slides = res.data;
            
            })
        },
        send()
        {
            var vm=  this;
            if (this.valid){
                let data = new FormData();
             
                let file = this.$refs.file.files[0];
                data.append('image',file);
                data.append('url',this.newSlide.url);
                data.append('alt',this.newSlide.alt);
                data.append('slider',this.newSlide.slider);
                
                this.$axios.post('/admin/slider',data)
                .then(res => {
                   vm.refresh();
                   vm.selected = vm.slides.length-1;
                });
            }
        }
    }


}
</script>


<style lang="scss" scoped>

.img-container{
    padding:10px;
    border:1px solid #ccc;
    position:relative;
    overflow:hidden;
    img{
        width:100%;
    }
    .delete-button{
        position:absolute;
        bottom:10px;
        left:45%;
    }
    .controls{
        position:absolute;
        top:50%;
        left:0;
        width:100%;
        display: flex;
        justify-content: space-between;
    }

}
</style>
