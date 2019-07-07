<template>
    <div>
        <h1>¿Buscas un Regalo Empresarial original?</h1>
        <p style="text-align: left;"> Impacta con un regalo empresarial fabricado por Mates Fabi. Somos especialistas en brindar soluciones a medida. Ofrecemos productos personalizados que se adaptan a las necesidades de nuestro cliente. </p>
        <p dir="ltr" style="text-align: left;"><span>Trabajamos para que quedes satisfecho y puedas lograr tus objetivos de marketing. Nos interesa que tus clientes queden felices y gratamente sorprendidos. Tenemos un equipo especializado que sabe cómo hacerlo.</span></p>
        <p dir="ltr" style="text-align: left;"><span>Mira algunos de nuestros trabajos.</span></p>
        
       <regalos-fotos></regalos-fotos>
        
        <h2>¿Qué productos podes personalizar con tu logo en Mates Fabi?</h2>
        <ul>
            <li>
                <h2> <span class="fa fa-check" style="font-size:1.5rem"></span> Mates  </h2>
            </li>
            <li>
                <h2> <span class="fa fa-check" style="font-size:1.5rem"></span> Portatermos</h2>
            </li>
            <li>
                <h2> <span class="fa fa-check" style="font-size:1.5rem"></span> Equipos Materos completos</h2>
            </li>
            <li>
                <h2> <span class="fa fa-check" style="font-size:1.5rem"></span> Bombillas con dome</h2>
            </li>
        </ul>
        <hr>
        <h2>Quiero un presupuesto.</h2>
        <p dir="ltr"><span>Necesitamos que completes el siguiente formulario para poder hacerlo. Te dejamos nuestro numero de contacto por si tenes alguna duda más: <span class="text-info font-weight-bold"> 11 3008 5414  </span> </span></p>

            <regalos-form></regalos-form>
        
        <p dir="ltr"></p>
        <h2>¿Porque Mates o Equipos Materos como Regalo Empresarial?</h2>
        <p dir="ltr">Son variadas las opciones en el mercado al momento de un regalo empresarial. Pero estamos en Argentina y que mejor que un mate, equipo matero o bombilla. Uno de los tantos objetivos que se persigue a la hora de estos regalos es poder capturar la atención nuestros clientes y qué mejor que un elemento que además de lindo sea útil. Impacto visual más utilidad  En nuestro país la cultura del Mate es indiscutible, es casi un ícono nacional. Es mucho más que un simple tomar algo, es un rito social, un compartir constante: cuando nos levantamos, estudiamos, planificamos, estamos de ocio ,juntamos con amigos o cuando necesitamos un momento de soledad...tantas situaciones diversas con el Mate como lazo. El Mate es parte de nuestra vida cotidiana, una oportunidad excelente para que tu regalo empresarial sea una experiencia.</p>
        <h2 style="text-align: left;">3 motivos para realizar un regalo empresarial</h2>
        <ul>
            <li>
                <p> <span class="fa fa-star"></span> Como agradecimiento. Es un detalle sumamente oportuno luego de un cierre de contrato o evento de importancia similar. El mate personifica la solidaridad y la cultura Argentina, es un símbolo oportuno para transmitir ese mensaje.</p>
            </li>
            <li>
                <p> <span class="fa fa-star"></span> Lograr empatía con tu cliente. Es una forma de lograr recordación de marca. Un regalo empresarial que pueda utilizarse cotidianamente cumple con este objetivo. Es una forma de publicidad que genera familiarización y propagación de marca.</p>
            </li>
            <li>
                <p> <span class="fa fa-star"></span> Incentivo al personal de la empresa. El regalo empresarial apuntado al propio personal de la empresa es una excelente estrategia . Una manera de que se sientan incentivados, muchas veces estos tipos de detalles son los que marcan una gran diferencia entre una empresa y otra.</p>
            </li>
        </ul>
        <p>Hay muchos más motivos pero básicamente un regalo Empresarial bien orientado puede mejorar la imagen de tu empresa.  Mates Fabi puede ayudarte ya que somos fabricantes y referentes en el Rubro.</p>
        <h2 style="text-align: left;"><span> </span></h2>
        <h1><span id="docs-internal-guid-d1438626-7fff-ea70-8260-38ce35683edf"></span></h1>
        <p style="text-align: left;"></p>
        <p><br /><br /></p>

    </div>
</template>

<script>
import metadataMixin from '../metadataMixin.js';
import regalosFotos from './fotos';
import regalosForm from './form.vue';
export default {
    mixins:[metadataMixin],
    components : {
        regalosForm,
        regalosFotos
    }
}
</script>

<style>
    
</style>