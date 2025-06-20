import { PrinterCheckIcon, X } from "lucide-react";

const TransactionDetail = ({ transaction, onClose, onSave }) => {
  if (!transaction) return null;

  const { transactionId, date, time, total, products } = transaction;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[95%] max-w-md shadow-2xl border border-gray-200 relative">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Transaction Details
        </h1>

        <div className="flex justify-between text-sm text-gray-700 mb-3">
          <p>
            <span className="font-medium">Txn ID:</span> {transactionId}
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

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-md">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-3 py-2 text-left">Product</th>
                <th className="border px-3 py-2 text-right">Price</th>
                <th className="border px-3 py-2 text-center">Qty</th>
                <th className="border px-3 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) && products.length > 0 ? (
                products.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border px-3 py-2">{item.productName}</td>
                    <td className="border px-3 py-2 text-right">
                      {item.price}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      {item.quantity}
                    </td>
                    <td className="border px-3 py-2 text-right">
                      {item.price * item.quantity}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-red-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-right text-lg font-semibold text-gray-800">
          Total: {total} Ks
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            className="bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded-md flex items-center gap-2"
            onClick={onClose}
            title="Close"
          >
            <X className="w-5 h-5" /> Close
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 transition-all text-white px-4 py-2 rounded-md flex items-center gap-2"
            onClick={onSave}
            title="Print or Save"
          >
            <PrinterCheckIcon className="w-5 h-5" /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
