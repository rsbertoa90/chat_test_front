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
    DEV_API: 'http://localhost:8000/api/',
    PROD_API: '/proxy'
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
    baseURL:'http://localhost:8000/api'
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
