<template>
    <div>
        <div>
            <!-- pasteur -->
            <div class="card">
                <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                    <button class="btn btn-link" 
                             data-target="#sucursal1" aria-expanded="true" >
                    Red Limp
                    </button>
                </h5>
                </div>

                <div id="sucursal1"  aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body row">
                       <div class="col-12">
                           <mapiframe></mapiframe>
                        </div>
                       <div class="col-12">
                            <ul>
                                <li> <b> Dirección: </b> Av Libertador 1047, Moreno, Zona Oeste</li>
                                <li> <b>Atención: </b> de 9hs a 18hs </li>
                                <li>  <b> Teléfono:</b> 11 3895 1332  </li>
                            </ul>
                            
                       </div>
                    </div>
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






<style scoped lang="scss">
// violeta oscuro es b2037a
$color-first : #b2037a;

// El verde es 09cca2 
$color-second : #09cca2;

// Rosa fuerte es ff0aaf
$color-focus: #ff0aaf; 

// Rosa claro es ff97dd
$color-back: #ff97dd;


    .btn-link{
        display: block;
        width: 100%;
        height: 100%;
        background-color: $color-focus;
        color: #fff;
        font-weight: bold;
        &:hover{
            cursor: pointer;
            text-decoration: none;
            
        }
    }
</style>
