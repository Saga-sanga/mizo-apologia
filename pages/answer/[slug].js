import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import Moment from "react-moment";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import { getStrapiMedia } from "../../lib/media";
import Link from "next/link";
import Image from "next/image"
import placeholder from "../../public/placeholder.png";

const Answer = ({ answer }) => {
  const imageUrl = getStrapiMedia(answer.attributes.image);

  const seo = {
    metaTitle: answer.attributes.title,
    metaDescription: answer.attributes.description,
    shareImage: answer.attributes.image,
    article: true,
  };

  return (
    <Layout >
      <Seo seo={seo} />
      <main>
        <div className="uk-section" style={{padding: '55px 12px'}}>
          <div className="bannerTitle">
            <h1>{answer.attributes.title}</h1>
            <Image src={answer.attributes.image.data.attributes.hasOwnProperty("url") ? imageUrl : placeholder.src} alt="title image" width='1400' height='700' objectFit="cover"/>
          </div>
          <div className='uk-container textAreaContainer'>
            <div>
              <Link href="/answers"  legacyBehavior>
                <a className="articleLink">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>Chhannate
                </a>
              </Link>
            </div>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={answer.attributes.content}/>
            {
              (answer.attributes.endNote === null || answer.attributes.endNote == '') ? '' 
              : <div className="endNote">
                  <hr />
                  <ReactMarkdown rehypePlugins={[rehypeRaw]} children={answer.attributes.endNote}/>
                </div>
            }
            <hr className="uk-divider-small" />
            <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
              <div className="uk-width-expand">
                <p className="uk-text-meta uk-margin-remove-top">
                  <Moment format="MMM Do YYYY">{answer.attributes.publishedAt}</Moment>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export async function getStaticPaths() {
  const answers = await fetchAPI("/answers", {fields: ['slug']});

  return {
    paths: answers.data.map((answer) => ({
      params: {
        slug: answer.attributes.slug,
      },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const answers = await fetchAPI(`/answers?`, {
    filters: {
      slug: params.slug
    },
    populate: {
      image: "*",
      topic: "*"
    }
  });

  return {
    props: { answer: answers.data[0] },
    revalidate: 1
  };
}

export default Answer;