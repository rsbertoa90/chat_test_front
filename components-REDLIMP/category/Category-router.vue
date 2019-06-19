<template>
    <div>
      <transition enter-active-class="animated slideInLeft ">
            <router-view :key="$route.path"></router-view>
        </transition>
    </div>    
</template>



