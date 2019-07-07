<template>
    <div class="overlay">
        <transition appear enter-active-class="animated slideInDown">
            <div class="modal-window bordered">
                <div class="close-button bordered clickable mb-4" @click="$emit('close')">
                    <span class="fa fa-times"></span>
                </div>
                <div class="content mt-3">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    
}
</script>


<style scoped lang="scss">
.content{
    width:103%;
    overflow: hidden;
    padding:8%;
    padding-right: 10%;
    overflow-y:scroll;
}
.close-button{
    position:absolute;
    top:10px;
    right:10px;
    width:56px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#fff;
    font-weight: bold;
    background-color: #F2B742;
    span{
        font-size: 30px;
    }
}
    .overlay{
         width: 100vw;
        height: 100vh;
        background-color: #aaaaaa55;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 50;
        display: flex;
        justify-content: center;
    }

    .modal-window{
        
        margin-top:90px;
        position:absolute;
        z-index:10;
       /*  margin-top:100px; */
        width: 447px;
        
        min-height: 400px;
      /*   min-height:600px; */
       
        border:1  px solid #000;
        background-color: #fff;
        box-shadow: 2px 2px 2px #000;
        display:flex;
        flex-direction: column;
        justify-content: center;
    }

    @media(max-width:660px){
        .modal-window{
            width:327px;
        }
    }
</style>



