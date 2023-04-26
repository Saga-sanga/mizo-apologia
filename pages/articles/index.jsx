import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import Link from "next/link";
import PaginationPage from "../../components/paginationPage";
import ArticleList from "../../components/articleList";

const Topic = ({ articles, articlesMeta }) => {
  const seo = {
    metaTitle: "Thuziak",
    metaDescription: `Thuziak zawng zawng te`,
  };

  return (
    <Layout>
      <Seo seo={seo} />
      <main>
        <div className="articleSection sectionPaddingTop">
          <div className="uk-container uk-container-large">
            <div className="text-sm breadcrumbs">
              <ul className="pl-0">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>Thuziakte</li>
              </ul>
            </div>

            <div className="indexTitleContainer">
              <h1 className="mt-0 px-2 font-semibold text-2xl md:text-4xl">
                Thuziakte
              </h1>
              <Link href="/category" legacyBehavior>
                <a className="flex">
                  Categories
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
              </Link>
            </div>
            <PaginationPage meta={articlesMeta} link={"articles"}>
              <ArticleList articles={articles} />
            </PaginationPage>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export async function getStaticProps() {
  const { data, meta } = await fetchAPI("/articles", {
    sort: ["id:desc"],
    pagination: {
      page: 1,
      pageSize: 6,
    },
    populate: {
      image: "*",
      category: "*",
      author: {
        populate: ["picture"],
      },
    },
  });

  return {
    props: { articles: data, articlesMeta: meta },
    revalidate: 60 * 60 * 0.5, // <--- ISR cache: twice an hour
  };
}

export default Topic;
