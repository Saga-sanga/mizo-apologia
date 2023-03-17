import Link from "next/link";

const LessonList = ({study}) => {
  // TO DO: Add link to lesson page
  return (
    <>
      {study.attributes.lessons.data.map(lesson => 
        <Link as={`/lessons/${lesson.attributes.slug}`} href='/lessons/[id]' key={lesson.attributes.slug}>
          <div>{lesson.attributes.slug}</div> 
        </Link> 
      )}
    </>
  )
};

export default LessonList;