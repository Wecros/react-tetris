import React, { useState } from 'react';

import { createStage, checkCollision } from "../gameHelpers";

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

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

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
    resetPlayer();
    setGameOver(false);
  }

  const drop = () => {
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