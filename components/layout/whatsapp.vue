<template>
    <div class="whatsapp">
        <a rel="noreferrer" target="_blank" href="https://api.whatsapp.com/send?phone=5491127082683&text=Hola!%20te%20escribo%20desde%20la%20pagina%20web,%20tengo%20una%20pregunta" > <fa-icon class="fa-whatsapp" :icon="['fab','whatsapp']"></fa-icon>  <span> ¿Te podemos ayudar? </span> </a>
    </div>
</template>

<style scoped lang="scss">
     .whatsapp{
        position:fixed;
        width:260px;
        bottom:5px;
        left:15px;
        z-index:110;
        background: #fff;
        border: 1px solid #D52B1E;
        padding: 4px;
        a{color:#D52B1E};
    }
    .fa-whatsapp{
        max-width:25px;
      font-size: 1.3rem;
      color:#65BC54;
    }

    @media(min-width: 600px){
        .whatsapp{
            font-size:1.3rem;

        }
        .fa-whatsapp{
            font-size: 1.5rem;
        }
    }
</style>