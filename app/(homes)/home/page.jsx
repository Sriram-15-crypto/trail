import React, { useState } from 'react'
import HeroTwo from '@/components/homes/heros/HeroTwo'

import CategoriesTwo from '@/components/homes/categories/Categories'
import BecomeInstactor from '@/components/common/BecomeInstactor'
import BecomeStudent from '../../../components/common/BecomeStudent'
import Brands from '@/components/common/Brands'

import FooterTwo from '@/components/layout/footers/Footer'
import Preloader from '@/components/common/Preloader'
import HeaderSeven from '@/components/layout/headers/HeaderSeven'

export default function page() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <>
    <Preloader/>
    <HeaderSeven/>
    <div className="main-content overflow-hidden   ">
        <HeroTwo/>
        <CategoriesTwo onCategorySelect={handleCategorySelect} />
        <BecomeInstactor/>
        <BecomeStudent/>
        <Brands/>
        <FooterTwo/>

    </div></>
  )
}
