<template>
    <div class="d-flex flex-column h-100 panel inner-bottom-fade">
        <div class="d-flex flex-column">
            <div id="header-row-1" class=""></div>
            <div id="header-row-2" class="d-flex justify-between align-items-center">
                 <img :src="imagePath('/storage/images/app/newlogo.png')" alt="fondo" >
            </div>
            <div id="header-row-3" class="d-flex justify-between align-content-center">
                <button class="mat px-3"><i class="fas fa-search"></i></button>
                <input type="text" placeholder="Buscar" class="mat" />
            </div>
        </div>
        <div class="conversations scrollbar-custom" v-if="conversations">
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
.panel {
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
    box-shadow: 0 1px 4px rgba(0,0,0,.25);
    clip-path: inset(0 0 -4px 0);
    input {
        font-size: 16px;
    }
}
.conversations {
}

</style>
