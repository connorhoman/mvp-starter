import React from 'react';
import Player from './Player.jsx';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

const List = styled.div`
  align-self: center;
  text-align: center;
`;

const PlayerList = (props) => (
  <List>
    <Droppable droppableId={props.id}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {props.players.map((player, index) => <Player key={player.id} player={player} index={index}/>)}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </List>
)

export default PlayerList;
