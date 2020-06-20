<template>
    <div>
        Redirecting...
    </div>
</template>

<script>
export default {
   fetch({redirect}){
        //let url = 'http://localhost:8000/sitemap.xml';
        let url = 'https://back.dominiodepruebas.ml/descargar-lista-de-precios';
        redirect(301,url);
    },
}
</script>
