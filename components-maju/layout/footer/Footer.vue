<template>
    <div class="d-flex justify-content-around footer">
        <div class="logo-container"> 
            <v-lazy-image :src="imagePath('/storage/images/app/logo.png')" alt="Logo Maju"></v-lazy-image>
        </div>
        <div class="cat-container">
            <h3>Categorias:</h3>
            <ul>
                <li v-for="c in cats1" :key="c.name">
                    <nuxt-link :to="c.slug" >
                        {{c.name}}
                    </nuxt-link>
                </li>
            </ul>
        </div>
        <div class="cat-container mt-3">
            <ul>
                <li v-for="c in cats2" :key="c.name">
                    <nuxt-link :to="c.slug" >
                        {{c.name}}
                    </nuxt-link>
                </li>
            </ul>
        </div>
        <div class="cat-container mt-3">
            <ul>
                <li v-for="c in cats3" :key="c.name">
                   <nuxt-link :to="c.slug" >
                        {{c.name}}
                    </nuxt-link>
                </li>
            </ul>
        </div>
        <div class="contacts">
            <h3>Contactanos</h3>
            <span class="phone"> 
                <fa-icon :icon="['fab','whatsapp']" class="mb-1"></fa-icon> 
                11 27082683
            </span>
            <div>
                <fa-icon icon="clock" class="mb-1"></fa-icon>
                Lunes a viernes 9hs a 18hs
            </div>
            <div>
                <fa-icon icon="home" class="mb-1"></fa-icon>
                Pasteur 394 - ONCE
            </div>
            <div>
                <fa-icon icon="envelope" class="mb-1"></fa-icon>
                multibazarmaju@gmail.com
            </div>
            <div class="mt-4 social">
                <a href="https://www.facebook.com/BazarmayoristaMaju/" rel="noreferrer">
                    <v-lazy-image class="socialimage" :src="imagePath('/storage/images/app/social/fb.png')" alt="facebook"></v-lazy-image>             
                </a>
                <a href="https://www.instagram.com/bazar_mayorista_maju/" rel="noreferrer">
                    <v-lazy-image class="socialimage" :src="imagePath('/storage/images/app/social/instagram.png')" alt="instagram"></v-lazy-image>             
                </a>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    computed:{
        categories(){
            return this.$store.getters.getNotPaused;
        },
        cats1(){
            if (this.categories){
                let i = Math.round(this.categories.length / 3);
                return this.categories.slice(0,i);
            }
        },
        cats2(){
            let i = Math.round(this.categories.length / 3);
                return this.categories.slice(i,i*2);
        },
        cats3(){
            let i = Math.round(this.categories.length / 3);
            return this.categories.slice(i*2,i*3);

        },
    }
}
</script>

<style lang="scss" scoped>
.logo-container{
    width:450px;
    margin-right: 30px;
}
.footer{
    width:100vw;
    margin: 5% 0;
    padding: 0 5%;
    background-color: #fff;
    border-top: 2px solid #868686;
    padding-top:10px;
}
h4{
    font-size:1rem;
    font-weight: bold;
}
ul{
    list-style: none;
    font-size:.9rem;
    margin:0;
    padding:0;
}
a:hover{
    color:#000;
}

.phone{
    font-size: 1.5rem;
    font-weight: bold;
    color:#D52B1E;
}

.social{
    .a{
        max-width:48px;
        img{
            width:50px;
        }
    }
}
.socialimage{
    width:50px;
}
</style>

