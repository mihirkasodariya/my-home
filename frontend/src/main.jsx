import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { UnderMaintenance } from "./components/UnderMaintenance";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Router>
    <ScrollToTop />
    {process.env.UNDER_MAINTENANCE === "true" ? <UnderMaintenance /> : <App />}
  </Router>
);
