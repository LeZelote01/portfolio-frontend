import { useState, useEffect } from 'react';

const useSkills = () => {
  const defaultSkills = {
    cybersecurity: {
      title: "Cybersécurité",
      icon: "shield-check",
      items: [
        { name: "Audit de sécurité", level: 95 },
        { name: "Pentesting", level: 90 },
        { name: "Forensique", level: 85 }
      ]
    }
  };

  const defaultSkillCategories = [
    {
      id: "1",
      title: "Cybersécurité",
      icon: "shield-check",
      category_key: "cybersecurity",
      items: [
        { name: "Audit de sécurité", level: 95 },
        { name: "Pentesting", level: 90 },
        { name: "Forensique", level: 85 }
      ]
    }
  ];

  const [skills, setSkills] = useState(defaultSkills);
  const [skillCategories, setSkillCategories] = useState(defaultSkillCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/public/skills`);
        
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des compétences');
        }
        
        const data = await response.json();
        
        if (data && data.length > 0) {
          setSkillCategories(data);
          
          // Convertir le tableau en objet pour l'ancien format
          const skillsObj = {};
          data.forEach(category => {
            skillsObj[category.category_key] = {
              title: category.title,
              icon: category.icon,
              items: category.items || []
            };
          });
          setSkills(skillsObj);
        }
        
        setError(null);
      } catch (err) {
        console.warn('Utilisation des données par défaut pour les compétences:', err.message);
        setError(null); // Ne pas afficher d'erreur, utiliser les données par défaut
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { skills, skillCategories, loading, error };
};

export default useSkills;