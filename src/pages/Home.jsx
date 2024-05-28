import { useEffect } from 'react';
import useTriviaStore from '../store/useTriviaStore';
import styles from '../styles/home.module.css';

const Home = () => {
  const { categories, fetchCategories, selectCategory } = useTriviaStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Trivia!</h1>
        <div className={styles.buttons}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={styles.button}
              onClick={() => selectCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
