import { configureStore } from "@reduxjs/toolkit";
import userSignInSlice from "./slices/user/Signin";
import userSignUpSlice from "./slices/user/Signup";
import superAdminSignUpSlice from "./slices/superAdminRegister/superAdminRegister";
import adminSignUpSlice from "./slices/adminRegister/adminRegister";
import categoryReducer from "./slices/category/category";
import careerOpportunitiesReducer from "./slices/careerOppertunities/careerOppertunities";
import softwareToolsReducer from "./slices/softwareTools/softwareTools";
import faqReducer from "./slices/faq/faq";
import instructorReducer from "./slices/instructor/instructor";
import courseReducer from "./slices/course/course";
import courseModuleReducer from "./slices/courseModules/courseModules";
import ourProgramReducer from "./slices/mca/ourProgram/ourProgram";
import aboutCollegeReducer from "./slices/mca/aboutCollege/aboutCollege";
import qualificationLearningReducer from "./slices/mca/qualificationLearning/qualificationLearning";
import semesterReducer from "./slices/mca/semester/Semester";
import assessmentReducer from "./slices/mca/assesment/Assesment";
import programMentorReducer from "./slices/mca/programMentor/ProgramMentor";
import programFeesReducer from "./slices/mca/programFees/ProgramFees";
import eligibilityCriteriaReducer from "./slices/mca/eligibility/Eligibility";
import degreeProgramReducer from "./slices/mca/degreeProgram/DegreeProgram";
import admissionProcessReducer from "./slices/mca/admissionProcess/AdmissionProcess";
import outcomeReducer from "./slices/mca/outcomes/Outcomes";
import highlightReducer from "./slices/mca/highlights/Highlights";
import programApplyReducer from "./slices/programApply/programApply";
import serviceReducer from "./slices/services/services/Services";
import clientReducer from "./slices/services/client/Client";
import executionHighlightsReducer from "./slices/services/executionHighlights/Execution_Highlights";
import executionOverviewsReducer from "./slices/services/executionOverview/ExecutionOverview";
import testimonialReducer from "./slices/services/testimonial/Testimonial";
import galleryReducer from "./slices/services/gallery/Gallery";

export default configureStore({
  reducer: {
    userSignIn: userSignInSlice,
    userSignUp: userSignUpSlice,
    superAdminRegister: superAdminSignUpSlice,
    adminRegister: adminSignUpSlice,
    category: categoryReducer,
    careerOpportunities: careerOpportunitiesReducer,
    softwareTools: softwareToolsReducer,
    faq: faqReducer,
    instructors: instructorReducer,
    courses: courseReducer,
    courseModule: courseModuleReducer,
    ourProgram: ourProgramReducer,
    aboutCollege: aboutCollegeReducer,
    qualificationLearning: qualificationLearningReducer,
    semester: semesterReducer,
    assessments: assessmentReducer,
    programMentors: programMentorReducer,
    programFees: programFeesReducer,
    eligibilityCriteria: eligibilityCriteriaReducer,
    degreeProgram: degreeProgramReducer,
    admissionProcess: admissionProcessReducer,
    outcomes: outcomeReducer,
    highlight: highlightReducer,
    programApply: programApplyReducer,
    service: serviceReducer,
    clients: clientReducer,
    executionHighlights: executionHighlightsReducer,
    executionOverviews: executionOverviewsReducer,
    testimonial: testimonialReducer,
    gallery: galleryReducer,
  },
});
