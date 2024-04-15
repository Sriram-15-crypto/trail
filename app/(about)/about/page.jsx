




import About from '@/components/about/About'


import Brands from '@/components/common/Brands'
import Instructors from '@/components/common/Instructors'
import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import TestimonialsOne from '@/components/common/TestimonialsOne'
import WhyCourse from '@/components/homes/WhyCourse'
import FooterTwo from '@/components/layout/footers/Footer'


import HeaderSeven from '@/components/layout/headers/HeaderSeven'
import React from 'react'


export default function page() {
  return (
    <div className="main-content  ">
      <Preloader/>

      <HeaderSeven />
        <div className="content-wrapper js-content-wrapper overflow-hidden pt-50">
            <PageLinks/>
            <About/>
            <WhyCourse/>
            

            <TestimonialsOne/>
            <Instructors/>
            <Brands/>
           

            
            
            <FooterTwo/>
        </div>

    </div>
  )
}

