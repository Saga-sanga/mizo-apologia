import AnswerList from "../../components/answerList";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import Link from "next/link";

const Topic = ({ answers }) => {
  const seo = {
    metaTitle: 'Chhanna',
    metaDescription: `Chhanna te`,
    shareImage: null
  };

  return (
    <Layout>
      <Seo seo={seo} />
      <main>
        <div className="answerSection">
          <div className="uk-container uk-container-large">
            <Link href="/" className="homeLink" legacyBehavior>
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>Home
              </a>
            </Link>
            <div className='indexTitleContainer'>
              <h1 style={{marginTop: 0}}>Chhannate</h1>
              <Link href='/topic' style={{display: 'flex'}} legacyBehavior>
                <a>
                  Topics<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
              </Link>
            </div>
            <AnswerList answers={answers} />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export async function getStaticProps() {
  const answers = await fetchAPI('/answers', {
    sort: ['id:desc'],
    populate: {
      image: "*",
      topic: "*"
    }
  });

  return {
    props: { answers: answers.data},
    revalidate: 1
  };
}

export default Topic;