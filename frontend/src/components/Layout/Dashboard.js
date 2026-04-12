import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CreateExpense from "./CreateExpense";
import { GlobalContext } from "../../context/GlobalState";
import ExpenseChart from "./ExpenseChart";
import Upload from "./Upload";

function Dashboard() {
  const { expenses } = useContext(GlobalContext);

  const income = expenses
    .filter((e) => e.type === "Income")
    .reduce((acc, e) => acc + e.amount, 0);

  const expense = expenses
    .filter((e) => e.type === "Expense")
    .reduce((acc, e) => acc + e.amount, 0);

  const saved = income - expense;

  const cardStyle = (gradient, shadow) => ({
    background: gradient,
    borderRadius: "16px",
    padding: "24px",
    color: "#fff",
    boxShadow: shadow,
    position: "relative",
    overflow: "hidden",
  });

  return (
    <div style={{ padding: "10px 0" }}>
      <Typography variant="h4" style={{
        fontWeight: 700,
        marginBottom: "24px",
        color: "#1A1F36"
      }}>
        Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} style={{ marginBottom: "30px" }}>
        <Grid item xs={12} sm={4}>
          <div style={cardStyle(
            "linear-gradient(135deg, #00C853, #69F0AE)",
            "0 8px 24px rgba(0,200,83,0.35)"
          )}>
            <Typography style={{ opacity: 0.85, fontSize: "0.9rem" }}>Total Income</Typography>
            <Typography variant="h4" style={{ fontWeight: 800, margin: "8px 0" }}>
              ₹{income.toFixed(2)}
            </Typography>
            <Typography style={{ opacity: 0.75, fontSize: "0.8rem" }}>↑ All time</Typography>
          </div>
        </Grid>

        <Grid item xs={12} sm={4}>
          <div style={cardStyle(
            "linear-gradient(135deg, #FF5252, #FF8A80)",
            "0 8px 24px rgba(255,82,82,0.35)"
          )}>
            <Typography style={{ opacity: 0.85, fontSize: "0.9rem" }}>Total Expenses</Typography>
            <Typography variant="h4" style={{ fontWeight: 800, margin: "8px 0" }}>
              ₹{expense.toFixed(2)}
            </Typography>
            <Typography style={{ opacity: 0.75, fontSize: "0.8rem" }}>↓ All time</Typography>
          </div>
        </Grid>

        <Grid item xs={12} sm={4}>
          <div style={cardStyle(
            saved >= 0
              ? "linear-gradient(135deg, #5C6BC0, #26C6DA)"
              : "linear-gradient(135deg, #FF6F00, #FFA000)",
            saved >= 0
              ? "0 8px 24px rgba(92,107,192,0.35)"
              : "0 8px 24px rgba(255,111,0,0.35)"
          )}>
            <Typography style={{ opacity: 0.85, fontSize: "0.9rem" }}>
              {saved >= 0 ? "Total Saved" : "Deficit"}
            </Typography>
            <Typography variant="h4" style={{ fontWeight: 800, margin: "8px 0" }}>
              ₹{Math.abs(saved).toFixed(2)}
            </Typography>
            <Typography style={{ opacity: 0.75, fontSize: "0.8rem" }}>
              {saved >= 0 ? "🎉 Well Done!" : "⚠️ Overspent"}
            </Typography>
          </div>
        </Grid>
      </Grid>

      <CreateExpense />
      <Upload />
      <ExpenseChart income={income} expense={expense} />
    </div>
  );
}

export default Dashboard;
