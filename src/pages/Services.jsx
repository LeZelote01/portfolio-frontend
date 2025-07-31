import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Code, Server, Users, ArrowRight, Clock, Euro, CheckCircle, Star } from 'lucide-react';
import useServices from '../hooks/useServices';
import useTestimonials from '../hooks/useTestimonials';
import useProcessSteps from '../hooks/useProcessSteps';
import LoadingSpinner from '../components/LoadingSpinner';

const Services = () => {
  const { services, loading: servicesLoading } = useServices();
  const { testimonials, loading: testimonialsLoading } = useTestimonials();
  const { processSteps, loading: processLoading } = useProcessSteps();

  if (servicesLoading || testimonialsLoading || processLoading) {
    return <LoadingSpinner />;
  }

  const getServiceIcon = (iconName) => {
    const icons = {
      Shield,
      Code,
      Server,
      Users
    };
    return icons[iconName] || Shield;
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Mes <span className="text-green-400">services</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Solutions professionnelles en cybersécurité, développement Python et infrastructure
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {services.map((service, index) => {
                const ServiceIcon = getServiceIcon(service.icon);
                return (
                  <div
                    key={service.id}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-green-400/50 transition-all duration-300 group hover:transform hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Service Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-cyan-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <ServiceIcon size={32} className="text-gray-900" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
                          {service.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Euro size={14} />
                            {service.price}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {service.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      <h4 className="text-lg font-semibold text-white">Ce qui est inclus :</h4>
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle size={16} className="text-green-400" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      to="/contact"
                      className="w-full bg-gradient-to-r from-green-400 to-cyan-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:from-green-500 hover:to-cyan-500 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      Demander un devis
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Mon processus de <span className="text-green-400">collaboration</span>
            </h2>
            
            <div className="grid md:grid-cols-5 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-green-400/50 transition-all duration-300 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-cyan-400 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-gray-900 font-bold">{step.step}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-green-400/30"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Ce que disent mes <span className="text-green-400">clients</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-green-400/50 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-green-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="mb-4">
                    <div className="text-green-400 text-4xl mb-2">"</div>
                    <p className="text-gray-300 leading-relaxed">
                      {testimonial.content}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-cyan-400 rounded-full flex items-center justify-center">
                      <span className="text-gray-900 font-bold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      <p className="text-gray-500 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Questions <span className="text-green-400">fréquentes</span>
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Quels sont vos délais d'intervention ?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Je réponds généralement sous 24h maximum. Pour les urgences sécuritaires, 
                  je peux intervenir dans les plus brefs délais selon ma disponibilité.
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Proposez-vous un suivi après la livraison ?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Oui, je propose systématiquement un suivi post-livraison avec support technique 
                  et maintenance corrective pendant une période définie selon le projet.
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Comment établissez-vous vos tarifs ?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Mes tarifs sont établis en fonction de la complexité du projet, du temps nécessaire 
                  et des technologies utilisées. Je propose toujours un devis détaillé et transparent.
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Travaillez-vous à distance ?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Oui, la plupart de mes missions peuvent être réalisées à distance. Pour certains 
                  projets nécessitant une présence physique, je peux me déplacer en région parisienne.
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
                Prêt à sécuriser votre infrastructure ?
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Contactez-moi pour discuter de vos besoins et obtenir un devis personnalisé 
                pour vos projets de cybersécurité et développement Python.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-green-400 to-cyan-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:from-green-500 hover:to-cyan-500 transition-all duration-200 transform hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                  Demander un devis
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/projects"
                  className="border-2 border-green-400 text-green-400 px-8 py-4 rounded-lg font-semibold hover:bg-green-400 hover:text-gray-900 transition-all duration-200 transform hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                  Voir mes projets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;