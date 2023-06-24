import styles from './home.module.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className={styles.container}>
      <div className={styles.member}>
        <Link to="members/home/profile">
          <button className={styles.button}>Members</button>
        </Link>
      </div>
      <div className={styles.admin}>
        <Link to="admins/home/profile">
          <button className={styles.button}>Admins</button>
        </Link>
      </div>
      <div>
        <Link to="superadmins/home/admins">
          <button>Super Admin</button>
        </Link>
      </div>
    </section>
  );
}

export default Home;
