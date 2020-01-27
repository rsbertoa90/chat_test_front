<template>
<div>

    <div class="w-100" @click="openmodal">
        <v-lazy-image v-if="$mq=='lg'" :src="imagePath('/storage/images/app/reopening-banner')"></v-lazy-image>
        <v-lazy-image v-else :src="imagePath('/storage/images/app/reopening-banner-m')"></v-lazy-image>
    </div>
        <div v-if="showmodal">
            <div class="overlay">
                <div  class="modalcontainer">
                    <transition enter-active-class="animated bounceIn">
                        <div v-if="bouncenow" class="modalimg" v-click-outside="closemodal">
                        
                            <button @click="closemodal" class="closebtn btn btn-danger"><span class="fa fa-times"></span></button>
                            <img v-if="$mq=='lg'" :src="imagePath('/storage/images/app/reopening-modal')">
                            <img v-else :src="imagePath('/storage/images/app/reopening-modal-m')">
                        </div>
                    </transition>

                </div>
            </div>
        </div>
</div>
</template>


<script>
export default {
    data() {
        return {
            showmodal:true,
            bouncenow:true,
        }
    },
    methods:{
        openmodal(){
            console.log('openmodal');
            this.showmodal=true;
            setTimeout(() => {
                this.bouncenow=true;
            }, 50);
        },
        closemodal(){
            this.showmodal=false;
            this.bouncenow=false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .overlay{
        width:100vw;
        height: 100vh;
        position:fixed;
        top:0;
        left:0;
        z-index:80;
    }

    .modalcontainer{

        position:absolute;
        top:30%;
        width:100vw;
        display: flex;
        justify-content: center;
        
    }

    .modalimg{
        background-color: #fff;
        padding:15px;
        border:1px solid #ccc;
        border-radius: 15px;
        width:600px;
        z-index: 99;
        position:relative;
        .closebtn{
            position: absolute;
            top:0;
            right:0;
        }
    }

    @media(max-width:600px){
        .modalimg{
            width:300px;
        }
    }
</style>
