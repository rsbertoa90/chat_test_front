<template>
    <div>
        Redirecting to sitemap...
    </div>
</template>

<script>
export default {
    fetch({redirect}){
        //let url = 'http://localhost:8000/sitemap.xml';
        let url = 'https://back.mayoristamaju.com/sitemap.xml';
        redirect(301,url);
    },
    
}
</script>
