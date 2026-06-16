export default function ExpenseTable({ expenses }) {
  return (
    <>
     <h2 className="total_expense">
        Total Expenses: ₹
        {expenses.reduce(
          (sum, expense) => sum + Number(expense.amount),
          0
        )}
      </h2>
   
     <div className="expense-table ">
      <div className="table-header">
    <span>Amount</span>
    <span>Name</span>
    <span>Description</span>
    <span>Date</span>
  </div>

  {expenses.map((expense) => (
    <div className="table-row" key={expense.id}>
      <span>₹{expense.amount}</span>
      <span>{expense.name}</span>
      <span>{expense.description}</span>
      <span>{expense.date}</span>
    </div>
  ))}
    </div>
  </>);
}