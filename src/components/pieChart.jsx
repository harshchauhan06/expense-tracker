import React from "react";
import { useState, useEffect } from "react";
import "./pieChart.css";
 
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

function ExpensePieChart({ expenses , setOpen }) {
    
  const [Bills, setBills] = useState(0);
  const [Food, setFood] = useState(0);
  const [Transport, setTransport] = useState(0);
  const [Shopping, setShopping] = useState(0);

  useEffect(() => {
    let bills = 0;
    let food = 0;
    let transport = 0;
    let shopping = 0;

    if (Array.isArray(expenses)) {
      expenses.forEach((expense) => {
        const amt = parseInt(expense.amount, 10) || 0;
        switch (expense.category) {
          case "Bills":
            bills += amt;
            break;
          case "Food":
            food += amt;
            break;
          case "Transport":
            transport += amt;
            break;
          case "Shopping":
            shopping += amt;
            break;
          default:
            break;
        }
      });
    }

    setBills(bills);
    setFood(food);
    setTransport(transport);
    setShopping(shopping);
  }, [expenses]);

  const total = Bills + Food + Shopping + Transport;

  const data = [
    { name: "Bills", value: Bills },
    { name: "Food", value: Food },
    { name: "Transport", value: Transport },
    { name: "Shopping", value: Shopping },
    ];
    const COLORS = [
  "#4F46E5", // Bills
  "#E11D48", // Food
  "#16A34A", // Transport
  "#D97706", // Shopping
];

  return (
    <>
    <div className="pie_chart">
      <div className="summary">
    <div className="summary-card bills">Bills: ₹{Bills}</div>
    <div className="summary-card food">Food: ₹{Food}</div>
    <div className="summary-card transport">Transport: ₹{Transport}</div>
    <div className="summary-card shopping">Shopping: ₹{Shopping}</div>
</div>
{total === 0 ? (
    <div
    className="empty-circle"
    onClick={() => setOpen(true)}
>
    <span>+</span>
    <p>Add Expense</p>
</div>
) : (
    <ResponsiveContainer
    width="100%"
    height={360}
>
        <PieChart
    margin={{
        top:20,
        left:50,
        right:20,
        bottom:20,
    }}
>
          <Pie
    data={data}
    dataKey="value"
    nameKey="name"
    cx="58%"       
    cy="50%"
    outerRadius={95}
    label={({ name, percent }) =>
        `${name}: ${(percent * 100).toFixed(0)}%`
    }
    labelLine
>
    {data.map((entry, index) => (
        <Cell
            key={index}
            fill={COLORS[index]}
        />
    ))}
</Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
)}
      
    </div>
    </>
  );
}

export default ExpensePieChart;