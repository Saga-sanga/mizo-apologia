import React from 'react'
import Link from 'next/link'
import { fetchAPI } from '../../lib/api';
import Layout from '../../components/layout';

function Home({topics}) {
  return (
    <Layout topics={topics}>
      <div className="topic-body">
        <h2>Topics</h2>
        <ul className="ul-list-style">
          {
            topics.map(topic => {
              return (
                <li key={topic.id}>
                  <Link as={`/topic/${topic.slug}`} href="/topic/[id]">
                    <a>{topic.name}</a>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const topics = await fetchAPI("/topics");

  return {
    props: {topics},
    revalidate: 1
  }
}

export default Home;
