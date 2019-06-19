<template>
    <adminMeta></adminMeta>
</template>

<script>
import adminMeta from '@/components/admin/metadata/Super.vue';
export default {
    name:'metadataAdmin',
    layout:'admin',
    middleware:'checkAdmin',
    components:{adminMeta}
}
</script>
