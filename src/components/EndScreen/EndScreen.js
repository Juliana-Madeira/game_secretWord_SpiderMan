import React from 'react';

import './EndScreen.css';

const EndScreen = ({ playAgain, score }) => {
  return (
    <div className='end_screen'>
        <div className='end_screen_text'>
          <h1>Game Over!</h1>
          <h3>Total de Pontos: <span>{score}</span></h3>
          <button onClick={playAgain} className='end_game_btn'>Jogar Novamente</button>
        </div>
    </div>
  )
}

export default EndScreen