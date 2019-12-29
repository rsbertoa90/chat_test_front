<template>
    <div class="text-center fcc mt-4 mt-lg-0">
        <h1>
            La inscripción al sorteo finalizó!
        </h1>

        <h2>Seguinos en las redes para enterarte quien es el ganador</h2>

       <div class="row">
            <div class="col-12 col-lg-3 offset-lg-4 d-flex justify-content-around padd">
                    <a rel="noopener" target="_blank"  href="https://www.facebook.com/mayoristaMatesFabi/" class="   white-bold d-flex 
                                justify-content-center align-items-center p-2  social-sq">
                        <v-lazy-image :src="imagePath('/storage/images/app/social/fb.png')"></v-lazy-image>
                    </a>
                    <a  href="https://www.instagram.com/matesfabi/" rel="noopener" target="_blank" class="   white-bold d-flex 
                                justify-content-center align-items-center  p-2  social-sq">
                        <v-lazy-image :src="imagePath('/storage/images/app/social/instagram.png')"></v-lazy-image>
                    </a>
                
            </div>
       </div>
    </div>
</template>

<style lang="scss" scoped>
.social-sq{
    width:90px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
}


</style>
