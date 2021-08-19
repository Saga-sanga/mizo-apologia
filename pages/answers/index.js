import AnswerList from "../../components/answerList";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import Link from "next/link";

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
          <Link href="/">
            <a className="homeLink">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Home
            </a>
          </Link>
          <h1 style={{marginTop: 0}}>All Answers</h1>
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
    revalidate: 1
  };
}

export default Topic;