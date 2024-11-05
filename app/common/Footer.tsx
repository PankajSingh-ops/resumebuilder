"use client"
import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  PhoneCall,
  MapPin,
  FileCheck
} from 'lucide-react';
import { FooterSection, SocialLink } from './types';
import { useRouter } from 'next/navigation';

const footerSections: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { title: 'Templates', href: '/templates' },
      { title: 'Features', href: '/features' },
      { title: 'Pricing', href: '/pricing' },
      { title: 'Examples', href: '/examples' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { title: 'Resume Guide', href: '/guide' },
      { title: 'Career Blog', href: '/blog' },
      { title: 'Help Center', href: '/help' },
      { title: 'FAQ', href: '/faq' }
    ]
  },
  {
    title: 'Company',
    links: [
      { title: 'About Us', href: '/about-us' },
      { title: 'Careers', href: '/careers' },
      { title: 'Contact', href: '/contact-us' },
      { title: 'Privacy Policy', href: '/privacy' }
    ]
  }
];

const socialLinks: SocialLink[] = [
  { platform: 'Facebook', href: '#', icon: <Facebook className="w-5 h-5" /> },
  { platform: 'Twitter', href: '#', icon: <Twitter className="w-5 h-5" /> },
  { platform: 'Instagram', href: '#', icon: <Instagram className="w-5 h-5" /> },
  { platform: 'LinkedIn', href: '#', icon: <Linkedin className="w-5 h-5" /> }
];

export const Footer: React.FC = () => {
  const router=useRouter()
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-lg transform rotate-6" />
                <FileCheck className="w-8 h-8 text-white relative z-10" />
              </div>
              <div className="font-bold text-2xl">ResumeBuilder</div>
            </div>
            <p className="text-gray-400">
              Create professional resumes in minutes with our easy-to-use builder
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  onClick={()=>router.push(`${social.href}`)}
                  className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
                  aria-label={social.platform}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <a
                      onClick={()=>router.push(`${link.href}`)}
                      className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 text-gray-400">
              <Mail className="w-5 h-5" />
              <span>support@resumebuilder.com</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <PhoneCall className="w-5 h-5" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <MapPin className="w-5 h-5" />
              <span>123 Builder Street, Suite 100, NY 10001</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} ResumeBuilder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};