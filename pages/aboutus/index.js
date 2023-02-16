import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import Layout from '../../components/layout';
import Seo from "../../components/seo";
import { fetchAPI } from '../../lib/api';

export default function AboutUs({ aboutUs }) {
  const seo = {
    metaTitle: 'About Us',
    metaDescription: `Kan chanchin leh kan thu rin te`,
  };

  return (
    <div>
      <Layout>
        <Seo seo={seo} />
        <main className="uk-container aboutUsBody">
          <div>
            <h1>{aboutUs.attributes.title}</h1>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={aboutUs.attributes.content}/>
          </div>
          <hr style={{margin: '3.5rem 0'}} />
          <div>
            <h1>{aboutUs.attributes.StatementOfFaith.title}</h1>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={aboutUs.attributes.StatementOfFaith.content}/>
          </div>
        </main>
      </Layout>
    </div>
  )
}

export async function getStaticProps() {
  const aboutUs = await fetchAPI("/about-us", {
    populate: {
      StatementOfFaith: "*"
    }
  });

  return {
    props: { aboutUs: aboutUs.data },
    revalidate: 1
  }
}