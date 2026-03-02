import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "us",          // null = global
    pageSize: 7,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  buildUrl = (page) => {
  const { country, category, pageSize } = this.props;

  return `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
};

  updateNews = async (page) => {
    this.setState({ loading: true });

    try {
      const url = this.buildUrl(page);
      const response = await fetch(url);
      const data = await response.json();
      console.log("NewsAPI response:", data);

      if (data.status !== "ok") {
        this.setState({ loading: false });
        return;
      }

      this.setState({
        articles: data.articles || [],
        totalResults: data.totalResults || 0,
        page,
        loading: false,
      });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    this.updateNews(1);
  }

  componentDidUpdate(prevProps) {
  if (prevProps.category !== this.props.category) {
    this.setState({ page: 1 }, () => {
      this.updateNews(1);
    });
  }
}

  handlePrev = () => {
    if (this.state.page > 1) {
      this.updateNews(this.state.page - 1);
    }
  };

  handleNext = () => {
    const maxPages = Math.ceil(
      this.state.totalResults / this.props.pageSize
    );

    if (this.state.page < maxPages) {
      this.updateNews(this.state.page + 1);
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px 0" }}>
          NewsKoala - Top Headlines
        </h1>

        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((article) => (
              <div className="col-md-4" key={article.url}>
                <Newsitem
                  title={article.title}
                  description={article.description}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                />
              </div>
            ))}
        </div>

        <div className="d-flex justify-content-around my-3">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-info"
            onClick={this.handlePrev}
          >
            ← Previous
          </button>

          <button
            disabled={
              this.state.page >=
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-info"
            onClick={this.handleNext}
          >
            Next →
          </button>
        </div>
      </div>
    );
  }
}

export default News;
