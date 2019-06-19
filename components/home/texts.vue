<template>
<div class="mt-4 d-flex flex-column align-items-center justify-content-center">
    <h2 class="text-red text-center">EN BAZAR MAYORISTA MAJU TE OFRECEMOS:</h2>
    <div class="row texts">
        <div class="col-12 col-lg-6 d-flex flex-column">
            <div class="d-flex">
                <fa-icon :icon="['far','hand-point-right']" class="icon"></fa-icon>
                <p>Una Gran variedad de  Productos de Bazar y Limpieza a precios únicos</p>
            </div>
            <div class="d-flex">
                <fa-icon :icon="['far','hand-point-right']" class="icon"></fa-icon>
                <p>Atención Personalizada por WhatsApp de lunes
                    a viernes de 9 a 18 hs. Nuestro numero es
                    11 2708 2683, agendanos para poder estar al
                    tanto de las Novedades. Diariamente las
                    vamos publicando en nuestro Estado.</p>
            </div>

        </div>
        <div class="col-12 col-lg-6 d-flex flex-column">
            <div class="d-flex">
                 <fa-icon :icon="['far','hand-point-right']" class="icon"></fa-icon>
                <p>En caso de envío llevamos Sin Cargo la
                    mercaderia  desde el local  hasta la empresa
                    de transporte que haya elegido el comprador
                    (el costo desde el trasporte a la localidad final
                    corre a cargo del comprador)</p>
            </div>
            <div class="d-flex">
                <fa-icon :icon="['far','hand-point-right']" class="icon"></fa-icon>
                <p>La posibilidad de cotizar y hacer tu pedido
                    online las 24 hs los siete  días de la semana</p>
            </div>

        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
    .texts{
        color:#868686;
        font-size:1.5rem;
    }

    .icon{
        margin-top:5px;
        font-size:2rem;
        margin-right:9px;
    }
</style>
