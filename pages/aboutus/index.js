import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import Layout from '../../components/layout';
import { fetchAPI } from '../../lib/api';

export default function AboutUs({ aboutUs }) {
  return (
    <div>
      <Layout>
        <main className="uk-container aboutUsBody">
          <div>
            <h1>{aboutUs.title}</h1>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={aboutUs.content}/>
          </div>
          <hr style={{margin: '3.5rem 0'}} />
          <div>
            <h1>{aboutUs.StatementOfFaith.title}</h1>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={aboutUs.StatementOfFaith.content}/>
          </div>
        </main>
      </Layout>
    </div>
  )
}

export async function getStaticProps() {
  const aboutUs = await fetchAPI("/about-us");

  return {
    props: { aboutUs },
    revalidate: 1
  }
}