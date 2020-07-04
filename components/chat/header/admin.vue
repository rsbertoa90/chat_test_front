<template>
    <div v-if="conversation" class="d-flex align-items-center header">
        <i class="material-icons">textsms</i>
        <div class="ml-2">
            <div id="header-name" class="roboto">
                <span >{{conversation.client.id}}</span>
                {{conversation.client.name}}</div>
            <div v-if="hesWriting" class="header-status roboto">escribiendo...</div>
            <div v-if="hesOnline && !hesWriting" class="header-status roboto">en linea</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["conversation"],
    computed:{
        hesWriting()
        {
            return this.$store.getters.getHesWriting;
        },
        hesOnline()
        {
            return this.$store.getters.getHesOnline;
        }
    }
};
</script>

<style lang="scss" scoped>
.header {
    background: #E5D3DF;
    height: 64px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
    clip-path: inset(0 0 -5px 0);
    z-index: 1;
    i {
        margin-left: 126px;
        font-size: 24px;
        color: #565656;
    }
}
#header-name {
    //margin-top: 12px;
    font-size: 16px;
    font-weight: bold;
    line-height: 20px;
    color: #565656;
    span {
        background: #e8a1fe;
        height: 18px;
        margin: auto 4px auto 0;
        padding: 0px 6px;
        color: white;
        font-size: 16px;
        font-weight: bold;
        border-radius: 9px;
    }
}
.header-status {

    font-size: 10px;
    font-family: "Roboto";
    color: #77cd2e;
}
</style>