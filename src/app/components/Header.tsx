'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">E-Ticaret</span>
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md transition-colors"
              >
                Hakkımızda
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md transition-colors"
              >
                İletişim
              </Link>
            </div>
          </div>
          
          {/* Sağ taraftaki navigasyon linkleri */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/admin/dashboard" 
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
            >
              Admin Panel
            </Link>
            <Link 
              href="/auth/login" 
              className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md transition-colors"
            >
              Giriş Yap
            </Link>
            <Link 
              href="/auth/register" 
              className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-4 py-2 rounded-md transition-colors"
            >
              Kayıt Ol
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 