<template>
    <div class="container">
        <div class="row">
            <div class="col-12 row mt-3 mb-4">
                <h2 class="col-12 mb-3">RedLimp</h2>
                <div class="col-6">
                  <mapiframe></mapiframe>
                </div>
                <div class="col-6">
                    <ul>
                       <li> <b> Dirección: </b>Av Libertador 1047, Moreno, Zona Oeste </li>
                                <li> <b>Atención: </b> de 9hs a 18hs </li>
                                <li>  <b> Teléfono:</b> 11 3895 1332   </li>
                    </ul>
                      
                      
                </div>
            </div>
           
        </div>
    </div>
</template>

<script>
import mapiframe from './mapiframe.vue'
export default {
    components:{mapiframe}
}
</script>


