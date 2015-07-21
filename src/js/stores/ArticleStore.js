/*global rawData*/

import Reflux from "reflux";
import fetch from "isomorphic-fetch";

import cache from "stores/cache";

const API = "https://roveme.dev/api";

var ArticleStorage = Reflux.createStore({
  getArticle(index, asynchFlag, cacheObj = cache){
    let prefix = "id=";
    let key = prefix + index;

    return asynchFlag ?
            fetch(`http://localhost:8080/mock/text${index}.json`)
                .then(response => {
                  if (response.status >= 400) {throw new Error("Bad response from server"); }
                  return response.json();
                })
                .then(data => cacheObj[key] = data)
            : cache[key] || {};
  }
});

export default ArticleStorage;