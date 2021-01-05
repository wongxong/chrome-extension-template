import Vue from 'vue';
import SvgIcon from './svg-icon';

Vue.component('SvgIcon', SvgIcon);

const requireContext = require.context('./svg', false, /\.svg$/);

const requireAll = requireContext => requireContext.keys().map(requireContext);

requireAll(requireContext);