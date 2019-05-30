<template>
    <div class="bordered banner-container">
        <div class="banner-mates">
            <img :src="imagePath('/storage/images/app/banner-mates.png')" alt="mates de fabrica logo">
        </div>
        <div class="banner-de">
            <img :src="imagePath('/storage/images/app/banner-de.png')" alt="mates de fabrica logo">
            
        </div>
        <div class="banner-fabrica">
            <img :src="imagePath('/storage/images/app/banner-fabrica.png')" alt="mates de fabrica logo">

        </div>
        <div class="banner-mate">
            <img :src="imagePath('/storage/images/app/banner-mate.png')" alt="mates de fabrica logo">

        </div>
        <div class="banner-virola">
            <img :src="imagePath('/storage/images/app/banner-virola.png')" alt="mates de fabrica logo">

        </div>
    </div>
</template>

<script>
export default {
    
}
</script>


<style lang="scss" scoped>


.banner-de,.banner-mates,.banner-mate,.banner-virola,.banner-fabrica{
    animation-delay:  2s;
    animation-duration:10s;
 /*     animation-direction:alternate; */
    animation-iteration-count: infinite;
}

.banner-mates{
    
    animation-name:bannermatesanimation;
    
    position:absolute;
    top:20px;
    left:50%;
    width:250px;
    margin-left:-125px;
    z-index:3;
}

@keyframes bannermatesanimation {
    0% {
        left:0;
        
    }

    25% {
        left:50%;
    }
   

}



.banner-de{
      
    animation-name:bannerdeanimation;
   
    position:absolute;
    top:117px;
    right:50%;
    width:80px;
    z-index:3;
    margin-right: -64px;

}


@keyframes bannerdeanimation {
    0% {
        right:0;
    }
    25% {
        right:50%;
    }
}


.banner-fabrica{
      animation-name:bannerfabricaanimation;
    position:absolute;
    bottom:20px;
    left:50%;
    width:315px;
    margin-left:-158px;
    z-index:3;
}

@keyframes bannerfabricaanimation{
    0%{
        bottom:0;
        margin-bottom:-100px;
    }
    25%{
        bottom:20px;
        margin-bottom:0;
    }
}


.banner-mate{
     
    animation-name: bannermateanimation;
  
    position: absolute;
    bottom: 79px;
    left: 50%;
    width: 130px;
    margin-left: -93px;
    z-index: 1;
}

@keyframes bannermateanimation {
    0% {
        bottom:0;
    }
    25% {
        bottom:79px;
    }
}

.banner-virola{
    animation-name:bannervirolaanimation;
   position: absolute;
    top: 75px;
    left: 50%;
    width: 125px;
    margin-left: -90px;
    z-index: 10;

}


@keyframes bannervirolaanimation {
    0% {
        top:0;
    }
    25% {
        top:75px;
    }
}




    .banner-container{
        background-color: #F2B742;
        width:100%;
        display: flex;
        position:relative;
        height: 314px;
    }


</style>
