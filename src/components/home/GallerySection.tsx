import React, { useState } from 'react';
import { GalleryItem } from '../../types';
import { Image as ImageIcon } from 'lucide-react';

interface GallerySectionProps {
  images?: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ images = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Classroom', 'Lab', 'Campus', 'Events', 'Olympiad'];

  const filtered = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category === selectedCategory);

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5" /> Campus Life & Activities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Inside Disha Academy & Olympiad School
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Take a look at our classrooms, demonstration labs, study library, and student testing workshops.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-soft hover:shadow-premium transition-all duration-300 border border-slate-200/80 dark:border-slate-800"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-black/40 w-max mb-1">
                  {item.category}
                </span>
                <h4 className="text-white font-bold text-sm leading-snug">{item.title}</h4>
                <p className="text-slate-300 text-xs mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
