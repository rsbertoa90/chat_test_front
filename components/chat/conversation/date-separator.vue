<template>
    <span class="date roboto">{{date | date}}</span>
</template>

<script>
export default {
    props: ["date"]    
}
</script>

<style lang="scss" scoped>
.date {
    color: #8a8585;
    background: #dce9e9;
    border-radius: 8px;
    box-shadow: 1px 1px #ccc;
    font: Regular 10px/67px Roboto;
    text-align: center;
    padding: 4px 32px;
}

</style>