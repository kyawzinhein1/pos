import React, { useState } from "react";
import { PlusCircleIcon } from "lucide-react";

const AddProductForm = React.memo(({ onAdd }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = () => {
    if (!name || !category || !price || !stock) {
      alert("Please fill all fields.");
      return;
    }
    onAdd({ name, category, price, stock });
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 w-full max-w-5xl mx-auto"
    >
      <input
        type="text"
        placeholder="Product Name"
        className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 rounded-md w-full shadow-sm"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 rounded-md w-full shadow-sm"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 rounded-md w-full shadow-sm"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        min="0"
      />
      <input
        type="number"
        placeholder="Stock"
        className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 rounded-md w-full shadow-sm"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        min="0"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-4 py-2 rounded-md flex justify-center items-center shadow-md w-full sm:col-span-2 lg:col-span-1"
      >
        <PlusCircleIcon className="mr-2 w-5 h-5" />
        <span>Add Product</span>
      </button>
    </form>
  );
});

export default AddProductForm;
