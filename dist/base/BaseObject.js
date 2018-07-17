'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var exclude = ["constructor"];

var BaseObject = function () {
  function BaseObject() {
    _classCallCheck(this, BaseObject);

    this.init();
  }

  _createClass(BaseObject, [{
    key: "init",
    value: function init() {}
  }, {
    key: "getAllProperties",
    value: function getAllProperties() {
      var props = {},
          self = this;
      Object.getOwnPropertyNames(self).forEach(function (prop) {
        if (typeof self[prop] !== "function") {
          props[prop] = self[prop];
        }
      });
      return props;
    }
  }, {
    key: "hasProperty",
    value: function hasProperty(propName) {
      return Object.keys(this.getAllProperties()).indexOf(propName) >= 0;
    }
  }, {
    key: "getAllMethods",
    value: function getAllMethods() {
      var props = [],
          self = this;
      Object.getOwnPropertyNames(self).forEach(function (prop) {
        if (typeof self[prop] === "function") {
          props.push(prop);
        }
      });
      var ref = Object.getPrototypeOf(self);
      while (ref) {
        Object.getOwnPropertyNames(ref.constructor.prototype).forEach(function (prop) {
          if (props.indexOf(prop) < 0 && exclude.indexOf(prop) < 0) {
            props.push(prop);
          }
        });
        ref = Object.getPrototypeOf(ref);
        if (ref === Object.prototype) break;
      }
      return props.sort();
    }
  }, {
    key: "hasMethod",
    value: function hasMethod(propName) {
      return this.getAllMethods().indexOf(propName) >= 0;
    }
  }]);

  return BaseObject;
}();

/**
 * Static method access for prototype method getAllProperties
 *
 * @param  objectRef OBJECT the referenced object whose properties
 *                          are being returned
 * @return ARRAY the names of all properties
 */
BaseObject.getAllProperties = function (objectRef) {
  return BaseObject.prototype.getAllProperties.call(objectRef);
};

/**
 * Static method access for prototype method getAllMethods
 *
 * @param  objectRef OBJECT the referenced object whose methods
 *                          are being returned
 * @return ARRAY the names of all methods
 */
BaseObject.getAllMethods = function (objectRef) {
  return BaseObject.prototype.getAllMethods.call(objectRef);
};

module.exports = BaseObject;
