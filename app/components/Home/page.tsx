"use client"

import React, { useState } from 'react';
import { Calendar, Heart, Book, Bell, User, Moon, Sun, Info, X, ChevronRight, Activity, Droplets } from 'lucide-react';
import { SVGProps } from 'react';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Sample cycle phases data

// Sample cycle phases data
const cyclePhases = [
    { name: 'Menstrual', days: '1-5', description: 'Menstrual flow occurs' },
    { name: 'Follicular', days: '6-14', description: 'Estrogen levels rise' },
    { name: 'Ovulation', days: '14-16', description: 'Egg is released' },
    { name: 'Luteal', days: '17-28', description: 'Progesterone levels rise' }
  ];
  
  // Enhanced educational topics with detailed content
  const educationalTopics = [
    {
      title: 'Understanding Your Cycle',
      icon: Moon,
      content: [
        {
          phase: 'Menstrual Phase (Days 1-5)',
          description: 'The uterine lining is shed, resulting in menstrual flow.',
          symptoms: ['Cramps', 'Fatigue', 'Lower back pain'],
          tips: ['Use heat therapy for cramps', 'Stay hydrated', 'Rest when needed'],
          icon: Droplets
        },
        {
          phase: 'Follicular Phase (Days 6-14)',
          description: 'Estrogen levels rise as follicles develop in the ovaries.',
          symptoms: ['Increased energy', 'Better mood', 'Enhanced cognitive function'],
          tips: ['Good time for exercise', 'Plan important tasks', 'Stay active'],
          icon: Activity
        },
        {
          phase: 'Ovulation (Days 14-16)',
          description: 'A mature egg is released from the ovary.',
          symptoms: ['Mild pelvic pain', 'Changes in discharge', 'Increased libido'],
          tips: ['Track ovulation signs', 'Monitor body temperature', 'Note energy levels'],
          icon: Sun
        },
        {
          phase: 'Luteal Phase (Days 17-28)',
          description: 'Progesterone levels rise to prepare for possible pregnancy.',
          symptoms: ['PMS symptoms', 'Mood changes', 'Bloating'],
          tips: ['Practice self-care', 'Maintain regular sleep', 'Balanced nutrition'],
          icon: Moon
        }
      ]
    },
    {
      title: 'Sexual Health Basics',
      icon: Heart,
      content: [
        {
          title: 'Safe Practices',
          description: 'Understanding protection and prevention methods',
          bulletPoints: [
            'Different contraception methods',
            'STI prevention',
            'Regular health check-ups',
            'Communication with partners'
          ]
        },
        {
          title: 'Body Awareness',
          description: 'Understanding your body and its changes',
          bulletPoints: [
            'Anatomy basics',
            'Normal vs. abnormal changes',
            'When to seek medical help',
            'Self-examination guidelines'
          ]
        }
      ]
    },
    {
      title: 'Hygiene Tips',
      icon: Info,
      content: [
        {
          title: 'Daily Care',
          description: 'Essential hygiene practices',
          tips: [
            'Choose appropriate menstrual products',
            'Change products regularly',
            'Proper cleaning techniques',
            'Avoiding irritants'
          ]
        },
        {
          title: 'Product Guide',
          description: 'Understanding different hygiene products',
          products: [
            'Pads: Disposable and reusable options',
            'Tampons: Proper usage and safety',
            'Menstrual cups: Benefits and care',
            'Period underwear: Modern alternatives'
          ]
        }
      ]
    },
    {
      title: 'Emotional Wellness',
      icon: Sun,
      content: [
        {
          title: 'Mood Changes',
          description: 'Understanding hormonal influences on mood',
          strategies: [
            'Mindfulness and meditation',
            'Exercise and movement',
            'Stress management techniques',
            'Sleep hygiene'
          ]
        },
        {
          title: 'Support Systems',
          description: 'Building and maintaining emotional support',
          elements: [
            'Communication with loved ones',
            'Professional support options',
            'Community resources',
            'Self-care practices'
          ]
        }
      ]
    }
  ];

  interface Topic {
    title: string;
    icon: React.ComponentType<SVGProps<SVGSVGElement>>;  // SVG icon component type
    content: Phase[] | Section[];  // Depending on the topic, the content could be phases or sections
  }

  interface TopicModalProps {
    topic: Topic;
    onClose: () => void;
  }

  interface Phase {
    phase: string;
    description: string;
    symptoms: string[];
    tips: string[];
    icon: React.ComponentType<SVGProps<SVGSVGElement>>;  // If it's an SVG, this is a better type
  }

  interface Section {
    title: string;
    description: string;
    bulletPoints?: string[];  // Optional, for topics like "Sexual Health Basics"
    tips?: string[];          // Optional, for topics like "Hygiene Tips"
    products?: string[];      // Optional, if there are products in the content
    strategies?: string[];    // Optional, for "Emotional Wellness"
    elements?: string[];      // Optional, additional elements for "Emotional Wellness"
  }
  
  function isPhase(content: Phase | Section): content is Phase {
    return (content as Phase).icon !== undefined;
  }

  function isSection(section: Phase | Section): section is Section {
    return (section as Section).title !== undefined;
  }
  
  const TopicModal: React.FC<TopicModalProps> = ({ topic, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-700 flex items-center gap-2">
                <topic.icon className="w-6 h-6" />
                {topic.title}
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-300 bg-gray-200 rounded-full"
              >
                <X className="w-6 h-6 text-black" />
              </button>
            </div>
  
            {topic.title === 'Understanding Your Cycle' && (
                <div className="space-y-8">
                    {topic.content.map((phaseOrSection, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4 text-black">
                        {/* Use type guard to ensure 'icon' is only accessed if it's a Phase */}
                        {isPhase(phaseOrSection) && (
                            <>
                            <phaseOrSection.icon className="w-6 h-6 text-purple-500" />
                            <h3 className="text-xl font-semibold">{phaseOrSection.phase}</h3>
                            </>
                        )}
                        </div>
                        <p className="text-gray-700 mb-4">{phaseOrSection.description}</p>
                        <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold mb-2 text-purple-600">Common Symptoms</h4>
                            <ul className="list-disc list-inside space-y-1">
                            {/* Safely access symptoms only if it's a Phase */}
                            {isPhase(phaseOrSection) && phaseOrSection.symptoms.map((symptom, i) => (
                                <li key={i} className="text-gray-600">{symptom}</li>
                            ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-purple-600">Helpful Tips</h4>
                            <ul className="list-disc list-inside space-y-1">
                            {/* Safely access tips only if it's a Phase */}
                            {isPhase(phaseOrSection) && phaseOrSection.tips.map((tip, i) => (
                                <li key={i} className="text-gray-600">{tip}</li>
                            ))}
                            </ul>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                )}
  
                {topic.title === 'Sexual Health Basics' && (
                <div className="space-y-6">
                    {topic.content.map((sectionOrPhase, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                        {/* Type check for Section */}
                        {isSection(sectionOrPhase) ? (
                        <>
                            <h3 className="text-xl font-semibold mb-3 text-black">{sectionOrPhase.title}</h3>
                            <p className="text-gray-700 mb-4">{sectionOrPhase.description}</p>
                            
                            {/* Check for bullet points */}
                            {sectionOrPhase.bulletPoints && sectionOrPhase.bulletPoints.length > 0 && (
                            <ul className="space-y-2">
                                {sectionOrPhase.bulletPoints.map((point, i) => (
                                <li key={i} className="flex items-center gap-2 text-black">
                                    <ChevronRight className="w-4 h-4 text-purple-500" />
                                    <span>{point}</span>
                                </li>
                                ))}
                            </ul>
                            )}
                        </>
                        ) : (
                        <p>No section title</p>
                        )}
                    </div>
                    ))}
                </div>
                )}

  
                {topic.title === 'Hygiene Tips' && (
                <div className="space-y-6">
                    {topic.content.map((section, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                        {/* Type Guard to check if section is a Section */}
                        {isSection(section) ? (
                        <>
                            <h3 className="text-xl font-semibold mb-3 text-black">{section.title}</h3>
                            <p className="text-gray-700 mb-4">{section.description}</p>
                            <div className="grid gap-4">
                            {section.tips ? (
                                section.tips.map((tip, i) => (
                                <div key={i} className="flex items-center gap-2 text-black">
                                    <Info className="w-4 h-4 text-purple-500" />
                                    <span>{tip}</span>
                                </div>
                                ))
                            ) : (
                                // Only render products if they exist
                                section.products && section.products.length > 0 ? (
                                section.products.map((product, i) => (
                                    <div key={i} className="flex items-center gap-2 text-black">
                                    <Info className="w-4 h-4 text-purple-500" />
                                    <span>{product}</span>
                                    </div>
                                ))
                                ) : (
                                <p>No products available</p>
                                )
                            )}
                            </div>
                        </>
                        ) : (
                        <p>Not a section</p>
                        )}
                    </div>
                    ))}
                </div>
                )}
  
            {topic.title === 'Emotional Wellness' && (
            <div className="space-y-6">
                {topic.content.map((section, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                    {/* Type Guard to ensure section is a Section */}
                    {isSection(section) ? (
                    <>
                        <h3 className="text-xl font-semibold mb-3 text-black">{section.title}</h3>
                        <p className="text-gray-700 mb-4">{section.description}</p>
                        <div className="grid gap-4">
                        {/* Check if strategies exist */}
                        {section.strategies ? (
                            section.strategies.map((strategy, i) => (
                            <div key={i} className="flex items-center gap-2 text-black">
                                <Sun className="w-4 h-4 text-purple-500" />
                                <span>{strategy}</span>
                            </div>
                            ))
                        ) : (
                            // Safely check if elements exist
                            section.elements && section.elements.length > 0 ? (
                            section.elements.map((element, i) => (
                                <div key={i} className="flex items-center gap-2 text-black">
                                <Heart className="w-4 h-4 text-purple-500" />
                                <span>{element}</span>
                                </div>
                            ))
                            ) : (
                            <p>No elements available</p> // Fallback message
                            )
                        )}
                        </div>
                    </>
                    ) : (
                    <p>Not a section</p>
                    )}
                </div>
                ))}
            </div>
            )}



          </div>
        </div>
      </div>
    );
  };
  
  const HealthPlatform = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    // const [showWelcome, setShowWelcome] = useState(true);
    const [currentDay, setCurrentDay] = useState(1);
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
    const [showModal, setShowModal] = useState(false);
  
    const TabContent = () => {
      switch (activeTab) {
        case 'dashboard':
          return (
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md text-black">
                <h2 className="text-2xl font-semibold mb-4">Your Cycle Phase</h2>
                <div className="flex space-x-4 overflow-x-auto pb-4">
                  {cyclePhases.map((phase) => (
                    <div 
                      key={phase.name}
                      className={`flex-shrink-0 w-48 p-4 rounded-lg ${
                        currentDay >= parseInt(phase.days.split('-')[0]) && 
                        currentDay <= parseInt(phase.days.split('-')[1])
                          ? 'bg-purple-100 border-2 border-purple-500'
                          : 'bg-gray-50'
                      }`}
                    >
                      <h3 className="font-semibold">{phase.name}</h3>
                      <p className="text-sm text-gray-600">Days {phase.days}</p>
                      <p className="text-sm mt-2">{phase.description}</p>
                    </div>
                  ))}
                </div>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
                {educationalTopics.map((topic) => (
                  <div 
                    key={topic.title}
                    onClick={() => {
                      setSelectedTopic(topic);
                      setShowModal(true);
                    }}
                    className=" text-black p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center space-x-4 text-black">
                      <topic.icon className="w-8 h-8 text-purple-500" />
                      <h3 className="text-lg font-semibold text-black">{topic.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
  
        case 'calendar':
          return (
            <div className="bg-white rounded-lg p-6 shadow-md text-black">
              <h2 className="text-2xl font-semibold mb-4">Cycle Calendar</h2>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 28 }, (_, i) => (
                  <div
                    key={i}
                    onClick={() => setCurrentDay(i + 1)}
                    className={`p-4 rounded-lg text-center cursor-pointer
                      ${currentDay === i + 1 ? 'bg-purple-500 text-white' : 'bg-gray-50 hover:bg-purple-100'}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          );
  
        case 'learn':
          return (
            <div className="space-y-6 text-black">
            <h2 className="text-2xl font-semibold">Educational Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Topic {i + 1}</h3>
                  <p className="text-gray-600">Comprehensive information about menstrual and sexual health.</p>
                  <button className="mt-4 text-purple-500 font-semibold">Learn More →</button>
                </div>
              ))}
            </div>
          </div>
          );
  
        default:
          return null;
      }
    };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
              <Heart className="w-8 h-8 text-purple-500" />
                <span className="ml-2 text-xl font-bold text-gray-900">M2Care</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <User className="w-6 h-6 text-gray-500 cursor-pointer" />
              <Bell className="w-6 h-6 text-gray-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-6 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
              ${activeTab === 'dashboard' ? 'bg-purple-500 text-white' : 'text-gray-600 hover:bg-purple-100'}`}
          >
            <Heart className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
              ${activeTab === 'calendar' ? 'bg-purple-500 text-white' : 'text-gray-600 hover:bg-purple-100'}`}
          >
            <Calendar className="w-5 h-5" />
            <span>Calendar</span>
          </button>
          <button
            onClick={() => setActiveTab('learn')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
              ${activeTab === 'learn' ? 'bg-purple-500 text-white' : 'text-gray-600 hover:bg-purple-100'}`}
          >
            <Book className="w-5 h-5" />
            <span>Learn</span>
          </button>
        </div>

        <TabContent />
        
        {showModal && selectedTopic && (
          <TopicModal 
            topic={selectedTopic} 
            onClose={() => {
              setShowModal(false);
              setSelectedTopic(null);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default HealthPlatform;