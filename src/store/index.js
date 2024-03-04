// store/index.js
import { createStore } from 'vuex';
import textsModule from './texts';
import fontsModule from './fonts';
import fontInfo from './fontInfo';

// import OT_VF_tags from './OT_VF-tags';
// import OT_OT_tags from './OT_OT-tags';

import Features_tags from './Features-tags';

const store = createStore({
  state: {
    database: null,
  },
  mutations: {
    setDatabase(state, db) {
      state.database = db;
    },
  },
  modules: {
    // VF_tags: OT_VF_tags,
    // OT_tags: OT_OT_tags,
    Features_tags: Features_tags,
    fontInfo: fontInfo,
    texts: textsModule,
    fonts: fontsModule,
  },
});

export default store;
