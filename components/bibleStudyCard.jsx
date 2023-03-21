import placeholder from "../public/placeholder.png";
import Image from "next/image";
import Link from 'next/link';
import { getStrapiURL } from '../lib/api';
import styles from '../styles/Home.module.css';

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
      <div className={`${styles.articleCard} nav-shadow`}>
        <div>
          <Image
            className='h-auto'
            src={displayImage} 
            alt={study.attributes.image.alternativeText}
            height={300}
            width={600}
          />
        </div>
        <div className={styles.articleCardText}>
          {/* <span className='text-sm'>{article.category.data.attributes.name}</span> */}
          <h3 className='text-xl font-serif'>{study.attributes.title}</h3>
          <p className='line-clamp-6'>{study.attributes.description}</p>
          
        </div>
      </div>
    </Link>
  );
}

export default BibleStudyCard;