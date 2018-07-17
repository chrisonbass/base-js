'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var exclude = ["constructor"];

var BaseObject = function () {
  function BaseObject() {
    classCallCheck(this, BaseObject);

    this.init();
  }

  createClass(BaseObject, [{
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

var attachMethod = function attachMethod(owner, methodName, parent) {
  owner[methodName] = function () {
    var args = [];
    args.push(parent);
    Array.prototype.slice.call(arguments).forEach(function (arg) {
      args.push(arg);
    });
    return parent[methodName].apply(owner, args);
  };
};

var Behavior = function (_BaseObject) {
  inherits(Behavior, _BaseObject);

  function Behavior() {
    classCallCheck(this, Behavior);

    var _this = possibleConstructorReturn(this, (Behavior.__proto__ || Object.getPrototypeOf(Behavior)).call(this));

    _this.getBehaviorOwner = function () {
      return null;
    };
    _this.isBehaviorAttached = function () {
      return _this.getBehaviorOwner() !== null;
    };
    _this.detachBehavior = function () {
      return undefined;
    };
    return _this;
  }

  createClass(Behavior, [{
    key: "attachBehavior",
    value: function attachBehavior(component) {
      var self = this,
          owner = component,
          attachedPropNames = [],
          methods = BaseObject.prototype.getAllMethods.call(self),
          ownerMethods = BaseObject.prototype.getAllMethods.call(owner),
          methodName;

      for (methodName in methods) {
        methodName = methods[methodName];
        switch (methodName) {
          case "constructor":
          case "init":
          case "attachBehavior":
          case "detachBehavior":
          case "isBehaviorAttached":
          case "getBehaviorOwner":
            continue;
        }
        if (ownerMethods.indexOf(methodName) >= 0) continue;
        if (typeof self[methodName] === "function") {
          attachMethod(owner, methodName, this);
          attachedPropNames.push(methodName);
        }
      }

      this.getBehaviorOwner = function () {
        return owner;
      };

      this.detachBehavior = function () {
        attachedPropNames.forEach(function (propName, index) {
          delete owner[propName];
        });
        owner = null;
      };
    }
  }]);
  return Behavior;
}(BaseObject);

var Component = function (_React$Component) {
  inherits(Component, _React$Component);

  function Component(props) {
    classCallCheck(this, Component);

    var _this = possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, props));

    if (_this.constructor === Component) {
      throw new TypeError("You must extends abstract class Component.");
    }
    _this.__behaviors = null;
    return _this;
  }

  createClass(Component, [{
    key: 'ensureBehaviors',
    value: function ensureBehaviors() {
      if (this.__behaviors === null) {
        var self = this;
        this.__behaviors = this.behaviors();
        this.__behaviors.forEach(function (behavior, i) {
          if (!(behavior.prototype instanceof Behavior)) {
            console.warn(behavior.constructor + " must be an instance of base/Behavior");
            return;
          }
          behavior.attach(self);
        });
      }
    }

    /**
     * Override with custom components behaviors
     * @return Array the behaviors the component implements
     */

  }, {
    key: 'behaviors',
    value: function behaviors() {
      return [];
    }
  }]);
  return Component;
}(React.Component);

module.exports = Component;
