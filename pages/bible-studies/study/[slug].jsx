import Layout from "../../../components/layout";
import Seo from "../../../components/seo";
import LessonList from "../../../components/lessonList";
import { fetchAPI } from "../../../lib/api";
import Link from "next/link";
import { getStrapiMedia } from "../../../lib/media";
import Image from "next/image";

// TODO: Add image content
const BibleStudy = ({ study }) => {
  const seo = {
    metaTitle: `${study.attributes.title}`,
    metaDescription: `${study.attributes.title} Lesson List`,
  };

  const bannerImage = study.attributes.image && getStrapiMedia(study.attributes.image);

  return (
    <Layout>
      <Seo seo={seo} />
      <section>
        <div className="answerSection sectionPaddingTop">
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
                <li>{study.attributes.title}</li>
              </ul>
            </div>

            <section className="flex flex-col gap-6 mt-4">
              <div className='indexTitleContainer'>
                <h1 className="mt-0 font-semibold text-2xl md:text-4xl">{study.attributes.title}</h1>
              </div>
              <Image className="w-auto h-auto" src={bannerImage} alt={study.attributes.image.data.attributes.alternativeText} width={720} height={500} priority/>
              <div className="mt-8">
                <div className="divider"><h3>Lessons</h3></div>
                <LessonList study={study}/>
              </div>
            </section>

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
      },
      image: '*'
    }
  });

  console.log(data)

  return {
    props: { study: data[0]},
    revalidate: 20
  }
}

// Get Bible-study slugs as the paths
export async function getStaticPaths() {
  const { data } = await fetchAPI("/bible-studies", {
    fields: ["slug"],
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