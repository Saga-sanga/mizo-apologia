import AnswerList from "./answerList"
import ArticleList from "./articleList";
import Pagination from "./Pagination";

function PaginationPage({ items, meta, answer }) {
  return (
    <>
      <Pagination
        totalPages={meta.pagination.pageCount}
        currentPage={meta.pagination.page}
        renderPageLink={(page) => `/${answer === true ? `answers` : `articles`}/${page}`}
      />
      { answer === true ? <AnswerList answers={items}/> : <ArticleList articles={items}/> }
      <Pagination
        totalPages={meta.pagination.pageCount}
        currentPage={meta.pagination.page}
        renderPageLink={(page) => `/${answer === true ? `answers` : `articles`}/${page}`}
      />
    </>     
  )
}

export default PaginationPage;