import styles from '../styles/Home.module.css'
import Layout from '../components/layout.js'
import Articles from '../components/articleList.js'
import AnswerList from '../components/answerList'
import { fetchAPI } from '../lib/api'
import { getStrapiMedia } from '../lib/media'
import CustomButton from '../components/customButton'
import Image from 'next/image'
import Link from 'next/link'

export default function Home({ answers, articles, hero }) {
  const imageUrl = getStrapiMedia(hero.attributes.heroImage);
  return (
    <div>
      <Layout>
        <main className={styles.main}>
          <header
          // id="banner"
          className="relative w-full h-[90vh] grid place-items-center bg-cyan-600"
          // data-src={imageUrl}
          // data-srcset={imageUrl}
          // data-uk-img
          >
            <Image src={imageUrl} alt="Church with view of sky" className='object-cover opacity-60' fill/>
            <section className='absolute flex flex-col items-start gap-5 max-w-5xl px-8 mb-8'>
              <h1 className='hero-title text-left text-white font-bold'>{hero.attributes.title}</h1>
              <h2 className='hero-subtext text-white'>{hero.attributes.subText}</h2>
              <div
                id='heroButton1'
                className="wrapper-nav nav-link navAskButton bg-rose-600"
                style={{
                  marginTop: '5%',
                  marginLeft: 0,
                  fontSize: '1.2rem'
                }}
              >
                <Link href="/ask">
                    Zawhna Zawt Rawh
                </Link>
              </div>
            </section>
          </header>
          <section className='answerSection'>
            <div className='answerContentFlex gap-5'>
              <div className='indexTitleContainer'>
                <h1 className='text-2xl md:text-4xl'>
                    Chhanna Tharte
                </h1>
                <Link href='/topic' passHref legacyBehavior>
                  <a className='flex'>
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
            <div className='flex flex-col gap-5'>
              <div className='indexTitleContainer'>
                <h1 className='text-2xl md:text-4xl'>
                    Thuziak Tharte
                </h1>
                <Link href='/category' passHref  legacyBehavior>
                  <a className='flex'>
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
  let answers = await fetchAPI("/answers", {
    sort: ['id:desc'],
    fields: ['title', 'slug', 'publishedAt'],
    pagination: {
      limit: 8
    },
    populate: {
      image: "*",
      topic: "*"
    }
  });
  let articles = await fetchAPI("/articles", {
    sort: ['id:desc'],
    fields: ['title', 'slug', 'description', 'publishedAt'],
    pagination: {
      limit: 6
    },
    populate: {
      image: "*",
      category: "*",
      author: {
        populate: ['picture']
      }
    }
  });
  const hero = await fetchAPI("/hero", {
    populate: {
      heroImage: "*"
    }
  });
  
  return {
    props: {answers: answers.data, articles: articles.data, hero: hero.data},
    revalidate: 60
  };
}
