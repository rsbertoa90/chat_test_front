<template >
<div v-if="gifimages">
    <v-lazy-image v-if="image"  :src="imagePath(image)" :alt="alt"> </v-lazy-image>
</div>
</template>

<script>
export default {
    props: ['images','alt','speed'],
    data(){
        return{
            image:null,
            gifimages:null,
        }
    },
    mounted(){

        this.$axios.get('/appimage/homegif')
            .then(r => {
                this.gifimages = r.data ;
                let len = this.gifimages.length;
                let pos = 0;
                var vm = this;
                if(len>0){
                    setInterval(function(){
                        vm.image = vm.gifimages[pos];
                        pos++;
                        if (pos == len){pos = 0;}
                    },vm.speed);
                }
            });

        
    }

}

</script>
