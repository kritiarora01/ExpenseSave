import React, { useContext, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import moment from "moment";
import { GlobalContext } from "../../context/GlobalState";

function ViewExpenses() {
  let { expenses, deleteExpenses, getExpenses } = useContext(GlobalContext);

  expenses = expenses.map(expense => {
    expense = { ...expense };
    expense.date = moment(expense.date).format('DD-MM-YYYY');
    return expense;
  });

  useEffect(() => {
    getExpenses();
  }, []);

  const columns = [
    {
      title: "Type", field: "type",
      render: rowData => (
        <span style={{
          padding: "4px 12px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: 500,
          background: rowData.type === "Income" ? "#E8F5E9" : "#FFEBEE",
          color: rowData.type === "Income" ? "#00C853" : "#FF5252"
        }}>
          {rowData.type}
        </span>
      )
    },
    {
      title: "Amount", field: "amount",
      render: rowData => (
        <span style={{
          fontWeight: 500,
          color: rowData.type === "Income" ? "#00C853" : "#FF5252"
        }}>
          {rowData.type === "Income" ? "+" : "-"}₹{rowData.amount}
        </span>
      )
    },
    { title: "Category", field: "category" },
    { title: "Date", field: "date" },
    { title: "Description", field: "desc" },
  ];

  return (
    <div style={{ padding: "10px 0" }}>
      <Typography variant="h4" style={{
        fontWeight: 700,
        marginBottom: "24px",
        color: "#1A1F36"
      }}>
        View Expenses
      </Typography>
      <div style={{
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)"
      }}>
        <MaterialTable
          data={expenses}
          columns={columns}
          options={{
            exportButton: true,
            showTitle: false,
            searchFieldStyle: {
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              padding: "4px 12px",
            },
            rowStyle: {
              fontSize: "14px",
            },
            headerStyle: {
              background: "#F5F6FA",
              fontWeight: 600,
              color: "#1A1F36",
              fontSize: "13px",
            },
          }}
          actions={[
            {
              icon: 'delete',
              tooltip: 'Delete Entry',
              onClick: (event, data) => {
                deleteExpenses(data._id);
              }
            }
          ]}
        />
      </div>
    </div>
  );
}

export default ViewExpenses;
