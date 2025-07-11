import ShapesGraph from "@/components/shape-graph";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAllShape } from "@/service/shape-service";
import { AlertCircleIcon, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [shapes, setShapes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchShapes = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllShape();
      setShapes(res);
    } catch (err) {
      setError(
        error?.response?.data?.message ||
          "Failed to get shapes data! Try again later."
      );
      console.error("Failed to fetch shapes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShapes();
  }, []);

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
    <>
      <ShapesGraph shapeData={shapes} />
    </>
  );
};

export default HomePage;
