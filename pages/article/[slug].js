import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import Moment from "react-moment";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Image from "../../components/image";
import Seo from "../../components/seo";
import { getStrapiMedia } from "../../lib/media";

const Article = ({ article, categories }) => {
  const imageUrl = getStrapiMedia(article.image);

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
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
        <h1 className='contentTitleBlur'>{article.title}</h1>
      </div>
      <div className="uk-section">
        <div className="uk-container textAreaContainer">
          <ReactMarkdown rehypePlugins={[rehypeRaw]} children={article.content}/>
          {
            (article.endNote === null || article.endNote == '') ? '' 
            : <div style={{fontSize: '0.925rem'}}>
                <hr />
                <ReactMarkdown rehypePlugins={[rehypeRaw]} children={article.endNote}/>
              </div>
          }
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
              {article.author.picture && (
                <Image
                  image={article.author.picture}
                  style={{
                    objectFit: 'cover',
                    borderRadius: 9999,
                    height: "2.5rem",
                    width: "2.5rem"
                  }}
                />
              )}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom" style={{fontSize: '1rem'}}>
                By {article.author.name}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">{article.published_at}</Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles");

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(
    `/articles?slug=${params.slug}`
  );
  const categories = await fetchAPI("/categories");

  return {
    props: { article: articles[0], categories },
    revalidate: 1,
  };
}

export default Article;