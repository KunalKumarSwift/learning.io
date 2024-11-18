import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "./theme/ThemeContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Assignments from "./pages/Assignments";
import Grades from "./pages/Grades";

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:id" element={<CourseDetails />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="grades" element={<Grades />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
