import { useState, useRef } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import { TwitterPicker, CirclePicker } from "react-color";
import Button from "react-bootstrap/Button";
import { Rect } from "react-konva";

// import PieChart from "./Chart/PieChart";

import Rectangle from "./Rectangle";

import "./creativity.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { generateOneRectangle, checkDeselect } from "./_helperFunctions";
import PieChart from "./Chart/PieChart";

const MainStage = () => {
  const [rectangles, setRectangles] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [fillColor, setFillColor] = useState("");
  const [strokeColor, setStrokeColor] = useState("black");
  const [url, setURL] = useState("");

  // PEN TOOLS
  const [tool, setTool] = useState("select");
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleClick = (shape, fillColor, strokeColor) => {
    let newRectangle = generateOneRectangle(shape, fillColor, strokeColor, url);
    console.log("newRectange ====> ", newRectangle);
    setRectangles([...rectangles, newRectangle]);
  };

  // ****************** PEN TOOLS FUNCTIONS ****************
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([
      ...lines,
      { tool, points: [pos.x, pos.y], strokeColor: strokeColor },
    ]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  //*** IMAGES */
  const resetUrl = () => {
    handleClick("", "", "", url);
    setURL("");
  };

<<<<<<< HEAD
  //***STAGE GRID ****//
  const WIDTH = 40;
  const HEIGHT = 40;
  
  const grid = [["white", "white"], ["white", "white"]];
  
    const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
    const startX = Math.floor((-stagePos.x - window.innerWidth) / WIDTH) * WIDTH;
    const endX =
      Math.floor((-stagePos.x + window.innerWidth * 2) / WIDTH) * WIDTH;
  
    const startY =
      Math.floor((-stagePos.y - window.innerHeight) / HEIGHT) * HEIGHT;
    const endY =
      Math.floor((-stagePos.y + window.innerHeight * 2) / HEIGHT) * HEIGHT;
  
    const gridComponents = [];
    var i = 0;
    for (var x = startX; x < endX; x += WIDTH) {
      for (var y = startY; y < endY; y += HEIGHT) {
        if (i === 4) {
          i = 0;
        }
  
        const indexX = Math.abs(x / WIDTH) % grid.length;
        const indexY = Math.abs(y / HEIGHT) % grid[0].length;
  
        gridComponents.push(
          <Rect
            x={x}
            y={y}
            width={WIDTH}
            height={HEIGHT}
            fill={grid[indexX][indexY]}
            stroke="black"
            strokeWidth={0.3}
          />
        );
      }
    }
=======
  const resetBoard = () => {
    setRectangles([]);
    setLines([]);
    setTool("select");
  };

>>>>>>> ffef12b4d27be1870989189b188e4042d6fc9846
  // ******** RETURN ********************
  return (
    // ******** SIDE BARRRRRR ********************
    <div className="creativity">
      <div className="sidebar">
        <PieChart />
        <div className="select-a-color">
          <h5>Select Shape Fill Color</h5>
          <CirclePicker
            color={fillColor}
            onChange={(fillColor) => setFillColor(fillColor.hex)}
          />
          <h5>Select Shape Border & Pen Color </h5>
          <CirclePicker
            color={strokeColor}
            onChange={(strokeColor) => setStrokeColor(strokeColor.hex)}
          />
        </div>
        <div className="shapes">
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
        <div className="add-url">
          <form
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              name="url"
              type="text"
              placeholder="Enter URL of Image"
              value={url}
              onChange={(e) => setURL(e.target.value)}
            />
          </form>
          <Button variant="outline-secondary" onClick={() => resetUrl()}>
            Add!!
          </Button>
        </div>
        <div className="texttools">
          <h3>Text Editor</h3>
          <Button
            variant="outline-secondary"
            onClick={() => handleClick("text", fillColor, strokeColor)}
          >
            Add text
          </Button>
        </div>
        {/* *****PEN TOOLS DROP DOWN***** */}
        <h5>Select Tool to Draw or Erase</h5>
        <select
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        >
          <option value="select">Select</option>
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select>
      </div>
      {/* // ******** STAGE ******************** */}
      <div className="stage">
        <Stage
          x={stagePos.x}
          y={stagePos.y}
          width={1200 || window.innerWidth}
          height={800 || window.innerHeight}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          // className="stage"
          onMouseDown={tool !== "select" ? handleMouseDown : checkDeselect}
          onMousemove={tool !== "select" ? handleMouseMove : ""}
          onMouseup={tool !== "select" ? handleMouseUp : ""}
          draggable={tool === "select"}
          onDragEnd={e => {
            setStagePos(e.currentTarget.position());
          }}
        >
          <Layer>{gridComponents}</Layer>
          <Layer>
            {rectangles.map((rect, i) => {
              return (
                <Rectangle
                  shapeName={rect.shape}
                  url={rect.url}
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
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.strokeColor}
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))}
          </Layer>
        </Stage>
      </div>
      <div>
        HELLO THERE: CHAT BOX HERE? SAVE BUTTON HERE?
        <Button variant="primary">Save</Button>
        <Button variant="danger" onClick={resetBoard}>
          Reset Board
        </Button>
      </div>
    </div>
  );
};

export default MainStage;
