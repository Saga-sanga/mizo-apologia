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

      <div className="text-sm breadcrumbs">
        <ul className="pl-4 max-w-5xl mx-auto">
          <li><Link href='/'>Home</Link></li> 
          <li><Link href='/answers'>Chhannate</Link></li>
          <li><Link href='/topic'>Topics</Link></li>
          <li>{topic.attributes.name}</li>
        </ul>
      </div>

      <main className="answerSection sectionPaddingTop">
        <div className="uk-container uk-container-large">
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
    fields: ['title', 'slug'],
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