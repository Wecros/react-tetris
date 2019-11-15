export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => {

  const arr = Array.from(Array(STAGE_HEIGHT), () =>
  new Array(STAGE_WIDTH).fill([0, 'clear']));

  console.log(arr);
  console.log("rows: " + arr.length);
  console.log("cols: " + arr[0].length);
  console.log(arr[0]);

  return arr;
}