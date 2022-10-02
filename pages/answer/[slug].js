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
      <main>
        {/* <div
          id="banner"
          className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin banner"
          data-src={imageUrl}
          data-srcset={imageUrl}
          data-uk-img
        >
          <h1 className='contentTitleBlur'>{answer.title}</h1>
        </div> */}
        <div className="uk-section" style={{padding: '55px 12px'}}>
          <div className="bannerTitle">
            <h1>{answer.title}</h1>
            <Image src={imageUrl || placeholder} alt="title image" width='1400' height='700' objectFit="cover"/>
          </div>
          <div className='uk-container textAreaContainer'>
            <div>
              <Link href="/answers">
                <a className="articleLink">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  Chhannate
                </a>
              </Link>
            </div>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={answer.content}/>
            {
              (answer.endNote === null || answer.endNote == '') ? '' 
              : <div className="endNote">
                  <hr />
                  <ReactMarkdown rehypePlugins={[rehypeRaw]} children={answer.endNote}/>
                </div>
            }
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
      </main>
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
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const answers = await fetchAPI(
    `/answers?slug=${params.slug}`
  );
  // const topics = await fetchAPI("/topics");

  return {
    props: { answer: answers[0] },
    revalidate: 1
  };
}

export default Answer;