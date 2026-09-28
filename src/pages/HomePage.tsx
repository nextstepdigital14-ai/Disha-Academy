import React, { useState, useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CourseGridSection } from '../components/home/CourseGridSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { AboutSection } from '../components/home/AboutSection';
import { NoticeBoardSection } from '../components/home/NoticeBoardSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { GallerySection } from '../components/home/GallerySection';
import { FaqSection } from '../components/home/FaqSection';
import { LocationContactSection } from '../components/home/LocationContactSection';

import { contentService } from '../services/contentService';
import { SiteSettings, Course, Announcement, Testimonial } from '../types';

export const HomePage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.all([
      contentService.getSettings(),
      contentService.getCourses(),
      contentService.getAnnouncements(),
      contentService.getTestimonials()
    ])
      .then(([s, c, a, t]) => {
        setSettings(s);
        setCourses(c);
        setAnnouncements(a);
        setTestimonials(t);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load homepage data:', err);
        setLoading(false);
      });
  }, []);

  const whatsappNumber = settings?.whatsappNumber || '919028321505';

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection settings={settings} />
      <CourseGridSection courses={courses} whatsappNumber={whatsappNumber} />
      <FeaturesSection facultyList={settings?.facultyList} />
      <AboutSection />
      {announcements.length > 0 && <NoticeBoardSection announcements={announcements} />}
      <TestimonialsSection testimonials={testimonials} />
      <GallerySection images={settings?.galleryImages} />
      <FaqSection />
      <LocationContactSection settings={settings} />
    </div>
  );
};
