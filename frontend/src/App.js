import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from './pages/Checkin'
import Services from "./pages/Services";
import Signup from "./pages/Register";
import AdminRoute from "./features/authentication/AdminRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

//Tạo thể hiện của QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});


function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path='' element={<AdminRoute />}>
              <Route element={<AppLayout />}>
                <Route
                  index
                  element={<Navigate replace to="admin/dashboard" />}
                />
                <Route path="admin/dashboard" element={<Dashboard />} />
                <Route path="admin/bookings" element={<Bookings />} />
                <Route
                  path="admin/bookings/:bookingId"
                  element={<Booking />}
                />
                <Route
                  path="admin/checkin/:bookingId"
                  element={<Checkin />}
                />


                <Route path="admin/cabins" element={<Cabins />} />
                <Route path="admin/users" element={<Users />} />
                <Route path="admin/services" element={<Services />} />
                <Route path="admin/account" element={<Account />} />
              </Route>
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signup />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />

      </QueryClientProvider>
    </DarkModeProvider>

  );
}

export default App;
