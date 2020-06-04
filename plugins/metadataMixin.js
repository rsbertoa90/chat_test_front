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

            ],
            __dangerouslyDisableSanitizers: ['script'],
            script: [
                {
                    innerHTML: JSON.stringify(this.orgsd),
                    type: 'application/ld+json'
                },
                {
                    innerHTML: JSON.stringify(this.websd),
                    type: 'application/ld+json'
                }
            ],
        }
    },
    
    computed: {
        websd() {
            return {
                "@context": "http://schema.org",
                "@type": "WebPage",
                "@id": "https://matesfabi.com",
                "url": "https://matesfabi.com",
                "name": "Mates Fabi"
            }
        },
        orgsd() {
            return {
                "@context": "http://schema.org/",
                "@type": "Organization",
                "name": "Mates Fabi",
                "url": "https://matesfabi.com",
                "address": "Pasteur 410 - CABA",
                "email": "MatesFabi@gmail.com",
                "logo": 'https://back.matesfabi.com/storage/images/app/logo.png',
                "telephone": "1130085414",
                "description": "Mates, Equipos Mates , Latas, Juegos de Azucarera/Yerbera y mucho mas en nuestros Locales Mayoristas ubicados en Once. También regalos empresariales personalizados."


            }
        },
      
        metadata() {
            let page = this.$route.name;
            
            let res = this.$store.getters.getMeta(page);
         
            return res;
                    
        },
        metatitle() {
            if (this.metadata) {
                
                
                return this.metadata.metatitle ? this.metadata.metatitle : 'Mates Fabi';
            }
        },
        metadescription() {
            if (this.metadata) {
                return this.metadata.metadescription ? this.metadata.metadescription : 'Mates Fabi';
            }

        },
        description() {
            if (this.metadata) {
                return this.metadata.description;
            }
        },
    }
}