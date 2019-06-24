import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import PlayerList from './components/PlayerList.jsx';

const Background = styled.div`
  font-family: 'Courier New', Courier, monospace;
  font-size: 15px;
  text-align: center;
  display: flex;
  margin-top: 8px;
`;
const List = styled.span`
  border-right: 2px ridge black;
`;
const Header = styled.div`
  background-color: black;
  font-size: 20px;
  color: white;
`;
const Title = styled.div`
  background-color: black;
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
  font-weight: bold;
  color: white;
  align-content: center;
  display: inline;
`;
const User = styled.div`
  align-content: center;
  display: inline;
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
  color: white;
`;
const Input = styled.input`
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
`;
const Wrapper = styled.div`
  text-align: center;
`;
const Button = styled.button`
  font-family: 'Courier New', Courier, monospace;
  margin-left: 5px;
  font-size: 20px;
`;
const Save = styled.button`
  font-family: 'Courier New', Courier, monospace;
  margin-right: 20px;
  font-size: 20px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: '',
      userRanking: '',
      qb: [],
      rb: [],
      wr: [],
      te: [],
      def: [],
      pk: []
    }
  }
  
  componentDidMount() {
    $.ajax({
      url: '/players', 
      success: (data) => {
        var sorted = data.sort(function(a,b) {
          return a.rank - b.rank;
        });
        var qbs = sorted.filter(player => player.position === 'QB');
        var rbs = sorted.filter(player => player.position === 'RB');
        var wrs = sorted.filter(player => player.position === 'WR');
        var tes = sorted.filter(player => player.position === 'TE');
        var defs = sorted.filter(player => player.position === 'DEF');
        var pks = sorted.filter(player => player.position === 'PK');
        this.setState({
          user: '',
          userRanking: 'ESPN',
          qb: qbs,
          rb: rbs,
          wr: wrs,
          te: tes,
          def: defs,
          pk: pks
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  findRankings() {
    $.ajax({
      url: `/rankings/${this.state.user}`,
      success: (data) => {
        if (data) {
          console.log('Successfully loaded', data[0].user, 's rankings');
          this.setState(data[0]);
          this.setState({userRanking: data[0].user});
        } else {
          this.handleNotFound();
        } 
        
      },
      error: (err) => {
        console.log('Failed to speak to database', err);
      }
    });
  }
  handleNotFound() {
    window.alert('User Not Found');
  }
  saveRankings() {
    $.ajax({
      url: '/rankings',
      type: 'POST',
      data: this.state,
      success: () => {
        window.alert(`Successfully Saved ${this.state.user}'s Rankings`);
      },
      error: (err) => {
        console.log('Failed to save rankings', err);
      }
    });
  }
  onDragEnd(result) {
    const destination = result.destination;
    const source = result.source;
    const droppableId = result.destination.droppableId;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
    const players = this.state[droppableId];
    const newRanks = Array.from(players);
    newRanks.splice(source.index, 1);
    newRanks.splice(destination.index, 0, players[source.index]);
    this.setState({[droppableId]: newRanks});
  }

  render () {
    return (
      <div>
        <Wrapper>
          <Title>Fantasy Football Draft Dashboard</Title>
        </Wrapper>
        <Wrapper>
          <User>showing {this.state.userRanking}'s ranks</User>
        </Wrapper>
        <Input placeholder='Username' onChange={(e) => this.setState({user: e.target.value})}/>
        <Button onClick={this.findRankings.bind(this)} >Find</Button>      
        <Save onClick={this.saveRankings.bind(this)}>Save</Save> 
        <Background>
          <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
            <List>
              <Header>
                Quarterbacks
              </Header>
              <PlayerList key={1} id={'qb'} players={this.state.qb}/>
            </List>
            <List>
              <Header>
                Running Backs
              </Header>
              <PlayerList key={2} id={'rb'} players={this.state.rb}/>
            </List>
            <List>
              <Header>
                Wide Recievers
              </Header>
              <PlayerList key={3} id={'wr'} players={this.state.wr}/>
            </List>
            <List>
              <Header>
                Tight Ends
              </Header>
              <PlayerList key={4} id={'te'} players={this.state.te}/>
            </List>
            <List>
              <Header>
                Defenses
              </Header>
              <PlayerList key={5} id={'def'} players={this.state.def}/>
            </List>
            <List>
              <Header>
                Kickers
              </Header>
              <PlayerList key={6} id={'pk'} players={this.state.pk}/>
            </List>         
          </DragDropContext>   
        </Background> 
      </div>    
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
