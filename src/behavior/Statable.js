import Behavior from '../base/Behavior';
import Eventable from './Eventable';
import uniqid from '../util/uniqid';
import merge from 'deepmerge';
import deepEqual from 'deep-equal';

export default class Statable extends Behavior {
  init(){
    super.init();
    this.state = {};
    this.eventer = null;
  }

  attachBehavior(component, onDetach = null){
    var self = this;
    super.attachBehavior(component, () => {
      if ( self.eventer && typeof self.eventer.detachBehavior === "function" ){
        self.eventer.detachBehavior();
      }
      if ( onDetach && typeof onDetach === "function" ){
        onDetach();
      }
    } );
    if ( !Behavior.hasBehavior(component, Eventable) ){
      this.eventer = new Eventable();
      this.eventer.attachBehavior(component);
    }
  }

  getState(behavior){
    return behavior.state;
  }

  getStateCopy(behavior){
    return merge({}, behavior.state);
  }

  setState(behavior, newState = {}){
    var newerState = merge.all([{}, behavior.state, newState]);
    if ( !deepEqual(behavior.state, newerState) ){
      behavior.state = newerState;
      this.trigger('state-change', this.getState());
    }
  }
};
