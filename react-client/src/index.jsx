import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import PlayerList from './components/PlayerList.jsx';
import data from '../../playerData.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      players: data
    }
  }
  
  onDragEnd() {
    // TODO
  }

  render () {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>
          <h1>Player List</h1>
          <PlayerList key={1} id={1} players={this.state.players}/>
        </div>
      </DragDropContext>
      
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));