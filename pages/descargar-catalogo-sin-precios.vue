<template>
    <div>
        Redirecting...
    </div>
</template>

<script>
export default {
   fetch({redirect}){
       // let url = 'http://localhost:8000/descargar-catalogo-digital';
        let url = 'https://back.dominiodepruebas.ml/descargar-catalogo-sin-precios';
        redirect(301,url);
    },
}
</script>
