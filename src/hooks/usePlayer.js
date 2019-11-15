import { useState, useCallback } from "react";

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH } from "../gameHelpers";

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false
    });

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x ), y: (prev.pos.y += y)},
            collided
        }));
    }

    const resetPlayer = useCallback(() => {
        const tetrominoShape = randomTetromino().shape;

        setPlayer({
            // pos: { x: STAGE_WIDTH / 2 - 2, y: 0},
            pos: { x: STAGE_WIDTH / 2 - ~~(tetrominoShape[0].length / 2), y: 0},
            tetromino: tetrominoShape,
            collided: false
        })
    })

    return [player, updatePlayerPos, resetPlayer];
}