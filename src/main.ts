import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuestic } from 'vuestic-ui';
import 'vuestic-ui/css';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(createVuestic());

app.mount('#app');