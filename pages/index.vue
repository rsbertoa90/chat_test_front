<template>
<div class="w-100">
    <div class="row">
        <div class="col-3" v-if="$mq == 'lg'">
            <div class="d-flex flex-column">

                <sidePannel></sidePannel>
                
                <div class="redlimpbannercontainer">
                    <redlimpbanner></redlimpbanner>
                </div>                
            </div>
        </div>
        <div class="col-12 col-lg-9 p-0">
            <!-- banner solo envios -->
        <div class="mt-3 mb-2">
            <img :src="imagePath('/storage/images/app/usaw.jpg')" alt="Unica sucursal abierta pasteur 410" v-if="$mq=='lg'">
           <!--  <img :src="imagePath('/storage/images/app/usam.jpg')" alt="Unica sucursal abierta pasteur 410" v-else> -->
        </div>
        <div class="p-3">
            <homeA></homeA>
        </div>
        </div>
    </div>
    <div class="w-100 row">
        <div class="col-12 d-flex justify-content-center">
            <homeB></homeB>
        </div>
    </div>
    <div class="redlimpmobile" v-if="$mq!='lg'">
        <redlimpbanner></redlimpbanner>
    </div>
</div>
</template>

<script>
import redlimpbanner from '@/components/banners/redlimp.vue'
import sidePannel from '@/components/layout/Side-menu.vue';
import homeA from '@/components/home/HomeA.vue';
import homeB from '@/components/home/HomeB.vue';
import metaMixin from '@/plugins/metadataMixin.js';
export default {
    mixins:[metaMixin],
    layout:'home',
    name:'home',
    components:{sidePannel,homeA,homeB,redlimpbanner}
}
</script>

<style lang="scss" scoped>
.redlimpmobile {
   
    margin:auto;
    margin-top:30px;
    width:250px;
    cursor: pointer;
}
  .redlimpbannercontainer{
        padding-right: 20px;
        width: 70%;
        margin-top: 20px;
        cursor: pointer;
    }
</style>
