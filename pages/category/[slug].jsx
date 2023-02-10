import ArticleList from "../../components/articleList";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import Link from "next/link";

const Category = ({ category, articles }) => {
  const seo = {
    metaTitle: category.name,
    metaDescription: `All ${category.name} articles`,
  };

  return (
    <Layout>
      <Seo seo={seo} />
      <main className="articleSection">
        <div className="uk-container uk-container-large">
          <Link href="/category" className="homeLink" legacyBehavior>
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>Categories
            </a>
          </Link>
          <h1 style={{marginTop: 0}}>{category.attributes.name}</h1>
          <ArticleList articles={articles} />
        </div>
      </main>
    </Layout>
  );
};

export async function getStaticPaths() {
  const categories = await fetchAPI("/categories");

  return {
    paths: categories.data.map((category) => ({
      params: {
        slug: category.attributes.slug,
      },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const category = (await fetchAPI(`/categories`, {
    filters: {
      slug: params.slug
    }
  }));

  const articles = await fetchAPI(`/articles`, {
    filters: {
      category: {
        slug: params.slug
      }
    },
    sort: ['publishedAt:desc'],
    populate: {
      image: "*",
      category: "*",
      author: {
        populate: ['picture']
      }
    }
  });

  return {
    props: { category: category.data[0], articles: articles.data },
    revalidate: 1
  };
}

export default Category;
