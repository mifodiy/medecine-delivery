import Header from '../Header/Header';
import ShopList from '../ShopList/ShopList';
import ProductList from '../ProductList/ProductList';
import './App.scss'

function App() {
  return (
    <div className="app">
      <Header/>
      <div className='app__wrapper'>
        <ShopList />
        <ProductList />
      </div>

    </div>
  );
}

export default App;
