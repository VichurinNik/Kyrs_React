import { rickAndMortyProducts } from './data';
import ProductCard from './components/ProductCard';
import './App.css'; // Импортируем стили

function App() {

  return (
    <>
      <h1>Магазин Рика и Морти</h1>
      {/* Контейнер для галереи */}
      <div className="gallery-container">
        {/* Проходимся по массиву и рендерим каждый элемент */}
        {rickAndMortyProducts.map((product) => (
          <ProductCard
            key={product.id} // Обязательный пропс key
            product={product} // Передаем объект товара целиком
          />
        ))}
      </div>
    </>
  );
}

export default App;