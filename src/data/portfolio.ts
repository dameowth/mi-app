export type Project = {
  id: string;
  name: string;
  description: string;
  details: string;
  technologies: string[];
  image: string;
  url: string;
};

export type SkillGroup = {
  category: string;
  icon: string;
  items: string[];
};

export const persona = {
  nombre: "Dameowth",
  profesion: "Pseudo-desarrollador de Software",
  descripcion:
    "Objetivo. Proactivo. Dame una palanca y un punto de apoyo y moveré algo.",
  correo: "st23030154@utlaguna.edu.mx",
  ubicacion: "México",
  foto: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/73/a7/23/73a7230c-19df-02a4-ff4e-53944024f63d/075679957924.jpg/10000x0w-999.jpg",
};

export const links = {
  github: "https://github.com/Dameowth",
  linkedin: "https://www.linkedin.com/in/Dameowth",
  cv: "https://drive.google.com/tu-curriculum",
};

export const skills: SkillGroup[] = [
  {
    category: "Lenguajes",
    icon: "💻",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    category: "Móvil y Web",
    icon: "📱",
    items: ["React Native", "Expo", "React"],
  },
  {
    category: "Herramientas",
    icon: "🛠️",
    items: ["Git", "GitHub", "VS Code", "Figma"],
  },
  {
    category: "Conocimientos",
    icon: "🧠",
    items: ["Diseño UI", "APIs REST", "Estado y eventos", "Buenas prácticas"],
  },
];

export const projects: Project[] = [
  {
    id: "Instafake",
    name: "Como si fuera Instagram (pero no es)",
    description: "Pagina de inicio, feed y perfil de usuario.",
    details:
      "Proyecto de práctica que simula la interfaz de Instagram, con navegación entre pantallas y diseño responsivo.",
    technologies: ["React Native", "TypeScript", "Expo"],
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/960px-Instagram_logo.svg.png?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=thumbnail",
    url: "https://dameowth.github.io/exercise08/",
  },
  {
    id: "ProFolio",
    name: "ProFolio",
    description: "Portafolio móvil con perfil, habilidades y proyectos.",
    details: "App bien pro para ver tus proyectos.",
    technologies: ["React Native", "TypeScript", "Animated"],
    image: "https://picsum.photos/seed/profolio/600/360",
    url: "https://github.com/usuario/profolio",
  },
  {
    id: "HumedApp",
    name: "HumedApp",
    description:
      "Aplicación para monitorear la humedad del suelo en tiempo real.",
    details:
      "Sistema de monitoreo de humedad del suelo con notificaciones y gráficos de tendencia.",
    technologies: ["React Native", "TypeScript"],
    image: "https://i.ytimg.com/vi/U5RbWkF8WQQ/maxresdefault.jpg",
    url: "https://github.com/dameowth/BluetoothExample",
  },
];
