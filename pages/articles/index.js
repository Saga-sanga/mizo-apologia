import ArticleList from "../../components/articleList";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

const Topic = ({ categories, articles, global }) => {
  const seo = {
    metaTitle: 'Answers',
    metaDescription: `All articles`,
  };

  return (
    <Layout global={global}>
      <Seo seo={seo} />
      <div className="articleSection">
        <div className="uk-container uk-container-large">
          <h1>All Articles</h1>
          <ArticleList articles={articles} />
        </div>
      </div>
    </Layout>
  );
};

// export async function getStaticPaths() {
//   const topics = await fetchAPI("/topics");

//   return {
//     paths: topics.map((topic) => ({
//       params: {
//         slug: topic.slug,
//       },
//     })),
//     fallback: false,
//   };
// }

export async function getStaticProps() {
  const categories = await fetchAPI("/categories");
  const articles = await fetchAPI('/articles?_sort=id:DESC');
  const global = await fetchAPI("/global");

  return {
    props: { categories, articles, global },
    revalidate: 1,
  };
}

export default Topic;