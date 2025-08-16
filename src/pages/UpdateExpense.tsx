/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllExpensesQuery, useUpdateExpenseMutation } from "../redux/features/expense/expenseApi";

const UpdateExpense = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: expenses } = useGetAllExpensesQuery();
  const [updateExpense, { isLoading }] = useUpdateExpenseMutation();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "FOOD",
    date: "",
  });


  useEffect(() => {
    if (expenses && id) {
      const expense = expenses.find((e) => e._id === id);
      if (expense) {
        setFormData({
          title: expense.title,
          amount: expense.amount.toString(),
          category: expense.category,
          date: expense.date.split("T")[0], 
        });
      }
    }
  }, [expenses, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateExpense({
        id: id!,
        updates: {
          title: formData.title,
          amount: Number(formData.amount),
          category: formData.category as any,
          date: formData.date,
        },
      }).unwrap();
      alert("Expense updated successfully");
      navigate("/dashboard/all-expense");
    } catch (error) {
      console.error("Failed to update expense:", error);
      alert("Failed to update expense");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Update Expense</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 px-2 py-2 border focus:outline-none block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="mt-1 px-2 py-2 border focus:outline-none block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 px-2 py-2 border focus:outline-none block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="FOOD">FOOD</option>
              <option value="TRANSPORT">TRANSPORT</option>
              <option value="SHOPPING">SHOPPING</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 px-2 py-2 border focus:outline-none block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 cursor-pointer bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Expense"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateExpense;
