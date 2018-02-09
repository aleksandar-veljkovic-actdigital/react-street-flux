import React, { Component } from 'react';
import styled from 'styled-components';

import ArticleStore from "./ArticleStore";
import * as RequestActions from "../../actions/RequestActions"


const Styled = styled.div`
  & {
    padding-top: 2rem;
  }
  h1 {
    font-size: 1rem;
    text-align: center;
  }
  article {
    //border-bottom: 2px solid #ddd;
    //margin-bottom: 2px;
    //padding-bottom: 2px;
    position: relative;
    h3 {
      color: white;
      text-shadow: 2px 2px black;
      position: absolute;
      bottom: 1rem;
      right: 1rem;
    }
    .thumbnail {
      width: 100%;
      display: block;
    }
  }

`;

class Articles extends Component {

  constructor(props) {
    super(props);
    this.setArticles = this.setArticles.bind(this)
    this.state = {
      title: "Street Arts by Proximity",
      latitude: false,
      longitude: false,
      articles: []
    };
    if (typeof(Number.prototype.toRad) === "undefined") { /** Converts numeric degrees to radians */
      /*eslint-disable */
      Number.prototype.toRad = function() {
        return this * Math.PI / 180;
      }
      /*eslint-enable */
    }
    window.__articles = this;
    RequestActions.articlesFetch();
  }

  componentWillMount() {
    ArticleStore.on('change', this.setArticles)
  }

  componentWillUnmount() {
    ArticleStore.removeListener("change", this.setArticles);
  }

  setArticles(){
    console.log('articleStore CHANGE')
    this.setState({articles: ArticleStore.get()});
  }

  caluclateDistance(lat1, lon1){

    let lat2 = parseFloat(this.state.latitude);
    let lon2 = parseFloat(this.state.longitude);

    lat1 = parseFloat(lat1);
    lon1 = parseFloat(lon1);

    var R = 6371; // Radius of the earth in km
    var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
    var dLon = (lon2-lon1).toRad();
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var distance = R * c; // Distance in km

    if(isNaN(distance)) {
      return "";
    }

    distance = (distance < 1) ? Math.round(distance * 1000) + "m" : Math.round(distance) + "km";
    return distance;

  }

  render() {
    return (
      <Styled>
        <h1>{this.state.title}</h1>
        <section>
          {this.state.articles.map((article, i) =>
            <article key={i}>
              {/*<h3>{article.title}</h3>*/}
              <h3>{this.caluclateDistance(article.lat, article.lon)}</h3>
              <img className="thumbnail" src={article.photos}
                srcSet={`${article.photos_s} 575w, ${article.photos_m} 767w,
                ${article.photos_l} 1024w`} alt="" />
            </article>
          )}
        </section>
      </Styled>
    );
  }

}

export default Articles;
