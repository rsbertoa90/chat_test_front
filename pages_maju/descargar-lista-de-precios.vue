<template>
    <div>
        Redirecting...
    </div>
</template>

<script>
export default {
   fetch({redirect}){
        //let url = 'http://localhost:8000/sitemap.xml';
        let url = 'https://back.matesfabi.com/descargar-lista-de-precios';
        redirect(301,url);
    },
}
</script>
