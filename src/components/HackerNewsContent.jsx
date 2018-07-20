import React, { Component } from 'react';
import Api from '../api';
import InfiniteScroll from 'react-infinite-scroll-component';
import loading from'../images/loading.gif'

const style = {
  width: '50px',
  display: 'flex',
  margin: '0 auto',
}
class HackerNewsContent extends Component {
    state = {
      hackerNews: [],
      pageNews: [],
      endAt: 15,
      hasMore: true,
    };

  componentDidMount(){
    Api.fetch(`/newstories`, {})
    .then(responses => { this.fetchNewStories(responses) })
  }


  fetchNewStories = (storyIds) => {
    let actions = storyIds.map(this.fetchSingleStory);
    let results = Promise.all(actions);
    results.then(data => this.setState({
      hackerNews : data,
      pageNews: data.slice(0, this.state.endAt),
    }))
  }

  // fetching the ids
  fetchSingleStory = (id, index) => {
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

  // fetching more news content
  fetchMore = () => {
    const newEnd = this.state.endAt + 10;
    const allNews = this.state.hackerNews.slice(0, newEnd);

    if(allNews.length === this.state.hackerNews.length){
      this.setState({hasMore: false})
    }

    setTimeout(() => {
      this.setState({
        pageNews: allNews, endAt: newEnd,
      })
    }, 2500); 
  }

  render() {
    return (
        <InfiniteScroll
          dataLength={this.state.pageNews.length}
          next={this.fetchMore}
          hasMore={this.state.hasMore}
          loader={<img src={loading} style={style} alt='loading_image'/>}
          endMessage={
            <p>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
        {
          Object.keys(this.state.pageNews).map((newsContent, index)=> {
            const newsObj = this.state.pageNews[newsContent];
            const date = new Date(newsObj.time)

            return ( 
            <div key={index} className='newsBody'>
              <a href={newsObj.url || 'google.com'} target="_blank">{newsObj.title}</a>
              <div className='newsBy'>
                <div  className='author'>
                <p><span>Author: </span>{newsObj.by || 'anonymous'}</p>
                </div>
                <div  className='time'>
                <p><span>Time: </span>{date.toTimeString() || 'unknown'}</p>
                </div>
              </div>
            </div>
          )
          })
        }
        </InfiniteScroll>
    );
  }
}

export default HackerNewsContent;
