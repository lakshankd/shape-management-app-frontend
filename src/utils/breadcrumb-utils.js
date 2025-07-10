export const getPageTitle = (pathname) => {
  if (pathname === "/dashboard") return "Dashboard";
  if (pathname === "/") return "All Shapes";
  if (pathname === "/overlaps") return "Overlapping Shapes";
  return "Home";
};
