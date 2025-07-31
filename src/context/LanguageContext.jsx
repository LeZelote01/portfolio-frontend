import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Traductions
const translations = {
  fr: {
    // Navigation
    home: "Accueil",
    about: "À propos",
    skills: "Compétences",
    projects: "Projets",
    services: "Services",
    contact: "Contact",
    blog: "Blog",
    
    // Hero Section
    specialist: "Spécialiste",
    cybersecurity: "Cybersécurité",
    developer: "Développeur",
    subtitle: "Expert en sécurité numérique et développement d'applications Python",
    heroDescription: "Expert en sécurité numérique et développement d'applications Python. J'accompagne les entreprises dans leur transformation digitale sécurisée.",
    discoverProjects: "Découvrir mes projets",
    myServices: "Mes services",
    
    // Stats
    projectsCompleted: "Projets réalisés",
    clientsSatisfied: "Clients satisfaits",
    vulnerabilitiesDetected: "Vulnérabilités détectées",
    developmentHours: "Heures de développement",
    
    // Common
    loading: "Chargement...",
    readMore: "Lire plus",
    viewAll: "Voir tout",
    seeMore: "Voir plus",
    requestQuote: "Demander un devis",
    contactMe: "Contactez-moi",
    
    // About
    myJourney: "Mon parcours",
    myMission: "Ma mission",
    workProcess: "Mon processus de travail",
    personalizedApproach: "Approche personnalisée",
    technicalExpertise: "Expertise technique",
    concreteResults: "Résultats concrets",
    reactivity: "Réactivité",
    
    // Skills
    mySkills: "Mes compétences",
    technicalExpertiseSubtitle: "Expertise technique en cybersécurité, développement Python et infrastructure réseau",
    technologiesTools: "Technologies & Outils",
    continuousTraining: "Formation continue",
    
    // Projects
    myProjects: "Mes projets",
    projectsSubtitle: "Découvrez mes réalisations techniques en cybersécurité, Python et développement",
    filterByCategory: "Filtrer par catégorie",
    filterByLevel: "Filtrer par niveau",
    allProjects: "Tous les projets",
    allLevels: "Tous niveaux",
    beginner: "Débutant",
    intermediate: "Intermédiaire",
    advanced: "Avancé",
    completed: "Terminé",
    inProgress: "En cours",
    planned: "Planifié",
    keyFeatures: "Fonctionnalités clés",
    duration: "Durée",
    
    // Services
    myServicesTitle: "Mes services",
    servicesSubtitle: "Solutions professionnelles en cybersécurité, développement Python et infrastructure",
    collaborationProcess: "Mon processus de collaboration",
    whatClientsSay: "Ce que disent mes clients",
    frequentlyAsked: "Questions fréquentes",
    
    // Contact
    contactTitle: "Contactez-moi",
    contactSubtitle: "Discutons de vos besoins en cybersécurité et développement Python",
    contactInfo: "Informations de contact",
    socialNetworks: "Réseaux sociaux",
    quickResponse: "Réponse rapide",
    sendMessage: "Envoyez-moi un message",
    fullName: "Nom complet",
    email: "Email",
    subject: "Sujet",
    message: "Message",
    serviceOfInterest: "Service d'intérêt",
    selectService: "Sélectionnez un service",
    sendingMessage: "Envoi en cours...",
    sendMessageBtn: "Envoyer le message",
    
    // Footer
    followMe: "Suivez-moi",
    backToTop: "Retour en haut",
    allRightsReserved: "Tous droits réservés",
    createdWith: "Créé avec",
    andCoffee: "et beaucoup de café"
  },
  en: {
    // Navigation
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    services: "Services",
    contact: "Contact",
    blog: "Blog",
    
    // Hero Section
    specialist: "Specialist",
    cybersecurity: "Cybersecurity",
    developer: "Developer",
    subtitle: "Digital security expert and Python application development",
    heroDescription: "Digital security expert and Python application development. I help companies in their secure digital transformation.",
    discoverProjects: "Discover my projects",
    myServices: "My services",
    
    // Stats
    projectsCompleted: "Projects completed",
    clientsSatisfied: "Satisfied clients",
    vulnerabilitiesDetected: "Vulnerabilities detected",
    developmentHours: "Development hours",
    
    // Common
    loading: "Loading...",
    readMore: "Read more",
    viewAll: "View all",
    seeMore: "See more",
    requestQuote: "Request quote",
    contactMe: "Contact me",
    
    // About
    myJourney: "My journey",
    myMission: "My mission",
    workProcess: "My work process",
    personalizedApproach: "Personalized approach",
    technicalExpertise: "Technical expertise",
    concreteResults: "Concrete results",
    reactivity: "Reactivity",
    
    // Skills
    mySkills: "My skills",
    technicalExpertiseSubtitle: "Technical expertise in cybersecurity, Python development and network infrastructure",
    technologiesTools: "Technologies & Tools",
    continuousTraining: "Continuous training",
    
    // Projects
    myProjects: "My projects",
    projectsSubtitle: "Discover my technical achievements in cybersecurity, Python and development",
    filterByCategory: "Filter by category",
    filterByLevel: "Filter by level",
    allProjects: "All projects",
    allLevels: "All levels",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    completed: "Completed",
    inProgress: "In progress",
    planned: "Planned",
    keyFeatures: "Key features",
    duration: "Duration",
    
    // Services
    myServicesTitle: "My services",
    servicesSubtitle: "Professional solutions in cybersecurity, Python development and infrastructure",
    collaborationProcess: "My collaboration process",
    whatClientsSay: "What my clients say",
    frequentlyAsked: "Frequently asked questions",
    
    // Contact
    contactTitle: "Contact me",
    contactSubtitle: "Let's discuss your cybersecurity and Python development needs",
    contactInfo: "Contact information",
    socialNetworks: "Social networks",
    quickResponse: "Quick response",
    sendMessage: "Send me a message",
    fullName: "Full name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    serviceOfInterest: "Service of interest",
    selectService: "Select a service",
    sendingMessage: "Sending...",
    sendMessageBtn: "Send message",
    
    // Footer
    followMe: "Follow me",
    backToTop: "Back to top",
    allRightsReserved: "All rights reserved",
    createdWith: "Created with",
    andCoffee: "and lots of coffee"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    toggleLanguage,
    t,
    isFrench: language === 'fr'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};