import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import PlayerList from './components/PlayerList.jsx';

const Background = styled.div`
  text-align: center;
`;

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

  onDragEnd(result) {
    const destination = result.destination;
    const source = result.source;
    const draggableId = result.draggableId;

    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const players = this.state.players;
    const newRanks = Array.from(players);
    console.log(newRanks);

    newRanks.splice(source.index, 1);
    newRanks.splice(destination.index, 0, players[source.index]);

    this.setState({players: newRanks});
  }

  render () {
    return (
      <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
        <Background>
          <h1>Player List</h1>
          <PlayerList key={1} id={1} players={this.state.players}/>
        </Background>
      </DragDropContext>
      
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
