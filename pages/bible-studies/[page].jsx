import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import PaginationPage from "../../components/paginationPage";
import Link from "next/link";
import CardList from "../../components/cardList";
import BibleStudyCard from "../../components/bibleStudyCard";


const BibleStudies = ({ bibleStudies, bibleStudiesMeta }) => {
  const seo = {
    metaTitle: 'Bible Studies',
    metaDescription: `Bible Studies om te in list chhuak`,
  };

  return (
    <Layout>
      <Seo seo={seo} />
      <section>
        <div className="answerSection">
          <div className="uk-container uk-container-large">
            <Link href="/" legacyBehavior>
              <a className="homeLink flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>Home
              </a>
            </Link>
            <div className='indexTitleContainer'>
              <h1 className="mt-0 px-2 font-semibold text-2xl md:text-4xl">Bible Studies</h1>
           
            </div>
            <PaginationPage meta={bibleStudiesMeta} link={'bible-studies'}>
              <CardList>
                {bibleStudies.map(study => <BibleStudyCard study={study} key={study.attributes.slug}/>)}
              </CardList>
            </PaginationPage>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticProps({params}) {
  const page = Number(params.page) || 1;
  const { data, meta} = await fetchAPI('/bible-studies', {
    sort: ['id:desc'],
    populate: {
      image: "*"
    },
    pagination:{
      page,
      pageSize: 12
    }
  });

  if (!data.length) {
    return {
      notFound: true
    }
  }

  // Redirect the first page to `/bible-studies` to avoid duplicated content
  if (page === 1) {
    return {
      redirect: {
        destination: '/bible-studies',
        permanent: false,
      },
    }
  }

  return {
    props: { bibleStudies: data, bibleStudiesMeta: meta},
    revalidate: 60 * 60 * 1, // <--- ISR cache: once an hour
  };
}

export async function getStaticPaths() {
    return {
      // Prerender the next 5 pages after the first page, which is handled by the index page.
      // Other pages will be prerendered at runtime.
      paths: Array.from({ length: 5 }).map((_, i) => `/bible-studies/${i + 2}`),
      // Block the request for non-generated pages and cache them in the background
      fallback: 'blocking',
    }
  }

export default BibleStudies;