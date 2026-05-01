import React from "react";
import {createRoot} from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import "./css/index.css";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from "@mui/material/styles";
import theme from './app/MaterialTheme';
import {BrowserRouter as Router} from "react-router-dom";
import ContextProvider from "./app/context/ContextProvider";
import { ThemeContextProvider } from "./app/context/ThemeContext";

const container = document.getElementById("root")!;
const root = createRoot(container);
 
root.render(
  <React.StrictMode>
    <Provider store={store}>
     <ContextProvider>
      <ThemeContextProvider>
       <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
         <App />
        </Router>
       </ThemeProvider>
      </ThemeContextProvider>
    </ContextProvider>
    </Provider>
  </React.StrictMode>,
);


