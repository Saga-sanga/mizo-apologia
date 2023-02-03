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
          <Link href="/category" className="homeLink">

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>Categories
          </Link>
          <h1 style={{marginTop: 0}}>{category.name}</h1>
          <ArticleList articles={articles} />
        </div>
      </main>
    </Layout>
  );
};

export async function getStaticPaths() {
  const categories = await fetchAPI("/categories");

  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug,
      },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const category = (await fetchAPI(`/categories?slug=${params.slug}`))[0];
  const articles = await fetchAPI(`/articles?category.slug=${params.slug}&_sort=published_at:DESC`);

  return {
    props: { category, articles },
    revalidate: 1
  };
}

export default Category;
