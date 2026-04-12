import React, { useContext, useEffect } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import Typography from "@material-ui/core/Typography";
import { GlobalContext } from "../../context/GlobalState";

export default function ExpenseChart(props) {
  const { expenses, getExpenses } = useContext(GlobalContext);

  const total = props.income - props.expense;

  const expenseDetail = expenses
    .filter((expense) => expense.type === "Expense")
    .map((expense) => ({ amt: expense.amount, category: expense.category }));

  var dict = {};
  expenseDetail.forEach(function (item) {
    if (item.category in dict) dict[item.category] += item.amt;
    else dict[item.category] = item.amt;
  });

  const expenseCategory = Object.keys(dict);

  const data = {
    labels: ["Income", "Expense"],
    datasets: [{
      data: [props.income, props.expense],
      backgroundColor: ["#00C853", "#FF5252"],
      hoverBackgroundColor: ["#00E676", "#FF1744"],
      borderWidth: 0,
    }],
  };

  const modernColors = [
    "#5C6BC0", "#26C6DA", "#00C853", "#FF5252",
    "#FF9800", "#AB47BC", "#26A69A", "#EC407A"
  ];

  const expenseData = {
    labels: expenseCategory,
    datasets: [{
      data: Object.values(dict),
      backgroundColor: modernColors,
      hoverBackgroundColor: modernColors,
      borderWidth: 0,
    }],
  };

  const options = {
    maintainAspectRatio: true,
    legend: {
      labels: { fontSize: 13, fontColor: "#666" },
    },
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const cardStyle = {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
    border: "0.5px solid #f0f0f0",
    flex: 1,
    minWidth: "300px",
  };

  return (
    <div style={{
      display: "flex",
      gap: "20px",
      marginTop: "24px",
      flexWrap: "wrap"
    }}>
      {/* Stats Chart */}
      <div style={cardStyle}>
        <Typography variant="h6" style={{
          fontWeight: 600,
          marginBottom: "16px",
          color: "#1A1F36"
        }}>
          Stats
        </Typography>
        <Doughnut data={data} options={options} />
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          {props.income === 0 && props.expense === 0 ? (
            <span style={{ color: "#999", fontSize: "14px" }}>No records yet</span>
          ) : props.income > props.expense ? (
            <span style={{
              color: "#00C853",
              fontWeight: 600,
              fontSize: "15px"
            }}>
              You saved ₹{total.toFixed(2)} — Well Done! 🎉
            </span>
          ) : (
            <span style={{
              color: "#FF5252",
              fontWeight: 600,
              fontSize: "15px"
            }}>
              ⚠️ Your expenses exceed income
            </span>
          )}
        </div>
      </div>

      {/* Breakdown Chart */}
      <div style={cardStyle}>
        <Typography variant="h6" style={{
          fontWeight: 600,
          marginBottom: "16px",
          color: "#1A1F36"
        }}>
          Expenses Breakdown
        </Typography>
        {expenseCategory.length === 0 ? (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
            color: "#999",
            fontSize: "14px"
          }}>
            No expenses recorded yet
          </div>
        ) : (
          <Pie data={expenseData} options={options} />
        )}
      </div>
    </div>
  );
}
