import { useState } from "react";
import { Stage, Layer } from "react-konva";
import { TwitterPicker, CirclePicker } from "react-color";
import Button from "react-bootstrap/Button";

import Rectangle from "./Rectangle";

import "./creativity.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { generateOneRectangle, checkDeselect } from "./_helperFunctions";

const MainStage = () => {
  const [rectangles, setRectangles] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [fillColor, setFillColor] = useState("");
  const [strokeColor, setStrokeColor] = useState("black");

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleClick = (shape, fillColor, strokeColor) => {
    let newRectangle = generateOneRectangle(shape, fillColor, strokeColor);
    console.log("newRectange ====> ", newRectangle);
    setRectangles([...rectangles, newRectangle]);
  };

  return (
    <div className="creativity">
      <div className="sidebar">
        <h5>Select Shape Fill Color</h5>
        <CirclePicker
          color={fillColor}
          onChange={(fillColor) => setFillColor(fillColor.hex)}
        />
        <h5>Select Stroke Color</h5>
        <CirclePicker
          color={strokeColor}
          onChange={(strokeColor) => setStrokeColor(strokeColor.hex)}
        />
        <h3>Select a Shape</h3>
        <Button
          variant="outline-secondary"
          onClick={() => handleClick("rectangle", fillColor, strokeColor)}
        >
          Rectangle
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => handleClick("star", fillColor, strokeColor)}
        >
          Star
        </Button>
      </div>
      <div className="stage">
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          // className="stage"
        >
          <Layer>
            {rectangles.map((rect, i) => {
              return (
                <Rectangle
                  shapeName={rect.shape}
                  key={i}
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    selectShape(rect.id);
                  }}
                  onChange={(newAttrs) => {
                    const rects = rectangles.slice();
                    rects[i] = newAttrs;
                    setRectangles(rects);
                  }}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default MainStage;

// import { useState, useEffect, useRef } from "react";
// import { Stage, Layer, Rect, Transformer } from "react-konva";
// import RectangleLayer from "./Layers/Rectangle/RectangleLayer";
// import CircleLayer from "./Layers/CircleLayer/CircleLayer";

// const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
//   const shapeRef = useRef();
//   const trRef = useRef();
//   console.log("reached Rectangle");
//   useEffect(() => {
//     if (isSelected) {
//       // we need to attach transformer manually
//       trRef.current.nodes([shapeRef.current]);
//       trRef.current.getLayer().batchDraw();
//     }
//   }, [isSelected]);

//   return (
//     <>
//       <Rect
//         onClick={onSelect}
//         onTap={onSelect}
//         ref={shapeRef}
//         {...shapeProps}
//         draggable
//         onDragEnd={(e) => {
//           onChange({
//             ...shapeProps,
//             x: e.target.x(),
//             y: e.target.y(),
//           });
//         }}
//         onTransformEnd={(e) => {
//           // transformer is changing scale of the node
//           // and NOT its width or height
//           // but in the store we have only width and height
//           // to match the data better we will reset scale on transform end
//           const node = shapeRef.current;
//           const scaleX = node.scaleX();
//           const scaleY = node.scaleY();

//           // we will reset it back
//           node.scaleX(1);
//           node.scaleY(1);
//           onChange({
//             ...shapeProps,
//             x: node.x(),
//             y: node.y(),
//             // set minimal value
//             width: Math.max(5, node.width() * scaleX),
//             height: Math.max(node.height() * scaleY),
//           });
//         }}
//       />
//       {isSelected && (
//         <Transformer
//           ref={trRef}
//           boundBoxFunc={(oldBox, newBox) => {
//             // limit resize
//             if (newBox.width < 5 || newBox.height < 5) {
//               return oldBox;
//             }
//             return newBox;
//           }}
//         />
//       )}
//     </>
//   );
// };

// const generateOneRectangle = () => {
//   return {
//     x: 150,
//     y: 150,
//     width: 100,
//     height: 100,
//     stroke: "red",
//     fill: "black",
//     // shape: shape,
//     id: "rect3",
//   };
// };

// const MainStage = () => {
//   const [rectangles, setRectangles] = useState([]);
//   const [selectedId, selectShape] = useState(null);

//   const checkDeselect = (e) => {
//     // deselect when clicked on empty area
//     const clickedOnEmpty = e.target === e.target.getStage();
//     if (clickedOnEmpty) {
//       selectShape(null);
//     }
//   };

//   const handleClick = () => {
//     let newRectangle = generateOneRectangle();
//     setRectangles([...rectangles, newRectangle]);
//   };

//   return (
//     <>
//       <h1>Hello from Image</h1>
//       <button onClick={() => handleClick()}>Rectangle</button>
//       <button>Circle</button>
//       <Stage
//         width={window.innerWidth}
//         height={window.innerHeight}
//         onMouseDown={checkDeselect}
//         onTouchStart={checkDeselect}
//       >
//         <Layer>
//           <CircleLayer />
//           {rectangles.map((rect, i) => {
//             <Rectangle
//               key={i}
//               shapeProps={rect}
//               isSelected={rect.id === selectedId}
//               onSelect={() => {
//                 selectShape(rect.id);
//               }}
//               onChange={(newAttrs) => {
//                 const rects = rectangles.slice();
//                 rects[i] = newAttrs;
//                 setRectangles(rects);
//               }}
//             />;
//           })}
//         </Layer>
//       </Stage>
//     </>
//   );
// };

// export default MainStage;
