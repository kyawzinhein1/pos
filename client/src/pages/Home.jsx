import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Package,
  LayoutDashboard,
  LucideHistory,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard",
  },
  {
    label: "Sale",
    icon: ShoppingCart,
    to: "/sale",
  },
  {
    label: "Products",
    icon: Package,
    to: "/manage-products",
  },
  {
    label: "Transactions",
    icon: LucideHistory,
    to: "/transactions",
  },
];

const Home = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-5">POS System</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-4xl">
        {navItems.map(({ label, icon: Icon, to }) => (
          <Link
            to={to}
            key={label}
            className="bg-white hover:bg-blue-50 active:scale-[0.98] transition-all duration-200 p-6 rounded-2xl shadow-md hover:shadow-xl flex flex-col items-center justify-center w-full aspect-square group focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <Icon className="w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
            <span className="mt-3 text-gray-700 font-medium text-sm text-center group-hover:text-blue-700">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
