import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // ✅ REQUIRED
import App from "./App";
import "./index.css";
import { Toaster } from "sonner";
import store from "./redux/store";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";


createRoot(document.getElementById("root")).render(
  <StrictMode>
   <Provider store={store}>
      <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
           <App />
        <Toaster />
        </ProductProvider>
        </AuthProvider>
      </BrowserRouter>
   </Provider>
  </StrictMode>
);
