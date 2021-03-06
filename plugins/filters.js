import Vue from 'vue';


Vue.filter('price', value => {
  if (value % 1 != 0) {
    return value.toFixed(2);
  }
  return value;
});

Vue.filter('text', value => {
  if (value) {
    return value.trim();
  }
});

Vue.filter('textBreaks',value => {

  return value.trim().replace(/\n/g, "<br />");
});

Vue.filter('datetime', val => {
    let date = new Date(val);
    return ("0" + date.getDate()).slice(-2) + "-" + 
        ("0" + (date.getMonth() + 1)).slice(-2) + "-" + 
        date.getFullYear() + ' / ' + 
        ("0" + date.getHours()).slice(-2) + ":" + 
        ("0" + date.getMinutes()).slice(-2);
  
});

Vue.filter('date', val => {
    let date = new Date(val);
    return ("0" + date.getDate()).slice(-2) + "-" + 
        ("0" + (date.getMonth() + 1)).slice(-2) + "-" + 
        date.getFullYear();
  
});

Vue.filter('time', val => {
    let date = new Date(val);
    return ("0" + date.getHours()).slice(-2) + ":" + 
        ("0" + date.getMinutes()).slice(-2);
});


Vue.filter('slug', str => {

  if (typeof str != 'string') {
    return str;
  }

  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
});

Vue.filter('ucFirst', (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
})
Vue.filter('uc', (string) => {
  return string.toUpperCase();
})