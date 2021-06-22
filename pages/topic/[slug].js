import Articles from "../../components/articles";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

const Topic = ({ topic, topics, global }) => {
  const seo = {
    metaTitle: topic.name,
    metaDescription: `All ${topic.name} articles`,
  };

  return (
    <Layout topics={topics} global={global}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{topic.name}</h1>
          <Articles articles={topic.articles} />
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
  const global = await fetchAPI("/global");

  return {
    props: { topic, topics, global },
    revalidate: 1,
  };
}

export default Topic;