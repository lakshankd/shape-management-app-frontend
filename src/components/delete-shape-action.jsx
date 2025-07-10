import { deleteShapeById } from "@/service/shape-service";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const DeleteShapeAction = ({ shape, onDeleteSuccess, open, setOpen }) => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      setError(null);
      await deleteShapeById(shape.id);
      onDeleteSuccess?.();
      setOpen(false);
    } catch (err) {
      setError(err?.response?.data?.message || "Try again later");
      console.error("Failed to delete shape", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Shape</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{shape.name}</strong>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {deleting ? "Deleting..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteShapeAction;
