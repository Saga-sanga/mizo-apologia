import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import Link from "next/link";
import PaginationPage from "../../components/paginationPage";

const Topic = ({ articles, articlesMeta }) => {
  const seo = {
    metaTitle: 'Thuziak',
    metaDescription: `Thuziak zawng zawng te`,
    shareImage: null
  };

  const answer = false;

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
            <PaginationPage items={articles} meta={articlesMeta} answer={answer}/>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export async function getStaticProps() {
  const { data, meta } = await fetchAPI('/articles', {
    sort: ['id:desc'],
    pagination:{
      page: 1,
      pageSize: 6
    },
    populate: {
      image: "*",
      category: "*",
      author: {
        populate: ['picture']
      }
    }
  });

  return {
    props: { articles: data, articlesMeta: meta}
  };
}

export default Topic;