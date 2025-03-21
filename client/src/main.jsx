import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./contexts/theme-provider";

createRoot(document.getElementById("root")).render(
    <>
        <ThemeProvider>
            <ToastContainer />
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    </>
);
