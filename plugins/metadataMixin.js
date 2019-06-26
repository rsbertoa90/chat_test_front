export default {
    head() {
        let canonical =this.backendpath+this.$route.path;
       // console.log(canonical);
        return {
            link:[
                {rel:'canonical',href:canonical}
            ],
            titleTemplate: this.metatitle,
            meta: [
                { name: 'description', content: this.metadescription,hid:'description' }

            ],
            link:[
                {rel:'canonical',href:this.canonical}
            ]
        }
    },
    computed: {
        canonical(){
            return `https://mayoristamaju.com${this.$nuxt.$route.path}`
        },
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