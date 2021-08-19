import AnswerList from "../../components/answerList";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import Link from "next/link";

const Topic = ({ topic, topics, answers, global }) => {
  const seo = {
    metaTitle: topic.name,
    metaDescription: `All ${topic.name} answers`,
  };

  return (
    <Layout topics={topics} global={global}>
      <Seo seo={seo} />
      <div className="answerSection">
        <div className="uk-container uk-container-large">
          <Link href="/topic">
            <a className="homeLink">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Topics
            </a>
          </Link>
          <h1 style={{marginTop: 0}}>{topic.name}</h1>
          <AnswerList answers={answers} />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const topics = await fetchAPI("/topics");

  return {
    paths: topics.map((topic) => ({
      params: {
        slug: topic.slug,
      },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const topic = (await fetchAPI(`/topics?slug=${params.slug}`))[0];
  const topics = await fetchAPI("/topics");
  const answers = await fetchAPI(`/answers?topic.slug=${params.slug}`)
  const global = await fetchAPI("/global");

  return {
    props: { topic, topics, answers, global },
    revalidate: 1,
  };
}

export default Topic;