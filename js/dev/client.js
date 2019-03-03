function get(Store) {
  return componentDefId => field => {
    Store.methods.subscribe(componentDefId, field);
    return Store.objects.observables[field];
  };
}

function subscribe(Store) {
  return (componentDefId, observable) => {
    const findListener = Store.objects.listeners.find(item => item.observable === observable);
    if (!findListener) return console.log(`Listener not found on observable ${observable}`);
    const currentListeners = findListener.components;
    const isSubscribed = currentListeners.find(item => item.registerNumber === componentDefId);
    if (!isSubscribed) currentListeners.push({
      registerNumber: componentDefId
    });
  };
}

const isPlainValue = v => ['string', 'number', 'boolean'].includes(typeof v);

const wasChanged = (v1, v2) => v1 !== v2;

const shouldNotify = (pv, nv) => !isPlainValue(nv) || isPlainValue(nv) && wasChanged(pv, nv);

function set(Store) {
  return (object, options = {}) => {
    if (!object) return;
    const {
      dynamic = false,
      timeout = 0
    } = options;
    Object.keys(object).forEach(key => {
      const previousValue = Store.objects.observables[key];
      const previousValueClone = Array.isArray(previousValue) ? [...previousValue] : typeof previousValue === 'object' ? { ...previousValue
      } : previousValue;
      const nextValue = typeof object[key] === 'function' ? object[key](previousValueClone) : object[key];

      if (typeof previousValue !== typeof nextValue && !dynamic) {
        console.warn(`Type does not match previous type in ${key}`);
      } else if (shouldNotify(previousValue, nextValue)) {
        setTimeout(() => {
          Store.objects.observables[key] = nextValue;
          Store.methods.notify(key);
        }, timeout);
      }
    });
  };
}

function setItem(Store) {
  return (observable, item) => {
    const findIndex = Store.objects.observables[observable].findIndex(x => x.id === item.id);
    Store.objects.observables[observable][findIndex] = item;
    Store.methods.notify(observable);
  };
}

function toggle(Store) {
  return (observable, cb) => {
    const currentValue = Store.objects.observables[observable];

    if (typeof currentValue === 'undefined') {
      console.warn(`Observable [${observable}] does not exists.`);
    } else if (typeof currentValue !== 'boolean') {
      console.warn(`Observable [${observable}] is not a boolean.`);
    } else {
      Store.methods.set({
        [observable]: !currentValue
      });
      if (cb) cb(!currentValue);
    }
  };
}

function notify(Store) {
  return observable => {
    // Notify computed
    if (observable) {
      Object.keys(Store.objects.computed).forEach(key => {
        const {
          take
        } = Store.objects.computed[key];
        if (take.includes(observable)) Store.methods.compute(key);
      });
    } // Notify root component (morphdom handles diffing)


    if (Store.objects.flags.IS_MOUNTED) Store.render.update(); // const findListener = Store.objects.listeners.find(item => item.observable === observable);
    // if (findListener && findListener.components) {
    //   findListener.components.forEach(item => {
    //     const { registerNumber } = item;
    //     const componentDefinition = Store.objects.components[registerNumber];
    //     componentDefinition._update();
    //   });
    // }
  };
}

function compute(Store) {
  return key => {
    const {
      take,
      calc
    } = Store.objects.computed[key];
    const values = take.map(field => Store.objects.observables[field]);
    Store.objects.observables[key] = calc(...values);
  };
}

function computeAll(Store) {
  return () => {
    Object.keys(Store.objects.computed).forEach(key => {
      Store.methods.compute(key);
    });
  };
}

function emit(Store) {
  return (eventStr, cbProps) => {
    if (eventStr === 'MOUNTED') Store.objects.flags.IS_MOUNTED = true;
    const reactions = Store.objects.reactions.filter(item => {
      if (item.keepAlive) return item.eventStr === eventStr;
      return item.eventStr === eventStr && !item.done;
    });
    reactions.forEach(reaction => {
      reaction.done = true;
      reaction.callback(cbProps);
    });
  };
}

function on(Store) {
  return (eventStr, callback) => {
    Store.objects.reactions.push({
      eventStr,
      callback,
      keepAlive: true
    });
  };
}

function once(Store) {
  return (eventStr, callback) => {
    Store.objects.reactions.push({
      eventStr,
      callback,
      done: false
    });
  };
}

function check(Store, checks) {
  return (name, str) => {
    const {
      result,
      message
    } = checks[name](str);
    return {
      result,
      message
    };
  };
}

function alertOn(Store, alerts) {
  return (obj = {}) => {
    const rand1000 = Math.floor(1000 * Math.random());
    const timestamp = Date.now();
    const _id = `${timestamp}--${rand1000}`;
    const message = obj.name ? alerts[obj.name] : obj.message || 'Alert message not defined';
    Store.objects.alerts.push({
      _id,
      ...obj,
      message,
      timestamp,
      isVisible: true
    }); // Maybe later we are going to notify only the exact component using alerts

    Store.methods.notify(null);

    if (obj.timeout) {
      setTimeout(() => {
        Store.methods.alertOff({
          _id
        });
      }, obj.timeout);
    }
  };
}

function alertOff(Store) {
  return ({
    _id
  }) => {
    const findAlert = Store.objects.alerts.find(item => item._id === _id);

    if (findAlert) {
      findAlert.isVisible = false; // Maybe later we are going to notify only the exact component using alerts

      Store.methods.notify(null);
    }
  };
}

function callServer(Store) {
  return (method, args = {}) => {
    // For each query string parameter sent, add it to the path
    // const requestUrl = Object.keys(queryStringObject).reduce((acum, key, index) => {
    //   const queryStr = `${key}=${queryStringObject[key]}`;
    //   if (index === 0) return `${acum}?${queryStr}`;
    //   return `${acum}&${queryStr}`;
    // }, `${baseUrl}/${path}`);
    return new Promise((resolve, reject) => {
      // Form the http request as a JSON type
      const xhr = new window.XMLHttpRequest();
      xhr.open('POST', `${Store.router.siteUrl}/api/methods`, true);
      xhr.setRequestHeader('Content-type', 'application/json'); // For each header sent, add it to the request
      // Object.keys(headers).forEach(key => {
      //   xhr.setRequestHeader(key, headers[key]);
      // });
      // When the request comes back, handle the response

      xhr.onreadystatechange = () => {
        if (xhr.readyState === window.XMLHttpRequest.DONE) {
          const statusCode = xhr.status;
          if (![200, 201].includes(statusCode)) return reject('XHR request failed');
          const responseReturned = xhr.responseText;
          return resolve(JSON.parse(responseReturned));
        }
      }; // Send the payload as JSON


      const payloadString = JSON.stringify({
        method,
        args
      });
      xhr.send(payloadString);
    });
  };
}

function route(Store) {
  return (page, complement) => {
    const {
      moduleName,
      routes,
      ports,
      isProduction,
      baseUrl
    } = Store.router.appData;
    const urlToGo = complement ? `${page}${complement}` : page; // If page is on same service we use history object and just replace it

    const findPageModule = Object.keys(routes).reduce((acum, key) => {
      if (routes[key].includes(page)) return key;
      return acum;
    }, false);

    if (findPageModule && findPageModule === moduleName) {
      window.history.replaceState(null, null, urlToGo);
    } else {
      // Otherwise, in development we need to consider the right port
      const url = isProduction ? `/${urlToGo}` : `https://${baseUrl}:${ports[findPageModule].http}/${urlToGo}`;
      window.location.replace(url);
    }
  };
}

const noop = () => undefined;

function addToQueue(Store) {
  return ({
    name,
    steps,
    onError
  }) => {
    const _id = Date.now();

    const objToQueue = {
      _id,
      name,
      steps,
      done: false,
      onError: onError || noop
    };
    Store.process.queue.splice(0, 0, objToQueue); // ads into the first element

    Store.process.runTask({
      _id
    });
  };
}

function callProcesses(Store, actions) {
  if (!actions) return () => undefined; // Reduced version of the store is available for actions

  const store = {
    get: name => Store.objects.observables[name],
    set: Store.methods.set,
    addAlert: Store.methods.alertOn,
    callServer: Store.methods.callServer,
    route: Store.router.route,
    uid: Store.utils.uid
  };
  const processes = Object.keys(actions).reduce((acum, key) => {
    const singleAction = actions[key];
    return { ...acum,
      [key]: args => {
        Store.process.addToQueue({
          name: key,
          ...singleAction(store)(args)
        });
      }
    };
  }, {});
  return (name, args) => processes[name](args);
}

function processor()
/* Store */
{
  return ({
    steps,
    onError
  }) => {
    // Promise execution
    let proceed = true;
    steps.reduce((p, fn) => {
      return p.then(res => {
        if (proceed) return fn(res);
      }).catch(err => {
        proceed = false;
        console.log('processPromiseChain ERROR -----------------> ', err);
        onError(err);
      });
    }, Promise.resolve({}));
  };
}

function runTask(Store) {
  return ({
    _id
  }) => {
    const task = Store.process.queue.find(item => item._id === _id);
    Store.process.processor(task);
    task.done = true;
  };
}

function mount(Store) {
  return () => {
    const {
      rootComponent,
      client
    } = Store.render;
    const rootNode = rootComponent(client)();
    document.body.innerHTML = '';
    document.body.appendChild(rootNode);
  };
}

var range; // Create a range object for efficently rendering strings to elements.

var NS_XHTML = 'http://www.w3.org/1999/xhtml';
var doc = typeof document === 'undefined' ? undefined : document;
var testEl = doc ? doc.body || doc.createElement('div') : {}; // Fixes <https://github.com/patrick-steele-idem/morphdom/issues/32>
// (IE7+ support) <=IE7 does not support el.hasAttribute(name)

var actualHasAttributeNS;

if (testEl.hasAttributeNS) {
  actualHasAttributeNS = function (el, namespaceURI, name) {
    return el.hasAttributeNS(namespaceURI, name);
  };
} else if (testEl.hasAttribute) {
  actualHasAttributeNS = function (el, namespaceURI, name) {
    return el.hasAttribute(name);
  };
} else {
  actualHasAttributeNS = function (el, namespaceURI, name) {
    return el.getAttributeNode(namespaceURI, name) != null;
  };
}

var hasAttributeNS = actualHasAttributeNS;

function toElement(str) {
  if (!range && doc.createRange) {
    range = doc.createRange();
    range.selectNode(doc.body);
  }

  var fragment;

  if (range && range.createContextualFragment) {
    fragment = range.createContextualFragment(str);
  } else {
    fragment = doc.createElement('body');
    fragment.innerHTML = str;
  }

  return fragment.childNodes[0];
}
/**
 * Returns true if two node's names are the same.
 *
 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
 *       nodeName and different namespace URIs.
 *
 * @param {Element} a
 * @param {Element} b The target element
 * @return {boolean}
 */


function compareNodeNames(fromEl, toEl) {
  var fromNodeName = fromEl.nodeName;
  var toNodeName = toEl.nodeName;

  if (fromNodeName === toNodeName) {
    return true;
  }

  if (toEl.actualize && fromNodeName.charCodeAt(0) < 91 &&
  /* from tag name is upper case */
  toNodeName.charCodeAt(0) > 90
  /* target tag name is lower case */
  ) {
      // If the target element is a virtual DOM node then we may need to normalize the tag name
      // before comparing. Normal HTML elements that are in the "http://www.w3.org/1999/xhtml"
      // are converted to upper case
      return fromNodeName === toNodeName.toUpperCase();
    } else {
    return false;
  }
}
/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 */


function createElementNS(name, namespaceURI) {
  return !namespaceURI || namespaceURI === NS_XHTML ? doc.createElement(name) : doc.createElementNS(namespaceURI, name);
}
/**
 * Copies the children of one DOM element to another DOM element
 */


function moveChildren(fromEl, toEl) {
  var curChild = fromEl.firstChild;

  while (curChild) {
    var nextChild = curChild.nextSibling;
    toEl.appendChild(curChild);
    curChild = nextChild;
  }

  return toEl;
}

function morphAttrs(fromNode, toNode) {
  var attrs = toNode.attributes;
  var i;
  var attr;
  var attrName;
  var attrNamespaceURI;
  var attrValue;
  var fromValue;

  for (i = attrs.length - 1; i >= 0; --i) {
    attr = attrs[i];
    attrName = attr.name;
    attrNamespaceURI = attr.namespaceURI;
    attrValue = attr.value;

    if (attrNamespaceURI) {
      attrName = attr.localName || attrName;
      fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);

      if (fromValue !== attrValue) {
        fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
      }
    } else {
      fromValue = fromNode.getAttribute(attrName);

      if (fromValue !== attrValue) {
        fromNode.setAttribute(attrName, attrValue);
      }
    }
  } // Remove any extra attributes found on the original DOM element that
  // weren't found on the target element.


  attrs = fromNode.attributes;

  for (i = attrs.length - 1; i >= 0; --i) {
    attr = attrs[i];

    if (attr.specified !== false) {
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;

      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;

        if (!hasAttributeNS(toNode, attrNamespaceURI, attrName)) {
          fromNode.removeAttributeNS(attrNamespaceURI, attrName);
        }
      } else {
        if (!hasAttributeNS(toNode, null, attrName)) {
          fromNode.removeAttribute(attrName);
        }
      }
    }
  }
}

function syncBooleanAttrProp(fromEl, toEl, name) {
  if (fromEl[name] !== toEl[name]) {
    fromEl[name] = toEl[name];

    if (fromEl[name]) {
      fromEl.setAttribute(name, '');
    } else {
      fromEl.removeAttribute(name, '');
    }
  }
}

var specialElHandlers = {
  /**
   * Needed for IE. Apparently IE doesn't think that "selected" is an
   * attribute when reading over the attributes using selectEl.attributes
   */
  OPTION: function (fromEl, toEl) {
    syncBooleanAttrProp(fromEl, toEl, 'selected');
  },

  /**
   * The "value" attribute is special for the <input> element since it sets
   * the initial value. Changing the "value" attribute without changing the
   * "value" property will have no effect since it is only used to the set the
   * initial value.  Similar for the "checked" attribute, and "disabled".
   */
  INPUT: function (fromEl, toEl) {
    syncBooleanAttrProp(fromEl, toEl, 'checked');
    syncBooleanAttrProp(fromEl, toEl, 'disabled');

    if (fromEl.value !== toEl.value) {
      fromEl.value = toEl.value;
    }

    if (!hasAttributeNS(toEl, null, 'value')) {
      fromEl.removeAttribute('value');
    }
  },
  TEXTAREA: function (fromEl, toEl) {
    var newValue = toEl.value;

    if (fromEl.value !== newValue) {
      fromEl.value = newValue;
    }

    var firstChild = fromEl.firstChild;

    if (firstChild) {
      // Needed for IE. Apparently IE sets the placeholder as the
      // node value and vise versa. This ignores an empty update.
      var oldValue = firstChild.nodeValue;

      if (oldValue == newValue || !newValue && oldValue == fromEl.placeholder) {
        return;
      }

      firstChild.nodeValue = newValue;
    }
  },
  SELECT: function (fromEl, toEl) {
    if (!hasAttributeNS(toEl, null, 'multiple')) {
      var i = 0;
      var curChild = toEl.firstChild;

      while (curChild) {
        var nodeName = curChild.nodeName;

        if (nodeName && nodeName.toUpperCase() === 'OPTION') {
          if (hasAttributeNS(curChild, null, 'selected')) {
            break;
          }

          i++;
        }

        curChild = curChild.nextSibling;
      }

      fromEl.selectedIndex = i;
    }
  }
};
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

function noop$1() {}

function defaultGetNodeKey(node) {
  return node.id;
}

function morphdomFactory(morphAttrs) {
  return function morphdom(fromNode, toNode, options) {
    if (!options) {
      options = {};
    }

    if (typeof toNode === 'string') {
      if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
        var toNodeHtml = toNode;
        toNode = doc.createElement('html');
        toNode.innerHTML = toNodeHtml;
      } else {
        toNode = toElement(toNode);
      }
    }

    var getNodeKey = options.getNodeKey || defaultGetNodeKey;
    var onBeforeNodeAdded = options.onBeforeNodeAdded || noop$1;
    var onNodeAdded = options.onNodeAdded || noop$1;
    var onBeforeElUpdated = options.onBeforeElUpdated || noop$1;
    var onElUpdated = options.onElUpdated || noop$1;
    var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop$1;
    var onNodeDiscarded = options.onNodeDiscarded || noop$1;
    var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop$1;
    var childrenOnly = options.childrenOnly === true; // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.

    var fromNodesLookup = {};
    var keyedRemovalList;

    function addKeyedRemoval(key) {
      if (keyedRemovalList) {
        keyedRemovalList.push(key);
      } else {
        keyedRemovalList = [key];
      }
    }

    function walkDiscardedChildNodes(node, skipKeyedNodes) {
      if (node.nodeType === ELEMENT_NODE) {
        var curChild = node.firstChild;

        while (curChild) {
          var key = undefined;

          if (skipKeyedNodes && (key = getNodeKey(curChild))) {
            // If we are skipping keyed nodes then we add the key
            // to a list so that it can be handled at the very end.
            addKeyedRemoval(key);
          } else {
            // Only report the node as discarded if it is not keyed. We do this because
            // at the end we loop through all keyed elements that were unmatched
            // and then discard them in one final pass.
            onNodeDiscarded(curChild);

            if (curChild.firstChild) {
              walkDiscardedChildNodes(curChild, skipKeyedNodes);
            }
          }

          curChild = curChild.nextSibling;
        }
      }
    }
    /**
     * Removes a DOM node out of the original DOM
     *
     * @param  {Node} node The node to remove
     * @param  {Node} parentNode The nodes parent
     * @param  {Boolean} skipKeyedNodes If true then elements with keys will be skipped and not discarded.
     * @return {undefined}
     */


    function removeNode(node, parentNode, skipKeyedNodes) {
      if (onBeforeNodeDiscarded(node) === false) {
        return;
      }

      if (parentNode) {
        parentNode.removeChild(node);
      }

      onNodeDiscarded(node);
      walkDiscardedChildNodes(node, skipKeyedNodes);
    } // // TreeWalker implementation is no faster, but keeping this around in case this changes in the future
    // function indexTree(root) {
    //     var treeWalker = document.createTreeWalker(
    //         root,
    //         NodeFilter.SHOW_ELEMENT);
    //
    //     var el;
    //     while((el = treeWalker.nextNode())) {
    //         var key = getNodeKey(el);
    //         if (key) {
    //             fromNodesLookup[key] = el;
    //         }
    //     }
    // }
    // // NodeIterator implementation is no faster, but keeping this around in case this changes in the future
    //
    // function indexTree(node) {
    //     var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT);
    //     var el;
    //     while((el = nodeIterator.nextNode())) {
    //         var key = getNodeKey(el);
    //         if (key) {
    //             fromNodesLookup[key] = el;
    //         }
    //     }
    // }


    function indexTree(node) {
      if (node.nodeType === ELEMENT_NODE) {
        var curChild = node.firstChild;

        while (curChild) {
          var key = getNodeKey(curChild);

          if (key) {
            fromNodesLookup[key] = curChild;
          } // Walk recursively


          indexTree(curChild);
          curChild = curChild.nextSibling;
        }
      }
    }

    indexTree(fromNode);

    function handleNodeAdded(el) {
      onNodeAdded(el);
      var curChild = el.firstChild;

      while (curChild) {
        var nextSibling = curChild.nextSibling;
        var key = getNodeKey(curChild);

        if (key) {
          var unmatchedFromEl = fromNodesLookup[key];

          if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
            curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
            morphEl(unmatchedFromEl, curChild);
          }
        }

        handleNodeAdded(curChild);
        curChild = nextSibling;
      }
    }

    function morphEl(fromEl, toEl, childrenOnly) {
      var toElKey = getNodeKey(toEl);
      var curFromNodeKey;

      if (toElKey) {
        // If an element with an ID is being morphed then it is will be in the final
        // DOM so clear it out of the saved elements collection
        delete fromNodesLookup[toElKey];
      }

      if (toNode.isSameNode && toNode.isSameNode(fromNode)) {
        return;
      }

      if (!childrenOnly) {
        if (onBeforeElUpdated(fromEl, toEl) === false) {
          return;
        }

        morphAttrs(fromEl, toEl);
        onElUpdated(fromEl);

        if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
          return;
        }
      }

      if (fromEl.nodeName !== 'TEXTAREA') {
        var curToNodeChild = toEl.firstChild;
        var curFromNodeChild = fromEl.firstChild;
        var curToNodeKey;
        var fromNextSibling;
        var toNextSibling;
        var matchingFromEl;

        outer: while (curToNodeChild) {
          toNextSibling = curToNodeChild.nextSibling;
          curToNodeKey = getNodeKey(curToNodeChild);

          while (curFromNodeChild) {
            fromNextSibling = curFromNodeChild.nextSibling;

            if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
              curToNodeChild = toNextSibling;
              curFromNodeChild = fromNextSibling;
              continue outer;
            }

            curFromNodeKey = getNodeKey(curFromNodeChild);
            var curFromNodeType = curFromNodeChild.nodeType;
            var isCompatible = undefined;

            if (curFromNodeType === curToNodeChild.nodeType) {
              if (curFromNodeType === ELEMENT_NODE) {
                // Both nodes being compared are Element nodes
                if (curToNodeKey) {
                  // The target node has a key so we want to match it up with the correct element
                  // in the original DOM tree
                  if (curToNodeKey !== curFromNodeKey) {
                    // The current element in the original DOM tree does not have a matching key so
                    // let's check our lookup to see if there is a matching element in the original
                    // DOM tree
                    if (matchingFromEl = fromNodesLookup[curToNodeKey]) {
                      if (curFromNodeChild.nextSibling === matchingFromEl) {
                        // Special case for single element removals. To avoid removing the original
                        // DOM node out of the tree (since that can break CSS transitions, etc.),
                        // we will instead discard the current node and wait until the next
                        // iteration to properly match up the keyed target element with its matching
                        // element in the original tree
                        isCompatible = false;
                      } else {
                        // We found a matching keyed element somewhere in the original DOM tree.
                        // Let's moving the original DOM node into the current position and morph
                        // it.
                        // NOTE: We use insertBefore instead of replaceChild because we want to go through
                        // the `removeNode()` function for the node that is being discarded so that
                        // all lifecycle hooks are correctly invoked
                        fromEl.insertBefore(matchingFromEl, curFromNodeChild);
                        fromNextSibling = curFromNodeChild.nextSibling;

                        if (curFromNodeKey) {
                          // Since the node is keyed it might be matched up later so we defer
                          // the actual removal to later
                          addKeyedRemoval(curFromNodeKey);
                        } else {
                          // NOTE: we skip nested keyed nodes from being removed since there is
                          //       still a chance they will be matched up later
                          removeNode(curFromNodeChild, fromEl, true
                          /* skip keyed nodes */
                          );
                        }

                        curFromNodeChild = matchingFromEl;
                      }
                    } else {
                      // The nodes are not compatible since the "to" node has a key and there
                      // is no matching keyed node in the source tree
                      isCompatible = false;
                    }
                  }
                } else if (curFromNodeKey) {
                  // The original has a key
                  isCompatible = false;
                }

                isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);

                if (isCompatible) {
                  // We found compatible DOM elements so transform
                  // the current "from" node to match the current
                  // target DOM node.
                  morphEl(curFromNodeChild, curToNodeChild);
                }
              } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                // Both nodes being compared are Text or Comment nodes
                isCompatible = true; // Simply update nodeValue on the original node to
                // change the text value

                if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                  curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                }
              }
            }

            if (isCompatible) {
              // Advance both the "to" child and the "from" child since we found a match
              curToNodeChild = toNextSibling;
              curFromNodeChild = fromNextSibling;
              continue outer;
            } // No compatible match so remove the old node from the DOM and continue trying to find a
            // match in the original DOM. However, we only do this if the from node is not keyed
            // since it is possible that a keyed node might match up with a node somewhere else in the
            // target tree and we don't want to discard it just yet since it still might find a
            // home in the final DOM tree. After everything is done we will remove any keyed nodes
            // that didn't find a home


            if (curFromNodeKey) {
              // Since the node is keyed it might be matched up later so we defer
              // the actual removal to later
              addKeyedRemoval(curFromNodeKey);
            } else {
              // NOTE: we skip nested keyed nodes from being removed since there is
              //       still a chance they will be matched up later
              removeNode(curFromNodeChild, fromEl, true
              /* skip keyed nodes */
              );
            }

            curFromNodeChild = fromNextSibling;
          } // If we got this far then we did not find a candidate match for
          // our "to node" and we exhausted all of the children "from"
          // nodes. Therefore, we will just append the current "to" node
          // to the end


          if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
            fromEl.appendChild(matchingFromEl);
            morphEl(matchingFromEl, curToNodeChild);
          } else {
            var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);

            if (onBeforeNodeAddedResult !== false) {
              if (onBeforeNodeAddedResult) {
                curToNodeChild = onBeforeNodeAddedResult;
              }

              if (curToNodeChild.actualize) {
                curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
              }

              fromEl.appendChild(curToNodeChild);
              handleNodeAdded(curToNodeChild);
            }
          }

          curToNodeChild = toNextSibling;
          curFromNodeChild = fromNextSibling;
        } // We have processed all of the "to nodes". If curFromNodeChild is
        // non-null then we still have some from nodes left over that need
        // to be removed


        while (curFromNodeChild) {
          fromNextSibling = curFromNodeChild.nextSibling;

          if (curFromNodeKey = getNodeKey(curFromNodeChild)) {
            // Since the node is keyed it might be matched up later so we defer
            // the actual removal to later
            addKeyedRemoval(curFromNodeKey);
          } else {
            // NOTE: we skip nested keyed nodes from being removed since there is
            //       still a chance they will be matched up later
            removeNode(curFromNodeChild, fromEl, true
            /* skip keyed nodes */
            );
          }

          curFromNodeChild = fromNextSibling;
        }
      }

      var specialElHandler = specialElHandlers[fromEl.nodeName];

      if (specialElHandler) {
        specialElHandler(fromEl, toEl);
      }
    } // END: morphEl(...)


    var morphedNode = fromNode;
    var morphedNodeType = morphedNode.nodeType;
    var toNodeType = toNode.nodeType;

    if (!childrenOnly) {
      // Handle the case where we are given two DOM nodes that are not
      // compatible (e.g. <div> --> <span> or <div> --> TEXT)
      if (morphedNodeType === ELEMENT_NODE) {
        if (toNodeType === ELEMENT_NODE) {
          if (!compareNodeNames(fromNode, toNode)) {
            onNodeDiscarded(fromNode);
            morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
          }
        } else {
          // Going from an element node to a text node
          morphedNode = toNode;
        }
      } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) {
        // Text or comment node
        if (toNodeType === morphedNodeType) {
          if (morphedNode.nodeValue !== toNode.nodeValue) {
            morphedNode.nodeValue = toNode.nodeValue;
          }

          return morphedNode;
        } else {
          // Text node to something else
          morphedNode = toNode;
        }
      }
    }

    if (morphedNode === toNode) {
      // The "to node" was not compatible with the "from node" so we had to
      // toss out the "from node" and use the "to node"
      onNodeDiscarded(fromNode);
    } else {
      morphEl(morphedNode, toNode, childrenOnly); // We now need to loop over any keyed nodes that might need to be
      // removed. We only do the removal if we know that the keyed node
      // never found a match. When a keyed node is matched up we remove
      // it out of fromNodesLookup and we use fromNodesLookup to determine
      // if a keyed node has been matched up or not

      if (keyedRemovalList) {
        for (var i = 0, len = keyedRemovalList.length; i < len; i++) {
          var elToRemove = fromNodesLookup[keyedRemovalList[i]];

          if (elToRemove) {
            removeNode(elToRemove, elToRemove.parentNode, false);
          }
        }
      }
    }

    if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
      if (morphedNode.actualize) {
        morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
      } // If we had to swap out the from node with a new node because the old
      // node was not compatible with the target node then we need to
      // replace the old DOM node in the original DOM tree. This is only
      // possible if the original DOM node was part of a DOM tree which
      // we know is the case if it has a parent node.


      fromNode.parentNode.replaceChild(morphedNode, fromNode);
    }

    return morphedNode;
  };
}

var morphdom = morphdomFactory(morphAttrs);
var morphdom_1 = morphdom;

function update(Store) {
  return () => {
    const {
      rootComponent,
      client,
      rootNodeId,
      Events
    } = Store.render;
    const EventsKeys = Object.keys(Events);
    const newRootNode = rootComponent(client)();
    const currentRootNode = document.getElementById(rootNodeId);
    morphdom_1(currentRootNode, newRootNode, {
      onBeforeElUpdated(fromEl, toEl) {
        if (fromEl.id) console.log(fromEl.id);
        EventsKeys.forEach(key => {
          // Always update event handlers after each render
          if (fromEl[key]) fromEl[key] = toEl[key];
        });
      },

      onBeforeNodeDiscarded(node) {
        if (node.tagName && node.tagName.toLowerCase() === 'iframe') return false;
      }

    });
  };
}

var globals = {
  SYSTEM_DB_USER_ID: '0000000-system-000000',
  WINDOW_APP_DATA: '__appData__',
  GET_MODEL_DATA_METHOD: '@server-model.getData'
};

function getDataFromServer(Store) {
  return args => {
    const {
      instance = null,
      user_id,
      lastTimestamp = 0,
      localEntitiesIds = []
    } = args;
    const requestArgs = {
      user_id,
      lastTimestamp,
      localEntitiesIds
    };
    return new Promise((resolve, reject) => {
      // Special method available ony for internal libs
      Store.methods.callServer(globals.GET_MODEL_DATA_METHOD, requestArgs).then(items => {
        if (!items) reject('Could not get data from server');
        const newTimestamp = Date.now();
        resolve({
          instance,
          items,
          newTimestamp
        });
      }).catch(reject);
    });
  };
}

function syncDataToDB({
  instance,
  items,
  newTimestamp
}) {
  let counter = 0;
  return new Promise(resolve => {
    if (items.length === 0) resolve({
      instance,
      counter,
      newTimestamp
    });
    const modelStore = instance.transaction(['model'], 'readwrite').objectStore('model');
    const requestPrevRecords = modelStore.getAll();

    requestPrevRecords.onsuccess = () => {
      const previousRecords = requestPrevRecords.result;
      items.forEach(item => {
        if (item.attrs.length > 0) {
          const findRecord = previousRecords.find(rec => rec._id === item._id);
          const putRequest = modelStore.put({
            _id: item._id,
            domain: item.domain,
            attrs: findRecord ? [...findRecord.attrs, ...item.attrs] : item.attrs
          });

          putRequest.onsuccess = () => {
            counter++;
            if (counter === items.length) resolve({
              instance,
              counter,
              newTimestamp
            });
          };
        }
      });
    };
  });
}

function getDBMetadata({
  instance,
  user_id
}) {
  return new Promise((resolve, reject) => {
    const controlStore = instance.transaction('control').objectStore('control');
    const requestControlRecords = controlStore.getAll();

    requestControlRecords.onsuccess = () => {
      const controlRecords = requestControlRecords.result || [];
      const lastTimestamp = controlRecords.length > 0 ? controlRecords[controlRecords.length - 1].lastTimestamp : 0;
      const modelStore = instance.transaction('model').objectStore('model');
      const requestModelKeys = modelStore.getAllKeys();

      requestModelKeys.onsuccess = () => {
        const localEntitiesIds = requestModelKeys.result || [];
        resolve({
          instance,
          user_id,
          lastTimestamp,
          localEntitiesIds
        });
      };

      requestModelKeys.onerror = () => reject('Error getting Model Keys');
    };

    requestControlRecords.onerror = () => reject('Error getting Control Records');
  });
}

function updateDBControl({
  instance,
  counter,
  newTimestamp
}) {
  return new Promise(resolve => {
    const controlStore = instance.transaction(['control'], 'readwrite').objectStore('control');
    const putRequest = controlStore.put({
      _id: newTimestamp,
      lastTimestamp: newTimestamp,
      counter
    });

    putRequest.onsuccess = () => {
      resolve({
        instance
      });
    };
  });
}

function getModelData({
  instance
}) {
  return new Promise(resolve => {
    const modelStore = instance.transaction('model').objectStore('model');
    const requestRecords = modelStore.getAll();

    requestRecords.onsuccess = () => {
      return resolve(requestRecords.result);
    };
  });
}

function start(Store, {
  name,
  version,
  user_id
}) {
  const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB; // No indexedDB, we just request all data always

  if (!indexedDB) {
    return new Promise((resolve, reject) => {
      getDataFromServer({
        user_id
      }).then(({
        items
      }) => resolve(items)).catch(reject);
    });
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version);

    request.onsuccess = () => resolve({
      instance: request.result,
      user_id
    });

    request.onerror = () => reject(request.error);

    request.onupgradeneeded = e => {
      const instance = e.target.result;
      instance.model = instance.createObjectStore('model', {
        keyPath: '_id'
      });
      instance.control = instance.createObjectStore('control', {
        keyPath: '_id'
      });
    };
  }).then(getDBMetadata).then(getDataFromServer(Store)).then(syncDataToDB).then(updateDBControl).then(getModelData).catch(console.log);
}

function getCurrentAttrs(attrs) {
  return attrs.reduce((acum, item) => {
    const {
      key,
      value,
      timestamp
    } = item;
    /*      value:        is always what is displayed at the UI, used in calculations, etc.        can be in 2 status      status:        0: value is "optimistic" and has not been validated yet by the server        1: value coherent with the server initial load,        2: optimistic value that was confirmed by the server        3: value that came from the server through web-sockets      dbValue:        is the last value that was confirmed by the server        if null indicates that the whole record is not confirmed yet      timestamp:        is the timestamp that reflects the last status coming from the server    */

    if (!acum[key]) acum[key] = {
      value,
      dbValue: value,
      status: 1,
      timestamp
    };
    return { ...acum,
      [key]: timestamp > acum[key].timestamp ? {
        value,
        dbValue: value,
        status: 1,
        timestamp
      } : acum[key]
    };
  }, {});
}

function hydrate(Store) {
  return data => {
    if (data.length > 0) {
      Store.db.data = data.reduce((acum, item) => {
        const {
          _id,
          domain,
          attrs
        } = item;
        if (!acum[domain]) acum[domain] = [];
        return { ...acum,
          [domain]: [...acum[domain], {
            _id,
            attrs: getCurrentAttrs(attrs)
          }]
        };
      }, {}); // Renders the defaultComponent (Container)

      if (Store.objects.flags.IS_MOUNTED) Store.render.update();
    }
  };
}

function query(Store) {
  return domain => {
    if (!Store.db.data) return [];
    return Store.db.data[domain] || [];
  };
}

function initSocket({
  socketUrl,
  user_id,
  onMessage
}) {
  if (!socketUrl) {
    console.log('SocketUrl not defined');
    return () => undefined;
  }

  const wsSupport = 'WebSocket' in window;

  if (!wsSupport) {
    console.log('WebSocket not supported');
    return () => undefined;
  }

  const ws = new window.WebSocket(socketUrl);

  const sendJSON = obj => ws.send(JSON.stringify(obj));

  ws.onopen = () => {
    console.log('WebSocket opened'); // tell the server user_id is connected

    if (user_id) sendJSON({
      user_id,
      isInitial: true
    });
  };

  ws.onclose = x => console.log('WebSocket closed', x);

  ws.onmessage = obj => {
    onMessage(JSON.parse(obj.data));
  };

  return sendJSON;
}

function onMessage(Store) {
  return payload => {
    const {
      data,
      isInitial
    } = payload;
    if (isInitial) console.log('Socket first message --> ', payload);

    if (data) {
      const {
        _id,
        domain,
        attrs
      } = data;
      if (!Store.db.data[domain]) Store.db.data[domain] = [];
      const findEntity = Store.db.data[domain].find(item => item._id === _id);

      if (!findEntity) {
        // Create entity
        Store.db.data[domain].push({
          _id,
          attrs: attrs.reduce((acum, item) => {
            const {
              key,
              value,
              timestamp
            } = item;
            return { ...acum,
              [key]: {
                value,
                dbValue: value,
                status: 3,
                timestamp
              }
            };
          }, {})
        });
      } else {
        // Update entity
        attrs.forEach(item => {
          const {
            key,
            value,
            timestamp
          } = item;
          findEntity.attrs[key] = {
            value,
            dbValue: value,
            status: 3,
            timestamp
          };
        });
      }

      Store.methods.render();
    }
  };
}

function connectStoreToServer(Store, {
  user_id
}) {
  /* ----------------------------------------------------------------------------------------------    Initialize sockets  ---------------------------------------------------------------------------------------------- */
  const sendJSON = initSocket({
    socketUrl: Store.router.socketUrl,
    user_id,
    onMessage: onMessage(Store)
  });
  Store.sockets = {
    sendJSON
  };
  /* ----------------------------------------------------------------------------------------------    Initialize db  ---------------------------------------------------------------------------------------------- */

  Store.db = {
    data: null,
    // already transformed and living free after initialization
    query: query(Store)
  };
  return start(Store, {
    name: 'asyncDB',
    version: 1,
    user_id
  }).then(hydrate(Store)).catch(console.log);
}

function startApp(Store) {
  return ({
    appData,
    client
  }) => {
    const {
      currentPage,
      query,
      baseUrl,
      // baseFolder,
      moduleName,
      ports,
      isProduction,
      useServiceWorker
    } = appData;
    Store.router.appData = appData;
    Store.router.siteUrl = isProduction ? `https://${baseUrl}` // ? `https://${baseUrl}/${baseFolder}`
    : `https://${baseUrl}:${ports[moduleName].http}`;
    Store.router.socketUrl = !ports[moduleName].socket ? null : isProduction ? `wss://${baseUrl}` // ? `wss://${baseUrl}/${baseFolder}`
    : `ws://${baseUrl}:${ports[moduleName].socket}`;
    /* ------------------------------------------------------------------------------------------------  Register Service Worker------------------------------------------------------------------------------------------------ */

    if (useServiceWorker && 'serviceWorker' in window.navigator) {
      const swFolder = isProduction ? 'prod' : 'dev';
      window.navigator.serviceWorker.register(`js/${swFolder}/sw.js`, {
        scope: '/'
      }).then(registration => {
        console.log('Service Worker registration OK!', registration);
      }).catch(error => {
        console.log('Service Worker registration FAILED', error);
      });
    }
    /* ------------------------------------------------------------------------------------------------  First Render && Connect to Server data------------------------------------------------------------------------------------------------ */


    if (currentPage) Store.methods.set({
      currentPage
    });
    if (query.user) Store.methods.set({
      user_id: query.user
    });
    connectStoreToServer(Store, {
      user_id: query.user
    }).then(() => {
      Store.render.client = client;
      Store.render.mount();
      Store.methods.emit('MOUNTED');
    });
  };
}

function registerComponent(Store) {
  return componentDef => {
    Store.render.components[componentDef.id] = componentDef;
  };
}

function uid(strLength = 6) {
  const now = String(Date.now());
  const middlePos = Math.ceil(now.length / 2);
  const availableChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const availableCharsLength = availableChars.length; // Start the final string

  let str = '';

  for (let i = 1; i <= strLength; i++) {
    const randChar = availableChars.charAt(Math.floor(Math.random() * availableCharsLength)); // Append this character to the string

    str += randChar;
  }

  return `${now.substr(0, middlePos)}-${str}-${now.substr(middlePos)}`;
}

function get$1(obj, key, defaultValue) {
  // Undefined object
  if (!obj) return defaultValue;
  if (typeof obj === 'object' && Object.keys(obj).length === 0) return defaultValue; // Key is number

  if (typeof key === 'number') {
    if (obj[key] === undefined) return defaultValue;
    return obj[key];
  } // Key is string


  const splittedKeys = key.split('.');
  let exit = false;
  return splittedKeys.reduce((acum, value) => {
    if (exit) return defaultValue;

    if (!acum[value]) {
      exit = true;
      return defaultValue;
    }

    return acum[value];
  }, obj);
}

function localize(language = 'en') {
  return definitions => {
    if (typeof definitions === 'string') return definitions;
    if (definitions[language]) return definitions[language];
    if (definitions.en) return definitions.en;
    const firstKey = Object.keys(definitions)[0];
    if (firstKey) return definitions[firstKey];
    return 'Error: localize text not found';
  };
}



var utils = /*#__PURE__*/Object.freeze({
  uid: uid,
  get: get$1,
  localize: localize
});

function createStore(definition) {
  const Store = {};
  const {
    observables = {},
    computed = {},
    actions = {},
    alerts = {},
    checks = {},
    rootNodeId,
    rootComponent
  } = definition;
  /* ----------------------------------------------------------------------------------------------    Initialize utils  ---------------------------------------------------------------------------------------------- */

  Store.utils = utils;
  /* ----------------------------------------------------------------------------------------------    Initialize router: appData, siteUrl, socketUrl will be updated after app initialization.  ---------------------------------------------------------------------------------------------- */

  Store.router = {
    appData: null,
    siteUrl: null,
    socketUrl: null,
    route: route(Store)
  };
  /* ----------------------------------------------------------------------------------------------    Initialize observables  ---------------------------------------------------------------------------------------------- */

  Store.objects = {
    flags: {
      IS_MOUNTED: false
    },
    observables,
    computed,
    listeners: [],
    reactions: [],
    alerts: []
  };
  /* ----------------------------------------------------------------------------------------------    Initialize methods  ---------------------------------------------------------------------------------------------- */

  Store.methods = {
    check: check(Store, checks),
    get: get(Store),
    subscribe: subscribe(Store),
    set: set(Store),
    setItem: setItem(Store),
    toggle: toggle(Store),
    notify: notify(Store),
    emit: emit(Store),
    on: on(Store),
    once: once(Store),
    compute: compute(Store),
    computeAll: computeAll(Store),
    alertOn: alertOn(Store, alerts),
    alertOff: alertOff(Store),
    callServer: callServer(Store)
  };
  /* ----------------------------------------------------------------------------------------------    Initialize render related process & objects  ---------------------------------------------------------------------------------------------- */

  Store.render = {
    client: null,
    components: {},
    rootComponent,
    rootNodeId,
    registerComponent: registerComponent(Store),
    mount: mount(Store),
    update: update(Store),
    startApp: startApp(Store),
    Events: {} // event names that are handled: onclick, onblur,  ....

  };
  /* ----------------------------------------------------------------------------------------------    Initialize queued processes  ---------------------------------------------------------------------------------------------- */

  Store.process = {
    queue: [],
    addToQueue: addToQueue(Store),
    processor: processor(Store),
    runTask: runTask(Store),
    call: callProcesses(Store, actions) // client side method call

  };
  /* ----------------------------------------------------------------------------------------------    Initialize listeners  ---------------------------------------------------------------------------------------------- */

  Object.keys(Store.objects.observables).forEach(observable => {
    Store.objects.listeners.push({
      observable,
      components: []
    });
  });
  /* ----------------------------------------------------------------------------------------------    Start with computed values up to date  ---------------------------------------------------------------------------------------------- */

  Store.methods.computeAll();
  return Store;
}

function registerStyles(registerNumber, styledRules, isBrowser, isProduction) {
  if (!styledRules) return;

  if (isBrowser && !isProduction) {
    const headStyles = document.getElementById('component-styles');
    headStyles.innerText += styledRules;
  } else {
    if (!global.__componentStyles) global.__componentStyles = '';
    global.__componentStyles += styledRules;
  }
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var stylis = createCommonjsModule(function (module, exports) {
/*
 *          __        ___
 *    _____/ /___  __/ (_)____
 *   / ___/ __/ / / / / / ___/
 *  (__  ) /_/ /_/ / / (__  )
 * /____/\__/\__, /_/_/____/
 *          /____/
 *
 * light - weight css preprocessor @licence MIT
 */
(function (factory) {
  /* eslint-disable */
  module['exports'] = factory(null);
})(
/** @param {*=} options */
function factory(options) {
  /**
   * Notes
   *
   * The ['<method name>'] pattern is used to support closure compiler
   * the jsdoc signatures are also used to the same effect
   *
   * ----
   *
   * int + int + int === n4 [faster]
   *
   * vs
   *
   * int === n1 && int === n2 && int === n3
   *
   * ----
   *
   * switch (int) { case ints...} [faster]
   *
   * vs
   *
   * if (int == 1 && int === 2 ...)
   *
   * ----
   *
   * The (first*n1 + second*n2 + third*n3) format used in the property parser
   * is a simple way to hash the sequence of characters
   * taking into account the index they occur in
   * since any number of 3 character sequences could produce duplicates.
   *
   * On the other hand sequences that are directly tied to the index of the character
   * resolve a far more accurate measure, it's also faster
   * to evaluate one condition in a switch statement
   * than three in an if statement regardless of the added math.
   *
   * This allows the vendor prefixer to be both small and fast.
   */

  var nullptn = /^\0+/g;
  /* matches leading null characters */

  var formatptn = /[\0\r\f]/g;
  /* matches new line, null and formfeed characters */

  var colonptn = /: */g;
  /* splits animation rules */

  var cursorptn = /zoo|gra/;
  /* assert cursor varient */

  var transformptn = /([,: ])(transform)/g;
  /* vendor prefix transform, older webkit */

  var animationptn = /,+\s*(?![^(]*[)])/g;
  /* splits multiple shorthand notation animations */

  var propertiesptn = / +\s*(?![^(]*[)])/g;
  /* animation properties */

  var elementptn = / *[\0] */g;
  /* selector elements */

  var selectorptn = /,\r+?/g;
  /* splits selectors */

  var andptn = /([\t\r\n ])*\f?&/g;
  /* match & */

  var escapeptn = /:global\(((?:[^\(\)\[\]]*|\[.*\]|\([^\(\)]*\))*)\)/g;
  /* matches :global(.*) */

  var invalidptn = /\W+/g;
  /* removes invalid characters from keyframes */

  var keyframeptn = /@(k\w+)\s*(\S*)\s*/;
  /* matches @keyframes $1 */

  var plcholdrptn = /::(place)/g;
  /* match ::placeholder varient */

  var readonlyptn = /:(read-only)/g;
  /* match :read-only varient */

  var beforeptn = /\s+(?=[{\];=:>])/g;
  /* matches \s before ] ; = : */

  var afterptn = /([[}=:>])\s+/g;
  /* matches \s after characters [ } = : */

  var tailptn = /(\{[^{]+?);(?=\})/g;
  /* matches tail semi-colons ;} */

  var whiteptn = /\s{2,}/g;
  /* matches repeating whitespace */

  var pseudoptn = /([^\(])(:+) */g;
  /* pseudo element */

  var writingptn = /[svh]\w+-[tblr]{2}/;
  /* match *gradient property */

  var supportsptn = /\(\s*(.*)\s*\)/g;
  /* match supports (groups) */

  var propertyptn = /([\s\S]*?);/g;
  /* match properties leading semicolon */

  var selfptn = /-self|flex-/g;
  /* match flex- and -self in align-self: flex-*; */

  var pseudofmt = /[^]*?(:[rp][el]a[\w-]+)[^]*/;
  /* match tail whitspace */

  var dimensionptn = /stretch|:\s*\w+\-(?:conte|avail)/;
  /* match max/min/fit-content, fill-available */

  var imgsrcptn = /([^-])(image-set\()/;
  /* vendors */

  var webkit = '-webkit-';
  var moz = '-moz-';
  var ms = '-ms-';
  /* character codes */

  var SEMICOLON = 59;
  /* ; */

  var CLOSEBRACES = 125;
  /* } */

  var OPENBRACES = 123;
  /* { */

  var OPENPARENTHESES = 40;
  /* ( */

  var CLOSEPARENTHESES = 41;
  /* ) */

  var OPENBRACKET = 91;
  /* [ */

  var CLOSEBRACKET = 93;
  /* ] */

  var NEWLINE = 10;
  /* \n */

  var CARRIAGE = 13;
  /* \r */

  var TAB = 9;
  /* \t */

  var AT = 64;
  /* @ */

  var SPACE = 32;
  /*   */

  var AND = 38;
  /* & */

  var DASH = 45;
  /* - */

  var UNDERSCORE = 95;
  /* _ */

  var STAR = 42;
  /* * */

  var COMMA = 44;
  /* , */

  var COLON = 58;
  /* : */

  var SINGLEQUOTE = 39;
  /* ' */

  var DOUBLEQUOTE = 34;
  /* " */

  var FOWARDSLASH = 47;
  /* / */

  var GREATERTHAN = 62;
  /* > */

  var PLUS = 43;
  /* + */

  var TILDE = 126;
  /* ~ */

  var NULL = 0;
  /* \0 */

  var FORMFEED = 12;
  /* \f */

  var VERTICALTAB = 11;
  /* \v */

  /* special identifiers */

  var KEYFRAME = 107;
  /* k */

  var MEDIA = 109;
  /* m */

  var SUPPORTS = 115;
  /* s */

  var PLACEHOLDER = 112;
  /* p */

  var READONLY = 111;
  /* o */

  var IMPORT = 105;
  /* <at>i */

  var CHARSET = 99;
  /* <at>c */

  var DOCUMENT = 100;
  /* <at>d */

  var PAGE = 112;
  /* <at>p */

  var column = 1;
  /* current column */

  var line = 1;
  /* current line numebr */

  var pattern = 0;
  /* :pattern */

  var cascade = 1;
  /* #id h1 h2 vs h1#id h2#id  */

  var prefix = 1;
  /* vendor prefix */

  var escape = 1;
  /* escape :global() pattern */

  var compress = 0;
  /* compress output */

  var semicolon = 0;
  /* no/semicolon option */

  var preserve = 0;
  /* preserve empty selectors */

  /* empty reference */

  var array = [];
  /* plugins */

  var plugins = [];
  var plugged = 0;
  var should = null;
  /* plugin context */

  var POSTS = -2;
  var PREPS = -1;
  var UNKWN = 0;
  var PROPS = 1;
  var BLCKS = 2;
  var ATRUL = 3;
  /* plugin newline context */

  var unkwn = 0;
  /* keyframe animation */

  var keyed = 1;
  var key = '';
  /* selector namespace */

  var nscopealt = '';
  var nscope = '';
  /**
   * Compile
   *
   * @param {Array<string>} parent
   * @param {Array<string>} current
   * @param {string} body
   * @param {number} id
   * @param {number} depth
   * @return {string}
   */

  function compile(parent, current, body, id, depth) {
    var bracket = 0;
    /* brackets [] */

    var comment = 0;
    /* comments /* // or /* */

    var parentheses = 0;
    /* functions () */

    var quote = 0;
    /* quotes '', "" */

    var first = 0;
    /* first character code */

    var second = 0;
    /* second character code */

    var code = 0;
    /* current character code */

    var tail = 0;
    /* previous character code */

    var trail = 0;
    /* character before previous code */

    var peak = 0;
    /* previous non-whitespace code */

    var counter = 0;
    /* count sequence termination */

    var context = 0;
    /* track current context */

    var atrule = 0;
    /* track @at-rule context */

    var pseudo = 0;
    /* track pseudo token index */

    var caret = 0;
    /* current character index */

    var format = 0;
    /* control character formating context */

    var insert = 0;
    /* auto semicolon insertion */

    var invert = 0;
    /* inverted selector pattern */

    var length = 0;
    /* generic length address */

    var eof = body.length;
    /* end of file(length) */

    var eol = eof - 1;
    /* end of file(characters) */

    var char = '';
    /* current character */

    var chars = '';
    /* current buffer of characters */

    var child = '';
    /* next buffer of characters */

    var out = '';
    /* compiled body */

    var children = '';
    /* compiled children */

    var flat = '';
    /* compiled leafs */

    var selector;
    /* generic selector address */

    var result;
    /* generic address */
    // ...build body

    while (caret < eof) {
      code = body.charCodeAt(caret); // eof varient

      if (caret === eol) {
        // last character + noop context, add synthetic padding for noop context to terminate
        if (comment + quote + parentheses + bracket !== 0) {
          if (comment !== 0) {
            code = comment === FOWARDSLASH ? NEWLINE : FOWARDSLASH;
          }

          quote = parentheses = bracket = 0;
          eof++;
          eol++;
        }
      }

      if (comment + quote + parentheses + bracket === 0) {
        // eof varient
        if (caret === eol) {
          if (format > 0) {
            chars = chars.replace(formatptn, '');
          }

          if (chars.trim().length > 0) {
            switch (code) {
              case SPACE:
              case TAB:
              case SEMICOLON:
              case CARRIAGE:
              case NEWLINE:
                {
                  break;
                }

              default:
                {
                  chars += body.charAt(caret);
                }
            }

            code = SEMICOLON;
          }
        } // auto semicolon insertion


        if (insert === 1) {
          switch (code) {
            // false flags
            case OPENBRACES:
            case CLOSEBRACES:
            case SEMICOLON:
            case DOUBLEQUOTE:
            case SINGLEQUOTE:
            case OPENPARENTHESES:
            case CLOSEPARENTHESES:
            case COMMA:
              {
                insert = 0;
              }
            // ignore

            case TAB:
            case CARRIAGE:
            case NEWLINE:
            case SPACE:
              {
                break;
              }
            // valid

            default:
              {
                insert = 0;
                length = caret;
                first = code;
                caret--;
                code = SEMICOLON;

                while (length < eof) {
                  switch (body.charCodeAt(length++)) {
                    case NEWLINE:
                    case CARRIAGE:
                    case SEMICOLON:
                      {
                        ++caret;
                        code = first;
                        length = eof;
                        break;
                      }

                    case COLON:
                      {
                        if (format > 0) {
                          ++caret;
                          code = first;
                        }
                      }

                    case OPENBRACES:
                      {
                        length = eof;
                      }
                  }
                }
              }
          }
        } // token varient


        switch (code) {
          case OPENBRACES:
            {
              chars = chars.trim();
              first = chars.charCodeAt(0);
              counter = 1;
              length = ++caret;

              while (caret < eof) {
                switch (code = body.charCodeAt(caret)) {
                  case OPENBRACES:
                    {
                      counter++;
                      break;
                    }

                  case CLOSEBRACES:
                    {
                      counter--;
                      break;
                    }

                  case FOWARDSLASH:
                    {
                      switch (second = body.charCodeAt(caret + 1)) {
                        // /*, //
                        case STAR:
                        case FOWARDSLASH:
                          {
                            caret = delimited(second, caret, eol, body);
                          }
                      }

                      break;
                    }
                  // given "[" === 91 & "]" === 93 hence forth 91 + 1 + 1 === 93

                  case OPENBRACKET:
                    {
                      code++;
                    }
                  // given "(" === 40 & ")" === 41 hence forth 40 + 1 === 41

                  case OPENPARENTHESES:
                    {
                      code++;
                    }
                  // quote tail delimiter is identical to the head delimiter hence noop,
                  // fallthrough clauses have been shifted to the correct tail delimiter

                  case DOUBLEQUOTE:
                  case SINGLEQUOTE:
                    {
                      while (caret++ < eol) {
                        if (body.charCodeAt(caret) === code) {
                          break;
                        }
                      }
                    }
                }

                if (counter === 0) {
                  break;
                }

                caret++;
              }

              child = body.substring(length, caret);

              if (first === NULL) {
                first = (chars = chars.replace(nullptn, '').trim()).charCodeAt(0);
              }

              switch (first) {
                // @at-rule
                case AT:
                  {
                    if (format > 0) {
                      chars = chars.replace(formatptn, '');
                    }

                    second = chars.charCodeAt(1);

                    switch (second) {
                      case DOCUMENT:
                      case MEDIA:
                      case SUPPORTS:
                      case DASH:
                        {
                          selector = current;
                          break;
                        }

                      default:
                        {
                          selector = array;
                        }
                    }

                    child = compile(current, selector, child, second, depth + 1);
                    length = child.length; // preserve empty @at-rule

                    if (preserve > 0 && length === 0) {
                      length = chars.length;
                    } // execute plugins, @at-rule context


                    if (plugged > 0) {
                      selector = select(array, chars, invert);
                      result = proxy(ATRUL, child, selector, current, line, column, length, second, depth, id);
                      chars = selector.join('');

                      if (result !== void 0) {
                        if ((length = (child = result.trim()).length) === 0) {
                          second = 0;
                          child = '';
                        }
                      }
                    }

                    if (length > 0) {
                      switch (second) {
                        case SUPPORTS:
                          {
                            chars = chars.replace(supportsptn, supports);
                          }

                        case DOCUMENT:
                        case MEDIA:
                        case DASH:
                          {
                            child = chars + '{' + child + '}';
                            break;
                          }

                        case KEYFRAME:
                          {
                            chars = chars.replace(keyframeptn, '$1 $2' + (keyed > 0 ? key : ''));
                            child = chars + '{' + child + '}';

                            if (prefix === 1 || prefix === 2 && vendor('@' + child, 3)) {
                              child = '@' + webkit + child + '@' + child;
                            } else {
                              child = '@' + child;
                            }

                            break;
                          }

                        default:
                          {
                            child = chars + child;

                            if (id === PAGE) {
                              child = (out += child, '');
                            }
                          }
                      }
                    } else {
                      child = '';
                    }

                    break;
                  }
                // selector

                default:
                  {
                    child = compile(current, select(current, chars, invert), child, id, depth + 1);
                  }
              }

              children += child; // reset

              context = 0;
              insert = 0;
              pseudo = 0;
              format = 0;
              invert = 0;
              atrule = 0;
              chars = '';
              child = '';
              code = body.charCodeAt(++caret);
              break;
            }

          case CLOSEBRACES:
          case SEMICOLON:
            {
              chars = (format > 0 ? chars.replace(formatptn, '') : chars).trim();

              if ((length = chars.length) > 1) {
                // monkey-patch missing colon
                if (pseudo === 0) {
                  first = chars.charCodeAt(0); // first character is a letter or dash, buffer has a space character

                  if (first === DASH || first > 96 && first < 123) {
                    length = (chars = chars.replace(' ', ':')).length;
                  }
                } // execute plugins, property context


                if (plugged > 0) {
                  if ((result = proxy(PROPS, chars, current, parent, line, column, out.length, id, depth, id)) !== void 0) {
                    if ((length = (chars = result.trim()).length) === 0) {
                      chars = '\0\0';
                    }
                  }
                }

                first = chars.charCodeAt(0);
                second = chars.charCodeAt(1);

                switch (first) {
                  case NULL:
                    {
                      break;
                    }

                  case AT:
                    {
                      if (second === IMPORT || second === CHARSET) {
                        flat += chars + body.charAt(caret);
                        break;
                      }
                    }

                  default:
                    {
                      if (chars.charCodeAt(length - 1) === COLON) {
                        break;
                      }

                      out += property(chars, first, second, chars.charCodeAt(2));
                    }
                }
              } // reset


              context = 0;
              insert = 0;
              pseudo = 0;
              format = 0;
              invert = 0;
              chars = '';
              code = body.charCodeAt(++caret);
              break;
            }
        }
      } // parse characters


      switch (code) {
        case CARRIAGE:
        case NEWLINE:
          {
            // auto insert semicolon
            if (comment + quote + parentheses + bracket + semicolon === 0) {
              // valid non-whitespace characters that
              // may precede a newline
              switch (peak) {
                case CLOSEPARENTHESES:
                case SINGLEQUOTE:
                case DOUBLEQUOTE:
                case AT:
                case TILDE:
                case GREATERTHAN:
                case STAR:
                case PLUS:
                case FOWARDSLASH:
                case DASH:
                case COLON:
                case COMMA:
                case SEMICOLON:
                case OPENBRACES:
                case CLOSEBRACES:
                  {
                    break;
                  }

                default:
                  {
                    // current buffer has a colon
                    if (pseudo > 0) {
                      insert = 1;
                    }
                  }
              }
            } // terminate line comment


            if (comment === FOWARDSLASH) {
              comment = 0;
            } else if (cascade + context === 0 && id !== KEYFRAME && chars.length > 0) {
              format = 1;
              chars += '\0';
            } // execute plugins, newline context


            if (plugged * unkwn > 0) {
              proxy(UNKWN, chars, current, parent, line, column, out.length, id, depth, id);
            } // next line, reset column position


            column = 1;
            line++;
            break;
          }

        case SEMICOLON:
        case CLOSEBRACES:
          {
            if (comment + quote + parentheses + bracket === 0) {
              column++;
              break;
            }
          }

        default:
          {
            // increment column position
            column++; // current character

            char = body.charAt(caret); // remove comments, escape functions, strings, attributes and prepare selectors

            switch (code) {
              case TAB:
              case SPACE:
                {
                  if (quote + bracket + comment === 0) {
                    switch (tail) {
                      case COMMA:
                      case COLON:
                      case TAB:
                      case SPACE:
                        {
                          char = '';
                          break;
                        }

                      default:
                        {
                          if (code !== SPACE) {
                            char = ' ';
                          }
                        }
                    }
                  }

                  break;
                }
              // escape breaking control characters

              case NULL:
                {
                  char = '\\0';
                  break;
                }

              case FORMFEED:
                {
                  char = '\\f';
                  break;
                }

              case VERTICALTAB:
                {
                  char = '\\v';
                  break;
                }
              // &

              case AND:
                {
                  // inverted selector pattern i.e html &
                  if (quote + comment + bracket === 0 && cascade > 0) {
                    invert = 1;
                    format = 1;
                    char = '\f' + char;
                  }

                  break;
                }
              // ::p<l>aceholder, l
              // :read-on<l>y, l

              case 108:
                {
                  if (quote + comment + bracket + pattern === 0 && pseudo > 0) {
                    switch (caret - pseudo) {
                      // ::placeholder
                      case 2:
                        {
                          if (tail === PLACEHOLDER && body.charCodeAt(caret - 3) === COLON) {
                            pattern = tail;
                          }
                        }
                      // :read-only

                      case 8:
                        {
                          if (trail === READONLY) {
                            pattern = trail;
                          }
                        }
                    }
                  }

                  break;
                }
              // :<pattern>

              case COLON:
                {
                  if (quote + comment + bracket === 0) {
                    pseudo = caret;
                  }

                  break;
                }
              // selectors

              case COMMA:
                {
                  if (comment + parentheses + quote + bracket === 0) {
                    format = 1;
                    char += '\r';
                  }

                  break;
                }
              // quotes

              case DOUBLEQUOTE:
              case SINGLEQUOTE:
                {
                  if (comment === 0) {
                    quote = quote === code ? 0 : quote === 0 ? code : quote;
                  }

                  break;
                }
              // attributes

              case OPENBRACKET:
                {
                  if (quote + comment + parentheses === 0) {
                    bracket++;
                  }

                  break;
                }

              case CLOSEBRACKET:
                {
                  if (quote + comment + parentheses === 0) {
                    bracket--;
                  }

                  break;
                }
              // functions

              case CLOSEPARENTHESES:
                {
                  if (quote + comment + bracket === 0) {
                    parentheses--;
                  }

                  break;
                }

              case OPENPARENTHESES:
                {
                  if (quote + comment + bracket === 0) {
                    if (context === 0) {
                      switch (tail * 2 + trail * 3) {
                        // :matches
                        case 533:
                          {
                            break;
                          }
                        // :global, :not, :nth-child etc...

                        default:
                          {
                            counter = 0;
                            context = 1;
                          }
                      }
                    }

                    parentheses++;
                  }

                  break;
                }

              case AT:
                {
                  if (comment + parentheses + quote + bracket + pseudo + atrule === 0) {
                    atrule = 1;
                  }

                  break;
                }
              // block/line comments

              case STAR:
              case FOWARDSLASH:
                {
                  if (quote + bracket + parentheses > 0) {
                    break;
                  }

                  switch (comment) {
                    // initialize line/block comment context
                    case 0:
                      {
                        switch (code * 2 + body.charCodeAt(caret + 1) * 3) {
                          // //
                          case 235:
                            {
                              comment = FOWARDSLASH;
                              break;
                            }
                          // /*

                          case 220:
                            {
                              length = caret;
                              comment = STAR;
                              break;
                            }
                        }

                        break;
                      }
                    // end block comment context

                    case STAR:
                      {
                        if (code === FOWARDSLASH && tail === STAR && length + 2 !== caret) {
                          // /*<!> ... */, !
                          if (body.charCodeAt(length + 2) === 33) {
                            out += body.substring(length, caret + 1);
                          }

                          char = '';
                          comment = 0;
                        }
                      }
                  }
                }
            } // ignore comment blocks


            if (comment === 0) {
              // aggressive isolation mode, divide each individual selector
              // including selectors in :not function but excluding selectors in :global function
              if (cascade + quote + bracket + atrule === 0 && id !== KEYFRAME && code !== SEMICOLON) {
                switch (code) {
                  case COMMA:
                  case TILDE:
                  case GREATERTHAN:
                  case PLUS:
                  case CLOSEPARENTHESES:
                  case OPENPARENTHESES:
                    {
                      if (context === 0) {
                        // outside of an isolated context i.e nth-child(<...>)
                        switch (tail) {
                          case TAB:
                          case SPACE:
                          case NEWLINE:
                          case CARRIAGE:
                            {
                              char = char + '\0';
                              break;
                            }

                          default:
                            {
                              char = '\0' + char + (code === COMMA ? '' : '\0');
                            }
                        }

                        format = 1;
                      } else {
                        // within an isolated context, sleep untill it's terminated
                        switch (code) {
                          case OPENPARENTHESES:
                            {
                              // :globa<l>(
                              if (pseudo + 7 === caret && tail === 108) {
                                pseudo = 0;
                              }

                              context = ++counter;
                              break;
                            }

                          case CLOSEPARENTHESES:
                            {
                              if ((context = --counter) === 0) {
                                format = 1;
                                char += '\0';
                              }

                              break;
                            }
                        }
                      }

                      break;
                    }

                  case TAB:
                  case SPACE:
                    {
                      switch (tail) {
                        case NULL:
                        case OPENBRACES:
                        case CLOSEBRACES:
                        case SEMICOLON:
                        case COMMA:
                        case FORMFEED:
                        case TAB:
                        case SPACE:
                        case NEWLINE:
                        case CARRIAGE:
                          {
                            break;
                          }

                        default:
                          {
                            // ignore in isolated contexts
                            if (context === 0) {
                              format = 1;
                              char += '\0';
                            }
                          }
                      }
                    }
                }
              } // concat buffer of characters


              chars += char; // previous non-whitespace character code

              if (code !== SPACE && code !== TAB) {
                peak = code;
              }
            }
          }
      } // tail character codes


      trail = tail;
      tail = code; // visit every character

      caret++;
    }

    length = out.length; // preserve empty selector

    if (preserve > 0) {
      if (length === 0 && children.length === 0 && current[0].length === 0 === false) {
        if (id !== MEDIA || current.length === 1 && (cascade > 0 ? nscopealt : nscope) === current[0]) {
          length = current.join(',').length + 2;
        }
      }
    }

    if (length > 0) {
      // cascade isolation mode?
      selector = cascade === 0 && id !== KEYFRAME ? isolate(current) : current; // execute plugins, block context

      if (plugged > 0) {
        result = proxy(BLCKS, out, selector, parent, line, column, length, id, depth, id);

        if (result !== void 0 && (out = result).length === 0) {
          return flat + out + children;
        }
      }

      out = selector.join(',') + '{' + out + '}';

      if (prefix * pattern !== 0) {
        if (prefix === 2 && !vendor(out, 2)) pattern = 0;

        switch (pattern) {
          // ::read-only
          case READONLY:
            {
              out = out.replace(readonlyptn, ':' + moz + '$1') + out;
              break;
            }
          // ::placeholder

          case PLACEHOLDER:
            {
              out = out.replace(plcholdrptn, '::' + webkit + 'input-$1') + out.replace(plcholdrptn, '::' + moz + '$1') + out.replace(plcholdrptn, ':' + ms + 'input-$1') + out;
              break;
            }
        }

        pattern = 0;
      }
    }

    return flat + out + children;
  }
  /**
   * Select
   *
   * @param {Array<string>} parent
   * @param {string} current
   * @param {number} invert
   * @return {Array<string>}
   */


  function select(parent, current, invert) {
    var selectors = current.trim().split(selectorptn);
    var out = selectors;
    var length = selectors.length;
    var l = parent.length;

    switch (l) {
      // 0-1 parent selectors
      case 0:
      case 1:
        {
          for (var i = 0, selector = l === 0 ? '' : parent[0] + ' '; i < length; ++i) {
            out[i] = scope(selector, out[i], invert, l).trim();
          }

          break;
        }
      // >2 parent selectors, nested

      default:
        {
          for (var i = 0, j = 0, out = []; i < length; ++i) {
            for (var k = 0; k < l; ++k) {
              out[j++] = scope(parent[k] + ' ', selectors[i], invert, l).trim();
            }
          }
        }
    }

    return out;
  }
  /**
   * Scope
   *
   * @param {string} parent
   * @param {string} current
   * @param {number} invert
   * @param {number} level
   * @return {string}
   */


  function scope(parent, current, invert, level) {
    var selector = current;
    var code = selector.charCodeAt(0); // trim leading whitespace

    if (code < 33) {
      code = (selector = selector.trim()).charCodeAt(0);
    }

    switch (code) {
      // &
      case AND:
        {
          switch (cascade + level) {
            case 0:
            case 1:
              {
                if (parent.trim().length === 0) {
                  break;
                }
              }

            default:
              {
                return selector.replace(andptn, '$1' + parent.trim());
              }
          }

          break;
        }
      // :

      case COLON:
        {
          switch (selector.charCodeAt(1)) {
            // g in :global
            case 103:
              {
                if (escape > 0 && cascade > 0) {
                  return selector.replace(escapeptn, '$1').replace(andptn, '$1' + nscope);
                }

                break;
              }

            default:
              {
                // :hover
                return parent.trim() + selector.replace(andptn, '$1' + parent.trim());
              }
          }
        }

      default:
        {
          // html &
          if (invert * cascade > 0 && selector.indexOf('\f') > 0) {
            return selector.replace(andptn, (parent.charCodeAt(0) === COLON ? '' : '$1') + parent.trim());
          }
        }
    }

    return parent + selector;
  }
  /**
   * Property
   *
   * @param {string} input
   * @param {number} first
   * @param {number} second
   * @param {number} third
   * @return {string}
   */


  function property(input, first, second, third) {
    var index = 0;
    var out = input + ';';
    var hash = first * 2 + second * 3 + third * 4;
    var cache; // animation: a, n, i characters

    if (hash === 944) {
      return animation(out);
    } else if (prefix === 0 || prefix === 2 && !vendor(out, 1)) {
      return out;
    } // vendor prefix


    switch (hash) {
      // text-decoration/text-size-adjust/text-shadow/text-align/text-transform: t, e, x
      case 1015:
        {
          // text-shadow/text-align/text-transform, a
          return out.charCodeAt(10) === 97 ? webkit + out + out : out;
        }
      // filter/fill f, i, l

      case 951:
        {
          // filter, t
          return out.charCodeAt(3) === 116 ? webkit + out + out : out;
        }
      // color/column, c, o, l

      case 963:
        {
          // column, n
          return out.charCodeAt(5) === 110 ? webkit + out + out : out;
        }
      // box-decoration-break, b, o, x

      case 1009:
        {
          if (out.charCodeAt(4) !== 100) {
            break;
          }
        }
      // mask, m, a, s
      // clip-path, c, l, i

      case 969:
      case 942:
        {
          return webkit + out + out;
        }
      // appearance: a, p, p

      case 978:
        {
          return webkit + out + moz + out + out;
        }
      // hyphens: h, y, p
      // user-select: u, s, e

      case 1019:
      case 983:
        {
          return webkit + out + moz + out + ms + out + out;
        }
      // background/backface-visibility, b, a, c

      case 883:
        {
          // backface-visibility, -
          if (out.charCodeAt(8) === DASH) {
            return webkit + out + out;
          } // image-set(...)


          if (out.indexOf('image-set(', 11) > 0) {
            return out.replace(imgsrcptn, '$1' + webkit + '$2') + out;
          }

          return out;
        }
      // flex: f, l, e

      case 932:
        {
          if (out.charCodeAt(4) === DASH) {
            switch (out.charCodeAt(5)) {
              // flex-grow, g
              case 103:
                {
                  return webkit + 'box-' + out.replace('-grow', '') + webkit + out + ms + out.replace('grow', 'positive') + out;
                }
              // flex-shrink, s

              case 115:
                {
                  return webkit + out + ms + out.replace('shrink', 'negative') + out;
                }
              // flex-basis, b

              case 98:
                {
                  return webkit + out + ms + out.replace('basis', 'preferred-size') + out;
                }
            }
          }

          return webkit + out + ms + out + out;
        }
      // order: o, r, d

      case 964:
        {
          return webkit + out + ms + 'flex' + '-' + out + out;
        }
      // justify-items/justify-content, j, u, s

      case 1023:
        {
          // justify-content, c
          if (out.charCodeAt(8) !== 99) {
            break;
          }

          cache = out.substring(out.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
          return webkit + 'box-pack' + cache + webkit + out + ms + 'flex-pack' + cache + out;
        }
      // cursor, c, u, r

      case 1005:
        {
          return cursorptn.test(out) ? out.replace(colonptn, ':' + webkit) + out.replace(colonptn, ':' + moz) + out : out;
        }
      // writing-mode, w, r, i

      case 1000:
        {
          cache = out.substring(13).trim();
          index = cache.indexOf('-') + 1;

          switch (cache.charCodeAt(0) + cache.charCodeAt(index)) {
            // vertical-lr
            case 226:
              {
                cache = out.replace(writingptn, 'tb');
                break;
              }
            // vertical-rl

            case 232:
              {
                cache = out.replace(writingptn, 'tb-rl');
                break;
              }
            // horizontal-tb

            case 220:
              {
                cache = out.replace(writingptn, 'lr');
                break;
              }

            default:
              {
                return out;
              }
          }

          return webkit + out + ms + cache + out;
        }
      // position: sticky

      case 1017:
        {
          if (out.indexOf('sticky', 9) === -1) {
            return out;
          }
        }
      // display(flex/inline-flex/inline-box): d, i, s

      case 975:
        {
          index = (out = input).length - 10;
          cache = (out.charCodeAt(index) === 33 ? out.substring(0, index) : out).substring(input.indexOf(':', 7) + 1).trim();

          switch (hash = cache.charCodeAt(0) + (cache.charCodeAt(7) | 0)) {
            // inline-
            case 203:
              {
                // inline-box
                if (cache.charCodeAt(8) < 111) {
                  break;
                }
              }
            // inline-box/sticky

            case 115:
              {
                out = out.replace(cache, webkit + cache) + ';' + out;
                break;
              }
            // inline-flex
            // flex

            case 207:
            case 102:
              {
                out = out.replace(cache, webkit + (hash > 102 ? 'inline-' : '') + 'box') + ';' + out.replace(cache, webkit + cache) + ';' + out.replace(cache, ms + cache + 'box') + ';' + out;
              }
          }

          return out + ';';
        }
      // align-items, align-center, align-self: a, l, i, -

      case 938:
        {
          if (out.charCodeAt(5) === DASH) {
            switch (out.charCodeAt(6)) {
              // align-items, i
              case 105:
                {
                  cache = out.replace('-items', '');
                  return webkit + out + webkit + 'box-' + cache + ms + 'flex-' + cache + out;
                }
              // align-self, s

              case 115:
                {
                  return webkit + out + ms + 'flex-item-' + out.replace(selfptn, '') + out;
                }
              // align-content

              default:
                {
                  return webkit + out + ms + 'flex-line-pack' + out.replace('align-content', '').replace(selfptn, '') + out;
                }
            }
          }

          break;
        }
      // min/max

      case 973:
      case 989:
        {
          // min-/max- height/width/block-size/inline-size
          if (out.charCodeAt(3) !== DASH || out.charCodeAt(4) === 122) {
            break;
          }
        }
      // height/width: min-content / width: max-content

      case 931:
      case 953:
        {
          if (dimensionptn.test(input) === true) {
            // stretch
            if ((cache = input.substring(input.indexOf(':') + 1)).charCodeAt(0) === 115) return property(input.replace('stretch', 'fill-available'), first, second, third).replace(':fill-available', ':stretch');else return out.replace(cache, webkit + cache) + out.replace(cache, moz + cache.replace('fill-', '')) + out;
          }

          break;
        }
      // transform, transition: t, r, a

      case 962:
        {
          out = webkit + out + (out.charCodeAt(5) === 102 ? ms + out : '') + out; // transitions

          if (second + third === 211 && out.charCodeAt(13) === 105 && out.indexOf('transform', 10) > 0) {
            return out.substring(0, out.indexOf(';', 27) + 1).replace(transformptn, '$1' + webkit + '$2') + out;
          }

          break;
        }
    }

    return out;
  }
  /**
   * Vendor
   *
   * @param {string} content
   * @param {number} context
   * @return {boolean}
   */


  function vendor(content, context) {
    var index = content.indexOf(context === 1 ? ':' : '{');
    var key = content.substring(0, context !== 3 ? index : 10);
    var value = content.substring(index + 1, content.length - 1);
    return should(context !== 2 ? key : key.replace(pseudofmt, '$1'), value, context);
  }
  /**
   * Supports
   *
   * @param {string} match
   * @param {string} group
   * @return {string}
   */


  function supports(match, group) {
    var out = property(group, group.charCodeAt(0), group.charCodeAt(1), group.charCodeAt(2));
    return out !== group + ';' ? out.replace(propertyptn, ' or ($1)').substring(4) : '(' + group + ')';
  }
  /**
   * Animation
   *
   * @param {string} input
   * @return {string}
   */


  function animation(input) {
    var length = input.length;
    var index = input.indexOf(':', 9) + 1;
    var declare = input.substring(0, index).trim();
    var out = input.substring(index, length - 1).trim();

    switch (input.charCodeAt(9) * keyed) {
      case 0:
        {
          break;
        }
      // animation-*, -

      case DASH:
        {
          // animation-name, n
          if (input.charCodeAt(10) !== 110) {
            break;
          }
        }
      // animation/animation-name

      default:
        {
          // split in case of multiple animations
          var list = out.split((out = '', animationptn));

          for (var i = 0, index = 0, length = list.length; i < length; index = 0, ++i) {
            var value = list[i];
            var items = value.split(propertiesptn);

            while (value = items[index]) {
              var peak = value.charCodeAt(0);

              if (keyed === 1 && ( // letters
              peak > AT && peak < 90 || peak > 96 && peak < 123 || peak === UNDERSCORE || // dash but not in sequence i.e --
              peak === DASH && value.charCodeAt(1) !== DASH)) {
                // not a number/function
                switch (isNaN(parseFloat(value)) + (value.indexOf('(') !== -1)) {
                  case 1:
                    {
                      switch (value) {
                        // not a valid reserved keyword
                        case 'infinite':
                        case 'alternate':
                        case 'backwards':
                        case 'running':
                        case 'normal':
                        case 'forwards':
                        case 'both':
                        case 'none':
                        case 'linear':
                        case 'ease':
                        case 'ease-in':
                        case 'ease-out':
                        case 'ease-in-out':
                        case 'paused':
                        case 'reverse':
                        case 'alternate-reverse':
                        case 'inherit':
                        case 'initial':
                        case 'unset':
                        case 'step-start':
                        case 'step-end':
                          {
                            break;
                          }

                        default:
                          {
                            value += key;
                          }
                      }
                    }
                }
              }

              items[index++] = value;
            }

            out += (i === 0 ? '' : ',') + items.join(' ');
          }
        }
    }

    out = declare + out + ';';
    if (prefix === 1 || prefix === 2 && vendor(out, 1)) return webkit + out + out;
    return out;
  }
  /**
   * Isolate
   *
   * @param {Array<string>} current
   */


  function isolate(current) {
    for (var i = 0, length = current.length, selector = Array(length), padding, element; i < length; ++i) {
      // split individual elements in a selector i.e h1 h2 === [h1, h2]
      var elements = current[i].split(elementptn);
      var out = '';

      for (var j = 0, size = 0, tail = 0, code = 0, l = elements.length; j < l; ++j) {
        // empty element
        if ((size = (element = elements[j]).length) === 0 && l > 1) {
          continue;
        }

        tail = out.charCodeAt(out.length - 1);
        code = element.charCodeAt(0);
        padding = '';

        if (j !== 0) {
          // determine if we need padding
          switch (tail) {
            case STAR:
            case TILDE:
            case GREATERTHAN:
            case PLUS:
            case SPACE:
            case OPENPARENTHESES:
              {
                break;
              }

            default:
              {
                padding = ' ';
              }
          }
        }

        switch (code) {
          case AND:
            {
              element = padding + nscopealt;
            }

          case TILDE:
          case GREATERTHAN:
          case PLUS:
          case SPACE:
          case CLOSEPARENTHESES:
          case OPENPARENTHESES:
            {
              break;
            }

          case OPENBRACKET:
            {
              element = padding + element + nscopealt;
              break;
            }

          case COLON:
            {
              switch (element.charCodeAt(1) * 2 + element.charCodeAt(2) * 3) {
                // :global
                case 530:
                  {
                    if (escape > 0) {
                      element = padding + element.substring(8, size - 1);
                      break;
                    }
                  }
                // :hover, :nth-child(), ...

                default:
                  {
                    if (j < 1 || elements[j - 1].length < 1) {
                      element = padding + nscopealt + element;
                    }
                  }
              }

              break;
            }

          case COMMA:
            {
              padding = '';
            }

          default:
            {
              if (size > 1 && element.indexOf(':') > 0) {
                element = padding + element.replace(pseudoptn, '$1' + nscopealt + '$2');
              } else {
                element = padding + element + nscopealt;
              }
            }
        }

        out += element;
      }

      selector[i] = out.replace(formatptn, '').trim();
    }

    return selector;
  }
  /**
   * Proxy
   *
   * @param {number} context
   * @param {string} content
   * @param {Array<string>} selectors
   * @param {Array<string>} parents
   * @param {number} line
   * @param {number} column
   * @param {number} length
   * @param {number} id
   * @param {number} depth
   * @param {number} at
   * @return {(string|void|*)}
   */


  function proxy(context, content, selectors, parents, line, column, length, id, depth, at) {
    for (var i = 0, out = content, next; i < plugged; ++i) {
      switch (next = plugins[i].call(stylis, context, out, selectors, parents, line, column, length, id, depth, at)) {
        case void 0:
        case false:
        case true:
        case null:
          {
            break;
          }

        default:
          {
            out = next;
          }
      }
    }

    if (out !== content) {
      return out;
    }
  }
  /**
   * @param {number} code
   * @param {number} index
   * @param {number} length
   * @param {string} body
   * @return {number}
   */


  function delimited(code, index, length, body) {
    for (var i = index + 1; i < length; ++i) {
      switch (body.charCodeAt(i)) {
        // /*
        case FOWARDSLASH:
          {
            if (code === STAR) {
              if (body.charCodeAt(i - 1) === STAR && index + 2 !== i) {
                return i + 1;
              }
            }

            break;
          }
        // //

        case NEWLINE:
          {
            if (code === FOWARDSLASH) {
              return i + 1;
            }
          }
      }
    }

    return i;
  }
  /**
   * Minify
   *
   * @param {(string|*)} output
   * @return {string}
   */


  function minify(output) {
    return output.replace(formatptn, '').replace(beforeptn, '').replace(afterptn, '$1').replace(tailptn, '$1').replace(whiteptn, ' ');
  }
  /**
   * Use
   *
   * @param {(Array<function(...?)>|function(...?)|number|void)?} plugin
   */


  function use(plugin) {
    switch (plugin) {
      case void 0:
      case null:
        {
          plugged = plugins.length = 0;
          break;
        }

      default:
        {
          if (typeof plugin === 'function') {
            plugins[plugged++] = plugin;
          } else if (typeof plugin === 'object') {
            for (var i = 0, length = plugin.length; i < length; ++i) {
              use(plugin[i]);
            }
          } else {
            unkwn = !!plugin | 0;
          }
        }
    }

    return use;
  }
  /**
   * Set
   *
   * @param {*} options
   */


  function set(options) {
    for (var name in options) {
      var value = options[name];

      switch (name) {
        case 'keyframe':
          keyed = value | 0;
          break;

        case 'global':
          escape = value | 0;
          break;

        case 'cascade':
          cascade = value | 0;
          break;

        case 'compress':
          compress = value | 0;
          break;

        case 'semicolon':
          semicolon = value | 0;
          break;

        case 'preserve':
          preserve = value | 0;
          break;

        case 'prefix':
          should = null;

          if (!value) {
            prefix = 0;
          } else if (typeof value !== 'function') {
            prefix = 1;
          } else {
            prefix = 2;
            should = value;
          }

      }
    }

    return set;
  }
  /**
   * Stylis
   *
   * @param {string} selector
   * @param {string} input
   * @return {*}
   */


  function stylis(selector, input) {
    if (this !== void 0 && this.constructor === stylis) {
      return factory(selector);
    } // setup


    var ns = selector;
    var code = ns.charCodeAt(0); // trim leading whitespace

    if (code < 33) {
      code = (ns = ns.trim()).charCodeAt(0);
    } // keyframe/animation namespace


    if (keyed > 0) {
      key = ns.replace(invalidptn, code === OPENBRACKET ? '' : '-');
    } // reset, used to assert if a plugin is moneky-patching the return value


    code = 1; // cascade/isolate

    if (cascade === 1) {
      nscope = ns;
    } else {
      nscopealt = ns;
    }

    var selectors = [nscope];
    var result; // execute plugins, pre-process context

    if (plugged > 0) {
      result = proxy(PREPS, input, selectors, selectors, line, column, 0, 0, 0, 0);

      if (result !== void 0 && typeof result === 'string') {
        input = result;
      }
    } // build


    var output = compile(array, selectors, input, 0, 0); // execute plugins, post-process context

    if (plugged > 0) {
      result = proxy(POSTS, output, selectors, selectors, line, column, output.length, 0, 0, 0); // bypass minification

      if (result !== void 0 && typeof (output = result) !== 'string') {
        code = 0;
      }
    } // reset


    key = '';
    nscope = '';
    nscopealt = '';
    pattern = 0;
    line = 1;
    column = 1;
    return compress * code === 0 ? output : minify(output);
  }

  stylis['use'] = use;
  stylis['set'] = set;

  if (options !== void 0) {
    set(options);
  }

  return stylis;
});
});

// stylis minify CSS and add vendor prefixes
//   prefix: (key, value, context) => {
//     console.log("key, value, context", key, value, context);
//     return true;
//   }
// });

function processStyle(key, rules) {
  if (key) return stylis(`.${key}`, rules); // Inline styles does not need the class selector

  const out = stylis('', rules);
  return out.substr(1, out.length - 2);
}

function getClassNewName(className, componentDefId) {
  return `${className}--${componentDefId}`;
}

function getClassesRules(componentDefId, componentDefClasses) {
  if (!componentDefClasses) return null;
  const classKeys = Object.keys(componentDefClasses);
  return classKeys.reduce((acum, key) => {
    const newClassName = getClassNewName(key, componentDefId);
    return `${acum}${processStyle(newClassName, componentDefClasses[key])}`;
  }, '');
}

function getStyles(componentStyles = {}) {
  const styleKeys = Object.keys(componentStyles); // Return only inlineStyles to be attached to the component

  return styleKeys.reduce((acum, key) => {
    const styleDefinition = componentStyles[key];
    const isFunction = typeof styleDefinition === 'function';
    return { ...acum,
      [key]: isFunction ? (...args) => processStyle(null, styleDefinition(...args)) : processStyle(null, styleDefinition)
    };
  }, {});
}

function getFinalProps(args) {
  const props = args.props || {};
  const {
    store,
    componentDef,
    processedStyles,
    utils
  } = args;
  const state = componentDef.state ? componentDef.state(props, store) : {};
  const actions = componentDef.actions ? componentDef.actions(props, store) : {};

  const classes = className => getClassNewName(className, componentDef.id);

  return {
    props,
    state,
    actions,
    styles: processedStyles,
    classes,
    utils
  };
}

function getStore(Store, componentDefId) {
  return {
    alerts: Store.objects.alerts,
    addAlert: Store.methods.alertOn,
    check: Store.methods.check,
    toggle: Store.methods.toggle,
    set: Store.methods.set,
    setItem: Store.methods.setItem,
    call: Store.process.call,
    callServer: Store.methods.callServer,
    get: Store.methods.get(componentDefId),
    route: Store.router.route,
    utils: {
      get: Store.utils.get,
      uid: Store.utils.uid,
      localize: Store.utils.localize(Store.objects.observables.language)
    },
    db: Store.db ? Store.db.query : () => undefined
  };
}

// import morphdom from 'morphdom';
var createHoc = ((Store, appData, isBrowser) => {
  const {
    isProduction
  } = appData; // In browser clean component-styles on each refresh

  if (isBrowser && !isProduction) {
    console.log("isProduction", isProduction);
    const headStyles = document.getElementById('component-styles');
    headStyles.innerText = '';
  }

  return componentDef => {
    if (!componentDef.id) componentDef.id = 1000; // Default value, used for rootComponent

    Store.render.registerComponent(componentDef);
    const classesRules = getClassesRules(componentDef.id, componentDef.classes);
    registerStyles(componentDef.id, classesRules, isBrowser, isProduction);
    const store = getStore(Store);
    const utils = store.utils;
    const processedStyles = getStyles(componentDef.styles);
    return function renderComponent(props, children) {
      if (!Store.objects.flags.IS_MOUNTED && componentDef.mounted) {
        Store.methods.on('MOUNTED', () => {
          componentDef.mounted(props, store);
        });
      }

      const allProps = getFinalProps({
        props,
        utils,
        store,
        componentDef,
        processedStyles
      });
      const domNode = componentDef.render(allProps, children);
      return domNode;
    };
  };
});

const isSvgElement = tag => {
  return ['circle', 'defs', 'ellipse', 'g', 'line', 'path', 'polygon', 'polyline', 'rect', 'svg', 'text', 'use'].includes(tag);
};

const isSpecialProp = propName => {
  return ['__innerHTML'].includes(propName);
};

const appendText = (el, text) => {
  const textNode = document.createTextNode(text);
  el.appendChild(textNode);
};

const addSpecialProp = (el, propName, value) => {
  if (propName === '__innerHTML') el.innerHTML = value;
};

const appendArray = (el, children) => {
  children.forEach(child => {
    if (Array.isArray(child)) {
      appendArray(el, child);
    } else if (child instanceof window.Element) {
      el.appendChild(child);
    } else if (typeof child === 'string') {
      appendText(el, child);
    }
  });
};

var utils$1 = {
  isSvgElement,
  isSpecialProp,
  addSpecialProp,
  appendText,
  appendArray
};

const NS = 'http://www.w3.org/2000/svg';
var createHDom = ((Store, isBrowser) => (tag, props = {}, ...children) => {
  const isFunction = typeof tag === 'function';

  if (isFunction) {
    if (!props) return tag();
    return tag({ ...props
    }, children);
  }

  const isSvg = utils$1.isSvgElement(tag);
  const el = isSvg ? document.createElementNS(NS, tag) : document.createElement(tag);

  if (children instanceof window.Element) {
    el.appendChild(children);
  } else if (typeof children === 'string') {
    utils$1.appendText(el, children);
  } else if (Array.isArray(children)) {
    utils$1.appendArray(el, children);
  }

  if (props) {
    Object.keys(props).forEach(propName => {
      const value = props[propName]; // Register event handlers to tell morphdom to always update them

      if (propName.startsWith('on')) Store.render.Events[propName] = true;

      if (propName === 'style' && !isBrowser) {
        // A hack to properly parse styles on the server, later will be transformed to just style attr
        el.setAttribute('data-style', value);
      } else if (propName === 'class') {
        el.className = value;
      } else if (propName in el) {
        if (value) el[propName] = value;
      } else if (utils$1.isSpecialProp(propName)) {
        utils$1.addSpecialProp(el, propName, value);
      } else if (propName.startsWith('data-')) {
        el.setAttribute(propName, value);
      } else {
        console.warn(`${propName} is not a valid property of a <${tag}>`);
      }
    });
  } // if (tag === 'button') console.log(el);


  return el;
});

function createScript(scriptId, src) {
  if (document.getElementById(scriptId)) return;
  const script = document.createElement('script');
  script.id = scriptId;
  script.src = src;
  script.async = 1;
  script.defer = 1;
  document.body.appendChild(script);
}

var utils$2 = {
  prepareComponents(client, family, components, startWith) {
    let id = startWith;
    Object.keys(components).forEach(key => {
      const moduleDef = components[key];
      client.ui[family][key] = moduleDef(client, id);
      id++;
    });
  }

};

function createClient(args, isBrowser) {
  const {
    Store,
    lib,
    components,
    fragments,
    pages,
    appData
  } = args; // Initialization

  const client = {
    h: createHDom(Store, isBrowser),
    ui: {
      components: {},
      fragments: {},
      pages: {}
    },
    createScript
  }; // Store is necessary to create the HOC

  client.hoc = createHoc(Store, appData, isBrowser); // Attach lib for convenience

  client.lib = lib; // Components && Fragments

  utils$2.prepareComponents(client, 'components', components, 4000);
  utils$2.prepareComponents(client, 'fragments', fragments, 3000);
  utils$2.prepareComponents(client, 'pages', pages, 2000);
  return client;
}

var init = ((config, isBrowser = false) => {
  const {
    store,
    lib,
    rootComponent,
    rootNodeId,
    components = {},
    fragments = {},
    pages = {}
  } = config;
  const Store = createStore({ ...store,
    rootNodeId,
    rootComponent
  });
  if (isBrowser) window.Store = Store;
  const appData = isBrowser ? window[globals.WINDOW_APP_DATA] : null;
  console.log("appData", appData);

  const _client = createClient({
    Store,
    lib,
    components,
    fragments,
    pages,
    appData
  }, isBrowser);

  if (isBrowser) {
    window.onload = () => {
      Store.render.startApp({
        appData,
        client: _client
      });
    };
  }

  return _client;
});

const client = {
  init
};

export { client };
