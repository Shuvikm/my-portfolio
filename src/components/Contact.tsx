import { Mail, Phone, Linkedin, Github, Code, Send, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { submitContactForm } from '../lib/api';

interface FormData {
  name: string;
  email: string;
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
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: 'idle', message: '' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ type: 'error', message: 'Please fill in all fields!' });
      return;
    }
    setFormStatus({ type: 'loading', message: 'Sending...' });
    try {
      await submitContactForm(formData);
      setFormStatus({ type: 'success', message: 'Message sent!' });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setShowForm(false);
        setFormStatus({ type: 'idle', message: '' });
      }, 2000);
    } catch (error) {
      setFormStatus({ type: 'error', message: error instanceof Error ? error.message : 'Failed!' });
    }
  };

  const contactLinks = [
    { icon: Mail, label: 'Email', value: 'mshuvik@gmail.com', href: 'mailto:mshuvik@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 9345802029', href: 'tel:+919345802029' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Shuvik M', href: 'https://www.linkedin.com/in/shuvikm/' },
    { icon: Github, label: 'GitHub', value: '@Shuvikm', href: 'https://github.com/Shuvikm' },
    { icon: Code, label: 'LeetCode', value: '@Shuvik_M', href: 'https://leetcode.com/u/Shuvik_M/' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="manga-section">
      {/* Section Header */}
      <div className="manga-panel p-6 mb-4">
        <div className="flex items-center gap-4">
          <div className="exclaim-box">05</div>
          <h2 className="manga-title text-3xl sm:text-4xl text-[#1a1a1a]">CONTACT</h2>
        </div>
      </div>

      {/* Call to action */}
      <div className="manga-panel manga-panel-dark p-6 mb-4 text-center">
        <div className="thought-bubble inline-block">
          Have a project in mind? Let's collaborate!
        </div>
      </div>

      {/* Contact Form or Button */}
      {showForm ? (
        <div className="manga-panel p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black uppercase text-[#1a1a1a] flex items-center gap-2">
              <MessageSquare className="w-5 h-5" /> Send Message
            </h3>
            <button onClick={() => setShowForm(false)} className="text-2xl font-bold text-[#4a4a4a] hover:text-[#1a1a1a]">×</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-1">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your name" className="w-full px-4 py-3 border-4 border-[#1a1a1a] focus:outline-none focus:border-[#fbbf24]" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" className="w-full px-4 py-3 border-4 border-[#1a1a1a] focus:outline-none focus:border-[#fbbf24]" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1a1a1a] mb-1">Message</label>
              <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell me about your project..." rows={4} className="w-full px-4 py-3 border-4 border-[#1a1a1a] focus:outline-none focus:border-[#fbbf24] resize-none" required />
            </div>

            {formStatus.type !== 'idle' && (
              <div className={`thought-bubble text-sm font-bold flex items-center gap-2 ${formStatus.type === 'success' ? 'bg-green-100 text-green-700' :
                formStatus.type === 'error' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                {formStatus.type === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                {formStatus.type === 'success' && <CheckCircle className="w-4 h-4" />}
                {formStatus.type === 'error' && <AlertCircle className="w-4 h-4" />}
                {formStatus.message}
              </div>
            )}

            <button type="submit" disabled={formStatus.type === 'loading'} className="manga-button w-full flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              <span>SEND!</span>
            </button>
          </form>
        </div>
      ) : (
        <div className="manga-panel p-6 mb-4 text-center">
          <button onClick={() => setShowForm(true)} className="manga-button">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Send a Message!
          </button>
        </div>
      )}

      {/* Contact Links */}
      <div className="panel-grid panel-grid-3 mb-4">
        {contactLinks.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`manga-panel p-4 block transition-all hover:shadow-lg ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1a1a1a]">
                <link.icon className="w-4 h-4 text-[#fbbf24]" />
              </div>
              <div className="thought-bubble py-1 px-3 text-sm flex-1">
                <div className="text-xs text-[#4a4a4a] uppercase font-bold">{link.label}</div>
                <div className="font-bold text-[#1a1a1a] truncate">{link.value}</div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Footer Quote */}
      <div className="manga-panel manga-panel-dark p-6 text-center">
        <div className="thought-bubble inline-block mb-4">
          "Let's turn ideas into reality, one line of code at a time."
        </div>
        <div className="text-sm text-[#fbbf24] font-bold">
          © 2024 SHUVIK M — All Rights Reserved
        </div>
      </div>
    </section>
  );
}
