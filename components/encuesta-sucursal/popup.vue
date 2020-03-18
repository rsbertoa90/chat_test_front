<template>
    <div class="overlay">
        <div class="space"></div>
        <div class="window row">
            <div class="col-12">
                <div class="w-100 d-flex justify-content-end">
                    <button class="btn close-btn" @click="$emit('close')">
                        <span class="fa fa-times"></span>
                    </button>
                </div>
            </div>
         
            <div class="col-12 mt-4">
                <h2>Muchas gracias por su tiempo</h2>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.close-btn {
    margin-right:-30px;
    font-size: 25px;
    font-weight: bold;
    background-color:aqua;
    width:50px;
    height: 50px;
    border-radius: 15px;
    color:#fff;
    
    box-shadow: 3px 3px 3px #0006;
}
    .overlay{
        width:100vw;
        height: 100vh;
        z-index: 900;
        background-color: #ccc3;
        position:fixed;
        top:0;
        left:0;
        
    }
    .space{
        width:100vw;
        height: 90px;
    }
    .window{
        padding:10px 30px 50px 30px;
        background-color:#fff;
        margin-top:50px;
        margin:auto;
        min-width:300px;
        max-width: 500px;
       
        border-radius:15px;
        box-shadow: 3px 3px 3px #000c;
        display:flex;
        justify-content: center;
        align-items:center;
        text-align:center;
      
    }
</style>

