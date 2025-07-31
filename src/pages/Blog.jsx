import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, Calendar, User, Tag, ArrowRight, Clock } from 'lucide-react';

const Blog = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: "Les 10 vulnérabilités les plus critiques en 2024",
      excerpt: "Découvrez les vulnérabilités de sécurité les plus dangereuses identifiées cette année et comment vous en protéger.",
      content: "La cybersécurité évolue constamment avec de nouvelles menaces émergentes chaque jour...",
      author: "Jean Yves",
      date: "2024-01-15",
      category: "Cybersécurité",
      tags: ["Vulnérabilités", "Sécurité", "2024", "OWASP"],
      readTime: 8,
      featured: true
    },
    {
      id: 2,
      title: "Python pour la cybersécurité : Guide complet",
      excerpt: "Comment utiliser Python pour automatiser vos tâches de sécurité et développer des outils personnalisés.",
      content: "Python est devenu l'un des langages les plus populaires en cybersécurité...",
      author: "Jean Yves",
      date: "2024-01-10",
      category: "Python",
      tags: ["Python", "Automatisation", "Scripts", "Outils"],
      readTime: 12,
      featured: false
    },
    {
      id: 3,
      title: "Mise en place d'un SOC avec des outils open source",
      excerpt: "Créez votre propre Security Operations Center avec des solutions open source efficaces.",
      content: "Un SOC (Security Operations Center) est essentiel pour toute organisation...",
      author: "Jean Yves",
      date: "2024-01-05",
      category: "Infrastructure",
      tags: ["SOC", "Open Source", "Monitoring", "ELK Stack"],
      readTime: 15,
      featured: true
    },
    {
      id: 4,
      title: "Analyse forensique avec Python : Techniques avancées",
      excerpt: "Techniques d'analyse forensique numérique utilisant Python pour l'investigation d'incidents.",
      content: "L'analyse forensique numérique est une discipline cruciale en cybersécurité...",
      author: "Jean Yves",
      date: "2024-01-02",
      category: "Forensique",
      tags: ["Forensique", "Python", "Investigation", "Incidents"],
      readTime: 10,
      featured: false
    },
    {
      id: 5,
      title: "Sécurisation des APIs REST : Bonnes pratiques",
      excerpt: "Guide complet pour sécuriser vos APIs REST contre les attaques courantes.",
      content: "Les APIs REST sont omniprésentes dans les applications modernes...",
      author: "Jean Yves",
      date: "2023-12-28",
      category: "Développement",
      tags: ["API", "REST", "Sécurité", "OWASP"],
      readTime: 9,
      featured: false
    },
    {
      id: 6,
      title: "Détection d'intrusion avec Machine Learning",
      excerpt: "Implémentation d'un système de détection d'intrusion basé sur l'apprentissage automatique.",
      content: "Le machine learning révolutionne la détection d'intrusions...",
      author: "Jean Yves",
      date: "2023-12-25",
      category: "IA",
      tags: ["Machine Learning", "IDS", "Détection", "Anomalies"],
      readTime: 14,
      featured: true
    }
  ];

  const categories = [
    { id: 'all', name: 'Toutes les catégories', count: blogPosts.length },
    { id: 'Cybersécurité', name: 'Cybersécurité', count: blogPosts.filter(p => p.category === 'Cybersécurité').length },
    { id: 'Python', name: 'Python', count: blogPosts.filter(p => p.category === 'Python').length },
    { id: 'Infrastructure', name: 'Infrastructure', count: blogPosts.filter(p => p.category === 'Infrastructure').length },
    { id: 'Forensique', name: 'Forensique', count: blogPosts.filter(p => p.category === 'Forensique').length }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Blog <span className="text-green-400">Technique</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Découvrez mes articles sur la cybersécurité, Python et les dernières innovations techniques
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-4 mb-8">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-green-400 to-cyan-400 text-gray-900'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === 'all' && (
        <section className="py-12 bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">
                Articles <span className="text-green-400">en vedette</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.map(post => (
                  <div key={post.id} className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-green-400/50 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="text-xs bg-yellow-500 text-gray-900 px-2 py-1 rounded-full font-bold">
                        FEATURED
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(post.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime} min
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button className="text-green-400 hover:text-green-300 transition-colors flex items-center gap-1 text-sm font-medium">
                      Lire l'article <ArrowRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              {selectedCategory === 'all' ? 'Tous les articles' : `Articles - ${selectedCategory}`}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <article key={post.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-green-400/50 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="text-xs bg-yellow-500 text-gray-900 px-2 py-1 rounded-full font-bold">
                        FEATURED
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime} min
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="text-green-400 hover:text-green-300 transition-colors flex items-center gap-1 text-sm font-medium">
                    Lire l'article <ArrowRight size={14} />
                  </button>
                </article>
              ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-300 mb-2">Aucun article trouvé</h3>
                <p className="text-gray-500">Essayez de modifier votre recherche ou vos filtres</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Restez informé des dernières actualités
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Recevez mes derniers articles et conseils en cybersécurité directement dans votre boîte mail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
                <button className="bg-gradient-to-r from-green-400 to-cyan-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:from-green-500 hover:to-cyan-500 transition-all duration-200 transform hover:scale-105">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;