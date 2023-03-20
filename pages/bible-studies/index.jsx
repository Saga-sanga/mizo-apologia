import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import PaginationPage from "../../components/paginationPage";
import Link from "next/link";
import CardList from "../../components/cardList";
import BibleStudyCard from "../../components/bibleStudyCard";


const BibleStudy = ({ bibleStudies, bibleStudiesMeta }) => {
  const seo = {
    metaTitle: 'Bible Studies',
    metaDescription: `Bible Study list`,
  };

  return (
    <Layout>
      <Seo seo={seo} />
      <section>
        <div className="answerSection">
          <div className="uk-container uk-container-large">
            {/* <Link href="/" legacyBehavior>
              <a className="homeLink flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>Home
              </a>
            </Link> */}
            <div className="text-sm breadcrumbs">
              <ul className="pl-0">
                <li><Link href='/'>Home</Link></li> 
                <li>Bible Studies</li>
              </ul>
            </div>
            <div className='indexTitleContainer'>
              <h1 className="mt-0 px-2 font-semibold text-2xl md:text-4xl">Bible Studies</h1>
              {/* <Link href='/topic' legacyBehavior>
                <a className="flex">
                  Topics<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
              </Link> */}
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

export async function getStaticProps() {
  const { data, meta} = await fetchAPI('/bible-studies', {
    sort: ['id:desc'],
    populate: {
      image: "*"
    },
    pagination:{
      page: 1,
      pageSize: 12
    }
  });

  return {
    props: { bibleStudies: data, bibleStudiesMeta: meta},
  };
}

export default BibleStudy;