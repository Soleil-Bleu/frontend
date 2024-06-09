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
import { Graph } from '@/components/graph';
import { FormPage } from '@/components/formPage';


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
          <Slider />
          <Tarifs />
          <Footer />
          </>
        } />
        <Route path="/result" element={
          <Graph />
        } />
        <Route path='/new' element={
          <FormPage />
        } />
      </Routes>
    </Router>
  );
}

export default App;
