import placeholder from "../public/placeholder.png";
import Image from "next/image";
import Link from 'next/link';
import { getStrapiURL } from '../lib/api';

function BibleStudyCard({study}) {
  const articleImage = study.attributes.image.data.attributes;
  let displayImage;
  
  if (articleImage.formats.hasOwnProperty("small")) {
    displayImage = getStrapiURL(articleImage.formats.small.url);
  } else {
    displayImage = placeholder.src;
  }

  return (
    <Link as={`/bible-studies/study/${study.attributes.slug}`} href="/bible-studies/study/[id]">
      <div className="card w-96 bg-base-100 shadow-lg hover:shadow-2xl">
        <figure><Image src={displayImage} alt={study.attributes.image.alternativeText} width={600} height={600}/></figure>
        <div className="card-body">
          <h2 className="card-title">{study.attributes.title}</h2>
          <p className="text-black">{study.attributes.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default BibleStudyCard;