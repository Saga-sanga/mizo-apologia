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
    article: false,
  };

  return (
    <Layout >
      <Seo seo={seo} />
      <main>
        <div className="text-sm breadcrumbs pt-8">
          <ul>
            <li><Link href='/'>Home</Link></li> 
            <li><Link href='/answers'>Chhannate</Link></li>
            <li>{answer.attributes.title}</li>
          </ul>
        </div>

        <div className="uk-section pt-4">
          <div className="bannerTitle">
            <h1 className="text-center self-center">{answer.attributes.title}</h1>

            <div className="mb-10">
              <hr className="uk-divider-small" />
              <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
                <div className="uk-width-expand">
                  <p className="uk-text-meta uk-margin-remove-top">
                    <Moment format="MMM Do YYYY">{answer.attributes.publishedAt}</Moment>
                  </p>
                </div>
              </div>
            </div>

            <Image src={answer.attributes.image.data.attributes.hasOwnProperty("url") ? imageUrl : placeholder.src} alt="title image" width='1400' height='700' objectFit="cover"/>
          </div>
          <div className='uk-container textAreaContainer'>
            
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={answer.attributes.content}/>
            {
              (answer.attributes.endNote === null || answer.attributes.endNote == '') ? '' 
              : <div className="endNote">
                  <hr />
                  <ReactMarkdown rehypePlugins={[rehypeRaw]} children={answer.attributes.endNote}/>
                </div>
            }
            
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
  const answers = await fetchAPI(`/answers`, {
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
    revalidate: 20
  };
}

export default Answer;