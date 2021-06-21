import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout.jsx'
import Articles from '../components/articles.jsx'

export default function Home() {
  return (
    <div>
      <Layout>
        <main className={styles.main}>
          <h1 className={styles.card}>Hello!</h1>
          <Articles /> 
        </main>
      </Layout>
    </div>
  )
}
