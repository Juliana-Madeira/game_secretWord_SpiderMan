//Código feito para estudos com comentários pessoais e explicativos para maior compreensão do mesmo

import React, { useState, useEffect, useCallback } from "react";

import StartScreen from "./components/StartScreen/StartScreen";
import GameArea from "./components/GameArea/GameArea";
import EndScreen from "./components/EndScreen/EndScreen";

//import data
import { wordsList } from "./data/words";

import "./App.css";

const stagesOfGame = [
  { id: 1, name: "start" },
  { id: 2, name: "onGame" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stagesOfGame[0].name); //state inicial no stagesOfGame é no start
  const [words] = useState(wordsList);
  const [chooseCategory, setChooseCategory] = useState(""); //quando clicar no botao start game, vai acionar tambem as funçoes de escolher a categoria do jogo e a palavra correspondente
  const [chooseWord, setChooseWord] = useState("");
  const [letters, setLetters] = useState([]); //um array de letras forma uma palavra
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [attempts, setAttempts] = useState(5);
  const [score, setScore] = useState(0);

  const chooseCategoryAndWord = useCallback(() => {
    //choose category
    const categories = Object.keys(words); //as chaves sao as propriedades do objeto que sao as categorias e o objeto é words que é meu wordsList
    const oneCategory =
      categories[Math.floor(Math.random() * Object.keys(categories).length)]; //pego o indice aleatorio que sao as minhas chaves que estao as minhas categorias

    //choose word
    const word =
      words[oneCategory][Math.floor(Math.random() * words[oneCategory].length)];

    return { word, oneCategory };
  }, [words]);

  //start the game, vai setar pra tela do game, que é stage[1] e o nome é o que direciona para 'onGame'
  const startGame = useCallback(() => {
    console.log('start game')
    setGuessedLetters([]);
    setWrongLetters([]);
    const { word, oneCategory } = chooseCategoryAndWord(); //extraimos uma word e uma oneCategory, da função choose acima

    let wordLetters = word.split(""); //to pegando uma palavra, string e criando um array com as letras contidas nela com split
    wordLetters = wordLetters.map(
      (letter) => letter.toLowerCase() //pra vir tudo caixa baixa
    );

    setChooseCategory(oneCategory);
    setChooseWord(word);
    setLetters(wordLetters);
    setGameStage(stagesOfGame[1].name);
  }, [chooseCategoryAndWord]);

  //process the letter input, vai verificando a letra para saber se player continua a jogar ou deu game over
  const verifyLetter = (inputLetter) => {
    console.log('verify letter')
    const allLettersLowercase = inputLetter.toLowerCase();
    if (
      guessedLetters.includes(allLettersLowercase) ||
      wrongLetters.includes(allLettersLowercase)
    ) {
      return;
    }
    //push guessed letter or remove a attempt
    if (letters.includes(allLettersLowercase)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        allLettersLowercase,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        allLettersLowercase,
      ]);
      setAttempts((actualAttempts) => actualAttempts - 1); //diminuir tentativas
    }
  };

  useEffect(()=> {
    setGameStage(stagesOfGame[0].name);
    setChooseCategory();
    setChooseWord();
    setGuessedLetters([]);
    setWrongLetters([]);
    setAttempts(5);
    setScore(0);
  }, [])

  useEffect(() => {
    if (attempts === 0) {
      setGuessedLetters([]);
      setWrongLetters([]);
      setGameStage(stagesOfGame[2].name);
    }
  }, [attempts]);

  useEffect(() => {
    const uniqueWordLetters = [...new Set(letters)]
    if(guessedLetters.length === uniqueWordLetters.length){
      setScore((actualScore) => actualScore += 100);
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  const playAgain = () => {
    setAttempts(5);
    setScore(0);
    setGuessedLetters([]);
    setWrongLetters([]);
    setGameStage(stagesOfGame[0].name); //vai pra tela de game novamente e também reseta alguns estados do jogo
  };

  

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "onGame" && (
        <GameArea
          verifyLetter={verifyLetter}
          letters={letters}
          chooseCategory={chooseCategory}
          chooseWord={chooseWord}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          attempts={attempts}
          score={score}
          playAgain={playAgain}
        />
      )}
      {gameStage === "end" && <EndScreen playAgain={playAgain} score={score} />}
    </div>
  );
}

export default App;
