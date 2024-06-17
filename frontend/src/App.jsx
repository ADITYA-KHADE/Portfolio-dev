import { Toaster } from "react-hot-toast";
import Portfolio from "./pages/Portfolio"
import { ThemeProvider } from "./context/Isdarkmode";


function App() {
  return (
    <ThemeProvider>
      <Portfolio />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;

{/* <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes> */}