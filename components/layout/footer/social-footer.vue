<template>
      <div class="d-flex socialfooter">
                <a rel="noopener" target="_blank"  href="https://www.facebook.com/mayoristaMatesFabi/" class="  white-bold d-flex 
                            justify-content-center align-items-center p-2 ">
                    <v-lazy-image :src="imagePath('/storage/images/app/social/fb.png')"></v-lazy-image>
                </a>
                <a  href="https://www.instagram.com/matesfabi/" rel="noopener" target="_blank" class="  white-bold d-flex 
                            justify-content-center align-items-center  p-2 ">
                    <v-lazy-image :src="imagePath('/storage/images/app/social/instagram.png')"></v-lazy-image>
                </a>
        </div>
</template>

<style lang="scss">
    .socialfooter{
        width:100vw;
        display: flex;
        padding:30px;
        padding-left:50%;
        justify-content: space-around;
        img{
            width:90px;
        }

    }
</style>
