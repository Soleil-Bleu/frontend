import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from "@/components/navbar"; 
import { Hero } from "@/components/hero";
import { Second } from "@/components/second";
import { Kpi } from "@/components/kpi";
import { Slider } from "@/components/slider";
import { Third } from "@/components/third";
import { Tarifs } from "@/components/tarifs";
import { Footer } from "@/components/footer";
import { FormPage } from '@/components/formPage';
import { PreForm } from '@/components/preForm';
import ResultPage from '@/components/results/resultPage';
import { ConfirmationPage } from '@/components/results/confirmationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Hero />
            <Second />
            <Kpi />
            <Third />
            {/* <Slider /> */}
            <Tarifs />
            <Footer />
          </>
        } />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/result/:id" element={<ResultPage />} />
        <Route path="/new" element={<PreForm />} />
        <Route path="/new/form" element={<FormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
