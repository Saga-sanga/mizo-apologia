import AnswerList from "../../components/answerList";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

const Topic = ({ topic, topics, answers, global }) => {
  const seo = {
    metaTitle: topic.name,
    metaDescription: `All ${topic.name} answers`,
  };

  return (
    <Layout topics={topics} global={global}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{topic.name}</h1>
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
    fallback: false,
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