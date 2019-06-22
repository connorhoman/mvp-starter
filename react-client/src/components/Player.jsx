import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div`
  background-color: white;
  border: 1px solid black;
  padding: 10px;
  width: 50%;
  display: inline-block;
`;
const Name = styled.span`
  font-weight: bold;
`;
const Team = styled.span`
  float: right;
`;
const Position = styled.span`
  font-style: italic;
  margin-left: 15px
`;

class Player extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.player.id} index={this.props.index}>
        {(provided) => (
          <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <Name>
              { this.props.player.name }
            </Name>
            <Position>
              { this.props.player.position }
            </Position>
            <Team>
              { this.props.player.team }
            </Team>
          </Card>
        )}
      </Draggable>
    )
  }
}

export default Player;
