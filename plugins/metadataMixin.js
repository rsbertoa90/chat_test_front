export default {
    head() {
        let canonical ='https://matesfabi.com'+this.$route.path;
       // console.log(canonical);
        return {
            link:[
                {rel:'canonical',href:canonical}
            ],
            titleTemplate: this.metatitle,
            meta: [
                { name: 'description', content: this.metadescription,hid:'description' },
                { property:'og:url', content:canonical}

            ]
        }
    },
    computed: {
       
      
        metadata() {
            let page = this.$route.name;
            
            let res = this.$store.getters.getMeta(page);
         
            return res;
                    
        },
        metatitle() {
            if (this.metadata) {
                
                
                return this.metadata.metatitle ? this.metadata.metatitle : 'Mates de fabrica';
            }
        },
        metadescription() {
            if (this.metadata) {
                return this.metadata.metadescription ? this.metadata.metadescription : 'Mates de fabrica';
            }

        },
        description() {
            if (this.metadata) {
                return this.metadata.description;
            }
        },
    }
}