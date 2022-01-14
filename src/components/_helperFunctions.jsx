const randomNum = () => {
  let num = Math.floor(Math.random() * 10000 + 1);
  console.log(num.toString());
  return num.toString();
};

export const generateOneRectangle = (shape, fillColor, strokeColor) => {
  return {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    stroke: strokeColor,
    fill: fillColor,
    id: randomNum(),
    shape: shape,
  };
};
