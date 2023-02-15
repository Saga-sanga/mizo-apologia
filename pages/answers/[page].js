import Layout from "../../components/layout";
import PaginationPage from "../../components/paginationPage";
import Seo from "../../components/seo";
import { fetchAPI } from "../../lib/api";

function PaginatedPage({answers, answersMeta}) {
  const seo = {
    metaTitle: 'Chhanna',
    metaDescription: `Chhanna te`,
    shareImage: null
  };

  return (
    <Layout>
      <Seo seo={seo}/>
      <PaginationPage items={answers} meta={answersMeta}/>
    </Layout>
  )
}

export async function getStaticProps({params}) {
  const page = Number(params.page) || 1;
  const { data, meta } = await fetchAPI('/answers', {
    sort: ['id:desc'],
    pagination:{
      page: page,
      pageSize: 12
    },
    populate: {
      image: "*",
      topic: "*"
    }
  });

  if (!data.length) {
    return {
      notFound: true
    }
  }


  // Redirect the first page to `/answers` to avoid duplicated content
  if (page === 1) {
    return {
      redirect: {
        destination: '/answers',
        permanent: false,
      },
    }
  }

  return {
    props: { answers: data, answersMeta: meta},
    revalidate: 60 * 60 * 12, // <--- ISR cache: twice a day
  };
}

export async function getStaticPaths() {
  return {
    // Prerender the next 5 pages after the first page, which is handled by the index page.
    // Other pages will be prerendered at runtime.
    paths: Array.from({ length: 5 }).map((_, i) => `/answers/${i + 2}`),
    // Block the request for non-generated pages and cache them in the background
    fallback: 'blocking',
  }
}

export default PaginatedPage;