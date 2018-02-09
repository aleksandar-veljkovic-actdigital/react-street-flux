import {EventEmitter} from "events";
import dispatcher from "../../dispatcher.js";



class UserStore extends EventEmitter {

  constructor() {
    super();
    this.user = {};
    this.formMessage = "";
    window.__userStore = this;
  }

  get() {
    return this.user;
  }

  message () {
    return this.formMessage;
  }

  handleActions(action) {
    switch (action.type) {
      case "USER_LOGIN_DONE" :
        this.user = action.data.user;
        this.emit('change');
        break;
      case "USER_FETCH_DONE" :
        this.user = action.data.user;
        this.emit('change');
        break;
      case "USER_LOGIN_ERROR" :
        this.formMessage = action.data.statusText;
        this.emit('loginError');
        break;
      case "USER_LOGOUT_DONE" :
        this.emit('logoutDone');
        break;
      default :
        console.log("userStore :: unswitched action ::", action.type);
    }
  }

}

const userStore = new UserStore();
dispatcher.register(userStore.handleActions.bind(userStore));
export default userStore;
