import { useEffect, useMemo, useRef, useState } from 'react';
import {
  HiUser,
  HiCode,
  HiBriefcase,
  HiLink,
  HiDocument,
} from 'react-icons/hi';
import { TypeAnimation } from 'react-type-animation';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const sectionRefs = useRef({});

  const navItems = useMemo(
    () => [
      { id: 'about', icon: HiUser, label: 'About' },
      { id: 'projects', icon: HiCode, label: 'Projects' },
      { id: 'internships', icon: HiBriefcase, label: 'Internships' },
      { id: 'resume', icon: HiDocument, label: 'Resume' },
      { id: 'social', icon: HiLink, label: 'Social Media' },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = 0; i < navItems.length; i++) {
        const currentSection = navItems[i];
        const nextSection = navItems[i + 1];
        const currentElement = sectionRefs.current[currentSection.id];
        const nextElement = nextSection
          ? sectionRefs.current[nextSection.id]
          : null;

        if (
          scrollPosition >= currentElement.offsetTop &&
          (!nextElement || scrollPosition < nextElement.offsetTop)
        ) {
          setActiveSection(currentSection.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId) => {
    sectionRefs.current[sectionId].scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-white bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px]" />
      <nav className="w-1/12 flex flex-col items-center justify-center fixed top-0 left-0 h-screen px-4 z-10">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`w-14 h-14 mb-6 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 shadow-md ${
              activeSection === item.id
                ? 'bg-gray-300 scale-110'
                : 'bg-white hover:bg-gray-200 hover:scale-105'
            }`}
            onClick={() => scrollToSection(item.id)}
            aria-label={item.label}
          >
            <item.icon className="w-6 h-6 text-gray-700" />
          </button>
        ))}
      </nav>
      <main className="relative w-11/12 ml-[8.33%] min-h-screen">
        <div className="p-8 pl-16">
          <section
            ref={(el) => (sectionRefs.current.about = el)}
            className="min-h-screen flex flex-col justify-center pb-48"
          >
            <div>
              <p className="text-lg text-gray-600">Hi, my name is</p>
              <h2 className="text-7xl font-bold mt-2 mb-4">Kian Seong</h2>
              <span className="text-2xl mb-2">I&apos;m a &nbsp;</span>
              <TypeAnimation
                sequence={['', 500, 'Software Engineer', 1000, '', 500]}
                wrapper="span"
                speed={50}
                style={{
                  fontSize: '2em',
                  display: 'inline-block',
                  color: '#3B82F6',
                  textDecoration: 'underline',
                  textUnderlineOffset: '0.2em',
                }}
                repeat={Infinity}
                className="text-2xl"
              />
            </div>
          </section>
          <section
            ref={(el) => (sectionRefs.current.projects = el)}
            className="min-h-screen flex flex-col justify-center"
          >
            <h2 className="text-4xl font-bold mb-4">Projects</h2>
            <p className="text-xl">Here are some of my notable projects...</p>
            {/* Add your projects content here */}
          </section>
          <section
            ref={(el) => (sectionRefs.current.internships = el)}
            className="min-h-screen flex flex-col justify-center"
          >
            <h2 className="text-4xl font-bold mb-4">Internships</h2>
            <p className="text-xl">My internship experiences include...</p>
            {/* Add your internships content here */}
          </section>
          <section
            ref={(el) => (sectionRefs.current.resume = el)}
            className="min-h-screen flex flex-col justify-center"
          >
            <h2 className="text-4xl font-bold mb-4">Resume</h2>
            <p className="text-xl">
              Here&apos;s a summary of my professional experience and skills...
            </p>
            {/* Add your resume content here */}
          </section>
          <section
            ref={(el) => (sectionRefs.current.social = el)}
            className="min-h-screen flex flex-col justify-center"
          >
            <h2 className="text-4xl font-bold mb-4">Social Media</h2>
            <p className="text-xl">Connect with me on various platforms...</p>
            {/* Add your social media links here */}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
