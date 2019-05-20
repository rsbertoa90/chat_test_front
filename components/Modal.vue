<template>
    <div class="overlay">
        <transition appear enter-active-class="animated slideInUp">
            <div class="modal-window">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    
}
</script>


<style scoped lang="scss">
    .overlay{
        position:fixed;
        top:0;
        left:0;
        display: flex;
        justify-content: center;
       /*  align-items: center; */
        width:100vw;
        height:100vh;
        background-color:#86868686; 
    }

    .modal-window{
        margin-top:90px;
        position:absolute;
       /*  margin-top:100px; */
        width: 350px;
        
        max-height: 520px;
      /*   min-height:600px; */
        overflow-y:scroll;
        border:1  px solid #000;
        background-color: #fff;
        box-shadow: 2px 2px 2px #000;
    }
</style>



