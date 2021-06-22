import React from 'react'
import Link from 'next/link'
import { fetchAPI } from '../../lib/api';
import Layout from '../../components/layout';

function Home({categories}) {
  return (
    <Layout categories={categories}>
      <ul>
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