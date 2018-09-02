import BaseObject from './BaseObject';

/**
 * TODO Comment Behavior Class
 */
class Behavior extends BaseObject {
  constructor(){
    super();
    this.getBehaviorOwner = () => null;
    this.isBehaviorAttached = () => this.getBehaviorOwner() !== null;
    this.detachBehavior = () => undefined;
  }

  attachBehavior(component, onDetach = null){
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
        case "hasBehavior":
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
      if ( owner.__behaviors__ && owner.__behaviors__.indexOf(this.className()) >= 0 ){
        owner.__behaviors__.splice( owner.__behaviors__.indexOf( this.className() ), 1 );
        if ( owner.__behaviors__.length === 0 ){
          delete owner.__behaviors__;
        }
      }
      owner = null;
      if ( onDetach && typeof onDetach === "function" ){
        onDetach();
      }
    };

    if ( !owner.__behaviors__ ){
      owner.__behaviors__ = [];
    }
    owner.__behaviors__.push(this.className());
  }

  static hasBehavior(component, behavior){
    var className = null;
    if ( typeof behavior === "function" ){
      className = behavior.name;
    } 
    else if ( behavior.className && typeof behavior.className === "function" ){
      className = behavior.className();
    }
    else if ( behavior.prototype && behavior.prototype.constructor && typeof behavior.prototype.constructor.name ){
      className = behavior.prototype.constructor.name;
    }
    return ( 
      className !== null && 
      Array.isArray(component.__behaviors__) && 
      component.__behaviors__.indexOf(className) >= 0 
    ) ? true : false;
  }
};

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

export default Behavior;
