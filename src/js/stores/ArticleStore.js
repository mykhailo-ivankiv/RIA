/*global rawData*/

import Reflux from "reflux";
import fetch from "isomorphic-fetch";

const API = "https://roveme.dev/api";

var cache = {};

var ArticleStorage = Reflux.createStore({
  setup (data) {
    cache = data || {};
  },

  init (data) {
  }

});

export default ArticleStorage;