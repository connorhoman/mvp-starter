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
`;
const Img = styled.div`
  margin-top: -7px;
  padding-right: 25px;
  opacity: .7;
`;
const ADP = styled.span`
  font-size: 14px;
  margin-left: 15px;
  float: left;
`;
const Bye = styled.span`
  font-size: 14px;
  margin-left: 5px;
  float: right;
`;
const Wrapper = styled.div`
  padding: 10px;
`;
const AAV = styled.span`
  float: left;
  margin-top: -2px;
  font-weight: 900;
  font-size: 19px;
  color: darkgreen;
`;
const Rank = styled.span`
  float: left;
  padding-left: 20px;
`;

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      background: '',
      AAV: '',
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
    if (this.props.player.name.slice(0,4) === 'TIER') {
      this.setState({background: 'grey'});
    }
  }
  componentDidMount() {
    this.turnColor();
    if (this.props.player.AAV !== '') {
      this.setState({AAV: '$' + this.props.player.AAV});
    }
  }

  onClick(e) {
    if (e.metaKey) {
      this.onRightClick();
    } else {
      if (this.state.background === 'black') {
        this.turnColor();
      } else {
        this.setState({background: 'black'});
      }
    }
  }

  onRightClick() {
    if (this.state.background === 'gold') {
      this.turnColor();
    } else {
      this.setState({background: 'gold'})
    }
  }

  getRank(index) {
    if (this.props.player.name.slice(0,4) === 'TIER') {
      return;
    }
    if (this.props.player.position === 'QB') {
      return 'QB' + (index - 4).toString();
    }
    if (this.props.player.position === 'RB') {
      return 'RB' + (index - 9).toString();
    }
    if (this.props.player.position === 'WR') {
      return 'WR' + (index - 9).toString();
    }
    if (this.props.player.position === 'TE') {
      return 'TE' + (index - 3).toString();
    }
    if (this.props.player.position === 'DEF') {
      return 'DEF' + (index - 1).toString();
    }
    if (this.props.player.position === 'PK') {
      return 'K' + (index - 1).toString();
    }
  }
  
  render() {

    return (  
      <Draggable draggableId={this.props.player.id} index={this.props.index}>
        {(provided) => (
            <Card onClick={this.onClick.bind(this)} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <Wrapper style={{backgroundColor: this.state.background}}>
                <AAV>
                  { this.state.AAV }
                </AAV>
                <Rank>
                  { this.getRank(this.props.index) }
                </Rank> 
                <Name>
                  { this.props.player.name }
                </Name>         
                <Bye>
                  { this.props.player.bye }
                </Bye>
                <Team>
                  <Img>
                    <img height='29px' width='29px' src={this.props.player.url}></img>
                  </Img>              
                </Team>
              </Wrapper>                
            </Card>
        )}
      </Draggable>   
    )
  }
}

export default Player;
