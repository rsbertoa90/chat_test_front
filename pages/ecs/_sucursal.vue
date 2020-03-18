<template>
<no-ssr>
    <div class="m-auto fcc" v-if="suc">
        
            <survey :sucursal="suc"></survey>
        
    </div>
</no-ssr>
</template>



<script>
import survey from '@/components/encuesta-sucursal/Survey.vue';
export default {
    layout:'cart',
    components:{survey},
    name:'encuesta',
    data() {
        return {
            suc:null
        }
    },
    head() {
         let canonical ='https://matesfabi.com'+this.$route.path;
    
        return {
             link:[
                {rel:'canonical',href:canonical}
            ],
            titleTemplate: this.metatitle,
            meta: [
                { name: 'description', content: this.metadescription, hid:'description' },
                  { property:'og:url', content:canonical}
            ]
        }
    },
    mounted(){
            let param = this.$route.params.sucursal;
            if(param == 'pasteur' || param == 'castelli')
            {
                this.suc = param;
            }
            else
            {
                window.location.replace('/');
            }
    },
    computed:{
        
          metatitle(){
           return "Mates Fabi"
        },
        metadescription(){
           return "Encuesta de satisfaccion - Mates Fabi"
            
        },
    }
}
</script>
