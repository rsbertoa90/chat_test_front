import pkg from './package'

import brotli from 'brotli';
import shrinkRay from 'shrink-ray-current'



export default {
  server: {
    port: 3004, // default: 3000
    /* host: '0.0.0.0', */ // default: localhost
  },


  optimization:{
    minimize: true,
  },

   router: {
     scrollBehavior: async (to, from, savedPosition) => {
       if (savedPosition) {
         return savedPosition
       }

       const findEl = async (hash, x) => {
         return document.querySelector(hash) ||
           new Promise((resolve, reject) => {
             if (x > 50) {
               return resolve()
             }
             setTimeout(() => {
               resolve(findEl(hash, ++x || 1))
             }, 100)
           })
       }

       if (to.hash) {
         let el = await findEl(to.hash)
         if ('scrollBehavior' in document.documentElement.style) {
           return window.scrollTo({
             top: el.offsetTop,
             behavior: 'smooth'
           })
         } else {
           return window.scrollTo({top:0, behavior:'smooth'});
         }
       }

       return  window.scrollTo({
         top: 0,
         behavior: 'smooth'
       });
     }
   },





  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      {'og:image':'https://back.matesfabi.com/storage/images/app/logo.png'},
      {'og:title':'Mates Fabi'},
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      }, {
        rel: "preconnect",
        href: "https://back.matesfabi.com"
      },
    
      
    ],
    script:[
       {
         src: "https://code.jquery.com/jquery-3.3.1.slim.min.js",
         type: "text/javascript",
         defer:true
       },
       /*  {
         src: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
         type: "text/javascript"
       }, */
        {
         src: "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
         type: "text/javascript",
         defer:true
       } 
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/bootstrap.min.css',
    '@/assets/css/reset.css',
    '@/assets/css/animate.css',
    '@/assets/scss/helpers.scss',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    './plugins/datamixin.js',
    './plugins/v-lazy-image.js',
    './plugins/filters.js',
    './plugins/faicons.js',
    {
      src: './plugins/v-click-outside.js',
      ssr: false
    },
    {src:'./plugins/v-touch-events.js', ssr:false},
    {src:'./plugins/swal.js', ssr:false},
    {src:'./plugins/awesome-swiper.js', ssr:false},
    {src:'./plugins/datepicker.js', ssr:false},
    { src: '@/plugins/ga.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-webfontloader',
    ["nuxt-compress"],
  /*    ['@nuxtjs/google-analytics', {
       id: "UA-126973762-1",dev:true
     }], */

     [
       'nuxt-mq',
       {
         // Default breakpoint for SSR
         defaultBreakpoint: 'default',
         breakpoints: {
           sm: 450,
           md: 1250,
           lg: Infinity
         }
       }
     ],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  webfontloader: {
    google: {
      families: ['Raleway']
    },
    custom:{
      families:['fontawesome'],
      urls: ['https://use.fontawesome.com/releases/v5.2.0/css/all.css']
    }
  },


  render: {
    compressor: shrinkRay(),

  },

  /*
  ** Axios module configuration
  */
 
  axios: {
    
    baseURL: process.env.NODE_ENV == 'production' ? 'https://back.matesfabi.com/api' : 'http://localhost:8000/api'
  
  },


  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'meta.token'
          },
          logout: {
            url: '/logout',
            method: 'post'
          },
          user: {
            url: '/user',
            method: 'get',
            propertyName: 'data'
          }
        }
        // tokenRequired: true,
        // tokenType: 'bearer',
      }
    }
  },

 



  /*
  ** Build configuration
  */
  build: {
    extend(config, {
        isDev,
        isClient
      }) {
        config.mode="production"
    }
    //analize:true,
    /*
    ** You can extend webpack config here
    */
  
  }
}
