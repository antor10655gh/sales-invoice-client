import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const SalesInvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const [filterInvoices, setFilterInvoices] = useState([]);

  const getInvoices = async () => {
    try {
      const response = await axios.get("invoices.json");
      setInvoices(response.data);
      setFilterInvoices(response.data);
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
    {
      name: "Action",
      cell: (row) => (
        <button
          className="btn btn-sm btn-primary"
          onClick={() => alert(row.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  useEffect(() => {
    getInvoices();
  }, []);

  useEffect(() => {
    const result = invoices.filter((invoice) => {
      return invoice.customer.toLowerCase().match(search.toLowerCase());
    });

    setFilterInvoices(result);
  }, [search]);

  return (
    <div className="container">
      <div className="row row-cols-1">
        <div className="col col-lg-8">
          <DataTable
            title={<h1>Sales</h1>}
            columns={columns}
            data={filterInvoices}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="450px"
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search"
                className="w-50 form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
          />
        </div>
        <div className="col col-lg-4">
          <h1>Hi</h1>
        </div>
      </div>
    </div>
  );
};

export default SalesInvoiceTable;
