import { useEffect } from 'react';
import useTriviaStore from '../store/useTriviaStore';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const { categories, selectCategory, fetchCategories, fetchSessionToken } =
    useTriviaStore();

  const handleCategoryClick = (category) => {
    selectCategory(category);
    navigate('/quiz', { state: { category } });
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchSessionToken();
      await fetchCategories();
    };
    fetchData();
  }, [fetchCategories, fetchSessionToken]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Trivia!</h1>
      <div className={styles.buttons}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={styles.button}
            onClick={() => handleCategoryClick(category)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
