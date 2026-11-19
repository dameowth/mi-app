import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    Animated,
    Image,
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { links, persona, projects, skills } from "../data/portfolio";
import GlassCard from "./GlassCard";

const MENU_WIDTH = 280;

const sections = [
  { key: "home", label: "Inicio", icon: "🏠" },
  { key: "about", label: "Sobre mí", icon: "👤" },
  { key: "skills", label: "Habilidades", icon: "🛠️" },
  { key: "projects", label: "Proyectos", icon: "📁" },
  { key: "contact", label: "Contacto", icon: "✉️" },
];

function Chip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

export default function Profile() {
  const insets = useSafeAreaInsets();

  // ESTADOS
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [selectedSection, setSelectedSection] = React.useState("home");
  const [selectedProject, setSelectedProject] = React.useState<string | null>(
    null,
  );

  // ANIMACIÓN DEL MENÚ LATERAL
  const menuAnimation = React.useRef(new Animated.Value(-MENU_WIDTH)).current;

  React.useEffect(() => {
    Animated.timing(menuAnimation, {
      toValue: menuVisible ? 0 : -MENU_WIDTH,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [menuVisible]);

  // FUNCIONES
  const navigate = (section: string) => {
    setSelectedSection(section);
    setSelectedProject(null);
    setMenuVisible(false);
  };

  const openLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log("No se pudo abrir:", error);
    }
  };

  // PANTALLA: INICIO
  const renderHome = () => (
    <View>
      <GlassCard style={styles.block}>
        <View style={styles.center}>
          <Image source={{ uri: persona.foto }} style={styles.photo} />
          <Text style={styles.name}>{persona.nombre}</Text>
          <Text style={styles.profession}>{persona.profesion}</Text>
          <Text style={styles.description}>{persona.descripcion}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate("projects")}
          >
            <Text style={styles.buttonText}>Ver mis proyectos</Text>
          </TouchableOpacity>
        </View>
      </GlassCard>

      <Text style={styles.title}>Proyectos destacados</Text>
      {projects.slice(0, 2).map((project) => (
        <TouchableOpacity
          key={project.id}
          activeOpacity={0.8}
          onPress={() => {
            setSelectedSection("projects");
            setSelectedProject(project.id);
          }}
        >
          <GlassCard style={styles.block}>
            <Text style={styles.projectName}>{project.name}</Text>
            <Text style={styles.text}>{project.description}</Text>
          </GlassCard>
        </TouchableOpacity>
      ))}
    </View>
  );

  // PANTALLA: SOBRE MÍ
  const renderAbout = () => (
    <View>
      <Text style={styles.title}>Sobre mí</Text>
      <GlassCard style={styles.block}>
        <Text style={styles.projectName}>{persona.nombre}</Text>
        <Text style={styles.profession}>{persona.profesion}</Text>
        <Text style={[styles.text, { marginTop: 12 }]}>
          {persona.descripcion}
        </Text>
      </GlassCard>

      <GlassCard style={styles.block}>
        <Text style={styles.info}>📧 {persona.correo}</Text>
        <Text style={styles.info}>📍 {persona.ubicacion}</Text>
      </GlassCard>
    </View>
  );

  // PANTALLA: HABILIDADES
  const renderSkills = () => (
    <View>
      <Text style={styles.title}>Tecnologías y conocimientos</Text>
      {skills.map((group) => (
        <GlassCard key={group.category} style={styles.block}>
          <Text style={styles.projectName}>
            {group.icon} {group.category}
          </Text>
          <View style={styles.chipRow}>
            {group.items.map((item) => (
              <Chip key={item} label={item} />
            ))}
          </View>
        </GlassCard>
      ))}
    </View>
  );

  // PANTALLA: LISTA DE PROYECTOS
  const renderProjects = () => (
    <View>
      <Text style={styles.title}>Mis proyectos</Text>
      {projects.map((project) => (
        <TouchableOpacity
          key={project.id}
          activeOpacity={0.8}
          onPress={() => setSelectedProject(project.id)}
        >
          <GlassCard style={styles.block}>
            <Image
              source={{ uri: project.image }}
              style={styles.projectImage}
            />
            <Text style={styles.projectName}>{project.name}</Text>
            <Text style={styles.text}>{project.description}</Text>
            <View style={styles.chipRow}>
              {project.technologies.map((tech) => (
                <Chip key={tech} label={tech} />
              ))}
            </View>
          </GlassCard>
        </TouchableOpacity>
      ))}
    </View>
  );

  // PANTALLA: DETALLE DE PROYECTO
  const renderProjectDetail = () => {
    const project = projects.find((p) => p.id === selectedProject);
    if (!project) return null;

    return (
      <View>
        <GlassCard style={styles.block}>
          <Image source={{ uri: project.image }} style={styles.projectImage} />
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={[styles.text, { marginTop: 8 }]}>{project.details}</Text>
          <View style={styles.chipRow}>
            {project.technologies.map((tech) => (
              <Chip key={tech} label={tech} />
            ))}
          </View>
        </GlassCard>

        <TouchableOpacity
          style={styles.button}
          onPress={() => openLink(project.url)}
        >
          <Text style={styles.buttonText}>Abrir repositorio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonGlass]}
          onPress={() => setSelectedProject(null)}
        >
          <Text style={styles.buttonText}>← Volver</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // PANTALLA: CONTACTO
  const renderContact = () => (
    <View>
      <Text style={styles.title}>Contacto</Text>
      <GlassCard style={styles.block}>
        <Text style={styles.text}>
          ¿Tienes una idea o propuesta? Escríbeme o revisa mis perfiles.
        </Text>
      </GlassCard>

      <TouchableOpacity
        style={styles.button}
        onPress={() => openLink(`mailto:${persona.correo}`)}
      >
        <Text style={styles.buttonText}>📧 Enviar correo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonGlass]}
        onPress={() => openLink(links.github)}
      >
        <Text style={styles.buttonText}>🐙 GitHub</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonGlass]}
        onPress={() => openLink(links.linkedin)}
      >
        <Text style={styles.buttonText}>💼 LinkedIn</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonGlass]}
        onPress={() => openLink(links.cv)}
      >
        <Text style={styles.buttonText}>📄 Ver currículum</Text>
      </TouchableOpacity>
    </View>
  );

  // DECIDE QUÉ PANTALLA MOSTRAR
  const renderSection = () => {
    if (selectedProject) {
      return renderProjectDetail();
    }

    switch (selectedSection) {
      case "home":
        return renderHome();
      case "about":
        return renderAbout();
      case "skills":
        return renderSkills();
      case "projects":
        return renderProjects();
      case "contact":
        return renderContact();
      default:
        return <Text style={styles.text}>Section not found</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {/* FONDO: degradado + círculos de color que se ven a través del vidrio */}
      <LinearGradient
        colors={["#0B1226", "#172554", "#1E3A8A"]}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.blob, styles.blobBlue]} />
      <View style={[styles.blob, styles.blobTeal]} />
      <View style={[styles.blob, styles.blobOrange]} />

      {/* ENCABEZADO */}
      <GlassCard
        intensity={50}
        style={[styles.header, { paddingTop: insets.top + 8 }]}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => setMenuVisible(true)}
            style={styles.menuButton}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MI PORTAFOLIO</Text>
          <View style={styles.menuButton} />
        </View>
      </GlassCard>

      {/* CONTENIDO CON SCROLL */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderSection()}
        <Text style={styles.footerText}>© 2026 Mi Portfolio Profesional</Text>
      </ScrollView>

      {/* NAVEGACIÓN INFERIOR (fuera del ScrollView para que siempre se vea) */}
      <GlassCard
        intensity={50}
        style={[styles.bottomNavWrapper, { paddingBottom: insets.bottom }]}
      >
        <View style={styles.bottomNav}>
          {sections.map((item) => {
            const active = selectedSection === item.key;
            return (
              <TouchableOpacity
                key={item.key}
                style={[styles.navItem, active && styles.navItemActive]}
                onPress={() => navigate(item.key)}
              >
                <Text style={styles.navIcon}>{item.icon}</Text>
                <Text
                  style={[styles.navLabel, active && styles.navLabelActive]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </GlassCard>

      {/* CAPA OSCURA PARA CERRAR EL MENÚ */}
      {menuVisible && (
        <Pressable
          style={styles.overlay}
          onPress={() => setMenuVisible(false)}
        />
      )}

      {/* MENÚ LATERAL ANIMADO */}
      <Animated.View
        style={[styles.drawer, { transform: [{ translateX: menuAnimation }] }]}
      >
        <GlassCard
          intensity={70}
          style={[styles.drawerCard, { paddingTop: insets.top + 20 }]}
        >
          <Text style={styles.drawerTitle}>Menú</Text>
          {sections.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.drawerItem,
                selectedSection === item.key && styles.drawerItemActive,
              ]}
              onPress={() => navigate(item.key)}
            >
              <Text style={styles.drawerText}>
                {item.icon} {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </GlassCard>
      </Animated.View>
    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1226",
  },

  // Fondo
  blob: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.55,
  },
  blobBlue: {
    width: 260,
    height: 260,
    backgroundColor: "#2563EB",
    top: 80,
    right: -90,
  },
  blobTeal: {
    width: 220,
    height: 220,
    backgroundColor: "#0D9488",
    top: 380,
    left: -90,
  },
  blobOrange: {
    width: 200,
    height: 200,
    backgroundColor: "#EA580C",
    bottom: 120,
    right: -60,
    opacity: 0.4,
  },

  // Encabezado
  header: {
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: -6,
    marginBottom: -6,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  menuButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  menuIcon: {
    color: "#FFFFFF",
    fontSize: 26,
  },

  // Contenido
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  block: {
    marginBottom: 14,
  },
  center: {
    alignItems: "center",
  },
  photo: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  profession: {
    fontSize: 16,
    color: "#93C5FD",
    marginTop: 6,
  },
  description: {
    color: "#E2E8F0",
    textAlign: "center",
    marginTop: 14,
    lineHeight: 23,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 14,
    marginTop: 6,
  },
  text: {
    color: "#CBD5E1",
    lineHeight: 22,
  },
  info: {
    color: "#E2E8F0",
    fontSize: 15,
    marginBottom: 10,
  },
  projectImage: {
    width: "100%",
    height: 150,
    borderRadius: 14,
    marginBottom: 12,
  },
  projectName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },
  chip: {
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "rgba(37,99,235,0.85)",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },
  buttonGlass: {
    backgroundColor: "rgba(255,255,255,0.12)",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: {
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
  },

  // Navegación inferior
  bottomNavWrapper: {
    borderRadius: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    marginTop: -18,
    marginBottom: -18,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 14,
  },
  navItemActive: {
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  navIcon: {
    fontSize: 20,
  },
  navLabel: {
    color: "#94A3B8",
    fontSize: 10,
    marginTop: 2,
  },
  navLabelActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: MENU_WIDTH,
  },
  drawerCard: {
    flex: 1,
    borderRadius: 0,
    borderTopRightRadius: 26,
    borderBottomRightRadius: 26,
  },
  drawerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  drawerItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 6,
  },
  drawerItemActive: {
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  drawerText: {
    color: "#FFFFFF",
    fontSize: 17,
  },
});
