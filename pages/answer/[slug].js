import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import Moment from "react-moment";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import { getStrapiMedia } from "../../lib/media";

const Answer = ({ answer, topics }) => {
  const imageUrl = getStrapiMedia(answer.image);

  const seo = {
    metaTitle: answer.title,
    metaDescription: answer.description,
    shareImage: answer.image,
    answer: true,
  };

  return (
    <Layout >
      <Seo seo={seo} />
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin banner"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1 className='contentTitleBlur'>{answer.title}</h1>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <ReactMarkdown rehypePlugins={[rehypeRaw]} children={answer.content}/>
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div className="uk-width-expand">
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">{answer.published_at}</Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const answers = await fetchAPI("/answers");

  return {
    paths: answers.map((answer) => ({
      params: {
        slug: answer.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const answers = await fetchAPI(
    `/answers?slug=${params.slug}`
  );
  const topics = await fetchAPI("/topics");

  return {
    props: { answer: answers[0], topics },
    revalidate: 1,
  };
}

export default Answer;