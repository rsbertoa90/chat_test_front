<template>
    <div class="overlay fcc">
        <div class="fcc elements">
            <h4 class="text-center font-weight-bold">
                UPS, TE DESCONECTASTE
            </h4>
            <div class="fcc">
                <button @click="$emit('breakIdle')" class="btn btn-lg btn-primary mt-4">VOLVER A CONECTAR</button>        
            </div>   
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .overlay{
        z-index: 99;
        position:fixed;
        top:0;
        left:0;
        background-color: #cccc;
        width:100vw;
        height: 100vh;
    }
    .elements{
        z-index:120;
    }
</style>
