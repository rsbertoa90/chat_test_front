const axios = require('axios');



export const state = () => {
    return{
       orders: [],
        config: null,
        states: [],
        meta: [],
        categories: [],
        loading: true,
        searchTerm: '',
    }
}

export const getters = {

     getSearchTerm(store) {
         return store.searchTerm;
       },
       getOrders(store) {
         return store.orders;
       },
       getLoading(store) {
         return store.loading;
       },
       getTotal(store) {
         var tot = 0;
         if (store.categories && store.categories.length) {
           store.categories.forEach(function (category) {
             category.products.forEach(function (product) {
               if (product.units > 0) {

                 tot += product.price * product.units

               }
             });
           });
         }
         return tot;
       },
       getList(store) {
         if (store.categories && store.categories.length) {
           var result = [];
           store.categories.forEach(function (category) {
             var prods = category.products.filter(function (el) {
               return (el.units != null & el.units > 0);
             });
             if (prods.length > 0) {
               result.push(prods);
             }
           });
           return [].concat.apply([], result);
         }


       },

       getMeta: store => page => {
         if (store.meta) {

           return store.meta.find(m => {

             return m.page.trim() == page.trim();
           });
         }
       },

       getConfig(store) {
         return store.config;
       },
       getStates(store) {
         return store.states;
       },
       getCity: store => id => {
         if (store.states) {

           store.states.forEach(state => {
             let cit = state.cities.find(city => {
               return city.id == id;
             });
             if (cit) {
               return cit;
             }
           });
         }
       },
       getCategories(state) {
         return state.categories;
       },
       getCategory: (state) => (id) => {
         if (state.categories.length > 0) {
           return state.categories.find(cat => {
             return cat.id == id;
           });
         }
       },
       getProducts(state) {
         let prods = [];
         if (state.categories.length > 0) {
           state.categories.forEach(category => {
             prods.concat(category.products);
           });
         }
         return prods;
       },
       getProduct: (state) => (id) => {
         var res = null;
         if (state.categories.length > 0) {
           state.categories.forEach(cat => {

             var prod = cat.products.find(p => {
               return p.id == id
             });
             if (prod) {

               res = prod;

             }
           });
           return res;

         }
       },
       getOffers(state) {
         let prods = [];
         if (state.categories.length > 0) {
           state.categories.forEach(category => {
             category.products.forEach(product => {

               if (product.offer) {
                 prods.push(product);
               }
             });
           });
         }

         return prods;
       },
    getUser(state)
    {
        return state.auth.user;
    }
}

export const mutations = {
  /* PRODUCT */
  updateProduct(state,payload){
    state.categories.forEach(c => {
      let prod = c.products.find(p=>{
        return p.id == payload.product.id;
      });
      if (prod)
      {
        prod[payload.field] = payload.value;
        let data = {
            product: prod.id,
            field: payload.field,
            value: prod[payload.field],
        }
        if (data.field == 'paused' || data.field == 'offer') {
          data.value = data.value ? 1 : 0;
        }

        this.$axios.put('/product',data);
      } 
    });
  },
  deleteProduct(state,payload){
    state.categories.forEach(c => {
      c.products = c.products.filter(p =>{
        return p.id != payload.id;
      });
    });
    this.$axios.delete('/product/'+payload.id);
  },
  /* /PRODUCT */
   setSearchTerm(state, payload) {
       if (payload.length > 2) {
         Vue.http.post('/searchHistory', {
           term: payload
         });
       }
       state.searchTerm = payload;
     },
     setLoading(state, payload) {
       state.loading = payload;
     },
     setOrders(state, payload) {
       state.orders = payload;
     },
     setMeta(state, payload) {
       state.meta = payload;
     },

     setConfig(state, payload) {
       state.config = payload;
     },
     setStates(state, payload) {
       state.states = payload
     },
     setProductUnits: (state, payload) => {
       let prod = payload;
       state.categories.forEach(c => {
         c.products.forEach(p => {
           if (p.id == prod.id) {

             Vue.set(p, 'units', prod.units);
           }
         });
       });
     },
     setCategories: (state, payload) => {
       state.categories = payload;
     },
     saveCategory: (state, category) => {
       state.categories.push(category);
     },
}

export const actions = {
    async nuxtServerInit({dispatch},context){
       await dispatch('fetchCategories');
       await dispatch('fetchConfig');
       await dispatch('fetchMeta');
    },

    async fetchCategories({commit}){
        await this.$axios.get('/categories')
        .then(r=>{
            commit('setCategories',r.data);
        });
        
    },
  
    async fetchConfig({commit}){
        await this.$axios.get('/config')
        .then(r=>{
            commit('setConfig',r.data);
        });
        
    },
  
    async fetchStates({commit}){
        await this.$axios.get('/states')
        .then(r=>{
            commit('setStates',r.data);
        });
        
    },
  
    async fetchMeta({commit}){
        await this.$axios.get('/metadatas')
        .then(r=>{
            commit('setMeta',r.data);
        });
        
    },
  
    async fetchOrders({commit}){
        await this.$axios.get('/orders')
        .then(r=>{
            commit('setOrders',r.data);
        });   
    }
  
}