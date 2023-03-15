const LessonList = ({study}) => {
  return (
    <>
      {study.attributes.lessons.data.map(lesson => <div key={lesson.attributes.slug}>{lesson.attributes.slug}</div> )}
    </>
  )
};

export default LessonList;