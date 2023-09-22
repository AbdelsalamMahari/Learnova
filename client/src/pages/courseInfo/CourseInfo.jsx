import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TopPage from "../../components/topPage/TopPage";
import Icons from "../../assets/icons/icons";
import Footer from "../../layout/footer/Footer";
import Button from "../../components/buttons/button";
import Loading from '../../components/loading/loading'

export default function CourseInfo() {
  const [course, setCourse] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await fetch(`http://localhost:5000/courses/${id}`);
        if (!response.ok) {
          throw new Error("Course not found");
        }
        const data = await response.json();
        setCourse(data);
        console.log(data);
        console.log(data.content[0].title);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCourse();
  }, [id]);

  const toggleAccordion = (index) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  if (!course) {
    return <Loading />;
  }

  return (
    <>
      <TopPage
        title={course.name}
        backgroundImageUrl="https://as2.ftcdn.net/v2/jpg/01/34/59/53/1000_F_134595318_krCNHoUx2KWoFZhFPGtJQg6Bv6dkrBMR.jpg"
      />
      <section>
        <div className="m-10 p-10 bg-white rounded">
          <div>
            <h1 className="lg:text-4xl font-bold">Course Description</h1>
            <p className="mt-5">{course.description}</p>
          </div>
          <div className="mt-10">
            <div className="flex justify-between">
              <h1 className="lg:text-4xl font-bold">Course Content</h1>
              <Link to={`/courseMaterial/${course._id}`}>
                <Button text="START" />
              </Link>
            </div>
            <div className="mt-4 w-3/4 ml-12 " >
  {course.content.map((chapter, index) => (
    <div key={index}>
      <h2
       
        className=" px-3  flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <span>{chapter.title}</span>
       
        
      </h2>
      <div
        className={`${
          activeAccordion === index ? "block" : "hidden"
        } p-5 border border-b-0 border-gray-200 dark:border-gray-700`}
      >
 
      </div>
    </div>
  ))}
</div>

            <div>
              <div
                className={`${
                  activeAccordion === 2 ? "block" : "hidden"
                } p-5 border border-t-0 border-gray-200 dark:border-gray-700`}
              >
                <div className="px-3">
                  <p className="py-2 text-gray-500 dark:text-gray-400 border-b">
                    Anatomy of tags
                  </p>
                  <p className="py-2 text-gray-500 dark:text-gray-400">
                    Selectors in CSS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
