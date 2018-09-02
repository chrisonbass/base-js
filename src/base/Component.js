import React from 'react';
import Behavior from './Behavior';

export default class Component extends React.Component {
  constructor(props){
    super(props);
    if ( this.constructor === Component ){
      throw new TypeError("You must extends abstract class Component.");
    }
    this.ensureBehaviors();
  }

  ensureBehaviors(){
    this.behaviors().forEach( (behavior, i) => {
      if ( !(behavior.prototype instanceof Behavior) ){
        console.warn(behavior.constructor + " must be an instance of base/Behavior");
        return;
      }
      behavior.attach(self);
    } );
  }

  /**
   * Override with custom components behaviors
   * @return Array the behaviors the component implements
   */
  behaviors(){
    return [];
  }
};
