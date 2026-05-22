// import React from 'react'

// const stats = [
//     {
//         count: "5K", label : "Active Student"
//     },
//      {
//         count: "10+", label : "Mentors"
//     },
//      {
//         count: "200+", label : "Courses"
//     },
//      {
//         count: "50", label : "Awards"
//     },
// ]

// function StatsComponent() {
//     return (
//        <section className='bg-richblack-700'>
//         <div>
//             <div className='flex flex-col lg:h-[150px] lg:flex-row items-center justify-evenly gap-2 py-12'>
//             {
//                     stats.map((data,index)=>{
//                         return(
//                             <div key={index}
//                             className='flex flex-col items-center text-richblack-50'
//                             >
//                               <h1 className='text-[30px] font-bold text-richblack-5'>{data.count}</h1>
//                               <h2 className="font-semibold text-[16px] text-richblack-500">{data.label}</h2>
//                             </div>
//                         )
//                     }
//                     )
//             }
//             </div>
//         </div>
//        </section>
//     )
// }

// export default StatsComponent

import React, { useEffect, useState, useRef } from "react";

const stats = [
  { count: 5000, label: "Active Students" },
  { count: 10, label: "Mentors" },
  { count: 200, label: "Courses" },
  { count: 50, label: "Awards" },
];

const Counter = ({ target, duration = 3000, start }) => {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) return; // don't run until visible

    let startValue = 0;
    const end = target;
    const increment = Math.ceil(end / (duration / 50));

    const timer = setInterval(() => {
      startValue += increment;
      if (startValue >= end) {
        setCount(end);
        setDone(true);
        clearInterval(timer);
      } else {
        setCount(startValue);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [target, duration, start]);

  return (
    <h1 className="text-[30px] font-bold text-richblack-5">
      {count.toLocaleString()}
      {done && "+"}
    </h1>
  );
};

function StatsComponent() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // run only once
        }
      },
      { threshold: 0.4 } // start animation when 40% of section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-richblack-700">
      <div className="flex flex-col lg:h-[150px] lg:flex-row items-center justify-evenly gap-2 py-12">
        {stats.map((data, index) => (
          <div key={index} className="flex flex-col items-center text-richblack-50">
            <Counter target={data.count} duration={3000} start={inView} />
            <h2 className="font-semibold text-[16px] text-richblack-500">
              {data.label}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsComponent;
