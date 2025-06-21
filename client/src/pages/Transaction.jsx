import { useEffect, useState } from "react";
import useTransactionStore from "../store/transactions";
import { Edit2Icon } from "lucide-react";
import TransactionDetail from "../components/TransactionDetail";
import * as XLSX from "xlsx";

const Transactions = () => {
  const { transactions, fetchTransactions, totalPages, page, limit, total } =
    useTransactionStore();

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTransactions(currentPage, limit, searchTerm, startDate, endDate);
  }, [currentPage, limit]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchTransactions(1, limit, searchTerm, startDate, endDate);
  };

  const handleDetailShow = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetail(true);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const exportToExcel = () => {
    if (transactions.length === 0) {
      alert("No transactions found to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      transactions.map((transaction, index) => ({
        No: (currentPage - 1) * limit + index + 1,
        "Transaction ID": transaction.transactionId,
        Products: transaction.products
          ? transaction.products
              .map((p) => `${p.productName} (x${p.quantity})`)
              .join(", ")
          : "No products",
        Total: transaction.total,
        Date: transaction.date,
        Time: transaction.time,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "transactions.xlsx");
  };

  return (
    <section className="container mx-auto mt-2 px-4">
      <h1 className="text-lg md:text-3xl font-bold mb-8">Transactions</h1>

      <div className="flex gap-4 mb-4 items-center flex-wrap">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-sm font-medium">Search by Trxn Id ...</label>
          <input
            type="text"
            placeholder="Enter Trxn Id..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 w-full max-w-sm rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col w-auto">
          <label className="text-sm font-medium"> </label>
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        <div className="flex flex-col w-auto">
          <label className="text-sm font-medium">&nbsp;</label>
          <button
            onClick={() => {
              setSearchTerm("");
              setStartDate("");
              setEndDate("");
              setCurrentPage(1);
              fetchTransactions(1, limit, "", "", "");
            }}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Reset
          </button>
        </div>
        <div className="flex flex-col w-auto">
          <label className="text-sm font-medium">&nbsp;</label>
          <button
            onClick={exportToExcel}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Export as Excel
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-gray-100 sticky top-0">
            <tr className="text-sm md:text-base">
              <th className="border py-2 px-2">No</th>
              <th className="border py-2 px-2">Transaction ID</th>
              <th className="border py-2 px-2">Products</th>
              <th className="border py-2 px-2">Total</th>
              <th className="border py-2 px-2">Date</th>
              <th className="border py-2 px-2">Time</th>
              <th className="border py-2 px-2">Detail</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-red-600 py-4">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((transaction, index) => (
                <tr
                  key={transaction.transactionId}
                  className="border text-sm md:text-base"
                >
                  <td className="px-2 py-2 text-center">
                    {(currentPage - 1) * limit + index + 1}
                  </td>
                  <td className="py-2 text-center">
                    {transaction.transactionId}
                  </td>
                  <td className="py-2 text-center">
                    {Array.isArray(transaction.products) &&
                    transaction.products.length > 0
                      ? transaction.products
                          .map((p) => `${p.productName} (x${p.quantity})`)
                          .join(", ")
                      : "No products"}
                  </td>
                  <td className="px-4 py-2 text-right">{transaction.total}</td>
                  <td className="px-4 py-2 text-center">{transaction.date}</td>
                  <td className="px-4 py-2 text-center">{transaction.time}</td>
                  <td className="px-2 py-2 text-center">
                    <button
                      className="bg-yellow-500 p-2 rounded-full text-white hover:bg-yellow-600"
                      onClick={() => handleDetailShow(transaction)}
                    >
                      <Edit2Icon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {console.log("transaction dates:", transactions[0]?.date)}

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 my-6">
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-blue-500 text-white rounded-md"
          >
            First
          </button>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-blue-500 text-white rounded-md"
          >
            &lt;
          </button>
          <span className="px-3 py-2">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-blue-500 text-white rounded-md"
          >
            &gt;
          </button>
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-blue-500 text-white rounded-md"
          >
            Last
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {showDetail && selectedTransaction && (
        <TransactionDetail
          transaction={selectedTransaction}
          onClose={() => setShowDetail(false)}
        />
      )}
    </section>
  );
};

export default Transactions;
