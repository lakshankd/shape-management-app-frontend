import { Mafs, Coordinates, Point, Polygon, Circle, Text } from "mafs";
import "mafs/core.css";

const parsePoints = (str) =>
  str.split(";").map((pair) => {
    const [x, y] = pair.split(",").map(Number);
    return [x, y];
  });

const ShapesGraph = ({ shapeData }) => {
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
        switch (shape.type) {
          case "CIRCLE": {
            const [x, y] = shape.coordinates.split(",").map(Number);
            return (
              <g key={shape.id}>
                <Circle
                  key={shape.id}
                  center={[x, y]}
                  radius={shape.radius}
                  strokeStyle="dashed"
                />
                <Text
                  x={x}
                  y={y + (shape.radius || 1) + 0.1}
                  size={14}
                  color="green"
                >
                  {shape.name || `Circle ${index + 1}`}
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
                  fillOpacity={0.3}
                  strokeStyle="solid"
                />
                <Text x={centroidX} y={centroidY} size={14} color="red">
                  {shape.name || `${shape.type} ${index + 1}`}
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

export default ShapesGraph;
