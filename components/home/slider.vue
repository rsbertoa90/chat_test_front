<template>
    <div v-if="slides && slides[selected]" class="slider-container">
         
           <nuxt-link :to="slides[selected].url" class="overflow-hidden">
                <transition leave-active-class="position-absolute animated slideOutRight">
                        <img :src="imagePath(slides[selected].image)" :alt="slides[selected].alt" :key="slides[selected].id">
                </transition>
           </nuxt-link>
    </div>
</template>

<script>
export default {
    data(){
        return{
            slides:[],
            selected: 0,
        }
    },
    watch:{
        selected()
        {
            if(this.slides){
                if (this.selected < 0){this.selected = this.slides.length-1;}
                else if (this.selected >= this.slides.length){this.selected=0;}
            }
        }
    },
    mounted()
    {
        this.$axios.get('/api/slides')
        .then(res => {
            this.slides =res.data;
        });

        setInterval(() => {
            this.selected++;
        }, 4500);
    }
}
</script>


<style lang="scss" scoped>
img{
    width:100%;
   
}

.slider-container{
    border:1px solid #868686;
    padding:5px;
    position:relative;
    height:450px;
    overflow: hidden;
}

.overflow-hidden{
    overflow: hidden;
}
</style>
