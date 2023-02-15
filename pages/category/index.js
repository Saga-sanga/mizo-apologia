import React from 'react'
import Link from 'next/link'
import { fetchAPI } from '../../lib/api';
import Layout from '../../components/layout';
import Seo from '../../components/seo';

function Home({categories}) {
  const seo ={
    metaTitle: `Categories`,
    metaDescription: `All Article Categories`,
  }

  return (
    <Layout>
      <Seo seo={seo}/>
      <div className='flex items-center justify-center'>
        <section className="topic-body flex flex-col gap-5 max-w-4xl">
          <Link href="/articles" className="homeLink" legacyBehavior>
            <a className='flex -ml-6'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>Thuziakte
            </a>
          </Link>
          <h2 className='text-4xl'>Categories</h2>
          <ul className="flex flex-wrap gap-8 mb-5 pl-2">
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
        </section>
      </div>
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