import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Code, Award, BookOpen, Download, Mail, Linkedin, Github, Twitter, Menu, X, Instagram, Sun, Moon, Eye, Computer, Wrench, Network, Headset, Shield, FileCog, Layers, ExternalLink, Loader } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { useForm, ValidationError } from '@formspree/react';
import { motion, useInView } from "framer-motion";
import { createClient } from 'contentful';

// --- Configuración del cliente de Contentful ---
const client = createClient({
  // Estas variables se toman del archivo .env.local
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

// --- Componente Principal de la App ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'projects':
        return <ProjectsPage />;
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
    { id: 'projects', title: 'Proyectos' },
    { id: 'blog', title: 'Blog' },
    { id: 'utilities', title: 'Utilidades' },
    { id: 'contact', title: 'Contacto' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans leading-relaxed transition-colors duration-500">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-md dark:shadow-blue-500/10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" onClick={() => setCurrentPage('home')} className="text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
            Andres Capacho
          </a>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <a
                key={link.id}
                href="#"
                onClick={() => setCurrentPage(link.id)}
                className={`text-lg hover:text-blue-500 dark:hover:text-blue-400 transition-colors ${currentPage === link.id ? 'text-blue-500 dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-300'}`}
              >
                {link.title}
              </a>
            ))}
            <button onClick={handleThemeSwitch} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
            </button>
          </div>
          <div className="md:hidden flex items-center">
             <button onClick={handleThemeSwitch} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mr-2">
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden bg-gray-100 dark:bg-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
              {navLinks.map(link => (
                <a
                  key={link.id}
                  href="#"
                  onClick={() => {
                    setCurrentPage(link.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-center px-3 py-2 rounded-md text-base font-medium ${currentPage === link.id ? 'text-blue-500 dark:text-blue-400 bg-gray-200 dark:bg-gray-900' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
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

      <footer className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800">
        <div className="container mx-auto px-6 py-8 text-center text-gray-500 dark:text-gray-400">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://www.linkedin.com/in/andres-capacho-4076b4290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"><Linkedin size={24} /></a>
            <a href="https://github.com/andrescapacho" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"><Github size={24} /></a>
            <a href="http://x.com/andrescg_" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"><Twitter size={24} /></a>
            <a href="https://www.instagram.com/andrescapacho_" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"><Instagram size={24} /></a>
          </div>
          <p>&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
          <p className="text-sm mt-2">Andres Capacho</p>
        </div>
      </footer>
    </div>
  );
}

// --- Componentes de Animación y Secciones ---
const AnimatedSection = ({ children, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.section>
  );
};

const Section = ({ title, icon, children }) => (
  <AnimatedSection className="mb-16">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
      {React.cloneElement(icon, { className: "mr-4 text-blue-500 dark:text-blue-400" })}
      {title}
    </h2>
    {children}
  </AnimatedSection>
);

// --- Componentes de Página ---

const HomePage = ({ setCurrentPage }) => (
  <div className="min-h-screen flex items-center justify-center bg-grid-gray-200/50 dark:bg-grid-gray-700/20">
    <div className="container mx-auto px-6 py-20 text-center">
      <div className="flex flex-col items-center">
        <motion.img 
          src="https://i.imgur.com/QeLysJa.jpeg?1" 
          alt="Foto de perfil" 
          className="w-60 h-60 rounded-full mb-6 border-4 border-blue-500 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        />
        <motion.h1 
          className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Hola, soy <span className="text-blue-500 dark:text-blue-400">Andres Capacho</span>
        </motion.h1>
        
        <TypeAnimation
          sequence={[
            'Técnico en Sistemas', 2000, 
            'Apasionado por la Tecnología', 2000,
            'Creador de Soluciones', 2000,
          ]}
          wrapper="p"
          speed={50}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 h-8"
          repeat={Infinity}
        />

        <motion.div 
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
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
        </motion.div>
      </div>
    </div>
  </div>
);

const AboutPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const skills = [
    { name: 'Sistemas Operativos', icon: <Computer size={48} /> },
    { name: 'Hardware y Ensamblaje', icon: <Wrench size={48} /> },
    { name: 'Redes y Monitoreo', icon: <Network size={48} /> },
    { name: 'Soporte a Usuarios', icon: <Headset size={48} /> },
    { name: 'Seguridad (Sophos)', icon: <Shield size={48} /> },
    { name: 'Software y Directorios', icon: <FileCog size={48} /> },
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
    { title: 'Ingeniería en Sistemas', institution: 'Universidad Nacional Abierta y a Distancia ', period: 'Actualidad', imageUrl: null },
    { 
      title: 'Curso de Corel Draw', 
      institution: 'Servicio Nacional de Aprendizaje (SENA)', 
      period: '2025',
      imageUrl: 'https://i.imgur.com/FhdHYpy.jpeg'
    },
    
    { 
      title: 'Técnico en Control de la Seguridad Digital', 
      institution: 'Servicio Nacional de Aprendizaje (SENA)', 
      period: '2020 - 2021',
      imageUrl: 'https://i.imgur.com/aOf5CGF.jpeg'
    },

    { 
      title: 'Curso Especial en Comportamiento Emprendedor', 
      institution: 'Servicio Nacional de Aprendizaje (SENA)', 
      period: '2021',
      imageUrl: 'https://i.imgur.com/Ojj3QCi.jpeg'
    },

    { 
      title: 'Técnico en Sistemas', 
      institution: 'Servicio Nacional de Aprendizaje (SENA)', 
      period: '2019 - 2020',
      imageUrl: 'https://i.imgur.com/cvn7pwv.jpeg'
    },
  ];

  return (
    <>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">Sobre Mí</h1>
        <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Soy una persona intelectual, creativa, dinámica y comprometida con mi desarrollo profesional. Me defino como alguien optimista, coherente, responsable y con una actitud proactiva frente a los retos.
        </p>

        <Section title="Mis Habilidades" icon={<Code size={32} />}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {skills.map(skill => (
              <div key={skill.name} className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="text-blue-500 dark:text-blue-400 mb-3">
                    {skill.icon}
                </div>
                <h3 className="text-md font-semibold text-gray-800 dark:text-white h-12 flex items-center">{skill.name}</h3>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Experiencia Laboral" icon={<Briefcase size={32} />}>
          <div className="relative border-l-2 border-blue-500/30 pl-8 space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[42px] top-1 w-5 h-5 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900"></div>
                <p className="text-sm text-blue-500 dark:text-blue-400 mb-1">{exp.period}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">{exp.company}</p>
                <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Educación y Títulos" icon={<Award size={32} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
                <p className="text-sm text-blue-500 dark:text-blue-400 mb-1">{edu.period}</p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex-grow">{edu.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{edu.institution}</p>
                {edu.imageUrl && (
                  <button 
                    onClick={() => setSelectedImage(edu.imageUrl)}
                    className="mt-auto bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Eye size={18} className="mr-2"/>
                    Ver Certificado
                  </button>
                )}
              </div>
            ))}
          </div>
        </Section>
      </div>

      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <img 
              src={selectedImage} 
              alt="Certificado" 
              className="max-w-full max-h-[90vh] rounded-lg"
            />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 bg-white text-black rounded-full p-2"
            >
              <X size={24} />
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

const ProjectsPage = () => {
  const projects = [
    {
      title: "Herramienta de Inventario",
      description: "Pequeña aplicación de escritorio que permite a los usuarios enviar automáticamente información de sus equipos (IP, serial, usuario) al departamento de TI, facilitando el registro y control de activos tecnológicos.",
      imageUrl: "https://placehold.co/600x400/1e293b/93c5fd?text=Inventario+TI",
      tags: ["Python", "Tkinter", "Automatización"],
      liveUrl: null,
      githubUrl: "https://github.com/andrescapacho/apps"
    },
    {
      title: "Script de Monitoreo de Red",
      description: "Pequeña aplicación diseñada para realizar escaneos de red según el rango de direcciones IP especificado, con el objetivo de detectar puertos abiertos con interfaz web accesible. Genera una vista en HTML, así como reportes en formato PDF y XLS.",
      imageUrl: "https://placehold.co/600x400/1e293b/93c5fd?text=Escáner+Red",
      tags: ["PowerShell", "Redes", "Seguridad"],
      liveUrl: null,
      githubUrl: "https://github.com/andrescapacho/apps"
    },
    {
      title: "Página Web",
      description: "Creación de mi propia página web tipo portafolio, diseñada para presentar de manera profesional mi perfil personal, habilidades, experiencia y proyectos destacados.",
      imageUrl: "https://placehold.co/600x400/1e293b/93c5fd?text=Página+Web",
      tags: ["Documentación", "Soporte", "Notion"],
      liveUrl: "https://capacho.vercel.app/",
      githubUrl: null
    }
  ];

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">Mis Proyectos</h1>
      <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        Aquí hay algunos ejemplos de soluciones y herramientas que he desarrollado para resolver problemas prácticos.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover"/>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">{project.description}</p>
              <div className="mt-auto flex space-x-4">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
                    <Github size={18} className="mr-2"/>
                    Código
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <ExternalLink size={18} className="mr-2"/>
                    Ver Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};


const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.getEntries({ content_type: 'articuloBlog' })
      .then((response) => {
        setPosts(response.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los posts de Contentful:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <Loader className="animate-spin h-12 w-12 mx-auto text-blue-500" />
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Cargando artículos desde el CMS...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Mi Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.div 
            key={post.sys.id} 
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col hover:shadow-xl hover:-translate-y-2 transition-transform duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {post.fields.imagenPortada && (
              <img src={`https:${post.fields.imagenPortada.fields.file.url}`} alt={post.fields.titulo} className="w-full h-40 object-cover rounded-md mb-4" />
            )}
            <p className="text-sm text-blue-500 dark:text-blue-400 mb-2">
              {new Date(post.fields.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex-grow">{post.fields.titulo}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{post.fields.resumen}</p>
            <a href="#" className="text-blue-600 dark:text-blue-400 font-semibold mt-auto hover:underline">Leer más →</a>
          </motion.div>
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
    'Productividad': [
      { name: 'Notion', description: 'Mi segundo cerebro. Para tomar notas, gestionar proyectos y organizar mi vida.', link: 'https://www.notion.com/es' },
      { name: 'Todoist', description: 'Un gestor de tareas simple pero muy poderoso para mantenerme enfocado.', link: 'https://www.todoist.com/es' },
    ]
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Utilidades y Recursos</h1>
      <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        Una colección de herramientas y recursos que uso en mi día a día y que recomiendo totalmente.
      </p>
      <div className="space-y-12">
        {Object.entries(utilities).map(([category, items]) => (
          <AnimatedSection key={category}>
            <h2 className="text-2xl font-bold text-blue-500 dark:text-blue-400 border-b-2 border-blue-500/20 dark:border-blue-500/30 pb-2 mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-start">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">{item.description}</p>
                  </div>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="ml-4 flex-shrink-0 bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-colors">
                    <Download size={20} className="text-white"/>
                  </a>
                </div>
              ))}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xnnzvbwa");

  if (state.succeeded) {
      return (
        <div className="text-center bg-green-100 dark:bg-green-900/50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-green-800 dark:text-green-300">¡Gracias por tu mensaje!</h3>
          <p className="text-green-700 dark:text-green-400 mt-2">Me pondré en contacto contigo pronto.</p>
        </div>
      );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-600 dark:text-gray-300 mb-2">Nombre</label>
        <input type="text" id="name" name="name" required className="w-full p-3 bg-gray-200 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white" />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-600 dark:text-gray-300 mb-2">Correo Electrónico</label>
        <input type="email" id="email" name="email" required className="w-full p-3 bg-gray-200 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white" />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1"/>
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-600 dark:text-gray-300 mb-2">Mensaje</label>
        <textarea id="message" name="message" rows="5" required className="w-full p-3 bg-gray-200 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"></textarea>
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1"/>
      </div>
      <button type="submit" disabled={state.submitting} className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-lg disabled:bg-gray-500">
        {state.submitting ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
    </form>
  );
}

const ContactPage = () => (
  <div className="container mx-auto px-6 py-20">
    <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">Hablemos</h1>
    <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
      ¿Tienes un proyecto en mente o simplemente quieres saludar? No dudes en contactarme.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <motion.div 
        className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Enviar un Mensaje</h2>
        <ContactForm />
      </motion.div>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Otra Información de Contacto</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg flex items-center shadow-lg">
          <Mail size={24} className="text-blue-500 dark:text-blue-400 mr-4" />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Correo Electrónico</h4>
            <a href="mailto:andresc6143@gmail.com" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">andresc6143@gmail.com</a>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg flex items-center shadow-lg">
          <Linkedin size={24} className="text-blue-500 dark:text-blue-400 mr-4" />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">LinkedIn</h4>
            <a href="https://www.linkedin.com/in/andres-capacho-4076b4290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Andres Capacho</a>
          </div> 
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg flex items-center shadow-lg">
          <Github size={24} className="text-blue-500 dark:text-blue-400 mr-4" />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">GitHub</h4>
            <a href="https://github.com/andrescapacho" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">andrescapacho</a>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);
