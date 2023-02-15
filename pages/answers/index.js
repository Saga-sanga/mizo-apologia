import AnswerList from "../../components/answerList";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import Link from "next/link";
import PaginationPage from "../../components/paginationPage";
// import useSWR from 'swr';
// import { useState } from "react";

const Topic = ({ answers, answersMeta }) => {
  // const [pageIndex, setPageIndex] = useState(1);
  
  const seo = {
    metaTitle: 'Chhanna',
    metaDescription: `Chhanna te`,
    shareImage: null
  };

  // const { data, error, isLoading} = useSWR(['/answers', {
  //   sort: ['id:desc'],
  //   pagination:{
  //     page: pageIndex,
  //     pageSize: 12
  //   },
  //   populate: {
  //     image: "*",
  //     topic: "*"
  //   }
  // }], ([url, paramsObj]) => fetchAPI(url, paramsObj),
  // {
  //   fallbackData: answers
  // })

  return (
    <Layout>
      <Seo seo={seo} />
      <PaginationPage items={answers} meta={answersMeta}/>
      {/* <button 
        // disabled={pageIndex === 1}
        onClick={() => {
          // setPageIndex(pageIndex - 1);
          scrollTo(0,0);
        }}
      >
        Previous
      </button>
      <button 
        // disabled={pageIndex === (data && answersMeta.pagination.pageCount)} 
        onClick={() => {
          // setPageIndex(pageIndex + 1);
          scrollTo(0,0);
        }}
      >
        Next
      </button> */}
    </Layout>
  );
};

export async function getStaticProps() {
  const { data, meta} = await fetchAPI('/answers', {
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
    props: { answers: data, answersMeta: meta},
  };
}

export default Topic;