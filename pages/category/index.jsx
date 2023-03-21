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
          <div className="text-sm breadcrumbs">
            <ul className="pl-0">
              <li><Link href='/'>Home</Link></li> 
              <li><Link href='/articles'>Thuziakte</Link></li>
              <li>Categories</li>
            </ul>
          </div>
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