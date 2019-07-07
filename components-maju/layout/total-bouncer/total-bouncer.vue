<template>
    <div>
        <mobile-bouncer v-if="$mq!='lg'"></mobile-bouncer>
        <wide-bouncer v-else></wide-bouncer>
    </div>
</template>

<script>
import mobileBouncer from './mobile-bouncer.vue';
import wideBouncer from './wide-bouncer.vue';

export default {
    components:{mobileBouncer,wideBouncer}
}
</script>
