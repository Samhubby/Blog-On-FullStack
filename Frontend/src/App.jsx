import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { authService } from "./api/authService.js";
import { login } from "./store/authSlice.js";
import { Loader } from "./components/index.js";
import Footer from "./components/footer/Footer.jsx";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const noFooterPaths = ["/add-blogs"];
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await authService.checkAuth();
        if (response.success) {
          dispatch(login(response.data));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    checkAuthentication();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <Header />
      <Outlet />
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
