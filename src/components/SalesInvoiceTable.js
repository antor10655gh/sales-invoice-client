import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./SalesInvoiceTable.css";
import moment from "moment";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const SalesInvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const [filterInvoices, setFilterInvoices] = useState([]);
  const [singleinvoices, setSingleInvoices] = useState([]);
  const [updateCustomerName, setUpdateCustomerName] = useState("");
  const [updatePayableAmount, setUpdatePayableAmount] = useState("");
  const [updatePaidAmount, setUpdatePaidAmount] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  //   create function to show modal and load single invoice
  const handleShow = (id) => {
    fetch(`http://localhost:5000/invoices/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSingleInvoices(data);
        // console.log(data);
      });
    setShow(true);
  };

  //   create a new invoice by using this function
  const handleInvoice = (event) => {
    event.preventDefault();
    const date = moment().format("L");
    const customerName = event.target.customer_name.value;
    const payableAmount = event.target.payable_amount.value;
    const paidAmount = event.target.paid_amount.value;
    const dueAmount = parseInt(payableAmount) - parseInt(paidAmount);

    const invoice = {
      date: date,
      customer: customerName,
      payableAmount: parseInt(payableAmount),
      paidAmount: parseInt(paidAmount),
      dueAmount: dueAmount,
    };

    fetch("http://localhost:5000/invoice", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(invoice),
    })
      .then((res) => res.json())
      .then((data) => {
        toast("Successfully Added");
        getInvoices();
        event.target.customer_name.value = "";
        event.target.payable_amount.value = "";
        event.target.paid_amount.value = "";
      });
  };

  //   create function for delete invoice
  const handleDeleteInvoice = (id) => {
    fetch(`http://localhost:5000/invoices/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast("Successfully Deleted");
        getInvoices();
      });
  };

  const handleUpdateInvoice = (id) => {
    let item = {
      updateCustomerName,
      updatePayableAmount,
      updatePaidAmount,
    };
    console.log(item);
    fetch(`http://localhost:5000/invoices/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast("Successfully Updated");
        getInvoices();
      });
    setShow(false);
  };

  const getInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/invoices");
      setInvoices(response.data);
      setFilterInvoices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Invoice ID",
      selector: (row) => row._id,
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
          className="btn btn-sm btn-danger"
          onClick={() => handleDeleteInvoice(row._id)}
        >
          Delete
        </button>
      ),
    },
    {
      cell: (row) => (
        <button
          className="btn btn-sm btn-info"
          onClick={() => handleShow(row._id)}
        >
          Edit
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
            title={<h1 style={{ color: "#5901FF" }}>Sales</h1>}
            columns={columns}
            data={filterInvoices}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="420px"
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            subHeader
            subHeaderComponent={
              <input
                type="text"
                id="searchInput"
                placeholder="Search"
                className="form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
          />
        </div>
        <div className="col col-lg-4">
          <div className="customer-form">
            <h1 className="pt-5">Create New Invoice</h1>
            <form onSubmit={handleInvoice} className="mt-4">
              <label htmlFor="" className="mb-1 fw-bold">
                Customer
              </label>
              <input
                type="text"
                name="customer_name"
                placeholder="Enter Customer Name"
                className="form-control mb-3"
              />
              <label htmlFor="" className="mb-1 fw-bold">
                Payable Amount
              </label>
              <input
                type="text"
                name="payable_amount"
                placeholder="Enter Payable Amount"
                className="form-control mb-3"
              />
              <label htmlFor="" className="mb-1 fw-bold">
                Paid Amount
              </label>
              <input
                type="text"
                name="paid_amount"
                placeholder="Enter Paid Amount"
                className="form-control mb-3"
              />
              <input
                type="submit"
                name="submit"
                value="SAVE"
                className="form-control mb-3"
                style={{ color: "#fff", background: "#3DCF4F" }}
              />
            </form>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Update Invoice</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Customer</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={singleinvoices.customer}
                      onChange={(e) => setUpdateCustomerName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Payable Amount</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={singleinvoices.payableAmount}
                      onChange={(e) => setUpdatePayableAmount(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Paid Amount</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={singleinvoices.paidAmount}
                      onChange={(e) => setUpdatePaidAmount(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleUpdateInvoice(singleinvoices._id)}
                >
                  Update
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesInvoiceTable;
