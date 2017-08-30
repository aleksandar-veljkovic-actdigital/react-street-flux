import React, { Component } from 'react';
import axios from 'axios';

class Articles extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "Title To Be Changed",
      articles: [
        {title: 'to be changed 1'},
        {title: 'to be changed 2'}
      ]
    };
  }

  getArticles(e){
    axios.get("https://www.street.rs/react/views/thums_grid.json?display_id=block_6")
      .then(response => {
        //this.setState({articles: response.data}); // ES 6 SHORTHANDS ::
        const articles = response.data;
        const title = `Changed Title`;
        this.setState({articles, title});
      })
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <button onClick={this.getArticles.bind(this)}>Fetch Articles</button>
        <section>
          {this.state.articles.map((article, i) =>
            <article key={i}><h3>{article.title}</h3></article>
          )}
        </section>
      </div>
    );
  }

}

export default Articles;
