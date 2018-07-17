import Behavior from '../base/Behavior';
import BaseObject from '../base/BaseObject';

/**
 * Adds BaseObject properties to a component that
 * hasn't extends BaseObject
 */
export default class BaseObjectBehavior extends Behavior {

  getAllProperties(behavior){
    return BaseObject.prototype.getAllProperties.call(this);
  }
  
  hasProperty(behavior, propName){
    return BaseObject.prototype.hasProperty.call(this, propName);
  }

  getAllMethods(behavior){
    return BaseObject.prototype.getAllMethods.call(this);
  }

  hasMethod(behavior, methodName){
    return BaseObject.prototype.hasMethod.call(this, methodName);
  }

}
