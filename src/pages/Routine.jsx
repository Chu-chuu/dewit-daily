import React, { useState, useEffect } from "react";
import {
  format,
  isToday,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import { FaPaw, FaLeaf, FaHeart } from "react-icons/fa";

const Routine = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [newProduct, setNewProduct] = useState({ name: "", category: "", tags: [] });
  const [modalOpen, setModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    const savedCategories = localStorage.getItem("categories");

    setProducts(
      savedProducts
        ? JSON.parse(savedProducts)
        : [
            { name: "Cerave Cleanser", category: "Cleansing", usage: {}, tags: ["Hydrating"] },
            { name: "Moisturizer", category: "Moisturizing", usage: {}, tags: ["Nourishing"] },
          ]
    );

    setCategories(
      savedCategories
        ? JSON.parse(savedCategories)
        : [
            { name: "Cleansing", icon: <FaPaw /> },
            { name: "Moisturizing", icon: <FaLeaf /> },
          ]
    );
  }, []);

  // Save products and categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const changeMonth = (direction) => {
    setCurrentMonth(direction === "next" ? addMonths(currentMonth, 1) : subMonths(currentMonth, 1));
  };

  const handleAddProduct = () => {
    if (!newProduct.name.trim()) {
      alert("Please provide a product name.");
      return;
    }
    if (products.find((p) => p.name.toLowerCase() === newProduct.name.toLowerCase())) {
      alert("This product already exists.");
      return;
    }
    setProducts([...products, { ...newProduct, usage: {} }]);
    setNewProduct({ name: "", category: "", tags: [] });
    setModalOpen(false);
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      alert("Please provide a category name.");
      return;
    }
    if (categories.some((category) => category.name.toLowerCase() === newCategory.toLowerCase())) {
      alert("This category already exists.");
      return;
    }
    setCategories([...categories, { name: newCategory, icon: <FaHeart /> }]); // Add a default icon
    setNewCategory("");
  };

  const handleCategorySelect = (category) => {
    setNewProduct({ ...newProduct, category: category.name });
  };

  const handleEditProduct = (index) => {
    setNewProduct(products[index]);
    setEditingIndex(index);
    setModalOpen(true);
  };

  const saveEditProduct = () => {
    const updatedProducts = [...products];
    updatedProducts[editingIndex] = { ...newProduct, usage: products[editingIndex].usage };
    setProducts(updatedProducts);
    setNewProduct({ name: "", category: "", tags: [] });
    setEditingIndex(null);
    setModalOpen(false);
  };

  const handleDeleteProduct = (index) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const toggleProductUsage = (productIndex, day) => {
    const updatedProducts = [...products];
    const product = updatedProducts[productIndex];
    product.usage[day] = !product.usage[day];
    setProducts(updatedProducts);
  };

  const isTodayStyled = (day) =>
    isToday(day) ? "bg-accent text-white font-bold ring-2 ring-offset-2 ring-accent" : "";

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      editingIndex !== null ? saveEditProduct() : handleAddProduct();
    }
  };

  return (
    
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
  {/* Routine Tracker Heading */}
  <div className="w-full max-w-4xl mb-8 text-center">
    <h1 className="text-4xl font-bold text-gray-800">Routine Tracker</h1>
    <p className="mt-2 text-lg text-gray-600">Keep track of your skincare products and routines</p>
  </div>
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-4xl mb-6">
        <button onClick={() => changeMonth("prev")} className="text-lg font-bold text-gray-600 hover:text-primary transition">
          &lt;
        </button>
        <h1 className="text-3xl font-bold text-gray-800">{format(currentMonth, "MMMM yyyy")}</h1>
        <button onClick={() => changeMonth("next")} className="text-lg font-bold text-gray-600 hover:text-primary transition">
          &gt;
        </button>
      </div>

      {/* Add Product Section */}
      <div className="w-full max-w-4xl mb-8 bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={(e) => {
            e.preventDefault();
            editingIndex !== null ? saveEditProduct() : handleAddProduct();
          }} onKeyPress={handleKeyPress} className="flex gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
            className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-primary"
          />
         <select
  value={newProduct.category}
  onChange={(e) => {
    if (e.target.value === "add_new_category") {
      setModalOpen(true); // Open the modal to add a new category
    } else {
      setNewProduct({ ...newProduct, category: e.target.value });
    }
  }}
  className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-primary"
>
  <option value="">Select Category (Optional)</option>
  {categories.map((category, index) => (
    <option key={index} value={category.name}>
      {category.icon} {category.name}
    </option>
  ))}
  <option value="add_new_category">+ Add New Category</option>
</select>
          <button
            type="submit"
            className={`px-4 py-2 rounded-md text-white ${editingIndex !== null ? "bg-secondary" : "bg-primary"} hover:opacity-90`}
          >
            {editingIndex !== null ? "Save" : "Add"}
          </button>
        </form>

        {/* Add Category Button */}
        <div className="mt-4">
         
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-4 w-full max-w-4xl">
        <label className="text-sm font-medium text-gray-700">Filter by Category:</label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Modal for New Category */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <button
              onClick={handleAddCategory}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
            >
              Add Category
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-2 px-4 py-2 bg-gray-300 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Calendar Table */}
      <table className="table-auto w-full max-w-4xl border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 bg-gray-100 text-left w-60">Products</th>
            {daysInMonth.map((day, index) => (
              <th key={index} className={`border border-gray-300 p-2 text-center ${isTodayStyled(day)}`} title={isToday(day) ? "Today" : ""}>
                {format(day, "d")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products
            .filter((product) => !filterCategory || product.category === filterCategory)
            .map((product, productIndex) => (
              <tr key={productIndex}>
                <td className="border border-gray-300 p-2 bg-gray-50 font-medium">
                  <div className="flex justify-between items-center">
                    {product.name}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProduct(productIndex)}
                        className="text-blue-500 hover:text-blue-700 transition"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(productIndex)}
                        className="bg-red-500 text-white rounded-full px-2 py-1 text-xs hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
                {daysInMonth.map((day, dayIndex) => (
                  <td
                    key={dayIndex}
                    className={`border border-gray-300 p-2 text-center ${
                      product.usage[format(day, "d")] ? "bg-primary text-white" : ""
                    }`}
                    title={product.usage[format(day, "d")] ? "Usage toggled" : ""}
                  >
                    <input
                      type="checkbox"
                      checked={product.usage[format(day, "d")] || false}
                      onChange={() => toggleProductUsage(productIndex, format(day, "d"))}
                      className="form-checkbox h-4 w-4 text-primary"
                    />
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Routine;
