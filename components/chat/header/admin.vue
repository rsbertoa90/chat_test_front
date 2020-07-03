<template>
    <div v-if="conversation" class="d-flex align-items-center header">
        <i class="material-icons">textsms</i>
        <div class="ml-2">
            <div id="header-name">{{conversation.client.name}}</div>
            <div v-if="hesWriting" class="header-status">escribiendo...</div>
            <div v-if="hesOnline" class="header-status">en linea</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["conversation"],
    data() {
        return {
            hesWriting: false,
            hesOnline: false
        }
    }
};
</script>

<style lang="scss" scoped>
.header {
    background: rgba(178, 125, 161, 0.333);
    height: 64px;
    i {
        margin-left: 126px;
        font-size: 24px;
        color: #565656;
    }
}
#header-name {
    //margin-top: 12px;
    font-size: 18px;
    font-family: "Roboto";
    line-height: 20px;
    color: #565656;
}
.header-status {
    font-size: 10px;
    font-family: "Roboto";
    color: rgba(0, 0, 0, 0.25);
}
</style>