import ArticleList from "../../components/articleList";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

const Category = ({ category, categories, articles, global }) => {
  const seo = {
    metaTitle: category.name,
    metaDescription: `All ${category.name} articles`,
  };

  return (
    <Layout categories={categories} global={global}>
      <Seo seo={seo} />
      <div className="articleSection">
        <div className="uk-container uk-container-large">
          <h1>{category.name}</h1>
          <ArticleList articles={articles} />
        </div>
      </div>
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
  const categories = await fetchAPI("/categories");
  const articles = await fetchAPI(`/articles?category.slug=${params.slug}`)
  const global = await fetchAPI("/global");

  return {
    props: { category, categories, articles, global },
    revalidate: 60,
  };
}

export default Category;
