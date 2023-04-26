import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import PaginationPage from "../../components/paginationPage";
import Link from "next/link";
import CardList from "../../components/cardList";
import BibleStudyCard from "../../components/bibleStudyCard";

const BibleStudy = ({ bibleStudies, bibleStudiesMeta }) => {
  const seo = {
    metaTitle: "Bible Studies",
    metaDescription: `Bible Study list`,
  };

  return (
    <Layout>
      <Seo seo={seo} />
      <section>
        <div className="answerSection sectionPaddingTop">
          <div className="uk-container uk-container-large">
            <div className="text-sm breadcrumbs">
              <ul className="pl-0">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>Bible Studies</li>
              </ul>
            </div>

            <div className="indexTitleContainer">
              <h1 className="mt-0 px-2 font-semibold text-2xl md:text-4xl">
                Bible Studies
              </h1>
            </div>
            <PaginationPage meta={bibleStudiesMeta} link={"bible-studies"}>
              <CardList>
                {bibleStudies.map((study) => (
                  <BibleStudyCard study={study} key={study.attributes.slug} />
                ))}
              </CardList>
            </PaginationPage>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticProps() {
  const { data, meta } = await fetchAPI("/bible-studies", {
    sort: ["id:desc"],
    populate: {
      image: "*",
    },
    pagination: {
      page: 1,
      pageSize: 12,
    },
  });

  return {
    props: { bibleStudies: data, bibleStudiesMeta: meta },
    revalidate: 1,
  };
}

export default BibleStudy;
