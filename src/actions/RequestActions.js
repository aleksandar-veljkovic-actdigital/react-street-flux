import dispatcher from "../dispatcher";

import axios from 'axios';

window.__axios = axios;

export function articlesFetch(latitude = "", longitude = ""){
  axios.get(`https://www.street.rs/react/views/thums_grid.json?display_id=locator&lat=${latitude}&lon=${longitude}`)
  .then(response => {
    const articles = response.data;
    dispatcher.dispatch({
      type: "ARTICLES_FETCH_DONE",
      data: {articles}
    });
  })
  .catch((error) => {
    console.log("ARTICLE_FETCH_ERROR");
  });
}

export function tokenFetch(callback, ...args) {
  callback = callback || function(){};
  axios({
    method: 'post',
    url: "https://www.street.rs/react/user/token.json",
    withCredentials: true
  })
  .then(response => {
    //console.log("Actions :: tokenFetch => axios.defaults.headers.common")
    axios.defaults.headers.common = {
        //'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN' : response.data.token
    };
    callback(...args)
  })
}

export function userFetch() {
  axios({
    method: 'post',
    url: "https://www.street.rs/react/system/connect.json",
    withCredentials: true,
    data: {}
  })
  .then(response => {
    //console.log("Actions :: userFetch OK:", response.data.user);
    dispatcher.dispatch({
      type: "USER_FETCH_DONE",
      data: {user: response.data.user}
    });
  })
  .catch((error) => {
    if ( error.response && error.response.status ===  401 ) {
      tokenFetch(userFetch)
    }
    else {
      //console.log("Actions :: userFetch Error:", error.response)
    }
  })
}

export function userLogout() {
  axios({
    method: 'post',
    url: "https://www.street.rs/react/user/logout.json",
    withCredentials: true,
  })
  .then(response => {
    //console.log("requestActions :: Logout OK:", response.data);
    delete axios.defaults.headers.common['X-CSRF-TOKEN'];
    userFetch();
  })
  .catch((error) => {
    if ( error.response && error.response.status ===  401 ) {
      tokenFetch(userLogout)
    }
    if ( error.response && error.response.status ===  406 ) { // user not logged in
      delete axios.defaults.headers.common['X-CSRF-TOKEN']
      userFetch();
    }
    else {
      console.log("requestActions :: Unhandled Logout Error:", error.response)
    }
  })
}

export function userLogin(usr, pass) {
  axios({
    method: 'post',
    url: "https://www.street.rs/react/user/login.json",
    withCredentials: true,
    data: {
      username: usr,
      password: pass
    }
  })
  .then(response => {
    //console.log("requestActions :: Logout OK:", response.data);
    dispatcher.dispatch({
      type: "USER_LOGIN_DONE",
      data: response.data
    });
  })
  .catch( (error) => {
    dispatcher.dispatch({
      type: "USER_LOGIN_ERROR",
      data: error.response
    });
  })
}
