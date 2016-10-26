// Load Vue components
const Vue = require('vue');
const VueResource = require('vue-resource');
const App = require('./components/App.vue');

Vue.use(VueResource);

const vm = new Vue({
  el: '#app',
  render(createElement) {
    return createElement(App);
  }
});

// Particles
require('particles.js');
particlesJS.load('particles', '/javascripts/particles.json');
