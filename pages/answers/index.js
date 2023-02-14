import AnswerList from "../../components/answerList";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import Link from "next/link";
import useSWR from 'swr';
import { useState } from "react";

const Topic = ({ answers, answersMeta }) => {
  const [pageIndex, setPageIndex] = useState(1);
  
  const seo = {
    metaTitle: 'Chhanna',
    metaDescription: `Chhanna te`,
    shareImage: null
  };

  const { data, error, isLoading} = useSWR(['/answers', {
    sort: ['id:desc'],
    pagination:{
      page: pageIndex,
      pageSize: 12
    },
    populate: {
      image: "*",
      topic: "*"
    }
  }], ([url, paramsObj]) => fetchAPI(url, paramsObj),
  {
    fallbackData: answers
  })

  console.log("Answers: ", data.data)

  return (
    <Layout>
      <Seo seo={seo} />
      <main>
        <div className="answerSection">
          <div className="uk-container uk-container-large">
            <Link href="/" legacyBehavior>
              <a className="homeLink flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>Home
              </a>
            </Link>
            <div className='indexTitleContainer'>
              <h1 className="mt-0 px-2 text-4xl">Chhannate</h1>
              <Link href='/topic' legacyBehavior>
                <a className="flex">
                  Topics<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
              </Link>
            </div>
            <AnswerList answers={data.data ?? answers} />
          </div>
        </div>
       
      </main>
      <button 
        disabled={pageIndex === 1}
        onClick={() => {
          setPageIndex(pageIndex - 1);
          scrollTo(0,0);
        }}
      >
        Previous
      </button>
      <button 
        disabled={pageIndex === (data && answersMeta.pagination.pageCount)} 
        onClick={() => {
          setPageIndex(pageIndex + 1);
          scrollTo(0,0);
        }}
      >
        Next
      </button>
    </Layout>
  );
};

export async function getStaticProps() {
  const answers = await fetchAPI('/answers', {
    sort: ['id:desc'],
    pagination:{
      page: 1,
      pageSize: 12
    },
    populate: {
      image: "*",
      topic: "*"
    }
  });

  return {
    props: { answers: answers.data, answersMeta: answers.meta},
    // revalidate: 20
  };
}

export default Topic;