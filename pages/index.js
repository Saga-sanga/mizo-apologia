import styles from '../styles/Home.module.css'
import Layout from '../components/layout.js'
import Articles from '../components/articleList.js'
import AnswerList from '../components/answerList'
import { fetchAPI } from '../lib/api'
import { getStrapiMedia } from '../lib/media'
import CustomButton from '../components/customButton'
import Link from 'next/link'

export default function Home({ answers, articles, hero }) {
  const imageUrl = getStrapiMedia(hero.attributes.heroImage);
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
              <div 
                id='heroButton1'
                className="wrapper-nav nav-link navAskButton"
                style={{
                  marginTop: '5%', 
                  marginLeft: 0,
                  fontSize: '1.3rem'
                }}
              >
                <Link href="/ask">
                  
                    Zawhna Zawt Rawh
                  
                </Link>
              </div>
          </div>
          <section className='answerSection'>
            <div className='answerContentFlex'>
              <div className='indexTitleContainer'>
                <h1>
                    Chhanna Tharte
                </h1>
                <Link href='/topic' passHref style={{display: 'flex'}} legacyBehavior>
                  <a>
                    Topics<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </a>
                </Link>
              </div>
              <AnswerList answers={ answers} />
              <div style={{textAlign: 'center', marginTop: '3rem'}}>
                <CustomButton linkPath="/answers">Chhanna Dang Chhiar Rawh</CustomButton>              
              </div>
            </div>
          </section>
          <section className='articleSection'>
            <div>
              <div className='indexTitleContainer'>
                <h1>
                    Thuziak Tharte
                </h1>
                <Link href='/category' passHref style={{display: 'flex'}} legacyBehavior>
                  <a>
                    Categories<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </a>
                </Link>  
              </div>
              <Articles articles={ articles }/>
              <div style={{textAlign: 'center', marginTop: '3rem'}}>
                <CustomButton linkPath="/articles">Thuziak Dang Chhiar Rawh</CustomButton>              
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  let answers = await fetchAPI("/answers?_sort=id:DESC&_limit=8");
  let articles = await fetchAPI("/articles?_sort=id:DESC&_limit=6");
  const hero = await fetchAPI("/hero", {
    populate: {
      heroImage: "*"
    }
  });
  // let answers = await fetchAPI("/answers?sort=id:desc&pagination[page]=1&pagination[pageSize]=8");
  // let articles = await fetchAPI("/articles?sort=id:desc&pagination[page]=1&pagination[pageSize]=6")

  // console.log(typeof(answers));

  // answers = answers.slice(0,8);
  // articles = articles.slice(0,6);

  return {
    props: {answers: answers.data, articles: articles.data, hero: hero.data},
    revalidate: 1
  };
}
