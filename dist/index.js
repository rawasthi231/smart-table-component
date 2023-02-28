"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var React = _interopRequireWildcard(require("react"));
require("./style.css");
var _excluded = ["currentPage", "customLoader", "hasMoreRecords", "headings", "inverseScroll", "items", "loading", "loadMore", "onPageChange", "onRowClick", "recordsView", "recordsPerPage", "scopedFields", "totalPages"],
  _excluded2 = ["title", "fieldName"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ReactSmartTableComponent(_ref) {
  var _Array$fill;
  var currentPage = _ref.currentPage,
    customLoader = _ref.customLoader,
    _ref$hasMoreRecords = _ref.hasMoreRecords,
    hasMoreRecords = _ref$hasMoreRecords === void 0 ? false : _ref$hasMoreRecords,
    headings = _ref.headings,
    inverseScroll = _ref.inverseScroll,
    items = _ref.items,
    loading = _ref.loading,
    loadMore = _ref.loadMore,
    onPageChange = _ref.onPageChange,
    onRowClick = _ref.onRowClick,
    recordsView = _ref.recordsView,
    recordsPerPage = _ref.recordsPerPage,
    scopedFields = _ref.scopedFields,
    totalPages = _ref.totalPages,
    props = _objectWithoutProperties(_ref, _excluded);
  var fields = headings.map(function (item) {
    return item.fieldName;
  });

  /** Configuration for Infinite Scroll Starts */
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    element = _React$useState2[0],
    setElement = _React$useState2[1];
  var itemsRef = React.useRef(items);
  var hasMoreRecordsRef = React.useRef(hasMoreRecords);
  var scrollObserver = React.useRef(new IntersectionObserver(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 1),
      entry = _ref3[0];
    if (entry.isIntersecting && entry.intersectionRatio && hasMoreRecordsRef.current && loadMore) {
      loadMore();
    }
  }, {
    threshold: 1
  }));

  // Observing the chat messages container movement
  React.useEffect(function () {
    var currentObserver = scrollObserver.current;
    if (element) {
      currentObserver.observe(element);
    }
    return function () {
      if (element) currentObserver.disconnect();
    };
  }, [element]);

  // Updating the hasMoreRecordsRef when the hasMoreRecords flag changes
  React.useEffect(function () {
    hasMoreRecordsRef.current = hasMoreRecords;
  }, [hasMoreRecords]);

  // Updating the itemsRef when the items array changes
  React.useEffect(function () {
    if (items.length) {
      itemsRef.current = items;
    }
  }, [items, items.length]);
  /** Configuration for Infinite Scroll Ends */

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "scrollable-area"
  }, recordsView === "infinite-Scroll" && inverseScroll && items.length && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "black"
    },
    ref: setElement
  }, "Loading..."), /*#__PURE__*/React.createElement("table", props, headings && headings.length ? /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, headings.map(function (_ref4, i) {
    var title = _ref4.title,
      fieldName = _ref4.fieldName,
      restAttr = _objectWithoutProperties(_ref4, _excluded2);
    return /*#__PURE__*/React.createElement("th", _extends({
      key: i
    }, restAttr), title !== null && title !== void 0 ? title : fieldName);
  }))) : null, /*#__PURE__*/React.createElement("tbody", null, items && items.length ? items.map(function (item, itemKey) {
    return /*#__PURE__*/React.createElement("tr", {
      key: itemKey,
      onClick: function onClick() {
        return onRowClick && onRowClick(item);
      },
      className: onRowClick ? "cursor-pointer" : ""
    }, fields.map(function (field, fieldKey) {
      var _scopedFields$field;
      return scopedFields && scopedFields[field] ? /*#__PURE__*/React.createElement(React.Fragment, {
        key: fieldKey
      }, (_scopedFields$field = scopedFields[field]) === null || _scopedFields$field === void 0 ? void 0 : _scopedFields$field.call(scopedFields, item)) : /*#__PURE__*/React.createElement("td", {
        key: fieldKey
      }, "".concat(item[field]));
    }));
  }) : loading ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: fields.length
  }, customLoader !== null && customLoader !== void 0 ? customLoader : "Loading")) : null)), recordsView === "infinite-Scroll" && !inverseScroll && items.length && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "black"
    },
    ref: setElement
  }, "Loading...")), /*#__PURE__*/React.createElement("div", {
    className: "page-bar"
  }, totalPages && currentPage ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    onClick: function onClick() {
      return onPageChange && onPageChange(1);
    }
  }, "<<"), (_Array$fill = new Array(totalPages).fill(1)) === null || _Array$fill === void 0 ? void 0 : _Array$fill.map(function () {
    for (var _len = arguments.length, _ref5 = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref5[_key] = arguments[_key];
    }
    var i = _ref5[1];
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, i === 0 ? /*#__PURE__*/React.createElement("span", {
      onClick: function onClick() {
        return onPageChange && onPageChange(currentPage === 1 ? currentPage : currentPage - 1);
      }
    }, "<") : null, /*#__PURE__*/React.createElement("span", {
      onClick: function onClick() {
        return onPageChange && onPageChange(i + 1);
      }
    }, i + 1), i === totalPages - 1 ? /*#__PURE__*/React.createElement("span", {
      onClick: function onClick() {
        return onPageChange && onPageChange(currentPage < totalPages ? currentPage + 1 : totalPages);
      }
    }, ">") : null);
  }), /*#__PURE__*/React.createElement("span", {
    onClick: function onClick() {
      return onPageChange && onPageChange(totalPages);
    }
  }, ">>")) : null));
}
var _default = ReactSmartTableComponent;
exports["default"] = _default;