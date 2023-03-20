import Layout from "../../../components/layout";
import Seo from "../../../components/seo";
import LessonList from "../../../components/lessonList";
import { fetchAPI } from "../../../lib/api";
import Link from "next/link";

const BibleStudy = ({ study }) => {
  const seo = {
    metaTitle: `${study.attributes.title}`,
    metaDescription: `${study.attributes.title} Lesson List`,
  };

  return (
    <Layout>
      <Seo seo={seo} />
      <section>
        <div className="answerSection">
          <div className="uk-container uk-container-large min-h-[38vh]">
            <div className="text-sm breadcrumbs">
              <ul className="pl-0">
                <li>
                  <Link href="/" legacyBehavior>
                    <a>
                      Home
                    </a>
                  </Link>
                </li> 
                <li>
                  <Link href='/bible-studies'>Bible Studies</Link>
                </li> 
                <li>Lessons</li>
              </ul>
            </div>
            <div className='indexTitleContainer'>
              <h1 className="mt-0 px-2 font-semibold text-2xl md:text-4xl">{study.attributes.title}</h1>
              {/* <Link href='/topic' legacyBehavior>
                <a className="flex">
                  Topics<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
              </Link> */}
            </div>
            <LessonList study={study}/>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Get Lessons of the Bible-study
export async function getStaticProps({ params }) {
  const { data } = await fetchAPI("/bible-studies", {
    filters: {
      slug: {
        $eq: params.slug
      }
    },
    populate: {
      lessons: {
        fields: ['slug', 'title']
      }
    }
  });

  return {
    props: { study: data[0]},
    revalidate: 20
  }
}

// Get Bible-study slugs as the paths
export async function getStaticPaths() {
  const { data } = await fetchAPI("/bible-studies", {
    fields: ["slug"]
  });

  return {
    paths: data.map(study => ({
      params: {
        slug: study.attributes.slug
      }
    })),
    fallback: 'blocking'
  };
}

export default BibleStudy;