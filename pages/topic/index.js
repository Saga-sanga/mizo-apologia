import React from 'react'
import Link from 'next/link'
import { fetchAPI } from '../../lib/api';
import Layout from '../../components/layout';
import Seo from '../../components/seo';

function Home({topics}) {
  const seo ={
    metaTitle: `Topics`,
    metaDescription: `All Answer Topics`,
  }

  return (
    <Layout>
      <Seo seo={seo}/>
      <div className='flex items-center justify-center'>
        <section className="topic-body flex flex-col gap-5 max-w-4xl">
          <Link href="/answers" className="homeLink" legacyBehavior>
            <a className='flex -ml-6'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>Chhannate
            </a>
          </Link>
          <h2 className='text-4xl'>Topics</h2>
          <ul className="flex flex-wrap gap-8 mb-5 pl-2">
            {
              topics.map(topic => {
                return (
                  <li key={topic.id} className="listContentStyle">
                    <Link as={`/topic/${topic.attributes.slug}`} href="/topic/[id]" legacyBehavior>
                      {topic.attributes.name}
                    </Link>
                  </li>
                );
              })
            }
          </ul>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const topics = await fetchAPI("/topics", {sort: ['slug:asc']});

  return {
    props: {topics: topics.data},
    revalidate: 1
  }
}

export default Home;
