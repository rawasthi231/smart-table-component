"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ReactSmartTable = void 0;
var React = _interopRequireWildcard(require("react"));
var _excluded = ["currentPage", "customLoader", "hasMoreRecords", "headings", "inverseScroll", "items", "loading", "loadMore", "noRecordsFound", "onPageChange", "onRowClick", "onSearch", "parentClass", "recordsView", "recordsPerPage", "scopedFields", "search", "searchableFields", "searchBehavior", "searchBoxPlaceholder", "searchType", "stopDefaultSearch", "totalPages"],
  _excluded2 = ["title", "fieldName", "sortable"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], t.indexOf(o) >= 0 || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
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
    noRecordsFound = _ref.noRecordsFound,
    onPageChange = _ref.onPageChange,
    onRowClick = _ref.onRowClick,
    onSearch = _ref.onSearch,
    _ref$parentClass = _ref.parentClass,
    parentClass = _ref$parentClass === void 0 ? "scrollable-area" : _ref$parentClass,
    recordsView = _ref.recordsView,
    recordsPerPage = _ref.recordsPerPage,
    scopedFields = _ref.scopedFields,
    search = _ref.search,
    searchableFields = _ref.searchableFields,
    searchBehavior = _ref.searchBehavior,
    _ref$searchBoxPlaceho = _ref.searchBoxPlaceholder,
    searchBoxPlaceholder = _ref$searchBoxPlaceho === void 0 ? "Search..." : _ref$searchBoxPlaceho,
    searchType = _ref.searchType,
    stopDefaultSearch = _ref.stopDefaultSearch,
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
  var tableRowRef = React.useRef(null);
  var itemsRef = React.useRef(items);
  var hasMoreRecordsRef = React.useRef(hasMoreRecords);
  var scrollObserver = React.useRef(new IntersectionObserver(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 1),
      entry = _ref3[0];
    if (entry.isIntersecting && entry.intersectionRatio && hasMoreRecordsRef.current && loadMore) {
      loadMore();
    }
  }, {
    threshold: 0.7
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
    if (inverseScroll) {
      var _tableRowRef$current;
      (_tableRowRef$current = tableRowRef.current) === null || _tableRowRef$current === void 0 || _tableRowRef$current.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [items, items.length, inverseScroll]);
  /** Configuration for Infinite Scroll Ends */

  /* Search functionality starts */
  var _React$useState3 = React.useState(""),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    searchTerm = _React$useState4[0],
    setSearchTerm = _React$useState4[1];
  var fuzzySearch = function fuzzySearch(needle, haystack) {
    var hlen = haystack.length;
    var nlen = needle.length;
    if (nlen > hlen) {
      return false;
    }
    if (nlen === hlen) {
      return needle === haystack;
    }
    outer: for (var i = 0, j = 0; i < nlen; i++) {
      var nch = needle.charCodeAt(i);
      while (j < hlen) {
        if (haystack.charCodeAt(j++) === nch) {
          continue outer;
        }
      }
      return false;
    }
    return true;
  };
  var deepSearch = function deepSearch(obj, searchTerm) {
    if (_typeof(obj) === "object") {
      for (var key in obj) {
        if (searchableFields !== null && searchableFields !== void 0 && searchableFields.includes(key) && deepSearch(obj[key], searchTerm)) return true;
      }
    } else if (typeof obj === "string" || typeof obj === "number") {
      if (searchType === "fuzzy") return fuzzySearch(searchTerm.toLowerCase(), String(obj).toLowerCase());
      return String(obj).toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  };
  var filteredItems = React.useMemo(function () {
    if (!searchTerm || stopDefaultSearch) return items;
    return items.filter(function (item) {
      return deepSearch(item, searchTerm);
    });
  }, [items, searchTerm]);

  /* Search functionality ends */

  /* Sorting functionality starts */

  // Step 1: Add a new state variable for sort field and sort direction
  var _React$useState5 = React.useState(null),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    sortField = _React$useState6[0],
    setSortField = _React$useState6[1];
  var _React$useState7 = React.useState("asc"),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    sortDirection = _React$useState8[0],
    setSortDirection = _React$useState8[1];

  // Step 2: Add an onClick handler for table headers
  var handleSort = function handleSort(field) {
    setSortField(field);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Step 3: Sort items before rendering
  var sortedItems = React.useMemo(function () {
    if (!sortField) return filteredItems;
    return _toConsumableArray(filteredItems).sort(function (a, b) {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredItems, sortField, sortDirection]);

  /* Sorting functionality ends */

  return /*#__PURE__*/React.createElement(React.Fragment, null, search && /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "search-box",
    value: searchTerm,
    onChange: function onChange(e) {
      var text = e.target.value;
      setSearchTerm(text);
      if (searchBehavior === "debounce") {
        setTimeout(function () {
          if (onSearch) onSearch(text);
        }, 500);
      } else if (searchBehavior === "throttle") {
        clearTimeout(window.searchThrottleTimeout);
        window.searchThrottleTimeout = setTimeout(function () {
          if (onSearch) onSearch(text);
        }, 500);
      } else {
        if (onSearch) onSearch(text);
      }
    },
    placeholder: searchBoxPlaceholder
  }), /*#__PURE__*/React.createElement("div", {
    className: parentClass
  }, /*#__PURE__*/React.createElement("table", _extends({}, props, {
    role: "table"
  }), headings && headings.length ? /*#__PURE__*/React.createElement("thead", {
    role: "rowgroup"
  }, /*#__PURE__*/React.createElement("tr", {
    role: "row"
  }, headings.map(function (_ref4, i) {
    var title = _ref4.title,
      fieldName = _ref4.fieldName,
      sortable = _ref4.sortable,
      restAttr = _objectWithoutProperties(_ref4, _excluded2);
    return /*#__PURE__*/React.createElement("th", _extends({
      role: "columnheader",
      key: i
    }, restAttr, {
      onClick: function onClick() {
        return sortable && !fieldName.startsWith("action_1") && handleSort(fieldName);
      }
    }), title !== null && title !== void 0 ? title : fieldName, " ", sortable && sortField === fieldName && /*#__PURE__*/React.createElement("span", null, sortDirection === "asc" ? "▲" : "▼"));
  }))) : null, /*#__PURE__*/React.createElement("tbody", {
    role: "rowgroup"
  }, recordsView === "infinite-Scroll" && inverseScroll && items.length && /*#__PURE__*/React.createElement("tr", {
    role: "row"
  }, /*#__PURE__*/React.createElement("td", {
    role: "cell",
    colSpan: headings.length
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "black",
      textAlign: "center"
    },
    ref: setElement
  }, customLoader !== null && customLoader !== void 0 ? customLoader : "Loading..."))), sortedItems && sortedItems.length ? sortedItems.map(function (item, itemKey) {
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
  }, customLoader !== null && customLoader !== void 0 ? customLoader : "Loading...")) : /*#__PURE__*/React.createElement("tr", null, noRecordsFound ? typeof noRecordsFound === "string" ? /*#__PURE__*/React.createElement("td", {
    colSpan: fields.length
  }, noRecordsFound) : /*#__PURE__*/React.createElement("td", null, noRecordsFound) : /*#__PURE__*/React.createElement("td", {
    colSpan: fields.length,
    style: {
      textAlign: "center"
    }
  }, "No record found")), recordsView === "infinite-Scroll" && !inverseScroll && items.length && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: headings.length
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "black",
      textAlign: "center"
    },
    ref: setElement
  }, customLoader !== null && customLoader !== void 0 ? customLoader : "Loading...")))))), /*#__PURE__*/React.createElement("div", {
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
      className: currentPage === i + 1 ? "actve-page" : "",
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
var ReactSmartTable = exports.ReactSmartTable = ReactSmartTableComponent;
var _default = exports["default"] = ReactSmartTableComponent;