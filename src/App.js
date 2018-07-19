import React, { Component } from 'react';
import './App.css';
import HackerNewsHeader from './components/HackerNewsHeader';
import HackerNewsContent from './components/HackerNewsContent';

class App extends Component {

  render() {
    return (
    <div className='news'>
        <HackerNewsHeader/>
        <HackerNewsContent />
    </div>
    );
  }
}

export default App;
