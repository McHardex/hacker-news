import React, { Component } from 'react';
import HackerNewsHeader from './components/HackerNewsHeader';
import HackerNewsContent from './components/HackerNewsContent';
import './App.css';

class App extends Component {

  render() {
    return (
    <div className='news'>
        <HackerNewsHeader />
        <HackerNewsContent />
    </div>
    );
  }
}

export default App;
