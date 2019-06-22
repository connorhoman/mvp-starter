import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import PlayerList from './components/PlayerList.jsx';

const Background = styled.div`
  text-align: center;
  display: flex;
`;
const List = styled.span`
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
        var sorted = data.sort(function(a,b) {
          return a.rank - b.rank;
        })
        this.setState({
          players: sorted
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

    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const players = this.state.players;
    const newRanks = Array.from(players);

    newRanks.splice(source.index, 1);
    newRanks.splice(destination.index, 0, players[source.index]);

    this.setState({players: newRanks});
  }

  render () {
    return (
      <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
        <Background>
          <List>
            <PlayerList key={1} id={1} players={this.state.players.filter(player => player.position === 'QB')}/>
          </List>
          <List>
            <PlayerList key={1} id={1} players={this.state.players.filter(player => player.position === 'RB')}/>
          </List>
          <List>
            <PlayerList key={1} id={1} players={this.state.players.filter(player => player.position === 'WR')}/>
          </List>
          <List>
            <PlayerList key={1} id={1} players={this.state.players.filter(player => player.position === 'TE')}/>
          </List>
          <List>
            <PlayerList key={1} id={1} players={this.state.players.filter(player => player.position === 'DEF')}/>
          </List>
          <List>
            <PlayerList key={1} id={1} players={this.state.players.filter(player => player.position === 'PK')}/>
          </List>
        </Background>
      </DragDropContext>
      
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
