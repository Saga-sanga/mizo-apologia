import styles from '../styles/Home.module.css'
import Layout from '../components/layout.js'
import Articles from '../components/articles.js'
import { fetchAPI } from '../lib/api'

export default function Home({ answers }) {
  return (
    <div>
      <Layout>
        <main className={styles.main}>
          <h1 className={styles.card}>Hello!</h1>
          <Articles articles={ answers }/> 
        </main>
      </Layout>
    </div>
  )
}

export async function getStaticProps() {
  const answers = await fetchAPI("/answers");

  return {
    props: {answers},
    revalidate: 1
  };
}
