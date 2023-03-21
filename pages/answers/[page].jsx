import Layout from "../../components/layout";
import PaginationPage from "../../components/paginationPage";
import Seo from "../../components/seo";
import { fetchAPI } from "../../lib/api";
import Link from "next/link";
import AnswerList from "../../components/answerList";

function PaginatedPage({answers, answersMeta}) {
  const seo = {
    metaTitle: 'Chhanna',
    metaDescription: `Chhanna te`
  };
  
  return (
    <Layout>
      <Seo seo={seo}/>
      <section>
        <div className="answerSection sectionPaddingTop">
          <div className="uk-container uk-container-large">
            
            <div className="text-sm breadcrumbs">
              <ul className="pl-0">
                <li><Link href='/'>Home</Link></li> 
                <li>Chhannate</li>
              </ul>
            </div>

            <div className='indexTitleContainer'>
              <h1 className="mt-0 px-2 text-4xl">Chhannate</h1>
              <Link href='/topic' legacyBehavior>
                <a className="flex">
                  Topics<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
              </Link>
            </div>
            <PaginationPage meta={answersMeta} link={'answers'}>
              <AnswerList answers={answers}/>
            </PaginationPage>
          </div>
        </div>
      </section>
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
    revalidate: 60 * 60 * 1, // <--- ISR cache: once an hour
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