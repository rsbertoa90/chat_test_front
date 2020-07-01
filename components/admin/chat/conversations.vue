<template>
    <div class="d-flex flex-column h-100">
        <div class="d-flex flex-column">
            <div id="header-row-1" class=""></div>
            <div id="header-row-2" class="d-flex justify-between align-content-center">
                 <img :src="imagePath('/storage/images/app/newlogo.png')" alt="fondo" >
            </div>
            <div id="header-row-3" class="d-flex justify-between align-content-center">
                <button class="mat px-3"><i class="fas fa-search"></i></button>
                <input type="text" placeholder="Buscar" class="mat" />
            </div>
        </div>
        <div class="conversations scrollbar-custom h-100" v-if="conversations">
            <conversation
                v-for="conversation in conversations"
                :key="conversation.id"
                :conversation="conversation"
            />
        </div>
    </div>
</template>

<script>
import conversation from "./conversation";
export default {
    components: { conversation },
    computed: {
        conversations() {
            return this.$store.getters.getConversations;
        }
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
.conversations {
    // max-height: 85vh;
    // overflow-y:scroll;
    box-shadow: 1px 0 1px #ccc;
    z-index: 1;
}
#header-row-1 {
    height: 19px;
    background: #ff0aaf;
}
#header-row-2 {
    height: 45px;
    background: #b54479;
    img {
        margin-left: 16px;
        max-width: 45px;
        max-height: 45px;
    }
}
#header-row-3 {
    height: 52px;
    input {
        font-size: 16px;
    }
}
</style>
