import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Input } from "./ui/input";
import { AlertCircleIcon, Loader2, Plus } from "lucide-react";
import { shapeSchema } from "@/utils/shape-form-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { createShape } from "@/service/shape-service";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { SHAPE_OPTIONS } from "@/constants/constants";

const AddShapeDialog = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(shapeSchema),
    defaultValues: {
      name: "",
      type: "CIRCLE",
      coordinates: "",
      radius: undefined,
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const shapeType = form.watch("type");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      await createShape(data);
      form.reset();
      onSuccess?.();
      setOpen(false);
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to create shape");
      console.error("Error while creating shape: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) {
          form.reset();
          setError(null);
        }
      }}
    >
      <Form {...form}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Plus /> New Shape
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Create New Shape</DialogTitle>
              <DialogDescription>
                Provide shape details to create a new record.
              </DialogDescription>
            </DialogHeader>

            {error && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Unable to create your shape.</AlertTitle>
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
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
};

export default AddShapeDialog;
