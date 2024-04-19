import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import GoodsPage from "./pages/GoodsPage/goodsPage";
import StockPage from "./pages/StockPage/StockPage";
import PurchasesPage from "./pages/PurchasesPage/PurchasesPage";
import BillsPage from "./pages/BillsPage/BillsPage";
import CapitalPage from "./pages/CapitalPage/CapitalPage";
import { useGetCapitalDataQuery } from "./services/capitalApi";
import { useDispatch } from "react-redux";
import { assingAmount } from "./store/slices/currentCapitalSlice";
import { useEffect } from "react";
import ReturnedGoodsPage from "./pages/ReturnedGoodsPage/ReturnedGoodsPage";

function App() {
  const dispatch = useDispatch();

  const { data } = useGetCapitalDataQuery("capital");

  useEffect(() => {
    data?.map((capital) => {
      dispatch(assingAmount(capital.amount));
    });
  }, [data, dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      element: <DashboardPage />,
      children: [
        {
          path: "/stock",
          element: <StockPage />,
        },
        {
          path: "/capital",
          element: <CapitalPage />,
        },
        {
          path: "/goods",
          element: <GoodsPage />,
        },
        {
          path: "/purchases",
          element: <PurchasesPage />,
        },
        {
          path: "/bills",
          element: <BillsPage />,
        },
        {
          path: "/returned",
          element: <ReturnedGoodsPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
