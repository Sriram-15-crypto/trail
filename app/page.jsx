import Preloader from "@/components/common/Preloader";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import CategoriesTwo from '@/components/homes/categories/Categories'
import BecomeInstactor from "@/components/common/BecomeInstactor";
import FooterTwo from "@/components/layout/footers/Footer";
// import CoursesThree from '@/components/homes/courses/Courses'
import BecomeStudent from '@/components/common/BecomeStudent'
import HeroSeven from "@/components/homes/heros/HeroSeven";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";


export default function HomePage() {
  return (
    
    <>
    <Preloader/>
    <HeaderSeven />
    
    <div className="content-wrapper  js-content-wrapper overflow-hidden">
    
    <HeroSeven/>
        {/* <CoursesThree/> */}
        {/* <FindLearningPath/> */}
        {/* <LearningSolutions/> */}
        {/* <EventsOne/> */}
        <CategoriesTwo/>
        <BecomeInstactor/>
        <BecomeStudent/>
        <FooterTwo/>

      
      
    </div>
  </>
  );
}
