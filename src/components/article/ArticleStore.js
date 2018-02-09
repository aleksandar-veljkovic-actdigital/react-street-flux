import {EventEmitter} from "events";
import dispatcher from "../../dispatcher.js";



class ArticleStore extends EventEmitter {

  constructor() {
    super();
    this.articles = [];
    this.handleActions = dispatcher.register(this.handleActions.bind(this));
  }

  create(articles) {
    this.articles = articles;
    this.emit('change');
    window.__articleStore = this;
  }

  get() {
    return this.articles;
  }

  handleActions(action) {
    switch (action.type) {
      case "ARTICLES_FETCH_DONE" :
        this.articles = action.data.articles;
        this.emit('change');
        break;
      default :
      console.log("articleStore :: unswitched action ::", action.type);
    }
  }

}



export default new ArticleStore();
