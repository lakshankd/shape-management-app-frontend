import React from "react";
import { Stage, Layer, Line, Circle } from "react-konva";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const CENTER_X = CANVAS_WIDTH / 2;
const CENTER_Y = CANVAS_HEIGHT / 2;

// Utility to convert coordinate string to array
const parseCoordinates = (coordsStr) =>
  coordsStr.split(";").map((pair) => {
    const [x, y] = pair.split(",").map(Number);
    return { x, y };
  });

const ShapeCanvas = ({ shapes }) => {
  return (
    <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
      <Layer>
        {/* X-axis */}
        <Line
          points={[0, CENTER_Y, CANVAS_WIDTH, CENTER_Y]}
          stroke="black"
          strokeWidth={1}
        />
        {/* Y-axis */}
        <Line
          points={[CENTER_X, 0, CENTER_X, CANVAS_HEIGHT]}
          stroke="black"
          strokeWidth={1}
        />

        {/* Render each shape */}
        {shapes.map((shape) => {
          if (shape.type === "CIRCLE") {
            const [x, y] = shape.coordinates.split(",").map(Number);
            return (
              <Circle
                key={shape.id}
                x={CENTER_X + x}
                y={CENTER_Y - y}
                radius={shape.radius}
                stroke="red"
                strokeWidth={2}
              />
            );
          }

          if (shape.type === "RECTANGLE" || shape.type === "POLYGON") {
            const points = parseCoordinates(shape.coordinates).flatMap((pt) => [
              CENTER_X + pt.x,
              CENTER_Y - pt.y,
            ]);
            return (
              <Line
                key={shape.id}
                points={points}
                stroke={shape.type === "RECTANGLE" ? "green" : "blue"}
                strokeWidth={2}
                closed
              />
            );
          }

          return null;
        })}
      </Layer>
    </Stage>
  );
};

export default ShapeCanvas;
