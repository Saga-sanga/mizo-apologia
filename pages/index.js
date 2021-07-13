import styles from '../styles/Home.module.css'
import Layout from '../components/layout.js'
import Articles from '../components/articles.js'
import Answers from '../components/answers'
import { fetchAPI } from '../lib/api'

export default function Home({ answers, articles }) {
  return (
    <div>
      <Layout>
        <main className={styles.main}>
          <h1>Welcome to Our Website!</h1>
          <h2>Zawhna Leh a Chhana</h2>
          <Answers answers={ answers} />
          <h2>Articles</h2>
          <Articles articles={ articles }/> 
        </main>
      </Layout>
    </div>
  )
}

export async function getStaticProps() {
  let answers = await fetchAPI("/answers?_sort=id:DESC");
  let articles = await fetchAPI("/articles?_sort=id:DESC");

  answers = answers.slice(0,5);
  articles = articles.slice(0,5);

  return {
    props: {answers, articles},
    revalidate: 1
  };
}
