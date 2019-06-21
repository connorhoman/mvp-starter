import React from 'react';
import Player from './Player.jsx';

const PlayerList = (props) => (
  <div>
    <h4> List Component </h4>
    There are { props.players.length } items.
    { props.players.map(player => <Player player={player}/>)}
  </div>
)

export default PlayerList;