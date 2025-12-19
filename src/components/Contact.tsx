import { Mail, Phone, Linkedin, Github, Code, Send, MapPin, User, MessageSquare, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { submitContactForm } from '../lib/api';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setFormStatus({ type: 'loading', message: 'Sending your message...' });

    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject || undefined,
        message: formData.message,
      });

      setFormStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Hide form after success
      setTimeout(() => {
        setShowForm(false);
        setFormStatus({ type: 'idle', message: '' });
      }, 3000);
    } catch (error) {
      setFormStatus({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.' 
      });
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'mshuvik@gmail.com',
      href: 'mailto:mshuvik@gmail.com',
      color: 'cyan',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Phone',
      value: '+91 9345802029',
      href: 'tel:+919345802029',
      color: 'purple',
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      value: 'Shuvik M',
      href: 'https://www.linkedin.com/in/shuvik-m-368659320',
      color: 'blue',
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: 'GitHub',
      value: '@Shuvikm',
      href: 'https://github.com/Shuvikm',
      color: 'pink',
    },
    {
      icon: <Code className="w-6 h-6" />,
      label: 'LeetCode',
      value: '@Shuvik_M',
      href: 'https://leetcode.com/u/Shuvik_M/',
      color: 'yellow',
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-purple-900/20"></div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4">
            <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border-2 border-cyan-400/30 px-6 py-3 rounded-full">
              <Send className="w-6 h-6 text-cyan-400" />
              <span className="text-cyan-400 font-bold text-lg">FINAL CHAPTER</span>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            LET'S <span className="text-cyan-400">CONNECT</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Ready to embark on a new adventure together? Let's create something amazing.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Contact Form Modal/Section */}
          {showForm && (
            <div className={`mb-12 transition-all duration-500 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-2xl opacity-20"></div>
                <div className="relative bg-slate-800/90 backdrop-blur-sm border-2 border-cyan-400/30 rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black text-white flex items-center gap-3">
                      <MessageSquare className="w-7 h-7 text-cyan-400" />
                      Send Me a Message
                    </h3>
                    <button
                      onClick={() => setShowForm(false)}
                      className="text-gray-400 hover:text-white transition-colors text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Name <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            className="w-full bg-slate-700/50 border-2 border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none transition-colors"
                            required
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            className="w-full bg-slate-700/50 border-2 border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none transition-colors"
                            required
                          />
                        </div>
                      </div>

                      {/* Phone Field */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 1234567890"
                            className="w-full bg-slate-700/50 border-2 border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Subject Field */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Subject
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="What's this about?"
                            className="w-full bg-slate-700/50 border-2 border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Message <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell me about your project or idea..."
                          rows={5}
                          className="w-full bg-slate-700/50 border-2 border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none transition-colors resize-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Status Message */}
                    {formStatus.type !== 'idle' && (
                      <div className={`flex items-center gap-3 p-4 rounded-xl ${
                        formStatus.type === 'success' ? 'bg-green-500/20 border border-green-400/30 text-green-400' :
                        formStatus.type === 'error' ? 'bg-red-500/20 border border-red-400/30 text-red-400' :
                        'bg-cyan-500/20 border border-cyan-400/30 text-cyan-400'
                      }`}>
                        {formStatus.type === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
                        {formStatus.type === 'success' && <CheckCircle className="w-5 h-5" />}
                        {formStatus.type === 'error' && <AlertCircle className="w-5 h-5" />}
                        <span>{formStatus.message}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formStatus.type === 'loading'}
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-cyan-400 hover:to-purple-500 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                    >
                      {formStatus.type === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="relative group h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-500 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-slate-800/70 backdrop-blur-sm border-2 border-cyan-400/30 rounded-2xl p-8 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">Location</h3>
                      <p className="text-gray-400">Based in India</p>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6">
                    Currently pursuing B.E. Computer Science at Kongu Engineering College, Erode. Open to remote opportunities and collaborations.
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Available for projects</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative group h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-slate-800/70 backdrop-blur-sm border-2 border-purple-400/30 rounded-2xl p-8 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                      <Send className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">Services</h3>
                      <p className="text-gray-400">What I can offer</p>
                    </div>
                  </div>

                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      Full-stack web development
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      Responsive frontend development
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      Backend API development
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      Database integration
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Basic UI/UX design
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Me Button */}
          <div className={`text-center mb-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
              onClick={() => setShowForm(true)}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg py-4 px-10 rounded-full hover:from-cyan-400 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/25"
            >
              <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Contact Me
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-slate-800/70 backdrop-blur-sm border-2 border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-black text-white mb-8 text-center">Get In Touch</h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contactMethods.map((method, index) => (
                    <a
                      key={method.label}
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`group/item relative bg-slate-800/50 border-2 border-white/10 rounded-xl p-6 hover:border-${method.color}-400/50 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br from-${method.color}-500/0 to-${method.color}-500/0 group-hover/item:from-${method.color}-500/10 group-hover/item:to-transparent rounded-xl transition-all duration-300`}></div>

                      <div className="relative z-10">
                        <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-${method.color}-500/20 to-${method.color}-500/10 rounded-lg mb-4 group-hover/item:scale-110 transition-transform`}>
                          <div className={`text-${method.color}-400`}>{method.icon}</div>
                        </div>

                        <div className="text-sm text-gray-400 mb-1">{method.label}</div>
                        <div className="text-white font-bold truncate">{method.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`mt-12 text-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-2xl opacity-30"></div>
              <div className="relative bg-slate-800/70 backdrop-blur-sm border-2 border-cyan-400/30 rounded-2xl px-12 py-6">
                <p className="text-lg text-gray-200 italic">
                  "Let's turn ideas into reality, one line of code at a time."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
    </section>
  );
}
