import IconIon from './components/icon-ion/IconIon.vue';
import type { App } from 'vue';

const useIconIon = {
    install: function (app: App) {
      app.component("icon-ion", IconIon);
    },
};
  
export { IconIon, useIconIon };

