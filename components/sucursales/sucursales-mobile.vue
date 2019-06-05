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
                          <iframe title="RedLimp" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.039154888214!2d-58.428750549514646!3d-34.7546064803246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd2798660d48b%3A0x312beb627fcca346!2sCayetano+Donizetti+186%2C+B1832CPF+Lomas+de+Zamora%2C+Buenos+Aires!5e0!3m2!1ses-419!2sar!4v1545075239619"
                                width="100%" height="250" frameborder="0" style="border:0" allowfullscreen></iframe>
                       </div>
                       <div class="col-12">
                            <ul>
                                <li> <b> Dirección: </b> Av Libertador 1047, Moreno</li>
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
