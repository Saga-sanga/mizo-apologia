import styles from '../../styles/Home.module.css';
import Layout from '../../components/layout';

export default function Home({ answers }) {
  return (
    <div>
      <Layout>
        <main className={styles.main}>
          <h1>Hello!</h1>
          <p>Information and data</p>
        </main>
      </Layout>
    </div>
  )
}