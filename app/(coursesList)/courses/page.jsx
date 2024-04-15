"use client"
import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import CourseList from '@/components/courseList/CourseList'

import FooterTwo from '@/components/layout/footers/Footer'
import HeaderSeven from '@/components/layout/headers/HeaderSeven'
import React, { useState } from 'react'


export default function page() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };
  return (
    <div className="main-content  ">
      <Preloader/>
      <HeaderSeven />
        <div className="content-wrapper  js-content-wrapper overflow-hidden">
            <PageLinks/>
            <CourseList selectedCategory={selectedCategory} />
            <FooterTwo/>
        </div>
    </div>
  )
}
