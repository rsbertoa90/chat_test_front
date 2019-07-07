<template>
    <div class="d-flex flex-column justify-content-center align-items-center mt-4">
        <h2 class="text-red text-center"> OPINIONES DE NUESTROS CLIENTES </h2>
        <div class="row w-100">
            <div class="col-12 col-lg-6 d-flex flex-column">
                <a href="https://www.facebook.com/pg/BazarmayoristaMaju/reviews/?ref=page_internal" target="_blank" rel="noreferrer" class="p-2 d-flex justify-content-center mt-2 img-container">
                    <v-lazy-image :src="imagePath('/storage/images/app/opinion1.jpg')" alt="Opinion de facebook"></v-lazy-image>
                </a>
                 <a href="https://www.facebook.com/pg/BazarmayoristaMaju/reviews/?ref=page_internal" target="_blank" rel="noreferrer" class="p-2 d-flex justify-content-center mt-2 img-container">
                    <v-lazy-image :src="imagePath('/storage/images/app/opinion4.jpg')" alt="Opinion de facebook"></v-lazy-image>
                </a>
                
            </div>
            <div class="col-12 col-lg-6 d-flex flex-column">
                <a href="https://www.facebook.com/pg/BazarmayoristaMaju/reviews/?ref=page_internal" target="_blank" rel="noreferrer" class="p-2 d-flex justify-content-center mt-2 img-container">
                    <v-lazy-image :src="imagePath('/storage/images/app/opinion2.jpg')" alt="Opinion de facebook"></v-lazy-image>
                </a>
                <a href="https://www.facebook.com/pg/BazarmayoristaMaju/reviews/?ref=page_internal" target="_blank" rel="noreferrer" class="p-2 d-flex justify-content-center mt-2 img-container">
                    <v-lazy-image :src="imagePath('/storage/images/app/opinion3.jpg')" alt="Opinion de facebook"></v-lazy-image>
                </a>
               
            </div>
                
        </div>
    </div>    
</template>


<style lang="scss" scoped>
.img-container{
    img{
        max-width:400px
    }
}

@media(max-width:400px){
    .img-container{
        img{
            max-width:350px;
        }
    }
}
</style>
