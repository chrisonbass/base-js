import Behavior from '../base/Behavior';

export default class Focusable extends Behavior {
  init(){
    super.init();
    this.focusableItem = null;
  }

  setFocusItem(behavior, component){
    if ( component ){
      behavior.focusableItem = component;
    }
  }

  focus(behavior){
    if ( behavior.focusableItem !== null ){
      var item = $(behavior.focusableItem);
      if ( item && item.length ){
        item.focus();
      }
    }
  }

  hasFocus(behavior){
    if ( behavior.focusableItem !== null ){
      var item = $(behavior.focusableItem);
      if ( item && item.length ){
        return item.is(":focus");
      }
    }
    return false;
  };
}
