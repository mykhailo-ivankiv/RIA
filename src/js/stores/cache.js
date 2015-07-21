var cacheOjb =  typeof cache !== "undefined" ? cache : {};

export var setupCache = cache => {

  cacheOjb = cache;
}

export var getCache = () => cacheOjb;