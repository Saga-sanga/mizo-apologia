import AnswerList from "../../components/answerList";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

const Topic = ({ answers, global }) => {
  const seo = {
    metaTitle: 'Answers',
    metaDescription: `All answers`,
  };

  return (
    <Layout global={global}>
      <Seo seo={seo} />
      <div className="answerSection">
        <div className="uk-container uk-container-large">
          <h1>All Answers</h1>
          <AnswerList answers={answers} />
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
  // const topics = await fetchAPI("/topics");
  const answers = await fetchAPI('/answers?_sort=id:DESC');
  const global = await fetchAPI("/global");

  return {
    props: { answers, global },
    revalidate: 60,
  };
}

export default Topic;