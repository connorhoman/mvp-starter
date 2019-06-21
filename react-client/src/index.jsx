import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PlayerList from './components/PlayerList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      players: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/players', 
      success: (data) => {
        this.setState({
          players: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Player List</h1>
      <PlayerList players={this.state.players}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));