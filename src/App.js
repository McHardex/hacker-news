import React, { Component } from 'react';
import './App.css';
import HackerNewsHeader from './components/HackerNewsHeader';
// import HackerNewsContent from './components/HackerNewsContent';
import Api from './api';
// import HackerNewsFooter from './components/HackerNewsFooter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hackerNews: []
    };
  }

  fetchNewStories(storyIds){
    let actions = storyIds.slice(0, 30).map(this.fetchSingleStory);
    let results = Promise.all(actions);
    results.then((data)=> {
      this.setState(
        Object.assign({}, this.state,{
          hackerNews : data
        })
      );
      // console.log(this.state.hackerNews)
    })
  }

  fetchSingleStory(id, index) {
    const rank = index + 1;
    return new Promise(resolve => {
      Api.fetch(`/item/${id}`, {
        then(data) {
          let item = data;
          // adding the rank since it does not exist yet
          item.rank = rank;
          resolve(item);
        }
      });
    });
  }

  componentDidMount(){
    Api.fetch(`/newstories`, {
      context: this,
      then(storyIds) {
        this.fetchNewStories(storyIds);
      }
    });
  }
  


  render() {
    return (
    <div className='news'>
      <div className='newsHeader'>
        <HackerNewsHeader/>
      </div>
        {
          Object.keys(this.state.hackerNews).map((newsContent)=> {
            const newsObj = this.state.hackerNews[newsContent];
            const date = new Date(newsObj.time)
            console.log(newsObj)
          return (
            <div className='newsBody' key={newsObj.id}>
              <a href={newsObj.url || 'google.com'}>{newsObj.title}</a>
              <div className='newsBy'>
              <p className='author'>Author: {newsObj.by || 'anonymous'}</p>
              <p className='time'>time: {date.toTimeString() || 'unknown'}</p>
              </div>
            </div>
          ) 
          })
        }
      <div className='newsFooter'>
        {/* <HackerNewsFooter/> */}
      </div>
    </div>
    );
  }
}

export default App;
