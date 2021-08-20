import ArticleList from "../../components/articleList";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import Link from "next/link";

const Topic = ({ articles, global }) => {
  const seo = {
    metaTitle: 'Thuziak',
    metaDescription: `Thuziak zawng zawng te`,
  };

  return (
    <Layout global={global}>
      <Seo seo={seo} />
      <div className="articleSection">
        <div className="uk-container uk-container-large">
          <Link href="/">
            <a className="homeLink">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Home
            </a>
          </Link>
          <div className='indexTitleContainer'>
          <h1 style={{marginTop: 0}}>Thuziakte</h1>
            <Link href='/category'>
              <a style={{display: 'flex'}}>
                Categories
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>
            </Link>
          </div>  
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
  // const categories = await fetchAPI("/categories");
  const articles = await fetchAPI('/articles?_sort=id:DESC');
  const global = await fetchAPI("/global");

  return {
    props: { articles, global },
    revalidate: 1
  };
}

export default Topic;