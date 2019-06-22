import React from 'react';
import Player from './Player.jsx';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

const List = styled.div`
  width: 355px;
`;
const Card = styled.div`
  height: 100px;
`;

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }

  componentDidMount() {
    this.setState({
      players: this.props.players
    })
  }
  
  render() {
    return (
      <List>
        <Droppable droppableId={this.props.id}>
          {(provided) => (
            <Card ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.players.map((player, index) => <Player key={player.id} player={player} index={index}/>)}
              {provided.placeholder}
            </Card>
          )}
        </Droppable>
      </List>
    )
  }
}

export default PlayerList;
