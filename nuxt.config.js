import pkg from './package'



export default {

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



  env: {
     dev: (process.env.NODE_ENV !== 'production'),
     baseURL: process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:8000/api/' : 'https://back.redlimp.com/api',
    /*  baseURL:  'http://back.matesdefabrica.com/api' , */
     PROD_API: 'https://back.redlimp.com/api/',
  },


  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Cabin'
        },
      {
        rel: "stylesheet"
        ,href: "https://use.fontawesome.com/releases/v5.8.2/css/all.css"
        ,integrity: "sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
       , crossorigin :"anonymous"
      }
      
    ],
    script:[
       {
         src: "https://code.jquery.com/jquery-3.3.1.slim.min.js",
         type: "text/javascript"
       }, {
         src: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
         type: "text/javascript"
       }, {
         src: "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
         type: "text/javascript"
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
    {src:'./plugins/swal.js', ssr:false},
    {src:'./plugins/lodash.js', ssr:false},
    {src:'./plugins/awesome-swiper.js', ssr:false},
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
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
  /*
  ** Axios module configuration
  */
 
  axios: {
    baseURL: 'http://back.redlimp.com/api' , 
//    //baseURL: process.env.NODE_ENV == 'production' ? 'https://back.redlimp.com/api' : 'http://localhost:8000/api'
    // See https://github.com/nuxt-community/axios-module#options
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
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
