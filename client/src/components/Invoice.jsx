import { PrinterCheckIcon, X } from "lucide-react";
import React from "react";

const Invoice = React.memo(
  ({ selectedProducts = [], trxnId, onClose, onSave }) => {
    const totalPrice = selectedProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
        {console.log("Invoice rendered.")}

        <div className="bg-white p-6 rounded-xl w-[95%] max-w-md shadow-xl border border-gray-200">
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
            Payment Invoice
          </h2>

          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <p>
              <span className="font-medium">Txn ID:</span> {trxnId}
            </p>
            <div className="text-right">
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date().toLocaleDateString("en-GB")}
              </p>
              <p>
                <span className="font-medium">Time:</span>{" "}
                {new Date().toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border border-gray-200 rounded-md overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border px-2 py-1">Product</th>
                  <th className="border px-2 py-1">Price</th>
                  <th className="border px-2 py-1">Qty</th>
                  <th className="border px-2 py-1">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border px-2 py-1">{item.productName}</td>
                    <td className="border px-2 py-1 text-right">
                      {item.price}
                    </td>
                    <td className="border px-2 py-1 text-center">
                      {item.quantity}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end text-lg font-semibold text-gray-800">
            Total: {totalPrice} Ks
          </div>

          <p className="mt-1 text-center text-sm text-gray-500 italic">
            Thank you for shopping with us.
          </p>

          <div className="mt-5 flex justify-between items-center">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
            >
              <X className="w-4 h-4" /> Close
            </button>
            <button
              onClick={onSave}
              className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
            >
              <PrinterCheckIcon className="w-4 h-4" /> Print
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default Invoice;
