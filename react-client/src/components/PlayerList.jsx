import React from 'react';
import Player from './Player.jsx';
import { Droppable } from 'react-beautiful-dnd';

const PlayerList = (props) => (
  <div>
    <h4> Player List </h4>
    <Droppable droppableId={props.id}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {props.players.map((player, index) => <Player key={player.id} player={player} index={index}/>)}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
)

export default PlayerList;