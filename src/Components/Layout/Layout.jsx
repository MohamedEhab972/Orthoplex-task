import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { ToastBar, Toaster } from "react-hot-toast";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
        containerStyle={{
          top: 130,
          left: 20,
          bottom: 20,
          right: 20,
        }}
      >
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible
                ? "custom-enter 1s ease"
                : "custom-exit 1s ease",
            }}
          />
        )}
      </Toaster>
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}
