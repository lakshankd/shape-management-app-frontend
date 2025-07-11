
# Shape Management System Frontend (React + Vite + Tailwind)

This is the React-based frontend for the Shape Management Application. It allows users to create, view, edit, delete, and visualize geometric shapes, and highlights overlapping shapes on a responsive canvas.

## Features

- User-friendly shape form with validation
- Canvas view for rendering shapes (circle, triangle, rectangle, polygon) with zoom
- Visual highlighting for overlapping shapes (red border) and detail overlook
- Authenticated API calls with Bearer Token
- Responsive UI
## Installation
Follow these steps to set up and run the frontend application:

#### 1. Install dependencies
```bash
  npm install 
```
#### 2. Create `.env` file
* Copy the `.env.example` file and rename it to `.env`.
* Update the environment variables as needed (e.g., backend API URL).

#### 3. Start the development server
```bash
  npm run dev
```

Frontend runs at: http://localhost:5173
## Navigation

- `/` &rarr; Shapes Canva
- `/overlaps` &rarr; Shape Canva with overlapping shapes
- `/login` &rarr; Login Page
- `/register` &rarr; Register Page
- `/dashboard` &rarr; Dashboard for shape management (Authentication Required)

## Shape Creation Guide
The "Create New Shape" form allows users (authenticated) to input shape data accurately. Below is a screenshot and guide for using the form:

<img width="1920" height="974" alt="Screenshot 2025-07-11 at 20 52 30" src="https://github.com/user-attachments/assets/77fd2846-324d-4c20-9098-4ce4fe359c62" />

#### Shape Name
- Must be unique.
- Acts as the label for the shape (e.g., Circle A, Polygon 1).

#### Shape Type
- Select one of the following from the dropdown:
    * Circle
    * Rectangle
    * Polygon
    * Triangle

#### Coordinates
- Coordinates must be in semicolon-separated (x,y) pairs.
- Format: x1,y1;x2,y2;x3,y3
- Example for triangle: 10,20;30,40;50,60

#### Special case for Circles:
- For a Circle, the Coordinates field represents the center point.
- Example: 50,50 (center of the circle)

#### Radius (For Circles Only)
- Required only when Shape Type is Circle.
- Must be a positive number.
- Example: 25.5

## Demo

Watch the short demo video to see the Shape Management System frontend in action:

