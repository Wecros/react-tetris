export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => {
  const arr = Array.from(Array(STAGE_HEIGHT), () =>
  new Array(STAGE_WIDTH).fill([0, 'clear']));
  return arr;
}

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {

      // 1. check that we're on an actual Tetromino cell
      if (player.tetromino[y][x] !== 0) {
        // 2. Check that our move is inside the game areas height (y)
        // we shouldn't go through the bottom of the player area
        if (!stage[y + player.pos.y + moveY] ||
          // 3. Check that our move is inside the game areas width (x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 4. Check that the cell we're moving to isn't set to clear
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear') {
            return true;
        }
      }
    }
  }
};