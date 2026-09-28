import React, { useState } from 'react';
import { SiteSettings, FacultyMember, GalleryItem } from '../../types';
import { contentService } from '../../services/contentService';
import { Settings, Save, CheckCircle2, MapPin, Phone, MessageCircle, Mail, Sparkles, Plus, Trash2 } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface WebsiteContentTabProps {
  settings: SiteSettings;
  onRefresh: () => void;
}

export const WebsiteContentTab: React.FC<WebsiteContentTabProps> = ({ settings, onRefresh }) => {
  const { showToast } = useNotification();

  const [academyName, setAcademyName] = useState(settings.academyName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [heroSubtitle, setHeroSubtitle] = useState(settings.heroSubtitle);
  const [address, setAddress] = useState(settings.address);
  const [googleMapsUrl, setGoogleMapsUrl] = useState(settings.googleMapsUrl);
  const [phone, setPhone] = useState(settings.phone);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [email, setEmail] = useState(settings.email);
  const [officeTimings, setOfficeTimings] = useState(settings.officeTimings);
  const [announcementTicker, setAnnouncementTicker] = useState(settings.announcementTicker);
  const [isTickerActive, setIsTickerActive] = useState(settings.isTickerActive);
  const [facultyList, setFacultyList] = useState<FacultyMember[]>(settings.facultyList || []);

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contentService.updateSettings({
        academyName,
        tagline,
        heroSubtitle,
        address,
        googleMapsUrl,
        phone,
        whatsappNumber,
        email,
        officeTimings,
        announcementTicker,
        isTickerActive,
        facultyList,
        galleryImages: settings.galleryImages
      });
      showToast('Academy website settings saved successfully!', 'success');
      onRefresh();
    } catch {
      showToast('Failed to save settings', 'error');
    }
  };

  const handleAddFaculty = () => {
    const newFac: FacultyMember = {
      id: 'fac-' + Date.now(),
      name: 'Faculty Name',
      role: 'Senior Educator',
      subject: 'Physics',
      experience: '10+ Years',
      qualification: 'M.Sc. / B.Tech',
      bio: 'Specialist in entrance exam problem solving.'
    };
    setFacultyList([...facultyList, newFac]);
  };

  const handleRemoveFaculty = (fId: string) => {
    setFacultyList(facultyList.filter((f) => f.id !== fId));
  };

  return (
    <form onSubmit={handleSaveAll} className="space-y-8 text-xs sm:text-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
            Website Content & Academy Details
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Edit contact numbers, verified address, WhatsApp, headline, announcement ticker, and faculty list.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm py-2.5 px-6 rounded-xl shadow-md transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Top Banner Ticker Settings */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
        <h3 className="font-bold text-base text-navy-950 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Top Announcement Bar / Ticker
        </h3>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="tickerToggle"
            checked={isTickerActive}
            onChange={(e) => setIsTickerActive(e.target.checked)}
            className="w-4 h-4 text-brand-600 rounded"
          />
          <label htmlFor="tickerToggle" className="font-semibold text-slate-700 dark:text-slate-300">
            Enable Top Ticker Banner on Website
          </label>
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
            Ticker Message Text
          </label>
          <input
            type="text"
            value={announcementTicker}
            onChange={(e) => setAnnouncementTicker(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
          />
        </div>
      </div>

      {/* Academy Identity & Hero Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
        <h3 className="font-bold text-base text-navy-950 dark:text-white">
          Academy Identity & Hero Section
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Academy Name (Verified) *
            </label>
            <input
              type="text"
              required
              value={academyName}
              onChange={(e) => setAcademyName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Tagline *
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
            Hero Subtitle Text *
          </label>
          <textarea
            rows={2}
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
          />
        </div>
      </div>

      {/* Contact & Location Settings */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
        <h3 className="font-bold text-base text-navy-950 dark:text-white">
          Official Contact & Location
        </h3>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
            Campus Address (Verified from Google Maps) *
          </label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
            Google Maps Link *
          </label>
          <input
            type="url"
            required
            value={googleMapsUrl}
            onChange={(e) => setGoogleMapsUrl(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Phone Number *
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              WhatsApp (Digits only, wa.me format) *
            </label>
            <input
              type="text"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
            Office & Visiting Timings
          </label>
          <input
            type="text"
            value={officeTimings}
            onChange={(e) => setOfficeTimings(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
          />
        </div>
      </div>

      {/* Faculty List Editor */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-navy-950 dark:text-white">
            Faculty Members ({facultyList.length})
          </h3>
          <button
            type="button"
            onClick={handleAddFaculty}
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Faculty Member
          </button>
        </div>

        <div className="space-y-3">
          {facultyList.map((fac, idx) => (
            <div
              key={fac.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 flex-1 w-full">
                <input
                  type="text"
                  value={fac.name}
                  onChange={(e) => {
                    const newF = [...facultyList];
                    newF[idx].name = e.target.value;
                    setFacultyList(newF);
                  }}
                  placeholder="Name"
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
                <input
                  type="text"
                  value={fac.role}
                  onChange={(e) => {
                    const newF = [...facultyList];
                    newF[idx].role = e.target.value;
                    setFacultyList(newF);
                  }}
                  placeholder="Designation"
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
                <input
                  type="text"
                  value={fac.qualification}
                  onChange={(e) => {
                    const newF = [...facultyList];
                    newF[idx].qualification = e.target.value;
                    setFacultyList(newF);
                  }}
                  placeholder="Qualification"
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
                <input
                  type="text"
                  value={fac.experience}
                  onChange={(e) => {
                    const newF = [...facultyList];
                    newF[idx].experience = e.target.value;
                    setFacultyList(newF);
                  }}
                  placeholder="Experience (e.g. 14+ Years)"
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemoveFaculty(fac.id)}
                className="text-rose-500 hover:text-rose-700 p-1 self-end sm:self-center"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
