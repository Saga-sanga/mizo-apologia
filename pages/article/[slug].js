import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import Moment from "react-moment";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import styles from '../../styles/Home.module.css';
// import Image from "../../components/image";
import Image from 'next/image';
import Seo from "../../components/seo";
import { getStrapiMedia } from "../../lib/media";
import Link from "next/link";
import placeholder from "../../public/placeholder.png";

const Article = ({ article }) => {
  const authorImageUrl = getStrapiMedia(article.attributes.author.data.attributes.picture);
  const imageUrl = getStrapiMedia(article.attributes.image);

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  };

  return (
    <Layout >
      <Seo seo={seo} />
      <main>
        <div className="uk-section" style={{padding: '55px 12px'}}>
          <div className="bannerTitle">
            <h1>{article.attributes.title}</h1>
            <Image src={article.attributes.image.data.attributes.hasOwnProperty("url") ? imageUrl : placeholder.src} alt="title image" width='1400' height='700' style={{objectFit: "cover"}}/>
          </div>
          <div className="uk-container textAreaContainer">
            <div>
              <Link href="/articles" legacyBehavior>
                <a className="articleLink">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>Thuziakte
                </a>
              </Link>
            </div>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={article.attributes.content}/>
            {
              (article.attributes.endNote === null || article.attributes.endNote == '') ? '' 
              : <div className="endNote">
                  <hr />
                  <ReactMarkdown rehypePlugins={[rehypeRaw]} children={article.attributes.endNote}/>
                </div>
            }
            <hr className="uk-divider-small" />
            <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
              <div>
                {article.attributes.author.data.attributes.picture && (
                  <Image
                    src={authorImageUrl}
                    className={styles.authorImage}
                    alt="author image"
                    objectFit="cover"
                    style={{objectFit: 'cover'}}
                    height="45"
                    width="45"
                  />
                )}
              </div>
              <div className="uk-width-expand">
                <p className="uk-margin-remove-bottom" style={{fontSize: '1rem'}}>
                  By {article.attributes.author.data.attributes.name}, {article.attributes.author.data.attributes.Title}
                </p>
                <p className="uk-text-meta uk-margin-remove-top">
                  <Moment format="MMM Do YYYY">{article.attributes.published_at}</Moment>
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
  const articles = await fetchAPI("/articles", { fields: ["slug"] });

  return {
    paths: articles.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(`/articles`, {
      filters: {
        slug: params.slug,
      },
      populate: {
        image: "*",
        category: "*",
        author: {
          populate: ['picture']
        }
      }
    }
  );

  return {
    props: { article: articles.data[0] },
    revalidate: 1
  };
}

export default Article;