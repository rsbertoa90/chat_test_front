<template>
    <div class="d-flex justify-content-center align-items-center">
        <div class="loading-linear" ref="bar"></div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.setup();
    },
    updated() {
        this.setup();
    },
    methods: {
        setup() {
            
            this.$refs.bar.style.cssText = 
                `--width: ${this.$refs.bar.getBoundingClientRect().width}px;`;
        }
    }
};
</script>

<style lang="scss" scoped>
.loading-linear {
    background: rgba(33, 150, 243, 0.4);
    height: 4px;
    overflow: hidden;
    position: relative;
    width: 100%;

    &::before,
    &::after {
        background: #2196f3;
        content: "";
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        will-change: max-width;
    }

    &::before {
        animation: loading-linear__alpha 2s linear infinite;
    }

    &::after {
        animation: loading-linear__beta 2s linear infinite;
    }
}

@mixin keyframes($animationName) {
    @-webkit-keyframes #{$animationName} {
        @content;
    }
    @-moz-keyframes #{$animationName} {
        @content;
    }
    @-o-keyframes #{$animationName} {
        @content;
    }
    @keyframes #{$animationName} {
        @content;
    }
}

@include keyframes(loading-linear__alpha) {
    0%,
    100% {
        max-width: 0;
        transform: translateX(0);
    }
    5% {
        max-width: 5%;
        transform: translateX(0);
    }
    57% {
        max-width: 35%;
    }
    85% {
        max-width: 0;
        transform: translateX(var(--width));
    }
}

@include keyframes(loading-linear__beta) {
    0%,
    60% {
        max-width: 0;
        transform: translateX(0);
    }
    75% {
        max-width: 35%;
        transform: translateX(0);
    }
    100% {
        max-width: 5%;
        transform: translateX(var(--width));
    }
}
</style>