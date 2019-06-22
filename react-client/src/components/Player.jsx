import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

class Player extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.player.id} index={this.props.index}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            { this.props.player.name }
          </div>
        )}
      </Draggable>
    )
  }
}

export default Player;
