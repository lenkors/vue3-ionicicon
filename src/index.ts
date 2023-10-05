import IconIon from './components/icon-ion/IconIon.vue';

const useIonIcon = {
    install: function (app: { component: (a: string, b: unknown) => void }) {
      app.component("icon-ion", IconIon);
    },
};
  
export { IconIon, useIonIcon };

