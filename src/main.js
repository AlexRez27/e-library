import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'materialize-css/dist/js/materialize.min';
import apolloProvider from './apollo/vue-apollo';
import Loader from '@/components/Loader.vue';

createApp(App)
  .use(router)
  .use(apolloProvider)
  .component('Loader', Loader)
  .mount('#app');
