export default {
    head() {
        return {
            titleTemplate: this.metatitle,
            meta: [
                { name: 'description', content: this.metadescription,hid:'description' }

            ]
        }
    },
    computed: {
        metadata() {
            let page = this.$route.name;
            
            return this.$store.getters.getMeta(page);
                    
            
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