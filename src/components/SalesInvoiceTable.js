import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const SalesInvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);

  const getInvoices = async () => {
    try {
      const response = await axios.get("invoices.json");
      setInvoices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Invoice ID",
      selector: (row) => row.id,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Customer Name",
      selector: (row) => row.customer,
    },
    {
      name: "Payable Amount",
      selector: (row) => row.payableAmount,
    },
    {
      name: "Paid Amount",
      selector: (row) => row.paidAmount,
    },
    {
      name: "Due Amount",
      selector: (row) => row.dueAmount,
    },
  ];

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-lg-2">
        <div className="col">
          <DataTable columns={columns} data={invoices} pagination />
        </div>
        <div className="col">
          <h1>Hi</h1>
        </div>
      </div>
    </div>
  );
};

export default SalesInvoiceTable;
