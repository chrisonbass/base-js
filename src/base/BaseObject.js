const exclude = [
  "constructor"
];

class BaseObject {
  constructor(){
    this.init();
  }
  
  init(){
  }

  className(){
    var proto = Object.getPrototypeOf(this);
    if ( proto && proto.constructor && proto.constructor.name ){
      return proto.constructor.name;
    }
    return null;
  }

  getAllProperties(){
    var props = {},
      self = this;
    Object.getOwnPropertyNames(self).forEach( (prop) => {
      if ( typeof self[prop] !== "function" ){
        props[prop] = self[prop];
      }
    } );
    return props;
  }

  hasProperty(propName){
    return Object.keys(this.getAllProperties()).indexOf(propName) >= 0;
  }

  getAllMethods(){
    var props = [],
      self = this;
    Object.getOwnPropertyNames(self).forEach( (prop) => {
      if ( typeof self[prop] === "function" ){
        props.push(prop);
      }
    } );
    var ref = Object.getPrototypeOf(self);
    while ( ref ){
      if ( ref === Object.prototype ) break;
      Object.getOwnPropertyNames(ref.constructor.prototype).forEach( (prop) => {
        if ( props.indexOf(prop) < 0 && exclude.indexOf(prop) < 0 ){
          props.push(prop);
        }
      } );
      ref = Object.getPrototypeOf(ref);
    }
    return props.sort();
  }

  hasMethod(propName){
    return this.getAllMethods().indexOf(propName) >= 0;
  }

  instanceOf(classWrapper){
    return this instanceof classWrapper;
  }
};

/**
 * Static method access for prototype method getAllProperties
 *
 * @param  objectRef OBJECT the referenced object whose properties
 *                          are being returned
 * @return ARRAY the names of all properties
 */
BaseObject.getAllProperties = (objectRef) => {
  return BaseObject.prototype.getAllProperties.call(objectRef);
};

/**
 * Static method access for prototype method getAllMethods
 *
 * @param  objectRef OBJECT the referenced object whose methods
 *                          are being returned
 * @return ARRAY the names of all methods
 */
BaseObject.getAllMethods = (objectRef) => {
  return BaseObject.prototype.getAllMethods.call(objectRef);
};

/**
 * Static method checks if an object is an instance of
 * the provided class wrapper
 */
BaseObject.instanceOf = (objectRef, classWrapper) => {
  return BaseObject.prototype.instanceOf.call(objectRef, classWrapper);
};

export default BaseObject;
