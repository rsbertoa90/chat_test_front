<template>
<div class="w-100">
    <div class="row">
        <div class="col-3">
            <sidePannel></sidePannel>
        </div>
        <div class="col-9">
            <homeA></homeA>
        </div>
    </div>
    <div class="w-100 row">
        <div class="col-12 d-flex justify-content-center">
            <homeB></homeB>
        </div>
    </div>
</div>
</template>

<script>
import sidePannel from '@/components/layout/Side-menu.vue';
import homeA from '@/components/home/HomeA.vue';
import homeB from '@/components/home/HomeB.vue';
export default {
    layout:'home',
    name:'home',
    components:{sidePannel,homeA,homeB}
}
</script>
