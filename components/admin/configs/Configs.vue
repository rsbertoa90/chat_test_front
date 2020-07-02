<template>

    <div class="row mt-4">
        <div class="col-3 side-pannel fcc justify-content-start">
          
            <button class="btn btn-block mt-2" 
                    :class="{'btn-info':selected=='pdfs','btn-secondary':selected!='pdfs'}" 
                    @click="setSelected('pdfs')"> 
                    Refrescar PDF's 
            </button>
            <button class="btn btn-block mt-2" 
                    :class="{'btn-info':selected=='minbuys','btn-secondary':selected!='minbuys'}" 
                    @click="setSelected('minbuys')"> 
                    minimos de compra 
            </button>
            <button class="btn btn-block mt-2" 
                    :class="{'btn-info':selected=='homegif','btn-secondary':selected!='homegif'}" 
                    @click="setSelected('homegif')"> 
                    Gif de Home 
            </button>
            <button class="btn btn-block mt-2" 
                    :class="{'btn-info':selected=='infoBanner','btn-secondary':selected!='infoBanner'}" 
                    @click="setSelected('infoBanner')"> 
                    Info banner
            </button>
            <button class="btn btn-block mt-2" 
                    :class="{'btn-info':selected=='sorteo','btn-secondary':selected!='sorteo'}" 
                    @click="setSelected('sorteo')"> 
                    Sorteo 
            </button>
            <button class="btn btn-block mt-2" 
                    :class="{'btn-info':selected=='chat','btn-secondary':selected!='chat'}" 
                    @click="setSelected('chat')"> 
                    Chat 
            </button>
        </div>
        <div class="col-8 p-4 ">
            <component :is="selected"></component>
        </div>
    </div>
    
</template>

<script>
import infoBanner from './info-banner.vue';
import homegif from './homegif.vue';
import minbuys from './minbuys.vue';
import pdfs from './refreshpdfs.vue';
import sorteo from './sorteo.vue';
import chat from './chat/chat.vue';
export default {
     metaInfo(){return{
        title: 'ADMIN'   }},
    components:{infoBanner,homegif,minbuys,pdfs,sorteo,chat},
    data(){
        return {
            selected:'pdfs',
        }
    },
    computed:{
        configs(){
            return this.$store.getters.getConfig;
        }
    },
    methods:{
        setSelected(s){
            this.selected=s;
        },
       
    }

}
</script>
