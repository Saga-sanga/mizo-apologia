import React from 'react'
import Link from 'next/link'
import { fetchAPI } from '../../lib/api';
import Layout from '../../components/layout';

function Home({categories}) {
  return (
    <Layout>
      <main className="topic-body flex flex-col gap-5">
        <Link href="/articles" className="homeLink" legacyBehavior>
          <a className='flex -ml-9'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>Thuziakte
          </a>
        </Link>
        <h2 className='text-4xl'>Categories</h2>
        <ul className="flex flex-wrap gap-8 mb-5">
          {
            categories.map(category => {
              return (
                <li key={category.id} className="listContentStyle">
                  <Link as={`/category/${category.attributes.slug}`} href="/category/[id]" legacyBehavior>
                    {category.attributes.name}
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
  const categories = await fetchAPI("/categories", {sort: ['slug:asc']});

  return {
    props: {categories: categories.data},
    revalidate: 1
  }
}

export default Home;