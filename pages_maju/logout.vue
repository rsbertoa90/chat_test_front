<template>
    <div>Login out...</div>
</template>

<script>
export default {
    name:'logout',
    mounted(){
        this.$axios.get('/logout')
            .then(res => {
                if(process.browser){
                    window.location.replace('/');
                }
            });
    }
}
</script>
