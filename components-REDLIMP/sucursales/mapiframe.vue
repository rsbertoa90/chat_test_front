<template>
    <div>
        <div v-if="$mq=='lg'">
            <iframe title="RedLimpr" :src="mapurl" 
                                width="100%" height="250" frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>
        <div v-else>
            <iframe title="RedLimp" :src="mapurl"
                                width="100%" height="250" frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            mapurl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.651859015759!2d-58.788863249542466!3d-34.63823708035465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc944b87e99455%3A0x215abde95f22a539!2sAv.+del+Libertador+1047%2C+B1744AAK+Moreno%2C+Buenos+Aires!5e0!3m2!1ses-419!2sar!4v1560092661893!5m2!1ses-419!2sar"
        }
    }
}
</script>
