import styles from '../styles/Home.module.css'
import Layout from '../components/layout.js'
import Articles from '../components/articles.js'
import Answers from '../components/answers'
import { fetchAPI } from '../lib/api'
import { getStrapiMedia } from '../lib/media'

export default function Home({ answers, articles, hero }) {
  const imageUrl = getStrapiMedia(hero.heroImage);
  return (
    <div>
      <Layout>
        <main className={styles.main}>
          <div
          id="banner"
          className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin banner hero-container"
          data-src={imageUrl}
          data-srcset={imageUrl}
          data-uk-img
          >
              <h1 className='hero-title'>{hero.title}</h1>
              <h2 className='hero-subtext'>{hero.subText}</h2>
          </div>
          <h1>Chhanna Thar Te</h1>
          <Answers answers={ answers} />
          <h1>Latest Articles</h1>
          <Articles articles={ articles }/> 
        </main>
      </Layout>
    </div>
  )
}

export async function getStaticProps() {
  let answers = await fetchAPI("/answers?_sort=id:DESC");
  let articles = await fetchAPI("/articles?_sort=id:DESC");
  const hero = await fetchAPI("/hero");

  answers = answers.slice(0,8);
  articles = articles.slice(0,6);

  return {
    props: {answers, articles, hero},
    revalidate: 1
  };
}
