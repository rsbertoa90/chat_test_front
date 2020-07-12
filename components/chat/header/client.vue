<template>
    <div class="d-flex align-items-center header">
        <i class="material-icons ml-5">textsms</i>
        <span class="flex-grow-1 ml-2 roboto">Chateá con Mates Fabi</span>
      <!--   <button class="d-flex mr-3 p-2 mat"><i class="material-icons">search</i></button> -->
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.header {
    background: #E45BA5;
    height: 64px;
    i {
        //margin-left: 78px;
        font-size: 24px;
        color: #FFF;
    }
    span {
        font-size: 16px;
        color: #FFF;
    }
    button {
        background: #FFF;
        border-radius: 50%;
        i {
            color: rgba(0, 0, 0, 0.75);
        }
    }
}
</style>