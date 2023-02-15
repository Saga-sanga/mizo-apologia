import AnswerList from "../../../components/answerList";
import { fetchAPI } from "../../../lib/api";
import Layout from "../../../components/layout";
import Seo from "../../../components/seo";
import Link from "next/link";

const Topic = ({ topic, answers}) => {
  const seo = {
    metaTitle: topic.attributes.name,
    metaDescription: `All ${topic.attributes.name} answers`,
  };

  return (
    <Layout>
      <Seo seo={seo} />
      <main className="answerSection">
        <div className="uk-container uk-container-large">
          <Link href="/topic" className="homeLink" legacyBehavior>
            <a className="flex relative -top-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>Topics
            </a>
          </Link>
          <h1 className="mt-0 px-5 text-4xl">{topic.attributes.name}</h1>
          <AnswerList answers={answers} />
        </div>
      </main>
    </Layout>
  );
};

export async function getStaticPaths() {
  const topics = await fetchAPI('/topics', {
    fields: ['slug']
  });

  return {
    paths: topics.data.map((topic) => ({
      params: {
        slug: topic.attributes.slug,
      },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const topic = await fetchAPI(`/topics`, {
    filters: {
      slug: params.slug
    }
  });

  // ?topic.slug=${params.slug}&_sort=published_at:DESC
  const answers = await fetchAPI(`/answers`, {
    filters: {
      topic: {
        slug: params.slug
      }
    },
    sort: ['publishedAt:desc'],
    populate: {
      image: "*",
      topic: "*"
    }
  });

  return {
    props: { topic: topic.data[0], answers: answers.data},
    revalidate: 20,
  };
}

export default Topic;