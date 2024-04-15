import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import CourseDetailsSix from '@/components/courseSingle/CourseDetails'
import CourseSlider from '@/components/courseSingle/CourseSlider'
import FooterTwo from '@/components/layout/footers/Footer'

import HeaderSeven from '@/components/layout/headers/HeaderSeven'
import React from 'react'

export default function page({ params }) {
  <Preloader/>
  return (
    <div  className="main-content  ">
        <HeaderSeven />
        <div  className="content-wrapper  js-content-wrapper">
            <PageLinks/>
            <CourseDetailsSix id={params.id} />
            <CourseSlider/>
            <FooterTwo/>
        </div>

    </div>
  )
}
