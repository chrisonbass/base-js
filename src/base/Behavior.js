import BaseObject from './BaseObject';

const attachMethod = function(owner, methodName, parent){
  owner[methodName] = function(){
    var args = [];
    args.push(parent);
    Array.prototype.slice.call(arguments).forEach( (arg) => {
      args.push(arg);
    } );
    return parent[methodName].apply(owner, args);
  };
};

export default class Behavior extends BaseObject {

  constructor(){
    super();
    this.getBehaviorOwner = () => null;
    this.isBehaviorAttached = () => this.getBehaviorOwner() !== null;
    this.detachBehavior = () => undefined;
  }

  attachBehavior(component){
    var self = this,
      owner = component,
      attachedPropNames = [], 
      methods = BaseObject.prototype.getAllMethods.call(self),
      ownerMethods = BaseObject.prototype.getAllMethods.call(owner),
      methodName;

    for( methodName in methods ){
      methodName = methods[methodName];
      switch ( methodName ){
        case "constructor":
        case "init":
        case "attachBehavior":
        case "detachBehavior":
        case "isBehaviorAttached":
        case "getBehaviorOwner":
          continue;
      }
      if ( ownerMethods.indexOf(methodName) >= 0 ) continue;
      if ( typeof self[methodName] === "function" ){
        attachMethod(owner, methodName, this);
        attachedPropNames.push(methodName);
      }
    } 

    this.getBehaviorOwner = () => owner;

    this.detachBehavior = () => {
      attachedPropNames.forEach( (propName, index) => {
        delete owner[propName];
      } );
      owner = null;
    };
  }
};
