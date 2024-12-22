import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material"; // Import MUI components for error message
import credentials from "../data/Cred.js";
// Define your theme with dark mode
const darkTheme = createTheme({
  palette: {
    mode: "dark", // This enables dark mode
  },
});

const providers = [{ id: "credentials", name: "Email and password" }];

// SignIn function to validate credentials
// SignIn function to validate credentials
const signIn = async (
  provider,
  formData,
  setIsLoggedIn,
  navigate,
  setErrorMessage
) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const email = formData?.get("email");
      const password = formData?.get("password");

      // Find the matching user in the credentials array
      const user = credentials.find(
        (cred) => cred.email === email && cred.password === password
      );

      if (user) {
        // If a match is found, extract the department from the email
        const department = email?.split("--")[0]?.replace("DEPT-OF-", "");

        // If the department is successfully extracted, proceed
        setIsLoggedIn(true);
        navigate("/select-department", { state: { dept: department } }); // Pass dept as state
        resolve({
          type: "CredentialsSignin",
          error: null, // No error for successful login
        });
      } else {
        // If no match is found, reject the promise with an error
        setErrorMessage("You are not authorized to access this site."); // Set the error message
        reject({
          type: "CredentialsSignin",
          error: "Invalid credentials.",
        });
      }
    }, 300); // Simulate server delay
  });

  return promise;
};

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate(); // Use navigate for redirection
  const [errorMessage, setErrorMessage] = React.useState(""); // State to store error message

  return (
    <ThemeProvider theme={darkTheme}>
      <AppProvider theme={darkTheme}>
        {/* Pass signIn function with required parameters */}
        <SignInPage
          signIn={(provider, formData) =>
            signIn(provider, formData, setIsLoggedIn, navigate, setErrorMessage)
          }
          providers={providers}
        />
        {/* Display error message as Snackbar if credentials don't match */}
        {errorMessage && (
          <Snackbar
            open={!!errorMessage} // Open the Snackbar if there's an error
            autoHideDuration={6000} // Hide after 6 seconds
            onClose={() => setErrorMessage("")} // Clear the error message when Snackbar is closed
          >
            <Alert
              onClose={() => setErrorMessage("")}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        )}
      </AppProvider>
    </ThemeProvider>
  );
}
