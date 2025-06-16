import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Resume from '../components/Resume';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AdminButton from '../components/AdminButton';

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Resume />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <AdminButton />
    </>
  );
};

export default HomePage;