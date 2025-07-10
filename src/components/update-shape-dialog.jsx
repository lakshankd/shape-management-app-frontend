import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import { shapeSchema } from "@/utils/shape-form-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { SHAPE_OPTIONS } from "@/constants/constants";
import { updateShapeById } from "@/service/shape-service";

const UpdateShapeDialog = ({ shape, open, setOpen, onUpdateSuccess }) => {
  const form = useForm({
    resolver: zodResolver(shapeSchema),
    defaultValues: {
      name: shape.name,
      type: shape.type,
      coordinates: shape.coordinates,
      radius: shape?.radius == null ? undefined : shape.radius,
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const shapeType = form.watch("type");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      await updateShapeById(shape.id, data);
      setOpen(false);
      onUpdateSuccess?.();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update shape");
      console.error("Update shape error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shape) {
      form.reset({
        name: shape.name,
        type: shape.type,
        coordinates: shape.coordinates,
        radius: shape?.radius == null ? undefined : shape.radius,
      });
      setError(null);
    }
  }, [shape]);

  useEffect(() => {
    if (!open) {
      form.reset();
      setError(null);
      setLoading(false);
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Shape</DialogTitle>
          <DialogDescription>Modify shape details.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Unable to update shape.</AlertTitle>
                <AlertDescription>
                  <p>{error}</p>
                </AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shape Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Circle A" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the label for your shape.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shape Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="w-full"
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select shape type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SHAPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the geometric type of the shape.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coordinates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coordinates</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 10,20;30,40" {...field} />
                  </FormControl>
                  <FormDescription>
                    Use semicolon-separated coordinates (x,y).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {shapeType === "CIRCLE" && (
              <FormField
                control={form.control}
                name="radius"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Radius</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="e.g. 25.5"
                        {...field}
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? ""
                              : parseFloat(e.target.value);
                          field.onChange(isNaN(value) ? "" : value);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the radius of the circle in units.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Shape
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateShapeDialog;
