import Behavior from '../base/Behavior';
import uniqid from '../util/uniqid';

export default class Eventable extends Behavior {
  init(){
    super.init();
    this.listeners = {};
  }

  on(behavior, event_name, callback){
    if ( behavior.listeners[event_name] === undefined ){
      behavior.listeners[event_name] = {};
    }
    if ( typeof callback === "function" ){
      var id = uniqid();
      behavior.listeners[event_name][id] = callback;
      return () => {
        delete behavior.listeners[event_name][id];
        if ( Object.keys(behavior.listeners[event_name]).length <= 0 ){
          delete behavior.listeners[event_name];
        }
      }
    }
  }

  trigger(behavior, event, data = null){
    if ( typeof event === "string" ){
      var event_name = event;
      if ( typeof CustomEvent === "function" ){
        event = new CustomEvent( event_name, {
          detail: data 
        } );
      } else {
        event = {
          target: this,
          detail: data
        };
      }
      event.name = event_name;
      event.component = this;
    }
    if ( event && event.name ){
      if ( behavior.listeners[event.name] !== undefined ){
        var listeners = behavior.listeners[event.name];
        if ( listeners ){
          Object.keys(listeners).forEach( (id) => {
            listeners[id](event);
          } );
        }
      }
    }
  }
};
