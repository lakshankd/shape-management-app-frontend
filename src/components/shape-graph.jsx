import { Mafs, Coordinates, Point, Polygon, Circle } from "mafs";
import "mafs/core.css";

const sampleShapes = [
  {
    id: 1,
    name: "Polygon",
    type: "POLYGON",
    coordinates: "1,1;2,3;3,2;4,1",
    radius: null,
  },
  {
    id: 2,
    name: "CircleA",
    type: "CIRCLE",
    coordinates: "0,0",
    radius: 1.5,
  },
  {
    id: 3,
    name: "CircleB",
    type: "CIRCLE",
    coordinates: "2,0",
    radius: 1.5,
  },
  {
    id: 4,
    name: "RectangleA",
    type: "RECTANGLE",
    coordinates: "-2,-1;2,-1;2,1;-2,1",
    radius: null,
  },
  {
    id: 5,
    name: "PolygonC",
    type: "POLYGON",
    coordinates: "-3,-3;-1,-3;-1,-1;-3,-1",
    radius: null,
  },
];

const parsePoints = (str) =>
  str.split(";").map((pair) => {
    const [x, y] = pair.split(",").map(Number);
    return [x, y];
  });

const ShapesGraph = ({ shapeData = sampleShapes }) => {
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
              <Circle
                key={shape.id}
                center={[x, y]}
                radius={shape.radius}
                strokeStyle="dashed"
                color="blue"
              />
            );
          }
          case "RECTANGLE":
          case "POLYGON": {
            const points = parsePoints(shape.coordinates);
            return <Polygon key={shape.id} points={points} color="green" />;
          }
          default:
            return null;
        }
      })}
    </Mafs>
  );
};

export default ShapesGraph;
