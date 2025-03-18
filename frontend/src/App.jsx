import { Toaster } from "react-hot-toast";
import Portfolio from "./pages/Portfolio";
import { account, ID } from './lib/appwrite';
import { analytics } from "./firebaseConfig";
import { logEvent } from "firebase/analytics";
import { firestore } from './firebaseConfig'; 
import { collection, addDoc, getDocs } from 'firebase/firestore';

logEvent(analytics, "notification_received");


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
