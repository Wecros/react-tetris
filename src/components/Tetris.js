import React, { useState } from 'react';

import { createStage, checkCollision } from "../gameHelpers";

// styled components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

// custom hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/UseGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  console.log('re-render');

  const moveLeftOrRight = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  }

  const startGame = () => {
    console.log("test");
    // reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(1);
  }

  const drop = () => {
    // increase level when player has cleared 10 rows
    if (rows > level * 5) {
      setLevel(prev => prev + 1);
      // also increase speed
      setDropTime(800 / level + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false});
    } else {
      // game over
      if (player.pos.y < 1) {
        console.log("GAME OVER!!!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({x : 0, y: 0, collided: true});
    }
  }

  const keyUp = ({ keyCode }) => {
    const ARROW_DOWN = 40;
    if (!gameOver) {
      if (keyCode === ARROW_DOWN) {
        console.log('interval on');
        setDropTime(800 / level + 200);
    }
    }
  };

  const dropPlayer = () => {
    console.log('interval off');
    setDropTime(null);
    drop();
  }

  const move = ({ keyCode }) => {
    const ARROW_DOWN = 40;
    const ARROW_RIGHT = 39;
    const ARROW_UP = 38;
    const ARROW_LEFT = 37;

    if (!gameOver) {
      if (keyCode === ARROW_LEFT) {
        moveLeftOrRight(-1);
      } else if (keyCode === ARROW_RIGHT) {
        moveLeftOrRight(1);
      } else if (keyCode === ARROW_DOWN) {
        dropPlayer();
      } else if (keyCode === ARROW_UP) {
        playerRotate(stage, 1);
      }
    }
  }

  
  useInterval(() =>  {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper 
      role="button" 
      tabIndex="0" 
      onKeyDown={e => move(e)} 
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;