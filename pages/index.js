import styles from '../styles/Home.module.css'
import Layout from '../components/layout.js'
import Articles from '../components/articleList.js'
import AnswerList from '../components/answerList'
import { fetchAPI } from '../lib/api'
import { getStrapiMedia } from '../lib/media'
import CustomButton from '../components/customButton'

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
              <h1 style={{textAlign: 'left'}} className='hero-title'>{hero.title}</h1>
              <h2 className='hero-subtext'>{hero.subText}</h2>
          </div>
          <section className='answerSection'>
            <div className='answerContentFlex'>
              <h1 
                style={{textAlign:'center'}}>
                  Chhanna Tharte
              </h1>
              <AnswerList answers={ answers} />
              <div style={{textAlign: 'center', marginTop: '3rem'}}>
                <CustomButton linkPath="/answers">Chhanna Dang Chhiar Rawh</CustomButton>              
              </div>
            </div>
          </section>
          <section className='articleSection'>
            <div>
              <h1 
                style={{textAlign:'center'}}>
                  Thuziak Tharte
              </h1>
              <Articles articles={ articles }/>
              <div style={{textAlign: 'center', marginTop: '3rem'}}>
                <CustomButton linkPath="/articles">Thuziak Dang Chhiar Rawh</CustomButton>              
              </div>
            </div>
          </section>
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
