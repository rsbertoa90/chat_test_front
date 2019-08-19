<template>
    <div>
        Redirecting...
    </div>
</template>

<script>
export default {
   fetch({redirect}){
        //let url = 'http://localhost:8000/descargar-catalogo-digitall';
        let url = 'https://back.matesfabi.com/descargar-catalogo-digital';
        redirect(301,url);
    },
}
</script>
