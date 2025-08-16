import { useGetAllExpensesQuery, useDeleteExpenseMutation } from "../redux/features/expense/expenseApi";
import { useNavigate } from "react-router-dom";

const AllExpenses = () => {
  const { data: expenses, isLoading, isError } = useGetAllExpensesQuery();
  const [deleteExpense] = useDeleteExpenseMutation();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteExpense(id).unwrap();
        alert("Expense deleted successfully");
      } catch (error) {
        console.error("Failed to delete expense:", error);
        alert("Failed to delete expense");
      }
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/${id}`);
  };

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (isError) return <div className="p-4 text-center text-red-500">Failed to load expenses</div>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <h1 className="text-2xl text-center font-bold mb-6">All Expenses</h1>
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Title</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Amount</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Category</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expenses && expenses.length > 0 ? (
              expenses.map((expense) => (
                <tr key={expense._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">{expense.title}</td>
                  <td className="px-4 py-2 text-sm text-gray-800 font-semibold">${expense.amount}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(expense._id)}
                      className="px-3 py-1 cursor-pointer bg-yellow-400 text-white rounded hover:bg-yellow-500 transition text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="px-3 py-1 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600 transition text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No expenses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllExpenses;
