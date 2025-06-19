import { PrinterCheckIcon, X } from "lucide-react";

const TransactionDetail = ({ transaction, onClose, onSave }) => {
  if (!transaction) return null;

  const { transactionId, date, time, total, products } = transaction;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-xl relative">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Transaction Detail
        </h1>

        <div className="flex justify-between text-sm mb-2">
          <p>
            <span className="font-medium">ID:</span> {transactionId}
          </p>
          <div className="text-right">
            <p>
              <span className="font-medium">Date:</span> {date}
            </p>
            <p>
              <span className="font-medium">Time:</span> {time}
            </p>
          </div>
        </div>

        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1 text-left">Product</th>
              <th className="border px-2 py-1 text-right">Amt</th>
              <th className="border px-2 py-1 text-center">Qty</th>
              <th className="border px-2 py-1 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((item, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">{item.productName}</td>
                  <td className="border px-2 py-1 text-right">{item.price}</td>
                  <td className="border px-2 py-1 text-center">
                    {item.quantity}
                  </td>
                  <td className="border px-2 py-1 text-right">
                    {item.price * item.quantity}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-2 text-red-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-4 text-right font-semibold">
          Total: {total} Kyats
        </div>

        <div className="mt-4 flex justify-between">
          <button
            className="bg-red-500 hover:bg-red-600 transition-colors text-white px-2 py-2 rounded-full"
            onClick={onClose}
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 transition-colors text-white px-2 py-2 rounded-full"
            onClick={onSave}
            title="Print or Save"
          >
            <PrinterCheckIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
