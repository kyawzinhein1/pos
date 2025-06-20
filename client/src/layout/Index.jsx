import { Outlet } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

const Index = () => {
  return (
    <section className="px-6 sm:px-8 md:px-12">
      <Breadcrumbs />
      <Outlet />
    </section>
  );
};

export default Index;
