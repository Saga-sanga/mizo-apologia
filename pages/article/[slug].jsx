import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import Moment from "react-moment";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import styles from '../../styles/Home.module.css';
import Image from 'next/image';
import Seo from "../../components/seo";
import { getStrapiMedia } from "../../lib/media";
import Link from "next/link";
import placeholder from "../../public/placeholder.png";

const Article = ({ article }) => {
  const authorImageUrl = getStrapiMedia(article.attributes.author.data.attributes.picture);
  const imageUrl = getStrapiMedia(article.attributes.image);

  const seo = {
    metaTitle: `${article.attributes.title} | ${article.attributes.author.data.attributes.name}`,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  };

  return (
    <Layout >
      <Seo seo={seo} />
      <main>
        <div className="text-sm breadcrumbs pt-8">
          <ul className="pl-4 max-w-5xl mx-auto">
            <li><Link href='/'>Home</Link></li> 
            <li><Link href='/articles'>Thuziakte</Link></li>
            <li>{article.attributes.title}</li>
          </ul>
        </div>

        <div className="uk-section pt-4 pb-20">
          <div className="bannerTitle">
            <h1 className="text-center self-center">{article.attributes.title}</h1>
            
            <div className="mb-10 flex flex-col items-center">
              <hr className="uk-divider-small" />
              <div className="uk-grid-small flex px-8" data-uk-grid="true">
                <div className="self-center">
                  {article.attributes.author.data.attributes.picture && (
                    <Image
                      src={authorImageUrl}
                      className={styles.authorImage}
                      alt="author image"
                      style={{objectFit: 'cover', height: '45px', width: '45px'}}
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

            <Image 
              src={article.attributes.image.data.attributes.hasOwnProperty("url") ? imageUrl : placeholder.src} 
              alt="title image" 
              width='1400' 
              height='700' 
              style={{objectFit: "cover"}}
            />
          </div>
          <div className="uk-container textAreaContainer">
           
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={article.attributes.content}/>
            {
              (article.attributes.endNote === null || article.attributes.endNote == '') ? '' 
              : <div className="endNote">
                  <hr />
                  <ReactMarkdown rehypePlugins={[rehypeRaw]} children={article.attributes.endNote}/>
                </div>
            }
           
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
    revalidate: 20
  };
}

export default Article;