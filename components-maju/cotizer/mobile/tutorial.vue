<template>
<transition enter-active-class="animate animated bounceIn">

    <div v-if="scrolled && !v" class="overlay">
        <div class="image-container">
             <button class="btn btn-danger close-btn"  @click="setViewed"> <fa-icon icon="times"></fa-icon> </button>
            <v-lazy-image :src="imagePath(imagesrc)"></v-lazy-image>
            <transition enter-active-class=" animated slideInUp">
                <div  v-if="enterhand" class="animation "
                        :class="{redcircle:clicknow}">
                    
                   <fa-icon icon="mouse-pointer" class="icon"></fa-icon>
                
                </div>
               
            </transition>        

        
        </div>
         <transition enter-active-class="animate animated bounceIn">
                    <div class="speech-bubble" v-if="clicknow">
                        <span>Haz Click en una categoria para desplegar los productos</span>
                    </div>
        </transition>
       
    </div>
</transition>
</template>

<script>
export default {
    data(){
        return{
            v:false,
            scrolled:false,
            enterhand:false,
            clicknow:false,
            imagesrc:"/storage/images/app/tuto.png",
            
        }
    },
    watch:{
        scrolled(){
           
        }
    },
    methods: {
        setViewed(){
            this.v = true;
            this.$store.commit('setTutoSeen');
        },
    handleScroll () {
        if(process.browser){

            if (!this.scrolled){
                this.scrolled = window.scrollY > 50;
    
                setTimeout(() => {
                    this.enterhand=true;
                }, 1000);
    
                setTimeout(() => {
                    this.clicknow=true;
                    this.imagesrc = "/storage/images/app/tuto2.png"
                }, 2100);
            }
        }
    }
    },
    mounted () {
    window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
    }

}
</script>

<style lang="scss" scoped>
.close-btn{
    width:60px;
    height: 60px;
    position:absolute;
    top:0;
    right:0;
    border-radius: 15px;
    box-shadow: 2px 2px 2px;
    font-size:2rem;
    z-index:200;
}
    .redcircle{
        display:flex;
        flex-direction: column;
        width:100px;
        height: 100px;
        justify-content: center;
        align-items:center;
        border-radius: 50%;
        overflow: hidden;
        background-color: rgba(170, 16, 16, 0.479)
    }

    .animation{
        position: absolute;
        top:70px;
        left:20px;
        color:rgb(19, 18, 18);
        font-size: 3rem;
       
    }
    .image-container{
        width: 80%;
        position: relative;
    }
    .overlay{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        position:fixed;
        top:0;
        left:0;
        width: 100vw;
        height: 100vh;
        background-color: #cccc;
    }

    .speech-bubble{
       position: fixed;
       top:50px;
       right: 50px;
        background: #57b2bb;
        border-radius: .4em;
        width: 50%;
        padding: 20px;
        text-align: center;
        color:#fff;
       
    }

    .speech-bubble:after {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	width: 0;
	height: 0;
	border: 37px solid transparent;
	border-right-color: #57b2bb;
	border-left: 0;
	border-bottom: 0;
	margin-top: -18.5px;
	margin-left: -37px;
}
  @media(min-width:900px){
      .overlay{
          align-items:center;
          justify-content: center;
      }

      .image-container{
          margin-left: 22%;
      }

      .speech-bubble{
           top:150px;
      }
  }
</style>
