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
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 8,
            maxWidth: '1000px',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <button>blah</button>
          <button>blah</button>
          <button>blah</button>
          <button>blah</button>
        </div>
      </div>
      <h1 className={styles.title}>Welcome to Trivia!</h1>

      <div className={styles.buttons}>
        {categories
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((category) => (
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
