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
    // }, `${baseServer}/${path}`);
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
  return (page, complement = '') => {
    const {
      moduleName,
      routes,
      ports,
      isProduction,
      baseServer,
      baseFolder
    } = Store.router.appData;
    const urlToGo = baseFolder ? `${baseFolder}/${page}${complement}` : `${page}${complement}`; // If page is on same service we use history object and just replace it

    const findPageModule = Object.keys(routes).reduce((acum, key) => {
      if (routes[key].includes(page)) return key;
      return acum;
    }, false);

    if (findPageModule && findPageModule === moduleName) {
      console.log("urlToGo", urlToGo);
      console.log("page", page);
      window.history.replaceState(null, null, urlToGo);
    } else {
      // Otherwise, in development we need to consider the right port
      const url = isProduction ? `/${urlToGo}` : `https://${baseServer}:${ports[findPageModule].http}/${urlToGo}`;
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
        if (fromEl.hasAttribute('data-skip-morph')) return false;
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
  GET_MODEL_DATA_METHOD: '@server-model.getData',
  IMPORT_STYLIS: 'import \'/js/dev/3rd/stylis.js\';'
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
        return resolve({
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
    if (items.length === 0) return resolve({
      instance,
      counter,
      newTimestamp
    });
    const modelStore = instance.transaction(['model'], 'readwrite').objectStore('model');
    const requestPrevRecords = modelStore.getAll();

    requestPrevRecords.onsuccess = () => {
      const previousRecords = requestPrevRecords.result;
      items.forEach(item => {
        if (item.attrs.length === 0) return resolve({
          instance,
          counter,
          newTimestamp
        });
        const findRecord = previousRecords.find(rec => rec._id === item._id);
        const putRequest = modelStore.put({
          _id: item._id,
          domain: item.domain,
          attrs: findRecord ? [...findRecord.attrs, ...item.attrs] : item.attrs
        });

        putRequest.onsuccess = () => {
          counter++;
          if (counter === items.length) return resolve({
            instance,
            counter,
            newTimestamp
          });
        };
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
      return resolve({
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
    if (data && data.length > 0) {
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
      baseServer,
      baseFolder,
      moduleName,
      ports,
      isProduction,
      useServiceWorker
    } = appData;
    Store.router.appData = appData;
    Store.router.siteUrl = isProduction ? `https://${baseServer}${baseFolder ? `/${baseFolder}` : ''}` // ? `https://${baseServer}/${baseFolder}`
    : `https://${baseServer}:${ports[moduleName].http}${baseFolder ? `/${baseFolder}` : ''}`;
    Store.router.socketUrl = !ports[moduleName].socket ? null : isProduction ? `wss://${baseServer}` // ? `wss://${baseServer}/${baseFolder}`
    : `ws://${baseServer}:${ports[moduleName].socket}`;
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
    values: {},
    // just static values, acts as a global container and has no methods attached
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

function addStylesToHead(registerNumber, styledRules, isBrowser, isProduction) {
  if (!styledRules) return;

  if (isBrowser && !isProduction) {
    const headStyles = document.getElementById('component-styles');
    headStyles.innerText += styledRules;
  } else {
    if (!global.__componentStyles) global.__componentStyles = '';
    global.__componentStyles += styledRules;
  }
}

function parseStyleRules(stylis) {
  return (key, rules) => {
    if (!stylis) return `.${key} {${rules.replace(/(\s\s\s*)/g, ' ')}} `;
    if (key) return stylis(`.${key}`, rules); // Inline styles does not need the class selector

    const out = stylis('', rules);
    return out.substr(1, out.length - 2);
  };
}

function getClassNewName(className, componentDefId) {
  return `${className}--${componentDefId}`;
}

function getClassesRules(stylis) {
  return (componentDefId, componentDefClasses) => {
    if (!componentDefClasses) return null;
    const classKeys = Object.keys(componentDefClasses);
    return classKeys.reduce((acum, key) => {
      const newClassName = getClassNewName(key, componentDefId); // const

      return `${acum}${parseStyleRules(stylis)(newClassName, componentDefClasses[key])}`;
    }, '');
  };
}

const prefixes = ['', '-webkit-', '-moz-'];
const toBePrefixed = ['transform', 'border-radius'];

function prefix(str) {
  const applyPrefix = (prop, value) => {
    if (!toBePrefixed.includes(prop)) return `${prop}:${value}`;
    return prefixes.reduce((acum, pref) => `${acum}${pref}${prop}:${value};`, '');
  };

  const prefRegex = new RegExp(`(${toBePrefixed.join('|')}):(.+)`, 'g');
  return str.replace(prefRegex, (...args) => applyPrefix(args[1], args[2])).replace(/^\s+|\s+$|\s+(?=\s)/g, '').replace(/\t/gm, '').replace(/\n/gm, '').replace(/;;/g, ';');
}

function prefixInlineStyles(componentStyles = {}) {
  const styleKeys = Object.keys(componentStyles); // Return only inlineStyles to be attached to the component

  return styleKeys.reduce((acum, key) => {
    const styleDefinition = componentStyles[key];
    return { ...acum,
      [key]: (...args) => prefix(styleDefinition(...args))
    };
  }, {});
}

var styles = {
  getClassesRules,
  prefixInlineStyles,
  addStylesToHead,
  getClassNewName
};

function getFinalProps(args) {
  const {
    props = {},
    store,
    componentDef,
    inlineStyles,
    utils
  } = args;
  const state = componentDef.state ? componentDef.state(props, store) : {};
  const actions = componentDef.actions ? componentDef.actions(props, store) : {};

  const classes = className => getClassNewName(className, componentDef.id);

  return {
    props,
    state,
    actions,
    styles: inlineStyles,
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
    values: Store.objects.values,
    utils: {
      get: Store.utils.get,
      uid: Store.utils.uid,
      localize: Store.utils.localize(Store.objects.observables.language)
    },
    db: Store.db ? Store.db.query : () => undefined
  };
}

// import morphdom from 'morphdom';
var createHoc = ((Store, {
  appData,
  isBrowser,
  stylis
}) => {
  const {
    isProduction
  } = appData;
  const {
    addStylesToHead,
    getClassesRules,
    prefixInlineStyles
  } = styles; // In browser clean component-styles on each refresh

  if (isBrowser && !isProduction) {
    const headStyles = document.getElementById('component-styles');
    headStyles.innerText = '';
  }

  return componentDef => {
    if (!componentDef.id) componentDef.id = 1000; // Default value, used for rootComponent

    Store.render.registerComponent(componentDef);
    const classesRules = getClassesRules(stylis)(componentDef.id, componentDef.classes);
    addStylesToHead(componentDef.id, classesRules, isBrowser, isProduction);
    const store = getStore(Store);
    const utils = store.utils;
    const inlineStyles = prefixInlineStyles(componentDef.styles);
    return function renderComponent(props, children) {
      if (!Store.objects.flags.IS_MOUNTED && componentDef.mounted) {
        Store.methods.on('MOUNTED', () => componentDef.mounted(props, store));
      }

      const allProps = getFinalProps({
        props,
        utils,
        store,
        componentDef,
        inlineStyles
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

var addIdToComponents = ((client, family, components, startWith) => {
  let id = startWith;
  Object.keys(components).forEach(key => {
    const moduleDef = components[key];
    client.ui[family][key] = moduleDef(client, id);
    id++;
  });
});

function createClient(args, options) {
  const {
    Store,
    lib,
    components,
    fragments,
    pages,
    appData
  } = args;
  const {
    isBrowser,
    stylis
  } = options; // Initialization

  const client = {
    h: createHDom(Store, isBrowser),
    ui: {
      components: {},
      fragments: {},
      pages: {}
    },
    createScript
  }; // Store is necessary to create the HOC

  client.hoc = createHoc(Store, {
    appData,
    isBrowser,
    stylis
  }); // Attach lib for convenience

  client.lib = lib; // Components && Fragments

  addIdToComponents(client, 'components', components, 4000);
  addIdToComponents(client, 'fragments', fragments, 3000);
  addIdToComponents(client, 'pages', pages, 2000);
  return client;
}

var init = ((config, options) => {
  const {
    store,
    lib,
    rootComponent,
    rootNodeId,
    components = {},
    fragments = {},
    pages = {}
  } = config;
  const {
    appData: appDataFromServer,
    isBrowser = false,
    stylis = false
  } = options;
  const Store = createStore({ ...store,
    rootNodeId,
    rootComponent
  });
  if (isBrowser) window.Store = Store;
  const appData = isBrowser ? window[globals.WINDOW_APP_DATA] : appDataFromServer;

  const _client = createClient({
    Store,
    lib,
    components,
    fragments,
    pages,
    appData
  }, {
    isBrowser,
    stylis
  });

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
