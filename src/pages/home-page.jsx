import ShapesGraph from "@/components/shape-graph";
import { useEffect, useState } from "react";

const shapeData = [
  {
    id: 1,
    name: "Polygon",
    type: "POLYGON",
    coordinates: "20,30;50,90;80,70;100,40",
    radius: null,
  },
  {
    id: 2,
    name: "CircleA",
    type: "CIRCLE",
    coordinates: "50,50",
    radius: 1000.0,
  },
  {
    id: 3,
    name: "CircleB",
    type: "CIRCLE",
    coordinates: "65,50",
    radius: 300.0,
  },
  {
    id: 4,
    name: "RectangleA",
    type: "RECTANGLE",
    coordinates: "40,40;100,40;100,100;40,100",
    radius: null,
  },
  {
    id: 5,
    name: "PolygonC",
    type: "POLYGON",
    coordinates: "50,50;90,50;90,90;50,90",
    radius: null,
  },
];

const HomePage = () => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    setShapes(shapeData);
  }, []);

  return (
    <>
      <ShapesGraph />
    </>
  );
};

export default HomePage;
