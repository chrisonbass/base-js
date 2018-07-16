import {
  BaseObjectBehavior,
  Focusable
} from './behavior';

import BaseObject from './base/BaseObject';

class TestClass {
  constructor(){
    this.type = "test-type";
  }

  getName(){
    return "Test Class";
  }

  addBehaviors(){
    var behavior = new Focusable(),
      base = new BaseObjectBehavior();

    base.attachBehavior(this);
    behavior.attachBehavior(this);

    this.behaviorRef = behavior;
    this.baseRef = base;
  }

  removeBehaviors(){
    if ( this.behaviorRef ){
      this.behaviorRef.detachBehavior();
    }
    if ( this.baseRef ){
      this.baseRef.detachBehavior();
    }
  }
};

var test = new TestClass();

console.log("Pre Attachment Methods");
console.log(BaseObject.getAllMethods(test));
test.addBehaviors();
console.log("Methods after attaching behaviors");
console.log(test.getAllMethods());
console.log("Check if focus method exists");
console.log(test.hasMethod("focus"));
console.log("Methods after removing behaviors");
test.removeBehaviors();
console.log(BaseObject.getAllMethods(test));

