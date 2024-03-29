import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from '../Header/Header';
import './App.scss'

const ShopPage = lazy(() => import("../pages/ShopPage"));
const CartPage =lazy(() => import("../pages/CartPage"));
const HistoryPage =lazy(() => import("../pages/HistoryPage"));

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Suspense>
          <Routes>
            <Route path="/" element={<ShopPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/history" element={<HistoryPage/>}/>
        </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
