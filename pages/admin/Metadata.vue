<template>
    <adminmetadata></adminmetadata>
</template>

<script>
import adminmetadata from '@/components/admin/metadata/Super.vue';
export default {
    name:'metadata',
    components:{adminmetadata},
    middleware:'checkAdmin',
    layout:'admin'
}
</script>
