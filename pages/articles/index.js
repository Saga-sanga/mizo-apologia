import ArticleList from "../../components/articleList";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import Link from "next/link";

const Topic = ({ articles }) => {
  const seo = {
    metaTitle: 'Thuziak',
    metaDescription: `Thuziak zawng zawng te`,
    shareImage: null
  };

  return (
    <Layout>
      <Seo seo={seo} />
      <main>
        <div className="articleSection">
          <div className="uk-container uk-container-large">
            <Link href="/" legacyBehavior>
              <a className="homeLink flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>Home
              </a>
            </Link>
            <div className='indexTitleContainer'>
              <h1 className="mt-0 px-2 text-4xl">Thuziakte</h1>
              <Link href='/category' legacyBehavior>
                <a className="flex">
                  Categories<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
              </Link>
            </div>  
            <ArticleList articles={articles} />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export async function getStaticProps() {
  const articles = await fetchAPI('/articles', {
    sort: ['id:desc'],
    populate: {
      image: "*",
      category: "*",
      author: {
        populate: ['picture']
      }
    }
  });

  return {
    props: { articles: articles.data},
    revalidate: 1
  };
}

export default Topic;