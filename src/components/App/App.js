import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from '../Header/Header';
import ShopPage from "../pages/ShopPage";
import './App.scss'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Suspense>
          <Routes>
            <Route path="/" element={<ShopPage/>}/>
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
