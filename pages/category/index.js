import React from 'react'
import Link from 'next/link'
import { fetchAPI } from '../../lib/api';
import Layout from '../../components/layout';

function Home({categories}) {
  return (
    <Layout categories={categories}>
      <div className="topic-body">
        <h2>Categories</h2>
        <ul  className="ul-list-style">
          {
            categories.map(category => {
              return (
                <li key={category.id}>
                  <Link as={`/category/${category.slug}`} href="/category/[id]">
                    <a>{category.name}</a>
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
  const categories = await fetchAPI("/categories");

  return {
    props: {categories},
    revalidate: 1
  }
}

export default Home;