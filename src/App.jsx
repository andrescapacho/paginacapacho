import React, { useState, useEffect } from 'react';
import { Briefcase, Code, Award, BookOpen, Download, Mail, Linkedin, Github, Twitter, Menu, X, Instagram } from 'lucide-react';

// --- Main App Component ---
// This component manages the navigation and renders the different pages.
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'blog':
        return <BlogPage />;
      case 'utilities':
        return <UtilitiesPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  const navLinks = [
    { id: 'home', title: 'Inicio' },
    { id: 'about', title: 'Sobre Mí' },
    { id: 'blog', title: 'Blog' },
    { id: 'utilities', title: 'Utilidades' },
    { id: 'contact', title: 'Contacto' },
  ];

  return (
    <div className="bg-gray-900 text-gray-200 font-sans leading-relaxed">
      {/* --- Header & Navigation --- */}
      <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-md shadow-blue-500/10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" onClick={() => setCurrentPage('home')} className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
            Andres Capacho
          </a>
          <div className="hidden md:flex space-x-6">
            {navLinks.map(link => (
              <a
                key={link.id}
                href="#"
                onClick={() => setCurrentPage(link.id)}
                className={`text-lg hover:text-blue-400 transition-colors ${currentPage === link.id ? 'text-blue-400 font-semibold' : 'text-gray-300'}`}
              >
                {link.title}
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
        {/* --- Mobile Menu --- */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
              {navLinks.map(link => (
                <a
                  key={link.id}
                  href="#"
                  onClick={() => {
                    setCurrentPage(link.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${currentPage === link.id ? 'text-blue-400 bg-gray-900' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        {renderPage()}
      </main>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-6 py-8 text-center text-gray-500">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://www.linkedin.com/in/andres-capacho-4076b4290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="hover:text-blue-400 transition-colors"><Linkedin size={24} /></a>
            <a href="https://github.com/andrescapacho" className="hover:text-blue-400 transition-colors"><Github size={24} /></a>
            <a href="http://x.com/andrescg_" className="hover:text-blue-400 transition-colors"><Twitter size={24} /></a>
            <a href="https://www.instagram.com/andrescapacho_" className="hover:text-blue-400 transition-colors"><Instagram size={24} /></a>
          </div>
          <p>&copy; {new Date().getFullYear()} Todos los derechos reservados Andres Capacho</p>
          <p className="text-sm mt-2">Desarrollado con React y Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}

// --- Page Components ---

const HomePage = ({ setCurrentPage }) => (
  <div className="min-h-screen flex items-center justify-center bg-grid-gray-700/20">
    <div className="container mx-auto px-6 py-20 text-center">
      <div className="flex flex-col items-center">
        <img 
          src="https://media.licdn.com/dms/image/v2/D4E03AQHMXXIx9iZ5bw/profile-displayphoto-shrink_800_800/B4EZbG3UAXHIAc-/0/1747093111264?e=1756339200&v=beta&t=ZyJ6SCTwKT5ap_OpQ2gtqUIgc5Wznz8ZGR_JsKv90kk" 
          alt="Foto de perfil" 
          className="w-40 h-40 rounded-full mb-6 border-4 border-blue-500 shadow-lg"
        />
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          Hola, soy <span className="text-blue-400">Andres Capacho</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
          Técnico en Sistemas | Apasionado por la Tecnología | Creador de Soluciones
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={() => setCurrentPage('about')}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Conoce Más Sobre Mí
          </button>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-gray-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Contáctame
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Section = ({ title, icon, children }) => (
  <section className="mb-16">
    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
      {React.cloneElement(icon, { className: "mr-4 text-blue-400" })}
      {title}
    </h2>
    {children}
  </section>
);

const AboutPage = () => {
  const skills = [
    { name: 'Trabajo en equipo', level: '100%' }, { name: 'Gestión del tiempo', level: '100%' },
    { name: 'Toma de decisiones', level: '100%' }, { name: 'Resolución de problemas', level: '100%' },
    { name: 'Atencion al Cliente', level: '100%' }, { name: 'Comunicación', level: '100%' },
  ];
  const experiences = [
    {
      role: 'Técnico de Soporte',
      company: 'Incubadora Santander.',
      period: 'Marzo 2023 - Presente',
      description: 'Me desempeño como Auxiliar de Sistemas y agente de mesa de ayuda, brindando soporte técnico de primer nivel a usuarios, realizando mantenimiento preventivo y correctivo de equipos, y gestionando usuarios en Active Directory y Google Workspace. También manejo herramientas ofimáticas, administro la plataforma de seguridad Sophos, realizo monitoreo de redes, instalación de software y hardware, ensamble de computadoras y soporte a impresoras, entre otras funciones.'
    },
    {
      role: 'Practicante de Sistemas',
      company: 'Incubadora Santander.',
      period: 'May 2022 - Oct 2022',
      description: 'Realicé mis prácticas en el área de Sistemas, donde brindé soporte a usuarios, actué como agente de mesa de ayuda y presté asistencia en sitio. También llevé a cabo mantenimiento preventivo y correctivo de equipos de cómputo, formateo, ensamblaje de computadoras y otras funciones relacionadas con el soporte técnico.'
    },
  ];
  const education = [

    {
      title: 'Ingeniería en Sistemas',
      institution: 'Universidad Nacional Abierta y a Distancia ',
      period: 'Actualidad'
    },

    {
      title: 'Técnico en Control de la Seguridad Digital',
      institution: 'Servicio Nacional de Aprendizaje (SENA)',
      period: '2020 - 2021'
    },
    {
      title: 'Técnico en Sistemas',
      institution: 'Servicio Nacional de Aprendizaje (SENA)',
      period: '2019 - 2020'
    },
  ];

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-white">Sobre Mí</h1>
      <p className="text-center text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
        Soy una persona intelectual, creativa, dinámica y comprometida con mi desarrollo profesional. Me defino como alguien optimista, coherente, responsable y con una actitud proactiva frente a los retos. Cuento con habilidades en el manejo de equipos de cómputo, atención al cliente, uso de software empresarial y una fuerte orientación al trabajo en equipo.
        </p>
      <Section title="Mis Habilidades" icon={<Code size={32} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map(skill => (
            <div key={skill.name} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-white mb-2">{skill.name}</h3>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div className="bg-blue-500 h-4 rounded-full" style={{ width: skill.level }}></div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Experiencia Laboral" icon={<Briefcase size={32} />}>
        <div className="relative border-l-2 border-blue-500/30 pl-8 space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-[42px] top-1 w-5 h-5 bg-blue-500 rounded-full border-4 border-gray-900"></div>
              <p className="text-sm text-blue-400 mb-1">{exp.period}</p>
              <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
              <p className="text-lg text-gray-400 mb-2">{exp.company}</p>
              <p className="text-gray-300">{exp.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Educación y Títulos" icon={<Award size={32} />}>
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="text-sm text-blue-400 mb-1">{edu.period}</p>
              <h3 className="text-xl font-bold text-white">{edu.title}</h3>
              <p className="text-gray-400">{edu.institution}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

const BlogPage = () => {
  const posts = [
    {
      title: '10 Trucos de JavaScript que te Harán Más Productivo',
      date: '24 de Julio, 2025',
      summary: 'Descubre cómo simplificar tu código y mejorar tu eficiencia con estos consejos y trucos de JavaScript que todo desarrollador debería conocer.'
    },
    {
      title: 'Introducción a la Arquitectura de Microservicios',
      date: '15 de Julio, 2025',
      summary: 'Una guía para principiantes sobre qué son los microservicios, por qué son tan populares y cómo pueden beneficiar a tus proyectos a gran escala.'
    },
    {
      title: 'Mi Experiencia Usando React vs. Vue en 2025',
      date: '05 de Julio, 2025',
      summary: 'Un análisis comparativo honesto entre dos de los frameworks de frontend más populares del momento, basado en mi experiencia personal.'
    },
  ];

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-white">Mi Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col hover:transform hover:-translate-y-2 transition-transform duration-300">
            <p className="text-sm text-blue-400 mb-2">{post.date}</p>
            <h3 className="text-2xl font-bold text-white mb-4 flex-grow">{post.title}</h3>
            <p className="text-gray-300 mb-6">{post.summary}</p>
            <a href="#" className="text-blue-400 font-semibold mt-auto hover:underline">Leer más →</a>
          </div>
        ))}
      </div>
    </div>
  );
};

const UtilitiesPage = () => {
  const utilities = {
    'Inteligencia Artificial (IA)': [
      { name: 'ChatGPT', description: 'Asistente conversacional basado en IA capaz de generar texto, escribir código y ayudarte con tareas complejas.', link: 'https://chat.openai.com/' },
      { name: 'Gemini', description: 'Plataforma creativa con IA para generar y editar videos, imágenes y contenido multimedia.', link: 'https://runwayml.com/' },
      { name: 'Perplexity AI',description: 'Buscador con IA que responde preguntas con fuentes confiables y actualizadas en tiempo real.',link: 'https://www.perplexity.ai/'}
      
    ],
    'Desarrollo': [
      { name: 'Visual Studio Code', description: 'El editor de código por excelencia. Ligero, potente y extensible.', link: 'https://code.visualstudio.com/docs/setup/windows' },
      { name: 'Docker', description: 'Para crear, desplegar y ejecutar aplicaciones en contenedores.', link: 'https://www.docker.com/' },
      { name: 'Postman', description: 'Herramienta indispensable para probar y documentar APIs.', link: 'https://www.postman.com/' },
    ],
    'Diseño': [
      { name: 'Figma', description: 'La mejor herramienta para diseño de interfaces y prototipado colaborativo.', link: 'https://www.figma.com/es-es/' },
      { name: 'Coolors', description: 'Generador de paletas de colores súper rápido y útil.', link: 'https://coolors.co/' },
    ],
   // 'Capacho': [
   //   { name: 'Figma', description: 'La mejor herramienta para diseño de interfaces y prototipado colaborativo.', link: '#' },
   //   { name: 'Coolors', description: 'Generador de paletas de colores súper rápido y útil.', link: '#' },
   // ],
    'Productividad': [
      { name: 'Notion', description: 'Mi segundo cerebro. Para tomar notas, gestionar proyectos y organizar mi vida.', link: 'https://www.notion.com/es' },
      { name: 'Todoist', description: 'Un gestor de tareas simple pero muy poderoso para mantenerme enfocado.', link: 'https://www.todoist.com/es' },
    ]
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-white">Utilidades y Recursos</h1>
      <p className="text-center text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
        Una colección de herramientas y recursos que uso en mi día a día y que recomiendo totalmente.
      </p>
      <div className="space-y-12">
        {Object.entries(utilities).map(([category, items]) => (
          <section key={category}>
            <h2 className="text-2xl font-bold text-blue-400 border-b-2 border-blue-500/30 pb-2 mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md flex items-start">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                    <p className="text-gray-300 mt-1">{item.description}</p>
                  </div>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="ml-4 bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-colors">
                    <Download size={20} />
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

const ContactPage = () => (
  <div className="container mx-auto px-6 py-20">
    <h1 className="text-4xl font-bold text-center mb-4 text-white">Hablemos</h1>
    <p className="text-center text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
      ¿Tienes un proyecto en mente o simplemente quieres saludar? No dudes en contactarme.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-white">Enviar un Mensaje</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-300 mb-2">Nombre</label>
            <input type="text" id="name" className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">Correo Electrónico</label>
            <input type="email" id="email" className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-300 mb-2">Mensaje</label>
            <textarea id="message" rows="5" className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
            Enviar Mensaje
          </button>
        </form>
      </div>
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">Otra Información de Contacto</h3>
        <div className="bg-gray-800 p-6 rounded-lg flex items-center shadow-lg">
          <Mail size={24} className="text-blue-400 mr-4" />
          <div>
            <h4 className="font-semibold text-white">Correo Electrónico</h4>
            <a href="mailto:tuemail@ejemplo.com" className="text-gray-300 hover:text-blue-400">andresc6143@gmail.com</a>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg flex items-center shadow-lg">
          <Linkedin size={24} className="text-blue-400 mr-4" />
          <div>
            <h4 className="font-semibold text-white">LinkedIn</h4>
            <a href="https://www.linkedin.com/in/andres-capacho-4076b4290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="text-gray-300 hover:text-blue-400">Andres Capacho</a>
          </div> 
        </div>
        <div className="bg-gray-800 p-6 rounded-lg flex items-center shadow-lg">
          <Github size={24} className="text-blue-400 mr-4" />
          <div>
            <h4 className="font-semibold text-white">GitHub</h4>
            <a href="https://github.com/andrescapacho" className="text-gray-300 hover:text-blue-400">andrescapacho</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);
