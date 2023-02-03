import React from 'react'
import Link from 'next/link'
import { fetchAPI } from '../../lib/api';
import Layout from '../../components/layout';

function Home({topics}) {
  return (
    <Layout>
      <main className="topic-body">
        <Link href="/answers" className="homeLink">

          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>Chhannate
        </Link>
        <h2>Topics</h2>
        <ul className="ul-list-style">
          {
            topics.map(topic => {
              return (
                <li key={topic.id} className="listContentStyle">
                  <Link as={`/topic/${topic.slug}`} href="/topic/[id]">
                    {topic.name}
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const topics = await fetchAPI("/topics?_sort=slug:ASC");

  return {
    props: {topics},
    revalidate: 1
  }
}

export default Home;
