import "bootstrap/dist/css/bootstrap.min.css";
import SalesInvoiceTable from "./components/SalesInvoiceTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <SalesInvoiceTable></SalesInvoiceTable>
      <ToastContainer />
    </div>
  );
}

export default App;
