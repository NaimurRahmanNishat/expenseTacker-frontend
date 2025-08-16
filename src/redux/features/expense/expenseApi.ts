/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/getBaseUrl";


export const ExpenseCategories = ["FOOD", "TRANSPORT", "SHOPPING", "OTHER"] as const;
export type ExpenseCategory = typeof ExpenseCategories[number];


export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  author: {
    _id: string;
    username: string;
    email: string;
  }
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
}


export interface CreateExpenseInput {
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
}
export type UpdateExpenseInput = CreateExpenseInput;


export type ExpensesApiResponse = ApiResponse<Expense[]>;
export type ExpenseApiResponse = ApiResponse<Expense>;

const expenseApi = createApi({
  reducerPath: "expenseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/expense`,
    credentials: "include",
  }),
  tagTypes: ["Expenses"],
  endpoints: (builder) => ({
    //  Get all expenses
    getAllExpenses: builder.query<Expense[], void>({
      query: () => "/",
      transformResponse: (response: ExpensesApiResponse | Expense[]) => {
        if (Array.isArray(response)) return response;
        return response.data ?? [];
      },
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ _id }) => ({ type: "Expenses" as const, id: _id })),
            { type: "Expenses", id: "LIST" },
          ]
          : [{ type: "Expenses", id: "LIST" }],
    }),

    //  Create expense
    addExpense: builder.mutation<Expense, CreateExpenseInput>({
      query: (expense) => ({
        url: "/add-expense",
        method: "POST",
        body: expense,
      }),
      transformResponse: (response: ExpenseApiResponse | Expense) => {
        if ("data" in (response as any)) return (response as ExpenseApiResponse).data as Expense;
        return response as Expense;
      },
      invalidatesTags: [{ type: "Expenses", id: "LIST" }],
    }),

    //  Update expense
    updateExpense: builder.mutation<Expense, { id: string; updates: UpdateExpenseInput }>({
      query: ({ id, updates }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: updates,
      }),
      transformResponse: (response: ExpenseApiResponse | Expense) => {
        if ("data" in (response as any)) return (response as ExpenseApiResponse).data as Expense;
        return response as Expense;
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Expenses", id },
        { type: "Expenses", id: "LIST" },
      ],
    }),

    //  Delete expense
    deleteExpense: builder.mutation<{ deletedId: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: ExpenseApiResponse | Expense) => {
        const deleted = "data" in (response as any) ? (response as ExpenseApiResponse).data : response;
        return { deletedId: (deleted as Expense)?._id ?? "" };
      },
      invalidatesTags: (_result, _error, id) => [
        { type: "Expenses", id },
        { type: "Expenses", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;

export default expenseApi;
