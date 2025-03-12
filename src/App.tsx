import { Suspense, lazy } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import Home from "./components/home";
import routes from "./tempo-routes";
import AdminLayout from "./components/layout/AdminLayout";

// Lazy load admin pages
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const DelegateManagement = lazy(
  () => import("./components/delegates/DelegateManagement"),
);
const ConferenceManagement = lazy(
  () => import("./components/conferences/ConferenceManagement"),
);
const RegistrationManagement = lazy(
  () => import("./components/registrations/RegistrationManagement"),
);
const CheckinSystem = lazy(() => import("./components/checkin/CheckinSystem"));
const Settings = lazy(() => import("./pages/admin/Settings"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        {/* Tempo routes */}
        {import.meta.env.VITE_TEMPO && useRoutes(routes)}
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <AdminLayout onLogout={() => console.log("Logout clicked")} />
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="delegates" element={<DelegateManagement />} />
            <Route path="conferences" element={<ConferenceManagement />} />
            <Route path="registrations" element={<RegistrationManagement />} />
            <Route path="checkin" element={<CheckinSystem />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Add this before any catchall route */}
          {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
