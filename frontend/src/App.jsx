import { Toaster } from "react-hot-toast";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <>
      <Portfolio />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;

{
  /* <Routes>
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
      </Routes> */
}
