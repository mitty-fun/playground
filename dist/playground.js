"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireDefault(require("react"));

var _react2 = _interopRequireDefault(require("@monaco-editor/react"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _playgroundModule = _interopRequireDefault(require("./playground.module.css"));

var Playground = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Playground, _React$Component);

  var _super = (0, _createSuper2.default)(Playground);

  function Playground(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Playground);
    _this = _super.call(this, props);

    _this.handleChange = function (value) {
      _this.setState((0, _defineProperty2.default)({}, _this.state.lang, value));
    };

    _this.setLang = function (lang) {
      _this.setState({
        lang: lang
      });
    };

    _this.consoleLog = function (text) {
      _this.setState({
        logs: [].concat((0, _toConsumableArray2.default)(_this.state.logs), [text])
      });
    };

    _this.onerror = function (error) {
      _this.setState({
        logs: [].concat((0, _toConsumableArray2.default)(_this.state.logs), [error])
      });
    };

    _this.showTab = function (tab) {
      _this.setState({
        tab: tab
      });
    };

    _this.run = function () {
      var html = "".concat(_this.state.html, "<style>").concat(_this.state.css, "</style>");
      var iframeWindow = _this.iframeRef.current.contentWindow;
      iframeWindow.location.reload();
      setTimeout(function () {
        iframeWindow.document.write(html);
        iframeWindow.console.log = _this.consoleLog;
        iframeWindow.onerror = _this.onerror;
        iframeWindow.eval(_this.state.javascript);
      }, 100);

      _this.setState({
        logs: []
      });
    };

    _this.reset = function () {
      _this.setState({
        html: _this.props.html,
        css: _this.props.css,
        javascript: _this.props.javascript
      });
    };

    _this.state = {
      html: props.html || '',
      css: props.css || '',
      javascript: props.javascript || '',
      lang: 'javascript',
      tab: 'console',
      logs: []
    };
    _this.iframeRef = /*#__PURE__*/_react.default.createRef();
    return _this;
  }

  (0, _createClass2.default)(Playground, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/_react.default.createElement("div", {
        class: _playgroundModule.default.root
      }, /*#__PURE__*/_react.default.createElement("div", {
        class: _playgroundModule.default.tabs
      }, /*#__PURE__*/_react.default.createElement("span", {
        class: _playgroundModule.default['tabs-item'],
        onClick: function onClick() {
          return _this2.setLang('html');
        }
      }, "HTML"), /*#__PURE__*/_react.default.createElement("span", {
        class: _playgroundModule.default['tabs-item'],
        onClick: function onClick() {
          return _this2.setLang('css');
        }
      }, "CSS"), /*#__PURE__*/_react.default.createElement("span", {
        class: _playgroundModule.default['tabs-item'],
        onClick: function onClick() {
          return _this2.setLang('javascript');
        }
      }, "JavaScript"), /*#__PURE__*/_react.default.createElement("span", {
        class: _playgroundModule.default['tabs-item'],
        onClick: this.run
      }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeSolidSvgIcons.faPlay
      })), /*#__PURE__*/_react.default.createElement("span", {
        class: _playgroundModule.default['tabs-item'],
        onClick: this.reset
      }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeSolidSvgIcons.faUndo
      }))), /*#__PURE__*/_react.default.createElement("div", {
        className: _playgroundModule.default.editor
      }, /*#__PURE__*/_react.default.createElement(_react2.default, {
        language: this.state.lang,
        value: this.state[this.state.lang],
        onChange: this.handleChange,
        options: {
          minimap: {
            enabled: false
          },
          fontSize: 16
        }
      })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        class: _playgroundModule.default.tabs
      }, /*#__PURE__*/_react.default.createElement("span", {
        class: _playgroundModule.default['tabs-item'],
        onClick: function onClick() {
          return _this2.showTab('console');
        }
      }, "console"), /*#__PURE__*/_react.default.createElement("span", {
        class: _playgroundModule.default['tabs-item'],
        onClick: function onClick() {
          return _this2.showTab('view');
        }
      }, "view")), /*#__PURE__*/_react.default.createElement("div", {
        class: _playgroundModule.default.content
      }, /*#__PURE__*/_react.default.createElement("div", {
        class: this.state.tab === 'view' ? _playgroundModule.default['d-none'] : ''
      }, /*#__PURE__*/_react.default.createElement("iframe", {
        class: _playgroundModule.default.iframe,
        ref: this.iframeRef
      })), /*#__PURE__*/_react.default.createElement("div", {
        class: this.state.tab === 'console' ? _playgroundModule.default['d-none'] : ''
      }, this.state.logs.map(function (text) {
        return /*#__PURE__*/_react.default.createElement("p", null, text);
      })))));
    }
  }]);
  return Playground;
}(_react.default.Component);

var _default = Playground;
exports.default = _default;