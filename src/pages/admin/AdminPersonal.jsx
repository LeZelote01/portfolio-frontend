import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { ArrowLeft, Save, User } from 'lucide-react';

const AdminPersonal = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    title: '',
    subtitle: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    availability: '',
    website: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPersonalInfo();
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

  const fetchPersonalInfo = async () => {
    try {
      const headers = getAuthHeaders();
      if (!headers) return;

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/personal`, {
        headers
      });

      if (response.ok) {
        const data = await response.json();
        setPersonalInfo(data);
      } else if (response.status === 404) {
        // Pas d'informations personnelles encore
        setError('Aucune information personnelle trouvée. Vous pouvez en créer.');
      } else {
        throw new Error('Erreur lors du chargement des informations personnelles');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const headers = getAuthHeaders();
      if (!headers) return;

      // Déterminer si c'est une création ou une mise à jour
      const hasId = personalInfo.id;
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/admin/personal`;
      const method = hasId ? 'PUT' : 'POST';

      const dataToSend = {
        name: personalInfo.name,
        title: personalInfo.title,
        subtitle: personalInfo.subtitle,
        bio: personalInfo.bio,
        email: personalInfo.email,
        phone: personalInfo.phone || null,
        location: personalInfo.location || null,
        availability: personalInfo.availability || null,
        website: personalInfo.website || null
      };

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erreur lors de la sauvegarde');
      }

      const updatedData = await response.json();
      setPersonalInfo(updatedData);
      setSuccess('Informations personnelles sauvegardées avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <p>Chargement des informations personnelles...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Button
                variant="outline"
                onClick={() => navigate('/admin/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Informations personnelles
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Gérer votre profil et vos coordonnées
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profil professionnel
            </CardTitle>
            <CardDescription>
              Ces informations apparaîtront sur votre portfolio public
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={personalInfo.name}
                    onChange={handleChange}
                    required
                    placeholder="Jean Yves"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={handleChange}
                    required
                    placeholder="contact@example.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="title">Titre professionnel *</Label>
                <Input
                  id="title"
                  name="title"
                  value={personalInfo.title}
                  onChange={handleChange}
                  required
                  placeholder="Spécialiste Cybersécurité & Développeur Python"
                />
              </div>

              <div>
                <Label htmlFor="subtitle">Sous-titre</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  value={personalInfo.subtitle}
                  onChange={handleChange}
                  placeholder="Expert en sécurité numérique et développement d'applications Python"
                />
              </div>

              <div>
                <Label htmlFor="bio">Biographie *</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={personalInfo.bio}
                  onChange={handleChange}
                  rows={5}
                  required
                  placeholder="Présentez-vous professionnellement..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handleChange}
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Localisation</Label>
                  <Input
                    id="location"
                    name="location"
                    value={personalInfo.location}
                    onChange={handleChange}
                    placeholder="Paris, France"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="availability">Disponibilité</Label>
                  <Input
                    id="availability"
                    name="availability"
                    value={personalInfo.availability}
                    onChange={handleChange}
                    placeholder="Disponible pour missions freelance"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Site web</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={personalInfo.website}
                    onChange={handleChange}
                    placeholder="https://votre-site.com"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminPersonal;