<template>
    <modal @close="$emit('close')">
        <div class="fcc">
            <h2>Exelente! Ya estas participando del Sorteo por una Orden de Compra de $15 000 en Mayorista Mates Fabi</h2>
            <h2>Mucha, mucha Suerte!!!</h2>
            <div>
                <ul>
                    <li> <span class="fa fa-check fucsia"></span>Avisales a tus amigos para que también participen</li>
                    <li><span class="fa fa-check fucsia"></span>El sorteo es el Lunes 30 de Diciembre a las 14 hs. Se trasmite en vivo por Facebook e Instagram, seguinos para enterarte si Ganas.</li>
                </ul>
            </div>
            <div class="social">
                <a rel="noopener" target="_blank"  href="https://www.facebook.com/mayoristaMatesFabi/" class="  white-bold d-flex 
                            justify-content-center align-items-center p-2 ">
                    <v-lazy-image :src="imagePath('/storage/images/app/social/fb.png')" class="socialimg"></v-lazy-image>
                </a>
                <a  href="https://www.instagram.com/matesfabi/" rel="noopener" target="_blank" class="  white-bold d-flex 
                            justify-content-center align-items-center  p-2 ">
                    <v-lazy-image :src="imagePath('/storage/images/app/social/instagram.png')" class="socialimg"></v-lazy-image>
                </a>
            </div>
        </div>
    </modal>
</template>


<script>
import modal from '@/components/Modal.vue';
export default {
    components:{modal}
}
</script>



<style lang="postcss" scoped>
.socialimg{
    width:70px;
}
.social{
    padding: 5px 20px;
    justify-content: space-around;
    display: flex;
    img{
        width:200px;
    }
}
h2{
    font-size: 25px;
}
li{
    font-size: 15px;
}
.fcc{
      color:#707070;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>
