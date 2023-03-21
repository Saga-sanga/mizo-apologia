import ArticleList from "../../../components/articleList";
import { fetchAPI } from "../../../lib/api";
import Layout from "../../../components/layout";
import Seo from "../../../components/seo";
import Link from "next/link";

const Category = ({ category, articles }) => {
  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} articles`,
  };

  return (
    <Layout>
      <Seo seo={seo} />
      <main className="articleSection sectionPaddingTop">
        <div className="uk-container uk-container-large">
          <div className="text-sm breadcrumbs">
            <ul className="pl-0">
              <li><Link href='/'>Home</Link></li> 
              <li><Link href='/articles'>Thuziakte</Link></li>
              <li><Link href='/category'>Categories</Link></li>
              <li>{category.attributes.name}</li>
            </ul>
          </div>
          <h1 className="mt-0 px-5 text-4xl">{category.attributes.name}</h1>
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
    fields: ['title', 'slug', 'description'],
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
