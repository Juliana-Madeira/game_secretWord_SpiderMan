import React from 'react';

import './StartScreen.css';

const StartScreen = ({ startGame }) => {
  return (
    <div className='start_screen'>
        <div className='start_screen_itens'>
            <h1>Secret Word</h1>
            <button onClick={startGame} className='start_game_btn'>JOGAR</button>
        </div>
    </div>
  )
}

export default StartScreen;