import React, { Component } from "react";
import axios from "axios";
import { FaTwitterSquare } from "react-icons/fa";
import "./App.css";

class qouteMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
      bgColor: "#f54992",
      clickCount: 0,
    };
    this.getNewQuote = this.getNewQuote.bind(this);
  }

  getNewQuote = () => {
    this.getQuote();
    this.changeColor();
  };

  componentDidMount() {
    this.getQuote();
  }

  getQuote() {
    axios
      .get(
        "https://gist.githubusercontent.com/yeraldith/c05214cd3d5c933a607d769576ddb554/raw/32e4fcde5b3a4c12a5aef9e1842120f3331ffbe8/data"
      )
      .then((response) => {
        let data = response.data.quotes;
        let number = Math.floor(Math.random() * 30);
        let randomQuote = data[number];

        this.setState({
          quote: randomQuote["quote"],
          author: randomQuote["author"],
        });
      });
  }

  changeColor = () => {
    const color = [
       "#82E0AA",
    "#6B6C6B",
    "#FA8072",
    "#f39c12",
    "#00FF00",
    "#00FFFF",
    "#008080",
    "#FF00FF",
    "#800080",
    "#C0C0C0",
    "#808000",
    "#73A857",
    "#83245A"
    ];
    let i = this.state.clickCount;

    this.setState({
      clickCount: this.state.clickCount + 1,
    });

    if (i < 12) {
      this.setState({
        bgColor: color[i],
      });
    } else if (i >=13) {
      this.setState({
        bgColor: color[i],
        clickCount: 0,
      });
    } else if (i === 0) {
      this.setState({
        clickCount: this.state.clickCount + 1,
        bgColor: color[i],
      });
    }
  };

  render() {
    return (
      <div id="main">
        <style>
          {`
            :root {
              --main-bg-color: ${this.state.bgColor};
              --main-txt-color: ${this.state.bgColor};
              }
            `}
        </style>
        <div className="App text center" id="quote-box">
          <h1 id="text">{`"${this.state.quote}"`}</h1>
          <h5
            id="author"
            className="d-flex justify-content-end"
          >{`---${this.state.author}`}</h5>
          <div id="buttons">
            <a
              id="tweet-quote"
              className="rounded-lg width"
              href={`https://twitter.com/intent/tweet?text=${this.state.quote} ${this.state.author}`}
              target="_blank"
              title="Post this quote on twitter!"
            >
              <span>
                <i className="twitter-icon ">
                  <FaTwitterSquare />
                </i>
              </span>
            </a>
            <button
              id="new-quote"
              className="button"
              
              onClick={this.getNewQuote}
            >
             
              Next Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default qouteMachine;

