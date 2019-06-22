import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid black;
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
  margin-left: 15px;
`;
const Wrapper = styled.div`
  padding: 10px;
`;

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      background: ''
    }
  }
  componentDidMount() {
    if (this.props.player.position === 'QB') {
      this.setState({background: '#ffa8ab'});
    }
    if (this.props.player.position === 'RB') {
      this.setState({background: '#bed8ff'});
    }
    if (this.props.player.position === 'WR') {
      this.setState({background: '#a6ff8e'});
    }
    if (this.props.player.position === 'TE') {
      this.setState({background: '#fff5a7'});
    }
    if (this.props.player.position === 'DEF') {
      this.setState({background: '#ffc986'});
    }
    if (this.props.player.position === 'PK') {
      this.setState({background: '#ffbef5'});
    }
  }

  render() {
    return (
      
      <Draggable draggableId={this.props.player.id} index={this.props.index}>
        {(provided) => (
            <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <Wrapper style={{backgroundColor: this.state.background}}>
                <Name>
                  { this.props.player.name }
                </Name>
                <Position>
                  { this.props.player.position }
                </Position>
                <Team>
                  { this.props.player.team }
                </Team>
              </Wrapper>                
            </Card>
        )}
      </Draggable>
    
    )
  }
}

export default Player;
