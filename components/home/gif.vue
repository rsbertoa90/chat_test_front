<template >
    <v-lazy-image v-if="image"  :src="imagePath(image)" :alt="alt"> </v-lazy-image>
</template>

<script>
export default {
    props: ['images','alt','speed'],
    data(){
        return{
            image:null
        }
    },
    mounted(){
        let len = this.images.length;
        let pos = 0;
        var vm = this;
        if(len>0){
            setInterval(function(){
                vm.image = vm.images[pos];
                pos++;
                if (pos == len){pos = 0;}
            },vm.speed);
        }
    }

}

</script>
