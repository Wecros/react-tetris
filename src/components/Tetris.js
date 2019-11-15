import React, { useState } from 'react';

import { createStage } from "../gameHelpers";

// styled components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

// custom hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log('re-render');

  const movePlayer = dir => {
    updatePlayerPos({ x: dir, y: 0 });
  }

  const startGame = () => {
    console.log("test");
    // reset everything
    setStage(createStage());
    resetPlayer();
  }

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false});
  }

  const dropPlayer = () => {
    drop();
  }

  const move = ({ keyCode }) => {
    const ARROW_DOWN = 40;
    const ARROW_RIGHT = 39;
    const ARROW_UP = 38;
    const ARROW_LEFT = 37;

    if (!gameOver) {
      if (keyCode === ARROW_LEFT) {
        movePlayer(-1);
      } else if (keyCode === ARROW_RIGHT) {
        movePlayer(1);
      } else if (keyCode === ARROW_DOWN) {
        dropPlayer();
      }
    }
  }

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;