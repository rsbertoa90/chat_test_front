<template>
    <div class="container mtc">
    <div class="row justify-content-center w-100 p-3">
        <div class="title">
            <h1>Genial! Para terminar segui estos pasos </h1>
        </div>
        <div class="round bg-gr p-4">
            <ul class="list">
                <li class="d-flex align-items-center">
                    <div class="circle">
                        <span>1</span>
                    </div>
                    <span>
                        Ingresá a tu mail
                    </span>
                </li>
                <li class="d-flex align-items-center">
                    <div class="circle">
                        <span>2</span>
                    </div>
                    <span>
                       Busca el mail que te enviamos desde Mates Fabi ( Sino esta en la bandeja principal revisa la carpeta de SPAM o CORREO NO DESEADO)
                    </span>
                </li>
                <li class="d-flex align-items-center">
                    <div class="circle">
                        <span>3</span>
                    </div>
                    <span>
                       Dentro del mail que te enviamos, hace click en "terminar registro"
                    </span>
                </li>
            </ul>     
        </div>

       
    </div>
</div>
</template>

<script>
export default {
    name:'registro-exitoso',
    layout:'clean',
}
</script>


<style lang="scss" scoped>

.pink-btn{
    border: 1px solid #333;
    background-color: #ff0aaf;
    margin: 10px;
    padding: 4px;
    box-shadow: 2px 2px 2px #666;
    color:#fff;
    font-weight: bold;
}

li{
    margin-top:15px;
}
.circle{
    margin-right:15px;
    border:1px solid #E72874;
    border-radius:50%;
    display: flex;
    justify-content: center;
    align-items:center;
    width:38px;
    min-width: 38px;
    height: 38px;
    color:#E72874;
    font-size: 20px;
}
.bg-gr{
    background-color: #F4F6F8;
   border :1px solid #E72874;
}
.round{
    border-radius:40px;
}
    .container{
        max-width:450px;
        margin:auto;
    }

    .title{
        h1{
            font-size: 38px;
           // color:#E72874;
            font-weight: bold;
        }
    }
    .card-header{
        color:#888;;
        font-weight: bold;
        font-size: 22px;
    }
    .mtc{
        margin-top:30px;
    }


    @media(max-width:660px)
    {
        .title{
            h1{
                font-size:25px; 

            }
            }
        .container{
            max-width:350px;
        }

        .primary{
            font-size: 15px;
        }
    }
</style>
   