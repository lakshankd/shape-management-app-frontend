import { AppSidebar } from "@/components/app-sidebar";
import ShapeCanvas from "@/components/shape-canva";
import ShapesGraph from "@/components/shape-graph";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Shape Management System
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>All Shapes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* <ShapeCanvas shapes={shapes} /> */}
          <ShapesGraph />
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
        </div>
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
  );
};

export default HomePage;
