import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { 
  Users, Code, Shield, Clock, LogOut, User, 
  FolderOpen, Briefcase, MessageSquare, Settings,
  BarChart3, Activity, TrendingUp
} from 'lucide-react';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    services: 0,
    testimonials: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchStats();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    const tokenType = localStorage.getItem('admin_token_type');
    
    if (!token) {
      navigate('/admin/login');
      return null;
    }
    
    return {
      'Authorization': `${tokenType} ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchUserData = async () => {
    try {
      const headers = getAuthHeaders();
      if (!headers) return;

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/me`, {
        headers
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/admin/login');
          return;
        }
        throw new Error('Erreur lors de la récupération des données utilisateur');
      }

      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchStats = async () => {
    try {
      const headers = getAuthHeaders();
      if (!headers) return;

      const [projectsRes, skillsRes, servicesRes, testimonialsRes] = await Promise.all([
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/projects`, { headers }),
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/skills`, { headers }),
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/services`, { headers }),
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/testimonials`, { headers })
      ]);

      const [projects, skills, services, testimonials] = await Promise.all([
        projectsRes.json(),
        skillsRes.json(),
        servicesRes.json(),
        testimonialsRes.json()
      ]);

      setStats({
        projects: projects.length || 0,
        skills: skills.length || 0,
        services: services.length || 0,
        testimonials: testimonials.length || 0
      });
    } catch (err) {
      console.error('Erreur lors du chargement des statistiques:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_token_type');
    navigate('/admin/login');
  };

  const quickActions = [
    {
      title: 'Informations personnelles',
      description: 'Modifier le profil et les coordonnées',
      icon: User,
      path: '/admin/personal',
      color: 'bg-blue-500'
    },
    {
      title: 'Gérer les projets',
      description: 'Ajouter, modifier ou supprimer des projets',
      icon: FolderOpen,
      path: '/admin/projects',
      color: 'bg-green-500'
    },
    {
      title: 'Gérer les compétences',
      description: 'Organiser les compétences par catégories',
      icon: Code,
      path: '/admin/skills',
      color: 'bg-purple-500'
    },
    {
      title: 'Gérer les services',
      description: 'Configurer les offres de services',
      icon: Briefcase,
      path: '/admin/services',
      color: 'bg-orange-500'
    },
    {
      title: 'Gérer les témoignages',
      description: 'Modérer et organiser les témoignages',
      icon: MessageSquare,
      path: '/admin/testimonials',
      color: 'bg-pink-500'
    },
    {
      title: 'Paramètres',
      description: 'Configuration générale du système',
      icon: Settings,
      path: '/admin/settings',
      color: 'bg-gray-500'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Activity className="mx-auto h-8 w-8 animate-spin text-primary mb-4" />
          <p>Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Administration
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Panneau de gestion du portfolio
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.username}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              )}
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <FolderOpen className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Projets
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.projects}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <Code className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Compétences
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.skills}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <Briefcase className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Services
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.services}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <MessageSquare className="h-8 w-8 text-pink-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Témoignages
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.testimonials}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(action.path)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                      {action.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Activité récente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Activité récente
            </CardTitle>
            <CardDescription>
              Dernières modifications apportées au portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Données migrées vers MongoDB</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Il y a quelques minutes
                  </p>
                </div>
                <Badge variant="secondary">Système</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Dashboard admin créé</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Il y a quelques minutes
                  </p>
                </div>
                <Badge variant="secondary">Développement</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;