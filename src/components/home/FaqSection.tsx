import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQ[] = [
    {
      question: "Which courses and entrance exams are coached at Disha Academy?",
      answer: "We specialize in classroom coaching for MHT-CET (PCM & PCB), JEE Main & Advanced (Engineering), and NEET-UG (Medical). We also conduct foundation batches for Class 11 and intensive repeater/dropper batches."
    },
    {
      question: "Where is the academy located and how can I visit?",
      answer: "Our academy is located at Plot No. 4, Radhanagari Road, Behind Bank of Maharashtra, Sane Guruji Vasahat, Kanerkar Nagar, Kolhapur. You can visit between 8:00 AM and 8:30 PM (Mon-Sat) or 9:00 AM to 2:00 PM (Sunday)."
    },
    {
      question: "How does Disha Academy handle student doubt clearance?",
      answer: "We conduct dedicated daily doubt sessions where students sit directly with faculty members to resolve problem hurdles. In addition, teachers are available before and after class hours."
    },
    {
      question: "Are tests conducted online (CBT) or on paper (OMR)?",
      answer: "We provide both! For MHT-CET and JEE Main, students practice in our computer lab with an exam simulation interface identical to the actual exam. For NEET, regular practice is conducted on physical NTA-standard OMR sheets."
    },
    {
      question: "Is printed study material provided?",
      answer: "Yes, every enrolled student receives comprehensive printed theory modules, chapter-wise question banks with 15+ years of PYQs, and 24/7 access to our online PDF notes and formula sheets."
    },
    {
      question: "What is the batch size and why does it matter?",
      answer: "We strictly cap batches at 30 to 40 students. Small batch sizes allow our teachers to know every student personally, track individual weak chapters, and offer customized mentoring."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Everything you need to know about our batches, methodology, and admissions.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-soft transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-navy-950 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
