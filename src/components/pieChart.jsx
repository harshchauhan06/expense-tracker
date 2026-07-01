import React from "react";
import { useState, useEffect } from "react";
import "./pieChart.css";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import DirectionsBusRoundedIcon from "@mui/icons-material/DirectionsBusRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
 
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

  const categoryIcons = {
  Bills: <ReceiptLongRoundedIcon className="category-icon bills-icon" />,
  Food: <RestaurantRoundedIcon className="category-icon food-icon" />,
  Transport: <DirectionsBusRoundedIcon className="category-icon transport-icon" />,
  Shopping: <ShoppingCartRoundedIcon className="category-icon shopping-icon" />,
};

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
    <div className="summary-card bills">
    <div className="summary-left">
        {categoryIcons.Bills}
        <span>Bills</span>
    </div>
    <span>₹{Bills}</span>
</div>
    <div className="summary-card food">
    <div className="summary-left">
        {categoryIcons.Food}
        <span>Food</span>
    </div>
    <span>₹{Food}</span>
</div>

<div className="summary-card transport">
    <div className="summary-left">
        {categoryIcons.Transport}
        <span>Transport</span>
    </div>
    <span>₹{Transport}</span>
</div>

<div className="summary-card shopping">
    <div className="summary-left">
        {categoryIcons.Shopping}
        <span>Shopping</span>
    </div>
    <span>₹{Shopping}</span>
</div>
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
    height={380}
>
<PieChart
    margin={{
        top: 40,
        right: 60,
        bottom: 40,
        left: 60,
    }}
>
          <Pie
    data={data}
    dataKey="value"
    nameKey="name"
    cx="50%"
cy="55%"
    outerRadius={85}
    innerRadius={40}
    paddingAngle={3}
    cornerRadius={6}
    label={({ name, percent }) =>
        percent > 0.05
            ? `${name} ${(percent * 100).toFixed(0)}%`
            : ""
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
         <Tooltip
    formatter={(value) => [`₹${value}`, "Amount"]}
    contentStyle={{
        borderRadius: "12px",
        border: "none",
        boxShadow: "0 10px 24px rgba(0,0,0,.15)"
    }}
/>
           
        </PieChart>
      </ResponsiveContainer>
)}
      
    </div>
    </>
  );
}

export default ExpensePieChart;