import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import { getStrapiMedia } from "../../lib/media";
import Link from "next/link";
import LessonList from "../../components/lessonList";

const Article = ({ lesson, bibleStudy }) => {
  const pdfUrl = lesson.attributes.download.data && getStrapiMedia(lesson.attributes.download);

  // console.log(lesson);

  const seo = {
    metaTitle: `${lesson.attributes.title} | Bible Study`,
    metaDescription: lesson.attributes.description,
    article: false,
  };

  return (
    <Layout >
      <Seo seo={seo} />
      <main>
       <div className="text-sm breadcrumbs max-w-4xl">
          <ul>
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
            <li>
              <Link href={`/bible-studies/study/${bibleStudy.attributes.slug}`}>
                {bibleStudy.attributes.title}
              </Link>
            </li>
            <li>{lesson.attributes.title}</li>
          </ul>
        </div>

        <div className="uk-section pt-4">
          <div className="bannerTitle">
          </div>
          <div className="uk-container textAreaContainer">
            <div>
              {/* <Link href="/lessons" legacyBehavior>
                <a className="articleLink">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>Thuziakte
                </a>
              </Link> */}
            </div>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={lesson.attributes.content}/>
            
            <hr className="uk-divider-small" />
            {
              pdfUrl ? 
                <Link className="btn btn-primary hover:text-white" href={pdfUrl} target='_blank' download>Download</Link> : 
                ''
            }
           
           <div className="mt-14">
             <div className="divider"><h3>Lessons</h3></div>
             
             <LessonList study={bibleStudy} activeSlug={lesson.attributes.slug}/>
           </div>
          </div>

        </div>
      </main>
    </Layout>
  );
};

export async function getStaticPaths() {
  const lessons = await fetchAPI("/lessons", { fields: ["slug"] });

  return {
    paths: lessons.data.map((lesson) => ({
      params: {
        slug: lesson.attributes.slug,
      },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const lessons = await fetchAPI(`/lessons`, {
      filters: {
        slug: params.slug,
      },
      populate: {
        download: "*",
        bible_study: "*"
      }
    }
  );

  const bibleStudySlug = lessons.data[0].attributes.bible_study.data.attributes.slug;

  const bibleStudy = await fetchAPI("/bible-studies", {
    filters: {
      slug: {
        $eq: bibleStudySlug
      }
    },
    populate: {
      lessons: {
        fields: ['slug', 'title']
      }
    }
  });

  return {
    props: { lesson: lessons.data[0], bibleStudy: bibleStudy.data[0]},
    revalidate: 20
  };
}

export default Article;