import React, { useState } from "react";
import DataTable from "react-data-table-component";

const SalesInvoiceTable = () => {
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-lg-2">
        <div className="col">
          <DataTable />
        </div>
        <div className="col">
          <h1>Hi</h1>
        </div>
      </div>
    </div>
  );
};

export default SalesInvoiceTable;
