import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; 
import { BrowserRouter, Route, Routes } from "react-router";
import Quiz from "./main/pages/Quiz.tsx";
import Dashboard from "./dashboard/pages/Dashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
