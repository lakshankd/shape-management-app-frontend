import AddShapeDialog from "@/components/add-shape-dialog";
import { shapeTableColumns } from "@/components/columns";
import DataTable from "@/components/data-table";

import { getAllShape } from "@/service/shape-service";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
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
  return (
    <>
      <div className="w-full flex justify-end">
        <AddShapeDialog />
      </div>
      <div className="w-full flex">
        <DataTable
          columns={shapeTableColumns(fetchShapes, fetchShapes)}
          data={shapes}
          loading={loading}
        />
      </div>
    </>
  );
};

export default DashboardPage;
