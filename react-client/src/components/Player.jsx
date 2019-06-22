import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div`
  border: 3px ridge white;
  display: inline-block;
  width: 355px;
`;
const Name = styled.span`
  font-weight: 900;
  align-content: left;
  margin-left: 5px;
  font-size: 100%;
  color: #525151;
`;
const Team = styled.span`
  float: right;
  color: #525151;
`;
const ADP = styled.span`
  font-size: 12px;
  color: grey;
  margin-left: 5px;
  float: left;
  font-family: 'Times New Roman', Times, serif;
`;
const Bye = styled.span`
  font-size: 14px;
  color: grey;
  margin-left: 5px;
  float: right;
`;
const Wrapper = styled.div`
  padding: 10px;
`;
const AAV = styled.span`
  color: #525151;
  float: left;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 500;
  font-size: 15px;
`;

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      background: '',
    }
  }
  turnColor() {
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
    if (this.props.player.name.length === 6) {
      this.setState({background: 'black'});
    }
  }
  componentDidMount() {
    this.turnColor();
  }
  turnGrey() {
    this.setState({background: 'black'});
  }
  onClick() {
    if (this.state.background === 'black') {
      this.turnColor();
    } else {
      this.turnGrey();
    }
  }
  render() {
    return (  
      <Draggable draggableId={this.props.player.id} index={this.props.index}>
        {(provided) => (
            <Card onClick={this.onClick.bind(this)} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <Wrapper style={{backgroundColor: this.state.background}}>
                <AAV>
                  ${ this.state.AAV }
                </AAV>
                <ADP>
                  ({ this.props.player.ADP })
                </ADP>
                <Name>
                  { this.props.player.name }
                </Name>              
                <Bye>
                  { this.props.player.bye }
                </Bye>
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
