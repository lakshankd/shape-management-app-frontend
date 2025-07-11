import OverlappingShapeGraph from "@/components/overlapping-shape-graph";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAllShape, getOverlapShapes } from "@/service/shape-service";
import { AlertCircleIcon, Loader2Icon } from "lucide-react";
import React, { useState, useEffect } from "react";

const OverlapsPage = () => {
  const [shapes, setShapes] = useState([]);
  const [overlapData, setOverlapData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchShapesAndOverlapData = async () => {
    try {
      setLoading(true);
      setError(null);
      const shapesResponse = await getAllShape();
      const overlapsResponse = await getOverlapShapes();
      setShapes(shapesResponse);
      setOverlapData(overlapsResponse);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to get shapes data! Try again later."
      );
      console.error("Failed to fetch shapes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShapesAndOverlapData();
  }, []);

  const getShapeNameById = (id) => {
    const shape = shapes.find((s) => s.id === id);
    return shape ? shape.name : `Shape ${id}`;
  };

  const generateOverlapDescriptions = () => {
    if (
      !overlapData?.overlappingGroups ||
      overlapData.overlappingGroups.length === 0
    ) {
      return [];
    }

    return overlapData.overlappingGroups.map((group, index) => {
      const shapeNames = group.map((id) => getShapeNameById(id));
      return `${shapeNames.join(" and ")} overlap`;
    });
  };

  const overlapDescriptions = generateOverlapDescriptions();

  if (loading) {
    return (
      <div className="w-full h-full gap-2 flex flex-col items-center justify-center">
        <Loader2Icon className="animate-spin" />
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full gap-2 flex flex-col items-center justify-center">
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Unexpected error occurred</AlertTitle>
          <AlertDescription>
            <p>{error}</p>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="pb-3">
        <h3 className="scroll-m-20 text-lg font-semibold tracking-tight  pb-1 mb-2">
          Overlap Information
        </h3>

        {overlapData?.overlappingShapeIds?.length > 0 ? (
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-semibold tracking-tight mb-1">
                Overlapping Shapes:
              </h4>
              <p className="text-sm text-red-600">
                {overlapData.overlappingShapeIds
                  .map((id) => getShapeNameById(id))
                  .join(", ")}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold tracking-tight mb-1">
                Overlap Details:
              </h4>
              <ul className="ml-4 list-disc text-sm [&>li]:mt-1">
                {overlapDescriptions.map((description, index) => (
                  <li key={index} className="text-red-600">
                    {description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-sm text-green-600">
            No overlapping shapes detected.
          </p>
        )}
      </div>

      {/* Shape Graph */}
      <OverlappingShapeGraph shapeData={shapes} overlapData={overlapData} />
    </div>
  );
};

export default OverlapsPage;
