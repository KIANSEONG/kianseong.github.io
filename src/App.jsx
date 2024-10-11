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
  const [darkMode, setDarkMode] = useState(false);
  const sectionRefs = useRef({});

  const DarkIcon = () => (
    <svg
      className="hidden dark:block"
      width="16"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="fill-slate-400"
        d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
      />
      <path
        className="fill-slate-500"
        d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
      />
    </svg>
  );

  const LightIcon = () => (
    <svg
      className="dark:hidden"
      width="16"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="fill-slate-300"
        d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
      />
      <path
        className="fill-slate-400"
        d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
      />
    </svg>
  );

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`relative min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px]" />
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
      <div className="flex flex-col justify-center fixed top-4 right-4 z-20">
        <input
          type="checkbox"
          name="light-switch"
          id="light-switch"
          className="light-switch sr-only"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
        <label className="relative cursor-pointer p-2" htmlFor="light-switch">
          <LightIcon />
          <DarkIcon />
          <span className="sr-only">Switch to light / dark version</span>
        </label>
      </div>
      <main className="relative w-11/12 ml-[8.33%] min-h-screen text-black dark:text-white">
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
