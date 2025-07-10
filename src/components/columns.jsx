import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import DeleteShapeAction from "./delete-shape-action";
import { useState } from "react";
import UpdateShapeDialog from "./update-shape-dialog";

export const shapeTableColumns = (onDeleteSuccess, onUpdateSuccess) => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "coordinates",
    header: "Coordinates",
    cell: ({ row }) => {
      const coords = row.getValue("coordinates");
      if (!coords) return null;

      const coordArray = coords
        .split(";")
        .map((pair) => pair.trim())
        .filter(Boolean);

      return (
        <div className="flex flex-wrap gap-1">
          {coordArray.map((coord, idx) => (
            <Badge key={idx} variant="secondary">
              {coord}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "radius",
    header: "Radius",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const shape = row.original;
      const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
      const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUpdateDialogOpen(true)}>
                Update
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteShapeAction
            shape={shape}
            open={deleteDialogOpen}
            setOpen={setDeleteDialogOpen}
            onDeleteSuccess={onDeleteSuccess}
          />

          <UpdateShapeDialog
            shape={shape}
            open={updateDialogOpen}
            setOpen={setUpdateDialogOpen}
            onUpdateSuccess={onUpdateSuccess}
          />
        </>
      );
    },
  },
];
