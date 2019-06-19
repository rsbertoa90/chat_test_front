<template>
<div class="contain-all">
    <div class="x-scroll" ref="content">
        <div v-for="p in products" :key="p.code">
            <div class="card-container">
                <smallCard :product="p"></smallCard>
            </div>
        </div>
    </div>
    
        <div class="left" v-if="$mq=='lg'">
            <fa-icon @click="swipeLeft" icon="chevron-left"></fa-icon>
        </div>
        <div class="right" @click="swipeRight" v-if="$mq=='lg'">
            <fa-icon icon="chevron-right"></fa-icon>
        </div>
   
    
</div>
</template>

<script>
import smallCard from './small-card';
export default {
    components:{smallCard},
    props:['products'],
    methods:{
        scrollTo(element, scrollPixels, duration) {
            const scrollPos = element.scrollLeft;
            // Condition to check if scrolling is required
            if ( !( (scrollPos === 0 || scrollPixels > 0) && (element.clientWidth + scrollPos === element.scrollWidth || scrollPixels < 0))) 
            {
                // Get the start timestamp
                const startTime =
                "now" in window.performance
                    ? performance.now()
                    : new Date().getTime();
                
                function scroll(timestamp) {
                //Calculate the timeelapsed
                const timeElapsed = timestamp - startTime;
                //Calculate progress 
                const progress = Math.min(timeElapsed / duration, 1);
                //Set the scrolleft
                element.scrollLeft = scrollPos + scrollPixels * progress;
                //Check if elapsed time is less then duration then call the requestAnimation, otherwise exit
                if (timeElapsed < duration) {
                    //Request for animation
                    window.requestAnimationFrame(scroll);
                } else {
                    return;
                }
                }
                //Call requestAnimationFrame on scroll function first time
                window.requestAnimationFrame(scroll);
            }
            },
        swipeLeft() {
        const content = this.$refs.content;
        this.scrollTo(content, -300, 800);
        },
        swipeRight() {
        const content = this.$refs.content;
        this.scrollTo(content, 300, 800);
        }
    }
}
</script>

<style lang="scss" scoped>
.card-container{
    width:250px
}
    .x-scroll{
        display:flex;
        overflow-y:hidden;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        position: relative;
        
    }

    .contain-all{
        position:relative;
        width:100%;
        .left, .right{
            position:absolute;
            top:45%;
            cursor: pointer;
            width:90%;
            display: flex;
            width:80px;
            height: 80px;
            justify-content: center;
            align-items:center;
            background-color: #868686cc;
            font-size:2rem;
            color:#D52B1E;
            border-radius:50%;
        }
        .left{left:0;}
        .right{right:0;}
    }
</style>
