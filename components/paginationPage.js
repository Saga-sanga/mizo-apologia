import AnswerList from "./answerList"
import Link from "next/link"
import Pagination from "./Pagination";

function PaginationPage({ items }) {
  return (
    <section>
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
            <Pagination
              // totalItems={}
              // currentPage={}
              // itemsPerPage={}
              renderPageLink={(page) => `/answers/${page}`}
            />
            <AnswerList answers={items} />
          </div>
        </div>
       
      </section>
  )
}

export default PaginationPage;