 import Ripple from 'vue-ripple-directive';
import Vue from 'vue';
Ripple.color = 'rgba(255, 255, 255, 0.35)';
Ripple.zIndex = 55;

Vue.directive('ripple', Ripple);