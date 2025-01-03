/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 125);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(18);
var hide = __webpack_require__(11);
var redefine = __webpack_require__(12);
var ctx = __webpack_require__(19);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(49)('wks');
var uid = __webpack_require__(33);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(91);
var toPrimitive = __webpack_require__(22);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(24);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(23);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(32);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(11);
var has = __webpack_require__(14);
var SRC = __webpack_require__(33)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(18).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(3);
var defined = __webpack_require__(23);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(46);
var defined = __webpack_require__(23);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(47);
var createDesc = __webpack_require__(32);
var toIObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(22);
var has = __webpack_require__(14);
var IE8_DOM_DEFINE = __webpack_require__(91);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(14);
var toObject = __webpack_require__(9);
var IE_PROTO = __webpack_require__(66)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(10);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(18);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(19);
var IObject = __webpack_require__(46);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var asc = __webpack_require__(83);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(6)) {
  var LIBRARY = __webpack_require__(30);
  var global = __webpack_require__(2);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(60);
  var $buffer = __webpack_require__(89);
  var ctx = __webpack_require__(19);
  var anInstance = __webpack_require__(39);
  var propertyDesc = __webpack_require__(32);
  var hide = __webpack_require__(11);
  var redefineAll = __webpack_require__(41);
  var toInteger = __webpack_require__(24);
  var toLength = __webpack_require__(8);
  var toIndex = __webpack_require__(117);
  var toAbsoluteIndex = __webpack_require__(35);
  var toPrimitive = __webpack_require__(22);
  var has = __webpack_require__(14);
  var classof = __webpack_require__(48);
  var isObject = __webpack_require__(4);
  var toObject = __webpack_require__(9);
  var isArrayIter = __webpack_require__(80);
  var create = __webpack_require__(36);
  var getPrototypeOf = __webpack_require__(17);
  var gOPN = __webpack_require__(37).f;
  var getIterFn = __webpack_require__(82);
  var uid = __webpack_require__(33);
  var wks = __webpack_require__(5);
  var createArrayMethod = __webpack_require__(26);
  var createArrayIncludes = __webpack_require__(50);
  var speciesConstructor = __webpack_require__(57);
  var ArrayIterators = __webpack_require__(85);
  var Iterators = __webpack_require__(44);
  var $iterDetect = __webpack_require__(54);
  var setSpecies = __webpack_require__(38);
  var arrayFill = __webpack_require__(84);
  var arrayCopyWithin = __webpack_require__(107);
  var $DP = __webpack_require__(7);
  var $GOPD = __webpack_require__(16);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(112);
var $export = __webpack_require__(0);
var shared = __webpack_require__(49)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(115))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(33)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(14);
var setDesc = __webpack_require__(7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(11)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(93);
var enumBugKeys = __webpack_require__(67);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(24);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(94);
var enumBugKeys = __webpack_require__(67);
var IE_PROTO = __webpack_require__(66)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(64)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(68).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(93);
var hiddenKeys = __webpack_require__(67).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var dP = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(19);
var call = __webpack_require__(105);
var isArrayIter = __webpack_require__(80);
var anObject = __webpack_require__(1);
var toLength = __webpack_require__(8);
var getIterFn = __webpack_require__(82);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(12);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f;
var has = __webpack_require__(14);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(23);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(70);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(20);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(20);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(18);
var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(30) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(15);
var toLength = __webpack_require__(8);
var toAbsoluteIndex = __webpack_require__(35);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(20);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4);
var cof = __webpack_require__(20);
var MATCH = __webpack_require__(5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(11);
var redefine = __webpack_require__(12);
var fails = __webpack_require__(3);
var defined = __webpack_require__(23);
var wks = __webpack_require__(5);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(12);
var redefineAll = __webpack_require__(41);
var meta = __webpack_require__(29);
var forOf = __webpack_require__(40);
var anInstance = __webpack_require__(39);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(54);
var setToStringTag = __webpack_require__(42);
var inheritIfRequired = __webpack_require__(71);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(11);
var uid = __webpack_require__(33);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(30) || !__webpack_require__(3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(2)[K];
});


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var ctx = __webpack_require__(19);
var forOf = __webpack_require__(40);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(18);
var LIBRARY = __webpack_require__(30);
var wksExt = __webpack_require__(92);
var defineProperty = __webpack_require__(7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(49)('keys');
var uid = __webpack_require__(33);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 67 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(19)(Function.call, __webpack_require__(16).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(69).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(24);
var defined = __webpack_require__(23);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 73 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 74 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(24);
var defined = __webpack_require__(23);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(30);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(12);
var hide = __webpack_require__(11);
var Iterators = __webpack_require__(44);
var $iterCreate = __webpack_require__(77);
var setToStringTag = __webpack_require__(42);
var getPrototypeOf = __webpack_require__(17);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(36);
var descriptor = __webpack_require__(32);
var setToStringTag = __webpack_require__(42);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(11)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(53);
var defined = __webpack_require__(23);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(44);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7);
var createDesc = __webpack_require__(32);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(48);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(44);
module.exports = __webpack_require__(18).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(218);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(31);
var step = __webpack_require__(108);
var Iterators = __webpack_require__(44);
var toIObject = __webpack_require__(15);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(76)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(19);
var invoke = __webpack_require__(98);
var html = __webpack_require__(68);
var cel = __webpack_require__(64);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(20)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(86).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(20)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(10);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(6);
var LIBRARY = __webpack_require__(30);
var $typed = __webpack_require__(60);
var hide = __webpack_require__(11);
var redefineAll = __webpack_require__(41);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(39);
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(8);
var toIndex = __webpack_require__(117);
var gOPN = __webpack_require__(37).f;
var dP = __webpack_require__(7).f;
var arrayFill = __webpack_require__(84);
var setToStringTag = __webpack_require__(42);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 90 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(64)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(14);
var toIObject = __webpack_require__(15);
var arrayIndexOf = __webpack_require__(50)(false);
var IE_PROTO = __webpack_require__(66)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(34);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(15);
var gOPN = __webpack_require__(37).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(34);
var gOPS = __webpack_require__(51);
var pIE = __webpack_require__(47);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(46);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(10);
var isObject = __webpack_require__(4);
var invoke = __webpack_require__(98);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 98 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt;
var $trim = __webpack_require__(43).trim;
var ws = __webpack_require__(70);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat;
var $trim = __webpack_require__(43).trim;

module.exports = 1 / $parseFloat(__webpack_require__(70) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(20);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 103 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(73);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(46);
var toLength = __webpack_require__(8);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(6) && /./g.flags != 'g') __webpack_require__(7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(55)
});


/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(88);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(113);
var validate = __webpack_require__(45);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(59)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(7).f;
var create = __webpack_require__(36);
var redefineAll = __webpack_require__(41);
var ctx = __webpack_require__(19);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var $iterDefine = __webpack_require__(76);
var step = __webpack_require__(108);
var setSpecies = __webpack_require__(38);
var DESCRIPTORS = __webpack_require__(6);
var fastKey = __webpack_require__(29).fastKey;
var validate = __webpack_require__(45);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(113);
var validate = __webpack_require__(45);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(59)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(26)(0);
var redefine = __webpack_require__(12);
var meta = __webpack_require__(29);
var assign = __webpack_require__(96);
var weak = __webpack_require__(116);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var validate = __webpack_require__(45);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(59)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(41);
var getWeak = __webpack_require__(29).getWeak;
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var createArrayMethod = __webpack_require__(26);
var $has = __webpack_require__(14);
var validate = __webpack_require__(45);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(8);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(37);
var gOPS = __webpack_require__(51);
var anObject = __webpack_require__(1);
var Reflect = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(52);
var isObject = __webpack_require__(4);
var toLength = __webpack_require__(8);
var ctx = __webpack_require__(19);
var IS_CONCAT_SPREADABLE = __webpack_require__(5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(8);
var repeat = __webpack_require__(72);
var defined = __webpack_require__(23);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(34);
var toIObject = __webpack_require__(15);
var isEnum = __webpack_require__(47).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(48);
var from = __webpack_require__(123);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(40);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 124 */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(126);
module.exports = __webpack_require__(328);


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(127);

__webpack_require__(324);

__webpack_require__(325);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(90)))

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(128);
__webpack_require__(130);
__webpack_require__(131);
__webpack_require__(132);
__webpack_require__(133);
__webpack_require__(134);
__webpack_require__(135);
__webpack_require__(136);
__webpack_require__(137);
__webpack_require__(138);
__webpack_require__(139);
__webpack_require__(140);
__webpack_require__(141);
__webpack_require__(142);
__webpack_require__(143);
__webpack_require__(144);
__webpack_require__(146);
__webpack_require__(147);
__webpack_require__(148);
__webpack_require__(149);
__webpack_require__(150);
__webpack_require__(151);
__webpack_require__(152);
__webpack_require__(153);
__webpack_require__(154);
__webpack_require__(155);
__webpack_require__(156);
__webpack_require__(157);
__webpack_require__(158);
__webpack_require__(159);
__webpack_require__(160);
__webpack_require__(161);
__webpack_require__(162);
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(165);
__webpack_require__(166);
__webpack_require__(167);
__webpack_require__(168);
__webpack_require__(169);
__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(85);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(109);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(112);
__webpack_require__(114);
__webpack_require__(115);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(323);
module.exports = __webpack_require__(18);


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(14);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(12);
var META = __webpack_require__(29).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(49);
var setToStringTag = __webpack_require__(42);
var uid = __webpack_require__(33);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(92);
var wksDefine = __webpack_require__(65);
var enumKeys = __webpack_require__(129);
var isArray = __webpack_require__(52);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var toIObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(22);
var createDesc = __webpack_require__(32);
var _create = __webpack_require__(36);
var gOPNExt = __webpack_require__(95);
var $GOPD = __webpack_require__(16);
var $DP = __webpack_require__(7);
var $keys = __webpack_require__(34);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(37).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(47).f = $propertyIsEnumerable;
  __webpack_require__(51).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(30)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(34);
var gOPS = __webpack_require__(51);
var pIE = __webpack_require__(47);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(36) });


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperties: __webpack_require__(94) });


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(15);
var $getOwnPropertyDescriptor = __webpack_require__(16).f;

__webpack_require__(25)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(9);
var $getPrototypeOf = __webpack_require__(17);

__webpack_require__(25)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(9);
var $keys = __webpack_require__(34);

__webpack_require__(25)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(25)('getOwnPropertyNames', function () {
  return __webpack_require__(95).f;
});


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(29).onFreeze;

__webpack_require__(25)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(29).onFreeze;

__webpack_require__(25)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(29).onFreeze;

__webpack_require__(25)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(96) });


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(145) });


/***/ }),
/* 145 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(69).set });


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(48);
var test = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(12)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(97) });


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(17);
var HAS_INSTANCE = __webpack_require__(5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(7).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(99);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(100);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var has = __webpack_require__(14);
var cof = __webpack_require__(20);
var inheritIfRequired = __webpack_require__(71);
var toPrimitive = __webpack_require__(22);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(37).f;
var gOPD = __webpack_require__(16).f;
var dP = __webpack_require__(7).f;
var $trim = __webpack_require__(43).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(36)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(12)(global, NUMBER, $Number);
}


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(24);
var aNumberValue = __webpack_require__(101);
var repeat = __webpack_require__(72);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(101);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(102) });


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(102);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(100);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(99);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(103);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(73);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(74);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(104) });


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(103) });


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(73) });


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(74);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(74);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(35);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var toLength = __webpack_require__(8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(43)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(75)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(76)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(75)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(78);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(79)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(78);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(79)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(72)
});


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(78);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(79)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(13)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(13)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(13)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(13)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(13)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(13)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(13)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(13)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(13)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(13)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(13)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(13)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(13)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(22);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(207);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(12)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(11)(proto, TO_PRIMITIVE, __webpack_require__(210));


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(22);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(52) });


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(19);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var call = __webpack_require__(105);
var isArrayIter = __webpack_require__(80);
var toLength = __webpack_require__(8);
var createProperty = __webpack_require__(81);
var getIterFn = __webpack_require__(82);

$export($export.S + $export.F * !__webpack_require__(54)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(81);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(46) != Object || !__webpack_require__(21)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(68);
var cof = __webpack_require__(20);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(21)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(26)(0);
var STRICT = __webpack_require__(21)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(52);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(26)(1);

$export($export.P + $export.F * !__webpack_require__(21)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(26)(2);

$export($export.P + $export.F * !__webpack_require__(21)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(26)(3);

$export($export.P + $export.F * !__webpack_require__(21)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(26)(4);

$export($export.P + $export.F * !__webpack_require__(21)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(106);

$export($export.P + $export.F * !__webpack_require__(21)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(106);

$export($export.P + $export.F * !__webpack_require__(21)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(50)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(21)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(8);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(21)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(107) });

__webpack_require__(31)('copyWithin');


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(84) });

__webpack_require__(31)('fill');


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(31)(KEY);


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(31)(KEY);


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('Array');


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var inheritIfRequired = __webpack_require__(71);
var dP = __webpack_require__(7).f;
var gOPN = __webpack_require__(37).f;
var isRegExp = __webpack_require__(53);
var $flags = __webpack_require__(55);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(12)(global, 'RegExp', $RegExp);
}

__webpack_require__(38)('RegExp');


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(109);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(55);
var DESCRIPTORS = __webpack_require__(6);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(12)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(56)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(56)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(56)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(56)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(53);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(30);
var global = __webpack_require__(2);
var ctx = __webpack_require__(19);
var classof = __webpack_require__(48);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(10);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var speciesConstructor = __webpack_require__(57);
var task = __webpack_require__(86).set;
var microtask = __webpack_require__(87)();
var newPromiseCapabilityModule = __webpack_require__(88);
var perform = __webpack_require__(110);
var userAgent = __webpack_require__(58);
var promiseResolve = __webpack_require__(111);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(41)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(42)($Promise, PROMISE);
__webpack_require__(38)(PROMISE);
Wrapper = __webpack_require__(18)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(54)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(116);
var validate = __webpack_require__(45);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(59)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(60);
var buffer = __webpack_require__(89);
var anObject = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);
var isObject = __webpack_require__(4);
var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
var speciesConstructor = __webpack_require__(57);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(38)(ARRAY_BUFFER);


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(60).ABV, {
  DataView: __webpack_require__(89).DataView
});


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var rApply = (__webpack_require__(2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(36);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var bind = __webpack_require__(97);
var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(7);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(22);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(16).f;
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(77)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(16);
var getPrototypeOf = __webpack_require__(17);
var has = __webpack_require__(14);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(16);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(17);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(118) });


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(7);
var gOPD = __webpack_require__(16);
var getPrototypeOf = __webpack_require__(17);
var has = __webpack_require__(14);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(32);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(69);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(50)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(31)('includes');


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(119);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var aFunction = __webpack_require__(10);
var arraySpeciesCreate = __webpack_require__(83);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(31)('flatMap');


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(119);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var toInteger = __webpack_require__(24);
var arraySpeciesCreate = __webpack_require__(83);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(31)('flatten');


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0);
var $at = __webpack_require__(75)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(120);
var userAgent = __webpack_require__(58);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(120);
var userAgent = __webpack_require__(58);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(43)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(43)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(0);
var defined = __webpack_require__(23);
var toLength = __webpack_require__(8);
var isRegExp = __webpack_require__(53);
var getFlags = __webpack_require__(55);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(77)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(65)('asyncIterator');


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(65)('observable');


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(118);
var toIObject = __webpack_require__(15);
var gOPD = __webpack_require__(16);
var createProperty = __webpack_require__(81);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(121)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(121)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(6) && $export($export.P + __webpack_require__(61), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(6) && $export($export.P + __webpack_require__(61), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(17);
var getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(61), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(17);
var getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(61), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(122)('Map') });


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(122)('Set') });


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(62)('Map');


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(62)('Set');


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(62)('WeakMap');


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(62)('WeakSet');


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(63)('Map');


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(63)('Set');


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(63)('WeakMap');


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(63)('WeakSet');


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(2) });


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(2) });


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(20);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(124);
var fround = __webpack_require__(104);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(124) });


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(0);
var core = __webpack_require__(18);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(57);
var promiseResolve = __webpack_require__(111);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(88);
var perform = __webpack_require__(110);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(114);
var from = __webpack_require__(123);
var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(87)();
var process = __webpack_require__(2).process;
var isNode = __webpack_require__(20)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(0);
var global = __webpack_require__(2);
var core = __webpack_require__(18);
var microtask = __webpack_require__(87)();
var OBSERVABLE = __webpack_require__(5)('observable');
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var anInstance = __webpack_require__(39);
var redefineAll = __webpack_require__(41);
var hide = __webpack_require__(11);
var forOf = __webpack_require__(40);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(38)('Observable');


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var userAgent = __webpack_require__(58);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(86);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(85);
var getKeys = __webpack_require__(34);
var redefine = __webpack_require__(12);
var global = __webpack_require__(2);
var hide = __webpack_require__(11);
var Iterators = __webpack_require__(44);
var wks = __webpack_require__(5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(90)))

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(326);
module.exports = __webpack_require__(18).RegExp.escape;


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(327)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 327 */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(329);
//require('./js/force');  

__webpack_require__(330);
__webpack_require__(331);
__webpack_require__(332);
__webpack_require__(333);
__webpack_require__(334);
__webpack_require__(335);
__webpack_require__(336);
__webpack_require__(337);
__webpack_require__(338);
__webpack_require__(339);
__webpack_require__(340);
__webpack_require__(341);

var modal = document.getElementById('msimpleModal');
var modalBtn = document.getElementById('mmodalBtn');
var closeBtn = document.getElementsByClassName('mcloseBtn')[0];

modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

function openModal() {
  modal.style.display = 'block';
}
function closeModal() {
  modal.style.display = 'none';
}
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
};

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.getElementById("dailyNav").innerHTML = "\n  <nav class=\"navbar navbar-toggleable-sm  fixed-top bg-primary app-navbar\">\n    <button aria-controls=\"navbarResponsive\" aria-expanded=\"false\" aria-label=\"Toggle navigation\" class=\"navbar-toggler navbar-toggler-center hidden-md-up\"\n      data-target=\"#navbarResponsive\" data-toggle=\"collapse\" type=\"button\" on-click=\"fadeUp()\" id=\"toggler\"> </button>\n\n    <div class=\"collapse navbar-collapse   multi_drop_menu   menu\" id=\"navbarResponsive\">\n      <ul class=\"navbar-nav mr-auto \">\n        <li class=\"nav-item   \"> \n          <a class=\"nav-link\" href=\"/\"\n          data-target=\"#navbarResponsive\" data-toggle=\"collapse\" type=\"button\" on-click=\"fadeUp()\" >\n            <span class=\" subdailytech\"> TECH\n              <br />BLOG </span>\n          </a>\n        </li>\n        <li class=\"nav-item  \">\n          <a class=\"nav-link\" href=\"/archives\" \n          data-target=\"#navbarResponsive\" data-toggle=\"collapse\" type=\"button\" on-click=\"fadeUp()\">\n            <span class=\"subdailytech \">BLOG \u2728\uD83D\uDCE6\n              <br />ARCHIVES </span>\n          </a>\n        </li> \n        <li class=\"nav-item hidden\"  >\n          <a class=\"nav-link\" ng-href=\"https://www.ourdailytech.net/_For_Cat_Eyes_Only_/index.html\" title=\"tmm FICTION\" \n          data-target=\"#navbarResponsive\" data-toggle=\"collapse\" type=\"button\" > \n            <span class=\"caret subdailytech\">FOR_CAT\n              <br />EYES_ONLY</span>\n          </a>\n      \n  <a class=\"nav-link\" ng-href=\"/_For_Cat_Eyes_Only_\" title=\"tmm FICTION\" \n  data-target=\"#navbarResponsive\" data-toggle=\"collapse\" type=\"button\" > \n    <span class=\"caret subdailytech\">FOR_CAT\n      <br />EYES_ONLY</span>\n  </a>\n  <ul style=\"z-index:0\" class=\"menu-left\">\n            <li>\n              tmm FICTION\n              <a style=\"z-index:199; \" ng-href=\"https://www.ourdailytech.net/_For_Cat_Eyes_Only_/index.html\" title=\"tmm FICTION\"  \n              data-target=\"#navbarResponsive\" data-toggle=\"collapse\" type=\"button\"   >For Cat Eyes Only:\n                <i>Early Months of Win&#39;s Campaign</i>\n              </a>\n            </li>\n            <li style=\"z-index:199; \">\n              tmm FICTION\n              <a style=\"z-index:199; \" ng-href=\"https://www.ourdailytech.net/_For_Cat_Eyes_Only_/index.html#capturing\"  title=\"tmm FICTION\"  \n              data-target=\"#navbarResponsive\" data-toggle=\"collapse\" type=\"button\"  >Fiction Excerpts From:\n                <br />\n                <i>The Casperian Ancestries</i>\n                <br />\n                <small>Capturing One Cat&#39;s Past and Present</small>\n              </a>\n              tmm FICTION\n            </li>\n          </ul>\n        </li>\n        <li style=\"z-index:5\" class=\"nav-item\">\n          <a class=\"nav-link\" \n          data-target=\"#navbarResponsive\" data-toggle=\"collapse\" type=\"button\" on-click=\"fadeUp()\">\n            <span class=\" subdailytech\">CODING\n              <br /> TOOLS\n            </span>\n          </a>\n      \n     \n          <ul >\n          \n<!--START UL -->\n                         \n<li style=\"z-index:100;\">\n<a aria-expanded=\"false\" aria-haspopup=\"true\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\"> Web &nbsp;&nbsp;\n    <span> </span>\n</a>\n\n\n<ul>\n    <li style=\"z-index:100;\">\n        <a href=\"http://webreference.com/\" target=\"_blank\">Web Reference</a>\n    </li>\n    <li>\n        <a href=\"https://developer.mozilla.org\" target=\"_blank\">Mozilla Dev</a>\n    </li>\n    <li>\n        <a href=\"http://support.google.com/webmasters/?hl=en\" target=\"_blank\">Google Dev</a>\n    </li>\n    <li>\n        <a href=\"http://developer.yahoo.com/\" target=\"_blank\">Yahoo! Dev</a>\n    </li>\n    <li>\n        <a href=\"http://www.w3schools.com\" target=\"_blank\">W3 schools</a>\n    </li>\n    <li>\n        <a href=\"http://www.w3.org/\" target=\"_blank\">World Wide Web Consortium</a>\n    </li>\n    <li>\n        <a href=\"https://www.icann.org\" target=\"_blank\">ICANN</a>\n    </li>\n</ul>\n</li>\n<li style=\"z-index:98.2;\">\n<a aria-expanded=\"false\" aria-haspopup=\"true\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\"> D3 tools &nbsp;&nbsp; </a>\n<ul class=\"dropdown-menu\">\n    <li style=\"z-index:98\">\n        <a href=\"http://d3js.org\" target=\"_blank\">D3js</a>\n    </li>\n    <li style=\"z-index:98.5\">\n        <a href=\"https://github.com/d3/d3-3.x-api-reference/blob/master/API-Reference.md\">d3.v3</a>\n    </li>\n<!--    <li style=\"z-index:98.5\">\n        <a href=\"https://chartio.com/\" target=\"_blank\">chartio</a>\n    </li>\n    <li style=\"z-index:98.5\">\n    <a href=\"http://code.shutterstock.com/rickshaw/\" target=\"_blank\">rickshaw</a>\n</li>\n<li style=\"z-index:98.5\">\n    <a href=\"http://rawgraphs.io/\" target=\"_blank\">rawgraphs.io </a>\n</li>\n<li style=\"z-index:98.5\">\n    <a href=\"http://dimplejs.org\" target=\"_blank\">dimplejs</a>\n</li>\n<li style=\"z-index:98.5\">\n    <a href=\"http://nvd3.org/\" target=\"_blank\">nvd3</a>\n</li>\n<li style=\"z-index:98.5\">\n    <a href=\"https://developer.mozilla.org/en-US/docs/Web/SVG\" target=\"_blank\">SVG</a>\n</li>\n<li style=\"z-index:98.5\">\n    <a href=\"https://www.khronos.org/webgl/\" target=\"_blank\">WebGL</a>\n</li>\n<li style=\"z-index:98.5\">\n    <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API\" target=\"_blank\">Canvas</a>\n</li>\n<li>   \n<a href=\"https://www.telerik.com/kendo-ui\"  >  <i class=\"fa fa-cog\"></i></a>    \n</li>\n<li style=\"z-index:98.5\">\n    <a href=\"http://alignedleft.com/tutorials/d3/binding-data\" target=\"_blank\">binding-data</a>\n</li>\n<li style=\"z-index:98.5\">\n    <a href=\"http://datajournalismhandbook.org/1.0/en/getting_data_3.html\" target=\"_blank\">getting_data</a>\n</li>\n<li style=\"z-index:98.5\">\n    <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API\" target=\"_blank\">Canvas</a>\n</li>\n<li style=\"z-index:98.5\">\n    <a href=\"https://github.com/d3/d3/blob/master/CHANGES.md\" target=\"_blank\">d3.v4 changes</a>\n</li>\n-->\n<li style=\"z-index:98\">\n    <a href=\"https://github.com/d3/d3/blob/master/API.md\" target=\"_blank\">D3js APIs</a>\n</li>\n   \n</ul>\n</li>\n<li style=\"z-index:98;\">\n<a aria-expanded=\"false\" aria-haspopup=\"true\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\">Javascript &nbsp;&nbsp; </a>\n<ul class=\"dropdown-menu\">\n    <li style=\"z-index:98\">\n        <a href=\"https://jsbin.com\" target=\"_blank\">JS Bin</a>\n    </li>\n    <li style=\"z-index:98\">\n        <a href=\"https://developer.mozilla.org/en-US/docs/Web/API\" target=\"_blank\">JavaScript APIs</a>\n    </li>\n</ul>\n</li>\n<li style=\"z-index:10 ;\">\n<a aria-expanded=\"false\" aria-haspopup=\"true\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\">Datasets &nbsp;&nbsp;</a>\n<ul>\n    <li style=\"z-index:10 ;\">\n        <a href=\"http://www.icpsr.umich.edu/icpsrweb/ICPSR/index.jsp\" target=\"_blank\">ICPSR Datasets</a>\n    </li>\n    <li style=\"z-index:10 ;\">\n        <a href=\"http://data.imf.org/?sk=7CB6619C-CF87-48DC-9443-2973E161ABEB\" target=\"_blank\">Datasets IMF</a>\n    </li>\n</ul>\n</li>\n<li style=\"z-index:101;\">\n<a aria-expanded=\"false\" aria-haspopup=\"true\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\">Stats &nbsp;&nbsp;</a>\n<ul>\n    <li style=\"z-index:101;\">\n        <a href=\"https://stats.idre.ucla.edu/other/dae/\" target=\"_blank\">Stats</a>\n    </li>\n    <li style=\"z-index:101;\">\n        <a href=\"http://openrefine.org/\" target=\"_blank\">OpenRefine</a>\n    </li>\n    <li style=\"z-index:102;\">\n        <a href=\"http://statacumen.com\" target=\"_blank\">Stat Acumen</a>\n    </li>\n    <li style=\"z-index:102;\">\n        <a href=\"http://www.mapageweb.umontreal.ca/durandc/\" target=\"_blank\">Montr&eacute;al Stats</a>\n    </li>\n</ul>\n</li>\n<li style=\"z-index:12;\">\n<a aria-expanded=\"false\" aria-haspopup=\"true\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\">SQL &nbsp;&nbsp; </a>\n<ul>\n    <li style=\"z-index:12;\">\n        <a target=\"_blank\">MySQL &nbsp;&nbsp;</a>\n    </li>\n    <li style=\"z-index:12;\">\n        <a href=\"https://www.mysql.com/\" target=\"_blank\">MySQL</a>\n    </li>\n    <li style=\"z-index:121;\">\n        <a href=\"http://www.oracle.com/technetwork/developer-tools/apex/overview/index-155186.html\" target=\"_blank\">Oracle Express</a>\n    </li>\n    <li style=\"z-index:121;\">\n        <a href=\"http://iacademy.oracle.com\" target=\"_blank\">Application Express</a>\n    </li>\n</ul>\n</li>\n<li style=\"z-index:1;\">\n<a aria-expanded=\"false\" aria-haspopup=\"true\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\"> R-Project &nbsp;&nbsp; </a>\n<ul>\n    <li style=\"z-index:1;\">\n        <a href=\"https://www.r-project.org/\" target=\"_blank\">R-Project </a>\n    </li>\n    <li>\n        <a href=\"https://www.rstudio.com/\" target=\"_blank\">RStudio</a>\n    </li>\n    <li>\n        <a href=\"https://shiny.rstudio.com/\" target=\"_blank\">Shiny</a>\n    </li>\n    <li>\n        <a href=\"http://amsantac.co/blog/en/2015/10/31/qgis-r.html\" target=\"_blank\">Open GIS</a>\n    </li>\n    <li>\n        <a href=\"http://www.tableau.com/products/cloud-bi\" target=\"_blank\">Tableau </a>\n    </li>\n</ul>\n</li>\n<li style=\"z-index:1;\">\n<a aria-expanded=\"false\" aria-haspopup=\"true\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\"> Python &nbsp;&nbsp; </a>\n<ul>\n    <li style=\"z-index:1;\">\n        <a href=\"https://www.python.org/\" target=\"_blank\">Python.org</a>\n    </li>\n    <li>\n        <a href=\"https://pypi.python.org/pypi\" target=\"_blank\">Python Package Index</a>\n    </li>\n    <li>\n        <a href=\"https://docs.python.org/2/library/index.html\" target=\"_blank\">Python Standard Library</a>\n    </li>\n    <li>\n        <a href=\"https://pandas.pydata.org/pandas-docs/stable/\" target=\"_blank\">Pandas Data Analysis Toolkit</a>\n    </li>\n</ul>\n</li>\n<li style=\"z-index:9;\">\n<a aria-expanded=\"false\" aria-haspopup=\"true\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\">Validators &nbsp;&nbsp;</a>\n<ul>\n    <li style=\"z-index:9;\">\n        <a href=\"https://stats.idre.ucla.edu/other/dae/\" target=\"_blank\">Validators </a>\n    </li>\n    <li>\n        <a href=\"http://validator.w3.org\" target=\"_blank\">HTML validator</a>\n    </li>\n    <li>\n        <a href=\"http://jigsaw.w3.org/css-validator/\" target=\"_blank\">CSS validator</a>\n    </li>\n    <li>\n        <a href=\"http://jsonlint.com/\" target=\"_blank\">JSON Validator</a>\n    </li>\n</ul>\n</li>\n<li style=\"z-index:1;\">\n<a href=\"http://html-color-codes.info/\" target=\"_blank\">Color Codes</a>\n</li>\n<li style=\"z-index:1;\">\n<a href=\"https://inkscape.org/en/\" target=\"_blank\">Inkscape</a>\n</li>\n<li style=\"z-index:1;\">\n<a href=\"https://v4-alpha.getbootstrap.com\" target=\"_blank\">Bootstrap</a>\n</li>\n<li style=\"z-index:1;\">\n<a href=\"http://www.dynamicdrive.com/\" target=\"_blank\">Dynamic Drive</a>\n</li>\n<li style=\"z-index:1;\">\n<a href=\"http://php.net\" target=\"_blank\">PHP.net</a>\n</li>\n<li>\n<a href=\"http://www.useit.com/\" target=\"_blank\">Jakob Nielson</a>\n</li>\n<li>\n<a href=\"http://www.alistapart.com/\" target=\"_blank\">A List Apart</a>\n</li>\n<li>\n<a href=\"http://codepen.io/\" target=\"_blank\">codepen.io</a>\n</li>\n<li>\n<a href=\"http://www.sitepoint.com/\" target=\"_blank\">sitepoint</a>\n</li>\n<li>\n<a href=\"http://www.kaggle.com\" target=\"_blank\">Kaggle</a>\n</li>\n<li>\n<a href=\"http://plnkr.co/\" target=\"_blank\">Plunker</a>\n</li>\n<li>\n<a href=\"https://github.com\" target=\"_blank\">GitHub</a>\n</li>\n<li>\n<a href=\"https://gist.github.com/\" target=\"_blank\">Gist\n    <small>GitHub</small>\n</a>\n</li>\n<li>\n<a class=\"last\" href=\"http://stackoverflow.com\" target=\"_blank\">Stack Overflow</a>\n</li>\n<li>\n<a href=\"https://www.virtualbox.org/\" target=\"_blank\">Virtual Box</a>\n</li>\n          </ul>\n          <!--end UL-->\n\n\n        </li>\n      </ul>\n      <ul id=\"media\" class=\"nav navbar-nav navbar-right\">\n        \n          <li>\n     \n            <a title=\"books\" href=\"/Books\"   data-target=\"#navbarResponsive\" data-toggle=\"collapse\" type=\"button\" on-click=\"fadeUp()\"> \n              <i  >_</i> \n            </a>\n          \n          </li>\n       \n        <li>\n     \n          <a title=\"github\" href=\"https://github.com/thomasm1\" target=\"_blank\">\n        \n            <i class=\"fa fa-github\"></i>\n        \n          </a>\n        \n        </li>\n        \n       \n        <li>\n        \n          <a title=\"twitter\" href=\"https://twitter.com/ThomasMaestas\" target=\"_blank\">\n        \n            <i class=\"fa fa-twitter\"></i>\n        \n          </a>\n        \n        </li>\n        \n        <li>\n        \n          <a title=\"facebook\" href=\"https://www.facebook.com/thomasm1.maestas\" target=\"_blank\">\n        \n            <i class=\"fa fa-facebook\"></i>\n        \n          </a>\n        \n        </li>\n        \n        <li>\n        \n          <a title=\"linkedin\" href=\"http://linkedin.com/in/thomasmaestas\" target=\"_blank\">\n        \n            <i class=\"fa fa-linkedin\"></i>\n        \n          </a>\n        \n        </li>\n\n        <!--End UL -->\n\n        </ul>  \n      <abbr title=\"Our Daily Tech\">\n         \n        <img class=\"card-profile-img zoom\" id=\"dailylogo\" alt=\"image of Le Mont Real\" src=\"dist/img/blueColorTriomphe.png\" />   \n          \n      </abbr>\n\n    </div>\n\n  </nav>\n";

/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 'use strict';

var bloggerDec = function bloggerDec() {
  /*
  var blogpost161 =   ` 
  <p class="firstparagraph">
  </p>
  <p class="quote">
  <sup>1</sup>
  </p>
  <p> `; 
    var blogcite161 = `
  <p class="cite">1<a target="_blank" href="https://www.wsj.com/articles/bitcoin-wasnt-a-bubble-until-it-was-11544783400?mod=djemCIO_h">https://www.wsj.com/articles/bitcoin-wasnt-a-bubble-until-it-was-11544783400?mod=djemCIO_h</a></p>  
  `;
  var blogpost160 =   ` 
  <p class="firstparagraph">
  </p>
  <p class="quote">
  <sup>1</sup>
  </p>
  <p> `; 
    var blogcite160= `
  <p class="cite">1<a target="_blank" href="https://www.wsj.com/articles/bitcoin-wasnt-a-bubble-until-it-was-11544783400?mod=djemCIO_h">https://www.wsj.com/articles/bitcoin-wasnt-a-bubble-until-it-was-11544783400?mod=djemCIO_h</a></p>  
  `;
  var blogpost159 =   ` 
  <p class="firstparagraph">
  </p>
  <p class="quote">
  <sup>1</sup>
  </p>
  <p> `; 
    var blogcite159 = `
  <p class="cite">1<a target="_blank" href="https://www.wsj.com/articles/bitcoin-wasnt-a-bubble-until-it-was-11544783400?mod=djemCIO_h">https://www.wsj.com/articles/bitcoin-wasnt-a-bubble-until-it-was-11544783400?mod=djemCIO_h</a></p>  
  `;
  var blogpost158 =   ` 
  <p class="firstparagraph">
  </p>
  <p class="quote">
  <sup>1</sup>
  </p>
  <p> `; 
    var blogcite158 = `
  <p class="cite">1<a target="_blank" href="https://www.wsj.com/articles/bitcoin-wasnt-a-bubble-until-it-was-11544783400?mod=djemCIO_h">https://www.wsj.com/articles/bitcoin-wasnt-a-bubble-until-it-was-11544783400?mod=djemCIO_h</a></p>  
  `;
  var blogpost157 =   ` 
  <p class="firstparagraph">
  </p>
  <p class="quote">
  <sup>1</sup>
  </p>
  <p> `; 
    var blogcite157= `
  <p class="cite">1<a target="_blank" href="https://www.wsj.com/articles/bitcoin-wasnt-a-bubble-until-it-was-11544783400?mod=djemCIO_h">https://www.wsj.com/articles/bitcoin-wasnt-a-bubble-until-it-was-11544783400?mod=djemCIO_h</a></p>  
  `;
  */
  var blogpost156 = ' \n  <p class="firstparagraph"><i>Public Access to Quantum Computing ... makes a quaint Christmas-Hannukah-Festivus Present for all  </i>\n  </p>\n  <p class="quote"> The IBM Q Experience has already executed more than seven million quantum programs, and they aren\u2019t just random gobbledygook like mine. Legit researchers, many unaffiliated with IBM, have published more than 120 academic papers using it.\n\n  The app is part of a larger effort to boost literacy in quantum computing. Other companies have also been releasing open-source software packages to reach out to the masses\u2014or more probably, nerds with niche interests. They hope that a diverse pool of users can guide them toward more creative uses for the machines. \n<sup>1</sup>\n  </p>\n  <p> ';

  var blogcite156 = '\n  <p class="cite">1<a target="_blank" href="https://www.wired.com/story/quantum-computing-needs-you-to-help-solve-its-core-mystery/">https://www.wired.com/story/quantum-computing-needs-you-to-help-solve-its-core-mystery/</a></p>  \n  ';
  var blogpost155 = ' \n  <p class="firstparagraph">To say that the world\'s micro-transaction needs have changed in the past 100 years is ... exaggeration. Maslow\'s <i>Hierarchy of Needs</i> specifies more or less the reality of buying habits. From the bottom of the triangle, they are physiological needs, safety-security, love and belonging, and finally self-actualization. What is clear is that horizontal scaling of our needs often use fragmented sources of "currency"--whether it is financial capital being spent, or social capital (value accrued from trust networks), human capital(value accrued from specialties and specialized networks), intellectual capital, and so on. </p>\n  <p>The effect is clear: multiplying usages and forms of value exchange are certain--this, without accounting for the myriad new options that tech offers. So, if one considers the linear progression from bartering to the coins of Egypt and Athens, history certainly amplifies itself with Venmo, PayPal options are here to stay...  \n  </p>\n  <p class="quote">Facebook Inc. is working on making a cryptocurrency that will let users transfer money on its WhatsApp messaging app, focusing first on the remittances market in India, according to people familiar with the matter.\n  <br /><br />\n\n  The company is developing a stablecoin -- a type of digital currency pegged to the U.S. dollar -- to minimize volatility, said the people, who asked not to be identified discussing internal plans. Facebook is far from releasing the coin, because it\u2019s still working on the strategy, including a plan for custody assets, or regular currencies that would be held to protect the value of the stablecoin, the people said.\n  <br /><br />\n   \n  Facebook, which has 2.5 billion global users, more than $40 billion in annual revenue and greater experience navigating regulatory issues, may have a better chance of making a stablecoin that sticks. It would be the first large technology company to launch such a project. \n<sup>1</sup>\n  </p> ';

  var blogcite155 = '\n  <p class="cite">1<a target="_blank" href="https://www.bloomberg.com/news/articles/2018-12-21/facebook-is-said-to-develop-stablecoin-for-whatsapp-transfers">https://www.bloomberg.com/news/articles/2018-12-21/facebook-is-said-to-develop-stablecoin-for-whatsapp-transfers</a></p>  \n  ';

  var blogpost154 = ' \n  <p class="firstparagraph">\n  </p>\n  <p class="quote">\n \n<sup>1</sup>\n  </p>\n  <p> ';

  var blogcite154 = '\n  <p class="cite">1<a target="_blank" href=" "> </a></p>  \n  ';

  var blogpost153 = ' \n  <p class="firstparagraph">Law and Justice in the tech world reveals <i>a new world without judicial precedent</i> making for new curiosities in Case Law with increasing frequency...  \n  </p>\n  <p class="quote">\n  When you buy something on Amazon, the odds are, you aren\u2019t buying it from Amazon at all. Plansky is one of 6 million sellers on Amazon Marketplace, the company\u2019s third-party platform. They are largely hidden from customers, but behind any item for sale, there could be dozens of sellers, all competing for your click. This year, Marketplace sales were almost double those of Amazon retail itself, according to Marketplace Pulse, making the seller platform alone the largest e-commerce business in the US. \n\n  Amazon is far from the only tech company that, having annexed a vast sphere of human activity, finds itself in the position of having to govern it. But Amazon is the only platform that has a $175 billion prize pool tempting people to game it, and the company must constantly implement new rules and penalties, which in turn, become tools for new abuses, which require yet more rules to police. The evolution of its moderation system has been hyper-charged. While Mark Zuckerberg mused recently that Facebook might need an analog to the Supreme Court to adjudicate disputes and hear appeals, Amazon already has something like a judicial system \u2014 one that is secretive, volatile, and often terrifying. \n<sup>1</sup>\n  </p>\n  <p>So, when commercial and social transactions drift away from  traditional political-judicial-legal jurisdictions, where--rather what--is binding authority? \n  </p> ';

  var blogcite153 = '\n  <p class="cite">1<a target="_blank" href="https://www.theverge.com/2018/12/19/18140799/amazon-marketplace-scams-seller-court-appeal-reinstatement">https://www.theverge.com/2018/12/19/18140799/amazon-marketplace-scams-seller-court-appeal-reinstatement</a></p>  \n  ';
  var blogpost152 = ' \n  <p class="firstparagraph">\n  </p>\n  <p class="quote">\n  But engineers haven\'t written off the internal combustion engine just yet. The team at Aston Martin has released details on the V12 engine that will breathe life into its upcoming, $3 million Valkyrie hypercar, and the gleaming maze of metal is a beautiful beast.\n  <br /><br />\n\n  <img src="dist/img/astonmartinwired.jpg" width="350" class="zoom" /><br /><br />\n  The 6.5-liter V12 will produce 1,000 horsepower (because excess) and revs to 11,100 rpm. Putting this overall insanity aside, what\'s remarkable about such figures is that Aston\'s engineers hit them without resorting to turbochargers. The automaker says it recognizes that turbos offer a ton of benefits, but wanted \u201Can internal combustion engine that sits at the absolute pinnacle for performance, excitement, and emotion,\u201D which it could only get through natural aspiration. \n<sup>1</sup>\n  </p>  ';

  var blogcite152 = '\n  <p class="cite">1<a target="_blank" href="https://www.wired.com/story/aston-martin-valkyrie-engine-v12-f1-cosworth/">https://www.wired.com/story/aston-martin-valkyrie-engine-v12-f1-cosworth/</a></p>  \n  ';

  var blogpost151 = ' \n  <p class="firstparagraph">What better reason for international cooperation than a rendez-vous at 200 miles up? After all, it\'s a niche sweetspot for satellite placement offering communication with less-bad latency problems...This kind of spatial coordination \n  </p>\n  <p class="quote">\n  Ships, planes and remote businesses rely for internet connections on signals sent from geostationary orbit, but this method is too pricey for widespread adoption. Beaming the internet via satellites orbiting closer to the planet has been tried before. The idea was popular at the height of the tech boom of the late 1990s. Three companies\u2014Teledesic, Iridium and Globalstar\u2014poured tens of billions of dollars into the low-Earth orbit (LEO) satellite internet. It culminated in the collapse of Teledesic. Although the technology of the time worked, it was very costly and so the services on offer had to be hugely expensive, too. Iridium survived, but as a niche provider of satellite telephony, not a purveyor of cheap and fast internet access.\n  <br /><br />\n\n  OneWeb is among several firms that are trying LEO satellites again. SpaceX, a rocket company founded by Elon Musk, a tech entrepreneur, is guarded about its proposed system, Starlink, but on November 15th American regulators approved an application for 7,518 satellites at an altitude of 340km [200miles] (bringing the total for which the firm has approval to nearly 12,000). Telesat, a Canadian firm, has plans for a 512-satellite constellation. \n<sup>1</sup>\n  </p>\n  <p> ';

  var blogcite151 = '\n  <p class="cite">1<a target="_blank" href="https://www.economist.com/briefing/2018/12/08/satellites-may-connect-the-entire-world-to-the-internet">https://www.economist.com/briefing/2018/12/08/satellites-may-connect-the-entire-world-to-the-internet</a></p>  \n  ';

  var blogpost150 = ' \n  <p class="firstparagraph">\n  </p>\n  <p class="quote">\n  Amid the wreckage of the burst bitcoin bubble  it is fair to assess the outlook for blockchains, the technology underlying the cryptocurrency. There\u2019s a difference. Blockchains, it is said, stand to revolutionize enterprise technology by addressing the problems with authentication and identity at the heart of the internet itself, eliminating middle layers in transactions and making it faster and easier to establish provenance.\n  <br /><br />\n  \n  The adoption of blockchains in the enterprise has been slow. The question now is the extent to which the overblown investment thesis behind bitcoin and related financial mania can be separated from the utility of blockchain as a tool in enterprise technology.\n<sup>1</sup>\n  </p>\n  <p> ';

  var blogcite150 = '\n  <p class="cite">1<a target="_blank" href="https://www.wsj.com/articles/bitcoin-wasnt-a-bubble-until-it-was-11544783400?mod=djemCIO_h">https://www.wsj.com/articles/bitcoin-wasnt-a-bubble-until-it-was-11544783400?mod=djemCIO_h</a></p>  \n  ';

  var blogpost149 = ' \n\n  <p class="quote">\n  Formally, an asset bubble is just a rapid rise and abrupt crash in prices. Defenders of the efficient-market theory argue that these price movements are based on changes in investor\u2019s beliefs about an asset\u2019s true value. But it\u2019s hard to identify a reason why any rational investor would have so abruptly revised her assessment of the long-term earnings power of companies in 1929, or the long-term viability of dot-com startups in 2000, or the long-term value of housing in 2007.\n<br /><br />\n  Similarly, there was no obvious reason why it made sense for the world to believe that Bitcoin was the currency of the future late December 2017, but to think this was less than one fifth as likely today. Bitcoin wasn\u2019t eclipsed by a competitor \u2014 the main alternative cryptocurrencies had even bigger price declines. Nor have regulators cracked down on Bitcoin \u2014 in fact, the regulatory structure has generally been quite accommodating to the technology. Nor have critical technological flaws emerged \u2014 yes, the Bitcoin network has become congested, but this problem was anticipated well before the crash. \n  \n<br /><br />\n  Instead, it seems overwhelmingly likely that Bitcoin\u2019s spectacular rise and fall was due not to rational optimism followed by sensible pessimism, but to some kind of aggregate market irrationality \u2014 a combination of herd behavior, cynical speculation and the entry into the market of a large number of new, poorly informed investors.\n<sup>1</sup>\n  </p>\n  ';

  var blogcite149 = '\n  <p class="cite">1<a target="_blank" href="https://www.bloomberg.com/opinion/articles/2018-12-11/yep-bitcoin-was-a-bubble-and-it-popped">https://www.bloomberg.com/opinion/articles/2018-12-11/yep-bitcoin-was-a-bubble-and-it-popped</a></p>  \n  ';
  var blogpost148 = ' \n  <p class="firstparagraph">Crypto-Currency theorists provide endless explanations over the disproportionately-sized fall of Bitcoin from December 2017 yet offer an incomplete picture. The more fascinating questions surround Bitcoin\'s 2017 growth rather than the interruption that either cascaded to new factors or simply magnified existing factors--such as security doubts and the dearth micro-economic public use.\n  </p>\n  <p class="quote"> His explanation for the divergence include last year\u2019s meteoric rally, a \u201Cmeltdown\u201D in the macroeconomic climate and treasury sales during initial coin offerings. \n  \u201CFair value is significantly higher than the current price of Bitcoin,\u201D he wrote. \u201CIn fact, working backwards, to solve for the current price of Bitcoin, this implies crypto wallets should fall to 17 million from 50 million currently.\u201D\n<sup>1</sup>\n  </p> ';

  var blogcite148 = '\n  <p class="cite">1<a target="_blank" href="https://www.bloomberg.com/news/articles/2018-12-13/unabashed-bitcoin-bull-thomas-lee-says-the-market-is-wrong?srnd=cryptocurrencies">https://www.bloomberg.com/news/articles/2018-12-13/unabashed-bitcoin-bull-thomas-lee-says-the-market-is-wrong?srnd=cryptocurrencies</a></p>  \n  ';
  var blogpost145 = ' \n  <p class="firstparagraph">Leaving the age of personal pc computing power, the growing trends are to borrow someone else\'s computing power in the cloud. Platform-as-a-Service, Infrastructure-as-a-Service, and other shared computing and storage services are merely aligning with the growing convention to spurn buying--say a car--in favor of renting for when and what needs specifically arise--like Uber, Turo and other peer-to-peer trends.  It only makes sense that Cloud services would incorporate more hardware customization and flexibility.   \n  </p>\n  <p class="quote">Amazon, the world\u2019s largest online retailer and largest cloud-computing company, is pushing into a new line of work: computer chips.\n\n  Late last month, the company, based in Seattle, revealed that it had spent the last few years building a new chip for use inside the millions of servers in its data centers around the world.\n  \n  Amazon does not plan to sell this chip directly to customers, but the decision by one of the world\u2019s biggest buyers of computer processors to go the do-it-yourself route is likely to have a major impact on Intel, the iconic Silicon Valley chip maker.\n<sup>1</sup>\n</p><p>Time-traveling to the dawn of the PC era, it must have felt the world ending with the monopolistic overtones of IBM and Microsoft. Yet, time--and technology--passes all things. Now, it is the age of Google Cloud and Amazon Web Services--including the chip!\n  </p>';

  var blogcite145 = '\n  <p class="cite">1<a target="_blank" href="https://www.nytimes.com/2018/12/10/technology/amazon-server-chip-intel.html">  https://www.nytimes.com/2018/12/10/technology/amazon-server-chip-intel.html</a></p>  \n  ';

  var blogpost144 = '\n \n  <p class="firstparagraph">Materials science, artificial intelligence   and IoT technology has a new assignment: Save the Glaciers!  \n  </p>\n  <p class="quote">By the end of the mission in 2009, Anandakrishnan and his colleagues had collected data from about 150 boreholes. The new information didn\u2019t precisely explain what was hastening Thwaites\u2019 acceleration, but it was a start. Meanwhile, the satellite maps kept getting redder and redder. In 2014, Eric Rignot, a glaciologist at NASA, concluded that Thwaites was entering a state of \u201Cunstoppable\u201D collapse. Even worse, scientists were starting to think that its demise could trigger a larger catastrophe in West Antarctica, the way a rotting support beam might lead to the toppling not only of a wall but of an entire house. Already, Thwaites\u2019 losses were responsible for about 4 percent of global sea-level rise every year. When the entire glacier went, the seas would likely rise by a few feet; when the glaciers around it did, too, the seas might rise by more than a dozen feet. \n<sup>1</sup>\n  </p>';

  var blogcite144 = '\n  <p class="cite">1<a target="_blank" href="https://www.wired.com/story/antarctica-thwaites-glacier-breaking-point/">https://www.wired.com/story/antarctica-thwaites-glacier-breaking-point/</a></p>  \n  ';
  var blogpost143 = '\n \n  <p class="firstparagraph">\n  Workplace satisfaction sits squarely on finding purpose, usually to the aim of helping others. 20th century jobs plainly reflected this value in plain sight, however new jobs do the same and more, but less evidently. Code writing is worthy for its contributions to humanity--as much as bridge-building, nursing,  social work and any  industry.  Yet, software engineering is seen through the filter of coding, math,   logic and automation, instead of the true portraiture of the careful reflection, humanity and patience of coding authorship. Sadly, there is no PR to tout the new paradigm and lofty meaning tied into programming work! </p> \n\n  <p class="quote">Lack of career growth or trajectory was the biggest reason, with 28.1% of respondents saying it caused them to quit. Many of the women also believe that men have an advantage in the field; just 53% said women have the same opportunities to enter senior leadership roles as their male counterparts.<br />\n\n  \u201CLack of career growth is a problem that women face across industries,\u201D says Kim Williams, Indeed\u2019s senior director of design platform, technology, and operations. \n<sup>1</sup>\n  </p>';

  var blogcite143 = '\n  <p class="cite">1<a target="_blank" href="https://www.fastcompany.com/90274067/this-is-why-women-leave-jobs-in-tech">https://www.fastcompany.com/90274067/this-is-why-women-leave-jobs-in-tech</a></p>  \n  ';

  /* 
  
   var blogpost142 =   `
  
   <p class="firstparagraph">  
   </p>
   <p class="quote"> 
  <sup>1</sup>
   </p>`;
   
   var blogcite142 = `
  <p class="cite">1<a target="_blank" href="https://hbr.org/2018/12/the-story-of-sustainability-in-2018-we-have-about-12-years-left">https://hbr.org/2018/12/the-story-of-sustainability-in-2018-we-have-about-12-years-left</a></p>  
   `;  
   */
  var blogpost141 = '\n \n  <p class="firstparagraph">\n  Computers don\'t know lines of text to understand the words. Just the conditions and behavior of a certain combination of letters - and the computer does not <i>know</i>0, 1, and 2.  ..It knows the difference between 0 and 1 with respect to 2 ... <br /><br />\n   The subject of trust is not the Tech Sector\'s best light -- as it can be fairly said to flaunt irresponsibility--<i>to move fast and break things</i>. This has been benign so far except for a few credit card and Scarlett Johannsen\'s leaked selfies ... nothing Earth-shattering.  A.I. on the other hand, can\'t be leashed in an Open Source era, so here we are - \'the best offense is a good defense\' theory. </p><p>\n   Moral, social, and most of all technical forms of deterrance and plethora. As Elon Musk once said, "We don\'t want autonomous weapons. The moment that one is walking down the street, <i> it\'s too late</i>.   \n  </p>\n  <p class="quote"> The prime mover behind the film is Stuart Russell, a professor of computer science at the University of California, Berkeley. Here, Russell checks in with the Bulletin to explain how the film was made, how little stands between us and the drone apocalypse, and what the prospects are for banning autonomous weapons before they get truly out of hand.\n<sup>1</sup>\n  </p>\n  <p>This, not to mention the principle that whoever winds up harnessing A.I. will control the globe--whether socially, nationally, and finance. The solution to resolve this? With all of society involved in the sway of tech decision-making, then a society of people rules the globe, not the technology of one group ...the way it should be ...</p>\n  <p>Programmers need to take care of not only the problem-at-hand but the larger outcome. For example, the stock \'Flash-Crash of 2010\' produced a sudden drop--initiated unintentionally by a computer program... Let\'s start complementing faster engines with better brakes! ';

  var blogcite141 = '\n  <p class="cite">1<a target="_blank" href="https://thebulletin.org/2017/12/as-much-death-as-you-want-uc-berkeleys-stuart-russell-on-slaughterbots/">https://thebulletin.org/2017/12/as-much-death-as-you-want-uc-berkeleys-stuart-russell-on-slaughterbots/</a></p>  \n  ';
  /*
   var blogpost140 =   `
  
   <p class="firstparagraph">  The banality of non-tech jobs is not the reason, rather the humanity of the screen's person-to-machine screen-work can hardly simulate person-to-person industries
   </p>
   <p class="quote">Lack of career growth or trajectory was the biggest reason, with 28.1% of respondents saying it caused them to quit. Many of the women also believe that men have an advantage in the field; just 53% said women have the same opportunities to enter senior leadership roles as their male counterparts.<br />
    “Lack of career growth is a problem that women face across industries,” says Kim Williams, Indeed’s senior director of design platform, technology, and operations. 
  <sup>1</sup>
   </p>`;
   
   var blogcite140 = `
   <p class="cite">1<a target="_blank" href="https://www.fastcompany.com/90274067/this-is-why-women-leave-jobs-in-tech">https://www.fastcompany.com/90274067/this-is-why-women-leave-jobs-in-tech</a></p>  
   `; 
  */
  var blogpost139 = '\n \n  <p class="firstparagraph">Competition versus cooperation with China presents an unanswerable question while nationalism brushes aside a common humanity--as far as technological advancement is concerned. Perhaps the best hope for a common thread of peace lies in the age-old, border-breaking legacy of 1990s\' pre-tech wave multinationalist corporations--an impossible dream in the age of retributive tariff and trade threats ...\n  </p>\n  <p class="quote">Yet the trade conflict that matters most between America and China is a 21st-century fight over technology. It covers everything from artificial intelligence (ai) to network equipment. The fundamental battleground is in semiconductors. The chip industry is where America\u2019s industrial leadership and China\u2019s superpower ambitions clash most directly. And whatever Messrs Trump and Xi say at the g20, this conflict will outlast them both.\n  \n<sup>1</sup>\n  </p>';

  var blogcite139 = '\n  <p class="cite">1<a target="_blank" href="https://www.economist.com/leaders/2018/12/01/chip-wars-china-america-and-silicon-supremacy">https://www.economist.com/leaders/2018/12/01/chip-wars-china-america-and-silicon-supremacy</a></p>  \n  ';

  var blogpost138 = ' \n  <p class="firstparagraph">At the end of the day, why not include tactile messaging? I enjoyed my Samsung Note V, but the material touch is the hardest to replicate.\n  </p>\n  <p class="quote"> Invented four decades ago by 3M in what has become a famous example of mistakes leading to success, sticky notes have become a classic because of some unique properties. They can convey a message\u2014that is, content\u2014but their placement provides context. They can be put in the line of sight of someone to grab attention or be affixed to a document or other object to provide instruction or commentary. Their ability to be attached again and again has made them popular for arranging ideas on surfaces such as whiteboards for analog mind-mapping. <sup>1</sup>\n  </p>\n  <p>Senseless criticism aside, Google\'s Materialize software is the true winner for replicating paper, at least visually ...';

  var blogcite138 = '\n  <p class="cite">1<a target="_blank" href="https://www.fastcompany.com/90268250/even-in-our-digital-world-the-humble-sticky-note-abides">https://www.fastcompany.com/90268250/even-in-our-digital-world-the-humble-sticky-note-abides</a></p>  \n  ';

  var url = [
  /*
  {
    id: '161',
    did: '12-28-18',
    date: 'December 28, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'A Virtual Balkanization of International Currency',
    post: blogpost161,
    blogcite: blogcite161 
  },
  {
    id: '160',
    did: '12-27-18',
    date: 'December 27, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'A Virtual Balkanization of International Currency',
    post: blogpost160,
    blogcite: blogcite160 
  },
  {
    id: '159',
    did: '12-26-18',
    date: 'December 26, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'A Virtual Balkanization of International Currency',
    post: blogpost159,
    blogcite: blogcite159 
  },  
  {
    id: '158',
    did: '12-25-18',
    date: 'December 25, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'A Virtual Balkanization of International Currency',
    post: blogpost158,
    blogcite: blogcite158 
  },  
  {
    id: '157',
    did: '12-24-18',
    date: 'December 24, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'A Currency Introspective',
    post: blogpost157,
    blogcite: blogcite157
  },
  */
  {
    id: '156',
    did: '12-22-18',
    date: 'December 22-23, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Quantum Data',
    title: 'Quantum Computing Presents',
    post: blogpost156,
    blogcite: blogcite156
  }, {
    id: '155',
    did: '12-21-18',
    date: 'December 21, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'A Virtual Balkanization of International Currency',
    post: blogpost155,
    blogcite: blogcite155
  }, {
    id: '154',
    did: '12-20-18',
    date: 'December 20, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'A Currency Introspective',
    post: blogpost154,
    blogcite: blogcite154
  }, {
    id: '153',
    did: '12-19-18',
    date: 'December 19, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'A New <i>Stare Decisis</i>',
    post: blogpost153,
    blogcite: blogcite153
  }, {
    id: '152',
    did: '12-18-18',
    date: 'December 18, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Aston Martin at 1,000 Horsepower',
    post: blogpost152,
    blogcite: blogcite152
  }, {
    id: '151',
    did: '12-17-18',
    date: 'December 17, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Of Space and Satellites',
    post: blogpost151,
    blogcite: blogcite151
  }, {
    id: '150',
    did: '12-15-18',
    date: 'December 15-16, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'A Currency Introspective',
    post: blogpost150,
    blogcite: blogcite150
  }, {
    id: '149',
    did: '12-14-18',
    date: 'December 14, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'A Currency in Retrospective',
    post: blogpost149,
    blogcite: blogcite149
  }, {
    id: '148',
    did: '12-13-18',
    date: 'December 13, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'A Currency Starting Afresh',
    post: blogpost148,
    blogcite: blogcite148
  }, {
    id: '145',
    did: '12-10-18',
    date: 'December 10, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Quantum Chips, GPU &amp; Parallel Chips  and Cloud Chips, Ahoy!',
    post: blogpost145,
    blogcite: blogcite145
  }, {
    id: '144',
    did: '12-08-18',
    date: 'December 8-9, 2018 <br />Weekend',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now.',
    title: 'The Tech Industry\'s True Value, Part II:<br />Saving Earth',
    post: blogpost144,
    blogcite: blogcite144
  }, {
    id: '143',
    did: '12-07-18',
    date: 'December 7, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'The Tech Industry\'s True Value, Part I:<br />Saving Humanity',
    post: blogpost143,
    blogcite: blogcite143
  },
  /*
  {
    id: '142',
    did: '12-06-18',
    date: 'December 6, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow',
    title: 'The Tech Market\'s True Value, Part Zero:<br />Saving Energy',
    post: blogpost142,
    blogcite: blogcite142
  }, 
  */
  {
    id: '141',
    did: '12-05-18',
    date: 'December 5, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now.',
    title: 'The Reason for More Social Awareness on A.I. Policy',
    post: blogpost141,
    blogcite: blogcite141
  },
  /*  
   {
  id: '140',
  did: '12-04-18',
  date: 'December 4, 2018 ',
  author: 'by Thomas Maestas',
  cat3: 'Sociology Tomorrow',
  title: 'The Tech Market\'s True Value',
  post: blogpost140,
  blogcite: blogcite140
   }, */
  {
    id: '139',
    did: '12-03-18',
    date: 'December 3, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow',
    title: 'The China Question',
    post: blogpost139,
    blogcite: blogcite139
  }, {
    id: '138',
    did: '12-01-18',
    date: 'December 1-2, 2018 <br />Weekend',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow',
    title: 'Textbook Technology',
    post: blogpost138,
    blogcite: blogcite138
  }];
  var i;
  for (i = 0; i < url.length; i++) {
    var cat = ' \n    <div id="' + url[i].did + '" class="blogDiv"> \n    <hr />  \n    <a target="_blank" href="#top"><button>Top</button></a>  \n    <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n    <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5> \n    <p id="author" class="  author">' + url[i].author + '</p>   \n    <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n    <h6  id="title"   class="dailytitle chapternumber">' + url[i].title + '</h6>\n    <br />\n    <div id="post">' + url[i].post + '\n    </div>\n    <div id="blogcite">' + url[i].blogcite + '\n    </div>';
    document.getElementById("paragraph-dec").innerHTML += cat;
  }

  for (i = 0; i < url.length; i++) {
    var catMod = '\n  <div id="mod_' + url[i].did + '" class="blogDivMod"> \n  <hr />  \n  <a target="_blank" href="#top-mod"><button>Top</button></a>   \n  <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n  <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5>  \n  <p id="author" class="  author">' + url[i].author + '</p>   \n  <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n  <h6  id="title"   class="dailytitle chapternumber">' + url[i].title + '</h6>\n  <br />\n  <div id="post">' + url[i].post + '</div>\n  </div>\n <div id="blogcite">' + url[i].blogcite + '\n </div>';
    document.getElementById("paragraph-dec-mod").innerHTML += catMod;
  }
  console.log(angular.toJson(url));
  //console.log(url);
};
bloggerDec();

/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 'use strict';

var bloggerNov = function bloggerNov() {

  var blogpost137 = '\n \n  <p class="firstparagraph">Quantum Nay-Sayers\' opinions appear more rooted in <i>a binary form of thinking, while quantum computing itself represents non-binary reasoning! </i>That Quantum allows for a third state, rather than Classical 2 states. This means with two transistors can in one instance yield 2 possibilities, while two Quantum \'qubits\' yield exactly four possibilities in an instance: the two qubits can be on, off, <i>and both</i>. Likewise 4 transistors yield four possible states in one instance, 4 qubit transistors <i>yield 16 possible states</i> since all four can carry both states in one instance.</p>\n  <p>So, merely discussing the paradigm-breaking 3 states already implicates one\'s life into quantum computing\'s sphere of reality!\n  </p>\n  <p class="quote"> When will useful quantum computers be constructed? The most optimistic experts estimate it will take 5 to 10 years. More cautious ones predict 20 to 30 years. (Similar predictions have been voiced, by the way, for the last 20 years.) I belong to a tiny minority that answers, \u201CNot in the foreseeable future.\u201D Having spent decades conducting research in quantum and condensed-matter physics, I\u2019ve developed my very pessimistic view. It\u2019s based on an understanding of the gargantuan technical challenges that would have to be overcome to ever make quantum computing work.\n<sup>1</sup>\n  </p>';

  var blogcite137 = '\n  <p class="cite">1<a target="_blank" href="https://spectrum.ieee.org/computing/hardware/the-case-against-quantum-computing">https://spectrum.ieee.org/computing/hardware/the-case-against-quantum-computing</a></p>  \n  ';
  var blogpost136 = '\n \n  <p class="firstparagraph">Co-bots. Algorithm and Human input toward final calculations of real, experienced conditions can be a real puzzle. Whether Doctors with access to patients\' A.I.-analyzed patient metrics or Drivers sharing responsibilities with \'semi-automated\', self-driving vehicles, the challenge. \n  </p>\n  <p class="quote">Drawing on four years of ethnographic research among Uber drivers, Rosenblat has produced a thoroughly dystopian report that details how millions of drivers are now managed by a computerized system that combines the hard authoritarianism of Frederick Winslow Taylor with the cynical cheerleading of Michael Scott.\n<sup>1</sup>\n  </p>\n  <p>The cultural management of leader-less automation makes for a less useful tool for humans: The more autonomous the tool  does not necessarily translate to optimal relations:   For example, in-group thinking where ideas are recycled and magnified due to technological effect rather than conscious will. So, the healthier more useful technology can often be the most interactive and highly configurable tools, whether phone devices or application software. So, in sum, the Co-Bot is a go-bot -- a better bot.';

  var blogcite136 = '\n  <p class="cite">1<a target="_blank" href="http://nymag.com/intelligencer/2018/11/alex-rosenblats-uberland-review.html">http://nymag.com/intelligencer/2018/11/alex-rosenblats-uberland-review.html</a></p>  \n  ';
  var blogpost135 = ' \n  <p class="firstparagraph">A.I.\'s segmented, expansive landscape ranges from free-wheeling start-ups to DIY hobbyists to University researchers. This diversity of A.I. designs, coupled with free access to open-source tools provides for an entirely unpredictable path.  \n  </p>\n  <p class="quote">This is an unsettled field. It\'s not like physics."<br />\n\n  AI may seem to be a smooth-running assembly line of startups, products and research projects. The reality, however, is a landscape clouded by uncertainty.\n  [Author] Ford\'s [A.I.-expert] interviewees could not agree on where their field stands, how to push it forward or when it will reach its ultimate goal: a machine with humanlike intelligence.\n  <br /><br />\n  Why it matters: The embryonic state in which Ford found AI \u2014 so early in its development more than a half-century after its birth that the basics are still up for grabs \u2014 suggests how far it has to go before reaching maturity. On his blog, Brooks has said that AI is only 1% of the way toward human intelligence.\n<sup>1</sup>\n  </p>';

  var blogcite135 = '\n  <p class="cite">1<a target="_blank" href="https://www.axios.com/artificial-intelligence-disagreements-machine-learning-d26ef884-b415-43c6-aff2-d17a05483389.html">https://www.axios.com/artificial-intelligence-disagreements-machine-learning-d26ef884-b415-43c6-aff2-d17a05483389.html</a></p> \n \n  ';
  var blogpost134 = ' \n  <p class="firstparagraph">Compared with so many other options, including smart Currency that doubles as a programmable legal contract like Ethereum or energy-friendly \'Proof-of-Stake\' algorithm Currencies, one has to wonder why Bitcoin has managed to hang around as long as it has ... even if name-recognition and simplicity of the ten-year old technology are its two best attributes. \n  </p>\n  <p>So, with Bitcoin\'s stumbling, perhaps other options and new technologies can be considered: \n  </p>\n  <p class="quote">\u201CThe Proof of Stake algorithm is a generalization of the Proof of Work algorithm. In PoS, the nodes are known as the \u2018validators\u2019 and, rather than mining the blockchain, they validate the transactions to earn a transaction fee. There is no mining to be done, as all coins exist from day one. Simply put, nodes are randomly selected to validate blocks, and the probability of this random selection depends on the amount of stake held. <br />\n  <br />\n  So, if node X owns 2 coins and node Y owns 1 coin, node X is twice as likely to be called upon to validate a block of transactions. The specific implementation of PoS can vary, depending on the use case, or as a matter of software design. Instances include Proof of Deposit and Proof of Burn. The PoS algorithm saves expensive computational resources that are spent in mining under a PoW consensus regime.\u201D\n  </p>\n  <p>Beyond the practicality of programmable currency, security attributes are the unsung hero of Proof of Stake currencies:\n  </p>\n  <p class="quote">\n  Proof of stake (aka POS) cryptos has many technical benefits but apart from that some proof of stake cryptos also give different economic benefits/dividends to its HODLers by giving them the option of running a masternode or staking their coins in a stake-able wallet.\n<br /><br />This provides dual benefits of securing the blockchain network as well as creating an opportunity for users to get incentives or dividends on their holdings.\n<sup>1</sup>\n  </p>';

  var blogcite134 = '\n  <p class="cite">1<a target="_blank" href="https://medium.com/coinmonks/blockchain-consensus-algorithm-the-proof-of-stake-slice-a4bda6658bbe">https://medium.com/coinmonks/blockchain-consensus-algorithm-the-proof-of-stake-slice-a4bda6658bbe</a></p> \n  <p class="cite">2<a target="_blank" href="https://coinsutra.com/proof-of-stake-cryptocurrencies/">https://coinsutra.com/proof-of-stake-cryptocurrencies/</a><br /><br />https://bitcoin.org/bitcoin.pdf</p> \n  ';
  var blogpost133 = '\n  <p class="firstparagraph">Proof-of-Work Blockchain Algorithms that underly <i>some</i> cryptocurrencies--Bitcoin for example--have certainly hard on Earth\'s climate dilemma. Therefore, it\'s with a silver-lining that the currency is bottoming ...  \n  </p>\n  <p class="quote">\n  Bitcoin is in crisis. \n  You can never really declare it dead \u2014 the idea of an electronic currency that is theoretically borderless and lawless will always live on somewhere \u2014 but its price has slumped 80 percent in less than a year, wiping about $700 billion off cryptocurrency markets.\n<br /><br />\nWhere does it go from here? True believers are betting on a simple repeat of past asset bubbles, like dot-com stocks or real estate: a system-wide cleansing of bad actors before the roller-coaster ride begins anew. On that argument there\u2019s a price for everything, even niche assets with no intrinsic value. Maybe Bitcoin should be above $3,700.\n\n<br /><br />\nBut the virtual currency\u2019s behavior since the start of the year doesn\u2019t just look like a bubble bursting; it looks more like a currency under attack. Most of the price collapse happened between December and February, falling from almost $19,000 to about $7,000. Until this month, the $6,000-to-$7,000 range seemed unbreakable. There was a floor in the price \u2014 until it caved.\n<sup>1</sup>\n  </p>';

  var blogcite133 = '\n  <p class="cite">1<a target="_blank" href="https://www.bloomberg.com/opinion/articles/2018-11-27/bitcoin-crash-is-a-real-currency-crisis">https://www.bloomberg.com/opinion/articles/2018-11-27/bitcoin-crash-is-a-real-currency-crisis</a></p> \n  ';

  var blogpost132 = '\n  <p class="firstparagraph">CRISPR tech and the first generation of CRISPR babies heralds a new era ...\n  </p>\n  <p class="quote">According to Chinese medical documents posted online this month, a team at the Southern University of Science and Technology, in Shenzhen, has been recruiting couples in an effort to create the first gene-edited babies. They planned to eliminate a gene called CCR5 in hopes of rendering the offspring resistant to HIV, smallpox, and cholera.\n<br /><br />\nHe Jiankui leads a team using the gene-editing technology CRISPR in an effort to prevent disease in newborns [at] \nSOUTHERN UNIVERSITY OF SCIENCE AND TECHNOLOGY\nThe clinical trial documents describe a study in which CRISPR is employed to modify human embryos before they are transferred into women\u2019s uteruses.<sup>1</sup>\n  </p>';

  var blogcite132 = '\n  <p class="cite">1<a target="_blank" href="https://www.technologyreview.com/s/612458/exclusive-chinese-scientists-are-creating-crispr-babies/">https://www.technologyreview.com/s/612458/exclusive-chinese-scientists-are-creating-crispr-babies/</a></p> \n  ';
  var blogpost131 = '\n  <p class="firstparagraph">Latency at near-zero terms makes 5G the missing and final ingredient for the imminent IoT revolution--so why not protect the hardware foundation?\n  </p>\n  <p class="quote">Huawei has fallen out of favor with the US government after a congressional report from 2012 called it a national security threat out of concerns that the Chinese government could compel the company to give it access to sensitive data. Just before this year\'s midterm elections, the country even banned government personnel from using Huawei and ZTE devices.\n  <br /><br /> \n  The Wall Street Journal says US officials briefed representatives from Germany, Japan and Italy in an effort to dissuade both government and commercially operated networks from using Huawei (and ZTE) components. In addition to discussing the possibility of Beijing forcing the company to comply with requests for data access, the authorities reportedly stressed 5G\'s susceptibility to cyberattacks and espionage, as well.<sup>1</sup>\n  </p>';

  var blogcite131 = '\n  <p class="cite">1<a target="_blank" href="https://www.engadget.com/2018/11/24/us-huawei-warning-5g/">https://www.engadget.com/2018/11/24/us-huawei-warning-5g/</a></p> \n  ';
  /*
  
  https://coinsutra.com/proof-of-stake-cryptocurrencies/
  
    var blogpost130 =   `
    <p class="firstparagraph">
    </p>
    <p class="quote">Proof of stake (aka POS) cryptos has many technical benefits but apart from that some proof of stake cryptos also give different economic benefits/dividends to its HODLers by giving them the option of running a masternode or staking their coins in a stake-able wallet.
  <br /><br />This provides dual benefits of securing the blockchain network as well as creating an opportunity for users to get incentives or dividends on their holdings.
  <sup>1</sup>
    </p>`;
    
    var blogcite130 = `
    <p class="cite">1<a target="_blank" href="https://coinsutra.com/proof-of-stake-cryptocurrencies/">https://coinsutra.com/proof-of-stake-cryptocurrencies/</a></p> 
    `; 
   
   */
  var blogpost129 = '\n<p class="firstparagraph">\n</p>\n<p class="quote">In an essay in the journal JAMA last month, Tamara Tchkonia and Dr. James L. Kirkland of the Mayo Clinic categorized these processes into four broad groups: chronic inflammation; cell dysfunction; changes in stem cells that make them fail to regenerate tissue; and cellular senescence, the accumulation in tissue of aging cells that accompanies disease. Old cells, researchers have found, secrete proteins, lipids and other substances that increase inflammation and tissue destruction. <sup>1</sup>\n</p>';

  var blogcite129 = '\n<p class="cite">1<a target="_blank" href="https://www.nytimes.com/2018/11/19/health/human-life-span.html">https://www.nytimes.com/2018/11/19/health/human-life-span.html</a></p> \n\n<p class="cite">1<a target="_blank" href="https://jamanetwork.com/journals/jama/article-abstract/2703113">https://www.thelancet.com/action/showPdf?pii=S0140-6736%2818%2931694-5</a>\n</p> \n';
  var blogpost128 = '\n  <p class="firstparagraph">E.U.\'s far-reaching data privacy law--now six months later--reveals how unmanageable and far-flung personal data has propogated. But even personal data has a shelf-life for relevence and value. \n  </p>\n  <p class="quote">The General Data Protection Regulation is a sweeping personal data privacy law that came into force in late May in the EU. For the rest of the world, it\'s viewed as a bellwether for whether Big Tech can be held in check when immense data leaks seem to happen with painful regularity.\n  <br /><br />\n  Major data brokers Acxiom and Oracle are among seven companies accused of violating GDPR laws on personal information privacy. Advocates hope the complaints will shed light on the opaque ways that personal data is traded through third parties online both in the EU and the US.\n  <sup>1</sup>\n  </p>';

  var blogcite128 = '\n  <p class="cite">1<a target="_blank" href="https://www.engadget.com/2018/11/08/gdpr-data-brokers-complaints/">https://www.engadget.com/2018/11/08/gdpr-data-brokers-complaints/</a></p> \n  ';

  var blogpost127 = '\n  <p class="firstparagraph">Trade Wars make for expensive phones and tech luxuries ... Make Love Not War!\n  </p>\n  <p class="quote">It\u2019s important to note that all of these reduced-demand forecasts don\u2019t necessarily mean that nobody is buying the iPhone. Suppliers famously cut their production forecasts shortly before the release of the iPhone 6 \u2014 the best-selling iPhone in history \u2014 which saw Apple\u2019s supply chain quickly scrambling to meet demand.  <sup>1</sup>\n  </p>';

  var blogcite127 = '\n  <p class="cite">1<a target="_blank" href="http://nymag.com/intelligencer/2018/11/poor-iphone-supplier-forecasts-make-everyone-very-nervous.html">http://nymag.com/intelligencer/2018/11/poor-iphone-supplier-forecasts-make-everyone-very-nervous.html</a></p> \n  ';
  var blogpost126 = '\n  <p class="firstparagraph">\n  </p>\n  <p class="quote">Mark Zuckerberg gathered roughly 50 of his top lieutenants earlier this year and told them that Facebook Inc. was at war and he planned to lead the company accordingly.<br />\n<br />\n  During times of peace, executives can move more slowly and ensure that everybody is on board with key decisions, he said during the June meeting, according to people familiar with the remarks. But with Facebook under siege from lawmakers, investors and angry users, he needed to act more decisively, the people said.<sup>1</sup>\n  </p>';

  var blogcite126 = '\n  <p class="cite">1<a target="_blank" href="http://nymag.com/intelligencer/2018/11/mark-zuckerberg-declared-facebook-at-war.html">http://nymag.com/intelligencer/2018/11/mark-zuckerberg-declared-facebook-at-war.html</a></p> \n  ';
  var blogpost125 = '\n  <p class="firstparagraph">\n  </p>\n  <p class="quote"> At home in Northern California, San Francisco voters overwhelmingly passed a tax designed to extract money from tech companies to help ease homelessness in the city. Across the Bay, Oakland voters passed a progressive property-transfer tax, which was another way of taxing the enormous wealth that\u2019s poured into the Bay Area.\n  <br /><br /> \n  Locally and nationally, the tech industry has gone from bright young star to death star. Not only have Silicon Valley companies turned out to be roughly as dirty in their corporate maneuvering as any old oil company or military contractor, but because of the Valley\u2019s founder worship, they\u2019ve been almost uniquely controlled by a tiny number of people.\n  <br /><br /> \n  Read: Were we destined to live in Facebook\u2019s world?\n  \n  And as in most things, Facebook distills, or at least embodies, these industry-wide practices. After a brutal two years that started with the 2016 election, Mark Zuckerberg responded by placing loyalists in charge of all Facebook Inc. properties. The company\u2019s lobbyists pushed a line that its opponents were linked to George Soros, while reporting other enemies to the Anti-Defamation League.\n\n  </p>';

  var blogcite125 = '\n  <p class="cite">1<a target="_blank" href="https://www.theatlantic.com/technology/archive/2018/11/facebook-google-amazon-and-collapse-tech-mythology/575989/">https://www.theatlantic.com/technology/archive/2018/11/facebook-google-amazon-and-collapse-tech-mythology/575989/</a></p> \n  ';
  var blogpost124 = '\n  <p class="firstparagraph">\n  </p>\n  <p class="quote">While most efforts to secure digital infrastructure were fixated on blocking bad guys from getting in, few focused on the reverse: stopping them from leaking information out. Based on that idea, the group founded a new cybersecurity company called Darktrace.\n  <br /><br />\n  he firm partnered with mathematicians at the University of Cambridge to develop a tool that would use machine learning to catch internal breaches. Rather than train the algorithms on historical examples of attacks, however, they needed a way for the system to recognize new instances of anomalous behavior. They turned to unsupervised learning, a technique based on a rare type of machine-learning algorithm that doesn\u2019t require humans to specify what to look for.<sup>1</sup>\n  </p>';

  var blogcite124 = '\n  <p class="cite">1<a target="_blank" href="https://www.technologyreview.com/s/612427/the-rare-form-of-machine-learning-that-can-spot-hackers-who-have-already-broken-in/">https://www.technologyreview.com/s/612427/the-rare-form-of-machine-learning-that-can-spot-hackers-who-have-already-broken-in/</a></p> \n  ';
  var blogpost123 = '\n  <p class="firstparagraph">\n  </p>\n  <p class="quote">  Although it may sound like a term to describe a poorly performing IT staff, zero-knowledge computing could represent an evolution in corporate data protection. The approach enables data to be processed while it remains encrypted, so that analytics can be run without exposing the information. JP Morgan Chase & Co. recently led a $10 million Series A funding round in data security and analytics startup Inpher Inc., which works in the area. In a conversation with CIO Journal\'s Sara Castellanos, Samik Chandarana, head of data analytics for the corporate and investment bank division, makes the case for the technology.\n  <br /><br />\n  Keeping client data safe. JPMorgan could use the \u2018secret computing\u2019 technology to analyze a customer\u2019s proprietary data on their behalf, using artificial intelligence without sacrificing privacy, Mr. Chandarana said. \u201CThis gives us a technological solution to be able to act on a client\u2019s private data \u2026 without them having to worry about the security constraints or giving up all their information to us,\u201D he said.<sup>1</sup>\n  </p>';

  var blogcite123 = '\n  <p class="cite">1<a target="_blank" href="https://blogs.wsj.com/cio/2018/11/13/jpmorgan-invests-in-startup-tech-that-analyzes-encrypted-data/?mod=djemCIO_h">https://blogs.wsj.com/cio/2018/11/13/jpmorgan-invests-in-startup-tech-that-analyzes-encrypted-data/?mod=djemCIO_h</a></p> \n  ';

  var blogpost122 = '\n<p class="firstparagraph">Eco-friendly urban commuting options are a gift, and should always be hailed.  \n</p>\n<p class="quote">  Although it may sound like a term to describe a poorly performing IT staff, zero-knowledge computing could represent an evolution in corporate data protection. The approach enables data to be processed while it remains encrypted, so that analytics can be run without exposing the information. JP Morgan Chase & Co. recently led a $10 million Series A funding round in data security and analytics startup Inpher Inc., which works in the area. In a conversation with CIO Journal\'s Sara Castellanos, Samik Chandarana, head of data analytics for the corporate and investment bank division, makes the case for the technology.\n<br /><br />\nKeeping client data safe. JPMorgan could use the \u2018secret computing\u2019 technology to analyze a customer\u2019s proprietary data on their behalf, using artificial intelligence without sacrificing privacy, Mr. Chandarana said. \u201CThis gives us a technological solution to be able to act on a client\u2019s private data \u2026 without them having to worry about the security constraints or giving up all their information to us,\u201D he said.<sup>1</sup>\n</p>';

  var blogcite122 = '\n<p class="cite">1<a target="_blank" href="https://techcrunch.com/2018/11/14/uber-q3-2018-continues-to-lose-money-as-it-works-to-scale-scooters-bikes-and-other-newer-businesses/">https://techcrunch.com/2018/11/14/uber-q3-2018-continues-to-lose-money-as-it-works-to-scale-scooters-bikes-and-other-newer-businesses/</a></p>\n<p class="cite">2<a target="_blank" href="https://www.zdnet.com/article/amazons-consumer-business-moves-from-oracle-to-aws-but-larry-ellisons-wont-stop-talking/"> https://www.zdnet.com/article/amazons-consumer-business-moves-from-oracle-to-aws-but-larry-ellisons-wont-stop-talking/</a></p>\n';
  var blogpost111 = '\n<p class="quote">\n<p class="quote">At the highest levels of government the plastic panic can resemble a scrambled response to a natural disaster, or a public health crisis. The United Nations has declared a \u201Cwar\u201D on single-use plastic. In Britain, Theresa May has called it a \u201Cscourge\u201D, and committed the government to a 25-year plan that would phase out disposable packaging by 2042. India claimed it would do the same, but by 2022.<sup>1</sup>\n</p>';

  var blogcite111 = '\n<p class="cite"><a target="_blank" href="https://www.androidpolice.com/2018/11/14/pixel-night-sight-also-works-daylight-reducing-noise-boosting-resolution/">https://www.androidpolice.com/2018/11/14/pixel-night-sight-also-works-daylight-reducing-noise-boosting-resolution/</a></p>\n';

  var blogpost122 = '\n  <p class="firstparagraph">Eco-friendly urban commuting options are a gift, and should always be hailed.  \n  </p>\n  <p class="quote">On an earnings before interest, taxes, depreciation and amortization basis (EBIDTA), Uber\u2019s losses were $527 million, up about 21 percent quarter over quarter. And as Uber prepares to go public, the company has started presenting the income statements with stock-based compensation.\n\n  Ten years from now, Uber CEO Dara Khosrowshahi envisions its core ride-hailing business accounting for less than 50 percent of Uber\u2019s overall business, Khosrowshahi told me at TechCrunch Disrupt SF 2018. That means Uber expects businesses like Eats, scooters, bikes and freight to contribute to be more of Uber\u2019s business, which requires Uber to invest heavily in those businesses.<sup>1</sup>\n  </p>';

  var blogcite122 = '\n  <p class="cite">1<a target="_blank" href="https://techcrunch.com/2018/11/14/uber-q3-2018-continues-to-lose-money-as-it-works-to-scale-scooters-bikes-and-other-newer-businesses/">https://techcrunch.com/2018/11/14/uber-q3-2018-continues-to-lose-money-as-it-works-to-scale-scooters-bikes-and-other-newer-businesses/</a></p>\n  <p class="cite">2<a target="_blank" href="https://www.zdnet.com/article/amazons-consumer-business-moves-from-oracle-to-aws-but-larry-ellisons-wont-stop-talking/"> https://www.zdnet.com/article/amazons-consumer-business-moves-from-oracle-to-aws-but-larry-ellisons-wont-stop-talking/</a></p>\n  ';
  var blogpost111 = '\n <p class="quote">Turns out that Google\'s new Night Sight mode for Pixels, formally released just earlier today, has some non-night utility. In a bit of a twist, you can use it in the daytime as well for "denoising and resolution improvements" inherited from another Google Camera feature: Super Res Zoom.<sup>1</sup> \n </p>';

  var blogcite111 = '\n <p class="cite"><a target="_blank" href="https://www.androidpolice.com/2018/11/14/pixel-night-sight-also-works-daylight-reducing-noise-boosting-resolution/">https://www.androidpolice.com/2018/11/14/pixel-night-sight-also-works-daylight-reducing-noise-boosting-resolution/</a></p>\n ';
  var blogpost100 = ' \n  <p class="firstparagraph">Plastics and micro-plastic waste just awaits a tech-informed solution!\n   </p>\n  <p class="quote">At the highest levels of government the plastic panic can resemble a scrambled response to a natural disaster, or a public health crisis. The United Nations has declared a \u201Cwar\u201D on single-use plastic. In Britain, Theresa May has called it a \u201Cscourge\u201D, and committed the government to a 25-year plan that would phase out disposable packaging by 2042. India claimed it would do the same, but by 2022.<sup>1</sup></p>\n ';
  var blogcite100 = ' \n    <p class="cite"> 1 <a target="_blank" href="https://www.theguardian.com/environment/2018/nov/13/the-plastic-backlash-whats-behind-our-sudden-rage-and-will-it-make-a-difference\n    "   target="_blank">https://www.theguardian.com/environment/2018/nov/13/the-plastic-backlash-whats-behind-our-sudden-rage-and-will-it-make-a-difference\n      </a> \n      </p> \n     ';

  var blogpost099 = '\n  <p class="firstparagraph">Thank you Cisco, and Thank you AWS.  Amazon Web Services have now come into their light with new computing power from above --and for us citizens, at fractions of a cent! \n\n  </p>\n  <p class="quote">\n  Amazon Web Services and Cisco announced on Thursday that they\'re teaming up on a product that will allow developers to build applications in the cloud or in traditional data centers while making it easier for them to move between the two.<br /><br />\n\n  It\'s Cisco\'s latest effort to create hybrid options for customers that want to push work to the cloud but still need to run some projects on their own hardware for privacy and regulatory reasons. Cisco previously announced partnerships with the other two major cloud providers, Google and Microsoft, but Amazon is by far the leader in the cloud infrastructure market.<sup>1</sup>\n  </p>';

  var blogcite099 = '\n  <p class="cite">1<a target="_blank" href="https://www.cnbc.com/2018/11/07/aws-and-cisco-partner-on-container-technology-for-hybrid-cloud.html">https://www.cnbc.com/2018/11/07/aws-and-cisco-partner-on-container-technology-for-hybrid-cloud.html</a></p>\n  <p class="cite">2<a target="_blank" href="https://www.zdnet.com/article/amazons-consumer-business-moves-from-oracle-to-aws-but-larry-ellisons-wont-stop-talking/"> https://www.zdnet.com/article/amazons-consumer-business-moves-from-oracle-to-aws-but-larry-ellisons-wont-stop-talking/</a></p>\n  ';
  var blogpost088 = '\n <p class="quote">In April 2018, a group at MIT, USA, showed that it is possible to generate a form of superconductivity in a system of two layers of graphene under very specific conditions: To do this, the two hexagonal nets must be twisted against each other by exactly the magic angle of 1.1\xB0. Under this condition a flat band forms in the electronic structure. The preparation of samples from two layers of graphene with such an exactly adjusted twist is complex, and not suitable for mass production. Nevertheless, the study has attracted a lot of attention among experts.<sup>1</sup>\n </p>';

  var blogcite088 = '\n <p class="cite"><a target="_blank" href="https://www.sciencedaily.com/releases/2018/11/181109150124.htm"> https://www.sciencedaily.com/releases/2018/11/181109150124.htm</a></p>\n ';
  var blogpost077 = ' \n  <p class="firstparagraph">Naming conventions make for a linguistic phenomenon in a world whose rapid change far outpaces accurate transfer of meaning into  language. And, because we don\'t allow our terminology to redefine itself, an increasingly inaccurate language may come to incongruently describe current-day logic, and basically reality...\n   </p>\n  <p class="quote"> But Musk may be right in general about the futility of job titles, which serve largely as a distraction for knowledge workers in today\u2019s economy.\n  We\u2019re all project managers now.<br /><br />\n  \n  According to Roger Martin, a prominent management and strategy expert, and former dean of the Rotman School of Management at the University of Toronto, we may be structuring jobs all wrong. By extension, our addiction to titles as signs of status could be just another example of how humans\u2014whether as individuals or in groups\u2014operate in patterns based on habit, without responding to the world as it really is.<sup>1</sup></p>\n ';
  var blogcite077 = ' \n    <p class="cite"> 1 <a target="_blank" href="https://qz.com/work/1443954/tesla-ceo-elon-musk-is-raising-an-important-question-about-job-titles/\n    "   target="_blank">https://qz.com/work/1443954/tesla-ceo-elon-musk-is-raising-an-important-question-about-job-titles/ \n      </a> \n      </a> \n     ';

  var blogpost066 = '\n  <p class="quote">Tim Berners-Lee has launched a global campaign to save the web from the destructive effects of abuse and discrimination, political manipulation, and other threats that plague the online world.\n\n  In a talk at the opening of the Web Summit in Lisbon on Monday, the inventor of the web called on governments, companies and individuals to back a new \u201CContract for the Web\u201D that aims to protect people\u2019s rights and freedoms on the internet.<sup>1</sup>\n  </p>';

  var blogcite066 = '\n  <p class="cite"><a target="_blank" href="https://www.theguardian.com/technology/2018/nov/05/tim-berners-lee-launches-campaign-to-save-the-web-from-abuse"> https://www.theguardian.com/technology/2018/nov/05/tim-berners-lee-launches-campaign-to-save-the-web-from-abuse</a></p>\n  ';
  var blogpost055 = '\n <p class="quote">"What would guarantee a paradigm shift would be the ability to effortlessly bring disparate devices together," said Blake Kozak, principal analyst at IHS Markit. "A large proportion of consumer complaints stem from installation challenges to devices not being reliable, e.g. scenes not working, high latency even in local control and lack of control when scenes are performing but broken."\n\n 5G, with its ability to handle more connected devices, could be an answer down the line. \n \n But while 5G could provide some consistency across smart home networking standards, it\'s not a panacea due to a familiar problem: battery life. <sup>1</sup>\n </p>';

  var blogcite055 = '\n <p class="cite"><a target="_blank" href="https://www.cnet.com/news/5g-and-the-promise-of-a-smart-home-makeover/"> https://www.cnet.com/news/5g-and-the-promise-of-a-smart-home-makeover/</a></p>\n ';
  var blogpost044 = ' \n  <p class="firstparagraph">Energy Consciousness around traditional <i>Proof of Work</i> blockchain technologies casts a negative light on Bitcoin Mining. Energy consumption from proof-of-work, energy-intensive blockchain mining parallels annual KiloWatt consumption as small countries like Denmark and Singapore.\n   </p>\n  <p class="quote"> \n \n  Bitcoin is a power-hungry cryptocurrency that is increasingly used as an investment and payment system. Here we show that projected Bitcoin usage, should it follow the rate of adoption of other broadly adopted technologies, could alone produce enough CO2 emissions to push warming above 2 \xB0C within less than three decades.<sup>1</sup>\n   <p>\n  <p class="quote">an article by a team of researchers from Hawaii in the journal Nature Climate Change last week did much the same kind of calculations as de Vries and Krause and found that bitcoin usage resulted in the equivalent of 69 million metric tonnes of CO2 in 2017. If bitcoin grows like other technologies, the authors said, it\u2019d cough out enough greenhouse gas to warm the planet by 2 degrees celsius by the mid-2030s.<sup>2</sup>\n  </p>';
  var blogcite044 = ' \n    <p class="cite"> 1 <a target="_blank" href="https://www.nature.com/articles/s41558-018-0321-8\n    "   target="_blank">https://www.nature.com/articles/s41558-018-0321-8\n      </a> \n    <p class="cite"> 2 <a target="_blank" href="https://www.wired.com/story/bitcoin-will-burn-planet-down-how-fast/\n    "   target="_blank">https://www.wired.com/story/bitcoin-will-burn-planet-down-how-fast/\n      </a> \n     ';
  var blogpost033 = ' \n     <p class="firstparagraph"> \n      </p>\n      <p class="quote">The invention provides for systems and devices for hardened remote storage of private cryptography keys used for authentication. The storage device is tamper-responsive, such that receipt of a signal that indicates physical or non-physical tampering with the storage device or its components results in deletion of the private cryptography key(s) from the memory. The storage device is configured to be separate and remote from a computing node that executes an authentication routine requiring the private cryptography key(s) and, as such, the private cryptography key(s) are accessible to, but not communicated to, the computing node only when the computing node is executing the authentication routine.</p><sup>1</sup> \n      <p >\n   \n      </p>';
  var blogcite033 = '  <p class="cite"> 1 <a target="_blank" href="https://u.today/bank-of-america-awarded-new-patent-for-storing-private-keys"   target="_blank">https://u.today/bank-of-america-awarded-new-patent-for-storing-private-keys</a> </p>\n       \n       <p class="cite">2 <a target="_blank" href="http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&u=%2Fnetahtml%2FPTO%2Fsearch-adv.htm&r=1&p=1&f=G&l=50&d=PTXT&S1=10,116,633.PN.&OS=pn/10,116,633&RS=PN/10,116,633"   target="_blank">http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&u=%2Fnetahtml%2FPTO%2Fsearch-adv.htm&r=1&p=1&f=G&l=50&d=PTXT&S1=10,116,633.PN.&OS=pn/10,116,633&RS=PN/10,116,633</a> </p>\n        ';

  var blogpost022 = ' \n  <p class="firstparagraph"> \n   </p>\n  <p class="quote"> <p>\n  ';
  var blogcite022 = ' \n    <p class="cite"> <a target="_blank" href=""   target="_blank">\n      </a> </p>\n     ';
  var blogpost011 = ' \n     <p class="firstparagraph"> \n      </p>\n      <p> </p>';
  var blogcite011 = '  <p class="cite"> <a target="_blank" href=""   target="_blank"></a> </p>\n        \n        ';

  var url = [{
    id: '137',
    did: '11-30-18',
    date: 'November 30, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Quantum Data',
    title: 'Paradigm Breaker',
    post: blogpost137,
    blogcite: blogcite137
  }, {
    id: '136',
    did: '11-30-18',
    date: 'November 30, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now.',
    title: 'A Co-Bot Revolution ',
    post: blogpost136,
    blogcite: blogcite136
  }, {
    id: '135',
    did: '11-29-18',
    date: 'November 29, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now.',
    title: 'Diversity and Equality in the Machine Learning Landscape',
    post: blogpost135,
    blogcite: blogcite135
  }, {
    id: '134',
    did: '11-28-18',
    date: 'November 28, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow',
    title: 'The Great Bitcoin Bust of \'18, Part II:<br />The Costs of Deprecated Technology',
    post: blogpost134,
    blogcite: blogcite134
  }, {
    id: '133',
    did: '11-27-18',
    date: 'November 27, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow',
    title: 'The Great Bitcoin Bust of \'18, Part I:<br />The Earth-Killer Currency\'s Last Days',
    post: blogpost133,
    blogcite: blogcite133
  }, {
    id: '132',
    did: '11-26-18',
    date: 'November 26, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow',
    title: 'Oops, They Did it Again',
    post: blogpost132,
    blogcite: blogcite132
  }, {
    id: '131',
    did: '11-24-18',
    date: 'November 24-25, 2018<br />Weekend ',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: '5G Security Foundations for 21st Century Appliances',
    post: blogpost131,
    blogcite: blogcite131
  }, /*
     {
     id: '130',
     did: '11-23-18',
     date: 'November 23, 2018 ',
     author: 'by Thomas Maestas',
     cat3: 'Sociology Tomorrow',
     title: 'Oops, They Did it Again',
     post: blogpost130,
     blogcite: blogcite130
     },   */
  {
    id: '129',
    did: '11-22-18',
    date: 'November 22, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now.',
    title: 'Healthy Livin\' Cells',
    post: blogpost129,
    blogcite: blogcite129
  }, {
    id: '128',
    did: '11-21-18',
    date: 'November 21, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Protecting Data',
    post: blogpost128,
    blogcite: blogcite128
  }, {
    id: '127',
    did: '11-20-18',
    date: 'November 20, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now.',
    title: 'Tech\'s Mortal Dependence on Global Trade Calls for World Peace!',
    post: blogpost127,
    blogcite: blogcite127
  }, {
    id: '126',
    did: '11-19-18',
    date: 'November 19, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Facebook\'s Struggle with Regulation',
    post: blogpost126,
    blogcite: blogcite126
  }, {
    id: '125',
    did: '11-17-18',
    date: 'November 17-18, 2018<br />Weekend ',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Tech Money\'s Deep Footprint',
    post: blogpost125,
    blogcite: blogcite125
  }, {
    id: '124',
    did: '11-16-18',
    date: 'November 16, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now.',
    title: 'A More Retrospective A.I.',
    post: blogpost124,
    blogcite: blogcite124
  }, {
    id: '123',
    did: '11-15-18',
    date: 'November 15, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now.',
    title: 'Fast, Anonymized Money!',
    post: blogpost123,
    blogcite: blogcite123
  }, {
    id: '122',
    did: '11-14-18',
    date: 'November 14, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Green Options',
    post: blogpost122,
    blogcite: blogcite122
  }, {
    id: '111',
    did: '11-13-18',
    date: 'November 13, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Picture Power',
    post: blogpost111,
    blogcite: blogcite111
  }, {
    id: '100',
    did: '11-12-18',
    date: 'November 12, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow',
    title: 'Plastic Hangover',
    post: blogpost100,
    blogcite: blogcite100
  }, {
    id: '099',
    did: '11-10-18',
    date: 'November 10-11, 2018<br />Weekend ',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Thank You, AWS--for your Software Megatron',
    post: blogpost099,
    blogcite: blogcite099
  }, {
    id: '088',
    did: '11-09-18',
    date: 'November 9, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Graphene Dreams',
    post: blogpost088,
    blogcite: blogcite088
  }, {
    id: '077',
    did: '11-08-18',
    date: 'November 8, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow',
    title: 'What\'s in a Name',
    post: blogpost077,
    blogcite: blogcite077
  }, {
    id: '066',
    did: '11-07-18',
    date: 'November 7, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'The Uncharted Cloud Territory: A Magna Carta',
    post: blogpost066,
    blogcite: blogcite066
  }, {
    id: '055',
    did: '11-06-18',
    date: 'November 6, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'The 5G IoT SuperHighway',
    post: blogpost055,
    blogcite: blogcite055
  }, {
    id: '044',
    did: '11-05-18',
    date: 'November 5, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Tesla at Work',
    post: blogpost044,
    blogcite: blogcite044
  }, {
    id: '033',
    did: '11-03-18',
    date: 'November 3-4, 2018<br />Weekend',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'Now that\'s a Safe Keep!',
    post: blogpost033,
    blogcite: blogcite033
  }, {
    id: '022',
    did: '11-02-18',
    date: 'November 2, 2018 ',
    author: 'by Thomas Maestas',
    cat3: ' ',
    title: ' ',
    post: blogpost022,
    blogcite: blogcite022
  }, {
    id: '01',
    did: '11-01-18',
    date: 'November 1, 2018 ',
    author: 'by Thomas Maestas',
    cat3: ' ',
    title: ' ',
    post: blogpost011,
    blogcite: blogcite011
  }];
  var i;
  for (i = 0; i < url.length; i++) {
    var cat = ' \n    <div id="' + url[i].did + '" class="blogDiv"> \n    <hr />  \n    <a target="_blank" href="#top"><button>Top</button></a>  \n    <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n    <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5> \n    <p id="author" class="  author">' + url[i].author + '</p>   \n    <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n    <h6  id="title"   class="dailytitle chapternumber">' + url[i].title + '</h6>\n    <br />\n    <div id="post">' + url[i].post + '\n    </div>\n    <div id="blogcite">' + url[i].blogcite + '\n    </div>';
    document.getElementById("paragraph-nov").innerHTML += cat;
  }

  for (i = 0; i < url.length; i++) {
    var catMod = '\n  <div id="mod_' + url[i].did + '" class="blogDivMod"> \n  <hr />  \n  <a target="_blank" href="#top-mod"><button>Top</button></a>   \n  <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n  <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5>  \n  <p id="author" class="  author">' + url[i].author + '</p>   \n  <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n  <h6  id="title"   class="dailytitle chapternumber">' + url[i].title + '</h6>\n  <br />\n  <div id="post">' + url[i].post + '</div>\n  </div>\n <div id="blogcite">' + url[i].blogcite + '\n </div>';
    document.getElementById("paragraph-nov-mod").innerHTML += catMod;
  }
  //console.log(angular.toJson(url));
  // console.log(url);
}; // end bloggerNov()
bloggerNov();

/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 'use strict';

var bloggerOct = function bloggerOct() {

  var blogpost22 = ' \n        <p class="firstparagraph">Cloud data is at once fast, seamless and powered by limitless computer processing power and partitions!\n         </p>\n        <p class="quote">\n        Responding to a question around slowed capex growth, the Microsoft CEO explained the company\u2019s intelligent cloud and intelligent edge ethos was being spread across every business line; from Azure, of course, to Dynamics 365, to gaming. It is a unified, long-term message, Nadella added. \u201CFor the first time, what you see across Microsoft is really one platform which spans all of these businesses and all of the margin structures that are there represented in it,\u201D he said.<sup>1</sup><p>\n        ';
  var blogcite22 = ' \n          <p class="cite"> 1 <a target="_blank" href="https://www.cloudcomputing-news.net/news/2018/oct/25/microsoft-cites-azure-and-cloud-strength-more-strong-financials-its-all-about-long-term-ethos/\n          "   target="_blank">https://www.cloudcomputing-news.net/news/2018/oct/25/microsoft-cites-azure-and-cloud-strength-more-strong-financials-its-all-about-long-term-ethos/\n            </a> \n           ';
  var blogpost21 = ' \n           <p class="firstparagraph">Light matters alot more when its attributes power both quantum-based qubit calculations and the process itself making metamaterials they are based on!</p>\n            </p>\n            <p class="quote">Breakthroughs in the field of nanophotonics -- how light behaves on the nanometer scale -- have paved the way for the invention of "metamaterials," human-made materials that have enormous applications, from remote nanoscale sensing to energy harvesting and medical diagnostics. But their impact on daily life has been hindered by a complicated manufacturing process with large margins of error.\n            <br /><br />\n            "The process of designing metamaterials consists of carving nanoscale elements with a precise electromagnetic response," Dr. Mrejen says. "But because of the complexity of the physics involved, the design, fabrication and characterization processes of these elements require a huge amount of trial and error, dramatically limiting their applications."\n            <br /><br />\n            Deep Learning a key to precision manufacturing\n            <br /><br />\n            "Our new approach depends almost entirely on Deep Learning, a computer network inspired by the layered and hierarchical architecture of the human brain," Prof. Wolf explains. "It\'s one of the most advanced forms of machine learning, responsible for major advances in technology, including speech recognition, translation and image processing. We thought it would be the right approach for designing nanophotonic, metamaterial elements."<sup>1</sup></p>';
  var blogcite21 = '  <p class="cite"> 1 <a target="_blank" href="https://www.sciencedaily.com/releases/2018/10/181023130502.htm"   target="_blank">https://www.sciencedaily.com/releases/2018/10/181023130502.htm/a> </p>\n              \n              ';
  var blogpost20 = ' \n  <p class="firstparagraph">Material technologies too often remain the unsung hero for so much advancement in any field.\n   </p>\n  <p class="quote">The body material itself is what McLaren calls "titanium deposition carbon fiber," where a micron-thin layer of titanium is fused directly into the fiber\'s weave, becoming an integral part of the construction.<sup>1</sup></p>\n  <img src="dist/img/mclaren.jpg" class="zoom" /><p>\n  McLaren just reinvented the wing--erhum, by doing away with the spoiler wing? By algorithmically adjusting the centers of windflow pressure based on speed, other factors optimizes -- reinvents -- the wing:</p>\n  <p class="quote">The entire body is made from lightweight carbon fiber, parts of which are actually flexible. On each end of the tail, active ailerons can actually bend, reducing turbulence and drag at higher speeds. According to McLaren, these ailerons "adjust to move the center of pressure and provide the required level of downforce precisely when it is needed most." It\'s airspace tech in an automotive application, and it alleviates the need for a silly rear wing.<sup>1</sup></p>\n  <p>With a little more precision and reliability, what should stop them from inverting air-flow, and strap some wings and a turbine to that 1,000 horse-power engine!<p>\n  ';
  var blogcite20 = ' \n    <p class="cite"> 1 <a target="_blank" href="https://www.cnet.com/roadshow/news/mclaren-speedtail-official-debut/\n    "   target="_blank">https://www.cnet.com/roadshow/news/mclaren-speedtail-official-debut/\n      </a> \n     ';
  var blogpost19 = ' \n     <p class="firstparagraph">Data privacy\'s new hero raises attention to one of the more pressing issue of technology in our lives:\n      </p>\n      <p class="quote">Apple\u2019s chief executive, Tim Cook, called on Wednesday for a federal privacy law in the US to protect against voracious internet companies hoarding so much digital data that the businesses know citizens \u201Cbetter than they know themselves\u201D \u2013 and then often sell the information on.\n<br /><br />\n      Cook warned in a keynote speech that personal data was being \u201Cweaponized\u201D against the public and endorsed tough privacy laws for both Europe and the US. The iPhone and Mac computer giant has stood out in its explicit declarations that Apple prefers to protect its customers\u2019 personal data.\n      </p>\n      <p>Importantly, Tim Cook addresses the most sensitive of data about ourselves, i.e. the nexus of volunteered and observed data: <i>inferred data</i>:\n     <p class="quote">Broadly [personal data] can be split into three categories: Volunteered data is information we willingly part with in online surveys and social media profiles. Observed data is captured through the observation of actions and interactions of individuals (GPS data and telecoms metadata, for example). Inferred data is used to complete the picture by mining those first two categories.<sup>1</sup></p>';
  var blogcite19 = '  <p class="cite"> 1 <a target="_blank" href="https://www.theguardian.com/technology/2018/oct/24/tim-cook-us-federal-privacy-law-weaponized-personal-data"   target="_blank">https://www.theguardian.com/technology/2018/oct/24/tim-cook-us-federal-privacy-law-weaponized-personal-data</a> </p>\n       \n       <p class="cite"> 2 <a target="_blank" href="https://medium.com/s/new-world-crime/how-much-are-you-worth-in-the-online-data-economy-5ae2dd236135"   target="_blank">\n       https://medium.com/s/new-world-crime/how-much-are-you-worth-in-the-online-data-economy-5ae2dd236135</a> </p>\n        ';
  var blogpost18 = '       \n  <p class="firstparagraph">Bigger, Faster Image Rendering--especially when data points are tied to the pixels of a page, but especially still pictures should be the browsers\' Task #1. Instead, load-times too often fall victim to the graphics ... but the browser world is now willing to work together for  action:\n   </p>\n  <p class="quote">Google revealed WebP eight years ago and since then has built it into its Chrome web browser, Android phone software and many of its online properties in an effort to put websites on a diet and cut network data usage. But Google had trouble encouraging rival browser makers to embrace it.\n  <br /><br />\n  "Mozilla is moving forward with implementing support for WebP," the nonprofit organization said. WebP will work in versions of Firefox based on its Gecko browser engine, Firefox for personal computers and Android but not for iOS. Mozilla plans to add support in the first half of 2019.\n\nCommitting to a new image format on the web is a big deal. In addition to technical challenges and new security risks, embracing a new image format means embracing it for years and years, because removing support at some point in the future will break websites that rely on it.\n<br /><br />\nIt\'s one of the central conundrums of the web. Browser makers and website developers want to advance the technology, but they can\'t remove older aspects of the foundation as readily as Google can with Android or Apple with its rival iOS software. Websites have a long shelf life.<sup>1</sup></p>';
  var blogcite18 = ' \n    <p class="cite"> 1 <a target="_blank" href="https://www.cnet.com/news/firefox-to-support-googles-webp-image-format-for-a-faster-web/\n    "   target="_blank">https://www.cnet.com/news/firefox-to-support-googles-webp-image-format-for-a-faster-web/\n      </a> \n     ';
  var blogpost17 = ' \n     <p class="firstparagraph">Bootstrapping analytic models in any science requires a long, steady climb upon the <i>Shoulders of Giants</i>, years and decades\' past research gains--especially  Classification and Regression Trees . \n      </p>\n     <p class="quote">When approaching any type of Machine Learning (ML) problem there are many different algorithms to choose from. In machine learning, there\u2019s something called the \u201CNo Free Lunch\u201D theorem which basically states that no one ML algorithm is best for all problems. The performance of different ML algorithms strongly depends on the size and structure of your data.<sup>1</sup></p>';
  var blogcite17 = ' \n       <p class="cite"> 1 <a target="_blank" href="https://towardsdatascience.com/selecting-the-best-machine-learning-algorithm-for-your-regression-problem-20c330bad4ef\n       "   target="_blank">\n       https://towardsdatascience.com/selecting-the-best-machine-learning-algorithm-for-your-regression-problem-20c330bad4ef\n         </a> \n        ';
  var blogpost16 = ' \n  <p class="firstparagraph">Apple V. Bloomberg. Bloomberg hit first. Much controversy now surrounds the topic of my October 10th post--that Bloomberg claiming that Apple was aware of potential chip embeds from foreign manufacturers. Whose news can one believe anymore? \n   </p>\n  <p class="quote"> Apple Inc Chief Executive Tim Cook on Friday told an online news website that Bloomberg should retract a story that claimed Apple\u2019s internal computer systems had been infiltrated by malicious computer chips inserted by Chinese intelligence agents. <br /><br />\n  \u201CThere is no truth in their story about Apple,\u201D Cook told BuzzFeed News in an interview with the online publication. \u201CThey need to do that right thing and retract it.\u201D<sup>2</sup></p>';
  var blogcite16 = ' \n    <p class="cite"> 1 <a target="_blank" href=" https://www.reuters.com/article/us-apple-bloomberg/apple-ceo-urges-bloomberg-to-retract-spy-chip-story-idUSKCN1MT2Z8\n    "   target="_blank">\n    https://www.reuters.com/article/us-apple-bloomberg/apple-ceo-urges-bloomberg-to-retract-spy-chip-story-idUSKCN1MT2Z8\n    \n    \n      </a> \n     ';
  var blogpost15 = ' \n  <p>\n  Mathematically, reading time   necessarily divides itself up into small pieces now that everyone is a click away from anything readable, every novel written, at a moment\'s download, without or without easy phone and tablet reading. But given that choice, the trend toward fiction is not without good reason ... </p>\n  <p class="quote">\n  Modern day reading habits continue to evolve in a digital age. Statistics vary on exactly how many people are reading novels this decade compared to decades past. There is a definite trend for general readers to buy more fiction than nonfiction books\u2014and to get facts, news and crystallized knowledge from the internet. In 2012, only four of the top twenty books were nonfiction titles.<br /><br />\n\n"People are interested in escape," says Carol Fitzgerald of the Book Report Network. "In a number of pages, the story will open, evolve and close, and a lot of what\'s going on in the world today is not like that. You\'ve got this encapsulated escape that you can enjoy."<sup>2</sup></p>';
  var blogcite15 = ' \n    <p class="cite"> 1 <a target="_blank" href="https://www.smithsonianmag.com/smart-news/growing-surrounded-books-may-bolster-skills-later-life-180970523/\n    "   target="_blank">\n    https://www.smithsonianmag.com/smart-news/growing-surrounded-books-may-bolster-skills-later-life-180970523/\n    \n    \n      </a>\n      </p>  \n  <p class="cite"> 2 <a target="_blank" href="https://www.psychologytoday.com/us/blog/the-athletes-way/201401/reading-fiction-improves-brain-connectivity-and-function\n"   target="_blank">\nhttps://www.psychologytoday.com/us/blog/the-athletes-way/201401/reading-fiction-improves-brain-connectivity-and-function\n\nhttps://www.smithsonianmag.com/smart-news/growing-surrounded-books-may-bolster-skills-later-life-180970523/\n  </a>\n  </p>   \n\n     ';
  var blogpost14 = ' \n  <p class="firstparagraph">Technology provides the resources for a better life all around ... </p>\n    <p class="quote"> \n    The more sophisticated science becomes, the harder it is to communicate results. Papers today are longer than ever and full of jargon and symbols. They depend on chains of computer programs that generate data, and clean up data, and plot data, and run statistical models on data. These programs tend to be both so sloppily written and so central to the results that it\u2019s contributed to a replication crisis, or put another way, a failure of the paper to perform its most basic task: to report what you\u2019ve actually discovered, clearly enough that someone else can discover it for themselves.<br /><br />\n    Perhaps the paper itself is to blame. Scientific methods evolve now at the speed of software; the skill most in demand among physicists, biologists, chemists, geologists, even anthropologists and research psychologists, is facility with programming languages and \u201Cdata science\u201D packages. And yet the basic means of communicating scientific results hasn\u2019t changed for 400 years. Papers may be posted online, but they\u2019re still text and pictures on a page.<sup>1</sup></p>\n    <p>Anaconda, the programming package bundle features math software with Spyder applications, yet the Jupyter notebook is already revolutionizing academic publications...';
  var blogcite14 = ' \n  <p class="cite"> 1 <a target="_blank" href="\n  https://www.vox.com/2014/11/24/7272929/global-poverty-health-crime-literacy-good-news"   target="_blank">\n  https://www.vox.com/2014/11/24/7272929/global-poverty-health-crime-literacy-good-news\n  </a>\n  </p>   \n     ';
  var blogpost13 = ' \n  <p class="firstparagraph">The College Term-Paper, the perennial object of dread or elation, of tedium or excitement. Yet, more and more, the needs for communication require the inclusion of programming, analytic language. Paragraphs of eloquently written code with paragraphs of synopsis, from one logical statement to the next, laying out the proofs with each paragraph. Best yet, it is innately online and presentable, and employs the powerful languages like Python and R. But how to communicate these specialized papers to a wide audience?</p>\n    <p class="quote"> \n    The more sophisticated science becomes, the harder it is to communicate results. Papers today are longer than ever and full of jargon and symbols. They depend on chains of computer programs that generate data, and clean up data, and plot data, and run statistical models on data. These programs tend to be both so sloppily written and so central to the results that it\u2019s contributed to a replication crisis, or put another way, a failure of the paper to perform its most basic task: to report what you\u2019ve actually discovered, clearly enough that someone else can discover it for themselves.<br /><br />\n    Perhaps the paper itself is to blame. Scientific methods evolve now at the speed of software; the skill most in demand among physicists, biologists, chemists, geologists, even anthropologists and research psychologists, is facility with programming languages and \u201Cdata science\u201D packages. And yet the basic means of communicating scientific results hasn\u2019t changed for 400 years. Papers may be posted online, but they\u2019re still text and pictures on a page.<sup>1</sup></p>\n    <p>Anaconda, the programming package bundle features math software with Spyder applications, yet the Jupyter notebook is already revolutionizing academic publications...';
  var blogcite13 = ' \n  <p class="cite"> 1 <a target="_blank" href="\n  https://www.vox.com/2014/11/24/7272929/global-poverty-health-crime-literacy-good-news"   target="_blank">\n  https://www.vox.com/2014/11/24/7272929/global-poverty-health-crime-literacy-good-news\n  </a>\n  </p>  \n  <p class="cite"> 2 <a target="_blank" href="https://qz.com/1416867/the-2018-nobel-prize-in-economics-goes-to-william-nordhaus-and-paul-romer/"   target="_blank">https://qz.com/1416867/the-2018-nobel-prize-in-economics-goes-to-william-nordhaus-and-paul-romer/\n  </a>\n  </p>  \n     ';
  var blogpost12 = '\n  <p class="firstparagraph">Modeling the molecular behavior of organic chemistry, biology has become the specialty of Quantum computing, with its superposed third-state that supports short bursts of ultra-fast algorithm computations. Quantum computing has revolutionized biology, so why not psychology?  ..at least at the molecular level: </p><p class="quote"> According to Zheng Joyce Wang and others who try to model our decision-making processes mathematically, the equations and axioms that most closely match human behavior may be ones that are rooted in quantum physics.\n\n  "We have accumulated so many paradoxical findings in the field of cognition, and especially in decision-making," said Wang, who is an associate professor of communication and director of the Communication and Psychophysiology Lab at The Ohio State University.<br /><br />\n  \n  "Whenever something comes up that isn\'t consistent with classical theories, we often label it as \'irrational.\' But from the perspective of quantum cognition, some findings aren\'t irrational anymore. They\'re consistent with quantum theory\u2014and with how people really behave."\n  \n  \n  <sup>1</sup></p>\n  <p>So much for the binary way of thinking--after all, isn\'t life more colorful than black-and-white reasoning?\n  </p>\n ';
  var blogcite12 = '  \n  <p class="cite">1 <a target="_blank" href="https://phys.org/news/2015-09-youre-irrational-quantum-probabilistic-human.html"   target="_blank">https://phys.org/news/2015-09-youre-irrational-quantum-probabilistic-human.html\n  </a>\n  </p>\n  <p class="cite">PDFs <br /> <a target="_blank" href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(15)00099-6"   target="_blank">https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(15)00099-6\n  </a> \n  </p>\n  <p class="cite">PDFs <br /> <a target="_blank" href="http://journals.sagepub.com/doi/abs/10.1177/0963721414568663"   target="_blank">http://journals.sagepub.com/doi/abs/10.1177/0963721414568663\n  </a> \n  </p>\n     ';

  var blogpost11 = '\n  <p class="firstparagraph">Quantum <i>\'Flat-Earther\'s</i> have one less argument ...</p><p class="quote">\n  \n\nStraightaway, they saw the droplets exhibit surprisingly quantum-like behaviors \u2014 only traversing certain \u201Cquantized\u201D orbits around the center of their liquid baths, for instance, and sometimes randomly jumping between orbits, as electrons do in atoms. There and in bouncing-droplet labs that soon sprang up at the Massachusetts Institute of Technology and elsewhere, droplets were seen to tunnel through barriers and perform other acts previously thought to be uniquely quantum. In reproducing quantum phenomena without any of the mystery, the bouncing-droplet experiments rekindled in some physicists de Broglie\u2019s old dream of a reality at the quantum scale that consists of pilot waves and particles instead of probability waves and conundrums.<br /><br />\n\nBut a series of bouncing-droplet findings since 2015 has crushed this dream. The results indicate that Couder\u2019s most striking demonstration of quantum-like phenomena, back in 2006 \u2014 \u201Cthe experiment that got me hooked on this problem,\u201D the fluid dynamicist Paul Milewski said \u2014 was in error. Repeat runs of the experiment, called the \u201Cdouble-slit experiment,\u201D have contradicted Couder\u2019s initial results and revealed the double-slit experiment to be the breaking point of both the bouncing-droplet analogy and de Broglie\u2019s pilot-wave vision of quantum mechanics.\n  <sup>1</sup></p>\n ';
  var blogcite11 = ' \n  <p class="cite"> <a target="_blank" href="https://www.quantamagazine.org/famous-experiment-dooms-pilot-wave-alternative-to-quantum-weirdness-20181011/"   target="_blank">https://www.quantamagazine.org/famous-experiment-dooms-pilot-wave-alternative-to-quantum-weirdness-20181011/\n  </a>\n  </p>\n     ';

  var blogpost10 = '\n<p class="firstparagraph">Climate-change scientist-activists earn their prestige with every research study and every letter written. With less fanfare, economists also earn their due prestige for working toward a sustainable prosperity.     </p>\n<p class="quote"> This year\u2019s [Nobel Prize] Laureates William Nordhaus and Paul Romer have significantly broadened the scope of economic analysis by constructing  models that explain how the market economy interacts with nature and knowledge. <br /><br />\n Romer demonstrates how knowledge can function as a driver of long-term economic \ngrowth. When annual economic growth of a few per cent accumulates over decades, it transforms people\u2019s lives. \nPrevious macroeconomic research had emphasised technological innovation as the primary driver of economic \ngrowth, but had not modelled how economic decisions and market conditions determine the creation of new \ntechnologies. Paul Romer solved this problem by demonstrating how economic forces govern the willingness of \nfirms to produce new ideas and innovations. \n<sup>1</sup></p>\n<p>The economist in turn practices what he preaches by using only open-source software--to the aim of democratizing research itself:</p>\n<p class="quote">Romer believes in making research transparent. He argues that openness and clarity about methodology is important for scientific research to gain trust. As Romer explained in an April 2018 blog post, in an effort to make his own work transparent, he tried to use Mathematica to share one of his studies in a way that anyone could explore every detail of his data and methods. It didn\u2019t work. He says that Mathematica\u2019s owner, Wolfram Research, made it too difficult to share his work in a way that didn\u2019t require other people to use the proprietary software, too. Readers also could not see all of the code he used for his equations.\n<br /><br />\nInstead of using Mathematica, Romer discovered that he could use a Jupyter notebook for sharing his research. Jupyter notebooks are web applications that allow programmers and researchers to share documents that include code, charts, equations, and data. Jupyter notebooks allow for code written in dozens of programming languages. For his research, Romer used Python\u2014the most popular language for data science and statistics.<sup>2</sup>\n</p>\n<p>The Bottom line is that yesterday\'s ink and paper is today\'s software and hardware--essential tools for success, the earlier the better. So, because historical suppression usually begins financially, equal access across social and economic lines.  So, the economic incentive to outfit every last citizen with free wifi and open-source technology. Already, the best in humanity--the Nobel winners--know the public incentive to harness the power of a widespread tech education. Because when the many and not the few create and advance technology, the economy blooms with real productivity.</p>\n  ';
  var blogcite10 = ' \n<p class="cite"> 1 <a target="_blank" href="https://www.nobelprize.org/uploads/2018/10/press-economicsciences2018.pdf"   target="_blank">https://www.nobelprize.org/uploads/2018/10/press-economicsciences2018.pdf \n</a>\n</p>  \n<p class="cite"> 2 <a target="_blank" href="https://qz.com/1416867/the-2018-nobel-prize-in-economics-goes-to-william-nordhaus-and-paul-romer/"   target="_blank">https://qz.com/1416867/the-2018-nobel-prize-in-economics-goes-to-william-nordhaus-and-paul-romer/\n</a>\n</p>  \n   ';

  var blogpost9 = '\n  <p class="firstparagraph">Hackernoon featured Jack Dossman\'s take on the banality of blockchain technology outside of special-use cases. Dossman opines, "Unless your business needs all of the benefits that a blockchain provides, you will be no better off storing your data on one." </p>\n  <p class="quote">By definition, there is no central authority governing a public blockchain, so who makes decisions in this distributed company?\n\n  What about dispute resolution? Once data has been uploaded and verified, it\u2019s not going anywhere. Got charged for a ride you didn\u2019t take? Driver did something really bad that you need to report? Well too bad because nobody is listening. <sup>1</sup></p>\n <p>Now, this article grossly underestimates the range of designs from  private blockchains to consortium blockchains, but the point about hype is well-made!</p>\n    ';
  var blogcite9 = ' \n  <p class="cite"> 1 <a target="_blank" href="https://hackernoon.com/10-things-blockchain-isnt-dcb7966d22e5"   target="_blank">https://hackernoon.com/10-things-blockchain-isnt-dcb7966d22e5 \n  </a>\n  </p>  \n     ';
  var blogpost8 = '\n  <p class="firstparagraph">Intellectual espionage is about as newsworthy as any other misguided nationalist practice across the globe from nearly every nation--in some form. Maybe its the ubiquity of mimicry that events are quickly forgotten. An <i>other-world problem</i>. Yet, this is not merely a regionally-based nuisance. From time immemorial, headlines have raised the prospect of academic, university-based intellectual theft. Related events raised eyebrows and then quickly forgotten. <p>This year, Chinese-made servers discovered with a microscopic, embedded chip may have been known by Apple three years ago. Last week, Bloombergs reported, </p>\n  <p class="quote"> Beijing\'s military intelligence pressured or bribed a Chinese manufacturing subcontractor of US-based Super Micro to include a small secret spy chip in the server maker\'s motherboards. The supposedly grain-of-rice-sized chips were inserted to give China a backdoor into the computers, allowing data to be silently altered or stolen from afar by the Chinese government. <br />\n  <br />Of the 30 or so organizations that apparently received these bugged machines, ranging from a major bank to US government contractors, were Apple and Amazon, according to Bloomberg\'s sources. <sup>1</sup></p>\n  <p>Mischief in all forms pervades nearly every nations\' agenda  ... Again, apparently, who remembers a week afterward?</p> \n    ';
  var blogcite8 = ' \n  <p class="cite"> 1 <a target="_blank" href="https://www.theregister.co.uk/2018/10/08/super_micro_us_uk_intelligence/"   target="_blank">https://www.theregister.co.uk/2018/10/08/super_micro_us_uk_intelligence/ \n  </a>\n  </p> <p class="cite"> 2 <a target="_blank" href="https://www.cnbc.com/2018/10/04/us-warns-companies-about-security-risk-to-managed-service-providers.html"   target="_blank">https://www.cnbc.com/2018/10/04/us-warns-companies-about-security-risk-to-managed-service-providers.html\n  </a>\n  </p>  <p class="cite">3\n  <a target="_blank" href="https://www.bloomberg.com/news/articles/2018-09-04/what-a-mooted-chinese-wireless-mega-merger-means-for-the-5g-race"   target="_blank">https://www.bloomberg.com/news/articles/2018-09-04/what-a-mooted-chinese-wireless-mega-merger-means-for-the-5g-race\n  </a>\n  </p>\n     ';
  var blogpost7 = '\n  <p class="firstparagraph"> The latest news of microscopic foreign chips embedded in Micro Systems chips for hard drives that find their way into Amazon, Pentagon, and other servers in between now raise a new awareness</p>\n  <p class="quote">\n The spy chip could have been placed electrically between the baseboard management controller (BMC) and its SPI flash or serial EEPROM storage containing the BMC\'s firmware. Thus, when the BMC fetched and executed its code from this memory, the spy chip would intercept the signals and modify the bitstream to inject malicious code into the BMC processor, allowing its masters to control the BMC.\n  <sup>1</sup></p> \n  <p> </p>\n  <p class="quote">The spy chip could have been placed electrically between the baseboard management controller (BMC) and its SPI flash or serial EEPROM storage containing the BMC\'s firmware. Thus, when the BMC fetched and executed its code from this memory, the spy chip would intercept the signals and modify the bitstream to inject malicious code into the BMC processor, allowing its masters to control the BMC.<sup>3</sup></p>\n  <p>In sum, the <i>the times, they are - a - changing</i> and that means, like any test-taker knows, cheatsheets do more damage if they fall irrelevent, even slightly deprecated.  </p> \n    ';
  var blogcite7 = '\n  <p class="cite"> 1 <a target="_blank" href="https://www.theregister.co.uk/2018/10/08/super_micro_us_uk_intelligence/"   target="_blank">https://www.theregister.co.uk/2018/10/08/super_micro_us_uk_intelligence/ \n  </a>\n  </p> \n  <p class="cite">2\n  <a target="_blank" href="https://www.forbes.com/sites/kalevleetaru/2018/10/04/the-chinese-spy-chip-story-is-a-reminder-of-how-insecure-our-digital-world-really-is/#1736f0f07e13"   target="_blank">https://www.forbes.com/sites/kalevleetaru/2018/10/04/the-chinese-spy-chip-story-is-a-reminder-of-how-insecure-our-digital-world-really-is/#1736f0f07e13\n  </a>\n  </p> \n  <p class="cite">3\n  <a target="_blank" href="https://www.bloomberg.com/news/articles/2018-09-04/what-a-mooted-chinese-wireless-mega-merger-means-for-the-5g-race"   target="_blank">https://www.bloomberg.com/news/articles/2018-09-04/what-a-mooted-chinese-wireless-mega-merger-means-for-the-5g-race\n  </a>\n  </p>\n     ';
  var blogpost6 = '\n  <p class="firstparagraph">Last month\'s <i>Techcrunch Disrupt!</i> revealed if only a few imminent blockchain trends to pay attention to: The crypto-currency and investment is definitely tamped down, and now the field of play is no longer between competing platforms, but rather the DAPPS are now the players on the established platforms--starting with Ethereum crypto-contracts, browser-based platforms like Mist and other players. <i>The trust and direction is no longer in dispute--now, the question asks: Who can leverage ease-of-use and accessibility and  utility via the web browser ... After all, isn\'t the point of tech advancents, to bring about new possibilities, and  the time to explore them by also providing efficient living! </p>\n   \n    ';
  var blogcite6 = '  \n     ';
  var blogpost5 = '\n  <p class="firstparagraph">Trust, trust layers, and institutions of Trustworthiness: The quaint, <i>Leave-it-to-Beaver terms of a by-gone world</i> haven\'t weakened but are transformed: What was once a rigid hierarchy of trust proclamations from above are now flexible, continually-earned, community-based trust networks. Slowly but surely,<i>Community-centered networks made of social capital overtake institutional, bureaucratic capital and credentialism. </i></p><p class="quote">This is the whole issue. This is everything that we\'re talking about. And how do you trust something that can pull these signals off of you? <br /><br />If a system is asymmetric\u2014if you know more about me than I know about myself, we usually have a name for that in law. So, for example, when you deal with a lawyer, you hand over your very personal details to a lawyer so they can help you. But then they have this knowledge of the law and they know about your vulnerable information, so they could exploit you with that. Imagine a lawyer who took all of that personal information and sold it to somebody else. But they\'re governed by a different relationship, which is the fiduciary relationship. They can lose their license if they don\'t actually serve your interest. And similarly a doctor or a psychotherapist.\n  <sup>1</sup></p>\n  <p>Whether by coincidence or innate features of 21st century technology, trust-based platforms innately reward sharing, trust-based distribution of power. Consider the difference between the democratically operated blockchain, i.e. distributed ledgers without middle-persons, versus hierarchical, siloed centers of information. As usual, the problems that technology present in one form are symmetrically resolved by a technology of another form.';
  var blogcite5 = '\n  <p class="cite">1 <a target="_blank" href="https://www.wired.com/story/artificial-intelligence-yuval-noah-harari-tristan-harris/"   target="_blank">\n  https://www.wired.com/story/artificial-intelligence-yuval-noah-harari-tristan-harris/</a>\n  </p> \n  <p class="cite">2<a target="_blank" href="https://www.wired.com/story/our-minds-have-been-hijacked-by-our-phones-tristan-harris-wants-to-rescue-them/"   target="_blank">https://www.wired.com/story/our-minds-have-been-hijacked-by-our-phones-tristan-harris-wants-to-rescue-them/\n  </a>\n  </p>\n     ';
  var blogpost4 = '<p class="quote"><i>But everywhere you turn on the internet there\'s basically a supercomputer pointing at your brain, playing chess against your mind, and it\'s going to win a lot more often than not.</i><sup>1</sup></p>\n  <p class="firstparagraph">First off, what is Humane Technology? Besides a philosophy that dissipates, a practical philosophy only gains focus--far more valuable than depth or breadth. Much more than a real Des Cartes meets an iPhone, whose focus is on "realigning technology with a clear-eyed model of human nature".</p>\n  <p class="quote">Because we have built our society, certainly liberal democracy with elections and the free market and so forth, on philosophical ideas from the 18th century which are simply incompatible not just with the scientific findings of the 21st century but above all with the technology we now have at our disposal.<br /><br />\n   Our society is built on the ideas that the voter knows best, that the customer is always right, that ultimate authority is, as Tristan said, is with the feelings of human beings and this assumes that human feelings and human choices are these sacred arena which cannot be hacked, which cannot be manipulated. Ultimately, my choices, my desires reflect my free will and nobody can access that or touch that. And this was never true. But we didn\'t pay a very high cost for believing in this myth in the 19th and 20th century because nobody had a technology to actually do it. Now, people\u2014some people\u2014corporations, governments are gaming the technology to hack human beings. Maybe the most important fact about living in the 21st century is that we are now hackable animals.<sup>2</sup></p> \n   <p>But this isn\'t some new thing. By adapting to the new touchstone, on a societal level, the technology bears no more threat than the novel television ad campaigns of the 1950\'s--Some viewers became brain-washed, but not all! So like Bebe Rexha teaches us: <i>No broken hearts in the club tonight, no tears in the club ... We only got one life so let\'s go hard until the day we die!"</i></p>\n  ';
  var blogcite4 = '\n  <p class="cite">https://www.wired.com/story/artificial-intelligence-yuval-noah-harari-tristan-harris/ <a target="_blank" href="https://www.wired.com/story/artificial-intelligence-yuval-noah-harari-tristan-harris/ "   target="_blank">\n  </a>\n  </p> \n  <p class="cite">https://www.wired.com/story/our-minds-have-been-hijacked-by-our-phones-tristan-harris-wants-to-rescue-them/<a target="_blank" href="https://www.wired.com/story/our-minds-have-been-hijacked-by-our-phones-tristan-harris-wants-to-rescue-them/"   target="_blank">\n  </a>\n  </p>\n  ';
  var blogpost3 = '<p class="firstparagraph">\n  There was a time for Seinfeldian Coffee in Cars, when the company makes for the ride.  Today, the ride makes for the company, albeit by real-time Skype and real-time info-tainment. So if you have an extra $60,000 laying around, here\'s the future--this one by BMW ...</p>\n  <p class="quote">There\'s also a new reconfigurable digital gauge cluster that BMW calls Live Cockpit, and an impressively huge and crisp optional head-up display to relay even more information ... Being faced with all of those screens and all of those choices at once probably sounds daunting, but in my brief experience with iDrive 7, it all felt quite intuitive. The system smartly allows for the driver to use their preferred interface method, be that via touchscreen, steering wheel switchgear, cloud-based speech recognition or even gesture control. (A word about the latter: It\'s still overwhelmingly gimmicky. Twirling your finger in the air to turn up the stereo remains a crowd-pleasing novelty, but little more). <sup>1</sup></p>\n  <p></p>';
  var blogcite3 = '  <p class="cite">1\n  <a target="_blank" href="https://www.cnet.com/roadshow/reviews/2019-bmw-x5-preview/"   target="_blank">https://www.cnet.com/roadshow/reviews/2019-bmw-x5-preview/\n  </a>\n  </p>\n  ';

  var blogpost2 = '<p class="quote"><i>The wireless standard known as 4G has untethered us from our living rooms and offices, allowing us to navigate unfamiliar roads and streets using voice directions from Google Maps, stream movies on Netflix while commuting to work, and interview a prospective hire on FaceTime during a flight layover. The next iteration promises to be even more transformative, because it will support communication among objects, as well as people.  \n  </i><sup>1 </sup></p>\n  <p class="firstparagraph"> </p>\n  <img src="dist/img/5g4g.jpg" class="zoom" />\n  <p class="quote">\n  First, providers need a final set of technology standards. The global body setting them, the 3rd Generation Partnership Project, released the first 5G specifications in June; the next set of standards is due in 2020. (The 3GPP, a collaboration between seven telecommunications organizations, also set standards for 3G and 4G LTE mobile systems.) 5G mobile tests also need special handsets, transmission hardware and software and a system design that doesn\u2019t interfere with 4G and 3G networks. And governments need to set aside mobile spectrum space for 5G.</p>\n    ';
  var blogcite2 = '\n  <p class="cite">  <a target="_blank" href="https://www.bloomberg.com/news/articles/2017-02-16/tomorrow-s-cellular-networks-will-generate-3-5-trillion-in-economic-output"   target="_blank">https://www.bloomberg.com/news/articles/2017-02-16/tomorrow-s-cellular-networks-will-generate-3-5-trillion-in-economic-output\n  </a>\n  </p>\n    <p class="cite">  <a target="_blank" href="https://www.bloomberg.com/news/articles/2018-09-17/when-will-ultrafast-internet-come-to-your-phone-quicktake"   target="_blank">https://www.bloomberg.com/news/articles/2018-09-17/when-will-ultrafast-internet-come-to-your-phone-quicktake\n  </a>\n  </p>\n    ';

  var blogpost1 = '<p class="quote"><i>It\'s the next (fifth) generation of cellular technology which promises to greatly enhance the speed, coverage and responsiveness of wireless networks. How fast are we talking about? Think 10 to 100 times speedier than your typical cellular connection, and even faster than anything you can get with a physical fiber-optic cable going into your house.  \n  </i><sup>1 </sup></p>\n  <p class="firstparagraph">5G builds anticipation for the imminent tech revolution, but who\'s paying attention? What\'s the point besides incomparable speed? It\'s not speed, which is a sequential, yesterday term; Zero latency means everything all at once, coming and going: <i>Latency is the primary element that really ushers in the new age, where online, internet connection escapes from home and office nodes into the very links in between!</i>S That seems inconvenient and fleeting but really, shouldn\'t the web follow us in action, rather than chain us down? Consider the world of instantanous request-responses ....</p>\n  <p class="quote">\n  Latency is the response time between when you click on a link or start streaming a video on your phone, sending the request up to the network, and when the network responds and gives you your website or starts playing your video. \nThat lag time can last around 20 milliseconds with current networks. It doesn\'t seem like much, but with 5G, that latency gets reduced to 1 millisecond, or about the time it takes for a flash in a normal camera to finish.  \nThat responsiveness is critical for things like playing an intense video game in virtual reality or for a surgeon in New York to control a pair of robotic arms performing a procedure in San Francisco.</p><p>\nComcast yesterday and T-Mobile Tomorrow or not, the implications of a truly mobile internet couldn\'t be underestimated. What used to be a sensor is tomorrow\'s controller, and today\'s controllers become sensors, because source and target become irrelevant concepts when latency folds uni-directional wait-time into bi-directional concurrent communication. </p><p>Perhaps the central player in this revolution is the fast-developing internet-of-things infrastructure in full development--with a moving target ...</p>    ';
  var blogcite1 = '\n  <p class="cite">  <a target="_blank" href="https://www.cnet.com/how-to/the-5g-revolution-is-coming-heres-everything-you-need-to-know/"   target="_blank">https://www.cnet.com/how-to/the-5g-revolution-is-coming-heres-everything-you-need-to-know/\n  </a>\n  </p>\n    ';

  var url = [{
    id: '22',
    did: '10-25-18',
    date: 'October 25, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Data that goes up must Stay Up',
    post: blogpost22,
    blogcite: blogcite22
  }, {
    id: '21',
    did: '10-24-18',
    date: 'October 24, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Meta-Materials, Part II <br />One, Two, Three, Four--Nanophotonic Metamaterials and More',
    post: blogpost21,
    blogcite: blogcite21
  }, {
    id: '20',
    did: '10-23-18',
    date: 'October 23, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Meta-Materials, Part I <br />Material Science',
    post: blogpost20,
    blogcite: blogcite20
  }, {
    id: '19',
    did: '10-22-18',
    date: 'October 22, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'The Reverent Tim Cook:<br />A Modern American Data Privacy Hero',
    post: blogpost19,
    blogcite: blogcite19
  }, {
    id: '18',
    did: '10-20-18',
    date: 'October 20-21, 2018<br />Weekend',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Image Data on a Diet',
    post: blogpost18,
    blogcite: blogcite18
  }, {
    id: '17',
    did: '10-19-18',
    date: 'October 19, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now.',
    title: 'Machine Learning, By Trial and Error',
    post: blogpost17,
    blogcite: blogcite17
  }, {
    id: '16',
    did: '10-18-18',
    date: 'October 18, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Apple  Gossip, and Digital Hearsay About Snooping',
    post: blogpost16,
    blogcite: blogcite16
  }, {
    id: '15',
    did: '10-17-18',
    date: 'October 17, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Quantum Data',
    title: 'Where\'s the Fiction Aisle?',
    post: blogpost15,
    blogcite: blogcite15
  }, {
    id: '14',
    did: '10-16-18',
    date: 'October 16, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'The Better World that Tech Brings',
    post: blogpost14,
    blogcite: blogcite14
  }, {
    id: '13',
    did: '10-15-18',
    date: 'October 15, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Economic Prosperity, Democracy, and the Technology that Binds The Two',
    post: blogpost13,
    blogcite: blogcite13
  }, {
    id: '12',
    did: '10-13-18',
    date: 'October 13-14, 2018<br /><small>Weekend</small>',
    author: 'by Thomas Maestas',
    cat3: 'Quantum Data',
    title: 'Probabilistic Reality (and Information), Part II<br />Quantum Molecular Psychology',
    post: blogpost12,
    blogcite: blogcite12
  }, {
    id: '11',
    did: '10-12-18',
    date: 'October 12, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Quantum Data',
    title: 'Probabilistic Reality (and Information), Part I<br /> Verifiably Determinated Once and For All',
    post: blogpost11,
    blogcite: blogcite11
  }, {
    id: '10',
    did: '10-11-18',
    date: 'October 11, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Economic Prosperity, Democracy, and the Technology that Binds The Two',
    post: blogpost10,
    blogcite: blogcite10
  }, {
    id: '9',
    did: '10-10-18',
    date: 'October 10, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'Blockchain\'s Quiet Success',
    post: blogpost9,
    blogcite: blogcite9
  }, {
    id: '8',
    did: '10-09-18',
    date: 'October 9, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Intellectual Espionage: <br />Part II: When Does Fair Play for All Warrant a Foul to One?',
    post: blogpost8,
    blogcite: blogcite8
  }, {
    id: '7',
    did: '10-08-18',
    date: 'October 8, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Intellectual Espionage, Part I:<br />Small Chips',
    post: blogpost7,
    blogcite: blogcite7
  }, {
    id: '6',
    did: '10-06-18',
    date: 'October 6-7<br />Weekend, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'Humane Technology: Is there a Goal Post?<br />Part III: Resisting Compartmentalization',
    post: blogpost6,
    blogcite: blogcite6
  }, {
    id: '5',
    did: '10-05-18',
    date: 'October 5, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Humane Technology: Is there a Goal Post?<br />Part II: Tech-based Social Capital',
    post: blogpost5,
    blogcite: blogcite5
  }, {
    id: '4',
    did: '10-04-18',
    date: 'October 4, 2018',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now.',
    title: 'Humane Technology: Is there a Goal Post?<br />Part I: Churches, Education, and Technologies',
    post: blogpost4,
    blogcite: blogcite4
  }, {
    id: '3',
    did: '10-03-18',
    date: 'October 3, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Fast Cars and Faster Info',
    post: blogpost3,
    blogcite: blogcite3
  }, {
    id: '2',
    did: '10-02-18',
    date: 'October 2, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Fast 5G: Part II<br />The How and When',
    post: blogpost2,
    blogcite: blogcite2
  }, {
    id: '1',
    did: '10-01-18',
    date: 'October 1, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Fast 5G: Part I<br />The Why and What',
    post: blogpost1,
    blogcite: blogcite1
  }];

  for (i = 0; i < url.length; i++) {
    var cat = ' \n    <div id="' + url[i].did + '" class="blogDiv"> \n    <hr />  \n    <a target="_blank" href="#top"><button>Top</button></a>  \n    <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n    <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5> \n    <p id="author" class="  author">' + url[i].author + '</p>   \n    <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n    <h6  id="title"   class="dailytitle chapternumber">' + url[i].title + '</h6>\n    <br />\n    <div id="post">' + url[i].post + '\n    </div>\n    <div id="blogcite">' + url[i].blogcite + '\n    </div>';
    document.getElementById("paragraph-oct").innerHTML += cat;
  }

  var i;
  for (i = 0; i < url.length; i++) {
    var catMod = '\n  <div id="mod_' + url[i].did + '" class="blogDivMod"> \n  <hr />  \n  <a target="_blank" href="#top-mod"><button>Top</button></a>   \n  <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n  <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5>  \n  <p id="author" class="  author">' + url[i].author + '</p>   \n  <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n  <h6  id="title"   class="dailytitle chapternumber">' + url[i].title + '</h6>\n  <br />\n  <div id="post">' + url[i].post + '</div>\n  </div>\n <div id="blogcite">' + url[i].blogcite + '\n </div>';
    document.getElementById("paragraph-oct-mod").innerHTML += catMod;
  }
  //console.log(angular.toJson(url));
  // console.log(url);
};
bloggerOct();

/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bloggerSep = function bloggerSep() {

  var blogpost25 = '<p class="paragraph">Web\'s foray into Internet of Things and the upcoming 5G revolution necessitates real-time processing.  Luckily, the dynamic yet slow language of the web, JavaScript now gets a super-speed boost from Web Assembly, a  much lower-level, binary language. Since Web Assembly only recognizes two floating point number types and two integer types, Rust handles string values, etc.</p> <p class="quote"><i>Both Rust and JavaScript have vibrant package ecosystems. Rust has cargo and crates.io. JavaScript has several CLI tools, including the npm CLI, that interface with the npm registry. In order for WebAssembly to be successful, we need these two systems to work well together, specifically:<br/><br/>\n\n  Rust developers should be able to produce WebAssembly packages for use in JavaScript without requiring a Node.js development environment\n  JavaScript developers should be able to use WebAssembly without requiring a Rust development environment\n  <br/><br/>\nEnter: wasm-pack. \nwasm-pack is a tool for assembling and packaging Rust crates that target WebAssembly. These packages can be published to the npm Registry and used alongside other packages. This means you can use them side-by-side with JS and other packages, and in many kind of applications, be it a Node.js server side app, a client-side application bundled by Webpack, or any other sort of application that uses npm dependencies. You can find wasm-pack on crates.io and GitHub.<sup>1 </sup></p>\n<p>Step-by-step, software advances in step-lock with hardware.';

  var blogcite25 = '\n  <p class="cite"> 1 <a href="https://hacks.mozilla.org/2018/04/hello-wasm-pack/"   target="_blank">https://hacks.mozilla.org/2018/04/hello-wasm-pack/\n  </a>\n  </p>  \n  ';

  var blogpost24 = ' \n  <p class="firstparagraph">Democracy, i.e., power of the people, is often expressed in the tools and resources available to everyone. Data visualization software is prohibitively expensive, and complicated, limiting access to universities and commerce. So, many important data stories are relegated to Excel bar charts. These days, the preeminent medium for graphical representation of data is free to all: <i><strong>Pandas</strong>, short for the  Econometrics term \'Panel Data\', that features paragraphs of statistical, programming language with spoken language, coupled with powerful data visualization:  </i> </p>\n    <p class="quote">\n    Millions of people around the world use Pandas. In October 2017 alone, Stack Overflow, a website for programmers, recorded 5 million visits to questions about Pandas from more than 1 million unique visitors. Data scientists at Google, Facebook, JP Morgan, and virtually every other major company that analyze data uses Pandas. Most people haven\u2019t heard of it, but for many people who do heavy data analysis\u2014a rapidly growing group these days\u2014life wouldn\u2019t be the same without it. (Pandas is open source, so it\u2019s free to use.)  <br /><br />Basically, Pandas makes it so that data analysis tasks that would have taken 50 complex lines of code in the past now only take 5 simple lines, because  [Pandas creator] McKinney already did the heavy lifting.  \n    <sup>1</sup></p>\n<p>      Data expression, at the end of the day, and across the land, is now an expression for all!</p>\n    \n    ';
  var blogcite24 = '\n  <p class="cite"> 1 <a href="https://qz.com/1126615/the-story-of-the-most-important-tool-in-data-science/"   target="_blank">https://qz.com/1126615/the-story-of-the-most-important-tool-in-data-science/\n  </a>\n  </p>\n  ';
  var blogpost23 = ' \n  <p class="firstparagraph">The College Term-Paper, the perennial object of dread or elation, of tedium or excitement. Yet, more and more, the needs for communication require the inclusion of programming, analytic language. Paragraphs of eloquently written code with paragraphs of synopsis, from one logical statement to the next, laying out the proofs with each paragraph. Best yet, it is innately online and presentable, and employs the powerful languages like Python and R. But how to communicate these specialized papers to a wide audience?</p>\n    <p class="quote"> \n    The more sophisticated science becomes, the harder it is to communicate results. Papers today are longer than ever and full of jargon and symbols. They depend on chains of computer programs that generate data, and clean up data, and plot data, and run statistical models on data. These programs tend to be both so sloppily written and so central to the results that it\u2019s contributed to a replication crisis, or put another way, a failure of the paper to perform its most basic task: to report what you\u2019ve actually discovered, clearly enough that someone else can discover it for themselves.<br /><br />\n    Perhaps the paper itself is to blame. Scientific methods evolve now at the speed of software; the skill most in demand among physicists, biologists, chemists, geologists, even anthropologists and research psychologists, is facility with programming languages and \u201Cdata science\u201D packages. And yet the basic means of communicating scientific results hasn\u2019t changed for 400 years. Papers may be posted online, but they\u2019re still text and pictures on a page.<sup>1</sup></p>\n    <p>Anaconda, the programming package bundle features math software with Spyder applications, yet the Jupyter notebook is already revolutionizing academic publications...';
  var blogcite23 = ' \n  <p class="cite"> 1 <a href="\n  https://www.theatlantic.com/science/archive/2018/04/the-scientific-paper-is-obsolete/556676/"   target="_blank">\n  https://www.theatlantic.com/science/archive/2018/04/the-scientific-paper-is-obsolete/556676/ \n  </a>\n  </p>  \n  <p class="cite"> 2 <a href="https://qz.com/1416867/the-2018-nobel-prize-in-economics-goes-to-william-nordhaus-and-paul-romer/"   target="_blank">https://qz.com/1416867/the-2018-nobel-prize-in-economics-goes-to-william-nordhaus-and-paul-romer/\n  </a>\n  </p>  \n     ';
  var blogpost20 = ' <p class="quote"> <br /><br />\n  </p>\n  ';
  var blogcite20 = '\n   \n  ';

  var blogpost19 = '<p class="firstparagraph">For every article and blog on the sci-fi imaginations of tech writers, real A.I. presents itself every so often as what it is essentially: a tool.<i> A multi-purpose toolset, tracing its algorithmic root to &Eacute;mile Durkheim\'s 1870s era classification science</i> of human epidiology using national population data from Paris. </p><p>\n  Earlier  Statisticians and Scientists, i.e. modern Developers and Engineers also took their generation\'s Information Technology, applying it toward human-driven purposes. </p>\n  <p>I\'m an optimist at heart, so this blog post stands out: </p><p class="quote">I\u2019d like to point out that the recipe isn\u2019t all that different from code that a programmer might have written by eyeballing the problem and manually making up some rules. Quit anthropomorphizing machine learning already. A model is conceptually the same kind of thing as regular code. You know, the kind of recipe that\u2019s handcrafted by some human armed with an opinion and a caffeine source.<br /><br />And don\u2019t go around saying that retraining\u200A\u2014\u200Ajargon for rerunning the algorithm to adjust the boundary as new examples are gathered\u200A\u2014\u200Amakes it creature-like or inherently different from your programmer\u2019s standard work product. Humans can sit there tweaking the code in response to new info too. <sup>1</sup>\n  </p>\n  <p> Now, A.I. that is attached to robototics? That is an entirely different story, and more akin to another technology, gun weapon proliferation and advancement. Apples and Oranges: Two completely different timelines and analogies that only imaginatively relate according to Hollywood-esque journalists that can assume malevalent intent from a tool, whether a utensil, a car, or an algorithm. \n    </p>\n  ';
  var blogcite19 = '\n  <p class="cite">1. <a href="https://hackernoon.com/machine-learning-is-the-emperor-wearing-clothes-59933d12a3cc">https://hackernoon.com/machine-learning-is-the-emperor-wearing-clothes-59933d12a3cc</a></p>\n  ';
  var blogpost18 = '<p>The 2000\'s Silicon Valley-led boom and bust resulted from overspeculation. The crypto-phenomenon moreso resembles the derivatives packages from the 2007-8 recession bust because value was placed on real estate\'s miscalculated worth based on the assumption the homeowners didn\'t borrow over their income. Likewise crypto-ICO\'s values wasn\'t based on a currency comprised of real cash, but <i> rather, ICO\'s and crypto-platforms were investments of crypto-currency!</i>So, if the one does well, the other continues to do well, multiplied. But exponential gain also means logarithmic loss ...\n   <p class="quote"> There has been a collapse in the number of ICOs that have tried to raise financing.\n\n  This has been driven by a number of factors including uncertainty around regulation, falling crypto market prices and of course, disillusionment in the previous ICOs that raised funding.    Given that the Ethereum blockchain was the premier platform for ICOs to raise their funding, it is feeling the brunt of this slowdown.<br /><br />\n  \n  Not only is this lack of \u201CICO demand\u201D for ETH having an adverse effect on the price but the previous ICOs are also driving the price lower as they try to convert their ETH into Fiat currency to meet expenses.<sup>1</sup>  </p>\n  <p>Notwithstanding, <i> We can also are miscalculating about crypto-platforms\'   center of value  ... it\'s   about the upcoming actual and inevitable practicality for everyday uses.</i> So, three cheers to a long, slow ramp--to another  great  and lasting crypto-currency resurgence!</p>.0\n\n  ';
  var blogcite18 = '\n  <p class="cite">1. <a href="https://cointelegraph.com/news/cryptocurrency-markets-continue-resurgence-as-ripple-claims-68-percent-weekly-gains">https://usethebitcoin.com/the-fall-of-the-ico-impacting-eth-price/</a></p>\n  ';

  var blogpost17 = ' \n<p class="firstparagraph">Regulation of crypto-currencies remains the bane of wider acceptance--while it <i>also shores up trust among fintech instiutions, toward a more certain future. </p>\n  <p class="quote"> The move upwards, which occurred over several hours, came as news broke that U.S. regulators had again postponed their decision on the VanEck/SolidX Bitcoin exchange-traded fund (ETF), but had not rejected it outright.\n<br /><br />\n  At press time, BTC/USD was trading around $6,707 an increase of about 5 percent on the day, taking prices back to the range they hovered in during mid-August. In altcoin markets, Ethereum\u2019s (ETH) reversal of fortunes continued after weeks of beating Bitcoin on losses. Prices at press time for ETH/USD hit $225, also a first since September 7, having fallen as low as $171 in the meantime.<sup>1</sup>\n  </p><p>\n  Imagine if a bank had staked pension portfolio\'s the value of Ether last fall. <i>That</i> would have been a Winter of Discontent value precipitously plummeted by April.</p>\n  ';
  var blogcite17 = '\n  <p class="cite">1. <a href="https://cointelegraph.com/news/cryptocurrency-markets-continue-resurgence-as-ripple-claims-68-percent-weekly-gains">https://cointelegraph.com/news/cryptocurrency-markets-continue-resurgence-as-ripple-claims-68-percent-weekly-gains</a></p>\n  ';
  var blogpost16 = ' <p class="firstparagraph">Altering Market States and technology-advancement forces introspection among crypto-currency hubs.</p>\n  <p class="quote"> According to a local report, as a result of a security breach on September 14, hackers managed to steal 4.5 billion yen from users\' hot wallets, as well as 2.2 billion yen from the assets of the company, with total losses amounting to 6.7 billion yen or around $59.7 million.\n<br />\n  Tech Bureau Inc, which operated Zaif, stated in press release that the exchange detected a server error on September 17, after which Zaif suspended deposits and withdrawals. On September 18, the exchange realized that the error was a hack, and reported the incident to the Japanese financial regulator, the Financial Services Agency (FSA). Hackers stole 5,966 bitcoins (BTC) in addition to some Bitcoin Cash (BCH) and MonaCoin (MONA).<sup>1</sup> \n  </p><p>Fintech regulations have been long in coming, but a thorough SEC-pushed security overhaul could at least dispell fears about what amounts to bank robberies.</p>\n  </p>\n  ';
  var blogcite16 = '\n  <p class="cite">1. <a href="https://cointelegraph.com/news/japanese-cryptocurrency-exchange-hacked-59-million-in-losses-reported">https://cointelegraph.com/news/japanese-cryptocurrency-exchange-hacked-59-million-in-losses-reported</a></p>\n  ';
  var blogpost15 = '<p class="firstparagraph">Crypto-currency dealers, developers and owners should welcome more regulation, scrupulous examination from financial authorities...the value of trust far outweighs the value of speed to market.</p>\n  <p class="quote"> The recent report examines the practices of ten crypto trading platforms based in the U.S. and abroad, as well data collected by the Attorney General\u2019s office about the state of digital currency markets as a whole.<br /><br />\n\n  The study found that the absence of accepted methods for auditing virtual assets results in the lack of a consistent and transparent approach to independently auditing digital currency traded on exchanges. This puts customers\u2019 funds held on their exchange accounts at risk of attacks from hackers or theft. The report subsequently questions the issue of public protection and the sufficiency of the commercial insurance to cover possible losses.<br /><br />\n  \n  The report further outlines abusive trading practices, emphasizing that the majority of crypto trading platforms deploy automated traders, offering them special conditions, which leaves retail customers at a disadvantage. It also states that digital currency exchanges involve numerous, overlapping lines of business that represent serious conflicts of interest. The report explains:\n  <br /><br />\n  \u201CAutomated trading activities could also allow a single trader or group of traders to command multiple accounts simultaneously to obscure coordinated trading, in order to manipulate prices.\u201D<sup>1</sup>\n  </p><p>So, whether before or after breeches of trust, that are inevitable on digital platforms, wouldn\'t you prefer SEC scrutiny along with its guarantees?\n  ';
  var blogcite15 = '\n  <p class="cite">1. <a href="https://cointelegraph.com/news/new-york-attorney-general-report-says-crypto-exchanges-are-at-risk-of-manipulation"> https://cointelegraph.com/news/new-york-attorney-general-report-says-crypto-exchanges-are-at-risk-of-manipulation</a></p>\n  ';
  var blogpost14 = '<p class="firstparagraph">Security of a network can be measured by the degree of carefulness from any node on a network. Likewise, bridging, central hubs can work to bottle-neck the spread of network dangers...  </p>\n  <p class="quote"> As an international data hub and digital entry point to Europe, the Netherlands plays an important role when it comes to tackling these threats and optimally guaranteeing the cybersecurity of our critical infrastructure.\n\n  Saskia Bruines, Deputy Mayor for Education, Knowledge Economy and International Affairs in the Municipality of The Hague:<br /><br />\n  \n  "Technological developments are continuing apace and the current shortage of talent will increase if we fail to take action as a society. For that reason, public authorities, educational institutions and businesses need to join forces to train, attract and retain more talent. That is why it is important to teach children digital skills from an early age. From primary school to university, educating cybertalent has to be high on the agenda. We want everyone to participate so we can all work together to create a safe society."<sup>1</sup>\n  </p>\n  <p>Whether or not the security hole is breeched is immaterial--what counts is loss mitigation and insurance!</p>\n  ';
  var blogcite14 = '\n  <p class="cite">1. <a href="https://www.benzinga.com/pressreleases/18/09/r12366605/cyber-security-week-together-we-secure-the-future-2-5-october-2018-the">https://www.benzinga.com/pressreleases/18/09/r12366605/cyber-security-week-together-we-secure-the-future-2-5-october-2018-the</a></p>\n  ';
  var blogpost13 = '\n \n  <p class="firstparagraph">Paris, as a City foremost, has led global discussion and awareness on climate-change related action. Paris\' smog-dispelling culture presents itself as <i>The City at the center of action</i> with respect to global, macro-level problems. Why the city? It only makes sense that collective action and mobilization requires the correct ratio of community leaders and actors to engage enough social momentum to overcome apathy. </p>\n  <p class="quote">This year, the ban on motorized traffic will apply to the whole of Paris, except for the Bois (woods) and the p\xE9riph\xE9rique (inner ring road). \n  The Parisians themselves will not be able to drive their own vehicle, including electric vehicles, \'clean\' energy vehicles, and Autolib vehicles.<br /><br />\n  \n  The following vehicles will be allowed to circulate, at a maximum of 30 km/h: non-motorized vehicles, emergency vehicles, vehicles for disabled people, taxis, public transport, BigBus and Open Tour, and VTC (the latter (private hire taxis) were not allowed to circulate last year). There are also numerous alternative modes of transport - bicycle, horse & carriage, cyclopolitain (pedicabs) \u2026 <sup>1</sup>\n  </p>\n    <p>On a national-level, action is highly effective but practically impossible, while the community-level can hardly muster the type of leverage to influence other communities. <i> The city, often composed of multiple millions and spanning larger geographies, resembles the powerful cities that governed nation-states from the middle ages forward.</i> Examples include 16th century Florence, 17th century Istanbul, 18th century Paris, and 19th century London--not to mention the first global city-state power, Rome. In terms of collection action, this historical nuance of the city takes a new role:    \n  </p>\n  <p class="quote">Last week at the Global Climate Action Summit, many of the best minds the human species can muster gathered to right the course.\n\n  These people included but were not limited to: environmentalists, mayors from around the world, human rights activists, technologists, academics, business leaders, labor leaders, and former secretaries of state. The kinds of folks with noble pursuits. This was climate change activism without borders. If the Paris Agreement, drafted in 2015, was about governments coming together to fight, last week\u2019s event showed that the most ambitious climate action isn\u2019t happening on the national scale\u2014it\u2019s cities and states that are leading the way.<sup>2</sup></p>\n  <p>Granted, the city is the center of climate-change peril and so it is only natural they are the first to act, and are the defacto center of action ... and hope.</p>\n';
  var blogcite13 = '\n\n  <p class="cite">1<a href="https://en.convention.parisinfo.com/travel-trade/car-free-day-paris">\n  https://en.convention.parisinfo.com/travel-trade/car-free-day-paris</a></p>\n    <p class="cite">2<a href="https://www.wired.com/story/at-the-edge-of-the-world-facing-the-end-of-the-world/">\n    https://www.wired.com/story/at-the-edge-of-the-world-facing-the-end-of-the-world/</a></p>\n  ';
  var blogpost12 = '<p class="firstparagraph">Los Angeles\' technological centality has always been overshadowed by Silicon Valley and Seattle; however, Santa Monica\'s trendy tech hub has begun to make a name for itself with respect to one <strong>hugely important sector: climate-change related technology</strong>.     <p class="quote"> This week, Los Angeles mayor Eric Garcetti joined other leaders, along with activists and business leaders, at the Global Climate Action Summit in San Francisco. The mission? Stop climate change before it destroys the planet, and our species along with it.\n  <br /><br />\n    But the city is in the midst of a metamorphosis. With fewer, yet stronger storms on the horizon, it\u2019s begun an ambitious plan to cut its reliance on imported water in half by 2025. And it\u2019s emerging as a leader in the frantic international quest to curb emissions\u2014in 2016 alone, it slashed emissions by 11 percent, the equivalent of taking more than 700,000 cars off the road.\n    <br /><br />\n    We generated 30,000 new green jobs since I\'ve been mayor, so in five years. To put that in perspective, there\'s 50,000 coal jobs left in America. So this town that\u2019s just 1 percent, roughly, of the US population has created the equivalent of 60 percent of the remaining coal jobs left in America. Appalachia should be doing that, areas that have been hard hit by a recession and not recovered. These are generally good middle class jobs too, not just minimum wage.<sup>1</sup>\n    </p>\n    <p>The expanse of L.A.\'s reach, now touching San Diego, makes climate-friendly commuting a top issue: The two are agglomerating into one city after all, neatly and merely divided by Camp Pendleton. Now, about that ever-elusive high-speed rail system connecting the two ... ';
  var blogcite12 = '\n  <p class="cite">1. <a href="https://www.wired.com/story/how-los-angeles-is-helping-lead-the-fight-against-climate-change/">https://www.wired.com/story/how-los-angeles-is-helping-lead-the-fight-against-climate-change/</a></p>\n   ';
  var blogpost11 = ' <p class="firstparagraph">World Economic Forum, most notable for its annual convocation of world leaders, works around the clock, with no shortage of resources for socio-economic research:\n  </p> <p class="quote"> As technological breakthroughs rapidly shift the frontier between the work tasks performed by humans and those performed by machines and algorithms, global labour markets are likely to undergo major transformations. These transformations, if managed wisely, could lead to a new age of good work, good jobs and improved quality of life for all, but if managed poorly, pose the risk of widening skills gaps, greater inequality and broader polarization. In many ways, the time to shape the future of work is now. The Future of Jobs report provides tools which can support responses to the critical questions confronting businesses, governments and workers in the horizon up to 2022.<sup>1</sup>\n  </p>\n  <p>One clear take-away from the report features the urgent short-term need to responsibily fill vast holes in the labor market:</p>\n  <p class="quote">Machines Will Do More Tasks Than Humans by 2025 but Robot Revolution Will Still Create 58 Million Net New Jobs in Next Five Years:<br /><br />\n  <ul><li>\n  Latest research from the World Economic Forum forecasts that by 2025, machines will perform more current work tasks than humans, compared to 71% being performed by humans today.</li>\n  <li>\n  The rapid evolution of machines and algorithms in the workplace could create 133 million new roles in place of 75 million that will be displaced between now and 2022</li><li>\n  Urgent challenges include providing reskilling opportunities, enabling remote work and building safety nets to protect at-risk workers and communities\n  </li>\n  </ul>\n  </p>\n  <p><strong>... to which I say, <i>H.R. Managers of the World: Unite!</i></strong></p>\n  ';
  var blogcite11 = ' \n  <p class="cite">1. <a href="http://reports.weforum.org/future-of-jobs-2018/">http://reports.weforum.org/future-of-jobs-2018/</a></p>\n  \n  <p class="cite">PDF Download<br /><a href="http://www3.weforum.org/docs/WEF_Future_of_Jobs_2018.pdf">http://www3.weforum.org/docs/WEF_Future_of_Jobs_2018.pdf</a></p>\n  ';
  var blogpost10 = '<p class="firstparagraph">\n  Invisible upgrades are the true talking points of new mobile device  releases as they hint big things under the hood... Last year\'s iPhone X may have been alot of hardware show (with the X/8/8plus providing the first A.I.-dedicated chip), but 2018 augurs big things ahead and bigger muscle:\n  <p class="quote">\n  On Wednesday Apple announced that the neural engine is now significantly more powerful. Last year\u2019s debut model could crank through 600 billion operations per second. The new version can work almost 10 times faster, reaching 5 trillion operations per second. Some of that speedup may come from using smaller transistors inside the A12, with features as small as 7 nanometers.<sup>1</sup>\n  </p>\n  <p>So, just as Apple tends to future-proof its technology, this year\'s release does not disappoint the constellation of iOS developers that can take advantage of the tech, with  better battery efficiency ...</p>\n  <p class="quote">App developers can play with the power of Apple\u2019s new neural engine through Core ML, a framework the company offers to help programmers deploy machine learning on Apple devices. The company says that this allows developers to run machine learning code nine times faster than on the iPhone X, while using a tenth of the energy.<sup>1</sup>\n  </p>\n  <p>Thanks to Apple\'s commitment to A.I., the iPhone Xs,   Xs Max, and   Xr offer all the joys of smart video/camera, processing, augmented reality, --<i>and with battery <strong>savings?</strong>   Ooh L&aacute; L&aacute;!</i>\n\n  ';
  var blogcite10 = '\n  <p class="cite">1. <a href="https://www.wired.com/story/apples-latest-iphones-packed-with-ai-smarts"> https://www.wired.com/story/apples-latest-iphones-packed-with-ai-smarts</a></p>\n  ';
  var blogpost9 = '<p class="firstparagraph">International hubs of technical specializations--from haptic touchscreens to battery tech--implicates global cooperation--beyond merely rare metals and resources. \n  </p>\n  <p class="quote"> Last week, dozens of manufacturing companies testified before US Trade Representatives about how Trump\'s next round of duties against China could affect them. Some showed concerns of layoffs for American people and harm to US economic interests.<sup>1</sup>\n  </p>\n  <p>Global Tech presuppposes global trading cooperation primarily because of rare metals. But more importantly, fabrication specialties growing up in foreign <i>Research Parks</i>.  And, entreched technological specializations are a function of the depth of itemized specializations that sprout around universities and public/privately funded research parks, coupled with the technical workforce to put glass to screen.</p>\n  <p class="quote">Even if every part was made in the US, an iPhone would cost about $100 more, Kakaes concluded, assuming raw materials were still purchased on global markets.<br /><br />\n\n  The issue is not so much cost of putting an iPhone together, or even the cost per part on paper. The issue is skill, scale, expertise, and infrastructure \u2014 all of which require money, time and long-term investment. Unlike other manufacturing jobs that have migrated from the United States, Apple wouldn\u2019t be bringing them \u201Cback\u201D so much as starting from scratch. The cost would come in attempting to build a system that\u2019s never been in the US, but has been built over decades abroad.<sup>2</sup>\n  </p><p>So, at the end of the day, we can only hope that foreign tech resources along with associated human/social capital would just be left alone from economic tiffs ... Periodic table of rare metals and precious elements aside, the true gems are the diverse people!    \n  ';
  var blogcite9 = '\n  <p class="cite">1._<a href="https://markets.businessinsider.com/news/stocks/apple-stock-price-slides-trade-war-tensions-overshadow-product-launches-2018-9-1027522247">https://markets.businessinsider.com/news/stocks/apple-stock-price-slides-trade-war-tensions-overshadow-product-launches-2018-9-1027522247</a></p>\n  <p class="cite">2._<a href="https://www.vox.com/technology/2018/9/13/17851052/apple-iphone-price-china-trump-us-trade"> https://www.vox.com/technology/2018/9/13/17851052/apple-iphone-price-china-trump-us-trade</a></p>\n  ';
  var blogpost8 = '\n  <p class="firstparagraph">Vitalik Buterin, architect of Ethereum crypto-contract/currency, presented at the recent TechCrunch Disrupt! conference with no shortage of opinions on the direction of blockchain and crypto-currency/contract investments... This, after the Ethereum (WEI) declines nearly ten-fold along with Bitcoin\'s 70% drop<sup>1</sup>, along with other major crypto-currencies. </p>\n  <p>The story is less dramatic and mysterious than it is simply the natural course of market novelties\' <i>transition from Early Adapters to General Acceptance</i>: The underlying value transitions from increasing public awareness to mainstream acceptance, which requires new, ensuing <i>expectations that differ from the previous period</i>. The substance of perceived value dictates actual value. Buterin opines to Bloomberg News...\n    <p class="quote"> \n     The blockchain space is getting to the point where there\u2019s a ceiling in sight. If you talk to the average educated person at this point, they probably have heard of blockchain at least once. There isn\u2019t an opportunity for yet another 1,000-times growth in anything in the space anymore ... Growth in Bitcoin and other cryptocurrencies in the blockchain community through its first six or seven years was dependent on marketing and trying to get wider adoption. <br /><br /> \nThat strategy is getting close to hitting a dead end.  The next step will be getting people who are already interested in cryptocurrencies to be involved in a more in-depth way. "Go from just people being interested to real applications of real economic activity" [Buterin] said.  <sup>2</sup></p> \n    <img src="dist/img/diffusion.jpg" class="zoom" />\n    <p>So, the old expectations generated a very low bar to prove actual utility, whereas present-day collective knowledge demands clearer practical proof; inherently the bar is raised. And now, by technical sweat of the brow, crypto-based fintech now faces the realities of what will be needed for wide-spread use: technical solutions to scalability problems, security issues, and of course speed, availability and consistency of data transfer. Yet, now more importantly, ease-of-mainstream-use. </p>\n    <p>For example, Ethereum contract writers must learn a new language, Solidity; and Ethereum currency holders must grapple with browser-to-ledger interfaces like MetaMask, which are far from intuitive for even the most enthusiastic of early adopters!  </p>\n    <p> This concept is laid bare in sociological terms, citing Rogers and Shumacher\'s 1971 article from my Feb. 15 post: the general sociological Early Adopter theory--based on Everett M. Rogers\' Diffusion of Innovations theory, describing the timeline of the Innovation Adoption Lifecycle as fairly ordinary, or better stated, fairly historical--again repeating itself.<sup>3</sup> </p>\n    ';
  var blogcite8 = ' \n    \n    <p class="cite">1. <a href="https://markets.businessinsider.com/currencies/btc-usd"   target="_blank">https://markets.businessinsider.com/currencies/btc-usd\n    </a>\n    </p> \n    <p class="cite">2. <a href="https://www.bloomberg.com/news/articles/2018-09-08/crypto-growth-nears-ceiling-ethereum-co-founder-buterin-says?utm_campaign=socialflow-organic&utm_medium=social&cmpid=socialflow-twitter-business&utm_content=business&utm_source=twitter"   target="_blank">https://www.bloomberg.com/news/articles/2018-09-08/crypto-growth-nears-ceiling-ethereum-co-founder-buterin-says\n    </a>\n    </p>  <p class="cite">3. <a href="https://eric.ed.gov/?id=ED065999"   target="_blank">Rogers, E. M., & Shoemaker, F. F. (1971). Communication of Innovations; A Cross-Cultural Approach.\n    </a>\n    </p> \n     ';

  var blogpost7 = '<p class="firstparagraph">Crypto-Millionaires one day, Crypto-Middle-class the next.  Crypto-currencies in all forms have sustained a 9-month decline, which most could not have anticipated.  Take for instance, December 2017\'s $1500 Ether value to recent values of $185<sup>1</sup>, and Bitcoin\'s November 2017 valuation of just under $20,000 on the CoinDesk Bitcoin Price Index (BPI) down to this week\'s $6,400.  </p>\n     \n     <img src="dist/img/cryptocurrency.jpg" class="zoom" />\n     <p>The theories are multi-fold:</p>\n     <p class="quote">Some have posited that blockchain and cryptocurrency projects might be converting their ether reserves into fiat currencies to meet financial obligations. At face value, this appears plausible, as startups incur many expenses during their growth phase. If a collection of companies liquidated the cryptocurrencies\u2014mostly ether\u2014that they raised in ICOs at the same time, they could exert downward pressure on prices.<sup>2</sup></p>\n       <p>Others blame investment psychology ... </p> \n       <p class="quote">It\u2019s possible that the price decline reflects a negative feedback loop, a combination of economics and psychology. As crypto investors sell their holdings, they see that prices are falling. This could spook them into selling even more. This is somewhat like a bank run, except investors lose faith in the value of cryptocurrencies rather than the viability of a financial institution.<sup>2</sup>\n       </p>\n       <p>Others still, they blame ease-of-use and accesibility ... </p>\n       <p class="quote">Cryptocurrency investors (and especially ethereum backers) may be disappointed (paywall) by the low usage of decentralized applications (dapps) like IDEX, Bancor, and CryptoKitties. These apps run on crypto tokens, and thus generate demand for the assets.\n<br /><br />\n       But when investors visit a cryptocurrency exchange, they aren\u2019t presented with information about the daily active users on various dapps. They\u2019re generally only presented with the price of an asset and a chart of its history.<sup>2</sup>\n       </p>\n       <p>However one distributes the blame, psychological and economic explanations only fail where sociological explanations offer coherent explanations ... Look no further than my September 10th post ...\n       </p>\n       ';
  var blogcite7 = '\n    \n     <p class="cite">1. <a href="https://markets.businessinsider.com/currencies/btc-usd"   target="_blank">https://markets.businessinsider.com/currencies/btc-usd\n     </a>\n     </p> \n     <p class="cite">2. <a href="https://qz.com/1355945/why-have-cryptocurrencies-like-bitcoin-and-ethereum-fallen-so-much/"   target="_blank">https://qz.com/1355945/why-have-cryptocurrencies-like-bitcoin-and-ethereum-fallen-so-much/\n     </a>\n     </p>   <p class="cite">2. <a href="https://qz.com/1349207/wall-streets-interest-in-bitcoin-like-ices-bakkt-isnt-boosting-crypto-prices/"   target="_blank">https://qz.com/1349207/wall-streets-interest-in-bitcoin-like-ices-bakkt-isnt-boosting-crypto-prices/\n     </a>\n     </p> https://qz.com/1349207/wall-streets-interest-in-bitcoin-like-ices-bakkt-isnt-boosting-crypto-prices/\n        ';

  var blogpost6 = '\n     <p class="firstparagraph">Quantum solutions to computing needs become clearer, and specific uses for research come to light. First and foremost, quantum mechanics offer a realm of solutions that has ever eluded modern science: problem-solving algorithms that face orders of complexity of 40 to 50 orders of magnitude, i.e. Complexity<sup>50</sup> is just a tad too complex for the fast, but straight-line dumb A.I.-based solutions, which are inherent to classificatory machine-learning schema. Blockchain and Directed Acyclic Graphs are less helpful, but find their utility in the unescapably fast ability to <i>share data where data is needed</i><br /><br /></p>\n     Manipulations of the quantum realm are not at all intuitive to concepts we learn from the classical world. Less intuitive are the constraints of the data analysis. For example, the quantum metaphor of flipping two coins simultaneously means knowing the "state" of one coin if you know the other coin\'s state. The one lands on heads, and because it shares an entangled state with the other, <i>you are guaranteed to know the outcome of the second coin</i>. </p>\n     <img src="dist/img/quantumScience.jpg"  class="zoom" />\n     <p>Image credit: TechCrunch Disrupt! Day 3</p>\n     <p>Superconducting devices offer powerful tooling, yet <i>the catch is that the time you have to run calculations is approximately 50 micro-seconds</i>, i.e. the <strong>coherence time of entangled, superposed state</strong>. (a marked improvement from 1990\'s hardware that yielded coherence time of 1 nano-second). Not exactly enough time to run a long program, especially if you consider just one small algorithm is a series of logical gates that depend sequentially on other logical gates..., let alone an actual program. So then what\'s the use? The specific uses in academic research are without limit for those problems that present specific, exponential complexity--many cases in biotech, chemistry, and so on. Quantum computing offers a \'burst\' of calculations, and nothing more, at least for now. </p>\n     <img src="dist/img/quant-python.jpg" class="zoom" />\n     <img src="dist/img/quant-python2.jpg" class="zoom" />\n     <p>This short python-language program demonstrates quantum manipulation to machine-learning classification distinguishing a dog from a cat</p>\n     <p>Image credit: TechCrunch Disrupt! Day 3</p>\n     \n     <p>Not to be underestimated, quantum calculations operate best when modeling the laws of nature--because nature obeys quantum mechanical rules, beginning with chemistry. After all, quantum analysis simulated the largest molecule last year--and that\'s no small matter!  </p>\n       ';
  var blogcite6 = ' \n       <p class="cite">  TechCrunch Disrupt! Day 3 \n       </p>\n        ';
  var blogpost5 = '\n  <p class="firstparagraph">Machine learning\'s hey-day not only blossoms, but overtakes many areas of computing solutions if anything else but for the sheer ease of unloading mundane computing tasks. But the most widespread problem is that of non-A.I., non-machine-learning that masquerade as A.I., but are only complex looping algorithms. Much ado about nothing has been the death-knell for more than a few of the Startup Battlefield\'s contenders. <i>Disrupt\'s merciless premises abruptly dash dreams, but I guess that\'s what a public and publicized forum for Peer Review is all about!</i><br /> <br />... to be continued. </p> \n    ';
  var blogcite5 = ' \n    <p class="cite">   TechCrunch Disrupt! Day 3 \n    </p>\n     ';
  var blogpost4 = '<p class="firstparagraph"><br /> <br />  </p>\n  <p class="quote"> <sup>1</sup></p>\n  <p> </p> ';
  var blogcite4 = '\n  <p class="cite">  <a href=""   target="_blank">\n  </a>\n  </p>\n     ';
  var blogpost3 = '<p class="firstparagraph">Browser URLs are the constant of the web\'s evolutions over the years. After all, they are the solid, predictable workhorse for transporting web surfers\' requests and web servers\' responses. But could there be improvements even with this, beyond the HTTPS\' security upgrade? Wired reports: </p>\n  <p class="quote">Chrome looks ahead to its next 10 years, the team is mulling its most controversial initiative yet: fundamentally rethinking URLs across the web.\n<br /><br />\n  Uniform Resource Locators are the familiar web addresses you use every day. They are listed in the web\'s DNS address book and direct browsers to the right Internet Protocol addresses that identify and differentiate web servers. <br /><br />\n  As web functionality has expanded, URLs have increasingly become unintelligible strings of gibberish combining components from third-parties or being masked by link shorteners and redirect schemes. And on mobile devices there isn\'t room to display much of a URL at all.  The resulting opacity has been a boon for cyber criminals who build malicious sites to exploit the confusion.\n  <br /><br />\n  The focus right now, they say, is on identifying all the ways people use URLs to try to find an alternative that will enhance security and identity integrity on the web while also adding convenience for everyday tasks like sharing links on mobile devices.<sup>1</sup></p>\n  <p>Bring it on, Google, and save us from the increasing flood of &;@# ampersands &% and excessive #_&% URL parameters that grow longer and longer ... and longer ... but how?</p> ';
  var blogcite3 = '\n  <p class="cite">1 <a href="https://www.wired.com/story/google-wants-to-kill-the-url/"   target="_blank">https://www.wired.com/story/google-wants-to-kill-the-url/\n  </a>\n  </p>\n  ';
  var blogpost2 = '<p class="firstparagraph"> </p>\n  <p class="quote"> <sup>1</sup></p>\n  <p> </p>';
  var blogcite2 = '\n  <p class="cite"> <a href=""   target="_blank">\n  </a>\n  </p>\n  ';

  var blogpost1 = '<p class="quote"><i>At first the computer drew a blank; seconds later, it decided it was dealing with another car, expecting it to drive away and require no special action. Only at the last second was a clear identification found \u2013 a woman with a bike, shopping bags hanging confusingly from handlebars, doubtless assuming the Volvo would route around her as any ordinary vehicle would. Barred from taking evasive action on its own, the computer abruptly handed control back to its human master, but the master wasn\u2019t paying attention. Elaine Herzberg, aged 49, was struck and killed, leaving more reflective members of the tech community with two uncomfortable questions: was this algorithmic tragedy inevitable? And how used to such incidents would we, should we, be prepared to get?</i><sup>1 </sup></p>\n  <p class="firstparagraph">Mistakes in code are a given. But not inevitable, with less haste, more testing, and more corrective reduncencies. This however is not the trend:</p>\n  <p class="quote">\u201CIn some ways we\u2019ve lost agency. When programs pass into code and code passes into algorithms and then algorithms start to create new algorithms, it gets farther and farther from human agency. Software is released into a code universe which no one can fully understand.\u201D<sup> </sup></p>\n  <p></p>\n    ';
  var blogcite1 = '\n  <p class="cite">  <a href="https://www.theguardian.com/technology/2018/aug/29/coding-algorithms-frankenalgos-program-danger"   target="_blank">https://www.theguardian.com/technology/2018/aug/29/coding-algorithms-frankenalgos-program-danger\n  </a>\n  </p>\n    ';

  var url = [{
    id: '25',
    did: '9-29-18',
    date: 'September 29th, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Real-Time, 21st Web-Apps\'s',
    post: blogpost25,
    blogcite: blogcite25
  }, {
    id: '24',
    did: '9-28-18',
    date: 'September 28th, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Open Source Democracy: Part II <br />Data Visualization for All',
    post: blogpost24,
    blogcite: blogcite24
  }, {
    id: '23',
    did: '9-27-18',
    date: 'September 27th, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Open Source Democracy: Part I <br />The Primacy of the Jupyter Notebook',
    post: blogpost23,
    blogcite: blogcite23
  }, {
    id: "20",
    did: "09-24-18",
    date: "September 24, 2018",
    author: "Thomas Maestas",
    cat3: "A.I.Now.",
    title: "Sociology Tomorrow!",
    post: blogpost20,
    blogcite: blogcite20
  }, {
    id: "19",
    did: "09-22-18",
    date: "September 22-23, 2018 ",
    author: "Thomas Maestas",
    cat3: "A.I.Now.",
    title: "A.I. Personalities: Techanthropormorphism Misgivings",
    post: blogpost19,
    blogcite: blogcite19
  }, {
    id: '18',
    did: '09-21-18',
    date: 'September 21, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'On the Other Side of the Coin: Part IV<br />Democratized Markets',
    post: blogpost18,
    blogcite: blogcite18
  }, {
    id: '17',
    did: '09-20-18',
    date: 'September 20, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'On the Other Side of the Coin: Part III<br />The Long, Resurgent Road Forward',
    post: blogpost17,
    blogcite: blogcite17
  }, {
    id: '16',
    did: '09-19-18',
    date: 'September 19, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'On the Other Side of the Coin: Part II<br />Altering Crypto-Market States from Technology Advancements Help Determine the Wide Crypto-Currency Variances between Ripple Coin, Bitcoin, and Ethereum',
    post: blogpost16,
    blogcite: blogcite16
  }, {
    id: '15',
    did: '09-18-18',
    date: 'September 18, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'On the Other Side of the Coin: Part I<br />SEC Concerns About the Top Three Crypto-Currencies',
    post: blogpost15,
    blogcite: blogcite15
  }, {
    id: '14',
    did: '09-17-18',
    date: 'September 17, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Den Haague Security',
    post: blogpost14,
    blogcite: blogcite14
  }, {
    id: '13',
    did: '09-15-18',
    date: 'September 15-16, 2018<br />Weekend',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'The End of Traffic Jams, Part II: <br />A Car-Free Paris',
    post: blogpost13,
    blogcite: blogcite13
  }, {
    id: '12',
    did: '09-14-18',
    date: 'September 14, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'The End of Traffic Jams, Part I: <br />A Green Los Angeles',
    post: blogpost12,
    blogcite: blogcite12
  }, {
    id: '11',
    did: '09-13-18',
    date: 'September 13, 2018',
    author: ' ',
    cat3: ' ',
    title: ' ',
    post: blogpost11,
    blogcite: blogcite11
  }, {
    id: '10',
    did: '09-12-18',
    date: 'September 12, 2018',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now.',
    title: 'Apple\'s New A12 Chip with A.I. Neural Engine:<br /> Ooh L&aacute; L&aacute;!',
    post: blogpost10,
    blogcite: blogcite10
  }, {
    id: '9',
    did: '09-11-18',
    date: 'September 11, 2018',
    author: 'Thomas Maestas',
    cat3: ' ',
    title: ' ',
    post: blogpost9,
    blogcite: blogcite9
  }, {
    id: '8',
    did: '09-10-18',
    date: 'September 10, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Where Did All the Crypto-Cash Go? Part II:<br />Expectations of Speculation',
    post: blogpost8,
    blogcite: blogcite8
  }, {
    id: '7',
    did: '09-08-18',
    date: 'September 8-9, 2018<br />Weekend',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'Where Did All the Crypto-Cash Go? Part I:<br />Why the Long Crash ...',
    post: blogpost7,
    blogcite: blogcite7
  }, {
    id: '6',
    did: '09-07-18',
    date: 'September 7, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Quantum Data',
    title: 'Reports from TechCrunch Disrupt! Part III<br />Quanta',
    post: blogpost6,
    blogcite: blogcite6
  }, {
    id: '5',
    did: '09-06-18',
    date: 'September 6, 2018',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now',
    title: 'Reports from TechCrunch Disrupt! Part II<br />Artificial Intelligence',
    post: blogpost5,
    blogcite: blogcite5
  }, {
    id: '4',
    did: '09-05-18',
    date: 'September 5, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'Reports from TechCrunch Disrupt! Part I<br />Blockchain',
    post: blogpost4,
    blogcite: blogcite4
  }, {
    id: '3',
    did: '09-04-18',
    date: 'September 4, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'The Cumbersome, Multipurpose and Sometimes Unsecure URL ...<br />Is There a Better way?',
    post: blogpost3,
    blogcite: blogcite3
  }, {
    id: '2',
    did: '09-03-18',
    date: 'September 3, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: '',
    post: blogpost2,
    blogcite: blogcite2
  }, {
    id: '1',
    did: '09-01-18',
    date: 'September 1-2, 2018<br />Weekend',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Mistaken identities',
    post: blogpost1,
    blogcite: blogcite1
  }];

  for (i = 0; i < url.length; i++) {
    var cat = ' \n    <div id="' + url[i].did + '" class="blogDiv"> \n    <hr />  \n    <a href="#top"><button>Top</button></a>  \n    <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n    <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5> \n    <p id="author" class="  author">' + url[i].author + '</p>   \n    <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n    <h6  id="title"   class="dailytitle chapternumber">' + url[i].title + '</h6>\n    <br />\n    <div id="post">' + url[i].post + '\n    </div>\n    <div id="blogcite">' + url[i].blogcite + '\n    </div>';
    document.getElementById("paragraph-sep").innerHTML += cat;
  }

  var i;
  for (i = 0; i < url.length; i++) {
    var catMod = '\n  <div id="mod_' + url[i].did + '" class="blogDivMod"> \n  <hr />  \n  <a href="#top-mod"><button>Top</button></a>   \n  <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n  <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5>  \n  <p id="author" class="  author">' + url[i].author + '</p>   \n  <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n  <h6  id="title"   class="dailytitle cha-pternumber">' + url[i].title + '</h6>\n  <br />\n  <div id="post">' + url[i].post + '</div>\n  </div>\n <div id="blogcite">' + url[i].blogcite + '\n </div>';
    document.getElementById("paragraph-sep-mod").innerHTML += catMod;
  }

  // console.log('blogger-sep'); 
  // console.log(angular.toJson(url));
};
bloggerSep();

/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bloggerAug = function bloggerAug() {
  var blogpost22 = '<p class="firstparagraph">Quantum computing, now readily available for science-venturing public consumption: IBM\'s Quantum Community and Resources offer cloud access to quantum hardware:\n  </p>\n  <p class="quote">Check out our User Guides and interactive Demos to learn more about quantum principles. Or, dive right in to create and run algorithms on real quantum computing hardware, using the Quantum Composer and QISKit software developer kit.<sup>1</sup></p>\n  <p>With an uncanny resemblence to 21st century chandeliers, the hardware itself is no light matter: Each successive layer cools down to    final chamber that runs at a cool .0017&deg; Kelvin--colder than space!\n  </p>\n  ';
  var blogcite22 = '<p class="cite">1. <a   href="https://quantumexperience.ng.bluemix.net/qx/experience"   target="_blank">https://quantumexperience.ng.bluemix.net/qx/experience\n  </a>\n  </p>';

  var blogpost21 = ' \n  <p class="quote">The Lamborghini Aventador SVJ already made a splash last month when it set a new N\xFCrburgring Nordschleife record for production cars, running an incredible 6:44.97 lap time. Now, it sheds its camouflage, and yep, it looks exactly as crazy as we hoped. This might be one of the wildest Lamborghinis yet.<br /><br />\n  Since we\'ve tackled the SVJ\'s N\xFCrburgring lap time, let\'s cover some other numbers. Its 6.5-liter V12 produces 770 horsepower, making this one of the most powerful naturally aspirated road cars of all time. Maximum torque is 531 lb-ft at 6750 rpm, while the power peak comes at 8500 rpm. Lamborghini claims a dry weight of 3362 lbs, which is 110 lbs lighter than an Aventador S coupe according to the factory. Acceleration is jaw-dropping, too, with 62 mph arriving in 2.8 seconds and 124 mph coming in 8.6. Top speed is 217 mph.<sup>1</sup></p>\n  <img src="dist/img/aventador.jpg" width="350" class="zoom"  /><br />\n  <p>Image credit: Road &amp; Track</p>\n \n    ';
  var blogcite21 = '   <p class="cite">1. <a   href="https://www.roadandtrack.com/car-shows/monterey-car-week/a22822020/2019-lamborghini-aventador-svj-debut-specs-photos-price/"   target="_blank">https://www.roadandtrack.com/car-shows/monterey-car-week/a22822020/2019-lamborghini-aventador-svj-debut-specs-photos-price/\n    </a></p> \n    ';
  var blogpost20 = '<p class="firstparagraph">Security patches that couldn\'t have arrived sooner ... </p><p class="quote">The Fortnite Installer was easily exploitable to hijack the request to download the full game.      The problem, as Google\'s security team discovered, was that the Fortnite Installer was very easily exploitable to hijack the request to download Fortnite from Epic and instead download anything when you tap the button to download the game. It\'s what\'s known as a "man-in-the-disk" attack: an app on your phone looks for requests to download something from the internet and intercepts that request to download something else instead, unbeknownst to the original downloading app.<br /><br />Here\'s where things get really bad. Because of the way Android\'s permissions model works, you won\'t have to accept installation of an app from "unknown sources" beyond the time you accepted that installation for Fortnite.<sup>1</sup> </p>\n       \n      ';
  var blogcite20 = '   <p class="cite">1. <a   href="https://www.androidcentral.com/epic-games-first-fortnite-installer-allowed-hackers-download-install-silently"   target="_blank"> \n    https://www.androidcentral.com/epic-games-first-fortnite-installer-allowed-hackers-download-install-silently </a></p> \n      ';
  var blogpost19 = '<p class="firstparagraph">Quantum leap from traditional electromagnetic on/off bits (eight bits per byte) is intuitive to the binary qubit, and yet the the superposition third option is less evident: Rather, our observation of the <i>superposition depends on the <strong>probability</i> that, when observed, the value will be affirmative or negative. Better explained by Wired ...</p>\n  <p class="quote">\nComputers do calculations using bits, too. After all, we want them to plug into our existing data and computers. But quantum bits, or qubits, have unique and powerful properties that allow a group of them to do much more than an equivalent number of conventional bits.\n\nQubits can be built in various ways, but they all represent digital 0s and 1s using the quantum properties of something that can be controlled electronically. Popular examples\u2014at least among a very select slice of humanity\u2014include superconducting circuits, or individual atoms levitated inside electromagnetic fields. The magic power of quantum computing is that this arrangement lets qubits do more than just flip between 0 and 1. Treat them right and they can flip into a mysterious extra mode called a superposition.<sup>1</sup>\n</p> \n<p class="quote">For some problems that are very time consuming for conventional computers, this allows a quantum computer to find a solution in far fewer steps than a conventional computer would need. Grover\u2019s algorithm, a famous quantum search algorithm, could find you in a phone book with 100 million names with just 10,000 operations. If a classical search algorithm just spooled through all the listings to find you, it would require 50 million operations, on average.<sup>1</sup> </p>\n        \n        ';
  var blogcite19 = ' <p class="cite">1.  <a   href="https://www.wired.com/story/wired-guide-to-quantum-computing/"   target="_blank">https://www.wired.com/story/wired-guide-to-quantum-computing/\n      </a></p>     ';

  var blogpost18 = '<p class="firstparagraph">Quantum research has finally progressed beyond proof-of-concept to practical utility. First photon state transfer, and now solid state transfer of "entangled states" allowing for binary, instant data transfer. Beyond medical and enterprise use, quantum entanglement\'s incremental progress now raises a few eyebrows: \n    </p>\n   <p class="quote">That\u2019s because Google, IBM, and others have decided it\u2019s time to invest heavily in the technology, which, in turn, has helped quantum computing earn a bullet point on the corporate strategy PowerPoint slides of big companies in areas such as finance, like JPMorgan, and aerospace, like Airbus. In 2017, venture investors plowed $241 million into startups working on quantum computing hardware or software worldwide, according to CB Insights. That\u2019s triple the amount in the previous year. <sup>1</sup></p>\n  \n<p>   The cause for excitement accelerates at the pace of progress on the technical engineering side:\n   </p>\n<p class="quote">Physicists have experimentally demonstrated 18-qubit entanglement, which is the largest entangled state achieved so far with individual control of each qubit. As each qubit has two possible values, the 18 qubits can generate a total of 218 (or 262,144) combinations of output states. Since quantum information can be encoded in these states, the results have potential applications anywhere quantum information processing is used.\n .<sup>2</sup></p>\n   <p>So, while there are algorithms, like <i>Shor\'s SHA-defeating algorithm, that have only existed in theory, can now be applied using capable computational power for the job.</i>\n </p> \n   ';
  var blogcite18 = '  <p class="cite">1.  <a   href="https://www.wired.com/story/wired-guide-to-quantum-computing/"   target="_blank">https://www.wired.com/story/wired-guide-to-quantum-computing/\n   </a></p> \n   \n   <p class="cite">2. <a   href="https://phys.org/news/2018-07-qubit-entanglement.html"   target="_blank">https://phys.org/news/2018-07-qubit-entanglement.html\n   </a></p>  \n   ';

  var blogpost17 = '<p class="firstparagraph">Silicon Valley\'s tide has rolled in and the ships are tucked away for the night. At dawn, Silicon Valley arises and inherits the kingdom, along with Seattle: And, so   become <i> the intractable data needs of all institutions, public or private, big and small--needs only the cloud can answer.</i> </p>\n    <p>And why not? Cloud data storage offers security, direct service providers with big data jobs, Netflix and Linkedin\'s extensive real-time network analsyis using Kafka speeds up their ever-ready recommendations.  Reuters shows a glimpse of the Pentagon\'s (and other nations\'s) accelerating need to secure data as the intertwining networks of world data migrates to distributed, cloud storage. In this domain, public infrastructure, whether platform-as-a-service or servers, technology -- as usual -- must swoop to save the day. </p>\n\n    <p class="quote">Consultants associated with the $927 billion Seattle juggernaut occupied top positions at the Pentagon ahead of the rollout of a massive cloud contract worth some $10 billion that Amazon looks poised to snag. Rivals complain the requirements were written to favor Bezos\u2019s company. Either way, investors should be prepared for its government business to attract greater scrutiny.<sup>1</sup> \n    </p>\n    <p>Surely controversy awaits any bid decision down here on earth, but all things that go up to the cloud need not come down.</p>\n    ';
  var blogcite17 = '   <p class="cite">1. <a   href="https://www.reuters.com/article/uk-usa-pentagon-breakingviews/breakingviews-amazon-pentagon-ties-may-receive-greater-scrutiny-idUSKBN1L10AS"   target="_blank">https://www.reuters.com/article/uk-usa-pentagon-breakingviews/breakingviews-amazon-pentagon-ties-may-receive-greater-scrutiny-idUSKBN1L10AS\n    </a></p> \n    ';

  var blogpost16 = '<p class="firstparagraph">Einstein\'s remark on quantum entanglement\'s \'spooky\' characteristics holds for those caught off-guard, but sudden isn\'t spooky when sudden is expected. Tokyo\'s first photon to satellite back to earth with a button switch control almost leads to banality. Yet, transmitting data through a shared quantum state from the first party to second party appears intuitive, even if it is   other-worldly. Wired Magazine:  </p>\n    <p class="quote">You may have heard that a qubit in superposition is both 0 and 1 at the same time. That\u2019s not quite true and also not quite false\u2014there\u2019s just no equivalent in Homo sapiens\u2019 humdrum classical reality. If you have a yearning to truly grok it, you must make a mathematical odyssey WIRED cannot equip you for. But in the simplified and dare we say perfect world of this explainer, the important thing to know is that the math of a superposition describes the probability of discovering either a 0 or 1 when a qubit is read out\u2014an operation that crashes it out of a quantum superposition into classical reality.<sup>1</sup>  \n    </p>\n    <p>Yale researchers on the topic:</p>\n    <p class="quote">\n    In a quantum process known as teleportation the unknown state of a quantum bit can be relayed to a distant party using shared entanglement and classical information. Here we present experiments in a solid-state system based on superconducting quantum circuits demonstrating the teleportation of the state of a qubit at the macroscopic scale. In our experiments teleportation is realized deterministically with high efficiency and achieves a high rate of transferred qubit states. This constitutes a significant step towards the realization of repeaters for quantum communication at microwave frequencies and broadens the tool set for quantum information processing with superconducting circuits. </i><sup>2</sup></p>\n    ';
  var blogcite16 = '<p class="cite">1. <a href="https://www.wired.com/story/wired-guide-to-quantum-computing/"   target="_blank">https://www.wired.com/story/wired-guide-to-quantum-computing/\n    </a></p>\n    <p class="cite">2. <a href="https://seas.yale.edu/news-events/news/quantum-technology-chip"   target="_blank">https://seas.yale.edu/news-events/news/quantum-technology-chip\n    </a></p>';

  var blogpost15 = '\n    <p class="firstparagraph">Quantum communication of data offers instant data transfer, and impenatrability from 3rd parties ... Among the exciting on events on New Haven\'s public space Green Park, Yale researchers\' quantum advances steal the headlines: </p>\n    <p class="quote">The two essential requirements for a scalable quantum information processor are quantum interference (in which a photon \u2013 able to be in more than one place at a time \u2013 crosses its own path) and single-photon detectors. The chip that the researchers designed contains a nanophotonic waveguide, which can guide light into small spaces and to wherever is needed on the chip. It also has a directional coupler that can split a light beam into two identical beams, or conversely, combine two beams into one output.\n    <br /><br />\n    With this research, Schuck said the research team should eventually realize a programmable optical quantum processor that can run a quantum algorithm. The scalability of the nanofabrication routines for silicon chips will then allow them to solve problems difficult for classical computers.<sup>1</sup></p>\n    <p>Besides the quantum characteristic of a third party\'s observation/interference, the state is broken and data transfer disappears--and, yet another state is but a button flip\'s switch away!</p> ';
  var blogcite15 = '\n    </p>\n    <p class="cite">1. <a href="https://arxiv.org/abs/1302.5621"   target="_blank">https://arxiv.org/abs/1302.5621\n    </p>\n    <p class="cite">1. <a href="https://www.nature.com/articles/ncomms10352"   target="_blank">https://www.nature.com/articles/ncomms10352\n    </a>\n    </p>\n    \n    ';
  var blogpost14 = '<p class="firstparagraph">      </p>\n    <p class="quote">   </p> \n    ';
  var blogcite14 = ' \n    <p class="cite">1. <a href="https://www.zdnet.com/article/how-brand-new-science-will-manage-the-fourth-industrial-revolution/"   target="_blank">https://www.zdnet.com/article/how-brand-new-science-will-manage-the-fourth-industrial-revolution/\n    </a>\n    </p>\n    <p class="cite">1. <a href="https://scitechdaily.com/physicists-teleport-information-in-a-solid-state-system/amp/"   target="_blank">https://scitechdaily.com/physicists-teleport-information-in-a-solid-state-system/amp/\n    </a>\n    </p>\n    ';
  var blogpost13 = '<p class="firstparagraph"> \n</p><p class="quote"> \n<p >\u201CHistorically, magnetism and superconductivity were very disparate fields of physics,\u201D Birge said. \u201CThe 1960s\u2019 point of view was that if you were to bring a ferromagnet near a superconductor, you would kill the conductivity.<br /><br />\n\u201CIt was found that you can put a ferromagnet near a superconductor; in fact, you can even make a \u2018sandwich\u2019\u2014superconductor, ferromagnet, superconductor,\u201D said Joseph Glick, a former doctorate student in Birge\u2019s lab and the paper\u2019s lead author. \u201CAny sandwich of this type is called a Josephson junction, which is at the heart of everything we are doing.<sup>1</sup> </p> \n';
  var blogcite13 = '  \n<p class="cite">1. <a href="https://msutoday.msu.edu/news/2018/msu-physicists-solve-a-storied-problem/"   target="_blank">https://msutoday.msu.edu/news/2018/msu-physicists-solve-a-storied-problem/\n</a>\n</p>\n';
  var blogpost12 = '<p class="firstparagraph">      </p>\n    <p class="quote"> <sup> </sup>\n    </p><br />    <p > </p>';
  var blogcite12 = '<p class="cite">  <a href="https://www.nature.com/articles/ncomms10352"   target="_blank">https://www.nature.com/articles/ncomms10352\n    </a>\n    </p>';
  var blogpost11 = '<p class="firstparagraph">Marvels of anomaly detection extend from business and state security to software integriy -- why not extend the use to <i>social integrity traced by network interaction signatures ...</i> \n    </p>\n    <p class="quote">While some attempts to detect social-media accounts of malicious actors rely on content or language filters that terrorists and disinformers have proved capable of confusing, Mr. Alvari\u2019s algorithm looks for accounts that spread content further and faster than expected. Since this is the goal of terrorist recruiters and propagandists alike, the method could be on the front lines of algorithmic filtering across social networks. Humans still need to make the final determination, to avoid false positives. <sup>1</sup>\n    </p>\n    <p class="quote">While some attempts to detect social-media accounts of malicious actors rely on content or language filters that terrorists and disinformers have proved capable of confusing, Mr. Alvari\u2019s algorithm looks for accounts that spread content further and fas                                                                                                         ter than expected. Since this is the goal of terrorist recruiters and propagandists alike, the method could be on the front lines of algorithmic filtering across social networks. Humans still need to make the final determination, to avoid false positives. <sup>1</sup>\n    </p><br />  \n    <p > </p>.\n ';
  var blogcite11 = ' \n    <p class="cite">1. <a href="https://www.wsj.com/articles/bots-vs-trolls-how-ai-could-clean-up-social-media-1533849001?mod=djemCIO_h"   target="_blank">https://www.wsj.com/articles/bots-vs-trolls-how-ai-could-clean-up-social-media-1533849001?mod=djemCIO_h\n    </a>\n    </p>';

  var blogpost10 = '<p class="firstparagraph"> \n    </p>\n    <p class="quote">Machines used to be serviced according to a plan, and late maintenance would mean a risk of production downtime. Today, process data from machines is used for predicting remaining service life. Especially critical parameters such as temperature, noise, and vibration are recorded to help determine the optimal operating state or even necessary maintenance times. This allows unnecessary wear to be avoided and possible faults and their causes to be detected early on. With the help of this monitoring, considerable optimization potential in terms of facility availability and effectiveness arises, bringing with it decisive advantages.\n\n    The main element in this predictive maintenance (PM) is condition-based monitoring (CBM)\n\n    Addressing Sensor Challenges and Demands for Future Servicing<sup>1</sup>\n    </p><br />\n    <img src="dist/img/mechDegrade.jpg" width="350px" class="zoom" /><br />\n    <p > </p>';
  var blogcite10 = ' \n    <p class="cite">1. <a href="https://www.sensorsmag.com/components/addressing-sensor-challenges-and-demands-for-future-servicing"   target="_blank">https://www.sensorsmag.com/components/addressing-sensor-challenges-and-demands-for-future-servicing\n    </a>\n    </p>';

  var blogpost9 = '<p class="firstparagraph"> \n    </p>\n    <p class="quote">. Arrays of SQUIDs (superconducting quantum interference devices) are currently the most common magnetometer, while the SERF (spin exchange relaxation-free) magnetometer is being investigated for future machines.<sup>1</sup>\n    </p><br /> \n    <p > </p>.\n ';
  var blogcite9 = '  \n    <p class="cite">1. <a href="https://www.xlstat.com/en/solutions/features/classification-and-regression-trees"   target="_blank">https://www.xlstat.com/en/solutions/features/classification-and-regression-trees\n    </a>\n    </p>';

  var blogpost8 = '<p class="firstparagraph">Classification and Regression (Decision) Trees are not just accurate, multipurpose and foundational to predictive machine learning algorithms (e.g. random forests, bayesian trees, bagging), but the trees\' final product reveals the different rationale for the output. Printed onto a sheet   of paper, both statistical practitioner and the domain professional intuitively and heuristically understand practical use for an analysis. This July 2017 Cancer study exemplifies the utility of healthcare-based algorithms of analysis ... \n    </p>\n    <p class="quote">The aim of this study was to develop and validate a clinical predictive model for 1-year mortality among patients with colon cancer who survive for at least 30 days after surgery.<br /><br />Random forest, genetic algorithms and classification and regression trees were combined in order to identify the variables and partition points that optimally classify patients by risk of mortality. The resulting decision tree was categorized into four risk categories. Split-sample and bootstrap validation were performed.<sup>1</sup>\n    </p><br />\n    <img src="dist/img/irisCART.jpg" width="350px" class="zoom" /><br />\n    <p >And, now that sound methodology meets an increasingly user-friendly Machine Learning software toolset for wider practical applications, beginning firstly within healthcare technologies <i>and that second opinion!</i></p>.\n ';
  var blogcite8 = 'Image credits: https://www.xlstat.com/en/solutions/features/classification-and-regression-trees\n    <p class="cite">1. <a href="https://www.dovepress.com/combining-statistical-techniques-to-predict-postsurgical-risk-of-1-yea-peer-reviewed-article-CLEP#"   target="_blank">https://www.dovepress.com/combining-statistical-techniques-to-predict-postsurgical-risk-of-1-yea-peer-reviewed-article-CLEP#\n    </a>\n    </p>';

  var blogpost7 = '<p class="firstparagraph">Predictive analytics  has slowly progressed in sophistication over the past 45 years, and the current nexus with powerful machine-learning tools changes the health game: </p>\n    <p class="quote"> A report by ABI Research June 2018 report highlighted a significant rise in patient monitoring devices, including AI for home-based preventative healthcare and predictive analytics, which could save hospitals around $52bn by 2021.<br /><br />\n\n    Accenture\u2019s Digital Health Technology Vision 2018 report also claims that 85% of health executives in the US believe that every human will be directly impacted on a daily basis by an AI-based decision within the next three years.<br /><br />\n    \n    Utilising big data generated by clinical information and research can reveal clusters and patterns which can benefit all aspects of healthcare, leading patient care to become increasingly strategic.<sup>1</sup>  </p>\n    <p>It should be noted that the long road paved by statistical theory has revolutionized the above-mentioned fields as much as it now powers the practical use of analytics:</p>\n    <p class="quote">Originating in the statistical (e.g., Holland\n      1986; Rosenbaum 2002; Rubin 2005, 2006) and\n      econometrics literature (see Heckman 2000,\n      2001, 2005; Heckman & Vytlacil 2007a,b;\n      Manski 1995, 2007), the counterfactual,\n      Rubin, or potential outcomes model of causality\n      has, over the past three decades, become\n      the standard conceptual tool to unify the notion\n      of causality, to understand the identification\n      problem at the heart of causal inference,\n      and to assess the utility of alternative estimation\n      techniques (Sobel 2005).<sup>2</sup></p>\n      <p>So, the take-away here is that A.I. and <i>Machine-Learning Research could have never progressed so quickly if not for the settled scientic paradigm over sound analysis that rules out spurious variables, while properly weighting the conditions that matter.</i> Furthermore, the mistakes in algorithm design were made in the 1970\'s, 1980\'s, and 1990\'s--misleading mistakes--have been swept aside, providing much-tested and refined strategies. The medical field\'s case exemplifies this evolution:</p>\n    <p class="quote">Randomized controlled trials are considered the gold\n    standard for assessing the efficacy of medications, medical\n    procedures, or clinical strategies. Nevertheless, particularly\n    for research on the prevention of chronic disease, randomized\n    trials are often infeasible because of their size, time,\n    and budget requirements, as well as questionable generalizability\n    or ethical constraints.<br /><br />\n    On the other hand, nonexperimental studies of interventions\n    have frequently been criticized because of their potential\n    for selection bias. This concern reached a crescendo\n    with the disparity in estimated effects of hormone replacement\n    therapy from randomized trials and nonexperimental\n    studies. This imbroglio highlighted the need to develop\n    and apply improved methods to reduce bias in nonexperimental\n    studies in which selection bias or confounding is\n    likely to occur .<sup>3</sup></p>\n    <p>So, nowadays we don\'t ask for a second opinion when we can ask for a trillion opinions narrowed down to one heck of a second opinion!</p>';
  var blogcite7 = '\n    <p class="cite">1. <a href="https://www.healthcareglobal.com/technology/ai-seen-less-threat-and-welcomed-health-professionals-research-reveals"   target="_blank">https://www.healthcareglobal.com/technology/ai-seen-less-threat-and-welcomed-health-professionals-research-reveals\n    </a>\n    </p>\n    <p class="cite">2. <a href="https://www.annualreviews.org/doi/abs/10.1146/annurev.soc.012809.102702"   target="_blank">https://www.annualreviews.org/doi/abs/10.1146/annurev.soc.012809.102702\n    </a>\n    </p>    <p class="cite">3. <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1448214/"   target="_blank">https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1448214/\n    </a>\n    </p>';

  var blogpost6 = '<p class="quote">  <i>[Intel\'s]  i9-8950HK processor is the first mobile Intel processor with six cores and 12 threads. It comes fully unlocked. It has the new Intel thermal Velocity Boost, which automatically increases clock frequency up to 200 MHz if the processor temperature is low enough and there\'s enough turbo power, giving a turbo frequency of up to 4.8 GHz.</i></p>\n    <p class="quote" The i9-8950HK processor is the first mobile Intel processor with six cores and 12 threads. It comes fully unlocked. It has the new Intel thermal Velocity Boost, which automatically increases clock frequency up to 200 MHz if the processor temperature is low enough and there\'s enough turbo power, giving a turbo frequency of up to 4.8 GHz.</i>\n    </p>\n    <p class="firstparagraph"> Needs shape our inventions and our inventions shape our needs: With the brand new set of mobile computing requirements serve up utility for the i9.  Intel\'s advances pale in comparison, however, to GPU and newer computing trends. This theme arises time after time in my posts, but mathematics will rewrite the rules of performance . . .</p>\n    <p class="quote">The 8th Gen processors incorporate Intel Octane memory, a smart and adaptable system accelerator for desktop and mobile platforms using SATA-based storage technology.<br /><br />\n\n    Intel also has released a new Data Drive Acceleration feature that boosts a large secondary HDD hard drive.\n    \n    Together, Intel Octane and Data Drive Acceleration provide up to 4.7x the game loading speed and 1.7x faster media loading, Intel said.\n     </p>\n    <p class="quote">\n    The actual task of processing AI is a very different process from standard computing or GPU processing, hence the perceived need for specialized chips. A x86 CPU can do AI, but it does a task in 12 steps when only three are required; a GPU in some cases can also be overkill.\n    <br /><br />\n    Generally, scientific computation is done in a deterministic fashion. You want to know two plus three equals five and calculate it to all of its decimal places\u2014x86 and GPU do that just fine. But the nature of AI is to say 2.5 + 3.5 is observed to be six almost all of the time without actually running the calculation. What matters with artificial intelligence today is the pattern found in the data, not the deterministic calculation. \n    <br /><br />\nThe result of this predictive problem solving is that AI calculations can be done with single precision calculations. So while CPUs and GPUs can both do it very well, they are in fact overkill for the task. A single-precision chip can do the work and do it in a much smaller, lower power footprint.</p>\n\n<p class="quote">Intel "can deliver on CPU functionality, which has dropped in performance, but still lags on GPUs and modems," noted Rob Enderle, principal analyst at the Enderle Group.\n\n"Much of the performance these days is gated by the modem and the GPU, not the CPU, which just isn\'t as importance as it once was," he told TechNewsWorld.\n\nDevelopers may not benefit much from the new processors, Enderle said, because "with IDF shut down, Intel\'s developer efforts are largely moot."\n</p> ';

  var blogcite6 = ' \n    <p class="cite">1. <a href="https://www.technewsworld.com/story/85252.html"   target="_blank">https://www.technewsworld.com/story/85252.html\n    </a>\n    </p>\n    \n    <p class="cite">2. <a href="https://www.cnet.com/news/intel-core-i9-9900k-may-boost-to-5ghz/"   target="_blank">https://www.cnet.com/news/intel-core-i9-9900k-may-boost-to-5ghz/\n    </a>\n    </p>\n     ';
  var blogpost5 = '<p class="firstparagraph">Batteries optimized by machine learning is a feature in the latest version of Android OS, Pie. Some may roll theirs, but the only of desserts that share nameship with the great constant, pi. <i>Mystical 3-1-4 also features A.I.-empowered Textual Analysis, which opens to multiple new possibilities:</i></p>\n    <p class="quote">The other new machine learning-powered feature is the smart text selection tool that recognizes the meaning of the text you selected and then allows you to suggest relevant actions like opening Google Maps or bringing up the share dialog for an address.<sup>1</sup></p>\n    <p>Further, Android Pie\'s <i>Digital Wellness</i> features offer all the trending self-obedience features--not the least of which FitBit\'s guilt-inducing, and highly effective,<strong>walk prompts--already the bots are running my life and I obey!</p></strong>';
  var blogcite5 = ' \n    <p class="cite">1. <a href="https://techcrunch.com/2018/08/06/say-hello-to-android-9-pie/"   target="_blank">https://techcrunch.com/2018/08/06/say-hello-to-android-9-pie/\n    </a>\n    </p>\n     ';
  var blogpost4 = '<p class="quote"><i>Bone is constantly turning over through a process in which cells called osteoclasts dig tunnels through bone, and then cells called osteoblasts re-pave those tunnels with new bone. Econs acknowledges that it sounds like an inefficient system, but it has to work this way because you obviously need to be able to use your bones while those repairs are taking place.</i><br /><br />\n     --Michael Econ, physician and member of the American Society for Bone and Mineral Research   \n     <p class="firstparagraph"><i>Bone loss in space can reach 5 to 10% over the course of a year, however the sure cure is Digital Responsibility, the trending fad of 2018, spans from the upcoming Android Pie\'s in-device digital behavioral tools across the spectrum to Fitbit, Youtube, and others\' timed get-up-and-walk push notifications.       </p>  ';
  var blogcite4 = '<p class="cite">1. <a href="https://tonic.vice.com/en_us/article/ne5zg8/this-is-the-effect-working-out-has-on-your-bones"   target="_blank">https://tonic.vice.com/en_us/article/ne5zg8/this-is-the-effect-working-out-has-on-your-bones\n     </a>\n     </p> \n     ';
  var blogpost3 = '<p class="quote"><i>Responsive experience with real-time inferencing. There are many tasks where speed matters. This includes interactive speech, visual search, and video recommendations. As AI models increase in accuracy and complexity, traditional CPUs can\u2019t keep up, and the Tesla P4 GPUs can cut latency by an order of magnitude.<br /><br />\n  Video decoding. The Tesla P4 has a dedicated hardware-accelerated decode engine that works in parallel with the GPU, enabling it to transcode and infer up to 35 HD video streams in real time. The integration of deep learning into video pipelines lets organizations offer smarter video services.<br /><br />\n  The inferencing engine that the Tesla P4 uses is based on Nvidia\u2019s Pascal architecture and is designed to increase the performance of servers running deep learning workloads. Google didn\u2019t give a date for general availability other than saying it\u2019s \u201Ccoming soon\u201D to its public cloud.</i></p>  \n  <p class="firstparagraph">Toys, if they are offered as presents remain unconditional gifts, and yet the devotion they procure make for a reciprocal gift: Google\'s Developer Tools and little to no cost serve the same purpose as Microsoft\'s free provisions of Integrated Develepment Environments, i.e. VS Code and recent purchase of GitHub. The New Data Economy, applies as much to the developers\' field as it does to consumers\'. </p>  ';
  var blogcite3 = '<p class="cite">1. <a href="https://www.cio.com/article/3293424/artificial-intelligence/more-artificial-intelligence-options-coming-to-google-cloud.html"   target="_blank">https://www.cio.com/article/3293424/artificial-intelligence/more-artificial-intelligence-options-coming-to-google-cloud.html\n  </a>\n  </p> \n  ';
  var blogpost2 = '<p class="quote"><i>Google announced it is making Nvidia\'s Tesla P4 GPU available as a cloud service, enabling more businesses to get started with AI projects quicklyi><sup>1</sup></p>\n  <p class="firstparagraph">API Services &agrave; la Google Cloud have become a new Hallmark--available for 12-month free trial--of <i>Google\'s ambitious  kit: Cloud IoT (Internet of Things) API, Cloud Genomics API, Cloud Machine Learning Engine API, among dozens of others.</i> Rivers of Kubernetes Data,Tensor-Processing-Unit Automotons for Oompah-Loompahs, and the ever-lasting flavor of chewing gum in the name of publicly available data for your tasting pleasure!   </p>';
  var blogcite2 = '<p class="cite">1. <a href="https://www.cio.com/article/3293424/artificial-intelligence/more-artificial-intelligence-options-coming-to-google-cloud.html"   target="_blank">https://www.cio.com/article/3293424/artificial-intelligence/more-artificial-intelligence-options-coming-to-google-cloud.html\n  </a>\n  </p>';

  var blogpost1 = '<p class="quote"><i>In July, Blackrock \u2014 the world\u2019s largest exchange-traded fund (ETF) \u2014 announced that it has launched a working group to assess the potential of investing in Bitcoin.  <br /><br />\n    Blackrock\u2019s move could be described as a preemptive strike to avoid missing the crypto bus. Goldman Sachs is making headway with cryptocurrency involvement and Blackrock is following suit.</i><sup>1</sup></p>\n    <p class="firstparagraph">\n    <p class="quote">Fintech broke onto the scene as a disruptive force following the 2008 crisis, but the industry\'s influence on the broader financial services system is changing.\n  \n    The fintech industry no longer stands clearly apart from financial services proper, and is increasingly growing embedded in mainstream finance. We\'re now seeing the initial stages of this transformation.<br /><br />\n    \n    For instance, funding is growing more internationally distributed, and startups are making necessary adjustments to prove sustainability and secure a seat at the table. Most fintech segments in the ascendant a year ago have continued to rise and grow more valuable to the broader financial system. Meanwhile, several fintech categories have had to make adjustments to stay on top. New subsegments are also appearing on the scene \u2014 such as digital identity verification fintechs \u2014 as new opportunities for innovation are discovered. \n    <br /><br /> ... \n    The rising influence of fintechs is having a dramatic effect on incumbents, from banks to insurers to wealth managers, pushing them to respond proactively to stay relevant. Incumbents are reacting to changes wrought by fintechs on three key fronts: the front end, the back end, and in their core business operations. As such, incumbents and fintechs are converging on a digital middle ground.\n  <br /><br />\n    As this happens, the fintech industry is on the cusp of becoming an integral component of the broader financial services ecosystem. But it will likely first have to go through a complete credit cycle, and survive an economic downturn like the one that set the stage for its arrival in 2008, for this to happen.<sup>2</sup>\n    </p>\n    ';
  var blogcite1 = '\n    <p class="cite">1. <a href="https://cointelegraph.com/news/institutional-investors-and-fintech-will-wall-street-go-head-first-into-crypto"   target="_blank">https://cointelegraph.com/news/institutional-investors-and-fintech-will-wall-street-go-head-first-into-crypto\n    </a>\n    </p> \n    <p class="cite">2. <a href="https://www.businessinsider.com/8-3-2018-fintech-ecosystem-financial-technology-research-and-business-opportunities-2018-8?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+clusterstock+%28ClusterStock%29&r=US&IR=T&IR=T"   target="_blank">https://www.businessinsider.com/8-3-2018-fintech-ecosystem-financial-technology-research-and-business-opportunities-2018-8 \n  </a>\n  </p> \n    ';

  var url = [{
    id: '22',
    did: '08-25-18',
    date: 'August 25-26, 2018<br />Weekend',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'The Quantum Chip for All',
    post: blogpost22,
    blogcite: blogcite22
  }, {
    id: '21',
    did: '08-24-18',
    date: 'August 24, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Air, More Air, and the Tech of Fast Air',
    post: blogpost21,
    blogcite: blogcite21
  }, {
    id: '20',
    did: '08-23-18',
    date: 'August 23, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'The Best Offense is a Good Defense',
    post: blogpost20,
    blogcite: blogcite20
  }, {
    id: '19',
    did: '08-22-18',
    date: 'August 22, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Quantum Data',
    title: 'Quantum Data V:<br />The Bits and Bolts of Zero, One, and the Superposed Third State',
    post: blogpost19,
    blogcite: blogcite19
  }, {
    id: '18',
    did: '08-21-18',
    date: 'August 21, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Quantum Data',
    title: 'Quantum Data IV:<br />The Business of Quantum Data  ',
    post: blogpost18,
    blogcite: blogcite18
  }, {
    id: '17',
    did: '08-20-18',
    date: 'August 20, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Data that Go Up but Do not Go Down',
    post: blogpost17,
    blogcite: blogcite17
  }, {
    id: '16',
    did: '08-18-18',
    date: 'August 18-19, 2018<br />Weekend',
    author: 'by Thomas Maestas',
    cat3: 'Quantum Data',
    title: 'Quantum Data III: Sudden Data ',
    post: blogpost16,
    blogcite: blogcite16
  }, {
    id: '15',
    did: '08-17-18',
    date: 'August 17, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Quantum Data, Part II:<br /> Quantum State-Entanglement across a Solid State',
    post: blogpost15,
    blogcite: blogcite15
  }, {
    id: '14',
    did: '08-16-18',
    date: 'August 16, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: ' ',
    post: blogpost14,
    blogcite: blogcite14
  }, {
    id: '13',
    did: '08-15-18',
    date: 'August 15, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Quantum Data',
    post: blogpost13,
    blogcite: blogcite13
  }, {
    id: '12',
    did: '08-14-18',
    date: 'August 14, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Quantum Data',
    title: '',
    post: blogpost12,
    blogcite: blogcite12
  }, {
    id: '11',
    did: '08-12-18',
    date: 'August 12-13, 2018<br />Weekend',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now.',
    title: ' ',
    post: blogpost11,
    blogcite: blogcite11
  }, {
    id: '10',
    did: '08-11-18',
    date: 'August 11, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'The Good Doctor, Part IV: Good Doctor, Heal Thyself!',
    post: blogpost10,
    blogcite: blogcite10
  }, {
    id: '9',
    did: '08-10-18',
    date: 'August 10, 2018',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now.',
    title: 'The Good Doctor, Part III: Magneto Encephelop',
    post: blogpost9,
    blogcite: blogcite9
  }, {
    id: '8',
    did: '08-09-18',
    date: 'August 9, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'The Good Doctor, Part II:  <br />About that Second Opinion . . . <br />',
    post: blogpost8,
    blogcite: blogcite8
  }, {
    id: '7',
    did: '08-08-18',
    date: 'August 8, 2018',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now.',
    title: 'The Good Doctor, Part I: <br /> How A.I.-Driven Predictive Analytics Rewrites Healthcare',
    post: blogpost7,
    blogcite: blogcite7
  }, {
    id: '6',
    did: '08-07-18',
    date: 'August 7, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'New Math &amp; the Speed of Antiquation, a Case Study:<br />Mobile 8th Generation Intel',
    post: blogpost6,
    blogcite: blogcite6
  }, {
    id: '5',
    did: '08-06-18',
    date: 'August 6, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Android Pi(e) Day',
    post: blogpost5,
    blogcite: blogcite5
  }, {
    id: '4',
    did: '08-04-18',
    date: 'August 4-5, 2018<br />Weekend',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'The New Age of Digital Responsibility',
    post: blogpost4,
    blogcite: blogcite4
  }, {
    id: '3',
    did: '08-03-18',
    date: 'August 3, 2018',
    author: 'by Thomas Maestas',
    cat3: ' ',
    title: 'Tour of Google\'s Chocolate Factory, Part II:<br />Glass Elevator into the Cloud',
    post: blogpost3,
    blogcite: blogcite3
  }, {
    id: '2',
    did: '08-02-18',
    date: 'August 02, 2018<br />Weekend',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Tour of Google\'s Chocolate Factory, Part II:<br />Google\'s Golden Ticket',
    post: blogpost2,
    blogcite: blogcite2
  }, {
    id: '1',
    did: '08-01-18',
    date: 'August 1, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'Fintech Auchtung!',
    post: blogpost1,
    blogcite: blogcite1
  }];

  for (i = 0; i < url.length; i++) {
    var cat = ' \n    <div id="' + url[i].did + '" class="blogDiv"> \n    <hr />  \n    <a href="#top"><button>Top</button></a>  \n    <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n    <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5> \n    <p id="author" class="  author">' + url[i].author + '</p>   \n    <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n    <h6  id="title"   class="dailytitle chapternumber">' + url[i].title + '</h6>\n    <br />\n    <div id="post">' + url[i].post + '\n    </div>\n    <div id="blogcite">' + url[i].blogcite + '\n    </div>';
    document.getElementById("paragraph-aug").innerHTML += cat;
  }

  var i;
  for (i = 0; i < url.length; i++) {
    var catMod = '\n  <div id="mod_' + url[i].did + '" class="blogDivMod"> \n  <hr />  \n  <a href="#top-mod"><button>Top</button></a>   \n  <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n  <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5>  \n  <p id="author" class="  author">' + url[i].author + '</p>   \n  <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n  <h6  id="title"   class="dailytitle cha-pternumber">' + url[i].title + '</h6>\n  <br />\n  <div id="post">' + url[i].post + '</div>\n  </div>\n <div id="blogcite">' + url[i].blogcite + '\n </div>';
    document.getElementById("paragraph-aug-mod").innerHTML += catMod;
  }
  console.log('blogger-aug');
  // console.log(angular.toJson(url));
};
bloggerAug();

/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


console.log('blogger-july');

var bloggerJuly = function bloggerJuly() {

  var blogpost24 = '<p class="firstparagraph">Cloud.google.com wins the day for offering the Willy Wonka\'s of Technological Candy at a free tour\'s view: You won the Golden Ticket. Google Cloud CEO Diane Greene explains that prioritizing customers\' needs rather than drifting with market forces offers solid growth moving past technological shifts and drifts with little course correction.</p>\n <p class="quote">While Google is still looking up at Amazon Web Services and Microsoft Azure when it comes to infrastructure cloud computing, it appears to be finding the balance between keeping engineers happy with cloud-native computing tools and courting enterprise company suits with service-level agreements and steak dinners.<sup>1</sup></p>';
  var blogcite24 = '\n \n <p class="cite">1. <a href="https://cloud.google.com"   target="_blank">https://cloud.google.com\n </a>\n </p><p class="cite">1. <a href="https://www.geekwire.com/2018/google-cloud-ceo-diane-greene-wane-cloud-pricing-wars-never-want-win-price/"   target="_blank">https://www.geekwire.com/2018/google-cloud-ceo-diane-greene-wane-cloud-pricing-wars-never-want-win-price/\n </a>\n </p>';

  var blogpost23 = '<p class="firstparagraph">Planet Green dodged a bullet recently, as activists\' climate change research officially gains legitimacy from the Supreme Court, albeit a few of their qualms ... But who could deny that if there is one thing that will save the earth, it\'s knowledge, knowledge far outweighs any other salvo. This is because the more data, the more accurate the models to indicate specific environmental needs and threats--<i>not to mention all the clues the data could reveal toward helping earth regain balance. </i></p><p>A.I. training would starve if the Supreme Court would have allowed administration clamp-downs on knowledge. After all, the overwhelming popular and professional opinions favor earth-friendly policies. \n<p class="quote">The Supreme Court on Monday denied the Trump administration\u2019s plea to halt proceedings in a landmark lawsuit by young people seeking stronger federal action on climate change.<sup>1</sup>\n</p>';
  var blogcite23 = '<p class="footnotes">1. <a href="http://thehill.com/policy/energy-environment/399562-supreme-court-denies-trump-admin-request-to-halt-youth-climate"   target="_blank">http://thehill.com/policy/energy-environment/399562-supreme-court-denies-trump-admin-request-to-halt-youth-climate\n</a>\n</p>\n<p class="cite">1. <a href="http://thehill.com/policy/energy-environment/399562-supreme-court-denies-trump-admin-request-to-halt-youth-climate"   target="_blank">http://thehill.com/policy/energy-environment/399562-supreme-court-denies-trump-admin-request-to-halt-youth-climate\n</a>\n</p>\n ';
  var blogpost22 = '\n<p class="quote"><i>\u201CIt feels like a magical mirror that reflects your moves with images of all kinds of human activity \u2013 from sports and dance to martial arts, acting and beyond.\u201D</i></br></br>\n--Google creative technologist Irene Alvarado \n</p>\n<p class="firstparagraph">Magical Mirror is a wonderful tool for A.I.-powered video imaging and mimicry. Google\'s soon-to-be open source software is freely available for A.I. developers ... now that should be amusing to have life-like personal avatars will certainly make for some interesting uses. \n The power of Big Data really proves itself, but Google\'s algorithm-sharing provides a real democracy of A.I. technology for everyone to use.  On the other side of the coin, accuracy in video and voice mimicry now means A.I.-driven authenticity detectors will soon prove pretty darn useful!\n</p>\n';
  var blogcite22 = '<p class="cite"> \n<p class="footnotes">1. <a href="https://www.standard.co.uk/tech/google-move-mirror-dancing-gif-a3892471.html"   target="_blank">https://www.standard.co.uk/tech/google-move-mirror-dancing-gif-a3892471.html\n</a>\n</p> \n</p>';
  var blogpost21 = '<p class="firstparagraph">Wired.com ...</p>\n<p class="quote"> \n"But big retailers can sell millions of products, so it\'s not feasible to have workers browse each item and manually adjust prices. Instead, the companies employ software to scan rival websites and collect prices, a process called \u201Cscraping.\u201D From there, the companies can adjust their own prices."<br /><br />\n"Retailers want to see what their rivals are doing, but they want to prevent rivals from snooping on them; retailers also want to protect intellectual property like product photos and descriptions, which can be scraped and reused without permission by others. So many deploy defenses to subvert scraping ..." <sup>1</sup></p>';
  var blogcite21 = ' \n<p class="footnotes">1. <a href="https://www.wired.com/story/scraper-bots-and-the-secret-internet-arms-race/"   target="_blank">https://www.wired.com/story/scraper-bots-and-the-secret-internet-arms-race/\n</a>\n</p>   ';

  var blogpost20 = '<p class="firstparagraph">Space.com ...</p>\n  <p class="quote">"NASA\'s Robonaut program and Roscosmos\' FEDOR program seem to share the goal of creating robots that make it safer for humans to accomplish things in space that otherwise would be too dangerous for humans to attempt.<i> Still, the FEDOR androids\' gun-wielding design might raise a few eyebrows."</i><sup>1</sup></p>\n  <img src="dist/img/droid.jpg" class="zoom" width="288px" />\n  ';
  var blogcite20 = ' \n<p class="footnotes">1. <a href="https://www.space.com/41253-russian-robots-fly-to-space.html"   target="_blank">https://www.space.com/41253-russian-robots-fly-to-space.html\n</p>   ';

  var blogpost19 = '<p class="quote">\n  <i> One person familiar with the matter described the office scene as \u201Cchaotic\u201D and said at one point more than 300 people tuned in to an emergency conference call.  \u201CCurrently out of capacity for scaling,\u201D one of the updates said about the status of Amazon\u2019s servers, roughly an hour after Prime Day\u2019s launch. \u201CLooking at scavenging hardware.\u201D <sup>1</sup></i> </p>\n  <p class="firstparagraph">Prime Day\'s saga of cascading failures stemming from an internal software reveals the <i> relentless challenge of Scalability</i>. In their words, the root cause was a "breakdown in auto-scaling, a critical component when dealing with unexpected traffic spikes"<sup>1</sup>. So the exponential spikes may be hard to expect because their nature is both spontaneous, but the inflection is calculable! ...only dramatically represented as the folding a sheet of paper 42 times to reach the moon ...\n  </p>\n  <img src="dist/img/paper.png" width="340px" class="zoom" />\n  <p><small>Image Credits: Coder\'s Revolution</small></p>\n  <p class="quote">  Amazon wasn\'t able to handle the traffic surge and failed to secure enough servers to meet the demand on Prime Day, according to expert review of internal documents obtained by CNBC.<br /><br />\n  That led to a cascading series of failures, including a slowdown in its internal computation and storage service called Sable and other services that depend on it, including Prime, authentication and video playback.\n  Amazon immediately launched a scaled-down "fallback" front page to reduce workload and temporarily killed all international traffic too. \n  </p><p>And so, the same Bezosian leadership that manages space exploration\'s <strong>Blue Origin</strong> inspired a system of fall-back redundencies to get back up to speed dramatically within 80 minutes. Perhaps the quick, albeit unconventional recovery strategy deserves great respect--because chance happens to all!   \n  </p>\n  ';

  var blogcite19 = ' \n  <p class="footnotes">Image Credit: <a href="http://wwvv.codersrevolution.com/blog/will-a-piece-of-paper-folded-42-times-reach-the-moon"   target="_blank">http://wwvv.codersrevolution.com/blog/will-a-piece-of-paper-folded-42-times-reach-the-moon\n  </a>\n  </p>   \n<p class="footnotes">1. <a href="https://www.cnbc.com/2018/07/19/amazon-internal-documents-what-caused-prime-day-crash-company-scramble.html"   target="_blank">https://www.cnbc.com/2018/07/19/amazon-internal-documents-what-caused-prime-day-crash-company-scramble.html\n</a>\n</p>   \n ';
  var blogpost18 = '\n  <p class="firstparagraph">Business models of all shapes and sizes, and the diversity of tech that comes with them, are the natural consequence of<i> unlimited <strong>creative</strong> potential in Tech. So, a small business with few resources now has unlimited resources in the cloud with game-changing access to A.I.</i> Luckily, investments in smaller tech sources cover all sectors:</p>\n \n  <p class="quote">The Energy Department has announced that it will award 95 grants worth a total of $95 million to 80 small businesses located in 26 states as part of its Small Business Innovation Research and Small Business Technology Transfer programs. <sup>1</sup>\n  </p>\n  <p>So, for as much as tech giants grow out of proportion, so do smaller businesses; because not only is the economic horizon  not a zero-sum tech pie, but growing. Secondly, the pace of evolving needs and tech capabilities favor smaller, more maneuvrable entrepreneur-producers.';

  var blogcite18 = ' \n<p class="footnotes">1. <a href="http://www.executivegov.com/2018/07/doe-to-award-rd-grant-for-innovative-tech-to-80-small-businesses/\n  "   target="_blank">http://www.executivegov.com/2018/07/doe-to-award-rd-grant-for-innovative-tech-to-80-small-businesses/\n  \n</a>\n</p>   \n ';

  var blogpost17 = '\n  <p class="firstparagraph"> Cloud computing has never offered more convenience--especially in e-commerce. Walmart ramps up online presence, Amazon\'s Whole Foods ramps up offline presence. More importantly, everything and all businesses in between these two vortices has the opportunity to ride the same wave of platform and supply chain integration. </p>\n  <p class="quote"> \n  </p>\n  <p class="quote"> Retail giant Walmart Inc said on Tuesday it entered into a strategic partnership with Microsoft Corp for wider use of cloud and artificial intelligence technology, in a sign of major rivals of Amazon.com Inc coming together.\n<br /><br />\n  The five-year agreement will leverage the full range of Microsoft\'s cloud solutions, including Microsoft Azure and Microsoft 365, to make shopping faster and easier for customers, the Bentonville Arkansas-based company said.\n  \n  As part of the partnership, Walmart and Microsoft engineers will collaborate to migrate a significant portion of walmart.com and samsclub.com to Azure, Walmart added. <sup>1</sup>\n  </p>';

  var blogcite17 = ' \n<p class="footnotes">1. <a href="https://www.usnews.com/news/technology/articles/2018-07-17/walmart-microsoft-in-partnership-to-use-cloud-tech\n  "   target="_blank">https://www.usnews.com/news/technology/articles/2018-07-17/walmart-microsoft-in-partnership-to-use-cloud-tech\n  \n</a>\n</p>   \n ';

  var blogpost16 = '\n  <p class="firstparagraph">Alibaba--a Chinese search giant akin to Google--dwarfs the market value of Amazon. So much so, that Alibaba\'s earnings last year don\'t compete with Amazon\'s year, <i>but  past several years</i>.<sup>1</sup> Their success isn\'t a haphazard event, but years of strategy that focused on integrating services, whether online or offline origins, a true supply chain no longer discriminating marketplaces, logistics, cloud computing and payments. With unlimited global reach, big gets bigger and bigger. </p>\n \n  <p class="quote">  "Alibaba Cloud has always been dedicated to empower enterprises of different sizes to tap into opportunities in the digital age. With digital transformation poised to add close to $154 billion to India\'s GDP, this is a great opportunity for us to do business in India," Alex Li, General Manager of Alibaba Cloud Asia Pacific, said in a statement.<sup>2</sup> \n   </p>\n   <p>\n   Ultimately, what goes up does not necessarily come back down with cloud computing. And the further integrated systems become, the less feasible to divide, no matter which part of the globe.<sup>3</sup></p>';

  var blogcite16 = '\n  <p class="footnotes">1. <a href="\n  https://www.lemonde.fr/idees/article/2018/07/10/comment-alibaba-va-tuer-amazon_5329170_3232.html"   target="_blank">https://www.lemonde.fr/idees/article/2018/07/10/comment-alibaba-va-tuer-amazon_5329170_3232.html\n  </a>\n  </p>    \n  \n  <p class="footnotes">2. <a href="https://economictimes.indiatimes.com/small-biz/startups/newsbuzz/india-presents-great-business-opportunities-alibaba-cloud/articleshow/64974989.cms"   target="_blank">https://economictimes.indiatimes.com/small-biz/startups/newsbuzz/india-presents-great-business-opportunities-alibaba-cloud/articleshow/64974989.cms\n  </a>\n  </p>      <p class="footnotes">3. <a href="https://www.wsj.com/articles/breaking-up-big-tech-is-hard-to-do-1532290123"   target="_blank">https://www.wsj.com/articles/breaking-up-big-tech-is-hard-to-do-1532290123\n  </a>\n  </p>    \n ';

  var blogpost15 = '\n  <p class="firstparagraph">Ethereum Architect Vitalik Buterin\'s unwavering commitment to the Crypto-contract currency finally pays off. In my February blogposts, I recounted the technical challenges that Ethereum still faced: As a "Proof of Work" currency that requires Ether (in <i>Wei</i>) currency for each transaction hindered more widespread adoption. After the big boost from last month\'s Switzerland\'s Crypto Valley Conference, Ethereum walked away handily with scores of investors and renewed momentum. The 23-year old hero of the platform almost appears precocious for the recent feature in Fortune Magazine\'s Top 40 Under 40.</p>\n  <p class="quote">\n  [Buterin\'s] visionary project has rocketed to a market cap of nearly $30 billion\u2014as high as the private valuations Airbnb and Snapchat achieved\u2014from $1 billion a year ago, when Fortune first placed him on its 40 under 40 list.<sup>2</sup>\n  </p>\n  <p>To recap the enormous advantages of Ethereum functions as a <i> global operating system--The Ethereum Virtual Machine--</i>  the platform upon which shared, distributed applications can be designed and deployed. Unlike Bitcoin\'s function-less platform, contracts from banking to betting to real-estate can easily be drawn up in Solidity code, into the DAPP, <i>Distributed Application  deployed onto a Fintech network so expansive</i>, no wonder that even a crypto-currency needs a Swiss bank account!\n  </p>\n  ';

  var blogcite15 = '<p class="footnotes">1. <a href="\nhttps://www.cnbc.com/2018/07/18/ethereum-is-a-leading-driver-in-blockchain-says-circle-ceo.html\n"   target="_blank">\nhttps://www.cnbc.com/2018/07/18/ethereum-is-a-leading-driver-in-blockchain-says-circle-ceo.html\n</a> \n</p>\n<p class="footnotes">2. <a href="\nhttp://fortune.com/40-under-40/vitalik-buterin-10/"   target="_blank">http://fortune.com/40-under-40/vitalik-buterin-10/\n</a>\n</p>   \n ';

  var blogpost14 = '\n <p class="firstparagraph">Prime\'s Allure begins with the greatest deals, the most convenient deliveries, and a new Accessibility of Whole Foods Breads, Pastries, and HoneyCrisp Apples to every citizen!</p>\n <p>On a darker note, many articles and studies focus on the vendors\' side of the Amazon effect, i.e. the push to remote shopping;<sup>1</sup> But the consumer side of the Amazon effect is more insidious: the sheer off-scale underpricing of goods, mock holidays, and shopping-memberships push new spending habits. <i>The more convenient shopping with \'one-click buy\' becomes, the \'less convenient\' becomes the explorative, exciting-/debate-filled shopping experiences that reward the Creative Entrepreneurs\'</i> cultural interaction with consumers  \n\n';
  var blogcite14 = '\n<p class="footnotes">1. <a href="\nhttps://www.statista.com/chart/10295/shopping-on-amazon/\n"   target="_blank">\nhttps://www.statista.com/chart/10295/shopping-on-amazon/\n</a>\n</p>   \n';
  var blogpost13 = '\n  <p class="firstparagraph"> Now that 49% of American e-commerce passes through Amazon\'s gates, it\'s official: <i>50% market share signifies a hostile take-over of Amerian Culture.</i> From the remaining half of the Online Shopping pie goes to  the next top nine, 22%: \n </p>\n <p class="quote">\n  eBay (EBAY): 6.6%<br /><br />\n  Apple (AAPL): 3.9%<br /><br />\n  Walmart (WMT): 3.7%<br /><br />\n  Home Depot (HD): 1.5%<br /><br />\n  Best Buy (BBY) 1.3%<br /><br />\n  QVC Group (QVCA): 1.2%<br /><br />\n  Macy\'s (M): 1.2%<br /><br />\n  Costco (COST): 1.2%<br /><br />\n  Wayfair (W): 1.1%<br /><br />\n  <small style="align:right;">Business Insider, July 2018 </small></p>\n  </p>\n  <p>These are more palatable organizations, without Amazon\'s cardboard-like culture.  There you still have the lofty, beautify Apple products, and who doesn\'t love the umbrella-cane only available on QVC limited quantities do apply!</p>\n  <p>\n  Of course, the remaining free birds, the 32% comprise the millions of home-office,brick-and-mortars, and online market entrepreneurs. (These do not include the independent vendor sales using Amazon\'s Marketplace). </p><p>So why does this 32-percentile slice of e-commerce represent the last stand of American Culture? The Creative Spirit may survive, even thrive; but it changes, and <i> creative verve takes on a reshaped form and a new pace, fitting to bureaucratic constraints and pricing schema. </p>   ';
  var blogcite13 = '\n  <p class="footnotes">1. <a href="\n  http://www.businessinsider.com/amazon-is-closing-in-on-owning-half-of-the-e-commerce-market-2018-7?utm_source=feedburner&amp%3Butm_medium=referral&utm_medium=feed&utm_campaign=Feed%3A+businessinsider%2Ftravel+%28Business+Insider%29&r=US&IR=T&IR=T\n  "   target="_blank">\n  http://www.businessinsider.com/amazon-is-closing-in-on-owning-half-of-the-e-commerce-market-2018-7 \n  </a>\n  </p>     \n\n  ';
  var blogpost12 = '\n  \n  <p class="firstparagraph">Fintech\'s revered "Crypto Valley Conference on Blockchain Technology" in Zug, Switzerland, featured blockchain expertise from all corners, including Keynote Speakers, Stefan Thomas CTO of Ripple [cryptocurrency] and Professor Emin G&uuml;n Sirer of Cornell University, along with Economists and Swiss Government officials. World-class economists, investors, and Regulation authorities aside, the host-countries whole-hearted commitment to cryptocurrency is evident: </p>\n  <p class="quote">\u201CThey want Switzerland to be the place to make it happen \u2014 but they don\u2019t want to be seen\n  as the \u2018wild west\u2019. It is Swiss pragmatism,\u201D says Martin Eckert, partner at MME, a Swiss law firm. <br /><br /> \n  Digital pioneers say Switzerland emerged as an ICO hub because it has a cluster of rich\n  investors and technology specialists. The small canton of Zug, near Zurich, has unofficially\n  Switzerland embraces cryptocurrency culture Seite 2 von 7\n  25.01.2018\n  become \u201CCrypto Valley\u201D.<sup>4</sup>\n  </p>\n  <img src="dist/img/swissBlockchain.png" width="350" class="zoom" />\n  <p><small>Image Credit: Source Lykke, Coindesk</small></p>\n';
  var blogcite12 = '<p class="footnotes">3. <a href="\n  https://www.cryptovalleyconference.com\n  "   target="_blank">\n  \n  https://www.cryptovalleyconference.com\n  </a>\n  </p>\n  <p class="footnotes">4. <a href="\n  https://www.crypto-finance-conference.com/resources/public/lava3/media/switzerland-embraces-cryptocurrency-culture.pdf\n  "   target="_blank">\n  \n  https://www.crypto-finance-conference.com/resources/public/lava3/media/switzerland-embraces-cryptocurrency-culture.pdf\n  </a>\n  </p>\n';
  var blogpost11 = '\n  <p class="firstparagraph"><i>Zen of Python: "Beautiful is better than ugly.<i> Explicit is better than implicit.</i>  Simple is better than complex.  Complex is better than complicated. Flat is better than nested.  Sparse is better than dense"<br /></i> -- Pythoneer Tim Peters<p> In my April 19th post, I recount Python\'s near-mystical author and leader of language\'s development up to this month\'s retirement:  About Guido van Rossum, </p>\n  <p class="quote">After almost 30 years of overseeing the development of the world\'s<i> most popular language, Python, its founder and Benevolent Dictator For Life" (BDFL), Guido van Rossum,</i> has decided he would like to remove myself entirely from the decision process.<sup>2</sup> </p><p>\nPython is NASA\'s drug-of-choice because of the language\'s superior handling of precision mathematics, and yet the syntax and module libraries makes the language easy for anyone to pick up. Few could argue against Guido van Rossum\'s reductionist philosophy that inspires the clear, expansive structure. So, farewell to the great Guido van Rossum\'s official leadership and Thank You! \n</p>\n';
  var blogcite11 = ' <p class="footnotes"><a>1. Tim Peters <p class="footnotes">2. <a href="https://www.zdnet.com/article/python-language-founder-steps-down/  "   target="_blank">\n  https://www.zdnet.com/article/python-language-founder-steps-down/ </a>\n  </p>\n\n';
  var blogpost10 = '<p class="quote">\n...The colossal shift in the chip world came with the advent of artificial intelligence (AI) and machine learning (ML). With these emerging technologies, a flood of new processors has arrived\u2014and they are coming from unlikely sources. <br /><br />\nMicrosoft is preparing an AI chip for its HoloLens VR/AR headset, and there\u2019s potential for use in other devices. \n<i> Google has a special AI chip for neural networks called the Tensor Processing Unit, or TPU, which is available for AI apps on the Google Cloud Platform. </i>Apple is working on an AI processor called the Neural Engine that will power Siri and FaceID.  <sup>1</sup></p>\n<p class="firstparagraph">All ... All the A.I. Tools a busy bee could ask for!\n</p>\n ';
  var blogcite10 = '\n<p class="footnotes">1. <a href="\nhttps://arstechnica.com/gadgets/2018/07/the-ai-revolution-has-spawned-a-new-chips-arms-race/\n"   target="_blank">\nhttps://arstechnica.com/gadgets/2018/07/the-ai-revolution-has-spawned-a-new-chips-arms-race/\n</a>\n</p>     \n';

  var blogpost9 = ' \n<p class="firstparagraph">Moore\'s Law--a function of transistor count--has guided CPU bench-mark expectations along a fairly linear path year-by-year. However, computing requirements have multiplied while the mathematical relevence of the law wanes. <br /><br />\n<img src="dist/img/moores_law.png" width="400px" class="zoom" title="Moore\'s Law Graphic" /><br />Image Credit: ourworldindata.org <br /><br /> <i>Enter the Decision Tree, the Random Forest, Na&iuml;ve Bayes, and K-Nearest Neighbors</i>: The machine learning tools and theoretical building blocks to get more bang for the buck from all that computing power. How? <i> Teaching software to teach itself, which is the pathway out of computing-power deficits and the move from theoretical to practical</i> ...</p> \n<p class="quote">\nEvery technology follows a similar path of diszcovery, engineering, and transformation. In the case of electricity, Faraday uncovered new principles, but no one really knew how to make them useful. They first had to be understood well enough that people such as Edison, Westinghouse, and Tesla could figure out how to make things that people would be willing to buy.\n \n<br /><br />  The digital revolution, for all of its charms, has had a fairly limited economic impact, compared with earlier technologies such as electricity and the internal combustion engine. Even now, information technologies make up only about 6% of GDP in advanced economies. Compare that to manufacturing, health care, and energy, which make up 17%, 10%, and 8% of global GDP, respectively, and you can see how there is vastly more potential to make an impact beyond the digital world.\n<sup>2</sup></p>\n<p>As the saying goes, <i>One crowded hour of glorious life is worth an age without a name.</i><sup>3</sup> And now the tide is high for Tech to venture out into the world and make a name for herself!\n';
  var blogcite9 = '<p class="footnotes">2. <a href="https://ourworldindata.org/wp-content/uploads/2013/05/Transistor-Count-over-time.pngArticle"   target="_blank">https://ourworldindata.org/wp-content/uploads/2013/05/Transistor-Count-over-time.png</a>\n</p>\n<p class="footnotes">2. <a href="https://hbr.org/2018/07/the-industrial-era-ended-and-so-will-the-digital-era"   target="_blank">https://hbr.org/2018/07/the-industrial-era-ended-and-so-will-the-digital-era</a>\n</p>\n\n<p class="footnotes">3. Thomas Osbert Mordaunt';

  var blogpost8 = '<p class="firstparagraph">Advances in computer science and data research follow the path of the tools that pave a developer\'s path: The tools make the worker, and therefore the work. For example, any of the Industrial Revolutions leaped forward with every new tool. <i>Now, Artificial Intelligence research and design  lurches forward by the tooling, but in a new fashion: Open source tools owned and operated by the community, the work by and for any community.</i>\n</p>\n<p> Neural network tools like TensorFlow.js, a "JavaScript library for training and deploying Machine Learning models in the browser and on Node.js" <sup>1</sup>  along with other programming-library frameworks, abstract away a layer of the visible mechanics. On the one hand, it is the democratization of cutting-edge technology, formerly siloed apart and under government, corporate or university controls. </p>\n<p>\nThe genie is definitely out of the bottle, yet he or she is now at the keyboards across the globe. This has a clear effect in bringing technological innovation to the community, to the coffeeshops and meet-up groups, instead of clearly defined, bureaucratically-directed research ends. </p>\n<p>Therefore,  bootstrapping open-source projects brings the community to the forefront of technological innovation! Though the common mobile app has grown familiar for changing landscapes, those apps chiefly leverage the social network (links) of friends and professionals; while the common-use spread of machine-learning research provides leverage to the actual work (nodes) of progress</p>\n<p>Therefore, the tools provide one dimension of A.I.\'s path, while the democratized distribution of tools across social networks provides a second dimensional path. This alters the A.I. evolution in the long-term, by means of short-term and frequent tooling revolutions.   </p>\n';
  var blogcite8 = '\n<p class="footnotes">1. <a href=" https://js.tensorflow.org/"   target="_blank"> https://js.tensorflow.org/</a>\n</p>   \n';
  var blogpost7 = '\n<p class="firstparagraph">Panic and anxiety cover the Snapchat countries across far-flung locales from Latvia to Denver to Spain--</i>and in one case blighting the entire island of the United Kingdom...</i></p>\n<p class="quote">Some users went to Twitter and shared their frustration.\n"I\'ve been sending people abuse on snapchat for not replying to me only to discover its down. Oops?" one user tweeted.<br /><br />\n"Snapchat just went down. I can literally feel the panic of a thousand generations in my bones. #snapchat," another user posted.\nSnapchat currently has 166 million users globally. <sup>2</sup>\n</p>\n<p> A chronic technical problem before May 2018 when SnapCrash went public   dating to October. <sup>1</sup> -- scalability challenges strike again!</p> \n<img src="dist/img/snapchat.jpg" width="350" class="zoom" /><br /><br />\n<p>But inquiring minds want to know, <i>What\'s the Story with Snapchat? </i>Not to mention the Conspiracy Theorists that blame Snapchat\'s devotion to Advertisers--too many distractions?</p>\n<p class="quote">\n[Snapchat] tweeted: \u201CSome Snapchatters are having trouble with the app. We\u2019re aware of the issue and working on a fix! We recommend staying logged into your account.\u201D\n<br /><br />\nSnapchat recently confirmed that it is testing six-second long ads in Shows on its Discover section that won\u2019t budge no matter how many times a user tries to tap to skip them.<br /><br />\n\nThis development has been coming for some time as Snapchat looks to placate advertisers who have grown frustrated by users who, on average, only stay on an ad for two seconds before skipping.</p> \n<p>Every kind of Server malfunction pales in comparison to the Affordable Healthcare Act web-app\'s abysmal first few months.<i> Get Well Soon, Snapchat--you\'re breaking our heart!</i></p>';
  var blogcite7 = '\n<p class="footnotes">1. <a href=" https://www.independent.co.uk/life-style/gadgets-and-tech/snapchat-down-not-working-android-broken-message-snap-inc-help-a8443236.html"   target="_blank"> https://www.independent.co.uk/life-style/gadgets-and-tech/snapchat-down-not-working-android-broken-message-snap-inc-help-a8443236.html</a>\n</p>    \n\n<p class="footnotes">2. <a href=" http://www.tribuneindia.com/news/science-technology/snapchat-outage-hits-users-globally/480068.html"   target="_blank"> http://www.tribuneindia.com/news/science-technology/snapchat-outage-hits-users-globally/480068.html</a>\n</p>    \n<p class="footnotes">3. <a href="https://outage.report/snapchat" target="_blank">https://outage.report/snapchat</a></p>\n ';
  var blogpost6 = '\n <p class="quote"><sup>0</sup><strong><small>\n The term \u201Cextropy,\u201D coined in 1967, is generally used to describe life\u2019s capacity to reverse the spread of entropy across space and time. </small></strong><sup>1</sup>\n </p>\n <p class="firstparagraph">\n Philosophies of A.I. range from the Aloof to Alarmed, from Punch-drunk Optimism to Harrowing Paranoia: A few vantage points from a Legacy New Yorker:</p>\n <p class="quote">\n Last summer, Oren Etzioni, the C.E.O. of the Allen Institute for Artificial Intelligence, in Seattle, referred to the fear of machine intelligence as a \u201CFrankenstein complex.\u201D Another leading researcher declared, \u201CI don\u2019t worry about that for the same reason I don\u2019t worry about overpopulation on Mars.\u201D<sup>1</sup></p>\n <p class="quote">\n Jaron Lanier, a Microsoft researcher and tech commentator, told me that even framing the differing views as a debate was a mistake. \u201CThis is not an honest conversation,\u201D he said. \u201CPeople think it is about technology, but it is really about religion, people turning to metaphysics to cope with the human condition. They have a way of dramatizing their beliefs with an end-of-days scenario\u2014and one does not want to criticize other people\u2019s religions.\u201D\n <sup>1</sup></p>\n <p class="quote">\n Bostrom had little interest in conventional philosophy\u2014not least because he expected that superintelligent minds, whether biologically enhanced or digital, would make it obsolete. \u201CSuppose you had to build a new subway line, and it was this grand trans-generational enterprise that humanity was engaged in, and everybody had a little role,\u201D he told me. \u201CSo you have a little shovel. But if you know that a giant bulldozer will arrive on the scene tomorrow, then does it really make sense to spend your time today digging the big hole with your shovel? Maybe there is something else you could do with your time. Maybe you could put up a signpost for the great shovel, so it will start digging in the right place.\u201D He came to believe that a key role of the philosopher in modern society was to acquire the knowledge of a polymath, then use it to help guide humanity to its next phase of existence\u2014a discipline that he called \u201Cthe philosophy of technological prediction.\u201D \n <sup>1</sup></p>\n <p>At the end of the day, we can ask "are we there yet?" over again, but a more pointed query asks not about time, but about place: "It may be highly unpredictable where a traveller will be one hour after the start of her journey, yet predictable that after five hours she will be at her destination.\u201D\n ';
  var blogcite6 = '\n \n<p class="footnotes">1. <a href=" https://www.newyorker.com/magazine/2015/11/23/doomsday-invention-artificial-intelligence-nick-bostrom"   target="_blank"> https://www.newyorker.com/magazine/2015/11/23/doomsday-invention-artificial-intelligence-nick-bostrom</a>\n</p>    \n<p class="footnotes">1. <a href="https://nickbostrom.com/"   target="_blank"> https://nickbostrom.com/</a>\n</p>  \n\n ';
  var blogpost5 = '\n <p class="firstparagraph">It turns out that data is unevenly distributed between sectors, leading to monopoles of dominance: After all, who controls the data, controls the commanding heights. And yet, the very substance of Big Data derives from and belongs precisely to  individuals, aggregated, that checked "Agree" to a given app\'s Privacy Policy, from a given Internet Service Provider, using a given Browser ....</p>\n <p>Now that physical products lose relative value for many reasons (not to mention easy downloads for 3-D printing), and alternately<i> informational data products gain value in the digital economy: hence the problem of allocating the value of personal data back to the person </i>... To this, the Canadian A.I. Mafia chimes in:</p>\n  <p class="quote">A persistent challenge for Element is the dearth of good data. The simplest way to train A.I. models is to feed them lots of well-labeled examples\u2014thousands of cat images, or translated texts. Big Tech has access to so much consumer-oriented data that it\u2019s all but impossible for anyone else to compete at building large-scale consumer products. But businesses, governments, and other institutions own huge amounts of private information. Even if a corporation uses Google for email, or Amazon for cloud computing, it doesn\u2019t typically let those vendors access its internal databases about equipment malfunctions, or sales trends, or processing times. <br />\n  <br />That\u2019s where Element sees an opening. If it can access several companies\u2019 databases of, say, product images, it can then\u2014with customers\u2019 permission\u2014use all of that information to build a better product-recommendation engine. Big Tech companies are also selling A.I. products and services to businesses\u2014IBM is squarely focused on it\u2014but no one has cornered the market. Element\u2019s bet is that if it can embed itself in these organizations, it can secure a corporate data advantage similar to the one Big Tech has in consumer products.<sup>1.</sup></p>\n  <p>\n   <p>So will this kind of data democratization work? Not only so, but the Cambridge Analytica fiasco only briefly awakened public attention to the deep science underlying each of our "online digital signatures" ... the race is on among the Tech Giants to use A.I. to understand our lives, our keystrokes, our buying preferences better than we understand. And in turn, provide a great utility, and win our financial allegiance!\n';

  var blogcite5 = '\n\n<p class="footnotes">1. <a href="http://fortune.com/longform/element-ai-startup-tech/"   target="_blank">http://fortune.com/longform/element-ai-startup-tech/</a>\n</p>    \n\n';

  var blogpost4 = ' \n  <p class="quote">In the Modern Field of Artiificial Intelligence, all roads seem to lead to three researchers with ties to Canadian universities. The first, Geoffrey Hinton, a 70-year-old Brit who teaches at the University of Toronto, pioneered the subfield called deep learning that has become synonymous with A.I. The second, a 57-year-old Frenchman named Yann LeCun, worked in Hinton\u2019s lab in the 1980s and now teaches at New York University. The third, 54-year-old Yoshua Bengio, was born in Paris, raised in Montreal, and now teaches at the University of Montreal. The three men are close friends and collaborators, so much so that people in the A.I. community call them the Canadian Mafia.<sup>1.</sup></p>\n\n  <p class="firstparagraph">A curious path of punctuated advancement due to insufficient memory and cpu power, characterized late 20th century A.I. development: Deep Learning development   lulls interrupted by rapid growth with each successive technological period.\n   Toronto\'s Dr. Geoff Hinton\'s single-layered A.I. algorithm gained brief fame, yet A.I. research no longer advanced  for ten years. </p>\n   <p class="quote">\n   Programs that performed well in the laboratory were useless in everyday situations; a simple act like picking up a ball turned out to require an overwhelming number of computations.\n\nThe research fell into the first of several \u201CA.I. winters.\u201D As Bostrom notes in his book, \u201CAmong academics and their funders, \u2018A.I.\u2019 became an unwanted epithet.\u201D<sup>1</sup> \n</p>\n<p>\nThen came the GPU with Alex Khreshinski\'s famous image-recognition competition-winning penmanship detector, which notably is still in use by the banking system. This novel use of the GPU to accomplish parallel calculations rewrote the the A.I. field overnight. Also known as the "Cambrian Explosion", this event (and really just the algorithm) set off widespread advancements in the weeks and months follwoing, leading to new speciation ranging from the ANN, Neural Network, to a whole alphabet soup from Convolutional Neural Networks (CNN) <i>to far-reaching mutations of Reinforcement Learning</i>.<sup>2</sup>\n  </p>\n \n  <p> Along with Hinton\'s close collaborator throughout the 1980\'s and 90\'s, Dr. Yoshua Bengio of the University of Montr&eacute;al, the researchers remain committed to humanity\'s service:</p>\n   \n  <p class="quote">\n  Hinton moved from the U.S. to Canada in part due to disillusionment with Reagan-era politics and disapproval of military funding of artificial intelligence.[22] He believes political systems will use AI to "terrorize people". Hinton has petitioned against lethal autonomous weapons. Regarding existential risk from artificial intelligence, Hinton has stated that superintelligence seems more than 50 years away, but warns that "there is not a good track record of less intelligent things controlling things of greater intelligence". Asked in 2015 why he continues research despite his grave concerns, Hinton stated "I could give you the usual arguments. But the truth is that the prospect of discovery is too sweet." Hinton has also stated that "It is very hard to predict beyond five years" what advances AI will bring.<sup>1</sup></p>\n  \n  <p>While Hinton and company aren\'t necessarily Mahatma Gandhi-like, their devotion to a science prioritized to humanity\' service and long-term best interest--free from monetary or other influence is admirable. No wonder their outlook on A.I.\'s utility is so much brighter than that of Pessimist Elon Musk and company ... baah-humbug!\n </p>\n   \n \n  ';

  var blogcite4 = '\n\n\n  <p class="footnotes">1. <a href="http://fortune.com/longform/element-ai-startup-tech/"   target="_blank">http://fortune.com/longform/element-ai-startup-tech/</a>\n  </p>    \n  <p class="footnotes">2. <a href="https://www.benzinga.com/pressreleases/18/06/p11846924/join-ai-pioneer-geoffrey-hinton-in-toronto-and-learn-from-global-leade"   target="_blank">https://www.benzinga.com/pressreleases/18/06/p11846924/join-ai-pioneer-geoffrey-hinton-in-toronto-and-learn-from-global-leade</a>\n  </p>     \n\n\n  ';

  var blogpost3 = ' \n  <p class="firstparagraph">Already A.I. has shown its true colors as an ideal tool for solving disproportionately large, complex data problems: Similar to Watson\'s medical recommendations based on millions of pages read, the off-the scale amount of pages from every tech company is the item of interest. This is the flurry-to-snowstorm of Privacy Policies simultaneously released in response to the E.U.\'s May 25th General Data Protection Regulations.  In reference to my June 30th post on A.I. workplace solutions, months of busy-reading-work all distilled to a fraction of the time to analyze those policies. Guess what? The rule-breaking is well under way!</p>\n  <p class="quote">Researchers from the European Union Institute in Florence worked with an EU consumer organization to create the software. They then used the program to examine the privacy policies of 14 major technology businesses, including by Alphabet Inc., Amazon.com Inc., and Facebook Inc.<br /><br />\n \n  They found that a third of those clauses were "potentially problematic" or contained "insufficient information." Another 11 percent of the policy\u2019s sentences used unclear language, the academics said.  The researchers didn\u2019t make public which companies\u2019 policies violated which provisions of the law, publishing only aggregate findings for all of the companies in the study.<sup>1</sup></p>\n \n  <p>Aha! <i>The practices of Tech companies\' use of A.I. to analyze customers\' private data is well-known, but <strong>what do we actually know</strong> beyond just that? Behind the veil of commercial secret, much less is known than is led on ... until now. Now, A.I. becomes increasingly useful as a tattle-tale! </i> So by the same token that tech creates problems, Tech is the first to provide a solution. But A.I. rule-checking sounds good but raises another question: Who owns, or can access by alternate means, the personal data we have strewn across the internet? And what quality of data does each party have, or shares?  </p>\n  ';

  var blogcite3 = '\n  \n<p class="footnotes">1. <a href="https://www.bloomberg.com/news/articles/2018-07-04/new-ai-tips-off-regulators-to-possible-eu-data-privacy-faults"   target="_blank">https://www.bloomberg.com/news/articles/2018-07-04/new-ai-tips-off-regulators-to-possible-eu-data-privacy-faults</a>\n</p>    \n  ';

  var blogpost2 = '\n<p class="quote"><i>Power is \u201Cvarious forms of domination and subordination and the asymmetrical balance of forces which operate whenever and wherever social relations exist.\u201D  </i><sup>1</sup><br /><br />--Michel Foucault</p>\n<p class="firstparagraph">Ties and balances of power, at their fundamental core are constantly changing variations of symmetry between two agents, whether unilateral or bilateral: Two nodes interlinked. Magnified by overlapping networks and layers of relations, it\'s easy to see why long-standing institutions are interlocked, for better or worse ... Clearly the trend of turbulence and power grabs reaches far and wide:\n </p>\n<p class="quote">Poland was once a beacon for countries struggling to escape the yoke of the Soviet Union and embrace Western democracy. But it is now in league with neighboring nations, like Hungary, whose leaders have turned to authoritarian means to tighten their grip on power, presenting a grave challenge to a European Union already grappling with nationalist, populist and anti-immigrant movements.<br /><br />\n\nThe forced retirements of up to 27 of 72 Supreme Court justices, including the top judge, and the creation of a judicial disciplinary chamber were the latest in a series of steps by Poland\u2019s right-wing Law and Justice Party to take over the justice system.\n</p>\n<p>As it always is in film, it is so now that dire situations have to call upon the true Super Man, Technology, to save the day: And what form this time? Blockchain technology, which presents a cryptographic solution to the problem of trust:<i> If two agents can agree on a third cryptographic intermediary, then a bridge of trust is built--the kind that in the past only institutions could broker!</i>. </p>\n<p>And so, two humans devise a new means to exchange without disruption--an indestructable scaffolding firmly set in the foreground from today\'s creaking and swaying institutions. Sounds good, but where\'s the music? There seems to be a subtle interlude between the honeymoon stage of investing and inventing new currencies, and little in the way of micro-transactions and <i> the actual <strong>using</strong> it</i>. It takes a little trust to make trust, so the effort is on to make a bridge from the <i>early adopters</i> stage to <i>mainstream adoption</i>...<sup>3</sup>  \n</p>\n';
  var blogcite2 = '\n<p class="footnotes">2. <a href="https://books.google.com/books?id=6rfP0H5TSmYC&printsec=frontcover"   target="_blank">Foucault, Michel. Discipline and punish: The birth of the prison. Vintage, 2012.</a>\n</p>   \n<p class="footnotes">2. <a href="https://www.nytimes.com/2018/07/03/world/europe/poland-supreme-court-protest.html"   target="_blank">https://www.nytimes.com/2018/07/03/world/europe/poland-supreme-court-protest.html</a>\n</p>   \n<p class="footnotes">3. <a href="https://www.nytimes.com/2018/07/01/technology/cryptocurrency-ripple.html?rref=collection%2Fsectioncollection%2Ftechnology&action=click&contentCollection=technology&region=stream&module=stream_unit&version=latest&contentPlacement=9&pgtype=sectionfront"_blank">https://www.nytimes.com/2018/07/01/technology/cryptocurrency-ripple.html</a>\n</p> \n\n';

  var blogpost1 = '\n  <p class="quote">A vast majority of the half-million bodies in the inner asteroid belt may in fact be shrapnel from as few as five parent bodies called "planetesimals," scientists say. But the tangled orbits of those lost worlds meant they were doomed to collide, producing fragments that also collided, producing still more fragments in a cataclysmic cascade that\'s been going on for more than 4 billion years.<sup>1</sup></p><p> \n</p>\n';

  var blogcite1 = '<p class="footnotes">1. <a href="https://www.washingtonpost.com/news/speaking-of-science/wp/2018/07/03/many-asteroids-might-be-remnants-of-five-destroyed-worlds-scientists-say/?noredirect=on&utm_term=.4f1e000cc632"   target="_blank">https://www.washingtonpost.com/news/speaking-of-science/wp/2018/07/03/many-asteroids-might-be-remnants-of-five-destroyed-worlds-scientists-say/?noredirect=on&utm_term=.4f1e000cc632</a>\n</p> \n';
  var url = [{ id: '24',
    did: '07-28-18',
    date: 'July 28-29, 2018<br />Weekend',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: '',
    post: blogpost24,
    blogcite: blogcite24
  }, {
    id: '23',
    did: '07-27-18',
    date: 'July 27, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Hooray for Planet Green!',
    post: blogpost23,
    blogcite: blogcite23
  }, {
    id: '22',
    did: '07-26-18',
    date: 'July 26, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Bot Mercenaries:<br />',
    title: 'As Long as I Can Feel the Beat, Baby I don\'t Need Dollar Bils to Have Fun Tonight<br /><span class="pull-left"> - Sia',
    post: blogpost22,
    blogcite: blogcite22
  }, {
    id: '21',
    did: '07-25-18',
    date: 'July 25, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Bot Mercenaries:<br />Armies of Secret Shoppers',
    post: blogpost21,
    blogcite: blogcite21
  }, {
    id: '20',
    did: '07-24-18',
    date: 'July 24, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Bot Mercenaries:<br />Warrior Bots in Space',
    post: blogpost20,
    blogcite: blogcite20
  }, {
    id: '19',
    did: '07-23-18',
    date: 'July 23, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Amazon\'s Prime Day Scaling Slip and Recovery:<br />A How-To Guide to Graceful Error Handling',
    post: blogpost19,
    blogcite: blogcite19
  }, {
    id: '18',
    did: '07-21-18',
    date: 'July 21-22, 2018<br />Weekend',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Cloud Wars, Part III:<br />Creativity that Turns on a Dime',
    post: blogpost18,
    blogcite: blogcite18
  }, {
    id: '17',
    did: '07-20-18',
    date: 'July 20, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Cloud Wars, Part II:<br />EZ-Commerce ',
    post: blogpost17,
    blogcite: blogcite17
  }, {
    id: '16',
    did: '07-19-18',
    date: 'July 19, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Cloud Wars, Part I:<br />Behomeths from Across the Sea  ',
    post: blogpost16,
    blogcite: blogcite16
  }, {
    id: '15',
    did: '07-18-18',
    date: 'July 18, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'By the Light of Ethereum',
    post: blogpost15,
    blogcite: blogcite15
  }, {
    id: '14',
    did: '07-17-18',
    date: 'July 17, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Annual Prime Day , Part II:<br /> The Credit Card Hangover',
    post: blogpost14,
    blogcite: blogcite14
  }, {
    id: '13',
    did: '07-16-18',
    date: 'July 16, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Prime Day\'s Annual All-You-Can-Eat Buffet, Part I<br />',
    post: blogpost13,
    blogcite: blogcite13
  }, {
    id: '12',
    did: '07-14-18',
    date: 'July 14-15, 2018<br />Weekend',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'Crypto Valley, Switzerland',
    post: blogpost12,
    blogcite: blogcite12
  }, {
    id: '11',
    did: '07-13-18',
    date: 'July 13, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Simple is better than Complex. Complex is Better than Complicated.<br /><small>--Tim Peters</small>',
    post: blogpost11,
    blogcite: blogcite11
  }, {
    id: '10',
    did: '07-12-18',
    date: 'July 12, 2018',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now.',
    title: 'Tools of the A.I. Trade, Part III:<br />  Operation Architecture Drilldown',
    post: blogpost10,
    blogcite: blogcite10
  }, {
    id: '9',
    did: '07-11-18',
    date: 'July 11, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Tools of the A.I. Trade, Part II:<br />Machine Learning\'s Pedal to the Metal',
    post: blogpost9,
    blogcite: blogcite9
  }, {
    id: '8',
    did: '07-10-18',
    date: 'July 10, 2018',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now.',
    title: 'Tools of the A.I. Trade, Part I: <br />The Proliferation of Machine Learning Modeling Libraries ',
    post: blogpost8,
    blogcite: blogcite8
  }, {
    id: '7',
    did: '07-09-18',
    date: 'July 9, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: '187 million Snapchat Users and Enquiring Minds want to Know: Did Multiple Clusters Fail at once?...or is there Foul Play?',
    post: blogpost7,
    blogcite: blogcite7
  }, {
    id: '6',
    did: '07-07-18',
    date: 'July 7-8, 2018<br />Weekend',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Theories of Extropy <sup>0</sup>',
    post: blogpost6,
    blogcite: blogcite6
  }, {
    id: '5',
    did: '07-06-18',
    date: 'July 6, 2018',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now.',
    title: 'The Canadian Mafia, Part II.<br />Data Better Recollected',
    post: blogpost5,
    blogcite: blogcite5
  }, {
    id: '4',
    did: '07-05-18',
    date: 'July 5, 2018',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now.',
    title: 'The Canadian Mafia, Part I.<br /> On the Good-Natured Vision of the Godfathers of A.I.',
    post: blogpost4,
    blogcite: blogcite4
  }, {
    id: '3',
    did: '07-04-18',
    date: 'July 4, 2018',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now.',
    title: 'Training Data, Big and Beloved Data<br />Big Data\s Most Notorious Rule-Breaker and Rule-Enforcer: A.I.',
    post: blogpost3,
    blogcite: blogcite3
  }, {
    id: '2',
    did: '07-03-18',
    date: 'July 3, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'What\'s Behind the Rebirth of the Nation-State?<br />There\'s a <i>Blockchain DAPP</i> for that!',
    post: blogpost2,
    blogcite: blogcite2
  }, {
    id: '1',
    did: '07-02-18',
    date: 'July 2, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Celestial Bodies: Always Out to Impress!',
    post: blogpost1,
    blogcite: blogcite1
  }];

  for (i = 0; i < url.length; i++) {
    var cat = ' \n    <div id="' + url[i].did + '" class="blogDiv"> \n    <hr />  \n    <a href="#top"><button>Top</button></a>  \n    <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n    <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5> \n    <p id="author" class="  author">' + url[i].author + '</p>   \n    <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n    <h6  id="title"   class="dailytitle chapternumber">' + url[i].title + '</h6>\n    <br />\n    <div id="post">' + url[i].post + '\n    </div>\n    <div id="blogcite">' + url[i].blogcite + '\n    </div>';
    document.getElementById("paragraph-july").innerHTML += cat;
  }

  var i;
  for (i = 0; i < url.length; i++) {
    var catMod = '\n  <div id="mod_' + url[i].did + '" class="blogDivMod"> \n  <hr />  \n  <a href="#top-mod"><button>Top</button></a>   \n  <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n  <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5>  \n  <p id="author" class="  author">' + url[i].author + '</p>   \n  <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n  <h6  id="title"   class="dailytitle cha-pternumber">' + url[i].title + '</h6>\n  <br />\n  <div id="post">' + url[i].post + '</div>\n  </div>\n <div id="blogcite">' + url[i].blogcite + '\n </div>';
    document.getElementById("paragraph-july-mod").innerHTML += catMod;
  }

  // console.log(angular.toJson(url));
};
bloggerJuly();

/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bloggerJune = function bloggerJune() {

  var blogpost14 = '\n<p class="quote"><i>\nAll people going to the International Space Station must do so through Kazakhstan today. Since the space shuttle retired in 2011, there\'s no other ship capable of carrying people up there besides Soyuz, the Russian workhorse of many decades. NASA purchases seats for its astronauts; each mission is worth tens of millions of dollars. But the situation is going to change soon. \nTwo companies \u2014 Boeing and SpaceX \u2014 are developing commercial crew vehicles to carry astronauts to the ISS. They should start flying crews in the next year or two...</i><sup>1</sup>\n</p>\n<p class="firstparagraph">If there is ever a global stage marked by camaderie besides the World Cup, space would have to take a strong 2nd place--ISS collaboration breaks all bounds! But what\'s really going on with that place anyway? Past 2024--apparently not much, but that\'s because the moon is going on ...</p>\n<p class="quote">The latest [Congressional Budget Office\'s] request has no money for the space station past then[2024]. That\'s so that NASA can focus its resources on the Deep Space Gateway, a lunar space station that plays a part in the administration\'s request to send astronauts to the moon again before going on to Mars.\n<br /><br />\nThe Europeans have expressed some interest in the Deep Space Gateway, but as for [Russian] Roscosmos, their direction is unclear. The [Russian] agency could join NASA on another space station, go on its own, or ally itself with newer space powers (such as China) for other work.<sup>1</sup>\n</p>\n<p>Besides the moon, I wouldn\'t be opposed to a year-and-a-half long trip to Mars--so long as I had plenty of reading material, and a round-trip ticket!\n';
  var blogcite14 = '\n<p class="footnotes">1. <a href="https://www.space.com/41038-roscosmos-russian-space-strategy-commercial-crew.html"   target="_blank">https://www.space.com/41038-roscosmos-russian-space-strategy-commercial-crew.html</a>\n</p>   \n';
  var blogpost13 = '\n<p class="firstparagraph">If there was ever a thing called "Continuing Education," that thing has become a learning, thinking mandate in the modern professional world. Learning to work side-by-side with our A.I. "automation workmates" has become a somewhat paradoxical burden whereby the more we learn, the more we get to shovel our work onto our <i>Ever-Cheerful automators</i>, and this is the least onerous burden I have ever had to bear...</i> It\'s called the <i>Abolition of boring tasks!</i> </p>\n<p>Many writers have touched on the freedom that digital automation affords us: The repetitive, mundane (i.e. mindless) tasks that once occupied days and weeks of our time can now be evaporated away in hours when we just ask for help from our digital automotons--but we first have to ask! </p>\n<p>And so, the work is no longer the work we do: <i>Our work is learning new digitally automated short-cuts, hacks, and clever work-arounds to better shovel the work off to our automotons</i>. But we can only be so clever, and so we have to learn to be more clever: hence the latest rage from colleges and universities with programs offering \'perpetual learning.\' The Washington Post reports,</p>\n<p class="quote">\n\nIn the future of work, robots are supposed to wipe out tons of jobs, create a bunch of new ones or deliver some combination of both. Economists predict any of these scenarios will force the average worker to do practically the same thing throughout their careers: keep learning and learning and learning.\n<br /><br />\nSome colleges in the United States are already preparing for this age of perpetual education, including the University of Michigan\u2019s Ross School of Business. The Ann Arbor school launched a scholarship program that pays for graduates to take classes there forever, and the number of students is slowly growing.<sup>1</sup></p>\n<p>\n<p>But what really is the time-scale on this big transformation? Most things operate like they always have, and honestly, maybe we can be a little more picky about what, how, and <strong>why  we "optimize" the things we do. But that kind of old-fashioned Ludditism is not the age we live in. Today, everything has to change to stay compatible!  A more telling detail from the New York Times:</p>\n<p class="quote">And we\u2019ve digitized only about 20 percent of the economy, meaning there\u2019s tremendous technological climate change yet ahead. These climate changes are reshaping the ecosystem of work \u2014 wiping out huge numbers of middle-skilled jobs \u2014 and this is reshaping the ecosystem of learning, making lifelong learning the new baseline for advancement.<sup>2</sup></p>\n<p>20%? Really? So, it sounds like our productivity is <i>inversely proportional to work <strong>we</strong> do</i>, but rather the work--boring, mundane work--that we can effectively hand off to our automon partners--whatever the sector.  \n\n';
  var blogcite13 = '\n\n<p class="footnotes">1. <a href="https://www.nytimes.com/2018/06/26/opinion/political-parties-climate.html"   target="_blank">https://www.nytimes.com/2018/06/26/opinion/political-parties-climate.html</a>\n</p> \n<p class="footnotes">2. <a href="https://www.washingtonpost.com/news/wonk/wp/2018/06/06/in-the-future-college-never-really-ends/?noredirect=on&utm_term=.4d7810952eb7"   target="_blank">https://www.washingtonpost.com/news/wonk/wp/2018/06/06/in-the-future-college-never-really-ends/?noredirect=on&utm_term=.4d7810952eb7</a>\n</p>  \n\n';

  var blogpost12 = '\n<p class="firstparagraph">Obnoxious misuse of A.I.Tech is a rare thing because developers are among the smartest and most humane among all professions, if I my humbly claim.  But <i>Tech consumers are not necessarily bound by such thoughtful solidarity.</i> The following exemplifies the darker side of A.I. tech...                                          </p>\n<p class="quote">Cogito is one of several companies developing analytics tools that give agents feedback about how conversations with customers are going. Its software measures in real time the tone of an agent\u2019s voice, their speech rate, and how much each person is talking, according to Dr. Place. \u201CWe measure the conversational dance,\u201D he says.\n\nThat dance is sometimes out of sync, such as when an agent speaks too quickly or too much, cuts a customer off, has extended periods of silence or sounds tired.\n<br /><br />\nWhen the software detects these mistakes, a notification pops up on a window on an agent\u2019s screen to coax them to change their strategy. The alerts are useful not just for the agents, but also for their supervisors, Cogito says.<sup>1</sup></p>\n<p>For all the fanfare of A.I. and Learning algorithms, let\'s hope that those who wield such power will not yield to obnoxious misuse. Famed Sociologist Max Weber wrote on the over-rationalizing tendencies of bureaucratic devotion to mass production. He calls it the iron shell, and the ... </p>\n<p class="quote">"more complex idea that Weber himself sought to evoke with the "shell as hard as steel": a reconstitution of the human subject under bureaucratic capitalism in which "steel" becomes emblematic of modernity ... Further, whereas a cage confines human agents, but leaves their powers otherwise intact, a "shell" suggests ... a new kind of being.</i>" <sup>2</sup></p>\n<p>This 19th century sociologist Dr. Weber lived in simpler times, pre-dating the 1910\'s  industry-wide adoption of "Tayloristic" calculations in factory settings for optimized and maximum efficiency--all invented by a Factory Supervisor named Frederick Taylor, armed with a pencil and a heavy-duty clipboard!\n</p><p>\nNow imagine starting a new job with a feisty robot, as one proud supervisor proclaims: <i>"One of her 14 agents said the software noticed he wasn\u2019t speaking with enough energy, so it prompted him with a message to pep up plus a coffee-cup icon, she says." </i><sup>1</sup>\n</i> The horror, the horror.</p>\n</p>\n';
  var blogcite12 = '\n\n\n<p class="footnotes">1. <a href="https://www.wsj.com/articles/call-center-agents-get-a-human-touch-1528984801?mod=foesummaries"   target="_blank">https://www.wsj.com/articles/call-center-agents-get-a-human-touch-1528984801?mod=foesummaries</a>\n</p> \n<p class="footnotes">2. <a href="https://www.jstor.org/stable/2678029?seq=1#page_scan_tab_contents"   target="_blank">https://www.jstor.org/stable/2678029?seq=1#page_scan_tab_contents</a>\n</p> \n';
  var blogpost11 = '\n<p class="firstparagraph">As if Apple needed any more money--now Samsung will be writing a half-billion dollar check to right the wrongs of patent infringement and "slavish" copying.<sup>1</sup> Well, history certainly repeats itself as it was IBM that played the relentless copy-cat of Apple\'s technological leadership way-back-when. \n</p>\n\n<p class="quote">Apple Inc and Samsung Electronics Co Ltd on Wednesday settled a seven-year patent dispute over Apple\u2019s allegations that Samsung violated its patents by \u201Cslavishly\u201D copying the design of the iPhone.<br /><br />In May, a U.S. jury awarded Apple $539 million, after Samsung had previously paid Apple $399 million to compensate for patent infringement. Samsung would need to make an additional payment to Apple of nearly $140 million if the verdict was upheld.<sup>1</sup>\n</p><p class="paragraph">Isn\'t it true that Apple is made by and wholly devoted to the Creatives from every sector? And thus the Creator will inevitably create followers ... I guess in retrospect my various Samsung phones and products have been "inspired" by Apple...so close, yet so far away--another case of the six-degrees of connections to a celebrity! \n</p>\n<p>My love affair with Apple products is still riding the pink cloud--less than a year now. I have the good luck to use a Macbook Pro that feels, types, and views like a sports car. You can rev the engine by running some heavy-duty map imaging from data calculations--<i>talk about the MacBook\'s grace and power, when lo, your root is sitting right on top of a Linux Shell. These words come from a 25-year serf to Microsft\'s ownership.</i> The feel of a 1967 Corvette with very little between you and 350 Horse Power. I honestly haven\'t experienced this high quality since the first time I listened to Radiohead on my friend\'s new I-pod in 2007.  \n</p>\n<p>An Ode to Apple products: Apple! You are our Creative Leadership and your Apple Watch is beyond our realm--a postcard from another world. Apple, you alone bear the high standard of quality tech products--because you, Apple, do occupy the highest, and wealthiest, seat among the Tech Giants!\n</p>\n';

  var blogcite11 = '\n<p class="footnotes">1. <a href="https://www.reuters.com/article/us-apple-samsung-elec/apple-samsung-settle-u-s-patent-dispute-idUSKBN1JN2S4"   target="_blank">https://www.reuters.com/article/us-apple-samsung-elec/apple-samsung-settle-u-s-patent-dispute-idUSKBN1JN2S4</a>\n</p> \n\n';
  var blogpost10 = '\n<p class="firstparagraph">5G Technology, ever so close to life-changing implementation, conjures up fantastic musing over how our everyday products will interact in real-time with our personalized data-cloud. Certainly IoT (Internet of Things) products will be carrying a whole lot of machine-to-machine to machine communication. From the IoT edge (encircling a router, for instance) to communicate sensors to mid-range "listeners".</p>\n<p>So, although Sprint-T-Mobile Oneness spells monopoly, the scale of work that needs to be done to convert everything to 5G <i>means we Need a great tech innovator like T-Mobile\'s John Legere to push with fervor the right ways to deliver 5G connectivity to every American, anywhere.</i> My<a href="#18-04-27"> April 27 post</a> talks more on their affair, but the reality is that Sprint doesn\'t contribute value to American innovation; that claimed, <i>Sprint\'s bandwidth rights and spare parts really <strong>will truly</strong>  add value</i> to American Tech!</p>\n';
  var blogcite10 = '<p class="footnotes">1. <a href="https://www.reuters.com/article/us-sprint-corp-m-a-t-mobile-us/sprint-t-mobile-defend-proposed-tie-up-before-u-s-senate-panel-idUSKBN1JN33A"   target="_blank">https://www.reuters.com/article/us-sprint-corp-m-a-t-mobile-us/sprint-t-mobile-defend-proposed-tie-up-before-u-s-senate-panel-idUSKBN1JN33A/a>\n</p> \n';

  var blogpost9 = '\n<p  class="firstparagraph">\nWhy the GPU rather than CPU for speed? 90% of deep learning algorithms use distributed, parallel problem-calculations. So, who needs a steering wheel racing on the Bonneville Salt Flats? Certain kinds of algorithms do, though, such as recursive, tree-traversing kinds. But I\'m just a tourist.\n</p> \n\n<p class="quote"><i>\n[Alex Khrizhevsky] says he recalls reading some paper about matrix multiplication algorithms on the GPU (I don\u2019t know the specific one), and basically the idea he had at the time was just to re-implement the original Lenet architecture[1], but use the GPU to train a network (of unprecedented size in 2012) really fast.\n</i><sup> 1</sup></p>\n\n<p>Evolution of these new AI\'s, and AI\'s designing AIs, require voracious amounts of training data to implement and improve learning designs.  So where would AI research stand if not for the ultra-fast and efficient modern-day Graphical Processing Unit? Better asked, what inspired Krizhevski\'s novel, paradigm-shattering design?  Clearly <i>the Need for Speed!</i> </p>\n \n  ';
  var blogcite9 = '\n<p class="footnotes">1. <a href="https://www.quora.com/How-did-Alex-Krizhevsky-come-up-with-the-idea-of-AlexNet-How-does-the-designer-think"   target="_blank">https://www.quora.com/How-did-Alex-Krizhevsky-come-up-with-the-idea-of-AlexNet-How-does-the-designer-think</a>\n</p>\n\n \n';
  var blogpost8 = '  <p class="quote"><i>\nDeep learning allows computational models that are composed of multiple processing layers to learn representations of data with multiple levels of abstraction. These methods have dramatically improved the state-of-the-art in speech recognition, visual object recognition, object detection and many other domains such as drug discovery and genomics. Deep learning discovers intricate structure in large data sets by using the backpropagation algorithm to indicate how a machine should change its internal parameters that are used to compute the representation in each layer from the representation in the previous layer. Deep convolutional nets have brought about breakthroughs in processing images, video, speech and audio, whereas recurrent nets have shone light on sequential data such as text and speech.</i><sup>1.</sup>\n</p> \n  <p class="firstparagraph">Artificial Intelligence has evolved from a prototypal event known as the "Cambrian Explosion, only five years ago."<sup>1</sup> An architect named Alex Krizhevsky offered a new paradigm for <i>deep learning</i> at an image recognition event, Imagenet Competition. Mr. Krizhevsky\'s "Alex Net" became the pivotal <i>Convolutional Neural Network</i>, with a mere 8 layers\' depth (think of the decision tree mentioned in post 6/20) &amp; millions of parameters. </p>\n\n<p>The handwriting-signature recognition algorithm is still in use today! The design--using a training technique called "Stochastic Gradient Descent", by Geoff Hinton--blew the competition away and revolutioned machine learning. </p>\n<p>Today, neural netwoks boast <i>hundreds of layers and billions of paremeters: The last five years has been busy!</i> And the varied species of designs since the original Convolutional Neural Network (CNN) include Recurrent Neural Networks (RNN), Generative Adverserial Networks (GAN) and Reinforcement Learning.\n</p> \n';
  var blogcite8 = '<p class="footnotes">1. <a href="https://www.nature.com/articles/nature14539"   target="_blank">https://www.nature.com/articles/nature14539</a>\n</p> \n\n<p class="footnotes">2. <a href="https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks"   target="_blank">https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks</a><br />\nPDF:  <a href="https://www.nvidia.cn/content/tesla/pdf/machine-learning/imagenet-classification-with-deep-convolutional-nn.pdf"   target="_blank">https://www.nvidia.cn/content/tesla/pdf/machine-learning/imagenet-classification-with-deep-convolutional-nn.pdf</a>  \n</p> \n';

  var blogpost7 = '  <p class="quote"><i>I sat one evening in my laboratory; the sun had set, and the moon was just rising from the sea; I had not sufficient light for my employment, and I remained idle, in a pause of consideration of whether I should leave my labour for the night, or hasten its conclusion by an unremitting attention to it. As I sat, a train of reflection occurred to me, which led me to consider the effects of what I was now doing. <br />\n  <br />\n  --Victor Frankenstein<sup>1</sup>\n  </i><br /> \n</p>\n<p class="firstparagraph">Nvidia\'s latest 12" by 4" by 4" GPU accelerates algorithmic work from 1<sup>1/2</sup> months to 4 days. The most recent exponential leaps in computing power--most notably for A.I. purposes, are thanks only to the Graphical Processing Unit. Progress followed a linear path in as 1998 world, a world enlightened by the pivotal A.I. publication, "Convolutional Neural Netowrks for Handwritten Digital Recognition" (Lecun, Bottou, <strong>Bengio</strong>, Haffner, 1998) to the present use in blockchain computing and deep learning algorithms, among many other purposes. The technical advantage offered by Nvidia explained by 2012\'s "ImageNet Classification with NVIDIA GPUs (Krizhevsky, Hintou, et al.). Ten years ago, Daniele G. Spamintato and Anne C. Elstery offer a succinct explanation:\n</p>\n<p class="quote">Optimization algorithms are becoming increasingly more important in many areas, such as finance and engineering. Typically, real problems involve several hundreds of variables, and are subject to as many constraints. Several methods have been developed trying to reduce the theoretical time complexity. Nevertheless, when problems exceed reasonable sizes they end up being very computationally intensive. Heterogeneous systems composed by coupling commodity CPUs and GPUs are becoming relatively cheap, highly performing systems.\n<br />\n<br /> Recent developments of GPGPU technologies give even more powerful control over them. In this paper, we show how we use a revised simplex algorithm for solving linear programming problems originally described by Dantzig for both our CPU and GPU implementations. Previously, this approach has showed not to scale beyond around 200 variables. However, by taking advantage of modern libraries such as ATLAS for matrix-matrix multiplication, and the NVIDIA CUDA programming library on recent GPUs, we show that we can scale to problem sizes up to at least 2000 variables in our experiments for both architectures. On the GPU, we also achieve an appreciable precision on large problems with thousands of variables and constraints while achieving between 2X and 2.5X speed-ups over the serial ATLAS-based CPU version. With further tuning of both the algorithm and its implementations, even better results should be achievable for both the CPU and GPU versions.<sup>2</sup></p>\n<p>So, given the exponential development advantages of GPU use, it\'s clear the horizon for more and more developers implicates high computing needs.  So, what exactly is novel yet increasingly a household developer tool? </p>\n<p class="quote">\nCUDA\xAE is a parallel computing platform and programming model developed by NVIDIA for general computing on graphical processing units (GPUs). With CUDA, developers are able to dramatically speed up computing applications by harnessing the power of GPUs.<br /><br />\n\nIn GPU-accelerated applications, the sequential part of the workload runs on the CPU \u2013 which is optimized for single-threaded performance \u2013 while the compute intensive portion of the application runs on thousands of GPU cores in parallel. When using CUDA, developers program in popular languages such as C, C++, Fortran, Python and MATLAB and express parallelism through extensions in the form of a few basic keywords.\n<br /><br />\nThe CUDA Toolkit from NVIDIA provides everything you need to develop GPU-accelerated applications. The CUDA Toolkit includes GPU-accelerated libraries, a compiler, development tools and the CUDA runtime.\n<sup>3</sup></p>\n<p>And, this tech is arriving at both the mainstream PC-optimization level as much as typical university research, the potential of both laid out in a June 2018 Wired Magazine article:</p>\n<p class="quote">PCs that work on smartphone parts. Devices that run all day, but for real this time. A 32-core hellbeast processor. The first GPU shrunk down to a 7nm process. Always-connected 5G laptops. And while not a PC, the ASUS ROG put vapor cooling in gaming-focused smartphone. (Vapor cooling. In a smartphone.) \n<br /> . . .\n<br />And then there\'s arguably the real star of the show, an AMD prototype of the first-ever GPU built on a 7nm process. Unlike some of the other blockbuster announcements out of Taipei this week, this one won\'t make its way to your computer any time soon. It\'ll find a home in data centers, helping AI and machine learning compute at blistering speeds, using a lot less energy to do so.<sup>4</sup>\n  </p>\n  <p>And so, with blistering speed and the joining of disciplines of science, the spear\'s tip of innovation accelerates ... without a spare nanosecond for reflection!\n  ';

  var blogcite7 = '<p class="footnotes">1. Frankenstein, or Modern Prometheus, Mary Shelley, 1818. <br /><a href="https://www.gutenberg.org/files/84/84-h/84-h.htm"   target="_blank"> PDF https://www.gutenberg.org/files/84/84-h/84-h.htm</a>\n  </p>  \n  \n  <p class="footnotes">2.  <a href="https://www.gutenberg.org/files/84/84-h/84-h.htm"   target="_blank">2009 IEEE International Symposium on Parallel & Distributed Processing</a>\n  </p>  \n  <p class="footnotes">3.  <a href="https://developer.nvidia.com/cuda-zone"   target="_blank">https://developer.nvidia.com/cuda-zone</a>\n  </p> \n     <p class="footnotes">4.  <a href="https://www.wired.com/story/computex-2018-new-chips-qualcomm-amd-intel/"   target="_blank">https://www.wired.com/story/computex-2018-new-chips-qualcomm-amd-intel/</a>\n  </p>  \n  \n  ';

  var blogpost6 = '\n  <p class="firstparagraph">\n  <p class="firstparagraph">Small, online businesses face the music today to pay state sales taxes, thanks to the Supreme Court\'s <i>Wayfair V. South Dakota</i>.<sup>2</sup> My <a href="#18-04-14">April 14th var blog</a>, <i>Clash of the Brick &amp; Mortars against Online Stores</i> goes more in depth... </p>\n  <p>What this means is that imminently, 50 variations of newly permitted State internet sales taxes for small businesses.<sup>2</sup> This will inevitably hurt variety, and likely lead to a lot of inter-state confusion: </p>\n  <p class="quote">The new law may seem straightforward, but there are fairly complicated specifics when it comes to different jurisdictions and categorization of goods.\n<br /><br />\n  For example, New Jersey places a tax on marshmallows, which are considered candy and a luxury, but they don\u2019t tax marshmallow fluff which is considered food. In some states Kitkat bars are categorized as food because they contain flour, but a snickers bar is candy. Meanwhile a snickers ice cream bar, which needs to be refrigerated, would be considered food and not taxed.<sup>1</sup></p>\n  <p>Small, online businesses: Get your calculators ready!\n  </p> \n ';

  var blogcite6 = ' \n  <p class="footnotes">1.  <a href="https://www.forbes.com/sites/advisor/2018/06/21/state-sales-tax-which-states-are-most-affected-by-the-supreme-court-online-retail-ruling/#791a05383e66"   target="_blank">https://www.forbes.com/sites/advisor/2018/06/21/state-sales-tax-which-states-are-most-affected-by-the-supreme-court-online-retail-ruling/#791a05383e66</a>\n  </p> \n  \n  <p class="footnotes">2.  <a href="http://money.cnn.com/2018/06/21/technology/wayfair-vs-south-dakota/index.html"   target="_blank">http://money.cnn.com/2018/06/21/technology/wayfair-vs-south-dakota/index.html</a>\n  </p> \n  \n  ';
  var blogpost5 = ' \n  <p class="firstparagraph">What difference does it make for Net Neutrality to morph into 50 different variations now that the neutrality protections leave the federal arena to fall into  state legislation?<sup>1</sup> Who can tell. Unfortunately, a potential micro-balkanization of bandwith rules within an interdependent network doesn\'t spell faster service for anyone. </p>\n  \n  <p>\n  What people seem to forget is that the key win for the 2015 net neutrality laws were merely <i>a small reflection of the larger significance of <strong>the net\'s reclassification as a service, like water, natural gas, and electricity.</i></strong> State legislators need to focus on the air we breathe as critical to providing enough at reasonable cost, to merely survive in the times.</p>\n  <p>After all, the internet venues are what color the web...the last thing we need is the vast and varied imagination of 5 umbrella content-providers. Wired Magazine makes a good point that </p>\n  <p class="quote">California\'s current legislative debates may lead the precedent for others, more influential than Seattle\'s--California\'s economy is equally sized with France at 2.5 trillion. \n  <br />\n  <br />[California State Senator Scott Wiener\'s] original bill included all the major provisions of the FCC\'s old rules, which banned broadband providers from blocking, throttling, or otherwise discriminating against lawful content. But it went further than the FCC rules by banning companies from blocking or throttling content as it enters their network from other networks, under so-called interconnection agreements.<sup>2</sup> </p>   \n  <p>The Internet, after all, is a Network, and a network is by definition a singular entity.</p>\n  ';

  var blogcite5 = ' \n  <p class="footnotes">1.  <a href="http://www.latimes.com/politics/la-na-pol-court-online-taxes-20180621-story.html"   target="_blank">http://www.latimes.com/politics/la-na-pol-court-online-taxes-20180621-story.html</a>\n  </p>\n  <p class="footnotes">2.  <a href="https://www.wired.com/story/california-net-neutrality-bill-was-hijacked-lawmaker-says/"   target="_blank">https://www.wired.com/story/california-net-neutrality-bill-was-hijacked-lawmaker-says/</a>\n  </p>\n    ';

  var blogpost4 = '<p class="quote"><i>\n  They left The Denver Post amid newsroom layoffs and interference in the editorial process by the newspaper\u2019s hedge-fund owners. And now those reporters and editors are creating their own news outlet, The Colorado Sun.  They will be partnering with the Civil Media Company, an ambitious New York start-up that aims to use blockchain technology and crypto economics to start 1,000 publications nationwide by the end of the year. </i>\n  <br /><br />- New York Times, June 17, 2018</p><br />\n  <p class="firstparagraph">Power from the 4th Estate tends to flow in the form of printers\' ink, however Blockchain Tech empowers journalists with  new resources for their trade: free money and data, and more importantly, an empowered readership in Cooperative form: \n  </p>\n  <p class="quote">\n  The new publication will have a conventional website whose data will be written permanently into the secure digital ledger known as the blockchain. Expenses for the fledgling outlet will be covered by a grant from Civil, whose sole investor, for now, is ConsenSys, a Brooklyn-based blockchain software technology company founded by the Canadian entrepreneur Joseph Lubin. Mr. Lubin is also a co-founder of the Ethereum, a virtual currency and blockchain database platform. As part of its plan to fund new media entities, Civil plans to unveil a new token this summer called CVL.\n<br /><br />\nPeople who purchase the CVL token, a form of cryptocurrency, will have a say concerning the projects hosted by Civil \u2014 meaning that they can vote on whether one of its websites violates the company\u2019s journalism standards, which are outlined in the Civil Constitution.<sup>1</sup> \n  </p>\n  <p>Who would have guessed that through Crypto-Currency for money and Distributed Ledger Tables for data, modern Journalism would rise from the ashes of tech-induced impoverishment and so-called \'fake-news\' delegitimization to regain limitless ink for influence, with a renewed and democratized legitimacy.  <br />\n  <br />\n  Thank you, Blockchain, for restoring Truth to Power!\n  </p>\n  ';

  var blogcite4 = '\n  <p class="footnotes">1.  <a href="https://www.nytimes.com/2018/06/17/business/media/denver-post-blockchain-colorado-sun.html"   target="_blank">https://www.nytimes.com/2018/06/17/business/media/denver-post-blockchain-colorado-sun.html</a>\n  </p>\n  \n  ';
  var blogpost3 = '<p class="firstparagraph">Deep Learning--a 70\'s thing--clearly predates   personal computing, the web, and even the 70\'s Show. But the true advances have been a long time in development, and credit belongs to Statistics and Data Science, and specifically quantitative analysis\' ever cleverer classification trees that deliver the goods with greater accuracy, coupled with less intensive computing costs. And this origin is interesting in itself: </p>\n <p class="quote">\nFifty years have passed since the publication of the first regression tree algorithm. New techniques have added capabilities that far surpass those of the early methods. Modern classification trees can partition the data with linear splits on subsets of variables and fit nearest neighbor, kernel density, and other models in the partitions ... <br />\n<br />Classification And Regression Trees (CART) (Breiman et al., 1984) was instrumental in regenerating interest in the subject. It follows the same greedy search approach as  Automatic Interaction Detection (AID) and THeta Automatic Interaction Detection (THAID), but adds several novel improvements. Instead of using stopping rules, it grows a large tree and then prunes the tree to a size that has the lowest cross-validation estimate of error. The pruning procedure itself is ingenious, being based on the idea of weakest-link cutting, with the links indexed by the values of a cost-complexity parameter. This solves the under-fitting and over-fitting problems of  AID and THeta Automatic Interaction Detection (THAID), although with increased computation cost.<sup>1</sup>\n</p>\n<p>Today, Machine Learning curricula usually begin with the same sample datasets on Iris characteristics (pictured below)</p>\n<img style="min-width:300px;"  src="dist/img/learningData.PNG"><br /><br />\n<p>So how does it really work, in oversimplified terms? Contrary to most algorithms\' step-by-step manual decision-making through for- and while-loops, if-else, and so on, the scalability of design clearly falls off. Enter Deep Learning, which is nothing more mystical than simple classification--i.e. decision--trees. Beginning with a million choices, a decision passes through multiple layers that may or may not be activated, and with each activated layer, a decision is narrowed down, until finally a decision is reached between recognizing a dog and a cat!\n</p><img style="min-width:300px;" src="dist/img/classifTree.PNG">\n</p><img style="min-width:300px;" src="dist/img/classifTree2.PNG"><br /><br />\n<p>And yet, for all of this science, up until 2011, the error rate for simple shape recognition, like say a dog from a cat still averaged a 26% error rate! A mere 7 years later? Today, that error rate averages less than 3% error, most recently due to computing, power, and memory advances.   Those come in handy for delivering a warehouse worth of computing onto your smartphone! That\'s a boon for delivering sensors, i.e. training data, into the environment. My last post mentioned Google\'s upcoming, yet unnamed Android OS...but we do know it\'s a candy that starts with "P"...my guess is Peppermint Patties? Or maybe Pez has more of a ring to it.</p>  \n<p  >\nWhatever the new OS is called, it comes with a developing potential to exponentially advance <i>Tree Science</i>:  ML Kit behaves like an API layer connecting the ML software to the app developers\' models, making dev easy to run and deploy with an "experimental model compression flow that aims to reduce model size (up to orders of magnitudes) while maintaining similar accuracy."<sup>3</sup> Talk about maturing exponentially quickly! Now, this origin story can\'t compete with Wolverine\'s nor Han Solo\'s, but this gem carries a mythical and futuristic potential to satisfy screen-goers from all devices, frame-sizes, and platforms!</p>\n';

  var blogcite3 = '\n\n<p class="footnotes">1. Loh, W. Y. (2014). Fifty years of classification and regression trees. International Statistical Review, 82(3), 329-348.\n<a href="https://onlinelibrary.wiley.com/doi/full/10.1111/insr.12016"   target="_blank">https://onlinelibrary.wiley.com/doi/full/10.1111/insr.12016</a>\n</p>\n\n<p class="footnotes">2. Classification and Regression Trees Leo Breiman, Jerome Friedman, Charles J. Stone, R.A. Olshen (1984).\n<a href="https://www.taylorfrancis.com/books/9781351460491"   target="_blank">https://www.taylorfrancis.com/books/9781351460491</a>\n</p> \n\n<p class="footnotes">3. \n<a href="https://developers.google.com/ml-kit/"   target="_blank"> https://developers.google.com/ml-kit/</a>\n</p>\n<p>Images:Maurice Roux\nUniversit\xE9 Marseille 3\nSaint-J\xE9r\xF4me</p>\n';

  var blogpost2 = '\n<p class="firstparagraph">\nThe upcoming Android \'P\' OS--still in beta and only available on Pixel phones, Essential, and a few others--promises a new era in mobile app development<sup>1</sup>  Most features, like expanding Maps\' indoor functionality, inclusive Emojis, and a revamped navigation bar are all nice, but one element of the build empowers app developers\' access to machine-learning code: \n</p>\n<p class="quote"> With  ML, i.e. machine-learning, Kit, app developers can use Google\u2019s machine learning tasks within their own apps. ML Kit allows developers to use the camera for face detection, landmark recognition, text recognition, and a host of other recognition features.<sup>2</sup></p>\n<p>\nSo, in conceptual terms, this means developing app-data models that are <i>optimized for mobile inference</i>. This means that the long process of acquiring enough training data to optimize an app\'s design or behavior (generally or specifically user personalization), can now be shortened with better quantity and quality of training data &aacute; la machine learning. So in concrete terms, the past 15 years\' of Google ML research is now distilled into (again, still beta) an SDK (software developers\' kit) that facilitates dev integration without needing to hand-make a model to access the run-time environment. \n</p>\n<p>In other words, past server-side inferences now jump to the mobile device, and tap into   on-device machine learning library framework and toolkit--i.e. TensorFlowLite. This jump-starts customized application of machine learning already in production--that is, Android devices\' <i>Neural Networks API</i> and <i>iOS\' Metal</i>.  \n</p>\n<p>What makes this new programming horizon most interesting is that an equally new feature, called "Actions" and "Slices",  allows for certain app features to be accessed by the phone itself outside of the app. A May 8th Verge article explains:\n\n</p>\n<p class="quote">\nGoogle is introducing developers to a couple of terms: \u201CActions\u201D and \u201CSlices.\u201D They are essentially deep links into apps that are able to surface in other parts of the operating system. Actions are analogous to Actions on Google Assistant; Slices are a subset that can show the app\u2019s own UI when you type out a global search on the phone.\n<br /><br />\nThe idea behind both of these concepts is to break out the different pieces of the apps you use into the larger operating system. Samat calls it the \u201Cdecomposition of apps,\u201D though without the connotations of death. \u201CYeah, you want to go the app,\u201D he says, \u201Cbut actually what you want to do is go to your house or reorder from Instacart.\u201D\n<br /><br />\nDevelopers will need to build some frameworks into their apps to make Actions and Slices available to the system. When they do, the AI in Android P will try to understand what those apps can actually do and suggest those actions to you. \u201CWhen you modularize the app, it\u2019s not just an API call,\u201D Samat says. \u201CYou have these components that can be understood by the system, predicted by the system, and then rendered by the system.\u201D<sup>3</sup>\n</p>\n<p>So what does this mean? Better, higher-quality time spent with your work or play, rather than hopping from one icon to the next for each and every task...';
  var blogcite2 = '\n\n  <p class="footnotes">1.\n\n  <a href="https://developer.android.com/preview/devices/"   target="_blank"> https://developer.android.com/preview/devices/</a>\n \n  </p>\n  <p class="footnotes">2.\n\n  <a href="https://www.digitaltrends.com/mobile/google-android-p-news/"   target="_blank"> https://www.digitaltrends.com/mobile/google-android-p-news/</a>\n \n  </p>\n  <p class="footnotes">3.\n\n  <a href="https://www.theverge.com/2018/5/8/17327302/android-p-update-new-features-changes-video-google-io-2018"   target="_blank"> https://www.theverge.com/2018/5/8/17327302/android-p-update-new-features-changes-video-google-io-2018</a>\n \n  </p>\n  ';
  var blogpost1 = '<p class="firstparagraph">Blockchain technologies, i.e. Government contracts, Business contracts, Bitcoin and other\n\ncryptocurrencies, all rely on network graph theory, both on the low-level programming technology (peer-to-peer global\n\nip networks) across the spectrum to high-level interfaces for institutional, corporate, individual needs and uses.\n\nThese blockchain &quot;network&quot; analyses depend on highly variable--and simultaneous--network changes, node\n\nchanges, and link changes; and, the latter three may arbitrarily change interdependantly or not.</p>\n\n\n\n<p>Therefore, blockchain technologies must first accomodate  complex node variables, including one- or two-way contracts (relationships) that\n\n depend on<i> arbitrarily hierarchical mappings and conditional data structures.</i> Secondly, blockchain tech must face analytical\n\nchallenges that arise from informal practices<sup>1</sup><span class="new">--you can survey opinions, but how do you measure whim?</span>\nThe organizational nodes (employees) choose to deviate from their employment roles&#39; protocol <span class="new">because it it is sunny outside, or maybe because the traffic was long today, or because a butterfly\'s wing-swish cooled a rash decision down to reason.  That small detail often trumps statistical patterns of efficiency, convenience, company culture, and multiple other levels of analysis of human factors.</p>\n\n\n\n<p>Sociologists Meyer &amp; Rowan&#39;s (1977)\n\n<i>New Institutionalism</i> explains how employees change practices and decouple\n\n<i>actual</i> organizational structure from recorded rules, as a function of organizational size, time, convenience,\n\netc. Noone can argue against this wall of reason. <span class="new"><i> The problem is not the reason, the problem is the static, frozen wall called Social Science Theory, constructed from a pastiche of different meanings</i> and arbitrary theoretical starting points.  <span class="new">The esteemed Scholar of Comparative Politics, Dr. Ellen M. Immergut, undermined modern sociology concepts in 1998--a logical blow from which Sociology has never recovered (nor yet faced). She writes:</span>\n</p>\n<p class="quote new">\nFurther confusion has arisen because the new institutionalists do not propose one generally accepted definition of an institution, nor do they appear to share a common research program or methodology. In fact, three separate branches of scholarship--rational choice, organizational theory, and historical institutionalism -- all lay claim to the label, seemingly without adhering to an overarching theoretical framework.<sup>3</sup></p>\n<p class="new">\nIn other words, the long-standing Civil War within the discipline of Sociology (beginning with Functionalists\' irreconcilable contradictions of Conflict Theorists\' entire World-View--and vice-versa). From this initial schism begins the disassembling of the discipline--as it stands until today. \nAll of that talent and no single vision to harness a lasting explanatory platform.  And this is <i>before</i> addressing--from a Scientific Method Paradigm--the problem of continually new, unknown constraints on data that must be intimately understood without falling back to the old, "USA Today" habits of \'Theoretical Relativism\'.</p>\n</span>\n<p>\nSo, how do we recognize unwritten, soft rules and behaviors of a bank, a person,\n\nor a company&#39;s internal bot?</p> \n\n<p>The hard sciences domain of Software Engineering, Computer Science, and Mathematics have brilliantly brought the\n\nworld the blockchain tool, based on a <span class="new"><i>technical, numerical aptitude--numeracy--for which the Hard Sciences can and must share and propogate it\'s technical expertise and higher standard of metric truth</i><s style="color:purple" class="strike-purple"> not contribute everything, especially relating with</s> to the other sciences that are still lagging behind--namely The Discipline of Sociology</s> toward acclimating to the modern age\'s social priorities and needs. Ask yourself, how well do 1,000 top blockchain-related programmers understand the multi-dimensional layers of hierarchical social, corporate, and governmental relationship networks--probably 700 of the 1,000. And how many social scientists can understand the technological sciences? Probably 200 out of 1,000. This means that <i>a chunk of the scientific displines suffer from acute innumeracy</i>. So how do we bridge this massive knowledge gap between qualitative meaning in the smart-contract?</span></p>\n\n<p>In the past, the layers of abstraction from raw technological tool to societal use was refined, improved, integrated through multiple layers of &quot;middlemen&quot;, such as lawyers, corporate lawyers, government institutions, non-governmental, non-profit and for-profit actors. Blockchain technology, by its very nature, erases the middlemen. Suddenly, one programmer, for example, is writing the same healthcare insurance crypto-contract, that last month an entire team of hospital employees spent a month writing; then overseeing and managing different facets of this same thing.</p>\n\n\n\n<p>However, the crypto-contract, once deployed to the blockchain, auto-manages the rest, forever or for the life of\nthe contract. Therefore, rather than redoing the trials and errors of 200 years&#39; Sociology Network Analysts&#39;\nresearch and analytical development. <span class="new"> Therefore, much of the social scientists have arrived at the end of the line of technology, still shackled to analog methodology relegated to the Sine and Cosine of progress; while the World leaves it behind, led by the Hard Sciences of Software Engineering--the new social fabric of the 21st Century. So, can the anthropological and social domains survive this existential threat to any authority--that depends if the Hard Sciences, Gatekeepers of Empirical Science will extend an open door and pro-actively share technical instructions for the soft sciences.  Therefore, the social sciences are not safe hiding at home, within the academic\ntower--far removed from the pace of societal and technological change.  \n </p>\n \n\n<p class="new">The point is this: The innumeracy of the Soft Sciences increasingly loses authority, with the less it can prove at the Command Line Interface. So, how will an analog academic field in the early 21st century compete with artifical intelligence? Problems grow exponentially in the modern age, and only the sciences with  machine-learnig on their side can expect to thrive by applying extraordinary applications of machine-learning to network theories. <span class="new">\n Sociologists deal with real-time, logical and hierarchical network mappings that appear arbitrary, yet are characterized by fixed patterns. This implies a higher level of competency to accurately judge a point-of-view without the ability to directly consult machine learning. <i>This is a Code or Be Coded moment in the life trajectory of the social sciences.</i></span></p>\n\n\n\n<p>  <i>the Power  of the Social Sciences, even while paraliyzed, cannot be underestimated:</i> No other academic field than sociology has advanced into the details, and endless network rabbit-holes that characterize societal behavior. Not until this second millenial decade could the marriage of Large Number Statistical Theory\n\nbecome consumated with the brilliance of early 1900&#39;s Sociological French Network Theories, like Maurice Halbswach&#39;s\n\nwork on the clearly defined network patterns of a society&#39;s Collective Memory.</p>\n\n\n\n<p>So, current sociology, having collected and refined knowledge on network arbitrariness, such that Economic&#39;s &quot;irrational\n\nbehaviors&quot; and Mathematical &quot;complexity models&quot; do not\n\n<i>touch to the bone</i> the meaning, the intersectionality of network analysis, which must incorporate simultaneous\n\nnode changes (person gets job /or/ does not get job), network changes (All get jobs /or/ only 3 of 15 network groups\n\nget jobs), and most importantly the\n\n<i>relationship</i> changes (all jobs always useful /or/ half of job groups no longer useful) across time and fixed.</p>\n\n\n\n<p>Fine. So, why is Sociology&#39;s network theory so valuable, yet inaccessible, beyond just the network insights gleaned from 19th and\n\n20th centuries&#39; network problems?  European sociology came of age in the analog social era, while North\n\nAmerican Sociology only recently come of age (Quebec in the 1960&#39;s [post-1968], U.S. in the 1990&#39;s[post-1999],\n\nin the digital social era. Therefore, the problem-solving patterns of past sociology are inherently small-data and\n\nmore qualitative analysis, and thus only Sociology incorporates &quot;human-ness&quot; into the billion rows and\n\ncolumns of quantitative--numbers-only--analysis.</p>\n\n\n\n<p>For example, Oxford-developed S.I.E.N.A. Software accomplishes this task. SIENA--named for Simulation Investigation\n\nfor Empirical Network Analysis--software calculates the real-time values, direction, and conditions of each relationship\n\n(link) in a network, simultaneously as each node, network, or alter-link changes or is changed; with this, it is\n\npossible to isolate directional, conditional\n\n<i>influence change</i> in real-time. Real-time sounds impossible, however, the SIENA documentation\n\n<sup  >2</sup> describes its program algorithm to the statistical analysis of network data, with the focus on social networks.</p>\n\n\n\n<p>An easy example to grasp this is the concept of whether a person\n\n<i>self-selects </i>(e.g., due to subconscious leanings) into a group and thus matches to fruition the group&#39;s\n\nbehavior with little group influence? Or does this same person join a group and emulates the group&#39;s behavior,\n\nby the group&#39;s influence over time. Sociological network analysis, using Snjder&#39;s SIENA software, achieves\n\nthe impossible with the closed, directed graph networks that characterize blockchain technology. The network graph\n\ncan be here understood as entire (complete) networks (i.e, the blockchain in its entirety without hard forks), not\n\nas personal (egocentered) networks: Using this SIENA model allows for the necessary assumptions that a set of nodes\n\n(social actors) is given, and all ties (links) between these nodes are known - except perhaps for a moderate amount \nof missing data</p> \n\n<p>If, and only if, this level of analysis may be achieved, the blockchain development may follow a linear, directed\n\npath of maturity with social and world needs.<span class="new"> Until   Social Science Network Theorists stop from basing their numerical analysis on the mutable sand of theory, rather than theory based on the   foundation of numerical science, <i>any attempt at conclusion...you guessed it...cannot be conclusive.</i>So, the social sciences must consult the hard sciences, otherwise they risk squandering countless years of talented theorists\' work; <i>the discipline\'s executive functions are cut off from it\'s increasingly inaccessible (and increasingly powerful) knowledge base.</i> --Such a talented, powerful Thoroughbred of a Science, that still wanders without a head for technical direction.</span></p>\n';
  var blogcite1 = '\n<p class="footnotes">1. \n<a href="http://www.journals.uchicago.edu/doi/abs/10.1086/226550"   target="_blank"> http://www.journals.uchicago.edu/doi/abs/10.1086/226550</a>\n \n\n</p>\n\n<p> \n2. \n<a href="https://www.stats.ox.ac.uk/~snijders/siena/"  target="_blank"> https://www.stats.ox.ac.uk/~snijders/siena/</a>\n<br />\n<p class="footnotes">3. The Theoretical Core of the New Institutionalism, Ellen M. Immergut: Politics &amp; Society, Vol. 26, Issue I, pp. 5-34 \n<a href="http://journals.sagepub.com/doi/abs/10.1177/0032329298026001002?journalCode=pasa\n"  target="_blank">http://journals.sagepub.com/doi/abs/10.1177/0032329298026001002?journalCode=pasa\n</a>\n</p>\n';

  var url = [{
    id: '14',
    did: '06-30-18',
    date: 'June 30-July 1, 2018<br />Weekend ',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'The Space Powers that Be:<br />When Boeing issues a Ticket to the Moon',
    post: blogpost14,
    blogcite: blogcite14
  }, {
    id: '13',
    did: '06-29-18',
    date: 'July 29, 2018',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now',
    title: 'A.I. &amp; Work, Part II<br />Learning to Learn alongside a Cheerful Automoton Work-Partner',
    post: blogpost13,
    blogcite: blogcite13
  }, {
    id: '12',

    did: '06-28-18',
    date: 'June 28, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now',
    title: 'A.I. &amp; Work, Part I<br />Fighting Obsessive Compulsive Quantitative Optimization Disorder and the Slide into a Weberian Iron Shell',

    post: blogpost12,
    blogcite: blogcite12
  }, {
    id: '11',

    did: '06-27-18',
    date: 'June 27, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Web Dev Affairs',
    title: 'Apple: You are our Tech Leader!',

    post: blogpost11,
    blogcite: blogcite11
  }, {
    id: '10',
    did: '06-26-18',
    date: 'June 26, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'T-Nation Makes the Case: Sprint Merger takes on the Senate',

    post: blogpost10,
    blogcite: blogcite10
  }, {
    id: '9',
    did: '06-25-18',
    date: 'June 25, 2018 ',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now',
    title: 'Modern Prometheus, Part III: <br />Accelerating Evolution of Neural Networks &agrave; la Nvidia GPU',
    post: blogpost9,
    blogcite: blogcite9
  }, {
    id: '8',
    did: '06-23-18',
    date: 'June 23-24, 2018<br />Weekend',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now',
    title: 'Modern Prometheus, Part II: <br />Broadening Evolution of Deep Learning Species &agrave; la Neural Network',
    post: blogpost8,
    blogcite: blogcite8
  }, {
    id: '7',
    did: '06-22-18',
    date: 'June 22, 2018',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now',
    title: 'Modern Prometheus, Part I.<br />Made from 8 billion transistors and 1,000 Cuda Cores:<br /> Today\'s Irreplaceable NVidia GPU',
    post: blogpost7,
    blogcite: blogcite7
  }, {
    id: '6',
    did: '06-21-18',
    date: 'June 21, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: '"Taxation Without Representation is Tyranny!"<br /><br />-- James Otis, 1776',
    post: blogpost6,
    blogcite: blogcite6
  }, {
    id: '5',
    did: '06-20-18',
    date: 'June 20, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'A Healthy Internet is a Fast, Cooperative Internet: <br />Net Neutrality Protections move to State-Level Legislation',
    post: blogpost5,
    blogcite: blogcite5
  }, {
    id: '4',
    did: '06-19-18',
    date: 'June 19, 2018',
    author: 'by Thomas Maestas',
    cat3: 'Musing Blockchain',
    title: 'Rise of the Embattled 4th Estate',
    post: blogpost4,
    blogcite: blogcite4
  }, {
    id: '3',
    did: '06-18-18',
    date: 'June 18, 2018',
    author: 'by Thomas Maestas',
    cat3: 'A.I.Now',
    title: 'Machine Learning, Democratized:<br />Part II: Deep Learning\'s Origin Story',
    post: blogpost3,
    blogcite: blogcite3
  }, {
    id: '2',
    did: '06-16-18',
    date: 'June 16-17, 2018<br />Weekend',
    author: 'by Thomas Maestas',
    cat3: 'Sociology Tomorrow!',
    title: 'Machine Learning, Democratized<br />Part I: Google\'s ML Kit',
    post: blogpost2,
    blogcite: blogcite2
  }];

  for (i = 0; i < url.length; i++) {
    var cat = ' \n    <div id="' + url[i].did + '" class="blogDiv"> \n    <hr />  \n    <a href="#top"><button>Top</button></a>  \n    <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n    <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5> \n    <p id="author" class="  author">' + url[i].author + '</p>   \n    <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n    <h6  id="title"   class="dailytitle chapternumber">' + url[i].title + '</h6>\n    <br />\n    <div id="post">' + url[i].post + '\n    </div>\n    <div id="blogcite">' + url[i].blogcite + '\n    </div>';
    document.getElementById("paragraph-june").innerHTML += cat;
  }

  var i;
  for (i = 0; i < url.length; i++) {
    var catMod = '\n  <div id="mod_' + url[i].did + '" class="blogDivMod"> \n  <hr />  \n  <a href="#top-mod"><button>Top</button></a>   \n  <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n  <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5>  \n  <p id="author" class="  author">' + url[i].author + '</p>   \n  <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n  <h6  id="title"   class="dailytitle chapternumber">' + url[i].title + '</h6>\n  <br />\n  <div id="post">' + url[i].post + '</div>\n  </div>\n <div id="blogcite">' + url[i].blogcite + '\n </div>';
    document.getElementById("paragraph-june-mod").innerHTML += catMod;
  };

  console.log('blogger-june');
  // console.log(angular.toJson(url));
};
bloggerJune();

/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Top Vars Above

var bloggerMay = function bloggerMay() {

  var blogpost13 = '\n\n<p class="firstparagraph">Winning and losing millions via a telephone is very James Bond-esque, but the (re)newed legalisation of sports betting merely mimics national models already in long-time use in Europe and elsewhere.<sup>1</sup> In the U.S., mobile carriers and makers will be asked of a lot more when money is on the line ... which implicitly brings up blockchain solutions. Here\'s one example:\n</p>\n<p class="quote"> WinFlow, a sports betting platform that uses ledger technology to offer transparent betting and products, has decided to run its platform, a decentralized application on the Hedera Hashgraph Network.\n\nWinFlow has been created with the intentions of solving three main industry related problems, which are the lack of accountability and transparency, meaningful rewards programs or compensation to losing players and product innovation.<sup>2</sup>\n</p>\n<p>\n So where are we on Mobile solutions now that the stakes have been exponentially raised...Security, Authentication, Instantaneous Speed?  No need to look, the tech doesn\'t exist!</p>\n<p class="quote">\u201CThere is currently no active, fully-functional sportsbook using distributed ledger or blockchain technology, let alone any operator in the sports betting industry at large that redistributes almost all of their profits right back to the players. <sup> 2 </sup> </p>\n<p>What a coincidence that this month, Hedera\'s Hashgraph <i>public</i> ledger was released, the European Union rewrote their internet data policies in General Data Privacy Regulation (GDPR covered in more depth in <a href="#18-04-19">April 19th</a> and <a href="#18-04-16"> 16th posts</a>. However the occurrence of all three events will definitely trigger some technological hot-swapping! From the same example,\n</p>\n<p class="quote">\nthe [WinFlow] project, which is squarely focused on Europe due to the Federal ban on sports betting in the US, will raise money through private placements while it continues to work on developing the betting platform.<br /><br /> \nWinFlow, which claims to have a unique profit sharing model, said breakthroughs in technology and new benefits for players, including unprecedented rewards, security, and transparency, will allow it to disrupt the incumbents in a multi-billion dollar market.\n</p>\n<p>So, the needs for mobile sports betting all depend on speed, for which the newly unveiled Hedera hashgraph specializes <sup>2 </sup> (covered <a href="#may-18-05-02">May 2-5 four-part series</a>). Looks good from afar, let\'s see now that anyone can kick the tires of that thing called DAG!\n</p>\n';
  var blogcite13 = '\n <p class="cite">1. <a href="https://www.theguardian.com/business/nils-pratley-on-finance/2018/may/14/uk-bookies-beware-us-will-look-after-its-own-in-betting-revolution" target="_blank">https://www.theguardian.com/business/nils-pratley-on-finance/2018/may/14/uk-bookies-beware-us-will-look-after-its-own-in-betting-revolution</a></p>\n  <p class="cite">2. <a href="https://bitcoinexchangeguide.com/hedera-hashgraph-dlt-will-power-winflow-profit-sharing-sportsbook/" target="_blank"> https://bitcoinexchangeguide.com/hedera-hashgraph-dlt-will-power-winflow-profit-sharing-sportsbook/</a></p>\n  \n <p class="cite">3. <a href="https://www.forbes.com/sites/jeffkauflin/2018/03/13/hedera-hashgraph-thinks-it-can-one-up-bitcoin-and-ethereum-with-faster-transactions/#63d0806cabcb" target="_blank">https://www.forbes.com/sites/jeffkauflin/2018/03/13/hedera-hashgraph-thinks-it-can-one-up-bitcoin-and-ethereum-with-faster-transactions/#63d0806cabcb</a></p>\n <p class="cite">4. <a href="https://bitsonline.com/mance-harmon-hedera-hashgraph/" target="_blank">https://bitsonline.com/mance-harmon-hedera-hashgraph/</a></p>\n \n ';

  var blogpost12 = '<p class="firstparagraph">Justice Samuel A. Alito Jr. outlined the Supreme Court\'s Majority Opinion on overturning the federal prohibition on sports betting this week.<sup>1</sup> The primary <i>justification was an unconsitutional Federal authority over States\' rights</i>, in overturning the 1992 Professional and Amateur Sports Protection Act.  \n</p>\n<p class="quote">The Supreme Court struck down a 1992 federal law on Monday that effectively banned commercial sports betting in most states, opening the door to legalizing the estimated $150 billion in illegal wagers on professional and amateur sports that Americans make every year.<br /><br />\nThe decision seems certain to result in profound changes to the nation\u2019s relationship with sports wagering. Bettors will no longer be forced into the black market to use offshore wagering operations or illicit bookies.<i> Placing bets will be done on mobile devices, </i> fueled and endorsed by the lawmakers and sports officials who opposed it for so long. <sup>2</sup> \n</p>\n\n<p>And now, <i>the Vegas Strip</i> is but a mere icon\'s hop away from Candy Crush! Uh oh ....</p>\n';
  var blogcite12 = '<p class="cite">1. <a href="https://www.nytimes.com/2018/05/14/us/politics/supreme-court-sports-betting-new-jersey.html" target="_blank">https://www.nytimes.com/2018/05/14/us/politics/supreme-court-sports-betting-new-jersey.html</a></p>';

  var blogpost11 = '<p class="firstparagraph">Jargon is curiously ugly at first sight, but only with time does technical beauty reveal itself. I decided to make my first recipe with WebAssembly and JavaScript, (with yes, a third called <i>Emscripten</i> and no, my eyes aren\'t rolling) ... this waaas amazing, Wow! So I thought to write about the nuts and bolts of it all. </p>\n<p>So,   what exactly <i> is </i> WebAssembly, specifically?? It\'s this:<span style="color:purple"> (And, for the jargon-wary, skip this paragraph </span> :-)</p>\n<p class="cite">\n$ emcc -s WASM=1 -o fib.js fib.c </p><p class="green">\n<i>emcc</i> executes the <i>Emscripten</i> compiler<br />\n<i>-s</i> ensures that Emscripten outputs WebAssembly<br />\n<i>-o fib.js</i> names the output as fib.js<br />\n<i>fib.c</i> And, finally this is the input file\'s name!<br />\n<p>\nThis first part? It\'s like staring into a solar eclipse (I confess I glanced at one recently (but didn\'t we all, secretly?)) ... <br />\nAnyway, this is a simple, classic example using Fibonacci sequence<sup>2</sup> for familiarity. Here\'s the input:<br />\n</p>\n<pre>\nfib.c:\n#include <emscripten.h>\n\nEMSCRIPTEN_KEEPALIVE\nint fib(int n) {\n  int i, , a = 0, b = 1;\n  for  (i = 0; i < n; i++) {\n    t = a + b;\n    a = b;\n    b = t;\n  }\n  return b;\n}</pre> \n<p>\nSo, given the integer absence in JavaScript mentioned in the <a href="#18-05-10">May 10th post</a>, The Fibonacci integer sequence example illustrates the   relationship between WebAssembly and Javascript. Unlike JavaScript\'s lack of integers, WebAssembly\'s math kit is nothing short of luxury! \n</p>  \n<script src="fib.js"></script>\n<script> <span class="green">This part is JavaScript carrying out the instructions receieved from Emscripten:</span>\n  Module.onRuntimeInitialized = _ => {\n    const fib = Module.cwrap(\'fib\', \'number\', [\'number\']);\n    console.log(fib(12));\n  };\n  <script>\n</p>\n<p>So what happened back there is that <i>Emscripten outputs <strong>two </strong>files, one JavaScript (fib.js) and one WebAssembly (fib.wasm)</i>.. Simple enough, and that\'s why massive, intractable application programs like AutoCAD can now be easily deployed on any platform, fast and high-function on our mobile phones. True it is, <i>after first glance, all  this jargon\'s inner beauty shines, a real harbinger of great apps to come!</p>\n\n';
  var blogcite11 = '<p class="cite">1. <a href="https://medium.com/mozilla-tech/why-webassembly-is-a-game-changer-for-the-web-and-a-source-of-pride-for-mozilla-and-firefox-dda80e4c43cb" target="_blank"> https://medium.com/mozilla-tech/why-webassembly-is-a-game-changer-for-the-web-and-a-source-of-pride-for-mozilla-and-firefox-dda80e4c43cb</a></p>\n<p class="cite">2. <a href="https://webassembly.org" target="_blank">https://webassembly.org</a></p>\n<p class="cite quote green ">2. Note on example Fibonacci Sequence: (Wikipaedia Definition):\n<br />\nIn mathematics, an integer sequence is a sequence (i.e., an ordered list) of integers. \nAn integer sequence may be specified explicitly by giving a formula for its nth term, or implicitly by giving a relationship between its terms. For example, the sequence 0, 1, 1, 2, 3, 5, 8, 13, \u2026 <i>(the Fibonacci sequence) is formed by starting with 0 and 1 and then adding any two consecutive terms to obtain the next one: an implicit description.</i>  The sequence 0, 3, 8, 15, \u2026 is formed according to the formula n2 \u2212 1 for the nth term: an explicit definition.</p> ';

  var blogpost10 = '<p class="firstparagraph">WebAssembly,  about a year old, provides a new level of performance to mobile apps and the browser generally, but is it safe? It\'s actually safer than traditional plug-ins for browsers. Here\'s a quick recap from yesterday\'s post on WebAssembly:</p>\n<p class="quote">WebAssembly is one of the biggest advances to the Web Platform over the past decade.\n\nThis new standard will enable amazing video games and high-performance web apps for things like computer-aided design, video and image editing, and scientific visualization. Over time, many existing productivity apps (e.g. email, social networks, word processing) and JavaScript frameworks will likely use WebAssembly to significantly reduce load times while simultaneously improving performance while running. Unlike other approaches that have required plug-ins to achieve near-native performance in the browser, WebAssembly runs entirely within the Web Platform. This means that developers can integrate WebAssembly libraries for CPU-intensive calculations (e.g. compression, face detection, physics) into existing web apps that use JavaScript for less intensive work.<sup>1</sup>\n</p><p>\nBrowsers, <i>despite HTTPS encryption, are growing in security weaknesses</i> with more territory, responsibilities, and new API relationships. However, along with WebAssembly\'s solutions for CPU-intensive browser operations (like AutoCAD example in the previous post), WebAssembly also offers unique security solutions:  \n</p>\n<p class="quote">WebAssembly describes a memory-safe, sandboxed execution environment that may even be implemented inside existing JavaScript virtual machines. When embedded in the web, WebAssembly will enforce the same-origin and permissions security policies of the browser.<sup>2.</sup></p>\n<p>\n This architecture   signifies eventual compatibility with the existing Block Chain apps like MetaMask that use a browser plug-in to set up an API between, for example, the Ethereum blockchain and Web access. So, with WebAssembly\'s great potential with JavaScript, is it a safer, more secure on-line world? No, but <i>there are safer corners </i> ... and certainly a safer niche for drawing space!</p>\n\n';
  var blogcite10 = '<p class="cite">1. <a href="https://medium.com/mozilla-tech/why-webassembly-is-a-game-changer-for-the-web-and-a-source-of-pride-for-mozilla-and-firefox-dda80e4c43cb" target="_blank"> https://medium.com/mozilla-tech/why-webassembly-is-a-game-changer-for-the-web-and-a-source-of-pride-for-mozilla-and-firefox-dda80e4c43cb</a></p>\n<p class="cite">2. <a href="https://webassembly.org" target="_blank">https://webassembly.org</a></p>';

  var blogpost9 = '<p class="firstparagraph">AutoCAD, the first name in 3-D engineering, has stepped into a new world in the past month. Recent, unprecedented mobile app advances allow more CPU-intensive laptop applications to hop to the phone with equal interactivity and near-equal functionality. Thanks to third-party languages, JavaScript, the browser\'s language, is broadening in powers: And this is nothing short of exhilarating with just enough of a touch of danger.\n</p><p>AutoCAD\'s recent advances in their mobile platform exemplifies this trend.<sup>1</sup> AutoCAD, the ancient, foundational, ultra-powerful, ever-modernizing programming codebase--celebrates 35 years old, and predates the web! AutoCAD by AutoDesk has historically had difficulty implementing its codebase into mobile platforms. So, their app presence suffered because it had been highly watered down, and suddenly competing with thousands of other 3-D engineering apps...Until now. </p><p>\n\n<p class="quote">Yesterday [March 2, 2018] was a big day for the AutoCAD product. A multi-year engineering project \u2013 started in the AutoCAD team way back when I was part of it \u2013 culminated in its first deliverables getting into the hands (or, in this case, browsers) of customers.  The AutoCAD team has been working on a project codenamed \u201CFabric\u201D for the last several years. It\'s has been a huge amount of work \u2013 something I\u2019ll hopefully get into in a future blog post \u2013 but it\u2019s finally bearing tangible fruit.  In broad strokes the work was to take the core of AutoCAD and make it cross-platform. </p><p class="quote">You might consider the Big Split \u2013 work that was done ostensibly to build AutoCAD for Mac but resulted in a Core Engine that became the mechanism through which developers could run custom code in the cloud via AutoCAD I/O (now part of Forge\u2019s Design Automation API) \u2013 to be the first phase of this effort. At the very least Fabric stood on the shoulders of the Big Split.<sup>2.</sup></p><p>\n\nIn short, AutoDesk\'s latest browser-based AutoCAD Web App and Mobile App have suddenly advanced a quantum step. For example, the mobile app provides nearly all of the full features (not including 3-D rendering), like swapping .DWG files from cloud services using a full mobile interface.  </p>\n<p>\nNot just for AutoCAD, but all apps improve, because <i>third-party languages like WebAssembly can "broker" the API conversation between browser and the operating system\'s machine code for certain tasks</i>.<sup>3</sup> Exceptionally interesting, now WebAssembly performs real-time C++ transpiling allowing any browser to communicate in near-to direct machine-code for certain tasks. \nWebAssembly (Wasm) is a "binary instruction format for a stack-based virtual machine ... designed as a portable target for compilation of high-level languages like C/C++/Rust, enabling deployment on the web for client and server applications."<sup>3</sup> In other words, <i>WebAssembly is the middle-person translating between JavaScript\'s V8 Engine and a device\'s Operating System</i>. Here\'s  a clearer explanation using the AutoCAD example:</p>\n<p class="quote">[AutoCAD\'s] Fabric has done away with #ifdefs, forcing any platform-specific code into a PAL (Platform Abstraction Layer) per targeted platform. And Fabric is able to target more than just Windows and OS X. Some of the main targets were the established mobile platforms (more on that down the line), but one major effort was to target the web platform with the AutoCAD codebase.\nYes, you read that right\u2026 yesterday\u2019s update to AutoCAD Web now runs the same core code as standard AutoCAD, but in a browser. A major part of AutoCAD\u2019s C++ codebase gets run through Emscripten (at least that\u2019s my understanding \u2013 I\u2019ll correct any details I get wrong) to be transpiled into WebAssembly. \n<p>\n<p>So, it looks like our <i>wild, untamed language, JavaScript, has matured to the big-leagues </i> by teaming up with WebAssembly ... After all, JavaScript, among all the languages, was born without a mind for math... literally. It\'s core math library conducts all operations in 64-bit floating point, in the absence of integers! So, this entails occasional anomalies: For example, .1 + .2 does not equal .3! (Try it with the JavaScript calculator below ... ) And so, great things await this partnership between WebAssembly and JavaScript, but every marriage is different... one partner may always need help cooking, and another may always need help with the math, but that\'s what Marriage is for!</p>\n\n\n \n';
  var blogcite9 = ' <p class="cite">1. <a href="https://www.autodesk.com/products/autocad/features" target="_blank"> https://www.autodesk.com/products/autocad/features</a></p>\n<p class="cite">2. <a href="http://through-the-interface.typepad.com/through_the_interface/2018/03/the-future-of-autocad.html" target="_blank"> http://through-the-interface.typepad.com/through_the_interface/2018/03/the-future-of-autocad.html</a></p>\n<p class="cite">3. <a href="https://webassembly.org">https://webassembly.org</a></p>';

  var blogpost8 = '<p class="firstparagraph">For all the fanfare of in-browser apps, i.e. Progressive Web Apps, the picture isn\'t as rosy as appears. After all, we are still talking about the browser window, right? Many of the <i>browser-based</i> apps depend on plugin extensions. This is sort of the Achilles Heel recently exposed while, "over two months, seven [Chrome] extensions stole credentials and installed currency miners."<sup>1</sup> The article cites 100,000 computers that may have lost passwords, and other private data--ouch!\n  </p>\n  <p class="quote">\n  The scam was active since at least March with seven malicious extensions known so far, researchers with security firm Radware reported Thursday. Google\'s security team removed five of the extensions on its own and removed two more after Radware reported them. In all, the malicious add-ons infected more than 100,000 users, at least one inside a "well-protected network" of an unnamed global manufacturing firm, Radware said.\n  </p>\n  <p>As we see the app-in-the-browser taking on more operational, networking, functional roles (the work previously reserved to native Apple/Google/Microsoft app stores), unknown, unconceived threats are increasingly possible. That\'s another reason why Tech is always an edge-of-your-seat spectacle!\n\n  ';
  var blogcite8 = '  <p class="cite">1. <a href="https://arstechnica.com/information-technology/2018/05/malicious-chrome-extensions-infect-more-than-100000-users-again/">https://arstechnica.com/information-technology/2018/05/malicious-chrome-extensions-infect-more-than-100000-users-again/</a></p>\n  <p class="cite">1. <a href="https://blog.radware.com/security/2018/05/nigelthorn-malware-abuses-chrome-extensions/">https://blog.radware.com/security/2018/05/nigelthorn-malware-abuses-chrome-extensions/</a></p>';

  var blogpost7 = '<p class="firstparagraph">Google I/0\'s 2018 revelations also included a focus on the <i>Progressive Web App (PWA)</i>. My <a href="#18-04-11">April 11th</a> and <a href="#18-04-05">April 5th</a> posts introduce a new approach to traditional mobile apps, using new JavaScript techniques including a "manifest" and "service workers" files that instruct the mobile phone what to cache and other specs. Google has pushed use of these PWAs since 2015 with Google Chrome\'s efforts to steer app development toward device-neutral, ultra-fast, and encryption advantages of the Hyper Text Transfer Protocol (HTTP), i.e. the browser. </p>\n  <p class="quote">\n  On the first day of Google I/O 2018 event, Tal Oppenheimer, Chief Product Manager (Chrome) at Google, shared that websites like EconomicTimes.com, Instagram and Starbucks are seeing "incredible results" in user retention and time spent, while using Progressive Web Apps (PWAs) technology.\n<br />\nPWAs are websites that take advantage of modern web platform Application Programming Interfaces (APIs) to build experiences like working offline, sending push notifications and getting added directly to .. \n  </p>\n  <p>Web apps use the browser for viewing and security, while the app\'s "manifest" uses <i>service workers</i> to manage data, networking, caching optimized for off-line ability and other actions that were formally reserved for "Native" apps downloaded from Apple or  Google Play stores. So what the flip? It does mean better speed and utility, features and appearance optimized to device, whether mobile, laptop or tablet, all without sacrificing the personalized, off-line features of "native" app store apps? ... it\'s the best of both worlds! </p>\n  \n\n  ';
  var blogcite7 = '  <p class="cite"><a href="https://www.cnet.com/news/5-best-things-from-google-io-2018/" target="_blank" >https://www.cnet.com/news/5-best-things-from-google-io-2018/</a></p>\n  <p class="cite"><a href="economictimes.indiatimes.com/articleshow/64089365.cms?utm_source=contentofinterest&utm_medium=text&utm_campaign=cppst" target="_blank" >economictimes.indiatimes.com/articleshow/64089365.cms?utm_source=contentofinterest&utm_medium=text&utm_campaign=cppst</a></p>';

  var blogpost6 = '\n  <p class="firstparagraph">O.K. Google, I\'ll pass on the lemonade, and ... why don\'t you take the afternoon off, I\'m going to be independent for a while, "again". Alas, we are getting some interesting, if not slightly weird, features from this week\'s Google I/O 2018 Developer Conference.<sup>1</sup>  So, wonderful news! I\'m so tired from picking up my phone to order my take-out, now my Google Assistant can just do all that hard work for me!\n  </p><p>This week\'s revelations from Google\'s I/0 2018 offer A.I.-focused new hardware features, yet A.I. stole the show. The better integration of Google\'s assistant <i>with contacts and calling</i> is eyebrow-raising:</p>\n  <p class="quote">The demo is part of what Google calls an "experiment" it plans to launch this summer. With Duplex, a "small" number of people will be able to book restaurant reservations and hair appointments and to check holiday hours, stuff you\'d normally do over the phone. All of that back and forth happens on the back end -- between Google Assistant and, say, the restaurant. You won\'t even hear the conversation taking place. It\'ll come from an unspecified phone number, not your own number.<sup>1</sup></p>\n  <p>The feature raises the question of advantage over Siri and Alexa... Although access to the Google-minutiae of our personal information (data thankfully we are now more empowered to download and even delete) begs the question of individuals\' machines that talk directly to the restaurant\'s voice-activated receptionist (perhaps a french accent?) machine. I\'m all for efficiency and better organization, but I\'d hardly imagine being too busy to place a call myself! \n  </p>\n\n \n  ';
  var blogcite6 = '  <p>\n  also just mean different assistants for different parts of our day!</p>\n  <p class="cite">1. <a href="https://www.cnet.com/features/google-assistant-duplex-at-io-could-become-the-most-lifelike-ai-voice-assistant-yet/" target="_blank">https://www.cnet.com/features/google-assistant-duplex-at-io-could-become-the-most-lifelike-ai-voice-assistant-yet/ </a></p>\n <p class="cite">2. <a href="https://www.techradar.com/news/google-io-2018" target="_blank">https://www.techradar.com/news/google-io-2018</a></p>';

  var blogpost5 = '<p class="firstparagraph">Challenges to the Hashgraph range from mathematical properties of acyclic graphs (think of the 7 Bridges of Koenigsburg, the riddle of crossing town while crossing each bridge exactly once) to the social implications of how to "distribute" data and <i>who actually holds onto the keys at the end of the day.  </i>\n  </p>\n  <p class="quote">While GridAgents\u2122 and in general multi-agent systems (MAS) offered strong models for representing complex and dynamic real-world environments, we were missing something very important that is becoming available today with blockchain and distributed ledger technologies. The missing links include (1) consensus, (2) immutability and (3) ability to operate in trustless environments. Dr. Maxim Orlovsky states:\n\n  \u201CBlockchain will give to Multi-Agent AI\u200A\u2014\u200Athe same thing that written language gave to humans\u200A\u2014\u200AMeans of Cognitive Evolution\u201D\n  \n  Maxim also states that what blockchain brings to multi-agent systems is consensus algorithms for interpreting facts in a trustless multi-agent system. Consensus allows for nodes in the system to be in unanimous agreement on the state of things. Additionally, blockchain creates a permanent memory (immutability) making the vision of multi-agent systems much more complete. I call the addition of blockchain/DLTs to multi-agents system, AI 3.0. This AI 3.0 combines the benefits of over 30 years of research on AI, machine learning, and multi-agent systems with blockchain and DLT technology to finally enable the emerging industry 4.0 where billions of devices will be connected to the internet and will need to coordinate in real-time at the edge of the network.<sup>3</sup> </p>\n\n\n\n  ';
  var blogcite5 = '  <p class="cite">1.  <a href="      https://science.house.gov/legislation/hearings/subcommittee-oversight-and-subcommittee-research-and-technology-hearing-0" target="_blank">   https://science.house.gov/legislation/hearings/subcommittee-oversight-and-subcommittee-research-and-technology-hearing-0</a></p>  \n  <p class="cite">2.  <a href="    https://venturebeat.com/2018/03/13/hedera-hashgraph-and-mz-unveil-next-generation-blockchain-alternative/" target="_blank">    https://venturebeat.com/2018/03/13/hedera-hashgraph-and-mz-unveil-next-generation-blockchain-alternative/</a></p>  \n <p class="cite">3.  <a href=" https://medium.com/hashgraph/ai-3-0-why-hashgraph-and-how-it-will-revolutionize-blockchain-and-ai-86a6ef715c9f" target="_blank">https://medium.com/hashgraph/ai-3-0-why-hashgraph-and-how-it-will-revolutionize-blockchain-and-ai-86a6ef715c9f</a></p> ';

  var blogpost4 = '<p class="firstparagraph">Blockchain challenges, like any field, start with social acceptance on one end, and technical acceptance on the other. The latter is a little more important, but the former usually runs the show because <i>it, financially speaking, <strong> is</strong> the show</i>. I mentioned the curve\n  </p>\n  <p class="quote">First, blockchain benefits from incumbency and familiarity. Why risk replacing it with a less well-tested technology whose vulnerabilities haven\u2019t all been identified? Also, while it can retain as much transactional data as needed, hashgraph typically doesn\u2019t contain as much transactional history as the Bitcoin blockchain does. For many applications, hashgraph would only keep track of users\u2019 latest positive wallet balances.\n\n  Second, the DAG system doesn\u2019t involve the computation-heavy \u201Cproof of work\u201D effort to verify transactions that some blockchains, such as Bitcoin blockchain, require. Having several miners ratify and vote to accept a transaction lends blockchain what some say is a greater degree of security that the ledger contains a single version of the truth than under DAG-based systems. \n  <br />\n  <br />\n  IOTA, the best-known DAG, is already the No. 10 largest cryptocurrency, with $6.6 billion in market capitalization, according to CoinMarketCap. \n  \n  \u201CEven first-year computer science students here at MIT laugh at the code when they see it,\u201D Tadge Dryja, a research scientist at MIT who is working to scale the Bitcoin network, said in an email. \n  \n  The hack MIT came up with \u201Ccan\u2019t happen in practice,\u201D Serguei Popov, one of the founders of IOTA, said in a phone interview.\n  \n  \nHashgraph uses DAG differently: It uses it to record different aspects of transactions than IOTA, and has different security characteristics, according to hashgraph developers.\n<sup>1</sup>\n   \n\n\n\n  ';
  var blogcite4 = '  </p>\n  <p class="cite">1. CoinDesk Source URL being researched. <a href="#" target="_blank">__</a></p>';

  var blogpost3 = '<p class="firstparagraph">The lessons learned from last week\'s Romaine Lettuce Crisis has brought the <i>supply chain management</i> topic to the nation\'s dinner-table conversations. \n  (Quick recap in my <a href="#18-04-25">April 25th post</a>). The big issue is uninterrupted, comprehensive and permissioned data access to those ... mystery Romaine lettuce heads. What could hashgraph tech offer? Everything from real-time temperature sensors and ID\'s to cross-institution, cross-border accuracy from source to supply targets. And, next week Congress will also be talking about it:  \n  </p>\n  <p class="quote">\n  Lawmakers in the U.S. Congress are set to hold a hearing on blockchain tech\'s use in global supply chains next week.\n\nTwo subcommittees of the U.S. House Committee on Science, Space and Technology - for Research and Technology, and Oversight - will meet on May 8, a newly published notice reveals. The hearing is entitled "Leveraging Blockchain Technology to Improve Supply Chain Management and Combat Counterfeit Goods."<sup>1</sup>\n</p>\n<p>Here, the Science, Space, & Technology Committee <sup>2</sup> of Congress will be meeting This Tuesday, May 8th, hearing from Witnesses from Maersk (head of global trade digitization), UPS (global customs brokerage staff), and of course the good ol\' Dept. of Homeland Security, and doubtless an international<sup>3</sup> platoon of lawyers! </p>\n\n  \n  ';
  var blogcite3 = ' <p class="cite">1. <a href="https://www.coindesk.com/us-lawmakers-hear-case-blockchain-supply-chain/" target="_blank">https://www.coindesk.com/us-lawmakers-hear-case-blockchain-supply-chain/</a></p>\n  <p class="cite">2. <a href="https://science.house.gov/legislation/hearings/subcommittee-oversight-and-subcommittee-research-and-technology-hearing-0" target="_blank">https://science.house.gov/legislation/hearings/subcommittee-oversight-and-subcommittee-research-and-technology-hearing-0</a></p> \n   <p class="cite">3. <a href="https://www.mckinsey.com/industries/financial-services/our-insights/global-payments-2017-amid-rapid-change-an-upward-trajectory">https://www.mckinsey.com/industries/financial-services/our-insights/global-payments-2017-amid-rapid-change-an-upward-trajectory</a></p> ';

  var blogpost2 = '<p class="firstparagraph">The most polished, cryptographically stable leader of  <i>third generation</i> blockchain technology is formally released this month, and anticipation is anything but calm. (Some background posts help contextualize this 2-part series on Hashgraph  technology and potential for capturing per-micro-second, real-time financial needs of the globalizing economy: <a href="#18-04-18"> April 18</a> and <a href="#18-04-02">April 2</a>.) The formal release is on May 9th, but this May 1st press release caught my attention as we see a glimpse of this technology on a public* ledger: \n</p>\n<p class="quote"> CULedger and Hedera today announced a partnership whereby CULedger will use Hedera\'s hashgraph platform and public ledger to build a system for cross-border payments. CULedger has already been using the private ledger version of hashgraph, offered by Swirlds, for general purpose, permissioned ledger use.<sup>1</sup> </p>\n<p>The big news is Hedera\'s "public" blockchain ledger service that moves closer to popular usage with it\'s unique <i>directed acyclic graphs</i>, whose speed increases with scale.  Until recently, Blockchain tech has been hamstrung in the domain of micro-transactions, so now that the barrier has been crossed, how many sectors of life will be enhanced? All. But not yet. Once 5G technology (100 times faster, 100 times the capacity of 4G) is rolled out, then we hit the big leagues.</p> \n<p class="quote">A group of U.S. credit unions looking to pool resources considered the Bitcoin and Ethereum blockchains to track their business, but wound up selecting something else entirely: hashgraph.</p>\n<p class="quote">Currently, cross-border payments are painful for all parties involved," said Rick Cranston, COO of CULedger. "They take time, they\'re expensive, and there is limited visibility into the transaction. Hashgraph is fast and it provides visibility between the two parties at a significantly lower cost. It also eliminates concerns regarding fraud and default, since transactions are recorded immutably on the public ledger, and manual processes, since transactions are automated via smart contracts.<sup>1</sup></p>\n<p> ...to be continued...</p> \n\n';
  var blogcite2 = '<p class="cite"><a href="https://www.prnewswire.com/news-releases/culedger-selects-hedera-hashgraph-to-build-global-ledger-for-cross-border-payments-300639874.html" target="_blank">https://www.prnewswire.com/news-releases/culedger-selects-hedera-hashgraph-to-build-global-ledger-for-cross-border-payments-300639874.html</a></p>\n<p class="cite"><a href="https://venturebeat.com/2018/03/13/hedera-hashgraph-and-mz-unveil-next-generation-blockchain-alternative/" target="_blank">https://venturebeat.com/2018/03/13/hedera-hashgraph-and-mz-unveil-next-generation-blockchain-alternative/</a></p>\n\n<p class="cite"><a href="https://medium.com/hashgraph/ai-3-0-why-hashgraph-and-how-it-will-revolutionize-blockchain-and-ai-86a6ef715c9f" target="_blank">https://medium.com/hashgraph/ai-3-0-why-hashgraph-and-how-it-will-revolutionize-blockchain-and-ai-86a6ef715c9f</a></p>';

  var blogpost1 = '<p class="firstparagraph">May. Spring. Exercise. All wonderful things, reacquainting with Nature--if we can and <i>if we let <strong>Tech</strong> let ourselves outside</i>: Let\'s face it, screens  don\'t mix well with the sun! <</p>\n<p>Recently  though,Tech made a real comeback in the Mother Nature department, thanks to the 2016 Pok&eacute;mon rage that drew crowds out in droves and into the streets and haphazard places over countless miles walked.  Technology, at long last assumes a new role:<i> an ever dedicated activity coach</i> According to <i>Behavioralist psychology</i>, the actions frame the state of mind, so it only makes perfect sense to set our tech devices to where we want to go!</p>\n<p>But <i>some</i> of the benefits of exercise ...\n</p>\n<p class="quote"> \n Neurotrophins, endogenous proteins that support brain plasticity likely mediate the beneficial effects of exercise on the brain. In clinical studies, exercise increases brain volume in areas implicated in executive processing, improves cognition in children with cerebral palsy and enhances phonemic skill in school children with reading difficulty. Studies examining the intensity of exercise required to optimize neurotrophins suggest that moderation is important. Sustained increases in neurotrophin levels occur with prolonged low intensity exercise, while higher intensity exercise, in a rat model of brain injury, elevates the stress hormone, corticosterone.<sup>1</sup> \n </p> <p>\n ... more on this later ...</p>\n\n';
  var blogcite1 = '<p class="cite"><a href="https://www.tandfonline.com/doi/abs/10.1080/17518420801997007" target="_blank">https://www.tandfonline.com/doi/abs/10.1080/17518420801997007</a></p> ';

  var url = [{
    id: '13',
    did: 'may-18-05-15',
    date: 'May 15, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'Betting on the Mobile Blockchain <br />Part II:  Betting on the Hedera Hashgraph Distributed Ledger',
    post: blogpost13,
    blogcite: blogcite13
  }, {
    id: '12',
    did: 'may-18-05-14',
    date: 'May 14, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Sociology Tomorrow!',
    title: 'Betting on Mobile Blockchain<br /> Part I: The Floodgates of Money have Opened!',
    post: blogpost12,
    blogcite: blogcite12
  }, {
    id: '11',
    did: 'may-18-05-12',
    date: 'May 12-13, 2018<br />Weekend',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'The Wedding of JavaScript and WebAssembly: <br />Part III: The Nuts and Bolts of the Relationship',
    post: blogpost11,
    blogcite: blogcite11
  }, {
    id: '10',
    did: 'may-18-05-11',
    date: 'May 11, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Sociology Tomorrow!',
    title: 'The Wedding of JavaScript and WebAssembly: <br />Part II: How Secure and Safe is this New Mobile World?',
    post: blogpost10,
    blogcite: blogcite10
  }, {
    id: '9',
    did: 'may-18-05-10',
    date: 'May 10, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'The Wedding of JavaScript and WebAssembly: <br />Part I: The Opening of a New Mobile App World',
    post: blogpost9,
    blogcite: blogcite9
  }, {
    id: '8',
    did: 'may-18-05-09',
    date: 'May 9, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'Google I/O 2018, Part III:<br /> The Browser\'s Achilles Heel Exposed',
    post: blogpost8,
    blogcite: blogcite8
  }, {
    id: '7',
    did: 'may-18-05-08',
    date: 'May 8, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'Google I/O 2018, Part II:<br />   Progressive Web Apps (PWAs) Quietly Taking Over the Mobile App World',
    post: blogpost7,
    blogcite: blogcite7
  }, {
    id: '6',
    did: 'may-18-05-07',
    date: 'May 7, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'Google I/O 2018,  Part I:<br />  Google Duplex, Do We Really Want to be as Lazy as Possible?',
    post: blogpost6,
    blogcite: blogcite6
  }, {
    id: '5',
    did: 'may-18-05-05',
    date: 'May 5-6, 2018<br />Weekend',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: '3rd Generation Blockchain: How Fast can the Blockchain Operate? Part IV: Potential Solutions for Blockchain Stability',
    post: blogpost5,
    blogcite: blogcite5
  }, {
    id: '4',
    did: 'may-18-05-04',
    date: 'May 4, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: '3rd Generation Blockchain: How Fast can the Blockchain Operate? Part III: : The Challenges for the Directed Acyclic Graph (DAG) with Ripple and  Iota Coin',
    post: blogpost4,
    blogcite: blogcite4
  }, {
    id: '3',
    did: 'may-18-05-03',
    date: 'May 3, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: '3rd Generation Blockchain: How fast can the blockchain operate? Part II: : Speed Needs of   Supply Chain Management',
    post: blogpost3,
    blogcite: blogcite3
  }, {
    id: '2',
    did: 'may-18-05-02',
    date: 'May 2, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: '3rd Generation Blockchain: How fast can the blockchain operate? nPart I: Speed needs of the Financial Sector',
    post: blogpost2,
    blogcite: blogcite2
  }, {
    id: '1',
    did: 'may-18-05-01',
    date: 'May 1, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'Technology: The Coincidental and Unintended Bane of Exercise',
    post: blogpost1,
    blogcite: blogcite1
  }];

  for (i = 0; i < url.length; i++) {
    var cat = ' \n    <div id="' + url[i].did + '" class="blogDiv"> \n    <hr />  \n    <a href="#top"><button>Top</button></a>  \n    <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n    <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5> \n    <p id="author" class="  author">' + url[i].author + '</p>   \n    <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n    <h6  id="title"   class="dailytitle chapternumber">' + url[i].title + '</h6>\n    <br />\n    <div id="post">' + url[i].post + '\n    </div>\n    <div id="blogcite">' + url[i].blogcite + '\n    </div>';
    document.getElementById("paragraph-may").innerHTML += cat;
  }

  var i;
  for (i = 0; i < url.length; i++) {
    var catMod = '\n  <div id="' + url[i].did + '_mod" class="blogDivMod"> \n  <hr />  \n  <a href="#top-mod"><button>Top</button></a>   \n  <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n  <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5>  \n  <p id="author" class="  author">' + url[i].author + '</p>   \n  <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n  <h6  id="title"   class="dailytitle chapternumber">' + url[i].title + '</h6>\n  <br />\n  <div id="post">' + url[i].post + '</div>\n  </div>\n <div id="blogcite">' + url[i].blogcite + '\n </div>';
    document.getElementById("paragraph-may-mod").innerHTML += catMod;
  }

  console.log('blogger-may');
  // console.log(angular.toJson(url));
};

bloggerMay();

/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bloggerApr = function bloggerApr() {

  var blogpost23 = '<p class="firstparagraph">Fitbit and Wearables\' Contribution to Health in Society is clear<sup>1</sup>, yet much of the credit is due to increased social, activity-based networks.  And, new features and benefits depend on relaxed data privacy. Given my <a href="#18-04-11">April 11th post</a> on the upcoming data privacy changes <i>in response to both Cambridge Analytica scandal <strong>and</strong> E.U.\'s long-planned Data Privacy regulations.</i></p>\n  \n  <p>So, now is the worst time to clamp down on app permissions, <i>especially as Smart Watches begin to finally make in-roads</i> socially and hardware-wise.  Fitbit\'s acquirement of Pebble Watch exemplifies the  recent technological hard-ware leap-frogging.  All in all, we can\'t truly have a socially-connected society without flexible app permissions, so let\'s hope for fair and flexible data regulations ...  \n  </p>\n  \n  <p class="side">(Side Note: Fitbit\'s Fashion Wearables\' trade-offs betweeen the lighter-weight models versus functional touch-screen. This blogpost bows in reverence to the Apple Watch,<sup>1</sup> whose Series 3 hardly has competitors. I personally reommend the Fitbit Ionic: After three weeks, I\'ll say the touch accuracy is right on, the graphics are really good, and finally a completely customizable "dashboard" with that stats you want. It\'s draw-backs are minor, every once in a while the watch enters a "sleep" mode leading to a few-second delay for the screen to power up.)</p>\n  <p class="   cite">1. <a href="https://techcrunch.com/2018/02/13/fitbit-buys-twine-health-in-bid-to-become-a-more-serious-health-care-tool/" target="_blank">https://techcrunch.com/2018/02/13/fitbit-buys-twine-health-in-bid-to-become-a-more-serious-health-care-tool/</a></p>\n  \n  <p class="cite"><a href="https://www.apple.com/apple-watch-series-3/" target="_blank">https://www.apple.com/apple-watch-series-3/</a></p> ';

  var blogpost22 = '   <p class="firstparagraph" >All over, the new <i>Terms &amp; Conditions in Fine(r) Print</i> are alerting social media users to new compliance to ... new laws? I wrote in my <a href="#18-04-16">April 16th post</a> about the upcoming E.U. General Data Privacy Regulations, to which most of social media is unabashedly following. The climate doesn\'t hurt, but how will our social-media experiences be watered down?  </p>\n  <p>Let\'s see what Twitter is telling us:<?p><p class="quote">\n  \n  As part of our ongoing commitment to transparency, and in preparation for new data protection laws that take effect next month, we\u2019re updating our Terms of Service and Privacy Policy to empower you to make the best decisions about the information that you share with us. <br />\n  <br />These updates will take effect on May 25, 2018. By using our services on or after that date, you\u2019ll be agreeing to these revisions. You should read the documents in full, but the key updates in our Privacy Policy include:\n  <br /><br />\n  \n  \n     More focus on the controls we offer you over your personal data;\n     <br /><br />\n     More focus on how Twitter shares your public data broadly and instantly, including through our developer tools;\n     <br /><br />\n     More transparency and control over how we share your data with business partners; and\n     <br /><br />\n     More clarity about how we share your data to prevent harm, comply with law, serve the public interest, and keep Twitter safe and welcoming for everyone.<sup>1</sup>\n     </p>\n   <p>This sounds like the least transparent of transparency documents!</p>   \n  <p class="cite">1.<a href="https://help.twitter.com/en/rules-and-policies/update-privacy-policy" target="_blank">https://help.twitter.com/en/rules-and-policies/update-privacy-policy</a></p> \n  <p class="cite">2.<a href="https://www.bloomberg.com/news/articles/2018-04-16/facebook-s-zuckerberg-leans-in-to-meet-with-eu-digital-chief" target="_blank">https://www.bloomberg.com/news/articles/2018-04-16/facebook-s-zuckerberg-leans-in-to-meet-with-eu-digital-chief\n  </a> </p> ';

  var blogpost21 = '<p class="firstparagraph">T-Mobile\'s potential acquirement of Sprint--for all of its monopoly overtones--may be a very good thing: We, as a society, are at the doorstep of 5G technology, which will fundamentally change every aspect of life. T-Mobile has always been the little engine that could, but has become a powerhouse since last summer with their 8 billion dollar purchase of low bandwidth, which is specifically <i>best for the ubiquity needed for the 5g Revolution</i><sup>2</sup>.  Although Sprint was always in last, 4th place among major carriers, their network infrastructure <i> and Bandwidth Rights</i> can help T-Mobile catch up with AT&amp;T and Verizon\'s 5G roll-outs.</p>  \n  <p class="cite">1. <a href="http://www.businessinsider.com/5g-speed-network-lte-2018-1/" target="_blank">http://www.businessinsider.com/5g-speed-network-lte-2018-1</a></p>\n  <p class="cite">2. <a href="https://www.theverge.com/2017/4/13/15291496/tmobile-fcc-incentive-auction-results-8-billion-airwaves-lte" target="_blank">https://www.theverge.com/2017/4/13/15291496/tmobile-fcc-incentive-auction-results-8-billion-airwaves-lte</a></p>';

  var blogpost20 = '<p class="firstparagraph">Sometimes the safest place to be is no place. So, the beauty of the distributed ledgers is that data is no longer in one place, and is rather in no place at all. Where is it? Spread across each node of the blockchain, and any one change in the data updates each node. Equally, the transaction is secured by a cryptographic hash, which is a unique private key.</p>\n  <p>So, what better way to conceptualize it than read it, here\'s one of mine on the Ethereum network:</p>\n  <p class="quote">\n  status \t0x1 Transaction mined and execution succeed      <span class="green">  <--status   crypto-contract</span><br /><br />\n  from \t0xca35b7d9TOMTOMef540ade6068dfe2f44e8fa733c         <span class="green"> <--this is my address.</span><br /><br />     \n  to \tbrowser/Tomsfile.sol:tmContract.tmm() 0x692a70d2e424a56d2c6ctomtomd1a86395877b3a <br /><br />\n  gas \t3000000 gas         <br /><br />\n  transaction cost \t32060 gas         <span class="green"> <--pay more, faster transaction validation</span><br /><br /> \n  execution cost \t10788 gas          <span class="green"> <--contract validation isn\'t free ...</span><br /><br />\n  hash \t0x4daeec5d9db8055c95c2e4eae074b9944e57b6465tomtom239fb601896525587d5fe<br /><br />\n  input \t0x92277933<br /><br />\n  decoded input \t{}<br /><br />\n  decoded output \t{}<br /><br />\n  logs \t[]<br /><br />\n  value \t0 wei<br /><br />\n  </p>\n  <p>We\'ve all seen the Cisco and IBM blockchain supply-chain ads, but how important can it be? In my <a href="#18-02-20">Feb. 20 post</a>, I mention the revolutionary, calibrated <i>freedom and privacy of data</i>, owned and stored with the <i>owner of the data</i>--what a concept! \n  </p>\n  <p class="quote">\n  Jewelry tracing is becoming increasingly important for business, as the younger customer is "far more skeptical, does more research," said Mark Hanna, chief marketing officer at Richline. "We feel this is an absolute must right now."<br /><br />\n  TrustChain has just completed its first proof-of-concept test, in which gold went from a mine in South Dakota to a refinery in Utah, to a fabricator in Massachusetts that converted the gold into casting nuggets and grains. Those then went to a manufacturer in India that made engagement rings and set diamonds in them. The rings went to a distribution facility and then to Helzberg. UL, which helps companies ensure responsible purchases, monitored the transactions throughout the process. \n  <p>Some people call it the <i>Trust Chain</i>, but it\'s also very much a Transparency Chain, too!   </p>\n  \n  \n  <p class="cite">3. <a href="https://www.bloomberg.com/amp/news/articles/2018-04-26/ibm-s-blockchain-tech-to-track-jewels-from-mine-to-retail-stores" target="_blank">https://www.bloomberg.com/amp/news/articles/2018-04-26/ibm-s-blockchain-tech-to-track-jewels-from-mine-to-retail-stores</a></p>';

  var blogpost19 = '<p class="firstparagraph">E. Coli in the Lettuce supply <sup>1</sup> would make any rabbit apprehensive, but finding the source quickly? Downright disheartening.   However, the ever-evolving potential of blockchain technology presents its solution. The blockchain would provide the complete ledger of a vegetable\'s journey, across all phases and jurisdictions of the journey. Further, all information can be instantly available from any place (actually no location at all), rather than coordinating information from multiple data sources:\n  </p>\n  <p class="quote">The FDA has identified one farm as the source of the whole-head romaine lettuce that sickened several people at a correctional facility in Alaska. However, the agency has not determined where in the supply chain the contamination occurred. The agency is examining all possibilities, including that contamination may have occurred at any point along the growing, harvesting, packaging, and distribution chain before reaching the Alaska correctional facility where it was served.<sup>2</sup>\n  </p> \n  <p>The beauty of blockchain technology is more than just the crypto-cash or even the new crypto-contracts cropping up in every sector. The distribution of knowledge to all parties, cryptographically sealed and logged from its origin. As it happens, old Watson from IBM fame is taking a crack at it:</p>  \n  \n  <p class="quote"> IBM has also been actively helping form a slew of blockchain-focused companies and industry initiatives around various supply chains. For example, it\u2019s working with companies like retailer Walmart Inc. to trace food products, and earlier this year helped start an effort to track international cargo.<sup>3</sup>\n  </p>\n  <p>The Diamond industry has succeeded already in implementing the blockchain tech to guarantee against blood diamonds.<sup>4</sup> \n  <p class="cite">1. <a href="https://www.seattletimes.com/seattle-news/health/wa-state-health-officials-5-people-sick-from-romaine-lettuce-e-coli-outbreak/" target="_blank">https://www.seattletimes.com/seattle-news/health/wa-state-health-officials-5-people-sick-from-romaine-lettuce-e-coli-outbreak/</a></p>\n  \n  <p class="cite">2. <a href="https://www.cdc.gov/ecoli/2018/o157h7-04-18/index.html" target="_blank">https://www.cdc.gov/ecoli/2018/o157h7-04-18/index.html</a></p>\n  \n  <p class="cite">3. <a href="https://www.bloomberg.com/amp/news/articles/2018-04-26/ibm-s-blockchain-tech-to-track-jewels-from-mine-to-retail-stores" target="_blank">https://www.bloomberg.com/amp/news/articles/2018-04-26/ibm-s-blockchain-tech-to-track-jewels-from-mine-to-retail-stores</a></p> ';

  var blogpost18 = '<p class="firstparagraph">Westworld\'s second season premiered this week to cult-like fanfare.<sup>1</sup> Much of the HBO\'s storyline follows usual near-future AI potential, but brings up moral issues about what separates humankind from the rest of the animal kingdom. The premise of the show, and the current state of A.I., is instinctual learning and behavior of A.I.--i.e. imitating animal-behavior, but not human. </p>\n  <p>I had the good luck of spending the Fall of 2016 in the Silicon Valley of A.I. technology, which is Montr&eacute;al, Qu&eacute;bec (For example, UdeM was awarded $100 million in research money from Facebook). Though I was there for a Sociology PhD, I still got to get involved like any technology groupie would...  The rock-star out there is Universit&eacute de Montr&eacute;al\'s Dr. Yoshua Bengio,<sup>3</sup> who explains the consciousness elements of A.I, and how those compare with our own representations:\n  </p>\n  <p class="quote">\n  With supervised learning, humans provide the high-level concepts that the computer learns, which can be tedious and limits the ability of computers to discover things by themselves. Unsupervised learning, or what we call reinforcement learning, is when the learner is not merely passively observing the world, or how humans do things, but interacts with the environment and gets feedback. Humans are good at this. Combining unsupervised deep learning and reinforcement learning is one of the things that I am working on.<sup>2</sup>\n  </p> \n  <p>So, here we see how Yoshua Bengio  explains that <i>building of meaning, symbolic representation as the key impediment</i>. To get around this, representations are <i>factorialized</i>, which is a clean way of saying multiple levels/dimensions of classification trees:</p>\n  <p class="quote">For more than a decade, my research has focused on the notion of learning better representations, which is the heart of deep learning, in particular, representations that have a property called disentangled. Disentangled separates the different concepts and different explanations - we call them factors - that explain the data, that explain what the agent sees around it, and that explain how the agent patrols the world. Disentangled captures some of the causality that explains what we are seeing and what the computer is seeing.<sup>2</sup>\n  </p>\n  <p>\n  I think it\'s exciting subject matter, and perhaps many would be less apprehensive if they thought of A.I. as achieving the behavior and  <i>predictable mind of pets</i>.  Pets and service pets can be a reassuring thought--even for A.I. pessimists like Elon Musk. Pets... Who doesn\'t imagine a shaggy Saint Bernard, with a first-aid kit and a flask arriving to the rescue on a snowy Alpine mountain slope? I can imagine a mechanical Saint Bernard, and with that in mind I would love to visit Westworld--albeit not without a white hat ... \n  <p class="cite">1. <a href="https://www.hbo.com/westworld" target="_blank" >https://www.hbo.com/westworld</a>\n  </p>\n  \n  <p class="cite">2. <a href="http://www.iro.umontreal.ca/~bengioy/yoshua_en/index.html" target="_blank" >http://www.iro.umontreal.ca/~bengioy/yoshua_en/index.html</a>\n  </p>\n  \n  <p class="cite">3. <a href="https://www.forbes.com/sites/peterhigh/2017/11/06/why-montreal-has-emerged-as-an-artificial-intelligence-powerhouse/#7435a66123bd" target="_blank" >https://www.forbes.com/sites/peterhigh/2017/11/06/why-montreal-has-emerged-as-an-artificial-intelligence-powerhouse/#7435a66123bd</a>\n  </p>';

  var blogpost17 = '<p class="firstparagraph">The<i> burgeoning Tech Job Market</i> has been one of my favorite blog topics. Two months ago, my <a href="#18-02-23">Feb. 23rd blogpost</a> and again on <a href="#18-03-08">March 8th</a> I mentioned 1.4 million new tech jobs, 20% growth year-over-year. And so, yours truly has decided to enter into this market after a post-graduate period of contracting and free-lance work. Let\'s face it, there\'s no substitute for the stability and the fixed schedule, plus the coffee-machine conversations are never short of endearing! </p>\n\n\n  <p>So far on day 2 (Friday, the 21st was my ceremonial first day of "putting myself out there"). I\'ve thought to start slow, while I gauge the territory, but Indeed and Linkdin are always safe bets to begin with. All in all, my general take is that this new job front, with hundreds of thousands of jobs month-over-month is for everyone. Most positions offer 9-12 weeeks training -- who ever said changing careers had to be shouldered on our own? HR is there! </p>\n  <p>As I am a night-blogger, therefore my new position--where and whichever it will be, won\'t interfere with my blogging--after all, I have truly enjoyed watching my readership grow, month-by-month ... so, thank you, dear tech readers. As such, perhaps along the way I can lend a view from the job-front, and any new trends I observe.</p>\n  <p>Examples aren\'t hard to find. I\'ve noticed that since the last time I\'ve checked out the job market, the pre-assessment tests are a bit more cognitive than previous years, which is good for strong test-takers--especially those that love to calculate the "arrival times of two separate trains leaving the same station at two different rates of speed ....". 50 questions in 15 minutes makes for a nice adrenaline rush--on par with a short run!  </p>';

  var blogpost16 = '<p class="firstparagraph">Palladium, micrograms of Gold and Silver, and of course, the yttrium, the lanthanum, without forgetting good old terbium, then a dusting of neodymium, a dash of gadolinium and and finally a sprinkle of praseodymium. The ingredients for a typical iphone are not a luxury, but a <i>sine qua non</i> necessity, while the irreplaceable, increasingly difficult-to-mine metal supply <i>reminds us we do have a Mother to heed to</i>.<sup>1</sup>  \n  </p>\n  <p>Tech\'s relationship with the Earth is very symbiotic, in that Earth\'s problems are increasingly dependent on Tech\'s promise for scalable, innovative solutions beyond Humankind\'s reach. So, much like the clean-energy infrastructure will depend on fossil fuels to be built, tech hardware will depend on more difficult mining. But to what end? With growing national and corporate competitiveness on a more crowded, more connected globe, the race is on to achieve sustainability with both.   </p><p>\n  But the story isn\'t about Tech here on Earth Day - the story is the Earth\'s, and why the Earth\'s Superman, Technology, will come down from the sky to save the day ...\n  </p>\n  <img class="zoom" src="./dist/img/metal.jpg" width="350px" />  <br />\n  <p class="cite">2. <a href="http://www.bbc.com/future/story/20161017-your-old-phone-is-full-of-precious-metals" target="blank">http://www.bbc.com/future/story/20161017-your-old-phone-is-full-of-precious-metals</a>\n  </p>';

  var blogpost15 = '<p class="firstparagraph">Speed versus scalability. Security versus user-experience. Stability versus complexity. Ethereum, along with other blockchain developers, inhabit a virtual reality, a reality in which application uses and perils are not fully conceivable. Traditional app-developers, long habituated to the centralized server and popular usage--not to mention any regulation--to know the lines in the sand, which constrain a developer. The decentralized app (DAPP) developers have no such luxury, except to abide by a certain golden rule; a single rule that sustains crypto-tech\'s very existence: The Rule of Trust, without which blockchain tech has nothing to offer. \n  </p>\n  \n  <p>The very premise of designing distributed ledger platforms hinges on placing a platform\'s cryptographic, algorthmic design at the center, the link between every user. This trust, <i>built on mathematical proofs,</i> ensures peer-to-peer transactions in which  <i>neither party needs to trust the counter-party, nor any third-party.</i>We trust in the cryptography that our transaction will be fulfilled: In Math We Trust. </p> <br />\n  ';

  var blogpost14 = ' \n  <p class="quote">\u201CI think great artists and great engineers are similar, in that they both have a desire to express themselves. In fact some of the best people working on the original Mac were poets and musicians on the side.\u201D <sup>1</sup><br /> \u2013 Steve Jobs</p><br />\n  <p class="firstparagraph">Words, Sentences, Paragraphs. Variables, Functions, Modules.  With so many languages used for different purposes by different organizations, syntax is more than 4-space indents, variable name-spaces, and other formalities. Today, the variety of coding languages and scripts can appear more complicated than is/+*- the case: After all, all computer <i>languages boil down to the same primary tasks: for &amp; while loops, if-then statements, variable declarations, scope considerations, etc ...</i>     \n  </p>\n  <p>So what am I getting at? Coding innovation is an art form that surpasses science and knowledge. For example,   coding practices improve with clarity, simplicity, modularity, and so on... but is there an authoritative <i>school of thought</i> on this art? Well, in the Python world, all eyes turn to the Zen of Python, and some say other languages should emulate its philosophy, so let\'s hear it:</p>\n  <p class="quote">\n  <strong>The Zen of Python</strong><br /><br />\n  \n  Beautiful is better than ugly.<br /><br />\n  \n  Explicit is better than implicit.<br /> <br />\n  \n  Simple is better than complex.<br /> <br />\n  \n  Complex is better than complicated.<br /> <br />\n  \n  Flat is better than nested.<br /> <br />\n  \n  Sparse is better than dense.<br /> <br />\n  \n  Readability counts.<br /> <br />\n  \n  Special cases aren\'t special enough to break the rules.<br /><br />\n  \n  Although practicality beats purity.<br /><br />\n  \n  Errors should never pass silently.<br /><br />\n  \n  Unless explicitly silenced.<br /><br />\n  \n  In the face of ambiguity, refuse the temptation to guess.<br /><br />\n  \n  There should be one-- and preferably only one --obvious way to do it.<br /><br />\n  \n  Although that way may not be obvious at first unless you\'re Dutch.<br /><br />\n  \n  Now is better than never.<br />\n  <br />\n  Although never is often better than *right* now.<br /><br />\n  \n  If the implementation is hard to explain, it\'s a bad idea.<br /><br />\n  \n  If the implementation is easy to explain, it may be a good idea.<br /><br />\n  \n  Namespaces are one honking great idea -- let\'s do more of those! <sup>2</sup><br />\n  \n  <br />\n  --Pythoneer Tim Peters\n  </p>\n  <p>I get it, good coding is more than intuitive art, it\'s walking the high road without regard for shortcuts. And I can see that <i>in uncharted waters, intuition has to be constrained by sound reason.</i> And who hasn\'t been burned by artful exploration, fancy coding, and far-fetched architectures? So where does the balance lie? Again we must turn to Steve Jobs on the "intersection of the humanities and science,": </p>\n  <p class="quote">There are a lot of people innovating, and that\'s not the main distinction of my career. The reason Apple resonates with people is that there\'s a deep current of humanity in our innovation. I think great artists and great engineers are simi.ar in that they both have a desire to express themselves. In fact some of the best people working on the original Mac were poets and musicans on the side. In the seventies computers became a way for people to express their creativity. Great artists like Leonardo da Vinci and Michelangelo were also great art science. Michelangelo knew a lot about how to quarry stone, not just how to be a sculptor." <sup>1</sup><br />--Steve Jobs\n  <p class="continue">I could not imagine a computing world were it not for the personalization that Apple introduced to the world, to us all. After all, I recall I was first transfixed in 1984, there I was a seven-year-old staring into the bright green letters   of my   Apple IIe ... </p>\n  <p>So, in this era of the algorithmic wild-west and impending regulations on data privacy, inter-app permissions, coupled with data breaches every week, how might regulations avoid stifling innovation? Steve Jobs didn\'t have rules as much as Mark Zuckerberg didn\'t have any rules. So, it\'s a relief that Zuckerberg, with intimate knowledge of innovation, can set his teams to work with Congress going forward, especially as Facebook conforms to the E.U.\'s <i>General Data Privacy Regulations (GDPR) implementation this May.</i> I for one hope that freedom for creative innovation will stay alive, even in the face of   growing bureaucracy in the web.   \n  <p class="cite">1. <a href="https://books.google.com/books?id=cf_2PBPP-rEC&printsec=frontcover" target="blank">Isaacson, Walter. Steve jobs. JC Latt\xE8s, 2011.</a>\n  </p>\n  <p class="cite">2. <a href="https://www.python.org/dev/peps/pep-0020/" target="blank">https://www.python.org/dev/peps/pep-0020/</a>\n  </p>';

  var blogpost13 = '\n  <p class="firstparagraph">Bitcoin\'s rise to prominence, the mystery of Satoshi Nakamoto\'s identity--i.e., author of <a href="dist/docs/bitcoinWhitePaper.pdf" target="_blank"> the original Bitcoin White Paper</a>, and the platform\'s reliability (outside of value fluctuations) all add to the mystique of the crypto-currency.  Yet,     new advances and types, i.e. "groupings" of blockchain technology are not necessarily "replacing" their predecessors, but rather filling different blockchain needs; Needs that include speed of transactions, truly public distributed ledgers, safety from forking and DDOS attacks.  Since 2008,   groups of competing platforms follow a timeline, but should not be thought of as a cyclical evolution but rather growing tree branches that form "groups".  Bitcoin, Litecoin are first generation, while Ethereum and Ripple are 2nd generation with crypto-contract capability, and finally Iota and Swirlds\' Hedera Hashgraph represent   3rd generation <i>directed-acyclic-graphs (DAG), whose transaction speed actually  increases</i> with number of nodes.\n  </p>\n  <p>Each of these groupings shouldn\'t be seen as making the previous design obselete: They   serve different purposes. Bitcoin can never serve micro-transactions and the micro-economy because it can only handle 6 transactions per second (TPS), while Ethereum can handle 12 or so. However, micro-transaction industries require TPS in the hundreds of thousands! Only the 3rd gen  crypto-currency architecture   achieves TPS <i>ad infinitum</i> because it\'s scalability increases with size. The catch? DAG\'s are necessarily private entities, rather than the original two generations that are by nature public, yet can be privatized. 3rd generation DAGs are the opposite: They are by default private, and cannot truly be distributed without management. Further, <i>Swirlds Hashgraph has patented their source code, which contradicts many principles of blockchain technology</i>, beginning with core tenets  of the original crypto-currency white paper, published in October 2008. For history\n  \'s sake, here\'s a quick view of the Bitcoin paper\'s abstract:</p>\n  <p class="quote"><strong>Abstract.</strong> A purely peer-to-peer version of electronic cash would allow online payments to be sent directly from one party to another without going through a financial institution. Digital signatures provide part of the solution, but the main benefits are lost if a trusted third party is still required to prevent double-spending. We propose a solution to the double-spending problem using a peer-to-peer network. The network timestamps transactions by hashing them into an ongoing chain of hash-based proof-of-work, forming a record that cannot be changed without redoing the proof-of-work, forming a record that cannot be changed without redoing the proof-of-work. The longest chain not only serves as proof of the sequence of events witnessed, but proof that it came from the largest pool of CPU power. As long as a majority of CPU power is controlled byi nodes that are not cooperating to attack the network, they\'ll generate the longest chain and outpace attackers. The network itself requires minimal structure. Messages are broadcast on a best effort basis, and nodes can leave and rejoin the network at will, accepting the longest proof-of-work chain as proof of what happened while they were gone.<sup>1</sup></p>\n  \n  <p>Irrespective of crypto-currency or crypto-contract, there seems to be a different kind of jump from 2nd generation to 3rd generation blockchain, rather than a progression. Research needed to fork into a different direction is because of the need for instantaneous, ordered transactions, which can never be provided by a blockchain design which "syncs" every 5 to 10 minutes. </p>\n  <p> So, what is this 3rd generation design? Instead of a singular block encapsulated in linked cryptographic, historical ledger blocks, hashgraph uses a "tangle" of one-way (directed-acyclic) network connections. This means that speed increases with the number of nodes, overcoming the Bitcoin micro-transaction problem. <i>In sum, near-instantaneous updates for financial, betting, gaming and social-media data needs are solved by the  third-generation DAG</i>, while longer-term and truly distributed blockchain needs will always be the terrain of first and second generation blockchain technology. So, given that Swirlds\' Hedera Hashgraph will be unveiling their platform next month,   blockchain critics and enthusiasts can and should read between the lines, er, I mean-- read  between the nodes ...</p><br />\n  <p class="cite">0.  Topic addressed in <a href="#18-04-02">April 2nd blogpost</a></p>\n  <p class="cite">1.<a href="https://bitcoin.org/bitcoin.pdf" target="_blank">https://bitcoin.org/bitcoin.pdf\n  </a> </p>\n  <p class="cite">2.<a href="http://www.the-blockchain.com/2018/03/20/hedera-plans-speedier-safer-more-democratic-blockchain-alternative-hashgraph/" target="_blank">http://www.the-blockchain.com/2018/03/20/hedera-plans-speedier-safer-more-democratic-blockchain-alternative-hashgraph/\n  </a> </p>\n  <p class="cite">3. <a href="https://s3.amazonaws.com/hedera-hashgraph/hh-whitepaper-v1.0-180313.pdf" target="_blank">https://s3.amazonaws.com/hedera-hashgraph/hh-whitepaper-v1.0-180313.pdf</a> </p>';

  var blogpost12 = ' \n  <p class="firstparagraph">Dictionaries and libraries place the programmer into a once-in-a-lifetime opportunity to ride the lightning of the open-source community. Volunteers and corporate sponsors take the credit for the enormous effort making a  near limitless selection of functions, dictionaries and modules for languages such as  JavaScript and Python programming.<sup>1</sup> Today, a programmer can   put together JavaScript Components and Modules with less thought about syntactical logic, and more consideration for the problem at hand. \n  </p>  \n  <p class="quote">Each significant piece of functionality in a program should be implemented in just one place in the source code. Where similar functions are carried out by distinct pieces of code, it is generally beneficial to combine them into one by abstracting out the varying parts.</br ></br >\n  --Benjamin C. Pierce</p>\n  <p>There are a few hundred thousand packages in the JavaScript <i> Node.js package ecosystem</i>, with billions of downloads per month. This unprecedented global collaboration, sharing open-source code into the community, means a more humanized, higher-level programming tasks-- a boon for the many coding-converts joining the tech economy. Such optimism means that problem-solving is fast and flexible, especially in the world of Stack Overflow--another phenomenon of global collaboration.\n  </p>\n  <p class="quote">[Abstraction] tries to factor out details from a common pattern so that programmers can work close to the level of human thought, leaving out details which matter in practice, but are immaterial to the problem being solved.</p>\n  \n  <p class="quote">The effective exploitation of the powers of <i>abstraction</i> must be regarded as one of the most vital activities of a   programmer ...<sup>2</sup> <br /><br />\n  --Edsger W. Dijkstra</p>\n  <p>These words mean programmers can do what they do best, as much as   what the client-user does best, too: think and problem-solve like a human, rather than a robot. </p>\n  <p class="cite">1.<a href="https://nodesource.com/blog/npm-is-massive/" target="_blank">https://nodesource.com/blog/npm-is-massive/\n  </a> </p>\n  \n  <p class="cite">2.<a href="http://www.cs.utexas.edu/~EWD/" target="_blank">http://www.cs.utexas.edu/~EWD/\n  </a> </p> ';

  var blogpost11 = ' \n  <p class="firstparagraph">E.U.\'s Parliament has   invited Zuckerberg to speak with member-states in Brussels to discuss both the upcoming <i>General Data Protection Regulation (GDPR)</i> new rules, along with the 2.7 Europeans, whose data also was sold to Cambridge Analytica.<sup>1</sup> Not exactly an invitation to the Ball...\n  </p>\n  <p class="quote">The Brussels-based commission said [European Commission Vice-President] Ansip would also meet with Google Chief Executive Officer Sundar Pichai, Twitter General Counsel Sean Edgett and Netflix General Counsel David Hyman in individual meetings to talk about data protection, online privacy, illegal content, disinformation campaigns, digital copyright and artificial intelligence.<sup>2</sup></p> \n  <p>These are more than talking points, as they are already codified within the GDPR and to implemented next month--compliance with European law will be a mad dash for developers.</p>\n  <p> This predicament illuminates a smaller world, along with increasing complications of globalization, thanks to tech--for better or worse. Ultimately, Facebook, Google, and other tech giants will need to overhaul their permissioning code to abide by European law, but after last week\'s Congressional appearence, it\'s hard not to wonder if pan-industry data privacy adjustments will lead to a new <i>de facto regulation</i>, based on tech culture instead of politicians and legislators ...  \n  </p>\n  <p class="cite">1.<a href="https://www.washingtonexaminer.com/policy/technology/eu-steps-up-pressure-on-mark-zuckerberg-to-testify-about-facebook-privacy" target="_blank">https://www.washingtonexaminer.com/policy/technology/eu-steps-up-pressure-on-mark-zuckerberg-to-testify-about-facebook-privacy\n  </a> </p> \n  <p class="cite">2.<a href="https://www.bloomberg.com/news/articles/2018-04-16/facebook-s-zuckerberg-leans-in-to-meet-with-eu-digital-chief" target="_blank">https://www.bloomberg.com/news/articles/2018-04-16/facebook-s-zuckerberg-leans-in-to-meet-with-eu-digital-chief\n  </a> </p> ';

  var blogpost10 = '<p class="firstparagraph">This week, the Supreme Court   revisits its 1992 decision not requiring state sales taxes for online purchases.<sup>1</sup> Although big-box stores like Amazon, Walmart, etc. <i>do</i> pay state taxes among the 45 states requiring it, small- and medium-sized retailers do not need to collect sales taxes in any state where they do not have physical presence, also known as "nexus." But, beginning this Tuesday, the free ride may come to an  end; this includes small retailers that comprise half of Amazon\'s 3rd-party online sales.\n  </p>\n  <p class="quote">  \n  \n  A reversal could mean that all online retailers must collect sales tax everywhere. It\'s an issue that brick-and-mortar retailers insist will provide a level playing field with online competitors, and help to provide state and local governments with the tax revenue they deserve.<sup>2</sup></p>\n  <p> Livelihoods hang in the balance, so whatever the gavel settles on, let\'s hope for the best! The Blockbuster-ization of so many brick-and-mortars seems to claim a new victim every month--recently Toys \'R Us  meeting its demise.<sup>3</sup> So, with as many that have disappeared, big and small-, its a curiosity if maybe Tuesday breathes life into the boarded store-fronts across America. I think others share my view that shopping is more than shiny packaging at the doorstep: it\'s much more the ceremony and gala in the store - a  real shared moment with strangers, acquaintances and loved ones that makes for better packaging, a package embellished with a story.   \n  </p>\n  <p class="cite">1.<a href="https://www.forbes.com/sites/janetwburns/2018/04/15/supreme-court-decision-could-bring-sales-tax-to-more-online-shopping/#2a0ea38f3daf" target="_blank">https://www.forbes.com/sites/janetwburns/2018/04/15/supreme-court-decision-could-bring-sales-tax-to-more-online-shopping/#2a0ea38f3daf\n  </a> </p>\n  <p class="cite">2.<a href="http://money.cnn.com/2018/04/15/technology/online-purchases-sales-taxes-supreme-court/index.html" target="_blank">http://money.cnn.com/2018/04/15/technology/online-purchases-sales-taxes-supreme-court/index.html\n  </a> </p>\n  <p class="cite">3.<a href="https://www.washingtonpost.com/news/business/wp/2018/04/13/this-billionaire-toy-executive-has-a-last-ditch-mission-to-save-toys-r-us-before-its-too-late/?noredirect=on&utm_term=.b3201ad77891" target="_blank">https://www.washingtonpost.com/news/business/wp/2018/04/13/this-billionaire-toy-executive-has-a-last-ditch-mission-to-save-toys-r-us-before-its-too-late/?noredirect=on&utm_term=.b3201ad77891\n  </a> </p> ';

  var blogpost9 = '\n  <p class="firstparagraph">For all the clamor about Bitcoin\'s carbon footprint, who doesn\'t love the sound of money?  And, for all the pitfalls of Iota and the ever-evolving Ethereum (and ever-present threat of forking), Bitcoin stands true among the crypto-currency platforms. Keeping it Simple,   the very limited, non-crypto-contract may just be Bitcoin\'s virtue. In a rocky world, <i>a plain, no-frills crypto-currency with stability</i> is incomparable to crypto-contract powers, that are not fully stable, like Ethereum and Iota.  </p>\n  <p>So, it\'s living the dream, but must it be so cost-intensive? Maybe, Maybe not, but where does the future lie for all that hardware? Where does the browser fit into this? First, what\'s going on under the hood: Note this article is older, but accurate in explanation--except for references to Bitcoin\'s value! </p>  \n  \n  <p class="quote">New bitcoins are created roughly every 10 minutes in batches of 25 coins, with each coin worth around $730 at current rates. [A typical home-] computer ... is racing thousands of others to unlock and claim the next batch.</p>\n  <p class="quote">\n  Let\u2019s start with what it\u2019s not doing.  \n  Your computer is not blasting through the cavernous depths of the internet in search of digital ore that can be fashioned into bitcoin bullion. There is no ore, and bitcoin mining doesn\u2019t involve extracting or smelting anything. It\u2019s called mining only because the people who do it are the ones who get new bitcoins, and because bitcoin is a finite resource liberated in small amounts over time, like gold, or anything else that is mined. (The size of each batch of coins drops by half roughly every four years, and around 2140, it will be cut to zero, capping the total number of bitcoins in circulation at 21 million.) But the analogy ends there.\n  </p><p class="quote">\n  What bitcoin miners actually do could be better described as competitive bookkeeping. Miners build and maintain a gigantic public ledger containing a record of every bitcoin transaction in history. Every time somebody wants to send bitcoins to somebody else, the transfer has to be validated by miners: They check the ledger to make sure the sender isn\u2019t transferring money she doesn\u2019t have. If the transfer checks out, miners add it to the ledger. Finally, to protect that ledger from getting hacked, miners seal it behind layers and layers of computational work\u2014too much for a would-be fraudster to possibly complete.<sup>1</sup>\n  </p>\n  \n  <p>So all of this hard work <i>can be distributed</i> across browsers, which improves its energy-expensive plight. I wouldn\'t recommend running the demo in the article link below as it may overheat your device--it had my fan running double-time. But the internals are using JavaScript code for the math. Here\'s a look under the hood, and it\'s nice to see the role of <i>JavaScript graphics library, called D3JS, (Data Driven Documents)</i> playing a central role. So, below you see the browser accepting the SHA256 Hash along with the Bitcoin Owner\'s Address, and the JavaScript in the browser passes off calculations to the C++ running the JavaScript V8 engine on your computer. </p>\n  <img src="./dist/img/miningBlockchainD3.PNG" class="zoom" width="450px" />\n  <p>And so, what does it mean to mine Bitcoins across browsers in a distributed fashion? It is similar to the same concept as Ethereum\'s direction (or at least idealized by its architect, Vitalik Buterin), in running the Ethereum Virtual Machine blockchain across all the browsers that download its GETH software. Nonetheless, here\'s a succinct explanation of the browser\'s role,again from Quartz: </p>\n  <p class="quote">Mining\u2019s ultimate purpose is to prevent people from double-spending bitcoins. But it also solves another problem. It distributes new bitcoins in a relatively fair way\u2014only those people who dedicate some effort to making bitcoin work get to enjoy the coins as they are created.\n  But because mining is a competitive enterprise, miners have come up with ways to gain an edge. One obvious way is by pooling resources.<br /><br />\n  \n  \n  Your machine, right now, is actually working as part of a bitcoin mining collective that shares out the computational load. Your computer is not trying to solve the block, at least not immediately. It is chipping away at a cryptographic problem, using the input at the top of the screen and combining it with a nonce [run-time, generated random number calculated only once, then discarded], then taking the hash to try to find a solution. Solving that problem is a lot easier than solving the block itself, but doing so gets the pool closer to finding a winning nonce for the block. And the pool pays its members in bitcoins for every one of these easier problems they solve.</p>\n  <p>In practice, distributed mining pays off quite well   for the owners of that address. My blogposts on <a href="# <a href="#18-02-28">February 26th  </a> and <a href="#18-02-28">Feb. 28th about blockchain sustainability</a> paint a less rosy picture of tying the currency value to the cost of energy, but multiple solutions and fixes exist to distribute the energy load to laptops on clean renewables, the mining cooperative way ... after all, who ever said money had to be so expensive? </a> \n  <p class="cite">1.<a href="https://qz.com/154877/by-reading-this-page-you-are-mining-bitcoins/" target="_blank">https://qz.com/154877/by-reading-this-page-you-are-mining-bitcoins/\n  </a> (The article link is harmless, but wouldn\'t recommend running it if low on batteries--it doubled the fan speed)</p>  ';

  var blogpost8 = '  <p class="firstparagraph">  Data privacy regulation\'s challenge begins with five million apps between Apple and Android stores. Countless vulnerabilities, not to mention different standards and languages across the app world. <i>Like all Tech problems,</i>scalability requires Tech problem-solving--</i>in this case implying artificial intelligence.  About A.I., Zuckerberg remarks:</p>  \n  <p class="quote"> There are some really nuanced questions, though, about how to regulate [data] which I think are extremely interesting intellectually. So the biggest one that I\u2019ve been thinking about is this question of: To what extent should companies have a responsibility to use AI tools to kind of self-regulate content?<sup>1</sup>\n  </p>\n  <p>However such musing goes, the European Union\'s May 14th implementation takes a <i>direct stand against the concept of algorithm use with data</i>, which begs the A.I. question again. </p>\n  <p class="quote">The European law gives individuals the right not to be subject to completely automated  decisions which significantly affect them. These decisions could include credit algorithms that use an individual\u2019s data to decide whether a bank should grant him or her a loan.  \n      Privacy International said the clause on automated decisions could allow consumers to challenge Facebook practices like political advertising, which can be sent to users based on algorithms, because the ads are meant to sway users\u2019 votes.<sup>2</sup></p>\n  <p>I think the E.U. data policy model is intelligent - who would have thought to re-humanize our personal data   by taking it away from algorithms, without our permission. I like that, after all, who likes to be unknowingly judged? Least of all by a robot!\n\n  </p>\n      <p class="cite">1.<a href="https://www.wired.com/story/mark-zuckerberg-talks-to-wired-about-facebooks-privacy-problem" target="_blank">https://www.wired.com/story/mark-zuckerberg-talks-to-wired-about-facebooks-privacy-problem\n  </a></p>  \t\n  <p class="cite">3. <a href="https://www.nytimes.com/2018/04/08/technology/a-tough-task-for-facebook-european-type-privacy-for-all.html?ribbon-ad-idx=2&rref=technology&module=Ribbon&version=context&region=Header&action=click&contentCollection=Technology&pgtype=article" target="_blank">https://www.nytimes.com/2018/04/08/technology/a-tough-task-for-facebook-european-type-privacy-for-all.html \n  </a> </p>  ';

  var blogpost7 = '<p class="firstparagraph">Day two of Congressional hearings over Facebook\'s Data Privacy and Protections  were better articulated than the first day. Important dialogue surrounded primarily   two data privacy topics: First, financial transparency surrounding ads and political ads based on the <i>Honest Ads Act</i>, for which Zuckerberg pledged support<sup>1</sup>. \n  </p>\n  <p>Second, and   more far-reaching, discussion of the <i>Browser Act</i> also was raised by several House members. While responding to the Act\'s sponsor, Marsha Blackburn of Tennessee, Zuckerberg expressed interest in working together. This bill is not well known, but aims to set prudent, consistent guidelines of privacy in the hands of the consumer. </p>\n  <p class="quote"> [Blackburn\'s] new bill targets the full spectrum of the internet, including web giants like Amazon and Google. In Blackburn\u2019s words, it moves the government \u201Cto a posture where we have one regulator, one set of rules [and] everybody knows who\u2019s in charge,\u201D she told Recode.<sup>3</sup></p>\n  <p>So, however the power struggle goes, a <i>shared technology lexicon</i> clarifies that shades of meaning make enormous difference, depending on "what" an entity is--whether a technology is a Platform as a Service  versus media outlet or strictly merchant-based. Hopefully, <i>Tech will lead the way</i> without ceding authority in the process: </p>\n  <p class="quote">\n    But the Tennessee lawmaker\u2019s effort hasn\u2019t won any allies among privacy-conscious consumer groups, like the American Civil Liberties Union, which doubt Blackburn\u2019s methods. And her bill has already prompted a whole new round of fierce lobbying by tech and telecom giants, which don\u2019t see the need for any new regulation at all.\n    </p> \n  <p class="quote">\n  \u201CI think that, in concept, the idea that there should be stronger privacy standards for edge providers and internet service providers is right,\u201D said Neema Singh Guliani, the legislative counsel at the ACLU.</p>\n  <p class="quote">\n  But Blackburn, she added, should have gone about it differently. \u201CThe way to do it was not ... [through] gutting the FCC\u2019s rules; the way to do it was actively working on a replacement.\u201D<sup>3</sup>\n  </p>\n  <p>The bill is similar to the European data privacy model, <i>E.U. General Data Protection Regulation(GDPR)</i>, which serves as point of reference.<sup>2</sup> On May 14,   Europeans will   be implementing a pan-internet--edge and ISP--data protections, which include e-mail, Facebook and other apps, equally as for Comcast and Verizon, and industry-wide privacy defaults; Further, opt-in for privacy is more meaningful separate, and  not relegated to the main Terms and Conditions.<sup>3</sup></p>\n  <p>Policy regulation in other industries--exemplified by medical <i>HIPAA</i>, financial <i>Fair Credit   Reporting Act</i>--reveals the noticeable absence of similar policy in Tech. Tech\'s regulation is however necessarily far more complex, involving at minimum trade-offs between app-to-app data portability and new boundaries for different sources and forms of data. Clearly, the browser-based, high-security HTTPS Encryption I mentioned in my <a href="#18-04-06">April 6 three-part series on Progressive Web Apps </a>will undoubtedly be used for quick, inexpensive data privacy compliance, <i>a real boon for JavaScript developers</i>--as if there wasn\'t enough work already!\n  </p> \n  <p class="cite">2. <a href="https://www.eugdpr.org" target="_blank">https://www.eugdpr.org\n  </a></p>  \n  \n          <p class="cite">3. <a href="https://www.recode.net/2017/5/24/15685870/new-republican-privacy-bill-tech-telecom-lobbying-fcc-congress" target="_blank">https://www.recode.net/2017/5/24/15685870/new-republican-privacy-bill-tech-telecom-lobbying-fcc-congress\n          </a></p>  \n      <p class="cite">3. <a href="https://www.nytimes.com/2018/04/08/technology/a-tough-task-for-facebook-european-type-privacy-for-all.html?ribbon-ad-idx=2&rref=technology&module=Ribbon&version=context&region=Header&action=click&contentCollection=Technology&pgtype=article" target="_blank">https://www.nytimes.com/2018/04/08/technology/a-tough-task-for-facebook-european-type-privacy-for-all.html \n      </a> </p>  \n  <p class="cite">4. <a href="https://www.reuters.com/article/us-facebook-privacy-zuckerberg/zuckerberg-resists-effort-by-u-s-senators-to-commit-him-to-regulation-idUSKBN1HH1CU" target="_blank">https://www.reuters.com/article/us-facebook-privacy-zuckerberg/zuckerberg-resists-effort-by-u-s-senators-to-commit-him-to-regulation-idUSKBN1HH1CU\n  </a></p>  ';

  var blogpost6 = ' \n  <p class="firstparagraph">Mark Zuckerberg daftly played word-tennis with   Senators in the first day of Congressional Hearings on Facebook Data Privacy issues. Although, in this case, <i>there were two, at times three, tennis balls at play!</i> What I mean is that "Data" and "Personal Data" vaccilated in meaning:  At times, Senators\' questions referred to, 1.) personally identifiable data with intimate personal details, full name, location data (sensitive-data); 2.) Other times questions referred to <i>derivative data, i.e. data wrangled, refined, merged with different datasets</i> (composite-data); and,  3.) sometimes the questions meant the harmless, identity-encrypted "ad-data"(anonymized-data); but, usually, Zuckerberg responded to a question about one of these three meanings of "personal data", by responding with a non-abstract fourth: 4.) "Senator, the data, the \'likes\' and pictures you share with Facebook, they are your property," Zuckerberg would answer. Well, thank goodness! </p>\n  <p> My blogpost talks about the shades of meaning: We all know the light-hearted awkwardness when a conversation splits into two separate threads because each party unknowingly follows differing meanings from the same word, or idea.  Austin Powers would have more fun with it, but the Sociologists typically call it  a <i>Semantic Predicament</i>.<sup>1</sup></p> \n  <p>In fairness, Mark Zuckerberg volunteered as he himself was not subpoenaed, and therefore this preliminary, public discourse was critical for creating shared meaning and language about a complex topic. By volunteering to engage conversation with Senators, Zuckerberg interrupts the <i>game of telephone</i>; and, Senators engage with their constituents, and lo, America saves two years\' of misunderstandings for clear data-protection action now. Bravo, Mark! Zuckerberg is perhaps one of the braver CEOs in American history--Now, he has earned his place right next to Andrew Carnegie--and very similar lives, too. And now, with defined boundaries, <i>Tech has a better roadmap</i> for ethical policy and sensible regulation. So let the data debates begin--but this time,with only one   ball at play! </p>\n  \n  <p class="quote"> \n  </p>\n  \n  <p class="cite">1. <a href="https://onlinelibrary.wiley.com/doi/full/10.1111/j.1467-9558.2008.00324.x" target="_blank">Abend, G. (2008). The meaning of \u2018theory\u2019. Sociological Theory, 26(2), 173-199.\n  </a> <br /><a href="https://pdfs.semanticscholar.org/6df2/9e19cb02b684ee387192dfa4b1d284b88143.pdf" target="_blank">PDF  </a>\n  </p>  \n  <p class="cite">2. <a href="https://www.wired.com/story/mark-zuckerberg-talks-to-wired-about-facebooks-privacy-problem" target="_blank">https://www.wired.com/story/mark-zuckerberg-talks-to-wired-about-facebooks-privacy-problem\n  </a>\t</p> ';

  var blogpost5 = '<p class="firstparagraph">Psychometrics, along with today\'s biometrics and econometrics, form the 3 primary domains of statistical research. These three fields approach research differently. Psychometricians are less causally oriented, as their tool, "factor analysis"--<i>analyse factorielle</i>--reduces complex data to dimple, categorical forms in order to reconcile <i>quantitative data</i> with intuitive categories.<sup>1.</sup> And this research is great for expanding knowledge about society. But to what end? Who\'s to say, after all society is both the subject <i>and</i> object of this research. Social scientists are used to these mental gymnastics, yet are bound by a certain ethos of research: <strong>Anonymization, i.e. encrypting or removing personally identifiable information from datasets</strong>. This is the Social Scientists\' <i>Oath</i>--a line of decency. </p>\n<p>Tomorrow, Tuesday at noon, the world will tune in to hear Mark Zuckerberg\'s testimony before the U.S. Congress, all to hear about Facebook &amp; company\'s line of decency. However indecent any revelations may be, I\'m not that entirely threatened by the revelations. Maybe I won\'t admit I\'m   prone to Social Media influence, because I chart my course. Here\'s more from the esteemed Abbott: </p> \n\n<p class="quote">\u201CWe have ended up believing that social reality is determined in the main by certain general forces, and that these generalities are then specified by combinations of forces, and further limited by various aspects of \u201Cindividuality,\u201D which in this sense is best understood as idiosyncratic higher order interaction.\u201D<sup>1</sup> </p>\n<p>And so, while academic research focuses on the "general forces" to better understand how groups work together, the <strong>bad thing that Zuckerberg did</strong> is not following in the same spirit of generality.<sup>2</sup> They chose to collect and disseminate our "likes" as much as our locations, and ... wait for the ominous music ... the <i><strong>non-FB connected mobile contacts of the Facebook clients\' personal cell-phones</strong></i>--flipping through someone\'s personal desk drawer is definitely pushing the rules of privacy. I addressed this issue in my <a href="#18-03-20">March 20th blog post</a> on Facebook\'s ethics versus the long-standing data-handling ethics from Academia. Regarding tomorrow\'s revelations, let\'s remember to give the guy benefit of the doubt, even if they were handily swindled, while they were swindling us.<sup>3</sup>\n</p>\n\n<p class="cite">1. <a href="http://journals.sagepub.com/doi/abs/10.1177/0049124198027002002" target="_blank">Abbott, A. 1998. \u201C The Causal Devolution.\u201D Sociological Methods &amp; Research.\n\n</a></p>\n<p class="cite">2. <a href="https://www.nytimes.com/2018/04/08/us/facebook-users-data-harvested-cambridge-analytica.html" target="_blank">https://www.nytimes.com/2018/04/08/us/facebook-users-data-harvested-cambridge-analytica.html\n</a></p>\n<p class="cite">3. <a href="https://www.wired.com/story/did-cambridge-analytica-access-your-facebook-data/" target="_blank">https://www.wired.com/story/did-cambridge-analytica-access-your-facebook-data/\n</a></p>';

  var blogpost4 = ' \n  <p class="firstparagraph">Revolutions come and revolutions go, but the <i>2nd app revolution</i> is already underway, albeit quietly.<sup>1</sup> Most media sources refer to a "Native App - Progressive Web App Debate" with emphasis on what the native app can already do--<i>so if it\'s not broke, don\'t fix it</i>. However, implications change as the conversation turns to the Hyper Text Transfer Protocol (HTTP) Chrome V-8 JavaScript Engine<sup>2</sup>--you know, the web-app on <i>steroids</i>! </p>\n  <p>So what kind of steroids you ask? Let us say that the power of the modern browser lies in the open-source JavaScript engine, first C++ variation <i>originally </i>introduced in 2008 by Google\'s Chromium project. Open-source<i>-who?</i> (close your eyes next paragraph for the jargon-wary!) </p>\n  <p class="quote">A JavaScript engine is a program or an interpreter which executes JavaScript code. A JavaScript engine can be implemented as a standard interpreter, or just-in-time compiler that compiles JavaScript to bytecode in some form.<sup>2</sup></p>\n  <p>In plain english, this means that the browser speaks directly to machine code, and this is a big deal. Happily \'roided, the browser now accomodates tasks that the "App" was invented for: <i>To direct service work</i>--image and data loading, caching, storage, offline data, icons, notifica       tions, etc. </p>\n  <p>Now, through a "Manifest" file provided to the device from the browser, all of those same tasks are accomplished through a series of handshakes, and voil&aacute;: the mobile device doesn\'t see the difference between a native app and, well ... a <i>progressive app!</i></p>\n  <p>They say History repeats itself. In our digital lifetime, we have seen <i>record sales</i> surpass digital downloads again (due to streaming); we have seen the originally-decentralized internet return, or at least begin the journey, back to decentralization! And now, we have the once-lowly browser return with a vengeance and strength to replace native apps, with encrypted security, instant loading, and <i>better</i> off-line caching! Do you have an app for that?</p>\n  \n  <p class="cite">1. <a href="https://www.forbes.com/sites/forbestechcouncil/2018/03/09/why-progressive-web-apps-will-replace-native-mobile-apps/#3f39b4fa2112" target="_blank">https://www.forbes.com/sites/forbestechcouncil/2018/03/09/why-progressive-web-apps-will-replace-native-mobile-apps/#3f39b4fa2112</a></p>\n  \n  <p class="cite">2. <a href="https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e" target="_blank">https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e</a></p>';

  var blogpost3 = '  <p class="firstparagraph">Today\'s Web Browsers, &agrave; la Firefox, Chrome, Opera, etc., are <i>unabashedly on steroids</i>. And, well they deserve to be--they were here first! More importantly, the browser\'s native language--JavaScript--has been granted full power of the entire web\'s backend, i.e. servers, data, todos. This means that the browser achieves instant loading, <i>fully progressive, device-responsive,</i> full <i>HTTPS</i>-encryption security, and coherent cross-browser compatibility. So that your favorite   apps look and interact the same between the array of browser choices. The Washington Post has been lauded for helping pioneer the technology. Most notably, their progressive web app loads in .9 of a second, while their native mobile app requires 2.9 seconds.<sup>3</sup> Not exactly a photo finish!</p>\n\n  <p class="cite">1. <a href="https://www.techrepublic.com/article/how-progressive-web-apps-promise-to-upend-native-mobile-apps/" target="_blank">https://www.techrepublic.com/article/how-progressive-web-apps-promise-to-upend-native-mobile-apps/</a></p>\n\n  <p class="cite">2. <a href="https://www.fastcompany.com/3063420/how-google-and-others-are-plotting-the-revenge-of-the-web-app"target="_blank">https://www.fastcompany.com/3063420/how-google-and-others-are-plotting-the-revenge-of-the-web-app</a></p>  \n\n  <p class="cite">3. <a href="https://www.webbyawards.com/winners/2017/mobile-sites-apps/features-categories/technical-achievement/progressive-web-app-by-the-washington-post/" target="_blank">https://www.webbyawards.com/winners/2017/mobile-sites-apps/features-categories/technical-achievement/progressive-web-app-by-the-washington-post/</a></p>\n\n  \n  <p class="cite">4. <a href="https://www.gartner.com/smarterwithgartner/top-trends-in-the-gartner-hype-cycle-for-emerging-technologies-2017/" target="_blank">https://www.gartner.com/smarterwithgartner/top-trends-in-the-gartner-hype-cycle-for-emerging-technologies-2017/</a></p>';

  var blogpost2 = '  <p  ><small>Note on app definitions in this post: Anything downloaded, whether iOS or Android is <i>native mobile app</i>, while progressive web apps are strictly behind the HTTPS protocol, i.e. browser-based.</small></p>\n  <p class="firstparagraph">Mobile Devices are ever delightful, yet a pesky 2 to 3-second delay often accompanies our everyday tasks using device-native apps. For the impatient, this delay is not tolerable, and even the patient have their urgent moments (or have better things to do).    So, whether we\'re Verizon, T-Mobile, or pre-pay phones like Sprint\'s Boost, our experiences are the same: 3-second delays abound--much to our impatience!  </p>\n  <p >Instant Loading </p>\n  <p >In contrast, many of our daily web-based tasks are instant, i.e. a second or less. I feel instant loading should be <i>a right</i>, not an occasional convenience. what does this potential mean? This means an app\'s service workers can load nearly immediately and reliably. This means  non-choppy  animations, smooth scrolling, no matter the network connection you\'re using, no matter the device!  </p>\n  <p  >Device-Neutral User Interface</p>\n  \n  <p  >After a long-day\'s work using desktop and mobile apps, why should an evening transition to tablet or laptop change our experience? Further, these variations differ between apps--of which there are alot:  2.2 million apps in the iTunes collection and 3 million Android apps, as of 2017<sup>2</sup>. of iOS apps &amp; 3 million. \t My Fitbit experience is illustrative. First, I admit I have a terrible addiction to statistics, especially bio-statistics. And, Fitbit is my enabler.   However, my post-run tablet Fitbit app experience is different and more limited from the HTTPS-browser experience. App features, options, views, date-ranges vary between devices.  </p>\n  \n  <p  >Security </p>\n  <p  >HTTPS-level <i>browser</i> security vs. iTunes &amp; Play Store native app security is akin to a vault door versus building door. I\'m sorry, but there\'s a lot of difference! \n  <p  class="dailytech">In Progress  </p>\n  \n  <p class="cite">1. <a href="https://www.wired.com/2010/08/ff-webrip/" target="_blank">https://www.wired.com/2010/08/ff-webrip/</a>Re: The Web is Dead. Long Live the Internet</p>\n  <p class="cite">2. <a href="http://www.businessofapps.com/data/app-statistics/" target="_blank">http://www.businessofapps.com/data/app-statistics/</a> </p>\n  http://www.businessofapps.com/data/app-statistics/\n  \n  <p class="cite">2. <a href="https://www.techrepublic.com/article/how-progressive-web-apps-promise-to-upend-native-mobile-apps/" target="_blank">https://www.techrepublic.com/article/how-progressive-web-apps-promise-to-upend-native-mobile-apps/</a></p>\n  \n  \n  \n  <p class="cite">3. <a href="https://www.wired.com/2016/04/wait-web-isnt-really-dead-google-made-sure/" target="_blank">https://www.wired.com/2016/04/wait-web-isnt-really-dead-google-made-sure/</a></p>';

  var blogpost1 = '<p class="firstparagraph">Next May 9th, the greatest known threat to traditional blockchain technology will be formally introduced, <i>along with its source code</i>, into our technological world. Hedera Hashgraph represents a blockchain alternative that caters to time-sensitive transactions, and order fairness. Currently, one transaction with Bitcoin takes about 12 minutes to validate. Ethereum is only a couple minutes, but in a world of micro-transactions and micro-second transactions, speed counts.</p><p>Next, Hedera\'s technology uses a consensus algorithm, which depends on  node neighbors\' "voting" elections. This means that the design is impervious to "forking"--when a part of the blockchain splits and no long syncs with the main blockchain.  More importantly, Hedera\'s consensus design is   built on Asynchronous Byzantine Fault Tolerance (aBFT), so is then impervious to threats of <i>Distributed Denial of Service (DDS) attacks. </i></p>\n<p>So, lightning speed for validating crypto-transactions. Guaranteed security from hard- or soft-forking of the blockchain, and DDS-like attacks. Fairness in transaction order. Come May 9th, we\'ll see just how Hedera\'s codebase and cryptocurrency will accomplish these benchmarks, and if so, Heraclitean river stops in time! If not, yet another cryptographic mirage!</p>\n<p class="cite">1. <a href="https://www.hederahashgraph.com" target="_blank">\thttps://www.hederahashgraph.com</a> </p>\n<p class="cite">1. <a href="https://medium.com/hashgraph/eat-pray-hashgraph-56b9613ed46f" target="_blank">https://medium.com/hashgraph/eat-pray-hashgraph-56b9613ed46f</a> </p>';

  var url = [{
    id: '23',
    did: '18-04-30',
    date: 'April 30, 2018<br />',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'Data Privacy and Permissions in the Twitter-verse<br />Part II: A Defense of Data Privacy Moderation <br />',
    post: blogpost23
  }, {
    id: '22',
    did: '18-04-28',
    date: 'April 28-29, 2018<br />Weekend',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'Data Privacy and Permissions in the Twitter-verse<br />Part I: Conforming to E.U.s Regulations <br />',
    post: blogpost22
  }, {
    id: '21',
    did: '18-04-27',
    date: 'April 27, 2018<br /> ',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'This Time Baby Ill be Bullet-Proof: Innovation for a 5G World    <br /> --La Roux',
    post: blogpost21
  }, {
    id: '20',
    did: '18-04-26',
    date: 'April 26, 2018<br />',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'Romaine Lettuce and the Blockchain:<br /> Part II. Transparent Accuracy of Data',
    post: blogpost20
  }, {
    id: '19',
    did: '18-04-25',
    date: 'April 25, 2018<br />',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'Romaine Lettuce and the Blockchain:<br /> Part I. Instant Access to Data  ',
    post: blogpost19
  }, {
    id: '18',
    did: '18-04-24',
    date: 'April 24, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Sociology Tomorrow!',
    title: 'Westworld',
    post: blogpost18
  }, {
    id: '17',
    did: '18-04-23',
    date: 'April 23, 2018<br /> ',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: ' The Bright New Horizon for Tech Jobs',
    post: blogpost17
  }, {
    id: '16',
    did: '18-04-21',
    date: 'April 21-22, 2018<br />Weekend  ',
    author: 'by Thomas Maestas, MA',
    cat3: 'Sociology Tomorrow!',
    title: '  Earth needs Technology as much as Tech needs the Earth',
    post: blogpost16
  }, {
    id: '15',
    did: '18-04-20',
    date: 'April 20, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'omputing Arts and Innovation, Part II:<br />Constraints of Distributed Ledger Technology',
    post: blogpost15
  }, {
    id: '14',
    did: '18-04-19',
    date: 'April 19, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'Energy Alternatives Signal the Power Shift to Come',
    post: blogpost14
  }, {
    id: '13',
    did: '18-04-18',
    date: 'April 18, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'Blockchain Types and Trade-offs',
    post: blogpost13
  }, {
    id: '12',
    did: '18-04-17',
    date: 'April 17, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Sociology Tomorrow!',
    title: 'Dictionaries and the Joys of Abstraction',
    post: blogpost12
  }, {
    id: '11',
    did: '18-04-16',
    date: 'April 16, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'Zuckerbergs "Invitation" to the European Union Kindly Declined:<br /> How the 28-nation European Unions Privacy Regulations affect Facebook, and eventually us',
    post: blogpost11
  }, {
    id: '10',
    did: '18-04-14',
    date: 'April 14-15, 2018<br /> Weekend',
    author: 'by Thomas Maestas, MA',
    cat3: 'Sociology Tomorrow!',
    title: 'Clash of the Brick &amp; Mortars against Online Stores',
    post: blogpost10
  }, {
    id: '9',
    did: '18-04-13',
    date: 'April 13, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'Bitcoins &amp; Browsers: A Glance at Bitcoin Distributed Mining  ',
    post: blogpost9
  }, {
    id: '8',
    did: '18-04-12',
    date: 'April 12, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'Algorithms and A.I.<br />Scalability &amp; Costs   of Data Privacy Policies',
    post: blogpost8
  }, {
    id: '7',
    did: '18-04-11',
    date: 'April 11, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'When a Pickpocket is Pickpocketed:<br />Part III. The Path toward Sound Data Privacy Policy',
    post: blogpost7
  }, {
    id: '6',
    did: '18-04-10',
    date: 'April 10, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Sociology Tomorrow!',
    title: 'When a Pickpocket is Pickpocketed:<br />  Part II:  "Semantic Polymorphism", i.e., Double Talk about  Data ',
    post: blogpost6
  }, {
    id: '5',
    did: '18-04-09',
    date: 'April 9, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Sociology Tomorrow!',
    title: 'When a Pickpocket is Pickpocketed:<br />Part I: Facebook Data Generation and the Deepests Desires of Psychometricians, <i>Without Anonymization</i>   ',
    post: blogpost5
  }, {
    id: '4',
    did: '"18-04-07',
    date: 'April 7-8, 2018<br />  Weekend',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'On the	Inevitable Demise of   Native Mobile Apps in favor of Progressive Web Apps<br />Part III: The Nuts &amp; Bolts of the App Replacement Process',
    post: blogpost4
  }, {
    id: '3',
    did: '18-04-06',
    date: 'April 6, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Sociology Tomorrow!',
    title: 'On the	Inevitable Demise of   Native Mobile Apps in favor of Progressive Web Apps<br />Part II: New Powers of the Modern   Browser',
    post: blogpost3
  }, {
    id: '2',
    did: '18-04-05',
    date: 'April 5, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'On the	Inevitable Demise of   Native Mobile Apps in favor of Progressive Web Apps<br />Part I:   Mobile Devices Outwit and Outgrow the "Old-School" App',
    post: blogpost2
  }, {
    id: '1',
    did: '18-04-02',
    date: 'April 2, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'Heraclites Delight: Technology Change is the Constant, Human Behavior is Variable:<br />The April 2nd Announced Hedera Hashgraph X Launch Event  ',
    post: blogpost1
  }];

  var i;
  for (i = 0; i < url.length; i++) {
    var cat = ' \n    <div id="' + url[i].did + '" class="blogDiv"> \n    <hr />  \n    <a href="#top"><button>Top</button></a>  \n    <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n    <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5> \n    <p id="author" class="  author">' + url[i].author + '</p>   \n    <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n    <h6  id="title"   class="dailytitle chapternumber">' + url[i].title + '</h6>\n    <br />\n    <div id="post">' + url[i].post + '\n    </div>\n    </div>';
    document.getElementById("paragraph-apr").innerHTML += cat;
  }

  for (i = 0; i < url.length; i++) {
    var catMod = '\n    <div id="' + url[i].did + '_mod" class="blogDivMod"> \n    <hr />  \n    <a href="#top-mod"><button>Top</button></a>   \n    <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n    <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5>  \n    <p id="author" class="  author">' + url[i].author + '</p>   \n    <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n    <h6  id="title"   class="dailytitle chapternumber">' + url[i].title + '</h6>\n    <br />\n    <div id="post">' + url[i].post + '</div>\n    </div>';
    document.getElementById("paragraph-apr-mod").innerHTML += catMod;
  }
  console.log('blogger-apr');
  // console.log(angular.toJson(url));
};
bloggerApr();

/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bloggerMar = function bloggerMar() {

  var blogpost21 = '<p class="firstparagraph">Washington D.C.  \n  Not Normally does WonderWoman Show her Face, but the student protest takes the day on gun control. Emma Gonzalez--one of the Parkland School Shooting survivors, addressed, and marched with, hundreds of thousands of middle- and high-schoolers, took to the streets of D.C. to protest lax gun-control, e.g. AK-47\'s readily available at a moment\'s notice ... for home protection? I wouldn\'t want to be a neighbor for fear of collateral damage! So technology keeps one-upping the ol\' six-shooter to something easily labeled as <i> a Weapon of Mass Destruction</i> ... so is it still a gun?\n  </p>\n  <p >Last week and this week, the out-of-control handgun problem is in the news. This leads one to believe there is the root problem with the <i>definition</i> of a gun. As always. Definitions start wars and world wars--after all of last century, did anyone decide who controls the Coal of Sudetenland?  You can bet everyone there speaks two languages, still. The <i>definitional </i> answer makes the answer: But this is a problem in the tech age because definitions change, <i>scale of effect changes</i>, and this makes the definition impossible to pin down. The definition is as relative as the technological change makes it.  \n  \n  </p>\n  <p class="cite"><a href="http://www.latimes.com/local/california/la-me-saturday-walkouts-liveupdates-emma-gonzalez-leads-remarkable-moment-of-1521916931-htmlstory.html">http://www.latimes.com/local/california/la-me-saturday-walkouts-liveupdates-emma-gonzalez-leads-remarkable-moment-of-1521916931-htmlstory.html</a> </p>';

  var blogpost20 = '<p class="firstparagraph">Last week and this week, the out-of-control handgun problem is in the news. This leads one to believe there is a problem with the <i>definition</i> of a gun. As always. Definitions start wars and world wars--after all of last century, did anyone decide who controls the Coal of Sudetenland?? You can bet everyone there speaks two languages, still. The <i>definitional </i> answer makes the answer: This is why Blockchain technology--straddled between myriad start-ups, countless institutions and a hundred brilliant minds is The answer to our scalability problems.   \n\n  </p><p>The problem is that data structures grow at differential rates, some exponential, some linear, some slower, some as a function of time or other variable.  Yet, our data analysis needs are clear: We need a new technology to handle quickly, securely and efficiently the <i>Networked, Relational Data Problem</i>, which scales exponentially with traditional data structures, like old-fashioned Excel-like Row-&amp;-Column data structures. Yet, as one would logarithmize the equation to best adapt new data, so must the computer data structure adjust accordingly. </p>\n  <p>Too rigid, the world turned to relational, non-Structured Query Language (SQL) data, partially for the need to dislate <i>data objects</i> from their tables. The world needed that cell as a free-radical in order to mimic the data structure of societally-networked society.  Alas, a science already at hard work with Cambridge Analytica--again what\'s that field of study called again, Sociology, right? </p>\n  <p>\n  \n  </p>';
  var blogpost19 = '<p class="firstparagraph">I mistakenly laid waste to A.I.\'s reputation in my last post. It <i>did</i> let us, our whole society, let us down, and maybe the forensics will give us <i>a few excuses</i> down on the road. However, "homicide by A.I. (aka Uber)" will need to be updated in records. But, artificial intelligence is not at fault. There are a few software engineers that did the best they could--with the time their superiors gave them.  Uber leadership, let\'s hope, will be deterred from future carelessnes to come.   </p>\n\n  <p>That diatribe said, I do appreciate an Uber\'s proximity when I\'m stranded at 2:00 am in a bad part of town. Why? Because I don\'t need to plan ahead -- Uber is there! And, sadly, I don\'t need to read or study -- Google is there! But wait, don\'t judge me, I\'m not lazy! That being said, I have my own soul-searching to do: TECHNOLOGY AIDS AND ABETS ME AND MY ACTIONS, but it does not run my show> Only I take responsibility for my own actions: I allow technology into my life as a tool, and yet I   hold the power cord. I take responsibility for the tech that follows me--and believe me, I need that tech. And so do you. Not only so, but the world, and the ecological fate of our <i style="color:green">green earth</i>> also depends on tech, A.I. specifically. </p>\n  <p>\n  Humankind has already dug an ecological (dare I say \'alkaline\') pit deeper than can be dug out of: Flooding, forest fires, and Species Extinctions. A.I. is <i style="color:brown"> is </i>> the only viable hope so we, i.e. Uber, shouldn\'t prematurely spoil its development. \n  </p>\n  <p class="quote">Several questions raise their ugly head when A.I. can\'t help Earth or humankind. Like it or not, A.I. will need to 3-D print the dykes for the sunken coastal cities--like tiny island Den Haague, the most beautiful city in the world. Next, A.I. will make irrelevant fossil fuels by 2030, if not before; and those caught polluting would be fined to death, anyway. Without A.I., none of these worthwhile goals are possible. This precarious, difficult and most of all laborious job of designing our own solutions will take time: For this reason, Uber should be shamed even further for their short-cuts, and eventual errors of internal, organizational problems. <i>Uber\'s experiemental, tax-free "Testing Sandbox" cannot be the erstwhile safe neighborhoods of Surburban Phoenix, without proper caution.</i> </p>\t\t\n  <p>Are Uber\'s corporate desires, market stronghold, and shareholders\' delight more worthwhile than <i>an entire sensitive field of machine-learning research?</i> No. Uber must be warned to not steal corporate secrets from Waymo, then proceed to be 86\'d from California, then brush aside with excuses the <i>killing of an innocent Arizona bicyclist</i>.</p>\n  <p>\n  Who can count the number of very feisty taxi-men and -women that are not fans of the infamously hasty culture of Uber. The team of lawyers needed to be 86\'d from France? Uber already knows, because maybe they know B.D.O! \n  </p>\n  <p></p>\n  <p class="cite">3.\n  <a href="https://www.theguardian.com/technology/2017/apr/07/uber-waymo-lawsuit-lidar" target="_blank">https://www.theguardian.com/technology/2017/apr/07/uber-waymo-lawsuit-lidar</a>\n  </p>';

  var blogpost18 = '\n  <p class="firstparagraph">A.I. generally, and specifically Uber\'s Self-Driving Tech, both have failed society this week. Although we could all debate the merits of "Lidar", i.e. laser-based vision, the primary concern, in my view, is Uber\'s obvious carelessness in rushing their self-driving tech.  Although six thousand (6,000 too many) pedestrians are killed in the U.S. annually, I\'d only hope AI wouldn\'t add to the problem.<sup>2</sup> The Arizona victim was walking her bicycle when struck, and I as bike-commuter can\'t help but take the affair personally. </p>\n  <p>This first human death is at least a <strong>big Wake-Up moment</strong> for the industry in its haste to roll out A.I. tech.  After all, Uber\'s questionable leadership morals<sup>2</sup> and being kicked out of San Francisco for running more than six red-lights raises eyebrows to begin with.<sup>3</sup> My problem with Uber is that the car\'s algorithm, with perfect Lidar vision, did not flinch or slow down for two seconds as it killed the victim. Humans flinch and humans swerve, because protecting fellow humans is in our DNA, not in A.I.\'s. So, while we now know Uber\'s software hasn\'t caught up with its A.I.-Lidar hardware--let\'s hope we see defensive driving and some <i>TLC</i> programmed into those A.I. Algorithms!\n  </p>\n  <p class="cite">1.\n  <a href="https://www.theguardian.com/technology/2018/mar/22/video-released-of-uber-self-driving-crash-that-killed-woman-in-arizona" target="_blank">https://www.theguardian.com/technology/2018/mar/22/video-released-of-uber-self-driving-crash-that-killed-woman-in-arizona</a>\n  </p>\n  \n  <p class="cite">2.\n  <a href="https://www.theguardian.com/technology/2017/apr/07/uber-waymo-lawsuit-lidar" target="_blank">https://www.theguardian.com/technology/2017/apr/07/uber-waymo-lawsuit-lidar</a>\n  </p>\n  <p class="cite">3.\n  <a href="http://fortune.com/2017/02/26/uber-self-driving-car-red-lights/" target="_blank">http://fortune.com/2017/02/26/uber-self-driving-car-red-lights/</a>\n  </p>\n  ';

  var blogpost17 = '<p class="firstparagraph">\n  Universities, private or public institutions, serve as a beacon for\n  <strong>the Fearless Protection and Ethical Regulation</strong> of information and data. This is because data and data research\n  is innate to the university\'s Mission Statement, whereas business and governmental institutions are relatively new\n  to the game, and often at odds with the\n  <i>Academy</i>, and occasionally against each other. </p>\n  <p class="quote">Threats to student data privacy existed long before the internet. The FBI under J. Edgar Hoover infiltrated Berkeley\n  student groups to counter communism in the 1960s. Around the same time, the CIA manipulated the National Student\n  Association for intelligence gathering in other anti-communism efforts. But the privacy issue is more acute now\n  that the amount of student data in cloud-based systems has grown exponentially and is more widely dispersed.\n  <sup>2</sup>\n  </p>\n  <p> The University\'s expertise over ethically regulated data collection and management, is better than government, business,\n  and even medical domains for two reasons. First, the institution\'s long history and ethical motives with data are\n  unique. The norms of data-handling have been codified through the University\'s Institutional Review Board based\n  on its\n  <strong>stated mission</strong>. In other words, Universities take data seriously\n  <i>for reasons other than corporate profit or governmental control</i>. An example of personal data precautions has\n  played out with Harvard\'s recent data tiffs leading to the Supreme Court, illustrated by a 2016 article: </p>\n  <p class="quote">Last week undergraduates at Harvard University raised concerns about the institution handing over their data to an\n  anti-affirmative action group as part of a lawsuit. Students for Fair Admissions, which is suing the university\n  for allegedly discriminating against Asian American applicants, will have access to \u201Cacademic, extracurricular,\n  demographic and other information\u201D from all undergrads who applied to Harvard between the fall 2009 and spring 2015,\n  omitting names and Social Security numbers.\n  <sup>2</sup>\n  </p>\n  <p>The second reason why Universities understand ethical implications for data is that data and more broadly data and\n  human information\n  <i>research</i> is the institutions\' second highest priority, along with teaching and service. For example, in response\n  to the unethical Public Health research in\n  <i>Tuskegee Syphilis experiements</i>, the University instution\n  <i>stepped in</i> to help design the 1978\n  <strong>Belmont Principles</strong>. Currently, the University Institutional Review Board incorporates this with the Nuremburg\n  Code (developed after WWII NAZI research), in handling data research.\n  </p>\n  <p>In recent days,\n  <i>private companies</i> claim expertise for regulating "Fake News", and you guessed it,\n  <strong>regulation of data privacy &amp; confidentiality.</strong><sup>3</sup> The ethical authority over data privacy norms are nowhere\n  else than the University campus, case in point Harvard... Let the governments govern and the enterprises enterprise,\n  and leave the\n  <i>thoughtful, ethical regulation of data collection and precaution </i> to the Ivory Tower. Corporate and Government\n  self-regulation is opaque enough!</p>\n  \n  \n  <p class="cite">1.\n  <a href="https://www.theguardian.com/technology/2018/mar/21/mark-zuckerberg-response-facebook-cambridge-analytica"\n  target="_blank">https://www.theguardian.com/technology/2018/mar/21/mark-zuckerberg-response-facebook-cambridge-analytica</a>\n  </p>\n  <p class="cite">2.\n  <a href="https://www.edsurge.com/news/2016-10-26-pursuing-academic-freedom-and-data-privacy-is-a-balancing-act"\n  target="_blank">https://www.edsurge.com/news/2016-10-26-pursuing-academic-freedom-and-data-privacy-is-a-balancing-act</a>\n  </p>\n  <p class="cite">3.\n  <a href="https://www.bloomberg.com/news/articles/2018-03-21/paul-ford-facebook-is-why-we-need-a-digital-protection-agency"\n  target="_blank">https://www.bloomberg.com/news/articles/2018-03-21/paul-ford-facebook-is-why-we-need-a-digital-protection-agency</a>\n  </p>\n  ';

  var blogpost16 = '\n  <p class="firstparagraph">Today, US inserted itself into a large, deep debate about crypto-legitimacy by imposing new sanctions on Venezuela.\n  In case you hadn\'t heard, here\'s a quick recap:</p>\n  <p class="quote">The administration\u2019s announcement came a few hours after Mr. Trump signed an executive order barring the use of any\n  digital currency issued by the Maduro government since Jan. 9. Mr. Maduro announced last month that his country\n  had begun a presale of the Petro, backed by the nation\u2019s vast petroleum reserves.\n  <br />\n  <br />The Venezuelan government called the launch a response to a financial crisis that has prompted a profound devaluation\n  of the national currency, the bol\xEDvar, and quadruple-digit inflation.\n  <sup>1</sup>\n  </p>\n  <p>\n  This turn of events, both Maduro et al.\'s financial cleverness and Trump\'s action to de-legitimate the Petro crypto-currency,\n  are examples of the undefined, near-limitless political uses for Blockchain Tech, both offensively and defensively.\n  In fact, the ensuing events may be of great interest as we will witness a major first actual use-case of the decentralizing\n  aims of crypto-technology tool. A tool that softens the financial leverage wielded by centralized authorities, whether\n  governemntal or private.\n  </p>\n  <p>I used the term "de-legitimate" above because there are two processes at work: First, crypto-currencies are\n  <i>in themselves</i> not legitimate. A\n  <strong>crypto-currency platform gains legitimacy through a series of both technical and financial trust-building stages</strong>.\n  So legitimacy is earned first privately, and some currency platforms continue publicly to Initial Coin Offering,\n  and so on--purely financial and technical legitimacy.\n  </p>\n  <p>And then, there is the another kind of legitimacy, which involves political leverage ... </p>\n  <p class="cite">1.\n  <a href="https://www.nytimes.com/2018/03/19/world/americas/trump-venezuela-sanctions-petro.html" target="_blank">https://www.nytimes.com/2018/03/19/world/americas/trump-venezuela-sanctions-petro.html</a>\n  </p>\n  ';
  var blogpost15 = '\n  <p class="firstparagraph">Iota and Ripple cryptocurrencies use different technology than traditional blockchain in order to achieve their distributed\n  ledgers. Traditionally, outside "miners" validate the block\'s\n  <i> transaction records</i> as it replicates to the next "block." For example, a transaction is validated 2 or three\n  times, and since three miners\' validations all agree, one is kept and two are destroyed, in a nutshell; one example\n  of computations (\n  <strong>and hence coal</strong>) that cost too much time and energy.</p>\n  <p>Unlike this arrangement, Iota, Ripple, and Hedera use a directed-acyclic-graph (DAG) data structure (shaped like\n  a sideways genealogy tree) that relies on "consensus" from its nearest neighbor transaction nodes.\n  <sup>1</sup>\n  </p>\n  <p>Enough with the jargon! The bottom line is that Bitcoin\'s tech is not eco-sustainable,\n  <sup>2</sup> and so alternatives are already closing in on Bitcoin. Iota, the 8th largest cryptocurrency Iota delivers\n  open-source transparency, lightning speed, and yet is it cryptographically sound? Not according to some tech pundits:\n  </p>\n  <p class="quote">You might think that IOTA, a cryptocurrency worth over a billion dollars, and working with organizations like Microsoft,\n  University College London, Innogy, and Bosch, BNY Mellon, Cisco, and Foxconn (through the Trusted IOT Alliance)\n  would not have fairly obvious vulnerabilities, but unfortunately, that\u2019s not the case. When we took a look at their\n  system, we found a serious vulnerability and textbook insecure code.\n  <br />\n  <br /> \u201CIn 2017, leaving your crypto algorithm vulnerable to differential cryptanalysis is a rookie mistake. It says that\n  no one of any calibre analyzed their system, and that the odds that their fix makes the system secure is low,\u201D states\n  Bruce Schneier, renowned security technologist, about IOTA when we shared our attack.\n  <sup>3</sup>\n  </p>\n  <p>And so, with a 1.9 billion market cap, I sometimes have to reflect on the immensity and non-relational fact and figures\n  of our technological world! Security and other bugs are hard to avoid when an industry is moving too fast for thoroughly\n  tested betas; and each iteration involves a series of bug-patches, with short- and long-term priorities stretched\n  with new design &amp; function trade-offs.</p>\n  <p>\n  Full life-cycle software development, from napkin-idea to rolling specs, always follows these patterns yet not always with\n  so much money on the line! Here\'s a closer look at one critique of Iota:</p>\n  <p class="quote">\n  IOTA developers had written their own hash function, it was a huge red flag ... I think it\u2019s important to reiterate that\n  the IOTA developers do not agree with our characterization of this as an issue of concern. Our report lays out more\n  details about why we are concerned.\n  <br />\n  <br /> There are other red flags\u200A\u2014\u200Aunlike every other program running on your laptop or phone, IOTA uses ternary instead\n  of binary. Since all computer hardware today uses binary, IOTA converts to ternary in software, which is less efficient\n  and more complex. This complexity prevents IOTA from benefiting from existing security analysis tools that are designed\n  to work with binary, and makes the code harder to read and understand.\n  <br />\n  <br /> The current IOTA tangle requires a trusted party (the coordinator) for security, suggesting that in its current\n  form it\u2019s not ready to run as a truly permissionless, decentralized system.\n  <sup>3</sup>\n  </p><p>\n  Optimizing, not sacrificing, should be the name of the game as Tech closes in on Blockchain challenges of security, scalability,\n  and that evers-so-costly\n  <strong>Sustainability!</strong>\n  </p>\n  <p>1.\n  <a href="https://www.bloomberg.com/news/articles/2018-02-14/next-generation-crypto-ledgers-take-the-block-out-of-blockchain"\n  target="_blank">https://www.bloomberg.com/news/articles/2018-02-14/next-generation-crypto-ledgers-take-the-block-out-of-blockchain</a>\n  </p>\n  <p>2.\n  <a href="\n  https://digiconomist.net/bitcoin-electricity-consumption-surpasses-singapore-portugal\n  " target="_blank"> https://digiconomist.net/bitcoin-electricity-consumption-surpasses-singapore-portugal </a>\n  </p>\n  <p>3.\n  <a href="\n  https://medium.com/@neha/cryptographic-vulnerabilities-in-iota-9a6a9ddc4367\n  " target="_blank"> https://medium.com/@neha/cryptographic-vulnerabilities-in-iota-9a6a9ddc4367</a>\n  </p>\n  ';
  var blogpost14 = '\n  <p class="firstparagraph">Sustainability for the environment means an accelerated transition to renewables. While other nations have undertaken\n  big steps toward wind and solar - even China\'s pollution declined in 2014 for the first time\n  <sup>1</sup>. EU is now 30% renewable--from 12% in 2000 to expected 50% renewable energy by 2030\n  <sup>2</sup>. Us, it appears, not so much...ouch.</p>\n  <p>What can we do then, in our lives, to make our own contribution. Well, besides less fossil fuels and red meat, we\n  can choose our cryptocurrencies more conscientiously. One NY town\'s recent actions echo my own concerns about the\n  enormous carbon footprint of "Proof-of-Work" blockchain mining.\n  </p>\n  <p class="quote">\n  The city of Plattsburgh has put a moratorium on cryptocurrency mining to preserve natural resources, the health of its residents\n  and the city\u2019s \u201Ccharacter and direction,\u201D officials said after a public hearing Thursday. For 18 months, the 20,000-resident\n  city will not consider new applications for commercial cryptocurrency mining. Violators will face fines of up to\n  $1,000 for each day they defy the moratorium.\n  <sup>3</sup>\n  </p>\n  <p>So, me too - count me out, I can\'t help but do the same, and pronounce my own refrain from Bitcoin (this is more\n  spiritual since I don\'t own, nor mine). In contrast, I\'ll put Ethereum on hold since they are transitioning to a\n  zero carbon-footprint by year\'s end. </p>\n  <p>And, for the most environmentally friendly cryptocurrencies, I wholly support Ripple (3rd highest valued cryptocurrency)\n  and also clean\n  <i>Iota</i> (8th highest valued )\n  <sup>5</sup>. Ripple, unfortunately, is a private company with a less-accessible internal distributed ledger. And yet,\n  Hedera Hashgraph heralds the most optimistic news of all: A blindlingly fast Hashgraph structure, unbound from any\n  carbon footprint.\n  </p>\n  <p>1.\n  <a href="http://www.wri.org/blog/2017/01/china%E2%80%99s-decline-coal-consumption-drives-global-slowdown-emissions"\n  target="_blank">http://www.wri.org/blog/2017/01/china%E2%80%99s-decline-coal-consumption-drives-global-slowdown-emissions</a>\n  </p>\n  <p>2.\n  <a href="https://qz.com/1193603/two-countries-are-the-reason-the-eu-is-hitting-its-ambitious-renewable-energy-targets/"\n  target="_blank">https://qz.com/1193603/two-countries-are-the-reason-the-eu-is-hitting-its-ambitious-renewable-energy-targets/</a>\n  </p>\n  <p>3.\n  <a href="https://www.washingtonpost.com/business/economy/upstate-new-york-town-bans-bitcoin-mining/2018/03/16/bd6f669e-2947-11e8-bc72-077aa4dab9ef_story.html?utm_term=.6282ea8429d5"\n  target="_blank">https://www.washingtonpost.com/business/economy/upstate-new-york-town-bans-bitcoin-mining</a>\n  </p>\n  <p>4.\n  <a href="https://www.bloomberg.com/news/articles/2018-02-14/next-generation-crypto-ledgers-take-the-block-out-of-blockchain"\n  target="_blank">https://www.bloomberg.com/news/articles/2018-02-14/next-generation-crypto-ledgers-take-the-block-out-of-blockchain</a>\n  </p>\n  ';
  var blogpost13 = '<p class="firstparagraph">\n  <strong>Creators in the Digital Age</strong>, especially Musicians, have faced just a panoply of business model challenges,\n  notably since the 2000s\'\n  <i>Napster Era</i>. And yet, this is the age-old-case of new technologies reshaping long-standing fields, especially\n  financial structure - the bottom line! All creative fields also have technological features on the horizon that\n  may, potentially move the playing field. First some recent background: </p>\n  <p class="quote">\n  While [Taylor Swift] is certainly making money in retail sales and digital downloads, both of those metrics are spiraling\n  downward as people migrate away from the concept of owning music at all. Nielsen recently released numbers indicating\n  substantial drops in both CD and digital-track sales, which are down almost $100 million\n  <i>year over year</i> from 2014; streaming music continues to grow, but the revenue it generates isn\u2019t close to making\n  up the difference, yet.\n  <sup>1</sup>\n  </p>\n  <p>Most remember Taylor Swift\'s 2014 industry-shaking album withdraw in protest to Spotify\'s payment structure. The\n  next year Taylor took on Apple iTunes--to which Apple bended to Taylor\'s Way\n  <sup>2</sup>. These wins are amazing but not enough, if only for winning battles in a losing war. </p>\n  <p class="quote">Spotify is the future. Spotify is the enemy. Spotify doesn\u2019t pay enough. Spotify is music\u2019s best bet for revenue\n  growth. Since it arrived in the United States from Sweden in 2011, Spotify has been cast as both hero and villain\n  in the music industry\u2019s continuing debate over streaming music. </p>\n  <p class="quote">\n  It has been hailed as a potential savior through a two-tiered \u201Cfreemium\u201D model that would gradually lure listeners away from\n  piracy. Yet Spotify\u2019s royalty rates have also terrified many artists already worried that each new step in music\u2019s\n  digital evolution further devalues their work.\n  <sup>3</sup>\n  </p>\n  <p>So the trend looks dire, and yet is it really? Where, just where are the\n  <strong>Tech Platforms </strong> leading us? Tech is leading us\n  <i>nowhere</i>, at least not to one\n  <strong>singular, centralized place</strong>; rather, decentralized tech--including but not limited to blockchain--is busy\n  rewriting the boundaries between creators and consumers. This Tuesday\'s Forbes article reported on new subscription-based\n  model by Patreon. Still classical Web 2.0, it\'s novelty appears so simple, almost intuitive in potentially new pathway:</p>\n  <p class="quote">"On Kickstarter and Indiegogo, creators essentially have to start over every time," says Danny Rimer, a partner at\n  Index Ventures who is a Patreon investor and board member. "It\'s the same reason software companies went from licensed\n  software to subscriptions: predictable revenue and better service for customers."\n  <sup>4</sup>\n  </p>\n  <p>\n  Apparently Patreon, along with last November\'s\n  <i>Drip</i> by KickStarter have made headway. Patreon paid out $150 million to its artists in 2017, and each are doubling\n  annually. Decentralizing again. Well, we say we can\'t\n  <i>go back to the way it was</i>, but Tech always seems to lead us back to the way it was!\n  </p>\n  <p>1.\n  <a href="https://www.nytimes.com/2016/01/25/magazine/touring-cant-save-musicians-in-the-age-of-spotify.html" target="_blank">https://www.nytimes.com/2016/01/25/magazine/touring-cant-save-musicians-in-the-age-of-spotify.html\n  </a>\n  </p>\n  <p>2.\n  <a href="http://www.businessinsider.com/taylor-swift-new-album-reputation-not-on-spotify-apple-music-streaming-2017-11"\n  target="_blank">http://www.businessinsider.com/taylor-swift-new-album-reputation-not-on-spotify-apple-music-streaming-2017-11\n  </a>\n  </p>\n  <p>3.\n  <a href="https://www.nytimes.com/2014/11/12/business/media/taylor-swifts-stand-on-royalties-draws-a-rebuttal-from-spotify.html"\n  target="_blank">https://www.nytimes.com/2014/11/12/business/media/taylor-swifts-stand-on-royalties-draws-a-rebuttal-from-spotify.html\n  </a>\n  </p>\n  \n  \n  <p>4.\n  <a href="https://www.forbes.com/sites/kathleenchaykowski/2018/02/13/digital-medici-how-this-musician-turned-entrepreneur-plans-to-save-creators-from-advertising/#6063ea771313"\n  target="_blank">https://www.forbes.com/sites/kathleenchaykowski/2018/02/13/digital-medici-how-this-musician-turned-entrepreneur-plans-to-save-creators-from-advertising\n  </a>\n  </p>\n  ';
  var blogpost12 = '\n  <p class="firstparagraph">Today\'s demonstrations and walk-outs, led by America\'s Youth and followed by many of the education staff, has aimed\n  directly at Gun-Control legislation. Yet, the message more powerfully articulated than ever by adolescent-turns-adult\n  students, takes aim at something further afield. </p>\n  <p>Students, remembering the February 14th massacre victims, take aim at the corruption stemming from the 2010 Supreme\n  Court "Person-hood" protection for Corporations, also known as the\n  <i>Citizens United</i> Decision. A dated, but poignant, article from National Public Radio explains:\n  </p>\n  <p class="quote">The Supreme Court extended that protection to corporations, and over time also extended some \u2014 but not all \u2014 of the\n  rights guaranteed to individuals in the Bill of Rights.\n  <sup>1</sup>\n  </p>\n  <p>\n  Yet, it appears deceptively harmless for Congressional Law-makers to protect corporations, in the form of\n  <strong>Gun Manufacturers\' Lobbyists, </strong>\n  as equally as it protects humans. The origin or this ruling dates to a 70\'s Neo-Liberal, right-leaning legislation and Court\n  rulings that include a pivotal 1978\n  <i>First National Bank of Boston v. Belloti</i> decision allowing for corporations\' ballot-initiative campaign contributions,\n  citing the First Amendment.\n  <sup>2</sup>\n  </p>\n  <p>\n  \n  The Result? The corporation, in "person" form, takes on Pseudo-Human qualities: immortal, beyond-measure capital, and programmatically\n  serving stock-holders\' interests with cut-throat competition at all costs. No match against a sympathetic human,\n  yet the Corporation is given the same rights and privileges as the man in the street. Now, in the face of two decades\'\n  dead humans--as young as\n  <i>Sandy Hook Elementary</i>, which were not protected by Legislation, due to commitments made to corporate lobbying.\n  </p>\n  <p>It appears increasingly difficult for Marco Rubio to accept money from gun lobbyists\n  <i>in exchange</i> for executing their legislation demands. As I mentioned in my\n  <a href="#18-02-14">February 14th post</a> on the topic, it is clear a generation is awakening: And, the Humans have begun to revolt\n  against the\n  <strong>Heavily-Armed Lobbying Machines!\n  </strong>\n  </p>\n  <p>1.\n  <a href="https://www.npr.org/2014/07/28/335288388/when-did-companies-become-people-excavating-the-legal-evolution"\n  target="_blank">https://www.npr.org/2014/07/28/335288388/when-did-companies-become-people-excavating-the-legal-evolution</a>\n  </p>\n  <p>2.\n  <a href="http://www.ncsl.org/research/elections-and-campaigns/campaign-finance-and-the-supreme-court.aspx#dnn_ctr77443_HtmlModule_lblContent"\n  target="_blank">http://www.ncsl.org/research/elections-and-campaigns/campaign-finance-and-the-supreme-court.aspx</a>\n  </p> \n  ';
  var blogpost11 = '\n  <p class="firstparagraph">March 13th, 2018 marks the day that certain types of blockchain technologies, notably Bitcoin and Ethereum, face\n  an existential crisis: Today, a new distributed ledger technology has been announced, which departs from the traditional\n  "Proof-of-Work" (energy-intensive calculations) Blockchain technologies. This is critically important to zero carbon-footprint.\n  For example, Bitcoin calculations drain more energy, 50 TeraWatt/hrs per year--higher than Singapore\'s 49.8!</p>\n  <p>Next, the primary security flaw of consensus-based leadership like Ripple, Iota (as opposed to\n  <i>random-selection blockchain leadership</i> based on carbon-intensive calculations) is they are susceptible to Hacking:\n  Denial-of-Service Attacks are possible because the next leader Block can be anticipated and followed by a Bot),\n  so the blockchain cycle is attacked at every cycle. </p>\n  <p>The Heder Hashgraph unveiled today overcomes this problem by using a 39-node-leader hashgraph data structure. Interestingly,\n  this is based on the original Visa Credit Card design from the 1950\'s (then called AmericaBank) for authenticating\n  system. </p>\n  <p>\n  Next, The Heder Hashgraph overcomes the problem of "fairness" because blockchain transactions are\n  <i>\n  <strong>not ordered in each cycle</strong>.</i> Bitcoin transactions are haphazardly lumped together in each block-cycle,\n  which is ~12 minutes. Which means that time-sensitive financial data queries will always lose! </p>\n  <p>\n  Swirld\'s unveiled their consensus-based\n  <strong>Hashgraph, a type of distributed ledger technology (DLT),</strong> last year. Today, it has now been announced to\n  deploy in late 2018 on the Hedera Hashgraph public network. This is tremendous news! Tremendous, since I explained\n  in my\n  <a href="#18-03-01">March 1st </a> blog post that older blockchain technologies incentivize miners\' efforts by directly tying electrical-cost(\n  (in calculations) to the Bitcoin/hour profit margin. For this reason, the future horizon just considerably shortened\n  Bitcoin\'s runway for establishing anything beyond "early-adopter" status. </p>\n  <p>So, we\'ll see if the innovating crew with Vitalik Buterin\'s Ethereum can successfully alter the crypto algorithm\n  into it\'s planned carbon-free consensus-based, "proof-of-stake" form. For the moment, Bitcoin, Ethereum, and other\n  electricity-draining "proof-of-work" designs, have their\n  <strong>exchange value trapped inside their own Carbon Footprint</strong>.\n  <sup>4</sup> And so, because environmental sustainablity is foremost of concerns for future investment, survival may\n  depend on digging out of that Carbon Footprint much more quickly!</p>\n  \n  <p>1.\n  <a href="https://www.forbes.com/sites/jeffkauflin/2018/03/13/hedera-hashgraph-thinks-it-can-one-up-bitcoin-and-ethereum-with-faster-transactions/#175e5c79abcb">\n  https://www.forbes.com/sites/jeffkauflin/2018/03/13/hedera-hashgraph-thinks-it-can-one-up-bitcoin-and-ethereum-with-faster-transactions/#175e5c79abcb\n  </a>\n  </p>\n  \n  <p>2.\n  <a href="https://www.coindesk.com/hedera-hashgraph-swirlds-no-fork-guarantee-cryptocurrency-touts-resistance-code-splits/"\n  target="_blank">\n  https://www.coindesk.com/hedera-hashgraph-swirlds-no-fork-guarantee-cryptocurrency-touts-resistance-code-splits/</a>\n  </p>\n  \n  <p>3.\n  <a href="https://venturebeat.com/2018/03/13/hedera-hashgraph-and-mz-unveil-next-generation-blockchain-alternative/"\n  target="_blank">\n  https://venturebeat.com/2018/03/13/hedera-hashgraph-and-mz-unveil-next-generation-blockchain-alternative/</a>\n  </p>\n  \n  \n  <p>4.\n  <a href="https://blog.ethereum.org/2016/02/09/cut-and-try-building-a-dream/" target="_blank">https://blog.ethereum.org/2016/02/09/cut-and-try-building-a-dream/</a>\n  </p>\n  ';
  var blogpost10 = '\n  <p class="firstparagraph">\n  Throughout the centralized-tech period of the\n  <i>mobile-powered </i> Web 2.0, most Sharing transactions take place on a centralized platform that simply facilitates\n  the peer-to-peer transactions. However, the trust is based on some third-party authority. For instance, Uber serves\n  as the centralalized, third-party authority between both consumers (whether resource-obtaining or resource-providing)\n  must place their trust. Similarly, centralized authorities like Paypal, etc. enable peer-to-peer collaboration.\n  Yet, the notion of trust remains unsolved: Both parties must place their faith in the third party. By definition,\n  this problem that undermines the\n  <i>Sharing Economy</i> is resolved by Blockchain technologies, through cryptography. Now, Decentralized Apps (DAPPS)\n  provide a truer sharing platform for value transactions.\n  </p>\n  <p>In short, neither peer,\n  <strong>neither consumer needs to be trusted, because both parties share a mutual trust in their shared ledger</strong>\n  (think of a thick book with an indexed log of each and every transaction, with unchangeable entries etched by cryptography.\n  In this fashion the forms of Exchange Value include:\n  <br /> 1. Value Funds &amp; Investments\n  <br /> 2. Immutable Insurance &amp; Risk Management\n  <br /> 3. Account for &amp; Audit Commodified Value 4. Authenticate &amp; Attest to Value\n  <br /> 5. Transfer, Store, Lend Value\n  <br />\n  </p>\n  ';
  var blogpost9 = '\n  <p class="firstparagraph">Sharing can be a philosophy and even an ideology, but it is also\n  <strong> a concept sewn into the Technology of the Era</strong>. Sharing economy refers to both democratized peer-to-peer\n  marketplaces,\n  <i>and</i> collaborative, resource-circulating consumption systems where the consumer&#39;s role is provider or obtainer\n  of resources. By either sense, the\n  <i>Uberized</i> economy is made possible by the underlying platform of Decentralized Technologies. Mobile social media,\n  internet, and blockchain tech creates the conditions needed for a convenient, community-based transactions.</p>\n  \n  <p>Bitcoin and Ethereum crypto-contracts grab the headlines, however it is the very nature of blockchain&#39;s\n  <i>distributed, i.e. shared, </i>ledger that revolutionizes how humans interact, and how they exchange and share goods\n  and services. So, how might a transactional, zero-sum Market Economy merge with a Sharing Economy?</p>\n  \n  <p>In\n  <i>The Third Industrial Revolution, </i>Social and Economic theorist, Dr. Jeremy Rifkin, provides insight into how\n  the\n  <strong>Sharing Economy can grow alongside the traditional Market Economy</strong>.\n  <sup>1</sup> The theory argues three (3) breakthroughs are needed to create the conditions necessary for a new &quot;general\n  purpose technological platform,&quot; and thus an Industrial Revolution. They are management/commmunication of power,\n  sources of new power/energy, and the transportation of this power.</p>\n  \n  <p>The first condition: New forms of communication to\n  <i>manage</i> power, for example steam-powered printing press, trans-oceanic telegraph, then later telephone. The second\n  condition: New energy sources, for example steam-engine using coal and other fossil fuels. The third condition:\n  New methods to transport energy, i.e. the steam engine on rails, then later fossil fuel vehicles.</p>\n  \n  <p>So what&#39;s new about today? 5G Cellular technology coupled with decentralized, blockchain internet; Second, improving\n  solar &amp; wind power coupled with decentralized, bi-directional energy grid; and third, transporation by automatated,\n  driverless shipping for example. So, why is this important, even vital to adapt a new paradigm that fits the new\n  technology? exponential populstion growth and exponential climate changes are top of the list.</p>\n  \n  <p>Britain&#39;s innovations with steam &amp; coal characterized the first Industrial Revolution, and America&#39;s\n  innovations in telephones, oil-fueled vehicles, and centralized transportation grid, however the innovations in\n  the present era are much quicker than previous eras... which means we as a society can embrace more proactively\n  the New Paradigm needed to adapt.</p>\n  \n  <p>So, how can we change the way we\n  <i>think</i> and how we\n  <i>react</i> depends on our worldview, and how deeply entrenched. Thomas Kuhn&#39;s 2004 publication on\n  <strong>\n  <i>The Structure of Scientific Revolution</i>\n  </strong>\n  <sup>3</sup> explains how society will drag its feet in the face of change, and only after decades of controversy will\n  a New Paradigm Shift emerge. In this occasion however, we as a society may not have the luxury of decades to adapt\n  to New Technologies, as the carbon hangover from the previous Industrial Era imperils the safe arrival of the next!</p>\n  \n  <p>&nbsp;</p>\n  \n  <p>1.\n  <a href="https://www.foet.org/books/the-third-industrial-revolution/" target="_blank">https://www.foet.org/books/the-third-industrial-revolution/</a>\n  </p>\n  \n  <p>2.\n  <a href="https://www.economist.com/node/21553017" target="_blank">https://www.economist.com/node/21553017</a>\n  </p>\n  \n  <p>3.\n  <a href="https://projektintegracija.pravo.hr/_download/repository/Kuhn_Structure_of_Scientific_Revolutions.pdf"\n  target="_blank">3. Kuhn, Thomas, The Structure of Scientific Revolutions, </a>\n  </p>\n  ';

  var blogpost8 = '\n  <p class="firstparagraph">Alexa has made headlines about reports of unexplained laughter responses\n  <sup id="0309-1">1</sup>. Information like this needs a\n  <i>\n  <strong>fact-check</strong>\n  </i> &agrave; la Snopes.com.\n  <sup id="0309-2">2</sup> And, whether or not Alexa misheard, &quot;Alexa, laugh&quot;, or not, is less important than the\n  <i>socially-intrusive consequences</i> of simple app-development errors. The first issue is simply that programmer\n  <strong>logic </strong> and user-interface intuition should be as clear (and generalized) as possible. This is easier said\n  than done, for example the recent case of Hawaii&#39;s mistaken\n  <i>incoming-ballistic-missile warning system</i>.\n  <sup >3</sup> As it turned out, the dropdown-menu design placed the &quot;Send Test Warning&quot; next to &quot;Send Warning&quot;\n  in an unintuitive, fail-possible manner. Oops.</p>\n  \n  <p>While most focus on Alexa et al.&#39;s actions and abilites, in the name of caution, but rather the larger issue\n  falls on how much we allow ourselves to mentally depend on tech for things.</p>\n  \n  <p>1.\n  <a href="https://www.buzzfeed.com/venessawong/amazon-alexa-devices-are-laughing-creepy?utm_term=.um6P18a8a#.cgggP2j2j"\n  target="_blank">https://www.buzzfeed.com/venessawong/amazon-alexa-devices-are-laughing-creepy?utm_term=.um6P18a8a#.cgggP2j2j</a>\n  </p>\n  \n  <p>2.\n  <a href="https://www.snopes.com/fact-check/is-amazons-alexa-emitting-unprompted-creepy-laughing/" target="_blank">https://www.snopes.com/fact-check/is-amazons-alexa-emitting-unprompted-creepy-laughing/</a>\n  </p>\n  \n  <p>3.\n  <a href="https://www.washingtonpost.com/news/morning-mix/wp/2018/01/16/that-was-no-wrong-button-in-hawaii-take-a-look/?utm_term=.a2aa65329002"\n  target="_blank">https://www.washingtonpost.com/news/morning-mix/wp/2018/01/16/that-was-no-wrong-button-in-hawaii-take-a-look/?utm_term=.a2aa65329002</a>\n  </p>\n  ';

  var blogpost7 = '\n\n  <p class="quote">This is the first time in human history that we have the ability to see enough about ourselves that we can hope to\n  actually build social systems that work qualitatively better than the systems we&#39;ve always had.</p>\n  \n  <p class="quote">--Author unknown</p>\n  \n  <p class="firstparagraph">My February 23rd Post on women in tech focused on the\n  <i>workforce demand</i> for more women in tech positions, however today I&#39;m writing on the\n  <strong>\n  <i>social need</i> for more female insight within the tech workforce</strong> , given that programming will increasingly\n  shape our future institutions. This means that every institution, whether private hospitals, non-profit charity\n  foundations, or government bureaus, will effectively restructure (optimize) their own organizational structure in\n  an increasingly\n  <i>data-driven</i> paradigm. From a Sociology of Organizations perspective, the changes to come are breath-taking to\n  consider.</p>\n  \n  <p>So why women? Where could I start? Better stated, why is a quintessentially important job sector, a sector in desperate\n  need for insight, comprised primarily of men?\n  <sup >1</sup> The facts are evident: ~15-20% of women comprising tech positions.\n  <sup  >2</sup> Numbers aside, I argue there is a quintessential societal need for more women in tech: This is because computing\n  and understanding data has changed since the data collection from Web 2.0 (mobile), becoming more networked and\n  relational.</p>\n  \n  <p>The challenge for society in this age is historic, and women must absolutely be included in the process of the age:\n  Please consider, that in the 1650&#39;s, the invention of the microscope opened a new world of data and\n  <i>information</i> about the bacteriological, microscopic surroundings--hitherto blind to all. Likewise, the telescope\n  has allowed us as a society to explore the outer universe and earth&#39;s position within it.</p>\n  \n  <p>Now, the inventions of machine-learning, computing coupled with Big Data analytics, allows us to explore (and manage)\n  a universe of knowledge--about\n  <i>ourselves</i>, human society--with unfathomably complex, unstructured relational data structures. Accessing the\n  data to computer-readable form is one thing, but meaning in data is inaccessible until the\n  <i>output</i> can be\n  <i>re-</i>programmed into meaningful, human-readable data, i.e. information. This latter stage of development is the\n  key challenge--for which success depends on representative female participation in Tech.</p>\n  \n  <p>Adding to the challenge of finding meaningful trends is the backdrop of noise from spurious variables. This is akin\n  to finding a needle in an increasingly complex and growing haystack.</p>\n  \n  <p class="quote">What&#39;s different now and has changed is it&#39;s no longer about taking this data, putting it into a computer\n  running a calculation and getting a balance sheet answer ...</p>\n  \n  <p class="quote">What&#39;s important now is what is the context of the data, what is it connected to, what effect is it having on\n  data around it... It&#39;s basically a network of the data, it&#39;s no longer sort of tabular columns, of rows\n  of data, it&#39;s\n  <i>interconnected patterns</i>.\n  <br /> --Tim Cook</p>\n  \n  <p>This quote means that as we move away from rule-based, mechanistic data analytics toward more complex, relational\n  and networked data, we need an equally complex paradigm to keep up. Excluding the female mind from this challenge\n  is not simply a clumsy, myopic mistake. Worse yet, so long as the Tech Industry remains gender lop-sided, Tech will\n  increasingly resemble another myopic beast, a cave-dweller named Cyclops.</p>\n  \n  <p>1.\n  <a href="https://www.huffingtonpost.com/2015/03/27/women-in-tech_n_6955940.html" target="_blank">https://www.huffingtonpost.com/2015/03/27/women-in-tech_n_6955940.html</a>\n  </p>\n  \n  <p>2.\n  <a href="https://fairygodboss.com/articles/women-in-tech-facts-figures-and-percentages" target="_blank">https://fairygodboss.com/articles/women-in-tech-facts-figures-and-percentages</a>\n  </p>\n  \n  <p>3.\n  <a href="https://www.aauw.org/research/why-so-few/" target="_blank">https://www.aauw.org/research/why-so-few/</a>\n  </p>\n  ';

  var blogpost6 = '\n  <p class="firstparagraph">Washington&#39;s assertion of States&#39; Rights yesterday may augur the first of many lawsuits over control over\n  bandwidth.</p>\n  ';

  var blogpost5 = '<p class="firstparagraph">Net Neutrality Rules, potentially one of the more important set of Individual Rights for us as citizens in the tech\n  age, will soon undergo the rule changes voted by the Federal Communications Commission (FCC) this past December.\n  In a nutshell, the Internet Service Providers (ISP&#39;s), e.g. Comcast, Cox, Verizon are granted the power--as\n  a Title I &quot;information service&quot;--to slow down traffic, make fast- &amp; slow-lanes. Of course this is\n  bad news for internet-users because even premium users may experience &quot;throttling&quot; if using the ISP&#39;s\n  preferred apps. The only stipulation holds that the ISP&#39;s rules are made public. However, 21 states are bringing\n  lawsuits to fight these changes, and the first assertion of State Law by Washington State today:</p>\n  \n  <p class="quote">The FCC is already embroiled in a variety of lawsuits related to its rollback of net neutrality rules, including\n  an effort from 21 state attorneys general to get a court to block the FCC&#39;s move.</p>\n  \n  <p class="quote">&quot;This is symbolic politics, because the states know it is illegal to do,&quot; Roslyn Layton, a visiting scholar\n  at the American Enterprise Institute, told NBC News. &quot;But they can put rules on the book and make it look like\n  they&#39;re doing something.&quot; The FCC is already embroiled in a variety of lawsuits related to its rollback\n  of net neutrality rules, including an effort from 21 state attorneys general to get a court to block the FCC&#39;s\n  move.\n  <sup>1</sup>\n  </p>\n  \n  <p>S The big question arises over\n  <i>who</i> has jurisdiction between the States&#39; and Federal authority; yet one thing is certain, the coming battle\n  for protecting citizens&#39; rights will take place over jurisdiction of Internet Bandwidth turf.</p>\n  \n  <p>\n  <a href="https://www.nbcnews.com/tech/tech-news/washington-state-passes-net-neutrality-law-states-push-back-against-n854086"\n  target="_blank">https://www.nbcnews.com/tech/tech-news/washington-state-passes-net-neutrality-law-states-push-back-against-n854086</a>\n  </p>\n  ';

  var blogpost4 = '<p class="firstparagraph">Germs present a timely topic for today, given the especially virulent\n  <strong>Flu Virus strain</strong>. Many, like me, have wondered why our 1940&#39;s-era\n  <sup>1</sup> technology in Flu Vaccine fabrication wouldn&#39;t invite more innovative solutions. Without feigning any\n  medical expertise, I have to still ask about the progress made with the ever-mutating--i.e., drifting--Flu virus&#39;\n  surface protein &quot;head,&quot; called hemaglutinin. This strategy &quot;guesses right&quot; very effectively,\n  and provides an effective solution for most, in most years. Yet this winter has revealed that effectiveness statistics\n  are\n  <i>not always</i> in our favor.</p>\n  \n  <p class="quote">For many decades, researchers believed the flu vaccine offered solid protection if it was a good match to the circulating\n  strains; studies from the 1940s through the 1960s routinely showed an efficacy of 70% to 90%. But those studies\n  relied on a misleading methodology.</p>\n  \n  <p class="quote">Danuta Skowronski, an epidemiologist at the BC Centre for Disease Control in Vancouver, Canada, instead blames mutations\n  in the vaccine strain itself. The most common influenza vaccine contains an &quot;inactivated&quot; virus, which\n  manufacturers grow in chicken eggs. As Skowronski&#39;s team first reported in 2014, the virus can mutate while\n  it is growing in the eggs, resulting in a vaccine unable to block circulating strains.\n  <sup>1</sup>\n  </p>\n  \n  <p>Earlier, I casually mentioned &quot;guessing&quot;, yet with great respect, the science behind estimating the flu\n  virus between the time of R &amp; D, fabrication, and the flu\n  <i>season</i>. (This antigenic drift, not to be confused with\n  <i>Antigenic Shift</i> in which the Flu Virus makes an abrupt change.) I&#39;ll let the CDC abbreviate this:</p>\n  \n  <p class="quote">One way they change is called &ldquo;antigenic drift.&rdquo; These are small changes in the genes of influenza viruses\n  that happen continually over time as the virus replicates. These small genetic changes usually produce viruses that\n  are pretty closely related to one another, which can be illustrated by their location close together on a phylogenetic\n  tree. Viruses that are closely related to each other usually share the same antigenic properties and an immune system\n  exposed to an similar virus will usually recognize it and respond\n  <sup>2</sup>.</p>\n  \n  <p>So, ultimately, the strategy is to estimate the form, location, of that virus--what it will look like--at a particular\n  period each year. This implicates a strategy to estimate the trajectory, stage by stage, of this virus, i.e. a longitudinal\n  time-series morphology, each year. The article makes this point more precise:</p>\n  \n  <p class="quote">But these small genetic changes can accumulate over time and result in viruses that are antigenically different (further\n  away on the phylogenetic tree). When this happens, the body&rsquo;s immune system may not recognize those viruses.\n  <sup>2</sup>\n  </p>\n  \n  <p>Petri dishes aside, let&#39;s focus on the changing nature of the Flu Virus, which makes itself a\n  <i>research </i>challenge in itself because of an ever-mutating object of study. Yet, this ever-changing nature also\n  provides the very tool Statisticians need most for estimating: Big Data. The Law of Large Numbers means that plain\n  math can accurately plot, and in most cases predict with a moderate statistical significance, future events, sort\n  of.</p>\n  \n  <p>Sort of I say because too often we predict that two separate events are more likely to occur, conditional on each\n  other, then conditional upon other factors. This being\n  <i>correlation</i>, but the Statistician&#39;s Holy Grail is the other kind: Causality. Causality hinges on only thre3e\n  things: 1) Association, 2) Time Precedence, and 3) Ruling out any\n  <i> effect</i> of spurious variables. (Hang with me, I&#39;m still getting back to the subject of our annual predictions\n  about a few months&#39; worth of antigenic drift.)</p>\n  \n  <p>Therefore, Big data, and new advances in the statistical sciences, and the technology that increasingly defines our\n  sciences, may soon refine and supercharge research into the first and third of the three points of causality. The\n  first of these, the associations, along the phylogenetic tree, are merely a network at its base, the science of\n  which gains computational strength each year. Rare as it is in Academia, in this case Might makes Right!</p>\n  \n  <p>\n  The third tenet of causality, after association and time direction, is ruling out the effect of other factors when separating\n  <i>cause</i> and consequence. Advances in managing big data, and statistical analysis of it, means gaining a better\n  handle on the multiple effects of\n  <sup>spurious </sup>factors, hence analysis optimized by new, network-graph data structure technology. The Law of Large\n  Numbers\n  <sup>3</sup>, i.e. the sheer number of mutations and other factors, coupled with new\n  <strong>technology</strong>, will better inform the morphology of the\n  <i>path</i> of the virus, along the phylogenetic tree itself. Who knows where a cure may come from, perhaps a bio-statistician\n  out there, churning the numbers, may be the one to stumble upon a better Flu Vaccine!\n  \n  </p>\n  <p>1.\n  <a href="http://www.sciencemag.org/news/2017/09/why-flu-vaccines-so-often-fail" target="_blank"> http://www.sciencemag.org/news/2017/09/why-flu-vaccines-so-often-fail </a>\n  </p>\n  \n  <p>2.\n  <a href="https://qz.com/1143420/the-2017-2018-flu-vaccine-is-less-effective-than-usual" target="_blank"> https://qz.com/1143420/the-2017-2018-flu-vaccine-is-less-effective-than-usual </a>\n  </p>\n  \n  <p>3.\n  <a href="https://www.cdc.gov/flu/about/viruses/change.htm" target="_blank"> https://www.cdc.gov/flu/about/viruses/change.htm </a>\n  </p>\n  ';

  var blogpost3 = '\n  <p class="firstparagraph">Back in 1997, a Pulitzer-Prize winning theory--based on Dr. Jared Diamond&#39;s\n  <i>Guns, Germs, and Steel: The Fate of Human Societies</i> --provided the recipe book for the success of societies.\n  Not without controversy, the theory posits that geographic and environmental preconditions, once met, provide tech\n  &amp; resources trading opportunities, within a network of other nation-states also vying for technogical innovation.</p>\n  \n  <p>A nation&#39;s Technology, in turn, opens the means necessary to expansive, stable, independent sovereignty that\n  lasts and thrives. Equally so, the nation&#39;s friends, especially those making the best-friends list, share and\n  receive a secondary, &quot;residual&quot; technological bump over the time-course of the network&#39;s future trading,\n  i.e. network transactions. So, if our best friends Canada and Mexico are less keen, then there is network reverberation!</p>\n  \n  <p>Given the advent of a real, lasting Trade-War, I would think that a network theorist wouldn&#39;t be betting on one\n  particular node within this network. I say this because a disproportionately asymmetrical flow of technology and\n  resources, while simultaneously raising prices on most staple goods, may spell trouble for the Every-Day person.\n  So far, Nation-State: 0, People: 0 ... So, who wins with a Trade War? Alas, let&#39;s hope not the resurrection\n  of the Neo-Multi-National Corporations, born from NAFTA deals, coincidentally, from the late 1990&#39;s. Bah humbug!</p>\n  \n  <p>&nbsp;</p>\n  \n  <p>1.\n  <a href="http://www.jareddiamond.org/Jared_Diamond/Guns,_Germs,_and_Steel.html" target="_blank">Guns, Germs, and Steel. &quot;Steel: The Fates of Human Societies.&quot; Diamond J (1997).</a>\n  </p>\n  ';
  var blogpost2 = '\n<p class="firstparagraph">Security, security, another day another platform risk, or risks from your device, or risks from transactions, Today&#39;s\nheadline buried beneath a techy jargon provides a glimpse of the rising threat of web-application-based hackery:\nCryptojacking.\n<i>Coindesk</i> reports, &quot; Opera browser introduces cryptocurrency miner protection for smartphones ... &quot;</p>\n\n<p class="quote">Cryptocurrency miners can overload smartphones&#39; CPUs, forcing 100 percent usage and potentially causing a phone\nto overheat. And the damage can sometimes be permanent. According to a ZDNet article, one trojan generated so much\nheat in a phone, its battery became swollen, permanently damaging the phone. While excessive ads were one reason\nfor the heat generation, the main cause was that the phone&#39;s CPU was hijacked to mine for Monero.\n<sup>1</sup>\n</p>\n\n<p>The larger issue here is that the lines between trusted mobile-app authorities, i.e., certified by Play Store or\nApple&#39;s is increasingly irrelevent. This is because an increasing number of app-users are ditching device-downloaded\napps, preferring for browser applications--hence, a much more appetizing market for the newest generation of blackhat\nhackers, online thieves, peeping-toms, and other ill-wishers. There are a few driving factors for this issue--one\nof which is the onset of Decentralized Applications (DAPPs), which use the\n<i>browser</i> to interface between the Every-Day blockchain client/merchant/programmer and the actual byte-code of\nthe blockchain (via WEB).</p>\n\n<p>More importantly, the larger issue is that we live in an age in which the exclusive, native browser language since\n1995, i.e. JavaScript. Security issues with browser-based apps were very low, because JavaScript never left the\nbrowser, ever. Until 2009, Data, Servers were the domain of PHP, JAVA, Python, etc. or some other language for the\nhighly sensitive, dirty work of dipping into all that data sitting ontop of centralized servers around the world.\nPHP wasn&#39;t easy, so power and responsibility usually followed with all the extra effort and expertise.</p>\n\n<p>2015 augured in the Node.js server-accessing (can create, read, update, and delete date) new-born capabilities of\nJavaScript</p>\n\n\n<p>1.\n<a href="\nhttps://www.coindesk.com/opera-browser-introduces-cryptocurrency-miner-protection-for-smartphones/\n" target="_blank"> https://www.coindesk.com/opera-browser-introduces-cryptocurrency-miner-protection-for-smartphones/ </a>\n</p>\n';
  var blogpost1 = '\n<p class="firstparagraph">I couldn&#39;t help but revisit the\n<strong>Environmental Sustainability</strong> problem I addressed in my February 28th post. This problem, experienced by\nthe top two crypto-currencies Bitcoin and Ethereum, is that the\n<i>monetary</i> value of the currency is matched to the\n<i>computing difficulty</i>--measured either by how much the computer is sweating, or by electricity KiloWatt Hours\nper year.\n<sup>1</sup> Digiconomist succinctly writes:</p>\n\n<p class="quote">The continuous block mining cycle incentivizes people all over the world to mine Bitcoin. As mining can provide a\nsolid stream of revenue, people are very willing to run power-hungry machines to get a piece of it. Over the years\nthis has caused the total energy consumption of the Bitcoin network to grow to epic proportions, as the price of\nthe currency reached new highs.\n<sup>2</sup>\n</p>\n\n<p>And, so the issue I&#39;m addressing is a side-effect of the deepening incentivization for miners to invest more\nequipment, and in turn, more electricity. The article goes on to report Bitcoin&#39;s surpassing 50 TeraWatt-Hours-per-year\nusage has surpassed that of Portugal and Singapore, which are 49.5 TWh per year, and 49.8 TWh per year, respectively.\nIn other words, the usage by the Bitcoin miner&#39;s cost (in electricity) compared with the miner&#39;s gain (in\nBitcoins accrued by incentivized mining) drives up and incentives a deeper Carbon Footprint.</p>\n\n\n<p class="quote">Fueled by a meteoric rise in the Bitcoin price over the past few months, the power usage of the Bitcoin network has\nbeen increasing at a feverish pace. Just a little over three months ago, at the start of November 2017, the Bitcoin\nEnergy Consumption Index was estimating the total electricity consumption of the Bitcoin network to be half of the\ncurrent amount. On the first day of November, the estimated consumption was equal to 24.3 TWh per year.\n<sup>1</sup>\n</p>\n\n<p>\nCarbon Footprint, measured in this way, equates as a double-edged sword: The miner&#39;s electricity costs account for approximately\n65% of the profit (Bitcoin units&#39; value, measured when mined). So the\n<i>economic </i>usage means the cheapest available fuel is part of the business model--and it would lead to the cost\nof the cheapest source of energy: Dirty Coal. At the end of the day, if the\n<i>currency&#39;s </i>rising value means that more computationally-intensive mining is more and more profitable, then\nperhaps the other edge looks preferred!\n</p>\n\n<p>1.\n<a href="\nhttps://digiconomist.net/bitcoin-electricity-consumption-surpasses-singapore-portugal\n" target="_blank"> https://digiconomist.net/bitcoin-electricity-consumption-surpasses-singapore-portugal </a>\n</p>\n\n<p>2.\n<a href="\nhttps://digiconomist.net/bitcoin-energy-consumption\n" target="_blank"> https://digiconomist.net/bitcoin-energy-consumption </a>\n</p>\n';
  var url = [{
    id: '21',
    did: '18-03-24',
    date: 'March 24-25, 2018<br /> Weekend ',
    author: 'by Thomas Maestas, MA',
    cat3: 'Sociology Tomorrow!',
    title: '1968 Meets 2018: Scalability Issues in the Mean Time',
    post: blogpost21
  }, {
    id: '20',
    did: '18-03-23',
    date: 'March 23, 2018 <br /> Weekend',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: '<i>Its not about the Blockchain, the Efficient Network Data Distribution is the Answer!</i>',
    post: blogpost20
  }, {
    id: '19',
    did: '18-03-22',
    date: 'March 22, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'A.I. Part II: Problems with Scale, Kindly Resolved by A.I.',
    post: blogpost19
  }, {
    id: '18',
    did: '18-03-21',
    date: 'March 21, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'Hey Uber Driver, Please Slow Down!',
    post: blogpost18
  }, {
    id: '17',
    did: '18-03-20',
    date: 'March 20, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'The Facebook Fiasco: Why Zuckerberg Should not have Dropped out of Harvard',
    post: blogpost17
  }, {
    id: '16',
    did: '18-03-19',
    date: 'March 19, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Sociology Tomorrow!',
    title: 'A New Politics of Power:<br /> The Cryptographic Financial Escape Hatch',
    post: blogpost16
  }, {
    id: '15',
    did: '18-03-17',
    date: 'March 17-18 2018 <br /> Weekend',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'Energy Alternatives Signal the Power Shift to Come, Part II: A Ripple and an Iota of Sustainable Crypto-Currency',
    post: blogpost15
  }, {
    id: '14',
    did: '18-03-16',
    date: 'March 16, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'Energy Alternatives Signal the Power Shift to Come',
    post: blogpost14
  }, {
    id: '13',
    did: '18-03-15',
    date: 'March 15, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'I Love this Record Baby but I Cant See Straight Anymore:<br />Its Gonna be Okay, Flip that Record and Just Dance!',
    post: blogpost13
  }, {
    id: '12',
    did: '18-03-14',
    date: 'March 14, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Sociology Tomorrow!',
    title: '<i>Tou <strong>Demou</strong> tes<strong> Krates</strong></i>:<br />Strength of the People',
    post: blogpost12
  }, {
    id: '11',
    did: '18-03-13',
    date: 'March 13, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'The Sharing Economy Hand-in-Hand with the Market Economy:<br /> Part III and Sustainability of Shared, Distributed Ledger Types',
    post: blogpost11
  }, {
    id: '10',
    did: '18-03-12',
    date: 'March 12, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Sociology Tomorrow!',
    title: 'The Sharing Economy Hand-in-Hand with the Market Economy:<br /> Part II and New Forms of Trust',
    post: blogpost10
  }, {
    id: '9',
    did: '18-03-10',
    date: 'March 10-11, 2018  <br /> Weekend',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'The Sharing Economy Hand-in-Hand with the Market Economy:<br /> Part I and the Race for Sustainability Solutions',
    post: blogpost9
  }, {
    id: '8',
    did: '18-03-09',
    date: 'March 9th, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: '&#39;Alexa, can you laugh?&#39;',
    post: blogpost8
  }, {
    id: '7',
    did: '18-03-08',
    date: 'March 8, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Sociology Tomorrow!',
    title: '1.4 Million Reasons for More Women in Tech, Part II <br /><br /> * Continuation of Women in Tech Theme from<a href="#18-02-23">Feb. 23rd Blog</a>',
    post: blogpost7
  }, {
    id: '6',
    did: '18-03-07',
    date: 'March 7, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'About the April 23 Implementation of the FCC Net Neutrality Laws: <br /> The Coming Battle of States&#39; versus Federal Rights Part II',
    post: blogpost6
  }, {
    id: '5',
    did: '18-03-06',
    date: 'March 6, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'April 23 Implementation of the FCC Net Neutrality Laws: <br /> The Coming Battle of States&#39; versus Federal Rights',
    post: blogpost5
  }, {
    id: '4',
    did: '18-03-05',
    date: 'March 5, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Sociology Tomorrow!',
    title: 'A Return to the Question of Guns, Germs, and Steel: Part II and the Germs',
    post: blogpost4
  }, {
    id: '3',
    did: '18-03-03',
    date: 'March 3-4, 2018 <br /> Weekend',
    author: 'by Thomas Maestas, MA',
    cat3: 'Sociology Tomorrow!',
    title: 'A Return to the Question of Guns, Germs, and Steel',
    post: blogpost3
  }, {
    id: '2',
    did: '18-03-02',
    date: 'March 2, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'Widening Circles of Mobile-App Security Risks',
    post: blogpost2
  }, {
    id: '1',
    did: '18-03-01',
    date: 'March 1, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'Blockchain Sustainability Issues and The Double-Edged Sword',
    post: blogpost1
  }];

  for (i = 0; i < url.length; i++) {
    var cat = ' \n    <div id="' + url[i].did + '" class="blogDiv"> \n    <hr />  \n    <a href="#top"><button>Top</button></a>  \n    <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n    <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5> \n    <p id="author" class="  author">' + url[i].author + '</p>   \n    <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n    <h6  id="title"   class="dailytitle chapternumber">' + url[i].title + '</h6>\n    <br />\n    <div id="post">' + url[i].post + '\n    </div>\n    </div>';

    document.getElementById("paragraph-mar").innerHTML += cat;
  }

  var i;
  for (i = 0; i < url.length; i++) {
    var catMod = '\n    <div id="' + url[i].did + '_mod" class="blogDivMod"> \n    <hr />  \n    <a href="#top-mod"><button>Top</button></a>   \n    <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n    <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5>  \n    <p id="author" class="  author">' + url[i].author + '</p>   \n    <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n    <h6  id="title"   class="dailytitle chapternumber">' + url[i].title + '</h6>\n    <br />\n    <div id="post">' + url[i].post + '</div>\n    </div>';

    document.getElementById("paragraph-mar-mod").innerHTML += catMod;
  }

  console.log('blogger-mar');
  // console.log(angular.toJson(url));
};

bloggerMar();

/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bloggerFeb = function bloggerFeb() {

  /*
    var blogpost17 = `
    <p class="firstparagraph">First, let me describe that blockchain technologies, i.e. Government contracts, Business contracts, Bitcoin and other
  
  cryptocurrencies, all rely on network graph theory, both on the low-level programming technology (peer-to-peer global
  
  ip networks) across the spectrum to high-level interfaces for institutional, corporate, individual needs and uses.
  
  These blockchain &quot;network&quot; analyses depend on highly variable--and simultaneous--network changes, node
  
  changes, and link changes; and, the latter three may arbitrarily change interdependantly or not.</p>
  
  
  
  <p>Therefore, blockchain technologies must first accomodate complex node variables for contracts (relationships) that
  
  include arbitrarily hierarchical mappings and conditional data structures. Secondly, blockchain tech must face analytical
  
  challenges that arise from informal practices
  
  <sup>1</sup>, by which the organizational nodes (employees) choose to deviate from the employee role&#39;s protocol for
  
  the sake of efficiency, convenience, company culture, and multiple other levels of human factors.</p>
  
  
  
  <p>Sociologists Meyer &amp; Rowan&#39;s (1977)
  
  <i>New Institutionalism</i> explains how employees change practices and decouple
  
  <i>actual</i> organizational structure from recorded rules, as a function of organizational size, time, convenience,
  
  etc. These continually new, unknown constraints on data must be intimately understood, non-algorithm human understanding
  
  <i>by at least one side </i>of the exchange. How do we recognize unwritten, soft rules and behaviors of a bank, a person,
  
  or a company&#39;s internal bot?</p> 
  
  <p>The hard sciences domain of Software Engineering, Computer Science, and Mathematics have brilliantly brought the
  
  world the blockchain tool, <s>for which</s> the Hard Sciences can and must share and propogate it's technical expertise <i>and higher standard of metric truth</i><s style="color:purple" class="strike-purple"> not contribute everything, especially relating with</s> to the other sciences that are still lagging behind--namely The Discipline of Sociology</s> toward acclimating to the modern age's social priorities and needs. Ask yourself, how well do 1,000 top blockchain-related programmers understand the multi-dimensional layers of hierarchical social, corporate, and governmental relationship networks--probably 700 of the 1,000. And how many social scientists can understand the technological sciences? Probably 200 out of 1,000. This means that <i>a chunk of the scientific displines suffer from acute innumeracy</i>. So how do we bridge this massive knowledge gap between qualitative meaning in the smart-contract.</p>
  
  <p>In the past, the layers of abstraction from raw technological tool to societal use was refined, improved, integrated through multiple layers of &quot;middlemen&quot;, such as lawyers, corporate lawyers, government institutions, non-governmental, non-profit and for-profit actors. Blockchain technology, by its very nature, erases the middlemen. Suddenly, one programmer, for example, is writing the same healthcare insurance crypto-contract, that last month an entire team of hospital employees spent a month writing; then overseeing and managing different facets of this same thing.</p>
  
  
  
  <p>However, the crypto-contract, once deployed to the blockchain, auto-manages the rest, forever or for the life of
  the contract. Therefore, rather than redoing the trials and errors of 200 years&#39; Sociology Network Analysts&#39;
  research and analytical development. Therefore, medical and other social fields cannot and should not turn to the
  Hard Sciences for solutions. These Med researchers and developers are already at home, safe within the academic
  domain of the Raw Sciences of Medical Sociology, Public Health, and so on. The next ten years of blockchain technology
  can either be defined by unwitting, piecemeal advances, accompanied by frequent, non-improving distastrous crises.
  Or, the next ten years can follow Sociology&#39;s Scientific Method toward a mildly turbulent, but stable and beautiful
  future.</p>
  
  
  
  <p>Examples aside, the <s>primacy</s> innumeracy of the Sociology academic field in the early 21st century quickly becomes apparent on
  
  review of the Sociologists&#39; specialization in network theories imbued with symmetrical and asymmetrical relationships,
  
  within social networks that change arbitrarily the direction, conditions, and values of those same relationships.
  
  <s>We</s> Sociologists deal with real-time, logical and hierarchical network mappings that appear arbitrary, yet are characterized by fixed patterns. This implies a higher level of competency to accurately judge a point-of-view without the ability to directly consult machine learning. <i>This is a Code or Be Coded moment in the sciences.</p>
  
  
  
  <p>No other academic field than sociology has advanced into the details, and endless network rabbit-holes that characterize societal behavior. Not until this second millenial decade could the marriage of Large Number Statistical Theory
  
  become consumated with the brilliance of early 1900&#39;s Sociological French Network Theories, like Maurice Halbswach&#39;s
  
  work on the clearly defined network patterns of a society&#39;s Collective Memory.</p>
  
  
  
  <p>No other academic field has collected and refined knowledge on network arbitrariness, such that Economic&#39;s &quot;irrational
  
  behaviors&quot; and Mathematical &quot;complexity models&quot; do not
  
  <i>touch to the bone</i> the meaning, the intersectionality of network analysis, which must incorporate simultaneous
  
  node changes (person gets job /or/ does not get job), network changes (All get jobs /or/ only 3 of 15 network groups
  
  get jobs), and most importantly the
  
  <i>relationship</i> changes (all jobs always useful /or/ half of job groups no longer useful) across time and fixed.</p>
  
  
  
  <p>Fine. So, why is Sociology&#39;s network theory so valuable beyond just the network insights gleaned from 19th and
  
  20th centuries&#39; network problems? Follow: European sociology came of age in the analog social era, while North
  
  American Sociology only recently come of age (Quebec in the 1960&#39;s [post-1968], U.S. in the 1990&#39;s[post-1999],
  
  in the digital social era. Therefore, the problem-solving patterns of past sociology are inherently small-data and
  
  more qualitative analysis, and thus only Sociology incorporates &quot;human-ness&quot; into the billion rows and
  
  columns of quantitative--numbers-only--analysis.</p>
  
  
  
  <p>For example, Oxford-developed S.I.E.N.A. Software accomplishes this task. SIENA--named for Simulation Investigation
  
  for Empirical Network Analysis--software calculates the real-time values, direction, and conditions of each relationship
  
  (link) in a network, simultaneously as each node, network, or alter-link changes or is changed; with this, it is
  
  possible to isolate directional, conditional
  
  <i>influence change</i> in real-time. Real-time sounds impossible, however, the SIENA documentation
  
  <sup >2</sup> describes its program algorithm to the statistical analysis of network data, with the focus on social networks.</p>
  
  
  
  <p>An easy example to grasp this is the concept of whether a person
  
  <i>self-selects </i>(e.g., due to subconscious leanings) into a group and thus matches to fruition the group&#39;s
  
  behavior with little group influence? Or does this same person join a group and emulates the group&#39;s behavior,
  
  by the group&#39;s influence over time. Sociological network analysis, using Snjder&#39;s SIENA software, achieves
  
  the impossible with the closed, directed graph networks that characterize blockchain technology. The network graph
  
  can be here understood as entire (complete) networks (i.e, the blockchain in its entirety without hard forks), not
  
  as personal (egocentered) networks: Using this SIENA model allows for the necessary assumptions that a set of nodes
  
  (social actors) is given, and all ties (links) between these nodes are known - except perhaps for a moderate amount
  
  of missing data</p>
  
  
  
  <p>If, and only if, this level of analysis may be achieved, the blockchain development may follow a linear, directed
  
  path of maturity with social and world needs. Until that time, that Sociology Network Theorists are called upon,
  
  blockchain developers will continue to bat their arms in the dark, stumbling over again the same bugs. Sadly, this
  
  semi-opaque future implicates the same fate as those that attempt to use blockchain for their currency, contract,
  
  and other societal needs--in this case, the blind would indeed lead the blind.</p>
  
  
  
  <p class="footnotes">1.
  
  <a href="http://www.journals.uchicago.edu/doi/abs/10.1086/226550"   target="_blank"> http://www.journals.uchicago.edu/doi/abs/10.1086/226550</a>
  
  <br />
  
  </p>
  
  <p>
  
  2.
  
  <a href="https://www.stats.ox.ac.uk/~snijders/siena/"  target="_blank"> https://www.stats.ox.ac.uk/~snijders/siena/</a>
  
  </p>
    `
    */
  var blogpost16 = '\n  <p class="firstparagraph">There was once a time for App Developers that our habits followed our inner-philosophers--as an Esteemed Order of\nCoders--we held ourselves in the highest regard to separate form from function, and style from structural design.\nHence, in the early 2000&#39;s, a tri-partite, sensible world guided every web coder to abide by The scaffolding\nof HTML, functionality of JavaScript, and styling of CSS. A decade later, we must throw out this antiquated division\nof labor within web coding.</p>\n\n<p>Library modularization, (think JQuery, JSX, Bootstrap, etc.) within Javascript ES16 reveals that modules and components\nMust hold together CSS/HTML/JS, part by part. So, if a decade ago three teams handled html, js, css, it is now requisite\nto divide up 3 teams to 3 components (a team for the carousel widget, a team for the navigation widgets, and\n<i>\neach</i> of these component teams\n<strong>must</strong> be maintained together, not separately, the module&#39;s required html, js, css.</p>\n\n<p>This means that the new Division of Labour can no longer follow past patterns from 5 years ago. Otherwise, any and\nall coding will necessarily begin to &#39;reinvent the wheel.&#39; This is because any module, any library you go\nto, will\n<i>already</i> have its HTML pre-configured, JS pre-configured, CSS pre-configured. Thus, attempts to extricate new\ncss from one module to another (or worse yet, sharing css of modules), will only invite eventual misery, almost\ninstantly setting booby traps for the next coders upon arrival.</p>\n\n<p>So, where is the creativity? Where is the originality then? It is not gone. It has evolved to a higher level of abstraction,\nleaving to automation the boring stuff. So, if Vanilla JS is considered malpractice in the modern world, and if\nad-hoc JQuery is mocked and scoffed at by React coders, then where is creativity? If yesterday&#39;s craft was the\nhoisting of 15 javascript functions on each page, the New Art of modular coding is akin to a game of Tetris. Part\nby part, module by module, the modern coder open-source window-browses and window-shops; goes home, and cuts and\npastes, and folds and clips, then assembles and hangs to dry. Do Python programmers rewrite each particular module\ndefinition? That&#39;s absurd. Equally absurd is the javascript programmer that rewrites from scratch their modules.</p>\n\n<p>The esteemed Order of JavaScript Coders must wake up, and regain its work-load balance in this new age--an age that\neach year since 2014, the JavaScript language is rewritten, each year now, in both syntactic sugar and also fundamental\nstructure--especially the importing and exporting of modules. Therefore, philosophical Honor behooves each of us\nto a higher complexity, and a new commitment to, the &quot;Separation of Concerns.&quot; We can allow ourselves\na break, thankful for Progress, a progress by which we must\n<i>Stand on the Shoulders of Giants</i>, and Code-Create!</p>\n  ';
  var blogpost15 = '\n  <p class="firstparagraph">Facebook Scandals\n<sup>1</sup> of recent months have demoralized the leadership for a role of misinformation in the Tech Age, however I\ncharge Mark Zuckerberg&#39;s innocence\n<i>not</i> because all of us, as a society, were equally warned. Rather, arbitrary mathematical forces created abnormal,\nnever-before-seen network structural density and symmetry patterns. Technological shifts were so efficient at multiplying\nand exacerbating misinformation because a curious sociological network phenomenon rendered parts of our daily social\nlearning and acculturating process to network forces out of our own control.</p>\n\n<p>A January 2016 American Sociology Association Newsletter Editorial\n<sup> 2</sup> from Sally T. Hillsman, in which she explained how the social mechanisms of our own misinformation were\nnot entirely within our own control to resist. In fact, the arbitrary (often random) social structural changes from\nhigher social-media hours, create an arbitrary social network structure whose links (in their content and influence)\nbegin to dominate over nodes (each of us). In other words, the sway of trends and opinionated critical thought becomes\ndominated by the relationships, e.g., the &quot;likes&quot; and &quot;shares&quot;, leading to a statistically natural\npropensity toward homogeneity--a.k.a. group-think. The mechanism is akin to peacefully swimming close and parallel\nto the coastline, and (due to random coastal floor structure), a rip-tide suddenly ships you far out to sea--a fatal\nand tragic fate rendering experienced swimmers out of their own control. Same principle with an arbitrary\n<i>underlying and unseen</i> network structure.</p>\n\n<p>Our social network structures always are prone to continual shift, and so the usual &quot;interruptions&quot; that\npreviously stopped this inward shift soon began to disappear. Hillsman explains:</p>\n\n<p class="quote">Lies, half-truths, and misinformation spread so rapidly across the public through digital communication that the\ntimespan for thoughtful, effective correction or rebuttal is infinitesimal. Because of confirmation Bias, misinformation\nand outright lies quickly strengthen preconceived truths or pre-held beliefs that are already hard to change.</p>\n\n<p>Therefore, even though we all have been pointedly warned,\n<i> none of us</i> without advanced sociological analysis skills could understand that a curious network phenomonenon--ultimately\ndriven by some arbitrary mathematical calculation involving size, density, symmetry, conditional influences, and\nthe strength of ties outweighing network nodes. For the reasons of these factors, our social inclinations were\n<i>out of our control</i> -- no, but really, this time they were!</p>\n\n<p>And so, we can learn from Sociology what steps to take in order to counteract random, but risky, network phenomena\n-- because nobody likes to go for a swim at the beach, and unwittingly get shipped out to sea!</p>\n\n<p class="footnotes">1. Wired Magazine\n<i>Inside the Two Years that Shook Facebook--and the World</i> (February, 2018)\n<a href="https://www.wired.com/story/inside-facebook-mark-zuckerberg-2-years-of-hell"\ntarget="_blank"> Wired Magazine, </a>\n<br />\n<br /> 2.ASA\n<i>Footnotes</i>. (January, 2016)\n<a href="http://www.asanet.org/footnotes/jan16/index.html" target="_blank"> www.asanet.org/footnotes/jan16/</a>\n</p>\n  ';
  var blogpost14 = '\n  <p class="firstparagraph">Other than college pre-med students, few know the MCAT exam--the gatekeeper of U.S. &amp; Canadian Medical Schools--underwent\na major modification in 2015.\n<sup>2</sup> Much deeper than Biological and Technological updates, major sections were added and/or expanded including\nthe Social, Pyschological and Biological foundations of\n<i>behavior</i>. Named the\n<i>Health Systems Science</i>\n<sup>3</sup>, the American Medical Association&#39;s modern, holistic approach articulates outcomes-based measures for\nhealthy living and disease prevention efforts. You could say the AMA is indeed,\n<i>woke</i>.</p>\n\n<p>But really, what&#39;s the difference and why would we care? And, who doesn&#39;t know that an apple-a-day keeps\nthe doctor away? Dr. Jeffrey Borkan, MD, PHD of Brown University&#39;s Warren Alpert Medical School, explains the\nevident role of all those unnoticed social interactions involved in obtaining and consuming that apple. Further,\nthe spatial and economic\n<i>availability</i> of that apple also plays a role in keeping the doctor away. Borkan explains:</p>\n\n<p class="quote">It&#39;s time for us to take a leap forward in educating physicians for the health care delivery models of the future&mdash;those\nthat aim to improve not just the health of the individual patient and their family, but also the community and the\npopulation.\n<sup>4</sup>\n</p>\n\n<p>What, then, specifically, are the mechanisms that a community network&#39;s aggregated health may be inextricably\ntied up with\n<i>our own</i> individual health? In short, they are the sharing of health-promoting resources, timely assistance,\nhealth-promoting information channels -- all this, among the countless perks of a healthy social circle!</p>\n\n<p class="citations">1.\n<a href="http://www.greekmedicine.net/whos_who/The_Hippocratic_Oath.html" target="_blank">The Oath of Hippocrates</a>\n<br /> 2.\n<a href="https://students-residents.aamc.org/applying-medical-school/article/changing-mcat-exam/" target="_blank">The 2015 AAMA Changes to the Medical College Admissions Test</a>\n<br /> 3.\n<a href="https://www.ama-assn.org/education/teaching-new-content-health-systems-science" target="_blank">American Medical Association&#39;s\n<i>Teaching New Content Health Systems Science</i>\n</a>\n<br /> 4.\n<a href="https://www.ama-assn.org/education/teaching-new-content-health-systems-science" target="_blank">ibid.</a>\n</p>\n  ';
  var blogpost13 = '<p class="firstparagraph" style="color:green;">Given that a community network&#39;s aggregated health is inextricably, and symmetrically, tied up with\n  <i>our own</i> individual health, app-developers may design activity- and communication-based apps more responsibly,\n  and in touch with modern healthcare recommendations. After all, if the Saintly Mark Zuckerberg&#39;s communication-\n  and activity-based app inadvertantly led to novel, and deeply consequential, effects, then ...</p>\n  <span class="alert">* Given the Tragic Events in the School Shooting in Florida, I felt a topic of more gravity was in order ... :( </span>\n  \n  <h6 class="chapternumber">Feb 14, 2018</h6>\n  \n  <h6 class="chapternumber dailytitle">A New Kernel, and the Manifestation of a Two-Hundred Year Problem named\n  <i>Anomie</i>\n  </h6>\n  <p class="firstparagraph">Given the tragic events at a Florida school over Valentine&#39;s Day, 2018, who can write about Fitbits? So, thoughts\nand sympathy for those students today that endured this horror. 19 years after the first-of-its-kind school shooting,\nwe as an American society have not become &#39;numb&#39; to these events. It hurts as much as it did in 1999.</p>\n\n<p>Darn that innocuous Spring day in 1999, when we heard the most absurd news-- students attacked their own colleagues\nat Colombine? In my blog post from January 10, I wrote that American Sociology, along with Qu&eacute;bec, came of\nage much later than European Sociology. The past 50 years&#39; social changes and new problems are generally atrributed\nfor the increasing demand for sociological expertise after 1999, after a singular, senseless tragedy of a school\nshooting--this event, like a small kernel of societal desperation for a solution--led to a flurry of self-professed\nsociologists &agrave; la Michael Moore&#39;s Colombine, and other social-responsibility themed social consciousness.\nSo far, only mutually incompatible solutions. The problem, however, is not new, only the manifestation of it.</p>\n\n<p>Suicide rates in 19th century France, disproportionately high, also served as a symptomatic manifestation of the\nsame problem, called\n<i>Anomie.</i>\n<sup>1</sup> The term,\n<i>Anomie</i>, coined by Emile Durkheim in the late 1800&#39;s, captured the sense of instability, cultural and moral\nrelativism that undermined a shared sense of meaning. Suicides, week-after-week, month-after-month? In 1897 France,\nnoone had ever seen it before--at such rates--and people wanted answers. Alas, a kernel of social desperation leading\nto inquiry.</p>\n\n<p>People wanted to know why so many in the population responded negatively to the rapid changes, urbanization (Dreadful\nfactory conditions &agrave; la\n<i>Taylorism&#39;s</i> calculated efficiency) new technologies, i.e. electricity, railroads, steam engines; these created\nan arbitrarily new world, very suddenly. Suddenly, like trying for the first time a roller-coaster, when all you&#39;ve\never known has been the carousel. So, we see technology&#39;s role for well or for ill, our job is to understand\nhow to dial-in the tech specs necessary to keep society smiling on this roller coaster through another, yet not\naltogether new, technological thrill-ride.</p>\n\n<p>1.\n<a href="https://www.researchgate.net/publication/228173911_The_Sociology_of_Suicide" target="_blank">1897, Suicide, &Eacute;mile Durkheim.</a>\n</p>\n  ';
  var blogpost12 = '\n  <small class="jargon">Tech blockchain jargon alert ahead, with all effort made for clarity! I treat a broad overview of the existing trajectory\nof blockchain-related micro-economic advancements. I make a technical &amp; contextualizing\n<abbr title="this link just goes down 5 paragraphs to Feb. 17th">\n<a href="#18-02-17"> three-part blog series in my Feb. 17-20 posts</a> on the micro-economic horizon of blockchain technologies.</abbr>\n</small>\n</h6>\n\n<p class="firstparagraph">Has anyone else been underwhelmed by the lack of Bitcoin&#39;s daily\n<i>presence</i>, despite its everpresence at the dinner tables and caf&eacute;s across America. Sure, it&#39;s more\nof a &quot;metropolitan&quot; phenomenon; and sure, it&#39;s become an accepted global platform--along with myriad\nother crypto-currencies, but it&#39;s exchange-worthiness remains shrowded, and misunderstood by many. Cryptocurrencies\nare useful as a vehicle for investment, and yes, there are Bitcoin millionaires due to the currency&#39;s rise to\nfame with last year&#39;s increase in value (from $1,000 to ~$20,000) etc., etc. But, so far its contributions,\nuses, fame are one-sidedly\n<i>macro-</i>economic. A recent CNET article\n<sup>1</sup>, among others, documents miniscule (and not improving) percentage of\n<i>actual</i> use at the &quot;cash-registers&quot; of society.</p>\n\n<p>Is there something wrong with such little micro-economic usage? Not at all! According to general sociological\n<i>Early Adopter</i> theory--based on Everett M. Rogers&#39;\n<i>Diffusion of Innovations</i>\n<sup>2</sup>--the timeline of the Innovation Adoption Lifecycle is fairly ordinary. That is, the Roger&#39;s bell curve\nranges from the beginning innovators, to early adopters, early majority, and late majority. However, the blockchain\narticles always miss the point. Currencies are more of a distraction compared to the genuine usefulness for the\nevery-person, in every-day affairs, on a given day--i.e., micro-economic use.</p>\n\n<p>The true value, the kind that makes our lives easier on any given day, and for the every-person, is\n<i>not</i> the currency, it is the contract, that allows for individualized, targeted sharing of specific information--whether\nfinancial, governmental, or any other centralized database. An example is in order before I continue, since we can\nall relate to the risk of using a credit or debit card, the risk most notably concerning Target store credit card\nhacks a couple years ago.</p>\n\n<p>Suppose a person shops at 3 different retailers, using a different credit card for each. For these 3 transactions,\nthis person had only needed to provide two discrete pieces of information about themselves for each transaction:\nthey prove they have the $27, $200, and $5; and they prove a third party(i.e.,CC or bank)will make that $27, $200,\nor $5 available, if their client agrees. Instead, for each transaction, they open their\n<i>entire</i> financial information, and can only hope that law-enforcement will prevent cyber-theft; and if the store&#39;s\ndatabases are hacked, then tough-luck!</p>\n\n<p>Crypto-contracts provide the technology for this individualized, risk-free transaction, rather than for each transaction,\nproviding the generalized information for individual transaction. Highly inefficient! Nobody thinks to walk around\nwith their life-savings in cash, then at the 7-11 store, to open their wad of cash and peel out a bill. The credit\ncard system, blessed as it is, did not previously have technology to avoid this very thing. So, financial institutions\nhave had to rely on the many layers of security, passwords, pins, mothers&#39; maiden names, etc. Then, based on\nthe mathematics behind prime numbers, they hope to keep your money safe in one, centralized spot--with a bright\nred target on it.</p>\n\n<p>Now, the crypto-contract provides this decidedly *micro-economic* experience for the everyday person. And that, my\nfriends, has nothing to do with crypto-currencies. There is no micro-economic value in crypto-currency, instead\nthe crypto-\n<i>contract</i> is the true, unsung hero, and a hero we will all get to know. [personal opinion - this hero&#39;s name\nis the Ethereum Virtual Machine]. In any case, Crypto-contracts provide this ability to provide pinpointed,\n<i>specific, targeted information</i> as citizens, too. When we provide our drivers license number, for the sake of\nrenting that car, we provide every aspect of information of ourselves to Hertz. They don&#39;t need this. They need\nto know only and exclusively driving-record related details--not the entire governmental database of information\nabout you!</p>\n\n<p>1.\n<a href="https://www.cnet.com/news/bitcoin-cryptocurrency-big-in-investing-but-still-lousy-for-buying-a-sandwich/"\ntarget="_blank">https://www.cnet.com/news/bitcoin-cryptocurrency-big-in-investing-but-still-lousy-for-buying-a-sandwich/</a>\n</p>\n\n<p>2.\n<a href="https://eric.ed.gov/?id=ED065999" target="_blank">Rogers, E. M., &amp; Shoemaker, F. F. (1971). Communication of Innovations; A Cross-Cultural Approach.</a>\n</p>\n  ';
  var blogpost11 = '\n  <p class="firstparagraph">Given that our app-use is inextricably tied up with our own behavior, activity/communication-based app developers\nhave in the past year accepted (mostly in word) a renewed responsibility. More like resposibility for a multi-faceted\npower of influence granted to an industry, suddenly, disproportionately great, and\n<i>semi-arbitrarily related</i> to the designer&#39;s intent (and control!). After all, if the Saintly Mark Zuckerberg&#39;s\nactivity/communication-based app inadvertantly led to novel, and deeply consequential, effects, then anyone could.</p>\n\n<p>After all, who could guess\n<i>how</i> these app-design effects would affect the users, years later. Who do we think programmers are, sociologists?\nMore specifically, who could know\n<i>which</i> mundane coding practices, arbitrary app-design--like sharing permissions/features? Sure, everyone deep\ndown knew their company practices yield unfathomable power of influence over the daily habits of cell-users, a.k.a.\neveryone. The easy part is knowing; the hard part is learning how and why certain app-features lead to behavioral\nrisks.</p>\n\n<p>There could be no better example than the Alcoholic faced with an intervention by a loving family longing for change.\nThe alcoholic could be forgiven for past misdeeds, but without actual\n<i>Acknowledgement</i> of a crisis in direction, which necessitates professional help from social scientists. Therefore,\nthe recent\n<i>acknowledgments</i> signify something deeper--they signify a humility that app-designers are not sociologists, generally\nspeaking. <s style="color:purple">So, that means hiring sociologists, psychologists, anthropologists for every N\n<small>th</small> app-coder and engineer.<s> History can&#39;t be rewritten, but it can be interpreted and learned\nfrom. The acknowledgment is itself a victory if it induces learning from the raw, social sciences, whose expertise\n<i>can</i> predict how or why certain &quot;life&quot;-features, practices, and policies often unfold with undue and\nunintended social consequences.</p>\n\n<p>Water under the bridge, but going forward, it is one thing to claim a &quot;renewed sense of remorse&quot;, another\nto acknowledge, learn and change. Like last November\n<sup>1</sup> when Facebook co-founder Sean Parker confessed certain designs like &quot;social-validation feedback loop&quot;\nand other app-design intentions, while ignoring potential secondary effects on society. So, the\n<i>Acknowledgment</i> is the big win here--not so much the remorse!</p>\n\n<p>1.\n<a href="https://digitaladdictsblog.com/facebook-co-founder-says-company-built-to-exploit-you/" target="_blank">https://digitaladdictsblog.com/facebook-co-founder-says-company-built-to-exploit-you/</a>\n</p>\n  ';
  var blogpost10 = '\n  \n<p class="firstparagraph">7 Ethereum-based technological features offer us a new world -- a decentralized new world, not dependent on the centralized\nservers of Instagram, Comcast, T-Mobile, Amazon, etc. With that statement ends general consensus among blockchain\nexperts, pundits, and authors. However, if the current logistical obstacles provide controversy and competing algorithms\nover sustainability, security, and scalability, then they reveal much more about the general pathway of social uses\n(and potential effects) than they hide. In my February 15th\n<a href="#18-02-15">blog</a>, I touched on a few features of micro-economic uses so as to distinguish the more certain aspects of the\ncrypto-contract horizon.</p>\n\n<p>\n<strong>Prologue</strong>\n</p>\n\n<p>So, what are some core features of block-chain technology that affect the quality of our lives, and the\n<i>productivity</i> of our work as a society of academics, public-sector and private-sector professionals? First, a\nlittle background and context before I outline seven blockchain functionalities. The Ethereum blockchain helps distinguish\nitself--and its blockchain-native language Solidity--from earlier tech, like Bitcoin and other Proof of Work-based\nblockchains. Ethereum blockchain offers a syntax and programming features, e.g. &quot;looping&quot;, &quot;recursion&quot;,\nwith the full power of a\n<i>Turing Complete</i> language--that is, given enough resources, the language can solve any programmable problem.</p>\n\n<p>More background and a clarifying metaphor are in order: The Bitcoin blockchain transaction resembles the accounting\nsystem of a foos-ball table point rack with a basic calculator glued to the side. In contradistinction, An Ethereum\nblockchain transaction would resemble a network of computers,\n<i>which is itself,</i> a computer--hence, the name Ethereum Virtual Machine. This allows for Quickbooks to calculate\ninto a PDF to be sent via an email contract-signing program. Much more useful!</p>\n\n<p>Therefore, Ethereum&#39;s Blockchain is more than a networked, chained list of blocks, like Bitcoin. The Ethereum\nblockchain is actually a &quot;Virtual Machine&quot;, like a a big networked &quot;home computer&quot;. The native\nlanguage of the blockchain, Solidity, allows for an\n<i>application binary interface</i>, ABI. So, for example, I can type up an Ethereum contract on my home computer,\nthen directly access by command line the blockchain itself. In layman&#39;s terms, the manner that modern-day app,\nfor example Instagram, is a centralized API (Application Programming Interface) that allows one programming system\nto interact with another, such as Instragram offers a &quot;sharing API&quot; that connects to hardware contacts,\nthus facitilating communicating with third-party aplications, like sharing your instagram picture to your Facebook\naccount, via your T-Mobile phone&#39;s contacts list. This API relationship broadly describes the modern world we\nlive in, wherein a Chryser driving system exchanges API information with your T-Mobile Bluetooth network system,\nwhich exchanges API information with your own contact list, and so on, and our lives are made easier.</p>\n\n<p>So, are we out of the woods? Has Ethereum solved the blockchain question? Yes, if it were the 1920 pre-relativity\ndays; However, with the advent of quantum computing, potential security vulnerabilities immediately arise. The reason\nbeing that digital math uses binary &quot;on/off&quot; calculations, while quantum math implicates a tertiary,\n<i>qubit</i> &quot;simultaneous states&quot;. Therefore, we have now entered the 3rd generation of blockchain technology,\nboth programmable, but also quantum-proof due to mathematical graph features. For example, IOTA&#39;s blockchain\ndesign utilizes a\n<i>Winternitz One-Time Signature</i>, by which one&#39;s transaction is entered into with a private-key, and the blockchain\nmoreso resembles a &quot;Tangle&quot; of a directed graph, which allows for computational &quot;states&quot;. IOTA\nrecently garnered criticism in January 2018 due to an unfortunate crypto-hack, that exposed an apparent vulnerability.\nIn truth, this was a case of user-error because users were\n<i>re-using</i> their one-time keys, which significantly decreases security to the point that a home computer could\ncrack the code! I choose to not digress further, and quantum computing is not quite advanced enough now to cause\ndamage, but in the future could potentially split the blockchain in two, or other quantum possibilities.</p>\n\n<p>In sum, the technical obstacles change each month, however one must not lose sight of the forest for the trees. Social\nuseablity, potential scope and of course unintended consequences have all finally begun to emerge, at least in form,\nwith little difference between the 2nd generation blockchain or the 3rd generation Patrician directed graph blockchain.\nThe underlying principle of the blockchain&#39;s micro-economic utiliity through crypto-\n<i>contracts</i> is the same, as opposed to plain crypto-currency. you know the usual bartering solutions for Supply\n&amp; Demand leading to Economics Game Theory, etc. This is where we must take our leave of the Hard Sciences of\nMathematics, and enter the realm of Sociology, Psychology, Anthropology and Economics.</p>\n  ';
  var blogpost9 = '\n  <p class="firstparagraph">The guiding light through the centuries of scientific paradigms, in the Kuhnian sense\n<sup >1</sup>, have derived from deductive ideas from above - whether priestly or royal decree. Then, the primacy of the\n<i>Scientific Method</i> from the Renaissance forward--punctuated first by Copernican Heliocentrism, then other Paradigm\nShifts--has directed rational and ethical norms in each respective period, e.g. Enlightenment authors of 17th, 18th\ncentury. Fast forward to the modern period, wherein the current era&#39;s emerging paradigm holds Sharing as a collective-priority\nand responsibility, then an amazing philosophical moment.\n<i>Historical Materialism</i>\n<sup>2</sup> prescribes what is directly here a novel Paradigm Shift by which authority is not derived from governmental,\nfinancial sources, but rather the\n<i>shared</i>societal consensus about cryptographic, mathematical proofs as true authority. Further, the revolutionary\nshift also innately provides tools for implemention through decentralized, programmable data-sharing. Cryptography\nhas in a sense become a\n<i>de jure</i> middle-person for identification and verification of property.</p>\n\n<p>\n<strong>I. Protecting rights through immutable records</strong>\n<br /> Inalieable Rights can now be identified and verified by the cryptographic authority of a mathematical proof, rather\nthan exclusively through governmental or financial institutions from above. The modern period also has held this\ndecentralized, individual authority as the\n<i>a priori</i> starting points for philosophical proofs. Premises about truth begin with the conditions of humankind,\nnot idealogies. In fact, it was the\n<i>Young Hegelians</i> of early 19th century Vienna &amp; Berlin, who ushered in the Modern Era of Western Philosophy,\nby laying out Truth as inverted, beginning from the empirical &quot;ground&quot; upward. This &quot;upside-down\ntree&quot; defines philosophical modernity. Jean-Paul Sartre wrote that the whole of\n<i>Existentialism</i> and 20th century philsophy is a mere subset, and never escapes Continental Materialism, as argued\nin Sartre&#39;s\n<i>Search for a Method</i>.\n<sup>3</sup>\n</p>\n\n<p>All of the Sciences, prodded by this Truth of Empiricism, followed suit through all the tech innovations since Hegel.\nI&#39;m so surprised by this, because for me, the role of cryptography is shocking on two levels. First, cryptography\nresemblees philosophy rather than the Empiricism that I had envisioned would govern social rule (Some once thought\nnuclear sciences held this role--no longer! Mathematics takes the crown. Secondly, I&#39;m still dumbfounded that\na Paradigm Shift\n<i>first</i> offers the tools to fulfill itself? Staggering to consider the arbitrary changes ahead for a society that\nis provided the tools of social structural change first, but how quite convenient!</p>\n\n<p>\n<strong>II. Bureaucratic Atomization in a True Sharing Economy</strong>\n</p>\n\n<p>It is satisfyingly reassuring to see the good-natured, altruistic efforts among the thousands, upon thousands of\nopen-source volunteers, and blockchain innovators, like Vitalik Buterin author of Ethereum Virtual Machine, whose\naims and efforts make staggering progress each quarter. The potential for removing the &quot;middle-person&quot;\nfrom the day-to-day, micro-economic &quot;cost of living&quot;. This goes for for the exchanging of titles, legal\ndocuments, etc.</p>\n\n<p>Sharing of Resources is, in my personal opinion, critical to global future--both out of increasing necessity in allocating\nincreasingly limited resources; an arbitrary rearrangement of\n<i>Social Structure</i> and distribution of its resources. While the exponential population growth looms on the near\nhorizon, a clear, pre-existing solution begins with a focus on\n<i>smart</i>, effective sharing of resources. The driving principle of sustainability is made convenient by means of\nblockchain technology, extending for example to local economies, cooperatives, ride-sharing, etc.</p>\n\n<p>\n<strong>III. Removing Double-Dipping from International Remittances </strong>\n</p>\n\n<p>\n<i>&quot;Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.&quot;\n</i>\n<br /> --Antoine de Saint-Exup&eacute;ry, 1939</p>\n\n<p>Taxes and tariffs are difficult enough, the double-dipping of the current international remittance system, &aacute;\nla Western Union, does not reflect the global, sharing Economy of 2018. The existing remittance system (not speaking\nto\n<i>centralized</i>, middle-man alternatives like PayPay, etc.)--supposing if I wire $2 Loonie to a Canadian friend&#39;s\nCanadian Bank--requires payments executed through two separate bank transactions in two national payments systems,\nthus the sending country and receiving country each take a cut. Like everything else--c&#39;est la vie. Or is it?\nThe beauty of Ethereum is that it &quot;talks&quot; well with others and across borders, while Bitcoin remains of\nlittle use for micro-transactions that involve semi-basic calculations. The reason being that Bitcoin blockchain\nlanguage, Script, cannot support loops (while statements, etc.)</p>\n\n<p>Currently, both EOS and Ethereum blockchains appear poised for the most financial-friendly blockchain tech.</p>\n\n<p>1.\n<a href="https://www.economist.com/news/business/21722869-anti-establishment-technology-faces-ironic-turn-fortune-governments-may-be-big-backers"\ntarget="_blank">https://www.economist.com/news/business/21722869-anti-establishment-technology-faces-ironic-turn-fortune-governments-may-be-big-backers</a>\n</p>\n\n<p>2.\n<a href="https://blog.ethereum.org/2016/02/09/cut-and-try-building-a-dream/" target="_blank">https://blog.ethereum.org/2016/02/09/cut-and-try-building-a-dream/</a>\n</p>\n\n<p>3.\n<a href="http://www.bard.edu/library/arendt/pdfs/Sartre-Search.pdf" target="_blank">\n<i> Search for a Method</i>, Jean-Paul Sartre, 1957</a>.\n<br />\n<small>Sartre would later be awarded the Nobel Prize in 1964, but declined it.</small>\n</p>\n\n<p>\n<a href="https://projektintegracija.pravo.hr/_download/repository/Kuhn_Structure_of_Scientific_Revolutions.pdf" target="_blank">4. Kuhn, Thomas, The Structure of Scientific Revolutions, </a>\n</p>\n\n<p>\n<a href="https://hbr.org/2017/01/the-truth-about-blockchain" target="_blank">5. Harvard Business Review,\n<i>The Truth about Blockchain, Feb. 2017. (This is an older article, but very clear &amp; insightful)</i>\n</a>\n</p>\n  ';

  var blogpost8 = '\n  <p class="firstparagraph">I feel that data is one of the more underestimated new commodities of the age. Most visualize data as rows and columns,\nand at most only non-conditional dynamic data. Data are not so mute! Data, in most object-oriented languages at\nleast, represents\n<i>functions</i>, conditions, and predicted values. And so, our own behavior, coupled with our networks&#39; behavior,\ncoupled with predictive analytics--this represents a wealth of information beyond our attributed or inherited traits.\nThe programming is\n<i>in</i> the data, however, citizens have become less and less involved, ceding app by centralized app our own information\nand ensuring profit to 3rd party marketers. The centralized nature of the internet allows for this, while the new\nlandscape of\n<i>decentralized applications</i> (DAPP) completely upends this structure of the status quo.</p>\n\n<p>\n<strong>IV. Enabling citizens to own &amp; monetize their data (&amp; protect privacy)</strong>\n<br /> Ethereum offers a decentralized solution to &quot;owning&quot; one&#39;s own data, as data can be decentralized\nand returned to the individual&#39;s control, and\n<i>profit</i>. As sure as the 19th century&#39;s &quot;labor-hour&quot; became commodified to a calculable asset, i.e.\nproperty, which\n<i>another</i> party controls and makes profit; And as sure as the 20th century&#39;s data analytics became commodified\ninto calculable assets for another party to take control and make profit; then only now in this 21st century does\ntechnology offer a new, more egalitarian path.</p>\n\n<p>\n<strong>V. Ensuring compensation for the Creators of Value </strong>\n<br /> So, how would decentralized innovations of blockchain\n<i>distributed ledger</i> technology compensate those whose actions, behavior, opinions, friend-networks, artwork,\nmusic, videos and other contributions profit the creator?</p>\n\n<p>\n<strong>VI. The Halcyon Age of Transaction-Chain Enterprise</strong>\n</p>\n\n<p class="quote">According to Greek Mythology, the days of eery, noticeable lack of storms have never been interpreted as a period\nof grace. Moreso,\n<i>Halcyon</i> tranquility only means a temporary moratorium on the winds and waves, imposed by Aeolus, God of Wind,\nto protect the nesting eggs of Alcyone, his daughter.</p>\n\n<p>If blockchain tech changes how we do research, analysis, and forecasting, as much as it changes international, and\ncross-industry transactions, then are we faced with a similar dilemma as the &quot;novelty&quot;, and double-dealing,\nof multi-nationals of the 1990s? No, because blockchain renders organizations, even those with a spotty past, into\ntransparent, democratic, efficient, secure and easily scrutinized.</p>\n\n<p>After all, without transparent proof, how else would I know my bananas are the &quot;pura vida&quot; Costa Rique&ntilde;\nones? More importantly, what was the carbon footprint of that banana&#39;s journey from its native soil to my breakfast\ntable? New blockchain companies like\n<a href="https://www.provenance.org/">Provenance.org</a>,\n<a href="http://www.skuchain.com/" target="_blank">skuchain</a>,\n<a href="http://www.blockverify.io/">http://www.blockverify.io/</a> are a few noticeable game-changers. So, for bananas not backed by mathematical proofs,\nI really have to ask myself, is it\n<i>really</i> an authentic Fair Trade banana?</p>\n\n<p>Transactions are hardly valuable in the products themselves, if removed from the value of the\n<i>transaction per se</i>. International supply chain transactions, by virtue of a recently possible decentralized,\npermanent record and monitoring, have begun to make inroads in agriculture, petroleum, pharmaceuticals, food-supply\nand other multi-stage industries.</p>\n\n<p>If corporate and governmental transactions are to be made public--many bearing enterprise or State secrets, then\nwill forecasting also go the way of birds? Possibly. Online platforms like Augur\n<sup  >8</sup>are creating global, decentralized prediction markets, in domains like sports betting, financial markets\nspeculation and so forth. Armed with vast, transparent knowledge, the everyday person can now access the whims and\npower of Aeolus, and forecasting the winds of Fortune.</p>\n\n<p>\n<strong>VII. Reinventing Government &amp; Democracy</strong>\n<br /> ...to be completed...</p>\n\n<p>1.\n<a href="https://www.provenance.org/" target="_blank"> https://www.provenance.org/ </a>\n</p>\n\n<p>2.\n<a href="http://www.skuchain.com/" target="_blank"> http://www.skuchain.com/ </a>\n</p>\n\n<p>3.\n<a href="http://www.blockverify.io/" target="_blank"> http://www.blockverify.io/ </a>\n</p>\n  ';

  var blogpost7 = '\n  <p class="firstparagraph">Today, I&#39;m going to write about data structures, and challenges that face Vitalik Buterin and other blockchain\narchitects. &#39; Now, why in the\n<i>world</i> would I or anyone else care about ooh, merge sorts, bubble sorts, classificatory trees, and the advent\nof a third form of data structure?</p>\n\n<p>Today, we live in an ever more relational world. With all our technology, we just can&#39;t wait to hear the latest\ngossip about sister Becky&#39;s Boyfriend&#39;s Brother&#39;s Friend that\n<i>also</i> got to meet Shakira. Gossip to one person is a valuable asset to the data analyst. Because, how else could\nan algorithm draw simultaneous conclusions about two friends that &quot;liked&quot; the same Samsung VR, and that\nthey are both located near Best Buy. Thanks to classificatorial wisdom of AI &amp; plain machine-learning?</p>\n\n<p>These relational queries are simply too difficult for relational, row &amp; column SQL data structures. In fact,\nmany queries are impossible, due to unprescient database schema architectures. Next, with the need to &quot;objectify&quot;\ndata into non-relational objects, rather than an antiquated, rigid row-and-column design. Thus, the second major\ntype of data structure is more flexible and adept in finding these relational queries that are ever more in vogue.\nHowever, the crystal-like, pristine non-relational, No-SQL designs quickly turn to spaghetti, and are poor for scalability.\nBetween a rock and a hard place, a third data structure has emerged in recent years.</p>\n\n<p>Graph Data Structures\n<sup>2</sup> allow data queries that had otherwise been impossible to capture in an entity relationship diagram. The\nideal example to clarify is the manner that the Swiss banks&#39; accounts were discovered to be hiding vast amounts\nof hidden taxes, etc. The cover-up was so well-constructed that not until new, graph database queries discovered\npatterns of money flow\n<sup>1</sup>:</p>\n\n<p class="quote">The data was then turned into a graph format to detect then fine-tune the connections between the nodes. The Swiss\nLeak held around 60,000 files that contained information about over 100,000 clients in 203 countries, which means\nthat the resulting graph database had more than 275,000 nodes with 400,000 relationships among them.</p>\n\n<p class="quote">By being able to easily visualise the networks around clients and accounts, the reporters found many more connections\nthan they had before, which lead to the Swiss Leaks revelations soon being shared with the public and regulators\nacross the globe.</p>\n\n<p>And you thought that plagiarism-detecting software was impressive for complexity! The beauty of this newly available\nsoftware (even Microsoft jumped on board in recent years) means that sociologists, economists can begin to make\nbetter headway in the way that our many interactions become more complex with more data. Remember, in the past ten\nminutes, more data information was just produced than most of human history! Thus, new and upcoming needs in domains\nlike content management &amp; access control, geo-routing (public transportation), gene sequencing, bio-informatics,\nand so on. So, as technology takes us forward, and we make our considerations, let&#39;s stick by the golden rules\nof parallel processing, scalability, and, now, graph-network mindedness for the new data structures, and schema,\nof the Era!</p>\n\n<p>1.\n<a href="https://www.globalbankingandfinance.com/how-a-graph-database-unearthed-major-financial-improprieties/"\ntarget="_blank"> https://www.globalbankingandfinance.com/how-a-graph-database-unearthed-major-financial-improprieties/ </a>\n</p>\n\n<p>2.\n<a href="https://neo4j.com/blog/analyzing-panama-papers-neo4j/">By being able to easily visualise the networks around clients and accounts, the reporters found many more connections\nthan they had before, which lead to the Swiss Leaks revelations soon being shared with the public and regulators\nacross the globe. </a>\n<br /> Other major vendors in graph data structures based on Neo4j: OrientDB, ArangoDB, Titan, mongoDB, Complexible Stardog,\nand Franz AllegroGraph.</p>\n  ';

  var blogpost6 = '\n  <p class="firstparagraph">While I&#39;ve had blockchain-related topics on the mind lately, it seems I can&#39;t escape it as I broach new fields--blockchain\n  is everywhere! Well, I had begun my blog with intentions about the accelerated speed of language and syntax formation,\n  and the curious phenomenon I&#39;d call, for lack of a better word or or my own reading, &quot;declarative-syntax-merging&quot;.\n  This involves the curious, and largely unknown, growth of JavaScript scripting language into almost every domain\n  of web apps, data analysis, and even the bounds of\n  <i>Logic</i> itself. Though I won&#39;t submit my readers to a history of a language, suffice it to say that, &quot;If\n  a certain algorithm, device, or object is programmable, then it will eventually be programmed in JavaScript.&quot;</p>\n  \n  <p>Without getting into technicals, I&#39;ll instead use a perfect metaphor--the manner by which English merged with\n  French, beginning with the conquests of William of Normandy, around 1096 onward. Almost a thousand years later,\n  we can see how English grammar inherited it&#39;s Anglo-Saxon Linguistic roots, along with the core vocabulary;\n  Then, as English vocabulary moves past the first few thousand core words, e.g. &quot;milk&quot; or &quot;house&quot;\n  from &quot;melche&quot; or &quot;haus&quot;, then more than 70% of English Vocabulary is directly inherited from\n  French, e.g. &quot;lactose&quot; or &quot;mansion&quot; from &quot;lait&quot; or &quot;maison&quot;.</p>\n  \n  <p>Similarly, the language of the web and original browsers, JavaScript, has similarly morphed into a new language called\n  Solidity, but in only a micro-fraction of English&#39;s time. The usual FOMO logic propels coding language use,\n  for example FOMO induced Microsoft&#39;s flagship Text Editor, Visual Code, to adopt it years ago.\n  <sup >1</sup> The language of Ethereum Blockchain is Solidity, which like the above example, has two parents, one non-legitimate.\n  It is in all respects totally JavaScript, yet with object-oriented elements of C++. For the layperson, let&#39;s\n  just say Solidity resembles a &quot;Liger&quot;, in it is at it&#39;s core JavaScript, yet with increasing sophistication\n  based on C++ logic, its head and torso has begun to resemble the powerful machine-code of C++ ever more. And it\n  is a beautiful, but curious phenomonenon.</p>\n  \n  <p>\n  <a href="http://www.ibtimes.co.uk/microsoft-adds-ethereum-language-solidity-visual-studio-1552171">http://www.ibtimes.co.uk/microsoft-adds-ethereum-language-solidity-visual-studio-1552171</a>\n  </p>\n \n  ';

  var blogpost5 = '<p class="firstparagraph">1.4 million\n  <i>new</i> jobs by 2020; End over end, year after year, the computer programming industry continues to add another\n  20% more jobs each year, for the next five years. This is the only field that demand outstrips the supply--and increasingly\n  short supply. So much so, the US Department of Labor forecasts U.S. citizens will be able to fill 39% of those positions;\n  there are not enough Immigration visas (especially in the Trumpian era of isolationism) to make up the rest.</p>\n  \n  <p>&nbsp;</p>\n  \n  <p>So, how is it that only 14% of females in the entire field of cybersecurity? Silicon Valley is, at its best, obscenely\n  one-sided. At Google, only 17% of the company&#39;s tech jobs are filled by women. Facebook women staff only 15%\n  of tech jobs, and Twitter? 10% female. The figures on women in computer science across the nation, across the entire\n  industry are not improving, but\n  <i>declining</i>?\n  <sup>1</sup>\n  </p>\n  \n  <p>Of course, we&#39;ve heard these statistics from any given headline, and in the halls across the university landscape,\n  starting with Women in STEM (Science, Tech, Engineering, Mathematics) programs.\n  <sup>3</sup> Yet, why, with so much money, so many programs, so many non-governmental, non-profit effort?</p>\n  \n  <p>I argue that tech\n  <i>climate </i> is directly to blame. Who then? Not a person, but principles are to blame. Culture--often defined as\n  shared beliefs, norms, language and behaviors--can hardly be changed, but it can be understood.\n  <br /> There is a book, called &quot;Program or be Programmed\n  <sup id="24-4">4</sup>\n  </p>\n  , by which the author explains social consequences of a dichotomized society--between those that manipulate the environment\n  around them, whether automating tasks at work, or simply fixing a simple software bug, by adding a comma. This literacy\n  of the Current Era is akin to the 26-letter alphabet of written sentences and paragraphs, and--not to be taken for\n  granted--is the exclusive form of communication, outside of a 100-foot perimeter, up until 150 years ago. Knowledge\n  is not power, the communication of knowledge is power.\n  \n  <p>&nbsp;</p>\n  \n  <p>I argue that today, the power is to program one application programming interface (API) to talk to another API. In\n  other words, the ability to directly communicate with software at the command-line is not now a requisite skill,\n  but promotions would not escape this necessity! So, now reverting back to the subject of women in tech, American\n  leadership is in deep peril without more female insight. I will finish by citing that Ares, the violent, untamed\n  Greek\n  <i>god of war</i>, cannot always drive the Capitalist engine; because She, Athena, the\n  <i>goddess of intelligence</i> represents true strategy!</p>\n  \n  <p>1.\n  <a href="https://www.huffingtonpost.com/2015/03/27/women-in-tech_n_6955940.html" target="_blank">https://www.huffingtonpost.com/2015/03/27/women-in-tech_n_6955940.html</a>\n  </p>\n  \n  <p>2.\n  <a href="https://fairygodboss.com/articles/women-in-tech-facts-figures-and-percentages" target="_blank">https://fairygodboss.com/articles/women-in-tech-facts-figures-and-percentages</a>\n  </p>\n  \n  <p>3.\n  <a href="https://www.aauw.org/research/why-so-few/" target="_blank">https://www.aauw.org/research/why-so-few/</a>\n  </p>\n  ';

  var blogpost4 = '<p class="firstparagraph">While coding up a better shell for this website, I thought it&#39;s remarkable how our lives get easier and easier\n  with each passing year of tech. Using JavaScript--the primordial web-coding language--I marvel at the convenience\n  of delegating mundande coding stuff to taskrunners, like\n  <i>Gulp</i>--a programmable package manager that &quot;bundles&quot; up the libraries to be used in the app. It is\n  truly a joy!</p>\n  \n  <p>I write four styling\n  <i>functions</i>, with about 16\n  <i>variables</i> and voil&agrave;! I finish in 3 hours what would have taken me 15 hours, then another 5 hours a month\n  for upkeep. Instead, now, it&#39;s as though I wind up the clock, and need only periodically check, and perhaps\n  update a variable or two ... Technology. I&#39;m gushing for joy.</p>\n  \n  <p>This was mere JavaScript--with a truly\n  <i>Turing Complete</i>--pan-algorithm status--languages, the possibilities are 100-fold with Python language library\n  collection; this library collection includes NASA modules, mathematical proofs, and limitless uses from web-scraping\n  for unstructured data to an excellent data visualization collection. Sometimes I feel like I&#39;m in the Library\n  of Congress, and better yet because, PIP, the Python package manager acts and automates like a cyborg librarian,\n  for lack of better imagery.</p>\n  \n  <p>I just have so much joy watching a project come to life, and it&#39;s even a greater delight if this project comes\n  to life and stays alive, through the joys of automation!</p>\n  ';

  var blogpost3 = '\n  <p class="firstparagraph">I must confess that on the very day that Our Daily Tech Blog gets an under-the-head make-over for security&#39;s\n  sake, I wrote the new formatting file right over today&#39;s post. Amazing, and the two occurred nearly simultaneously\n  as I worked on them, their paths crossed and poof, gone! Same platform, and I paid the price! Whether I change my\n  ways is yet to be seen, but I shall continue with my original theme for the day, namely, Sustainability, a.k.a.\n  Carbon Footprint.</p>\n  \n  <p class="quote">Power consumption is one of the major costs of bitcoin mining, as dedicated machines crunch the algorithms that build\n  a record of every single bitcoin transaction and are rewarded with tiny fractions of a bitcoin for their efforts.\n  <sup >1</sup>\n  </p>\n  \n  <p>Today I have a mild Critique and Praise for the blockchain sustainability problem caused by sky-high electricity\n  bills! Computer algorithms do waste electricity, not like your Widescreen. More electricity is gobbled up by small\n  and large mining operations in nearly every country than small nations!\n  <sup >1</sup>. Ethereum, Bitcoin and a handful of other &quot;Proof-of-Work&quot; designs require electricity because\n  the investment in equipment itself is investment, but more importantly, two-way incentivation for mining drives\n  the system, and the scarcity demand through difficulty computations.</p>\n  \n  <p>So, is the electricity consumption really\n  <i>correlated</i> with the value, scarcity, of the currency? Yes. Digiconomist--a cryptocurrency analysis site\n  <sup\n  id="digiconomist">3</sup> estimates\n  <i>each</i>Ethereum transaction represents a 45 Kilowatt-hour of electricity&#39;s mining. (A visa credit card transaction\n  is 0.00651 kWh. The entire Ethereum global blockchain could be &quot;using as much as 4.2 Terawatt-hours (tWh),\n  or slightly more than the country of Cyprus\n  <sup  >1</sup>.&quot; So, electricity comparisons are telling, but how does this relate to its environment impact, sustainability\n  itself?</p>\n  \n  <p>Carbon Footprint, our energy consumption index, can be compared to another element of scarcity, which dictates fluctuations\n  in value: Gold. According to\n  <i>Digiconomist</i>, an average household&#39;s Carbon Footprint is about 10 tons of CO2 per year. The article does\n  the math for us very succinctly:</p>\n  \n  <p class="quote">On top of this, we can find that the process of mining Bitcoin isn&rsquo;t just more energy-intensive, but also has\n  a bigger environmental impact. To reach that conclusion, we first need to estimate the carbon footprint for both.\n  For Bitcoin we can, again, get this number from the Bitcoin Energy Consumption Index. For gold, we assume a carbon\n  footprint of 20 tons of CO2e per every kilogram of gold mined\n  <sup >3</sup>.</p>\n  \n  <p>The article continues to clarify that 33,000 kilograms of CO2 per unit mines (comparatively, one Bitcoin&#39;s worth\n  of Gold is 4,000 kilograms of CO2). At the end of the day, the electricity costs--if not sustainable long-term--could\n  spell trouble. Hence, the three S&#39;s, mentioned last, sustainability is perhaps a larger issue than blockchain\n  Security and Scalability challenges. Again, this is a problem that the third largest cryptocurrency does not have:\n  <i>Ripple</i>, which does not bear a carbon footprint\n  <sup >4</sup>.</p>\n  \n  <p>&nbsp;</p>\n  \n  <p>0.\n  <a href="https://www.cnet.com/how-to/bitcoin-ethereum-or-litecoin-which-cryptocurrency-is-best-for-you/" target="_blank">https://www.cnet.com/how-to/bitcoin-ethereum-or-litecoin-which-cryptocurrency-is-best-for-you/</a>\n  <br /> For those new to cryptocurrencies, this is a fairly succinct article to cryptocurrencies, and their underlying\n  structure.</p>\n  \n  <p>1.\n  <a href="https://motherboard.vice.com/en_us/article/d3zn9a/ethereum-mining-transaction-electricity-consumption-bitcoin"\n  target="_blank">https://motherboard.vice.com/en_us/article/d3zn9a/ethereum-mining-transaction-electricity-consumption-bitcoin</a>\n  </p>\n  \n  <p>2.\n  <a href="http://www.wired.co.uk/article/how-much-energy-does-bitcoin-mining-really-use" target="_blank">http://www.wired.co.uk/article/how-much-energy-does-bitcoin-mining-really-use</a>\n  </p>\n  \n  <p>3.\n  <a href="https://digiconomist.net/bitcoin-mining-more-polluting-than-gold-mining" target="_blank">https://digiconomist.net/bitcoin-mining-more-polluting-than-gold-mining</a>\n  </p>\n  \n  <p>4.\n  <a href="https://ripple.com/xrp/" target="_blank">https://ripple.com/xrp/</a>\n  </p>\n  ';
  var blogpost2 = '<p class="firstparagraph">In my reflections about environment sustainability issues, I confess I&#39;m sort of a hypocrite ... The whole matter\nthat caused my own introspection begins with my usual daily vexation: Tangles of wires!\n<br /> &nbsp; ... I&#39;ve been having electricity issues, here as of late ...</p>\n\n<p>On one side, my tiny Yoga Ultrabook usually likes to charge just fine with my phone charger--if I&#39;m stuck without\nmy charger. And due to an untimely end to the charger, I needed a replacement. So, singular errand of the day was\na trip to Best Buy to peruse for a 45-Watt USB-C charger ( the new oval charging port on Samsung 8&#39;s, LG G6&#39;s\nand newer Apple products).</p>\n\n<p>Meanwhile, my credit-card sized Raspberry Pi computer runs on an old-school USB charger--a whole Linux Server Tower\non a cell-phone charger. Then, we have my trusty Dell (actual) Tower with 16 Gigs of RAM, 2-terabytes, etc. that\nalso seems to need an extra fan to stay cool--probably the sustainability of 100 Raspberry computers. My entire\ncarbon footprint changes more with the electrical products that I use, than my vehicle! Well, I also confess my\nJeep Cherokee can&#39;t even boast 20 miles per hour ... oops, conscience pangs, ouch ... Well, hypocritical, slightly,\nbut found not guilty since I&#39;m a bike-commuter for life!</p>\n';
  var blogpost1 = '\n<p class="firstparagraph">Environmental Sustainability, again, and a higher-level view of the dilemmea...I couldn&#39;t resist:\n<br /> Bitcoin&#39;s Initial Coin Offering was 2011 or so, then Ethereum, with Ether for currency was 2015; These two,\never so prescient designs, also have their Achilles Heal. These two are\n<strong>&quot;Proof of Work&quot; currency algorithsms</strong>. This means that the &quot;Demand&quot; side of supply-and-demand,\nderives from\n<i>difficulty levels</i> of crypto-blocks to mine. So, miners are incentivized to spend $1500 on a semi-mediocre-good\nmining rig (which is basically 20 NVIDIA Graphics Cards tied together to stack of two-by-fours with lots of fans\n... erhem, sustainability?...</p>\n\n<p>And for each block that is &quot;solved&quot;, hence the block being validated, and somebody&#39;s cryptocurrency\npurchase/transaction is resolved! (takes about 12 minutes for the whole global blockchain to cycle, and Ethereum\nis less than a minute). So, the whole cycle continues, churning through coal- and carbon-stained hands of the electricity\nfed to these crypto-mining rigs\n<sup>1</sup>. For many it&#39;s a hobby, like the British Hobbyists&#39; love for ham- and short-wave radio setups, yet\nthis profitable, yet particular hobby resembles the 1870&#39;s coal factory smoke stacks in South London!</p>\n\n<p>Let&#39;s face it, if Ethereum is able to successfully hard-fork to a Proof-of-Stake system soon--and Vitalik Buterin\nand his crew assure us it is coming\n<sup>2</sup>--then great--problem solved, everything eventually converts to Ethereum. If\n<i>not</i>they face an existential threat. Because, in a more enlightened ten years from now, those mining depots\n<i>would</i> look like unfettered factory smoke-stacks. Proof-of-Stack, whose currency value is not set to difficult\nof algorithm puzzle (hence,\n<i>proof-of-work</i>, but rather to ownership of &quot;voting pools&quot;, which is a\n<i>\n<strong>Consensus-Based Blockchain algorithm</strong>\n</i> [Complex subject best reserved for a rainy day, or better yet, no day! I may revisit this alternative in a funner\nway, here&#39;s a glimpse from Vitalk&#39;s @VitalikButerin tweet yesterday:</p>\n\n<p class="quote">Question for mathematicians: is there a assumed-to-be-normal number (ie. digits are random, like pi or e) where you\ncan calculate the nth digit in log(n) (or even polylog(n)) time? If so, then H(x) = digits[x ... x+100] seems like\nit would be a cool cryptographic hash algo.</p>\n\n<p>Now, I am by no means a detective, but by the sound of those tweets, the Proof-of-Work algorithm seems to still be\nof utmost importance ...</p>\n\n<p>1.\n<a href="https://blockexplorer.com/news/ethereum-launches-casper-testnet-paving-way-proof-stake/" target="_blank">https://blockexplorer.com/news/ethereum-launches-casper-testnet-paving-way-proof-stake/</a> and also,\n<a href="https://www.trustnodes.com/2017/11/28/ethereums-proof-stake-casper-testnet-nears-launch"\ntarget="_blank">https://www.trustnodes.com/2017/11/28/ethereums-proof-stake-casper-testnet-nears-launch</a>\n</p> \n\n<p>Copyright &copy; 2018 All Rights Reserved. &nbsp; | &nbsp;\n<a href="http://www.thomasmaestas.net" title="Contact Information: thomasmaestas.net/">\n  thomasmaestas.net</a>&nbsp; | &nbsp;\n<img src="dist/img/paypal.PNG" alt="PayPal Emblem" height="\n15"></img>\n<a href="https://www.paypal.com/paypalme/ThomasMaestas" style="color:white;text-decoration:none;">\n  &nbsp; Blog Support Appreciated!</a>\n</p>\n';
  var url = [
  /*
  {
  id: '17',
  did: '18-02-10',
  date: 'Feb 10, 2018',
  author: 'by Thomas Maestas, MA',
  cat3: 'Musing Blockchain <h6>First Blog Post!</h6>',
  title: 'Why are Sociologists now the Key Players in Data Analysis within the Domain of Blockchain Technologies?',
  post: blogpost17,
  done: true,
  }, 
  */
  {
    id: '16',
    did: '18-02-11',
    date: 'Feb 22, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'How Can We Best Modularize our App Designs in Order to Achieve the Much Vaunted &quot;Separation of Concerns&quot;?',
    post: blogpost16,
    done: true
  }, {
    id: '15',
    did: '18-02-12',
    date: 'Feb 12, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'Mark Zuckerberg&#39;s Innocence',
    post: blogpost15,
    done: true
  }, {
    id: '14',
    did: '18-02-13',
    date: 'Feb 13, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Sociology Tomorrow!',
    title: '3rd Generation Blockchain: How Fast can the Blockchain Operate? Part III: : The Challenges for the Directed Acyclic Graph (DAG) with Ripple and  Iota Coin',
    post: blogpost14,
    done: true
  }, {
    id: '13',
    did: '18-02-14',
    date: 'Feb 14, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Sociology Tomorrow!',
    title: 'A New Kernel, and the Manifestation of a Two-Hundred Year Problem named <i>Anomie</i>',
    post: blogpost13,
    done: true
  }, {
    id: '12',
    did: '18-02-15',
    date: 'Feb 15, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'After Yesterday&#39;s Scathing Post, A Look at my own Carbon Footprint',
    post: blogpost12,
    done: true
  }, {
    id: '11',
    did: '18-02-16',
    date: 'Feb 16, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: 'Tech on the Regret: Unintended, secondary effects of communication- and activity-based app-designs',
    post: blogpost11,
    done: true
  }, {
    id: '10',
    did: '18-02-17',
    date: 'Feb 17-18, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'Blockchains, Bitcoins and The Unnecessary Risk of Shopping at Target with a Credit Card, Part II:<br /><br /> Seven Nuts &amp; Bolts Features of the New Blockchain Micro-Economy',
    post: blogpost10,
    done: true

  }, {
    id: '9',
    did: '18-02-19',
    date: 'Feb 19, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'Blockchains, Bitcoins and The Unnecessary Risk of Shopping at Target with a Credit Card, Part III:<br /> Seven Features of the New Blockchain Micro-Economy',
    post: blogpost9,
    done: true
  }, {
    id: '8',
    did: '18-02-20',
    date: 'Feb 20, 2019',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'Cryptocurrency&#39;s Cumbersome Carbon Footprint',
    post: blogpost8,
    done: true
  }, {
    id: '7',
    did: '18-02-21',
    date: 'Feb 21, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'Facebook-Friendly Third-Generation Data Structures',
    post: blogpost7,
    done: true
  }, {
    id: '6',
    did: '18-02-22',
    date: 'Feb 22, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'Languages',
    post: blogpost6,
    done: true
  }, {
    id: '5',
    did: '18-02-23',
    date: 'Feb 23, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Sociology Tomorrow!',
    title: '1.4 Million Reasons for more Women in Tech',
    post: blogpost5,
    done: true
  }, {
    id: '4',
    did: '18-02-24',
    date: 'Feb 24-25, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Web Dev Affairs',
    title: '3rd Generation Blockchain: How Fast can the Blockchain Operate? Part III: : The Challenges for the Directed Acyclic Graph (DAG) with Ripple and  Iota Coin',
    post: blogpost4,
    done: true
  }, {
    id: '3',
    did: '18-02-26',
    date: 'Feb 26, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'Cryptocurrency&#39;s Cumbersome Carbon Footprint',
    post: blogpost3,
    done: true
  }, {
    id: '2',
    did: '18-02-27',
    date: 'Feb 27, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'After Yesterday&#39;s Scathing Post, A Look at my own Carbon Footprint',
    post: blogpost2,
    done: true
  }, {
    id: '1',
    did: '18-02-28',
    date: 'Feb 28, 2018',
    author: 'by Thomas Maestas, MA',
    cat3: 'Musing Blockchain',
    title: 'One Last Word about Bitcoin&#39;s Carbon Footprint',
    post: blogpost1,
    done: true
  }];

  for (i = 0; i < url.length; i++) {
    var cat = ' \n    <div id="' + url[i].did + '" class="blogDiv"> \n    <hr />  \n    <a href="#top"><button>Top</button></a>  \n    <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n    <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5> \n    <p id="author" class="  author">' + url[i].author + '</p>   \n    <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n    <h6  id="title"   class="dailytitle chapternumber">' + url[i].title + '</h6>\n    <br />\n    <div id="post">' + url[i].post + '\n    </div>\n    </div>';

    document.getElementById("paragraph-feb").innerHTML += cat;
  }

  var i;
  for (i = 0; i < url.length; i++) {
    var catMod = '\n    <div id="' + url[i].did + '_mod" class="blogDivMod"> \n    <hr />  \n    <a href="#top-mod"><button>Top</button></a>   \n    <h4 class="title dailytech longtitle">OUR DAILY TECH:</h4>  \n    <h5 id="cat3" class="  subdailytech">' + url[i].cat3 + '</h5>  \n    <p id="author" class="  author">' + url[i].author + '</p>   \n    <h6  id="date" class="  chapternumber">' + url[i].date + '</h6>    \n    <h6  id="title"   class="dailytitle chapternumber">' + url[i].title + '</h6>\n    <br />\n    <div id="post">' + url[i].post + '</div>\n    </div>';

    document.getElementById("paragraph-feb-mod").innerHTML += catMod;
  }

  console.log('blogger-feb');
  // console.log(angular.toJson(url));
};

bloggerFeb();

/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var o = 'NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo';
var url = "https://api.nasa.gov/planetary/apod?api_key=" + o;

$.ajax({
  url: url,
  success: function success(result) {
    if ("copyright" in result) {
      $("#copyright").text("Image Credits: " + result.copyright);
    } else {
      $("#copyright").text("Image Credits: " + "Public Domain");
    }

    if (result.media_type == "video") {
      $("#apod_img_id").css("display", "block");
      $("#apod_vid_id").attr("src", result.url);
    } else {
      $("#apod_vid_id").css("display", "block");
      $("#apod_img_id").attr("src", result.url);
    }
    $("#reqObject").text(url);
    $("#returnObject").text(JSON.stringify(result, null, 4));
    $("#apod_explaination").text(result.explanation);
    $("#apod_title").text(result.title);
  }
});

/***/ })
/******/ ]);