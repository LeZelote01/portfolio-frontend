import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Code, Network, ChevronRight, Star, Award } from 'lucide-react';
import useSkills from '../hooks/useSkills';
import useTechnologies from '../hooks/useTechnologies';
import LoadingSpinner from '../components/LoadingSpinner';

const Skills = () => {
  const { skills, loading: skillsLoading } = useSkills();
  const { technologies, loading: techLoading } = useTechnologies();
  const [activeSkillTab, setActiveSkillTab] = useState('cybersecurity');

  if (skillsLoading || techLoading) {
    return <LoadingSpinner />;
  }

  const skillCategories = {
    cybersecurity: {
      ...skills.cybersecurity,
      icon: Shield,
      color: 'from-red-500 to-orange-500'
    },
    python: {
      ...skills.python,
      icon: Code,
      color: 'from-blue-500 to-cyan-500'
    },
    network: {
      ...skills.network,
      icon: Network,
      color: 'from-green-500 to-emerald-500'
    }
  };

  const SkillBar = ({ skill, index }) => (
    <div className="space-y-2" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="flex justify-between items-center">
        <span className="text-white font-medium">{skill.name}</span>
        <span className="text-green-400 font-bold">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Mes <span className="text-green-400">compétences</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Expertise technique en cybersécurité, développement Python et infrastructure réseau
            </p>
          </div>
        </div>
      </section>

      {/* Skills Navigation */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {Object.entries(skillCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveSkillTab(key)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeSkillTab === key
                      ? 'bg-gradient-to-r from-green-400 to-cyan-400 text-gray-900'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <category.icon size={20} />
                  {category.title}
                </button>
              ))}
            </div>

            {/* Skills Content */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Skills List */}
              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-cyan-400 rounded-lg flex items-center justify-center">
                      {React.createElement(skillCategories[activeSkillTab].icon, { size: 24, className: "text-gray-900" })}
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {skillCategories[activeSkillTab].title}
                    </h3>
                  </div>
                  
                  <div className="space-y-6">
                    {skillCategories[activeSkillTab].items.map((skill, index) => (
                      <SkillBar key={index} skill={skill} index={index} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Technologies & Tools */}
              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Technologies & Outils
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {technologies.map((tech, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-700/50 transition-all duration-200 group"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <span className="text-gray-900 text-xs font-bold">
                            {tech.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">{tech.name}</div>
                          <div className="text-gray-400 text-xs">{tech.category}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications & Formation */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Formation continue
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                      <ChevronRight size={16} className="text-green-400" />
                      <span className="text-gray-300">Veille technologique quotidienne</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                      <ChevronRight size={16} className="text-green-400" />
                      <span className="text-gray-300">Participation à des CTF (Capture The Flag)</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                      <ChevronRight size={16} className="text-green-400" />
                      <span className="text-gray-300">Formations en ligne spécialisées</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                      <ChevronRight size={16} className="text-green-400" />
                      <span className="text-gray-300">Contribution à des projets open source</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Highlights */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Points <span className="text-green-400">forts</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center hover:border-green-400/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield size={32} className="text-gray-900" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Sécurité Proactive</h3>
                <p className="text-gray-400 leading-relaxed">
                  Approche préventive de la sécurité avec mise en place de systèmes de détection 
                  et de protection contre les menaces émergentes.
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center hover:border-green-400/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Code size={32} className="text-gray-900" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Code Sécurisé</h3>
                <p className="text-gray-400 leading-relaxed">
                  Développement d'applications Python avec les meilleures pratiques de sécurité 
                  et respect des standards industriels.
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center hover:border-green-400/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award size={32} className="text-gray-900" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Excellence Technique</h3>
                <p className="text-gray-400 leading-relaxed">
                  Engagement vers l'excellence avec une formation continue et une veille 
                  technologique constante dans le domaine de la cybersécurité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Mes compétences vous intéressent ?
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Découvrez comment je peux mettre mon expertise au service de vos projets 
                en cybersécurité et développement Python.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/projects"
                  className="bg-gradient-to-r from-green-400 to-cyan-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:from-green-500 hover:to-cyan-500 transition-all duration-200 transform hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                  Voir mes projets
                  <ChevronRight size={20} />
                </Link>
                <Link
                  to="/services"
                  className="border-2 border-green-400 text-green-400 px-8 py-4 rounded-lg font-semibold hover:bg-green-400 hover:text-gray-900 transition-all duration-200 transform hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                  Mes services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;