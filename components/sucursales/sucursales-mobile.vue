<template>
    <div>
        <div id="accordion">
            
            <!-- pasteur -->
            <div class="card">
                <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                    <button class="btn btn-link">
                    Mates Fabi Pasteur
                    </button>
                </h5>
                </div>

                <div id="sucursal1" aria-labelledby="headingOne">
                    <div class="card-body row">
                       <div class="col-12">
                          <iframe title="Mates Fabi Pasteur" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.998628875948!2d-58.40179358477038!3d-34.60419618045944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf355d9f72cc6a37!2sMates+Fabi!5e0!3m2!1ses!2sar!4v1538754534548" 
                                width="100%" height="250" frameborder="0" style="border:0" allowfullscreen></iframe>
                       </div>
                       <div class="col-12">
                            <ul>
                                <li> <b> Dirección: </b> Pasteur 410/412 </li>
                                <li> <b>Atención: </b> Lunes a viernes de 9 a 18 hs </li>
                                <li>  <b> Teléfono:</b> 4951-5417   </li>
                            </ul>
                            <p> Mates Fabi sucursal Pasteur   se encuentra a metros de Avenida 
                                Corrientes y de la estación Pasteur del subte B.</p>
                       </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    </div>
</template>



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
