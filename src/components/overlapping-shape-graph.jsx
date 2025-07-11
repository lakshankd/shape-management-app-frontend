import { Circle, Coordinates, Mafs, Polygon, Text } from "mafs";
import React from "react";

const parsePoints = (str) =>
  str.split(";").map((pair) => {
    const [x, y] = pair.split(",").map(Number);
    return [x, y];
  });

const OverlappingShapeGraph = ({ shapeData, overlapData }) => {
  const overlappingShapeIds = overlapData?.overlappingShapeIds || [];

  return (
    <Mafs
      viewBox={{ x: [-10, 10], y: [-10, 10], padding: 10 }}
      zoom
      pan
      preserveAspectRatio={false}
      height={800}
    >
      <Coordinates.Cartesian />
      {shapeData.map((shape) => {
        const isOverlapping = overlappingShapeIds.includes(shape.id);

        switch (shape.type) {
          case "CIRCLE": {
            const [x, y] = shape.coordinates.split(",").map(Number);
            return (
              <g key={shape.id}>
                <Circle
                  center={[x, y]}
                  radius={shape.radius}
                  strokeStyle="dashed"
                  color={isOverlapping ? "red" : "blue"}
                  fillOpacity={isOverlapping ? 0.2 : 0.1}
                  fill={isOverlapping ? "red" : "blue"}
                />
                <Text
                  x={x}
                  y={y + (shape.radius || 1) + 0.1}
                  size={14}
                  color={isOverlapping ? "red" : "green"}
                >
                  {shape.name}
                </Text>
              </g>
            );
          }
          case "RECTANGLE":
          case "POLYGON": {
            const points = parsePoints(shape.coordinates);

            const centroidX =
              points.reduce((sum, [x]) => sum + x, 0) / points.length;
            const centroidY =
              points.reduce((sum, [, y]) => sum + y, 0) / points.length;
            return (
              <g key={shape.id}>
                <Polygon
                  points={points}
                  fillOpacity={isOverlapping ? 0.3 : 0.1}
                  strokeStyle="solid"
                  color={isOverlapping ? "red" : "blue"}
                  fill={isOverlapping ? "red" : "blue"}
                />
                <Text
                  x={centroidX}
                  y={centroidY}
                  size={14}
                  color={isOverlapping ? "red" : "green"}
                >
                  {shape.name}
                </Text>
              </g>
            );
          }
          default:
            return null;
        }
      })}
    </Mafs>
  );
};

export default OverlappingShapeGraph;
