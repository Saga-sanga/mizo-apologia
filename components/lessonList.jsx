import Link from "next/link";

const LessonList = ({study, activeSlug}) => {
  return (
    <ol className="menu bg-base-100 w-full p-2 rounded-box text-blue-600 ">
      {study.attributes.lessons.data.map(lesson => 
        <li key={lesson.attributes.slug}>
          <Link as={`/lessons/${lesson.attributes.slug}`} href='/lessons/[id]' className={`${lesson.attributes.slug === activeSlug ? 'active hover:text-white' : ''}`}>
            {lesson.attributes.title} 
          </Link>
        </li>
      )}
    </ol>
  )
};

export default LessonList;