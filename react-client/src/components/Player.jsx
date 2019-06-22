import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid black;
  display: inline-block;
  width: 355px;
`;
const Name = styled.span`
  font-weight: bold;
  align-content: left;
  float: left;
  margin-left: 5px;
`;
const Team = styled.span`
  float: right;
`;
const ADP = styled.span`
  font-size: 12px;
  color: grey;
  margin-left: 5px;
`;
const Wrapper = styled.div`
  padding: 10px;
`;
const Rank = styled.span`
  float: left;
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
                <Rank>
                  #{ this.props.player.id }
                </Rank>
                <Name>
                  { this.props.player.name }
                </Name>
                <ADP>
                  ADP: { this.props.player.ADP } ({ this.props.player.STD })
                </ADP>
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
