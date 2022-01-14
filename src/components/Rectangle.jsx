import { useEffect, useRef } from "react";
import { Transformer } from "react-konva";
import RectangleLayer from "./Layers/Rectangle/RectangleLayer";
import StarLayer from "./Layers/StarLayer/StarLayer";

const Rectangle = ({
  shapeName,
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      {shapeName === "rectangle" && (
        <RectangleLayer
          onSelect={onSelect}
          shapeRef={shapeRef}
          onChange={onChange}
          shapeProps={shapeProps}
        />
      )}
      {shapeName === "star" && (
        <StarLayer
          onSelect={onSelect}
          shapeRef={shapeRef}
          onChange={onChange}
          shapeProps={shapeProps}
        />
      )}
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default Rectangle;
