import { useEffect, useMemo } from "react";
import { Package, DollarSign, AlertTriangle } from "lucide-react";
import useTransactionStore from "../store/transactions";
import useProductStore from "../store/product";

const Dashboard = () => {
  const { transactions, fetchTransactions } = useTransactionStore();
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
    fetchTransactions();
  }, [fetchProducts, fetchTransactions]);

  // Calculate total revenue
  const totalRevenue = useMemo(
    () =>
      transactions.reduce(
        (sum, transaction) => sum + (Number(transaction.total) || 0),
        0
      ),
    [transactions]
  );

  const lowStockProducts = products.filter((p) => p.stock <= 10);

  return (
    <section className="container mx-auto mt-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-5 rounded-2xl shadow-md flex items-center gap-4">
          <Package className="w-10 h-10" />
          <div>
            <p className="text-sm uppercase">Total Products</p>
            <h2 className="text-2xl font-bold">{products.length}</h2>
          </div>
        </div>

        <div className="bg-green-500 text-white p-5 rounded-2xl shadow-md flex items-center gap-4">
          <DollarSign className="w-10 h-10" />
          <div>
            <p className="text-sm uppercase">Total Transactions</p>
            <h2 className="text-2xl font-bold">{transactions.length}</h2>
          </div>
        </div>

        <div className="bg-purple-500 text-white p-5 rounded-2xl shadow-md flex items-center gap-4">
          <DollarSign className="w-10 h-10" />
          <div>
            <p className="text-sm uppercase">Total Revenue</p>
            <h2 className="text-2xl font-bold">{totalRevenue} Ks</h2>
          </div>
        </div>
      </div>

      {/* Low Stock Alert Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="text-yellow-500" /> Low Stock Alerts
        </h2>

        {lowStockProducts.length === 0 ? (
          <div className="bg-green-100 text-green-700 p-4 rounded-md">
            All products are sufficiently stocked.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-md border border-red-200">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-red-100 text-left">
                <tr>
                  <th className="px-4 py-2 border">Product</th>
                  <th className="px-4 py-2 border text-center">Stock</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map((product) => (
                  <tr key={product._id} className="border-b">
                    <td className="px-4 py-2">{product.productName}</td>
                    <td className="px-4 py-2 text-center text-red-600 font-semibold">
                      {product.stock}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
