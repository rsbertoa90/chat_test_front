/* const axios = require('@nuxtjs/axios'); */
import Vue from 'vue';

function findProduct(categories, id) {
  let res;
  categories.forEach(c => {
    let found = c.products.find(p => {
      return p.id == id
    });
    if (found) {
      res = found;
    }
  });

  return res;
}


export const strict = false

export const state = () => {
  return {
    conversations: null,
    activeConversation: null,

    editWarnings: '',
    editOrder: null,
    onEditMode: false,
    orders: [],
    nvorders: [],
    config: null,
    states: [],
    meta: [],
    categories: [],
    loading: true,
    searchTerm: '',
    supliers: [],
    tutoSeen: true,
    list: [],
    total: 0,
    firstload: true,
    canceledOrders: null,

  }
}

export const getters = {
  getConversations(store) {
    return store.conversations;
  },
  getActiveConversation(store) {
    return store.activeConversation;
  },

  getEditWarnings(store) {
    return store.editWarnings;
  },
  getOnEditMode(store) {
    return store.onEditMode;
  },
  getEditOrder(store) {
    return store.editOrder;
  },
  getCanceledOrders(store) {
    return store.canceledOrders;
  },
  getFirstload(store) {
    return store.firstload;
  },
  getTutoSeen(store) {
    return store.tutoSeen;
  },
  getSupliers(store) {
    return store.supliers;
  },
  getNotPaused(store) {
    let res = [];
    store.categories.forEach(cat => {

      cat.products = cat.products.filter(prod => {
        return !prod.paused;
      });
      if (cat.products.length > 0) {
        res.push(cat);
      }
    });
    return res;
  },
  getSearchTerm(store) {
    return store.searchTerm;
  },
  getOrders(store) {
    return store.orders;
  },
  getNVOrders(store) {
    return store.nvorders;
  },
  getLoading(store) {
    return store.loading;
  },
  getTotal(store) {
    return store.total;
  },
  getList(store) {
    return store.list;
  },
  getAllMeta(store) {
    if (store.meta) {
      return store.meta;
    }
  },
  getMeta: store => page => {
    if (store.meta) {
      if (page == 'index') {
        page = 'home'
      }
      return store.meta.find(m => {

        return m.page.trim().toLowerCase() == page.trim().toLowerCase();
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

          if (product.offer && !product.paused) {
            prods.push(product);
          }
        });
      });
    }

    return prods;
  },
  getNews(state) {
    let prods = [];
    if (state.categories.length > 0) {
      state.categories.forEach(category => {
        category.products.forEach(product => {

          if (product.new && !product.paused) {
            prods.push(product);
          }
        });
      });
    }

    return prods;
  },
  getUser(state) {
    return state.auth.user;
  },
  getProductSlug: store => product => {
    if (store.categories && store.categories.length > 0) {
      let category = store.categories.find(c => {
        return c.id == product.category_id;
      });
      if (category) {
        let slug = category.slug + '/' + product.slug;
        slug = slug.replace('//', '/');
        slug = slug.replace('//', '/');
        return slug;
      }
    }
  },

}

export const mutations = {
  setConversations(state, payload) {
    state.conversations = payload;
  },
  setActiveConversation(state, payload) {
    state.activeConversation = payload;
  },


  setEditWarnings(state, payload) {
    state.editWarnings = payload;
  },
  editMode(state, order) {
    state.editWarnings = '';
    if (order.edited) {
      let rawDate = new Date(order.order_items[0].created_at);
      let editDate = rawDate.getDate() + "-" + (rawDate.getMonth() + 1) + "-" + rawDate.getFullYear() + ' / ' + rawDate.getHours() + ':' + rawDate.getMinutes() + 'hs';
      state.editWarnings += ` <b>Ultima edición de este pedido:</b> ${editDate} <br/>`
    }


    state.onEditMode = true;
    state.editOrder = order;
    state.list = [];
    order.order_items.forEach(item => {
      let product = findProduct(state.categories, item.product_id);
      if (product) {
        Vue.set(product, 'units', item.qty);
        state.list.push(product);
        if (product.paused) {
          state.editWarnings += `<b> ${item.name} (COD ${product.code})</b> está actualmente pausado. <br/>`
        }
        if (product.price != item.price) {
          state.editWarnings += `<b> El precio de  ${item.name} (COD ${product.code})  </b> era $${item.price}. Ahora es $${product.price}. <br/>`
        }
      } else {
        state.editWarnings += `<b> No se agregó ${item.name}.</b>  Puede estar pausado o fue eliminado. <br/>`
      }
    });

    setTimeout(() => {
      this.commit('setTotal');
    }, 150);
  },

  setOnEditMode(state, payload) {
    state.onEditMode = payload;
  },

  setEditOrder(state, payload) {
    state.onEditOrder = payload;
  },

  /* PRODUCT */
  setTotal(state) {
    var tot = 0;
    if (state.list.length) {
      state.list.forEach(product => {
        //console.log(product.units);
        if (product.units > 0) {

          tot += product.price * product.units


        }
      });
    }
    state.total = tot;
  },
  setList(state, product) {
    let exists = false;
    //reviso si el producto ya esta en la lista
    state.list.forEach(p => {
      if (p.id == product.id) {
        //si esta digo que si existe,para no agregarlo de nuevo
        exists = true;
        //si units es cero lo saco de la lista
        if (!product.units) {
          state.list = state.list.filter(pr => {
            return pr.id != product.id;
          });
        }
        //sino, cambio units  
        else {
          p.units = product.units;
        }
      }
    });
    //si no existia lo agrego
    if (!exists && product.units > 0) {
      state.list.push(product);
    }
    //por ultimo recalculo el total
    setTimeout(() => {

      this.commit('setTotal');
    }, 150);
  },
  setTutoSeen(state) {
    state.tutoSeen = true;
  },
  setFirstload(state) {
    state.firstload = false;
  },
  updateProduct(state, payload) {
    state.categories.forEach(c => {
      let prod = c.products.find(p => {
        return p.id == payload.product.id;
      });
      if (prod) {
        prod[payload.field] = payload.value;
        let data = {
          product: prod.id,
          field: payload.field,
          value: prod[payload.field],
        }
        if (data.field == 'paused' || data.field == 'offer') {
          data.value = data.value ? 1 : 0;
        }

        this.$axios.put('/product', data);
      }
    });
  },
  deleteProduct(state, payload) {
    state.categories.forEach(c => {
      c.products = c.products.filter(p => {
        return p.id != payload.id;
      });
    });
    this.$axios.delete('/product/' + payload.id);
  },

  deleteProductImage(state, image) {
    this.$axios.delete('/product/image/' + image.id)
      .then(() => {
        state.categories.forEach(c => {
          let prod = c.products.find(p => {
            return p.id == image.product_id;
          });
          if (prod) {
            let imgs = Object.assign(prod.images.filter(pi => {
              return pi.id != image.id;
            }));
            prod.images = imgs;
          }
        });
      });
  },
  setSupliers(state, payload) {
    state.supliers = payload;
  },
  /* /PRODUCT */

  setSearchTerm(state, payload) {
    if (payload.length > 2) {
      this.$axios.post('/searchHistory', {
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
  setNotViewedOrders(state, payload) {
    state.nvorders = payload;
  },
  setCanceledOrders(state, payload) {
    state.canceledOrders = payload;

    state.orders = state.orders.concat(payload);

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

          p.units = prod.units;
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

 async socket_message_recieved(){
   console.log('SOCKET MESSAGE RECIEVED ON STORE');
 },

  async nuxtServerInit({
    dispatch,
    commit
  }, context) {

    await dispatch('fetchCategories');
    await dispatch('fetchConfig');
    await dispatch('fetchMeta');
    await dispatch('fetchStates');
    commit('setLoading', false);

  },

  async fetchAllConversations({
    commit
  }) {
    await this.$axios.get('/all-conversations')
      .then(r => {
        commit('setConversations', r.data);
        console.log('all conversations',r.data);
      })
  },

  async fetchConversation({
    commit
  }, client_id) {
    await this.$axios.get(`/user-conversation/${client_id}`)
      .then(r => {
        commit('setActiveConversation', r.data);
      });

  },

  async fetchCategories({
    commit
  }) {
    await this.$axios.get('/categories')
      .then(r => {
        commit('setCategories', r.data);
      });

  },


  async fetchConfig({
    commit
  }) {
    await this.$axios.get('/config')
      .then(r => {
        commit('setConfig', r.data);
      });

  },

  async fetchStates({
    commit
  }) {
    await this.$axios.get('/states')
      .then(r => {
        commit('setStates', r.data);
      });

  },

  async fetchMeta({
    commit
  }) {
    await this.$axios.get('/metadatas')
      .then(r => {
        commit('setMeta', r.data);
      });

  },

  async fetchOrders({
    commit
  }) {
    //commit('setLoading',true);
    await this.$axios.get('/orders')
      .then(r => {
        commit('setOrders', r.data);
        //commit('setLoading',false);
      });
  },

  async fetchNVOrders({
    commit
  }) {
    //commit('setLoading',true);
    await this.$axios.get('/notViewedOrders')
      .then(r => {
        commit('setNotViewedOrders', r.data);
        //commit('setLoading',false);
      });
  },

  async fetchCanceledOrders({
    commit
  }) {
    //commit('setLoading',true);
    await this.$axios.get('/canceled-orders')
      .then(r => {
        commit('setCanceledOrders', r.data);
      });
  },

  async fetchSupliers({
    commit
  }) {
    await this.$axios.get('/supliers')
      .then(r => {
        commit('setSupliers', r.data);
      });
  }

}