import React, { useState, useRef } from "react";

import "./GameArea.css";

const GameArea = ({
  verifyLetter,
  letters,
  chooseCategory,
  chooseWord,
  guessedLetters,
  wrongLetters,
  attempts,
  score,
  playAgain,
}) => {
  const [inputLetter, setInputLetter] = useState('');
  const inputLetterRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(inputLetter);
    inputLetterRef.current.focus();
    setInputLetter('');
  };

  return (
    <div className="game_area">
      <div className="game_area_right">
        <div className="game_area_text">
          <h1>Game Secret Word - Spider Man</h1>
          <h2>O objetivo do jogo é acertar a palavra!</h2>
          <h2>
            A dica é: <span className="game_area_hint">{chooseCategory}</span>
          </h2>
          <h4>Pontos: {score}</h4>
          <h4>Tentativas restantes: {attempts}</h4>
        </div>
        <div className="letter_board">
          {letters.map((letter, index) =>
            guessedLetters.includes(letter) ? (
              <span key={index} className="letter">{letter}</span>
            ) : (
              <span key={index} className="blank_square"></span>
            )
          )}
        </div>
        <form className="form_game_area" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            value={inputLetter}
            onChange={(e) => setInputLetter(e.target.value)}
            ref={inputLetterRef}
          />
          <button onClick={verifyLetter} className="game_area_btn">
            Enviar a letra
          </button>
        </form>
        <div className="letters_played">
          <img
            src="https://cdn-0.imagensemoldes.com.br/wp-content/uploads/2020/04/Personagem-Homem-Aranha-PNG-1024x742.png"
            width="50"
            alt=""
          />
          <h3>Letras Erradas:</h3>
          {wrongLetters.map((letter, index) => {
            return (
            <h4 key={index} className="wrong_letter">
              {letter}, 
            </h4>)
          })}
          <button onClick={playAgain} className="game_reset">Zerar Jogo</button>
        </div>
      </div>
    </div>
  );
};

export default GameArea;
