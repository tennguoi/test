import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./layout/Navbar";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import AdminDashboard from "./dashboard/AdminDashboard";
import StaffDashboard from "./dashboard/StaffDashboard";
import DelegateDashboard from "./dashboard/DelegateDashboard";

type UserRole = "administrator" | "staff" | "delegate" | null;

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (values: {
    email: string;
    password: string;
    role: "administrator" | "staff" | "delegate";
  }) => {
    // In a real application, this would validate credentials with a backend
    setIsAuthenticated(true);
    setUserRole(values.role);

    // Extract name from email for demo purposes
    const nameFromEmail = values.email.split("@")[0];
    const formattedName = nameFromEmail
      .split(".")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    setUserName(formattedName);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserName("");
    navigate("/");
  };

  const renderDashboard = () => {
    if (!isAuthenticated) return null;

    switch (userRole) {
      case "administrator":
        return (
          <AdminDashboard
            userName={userName}
            userEmail={`${userName.toLowerCase().replace(" ", ".")}@example.com`}
            onLogout={handleLogout}
          />
        );
      case "staff":
        return (
          <StaffDashboard
            userName={userName}
            userEmail={`${userName.toLowerCase().replace(" ", ".")}@example.com`}
            onLogout={handleLogout}
          />
        );
      case "delegate":
        return (
          <DelegateDashboard
            delegateName={userName}
            delegateEmail={`${userName.toLowerCase().replace(" ", ".")}@example.com`}
            onLogout={handleLogout}
          />
        );
      default:
        return null;
    }
  };

  const toggleRegisterForm = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!isAuthenticated && (
        <Navbar
          isAuthenticated={isAuthenticated}
          userName={userName}
          userRole={userRole || "delegate"}
          onLogin={() => {}}
          onLogout={handleLogout}
        />
      )}

      <main className="flex-1 flex flex-col">
        {!isAuthenticated ? (
          <div className="flex items-center justify-center flex-1 p-4">
            <div className="max-w-md w-full">
              <div className="text-center mb-8">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary flex items-center justify-center mb-4">
                  <span className="text-primary-foreground text-xl font-bold">
                    C
                  </span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Conference Delegate Management
                </h1>
                <p className="text-muted-foreground mt-2">
                  {showRegister
                    ? "Create an account"
                    : "Sign in to access the conference management system"}
                </p>
              </div>
              {showRegister ? (
                <RegisterForm
                  onSubmit={(values) => {
                    console.log("Register form submitted:", values);
                    setShowRegister(false);
                  }}
                  onLogin={toggleRegisterForm}
                />
              ) : (
                <LoginForm
                  onSubmit={handleLogin}
                  onRegister={toggleRegisterForm}
                />
              )}
            </div>
          </div>
        ) : (
          renderDashboard()
        )}
      </main>
    </div>
  );
};

export default Home;
