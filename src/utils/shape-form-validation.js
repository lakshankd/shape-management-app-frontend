import * as z from "zod";

export const shapeSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    type: z.enum(["CIRCLE", "RECTANGLE", "TRIANGLE", "POLYGON"]),
    coordinates: z.string().optional(),
    radius: z.union([
      z.number().positive("Radius must be positive"),
      z.undefined(),
    ]),
  })
  .superRefine((data, ctx) => {
    const { type, coordinates, radius } = data;

    // Validate coordinates
    if (!coordinates || coordinates.trim() === "") {
      ctx.addIssue({
        path: ["coordinates"],
        code: z.ZodIssueCode.custom,
        message: "Coordinates are required",
      });
    }

    if (type === "CIRCLE") {
      if (radius === undefined || isNaN(radius)) {
        ctx.addIssue({
          path: ["radius"],
          code: z.ZodIssueCode.custom,
          message: "Radius is required for circles",
        });
      }

      const points = coordinates?.split(";").filter(Boolean);
      if (!points || points.length !== 1) {
        ctx.addIssue({
          path: ["coordinates"],
          code: z.ZodIssueCode.custom,
          message: "Circle should have only one center coordinate",
        });
      }
    } else {
      if (radius !== undefined) {
        ctx.addIssue({
          path: ["radius"],
          code: z.ZodIssueCode.custom,
          message: "Only circles can have a radius",
        });
      }

      const pointCount = coordinates?.split(";").filter(Boolean).length || 0;
      const minPoints = type === "RECTANGLE" ? 2 : 3;
      if (pointCount < minPoints) {
        ctx.addIssue({
          path: ["coordinates"],
          code: z.ZodIssueCode.custom,
          message: `${type} requires at least ${minPoints} points`,
        });
      }
    }
  });
