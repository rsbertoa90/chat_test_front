export default {
    metaInfo() {
        return {
            title: this.metatitle,
            meta: [
                { name: 'description', content: this.metadescription }

            ]
        }
    },
    computed: {
        metadata() {
            let allmeta = this.$store.getters.getMeta;
            let page = this.$route.name;
            if (allmeta) {
                return allmeta.find(m => {
                    return m.page == page;
                });
            }
            
        },
        metatitle() {
            if (this.metadata) {
             
                return this.metadata.metatitle ? this.metadata.metatitle : 'Bazar Mayorista Maju';
            }
        },
        metadescription() {
            if (this.metadata) {
                return this.metadata.metadescription ? this.metadata.metadescription : 'Bazar Mayorista Maju';
            }

        },
        description() {
            if (this.metadata) {
                return this.metadata.description;
            }
        },
    }
}