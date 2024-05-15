import {
  Landing,
  Error,
  Register,
  MyItems,
  AddItem,
  ShowStats,
  ClaimItems,
  MyClaimedItems,
  DonateItem,
  Profile,
  SharedLayout,
  ProtectedRoutes,
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/register">Register</Link>
        <Link to="/landing">Home</Link>
      </nav> */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <SharedLayout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<MyItems />} />
          <Route path="additems" element={<AddItem />} />
          <Route path="showstats" element={<ShowStats />} />
          <Route path="claimitems" element={<ClaimItems />} />
          <Route path="myclaimeditems" element={<MyClaimedItems />} />
          <Route path="donateitems" element={<DonateItem />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
