import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'

import Header from '@/components/layout/headers/Header'
import HeaderAuth from '@/components/layout/headers/HeaderAuth'
import AuthImageMove from '@/components/others/AuthImageMove'
import LoginForm from '@/components/others/LoginForm'
import Terms from '@/components/terms/Terms'
import React from 'react'

export default function page() {
  return (
    <div className="main-content  ">
      <Preloader/>

        <HeaderAuth/>
        <div className="content-wrapper js-content-wrapper overflow-hidden">
            <section  className="form-page js-mouse-move-container">
                <AuthImageMove/>
                <LoginForm/>
            </section>
           
            
            
        </div>

    </div>
  )
}
