// Comprehensive Course Data for Psychology Courses System

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number; // in hours
  level: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  students: number;
  subject: string;
  subjectDisplayName: string;
  order: number; // Order within subject
  isPremium: boolean;
  thumbnail: string;
  objectives: string[];
  modules: CourseModule[];
  prerequisites?: string[];
  certificate: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  type: 'video' | 'reading' | 'exercise' | 'quiz' | 'reflection';
  content?: string; // For reading modules
  videoUrl?: string; // For video modules
  exercises?: Exercise[];
  quiz?: Quiz;
  isRequired: boolean;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  timeEstimate: number; // in minutes
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number; // percentage
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

export const subjects = [
  {
    id: 'trading_psychology_fundamentals',
    name: 'Trading Psychology Fundamentals',
    description: 'Master the basics of trading psychology and mental frameworks',
    icon: '🧠',
    color: 'blue'
  },
  {
    id: 'risk_management_psychology',
    name: 'Risk Management Psychology',
    description: 'Understand the psychological aspects of risk and money management',
    icon: '🛡️',
    color: 'green'
  },
  {
    id: 'emotional_control_regulation',
    name: 'Emotional Control & Regulation',
    description: 'Learn to manage emotions and maintain psychological balance',
    icon: '❤️',
    color: 'red'
  },
  {
    id: 'behavioral_patterns_habits',
    name: 'Behavioral Patterns & Habits',
    description: 'Identify and modify trading behaviors for better performance',
    icon: '🔄',
    color: 'purple'
  },
  {
    id: 'market_psychology_sentiment',
    name: 'Market Psychology & Sentiment',
    description: 'Understand crowd psychology and market sentiment dynamics',
    icon: '📈',
    color: 'orange'
  },
  {
    id: 'advanced_trading_psychology',
    name: 'Advanced Trading Psychology',
    description: 'Master advanced psychological strategies for professional trading',
    icon: '🎯',
    color: 'indigo'
  }
];

export const courses: Course[] = [
  // Trading Psychology Fundamentals (4 courses)
  {
    id: 'TPF-001',
    title: 'Introduction to Trading Psychology',
    description: 'Discover the fundamental principles of trading psychology and how your mind affects your trading decisions.',
    instructor: 'Dr. Sarah Chen',
    duration: 3,
    level: 'beginner',
    rating: 4.8,
    students: 3247,
    subject: 'trading_psychology_fundamentals',
    subjectDisplayName: 'Trading Psychology Fundamentals',
    order: 1,
    isPremium: false,
    thumbnail: '/course-thumbnails/tpf-001.jpg',
    certificate: true,
    objectives: [
      'Understand the role of psychology in trading success',
      'Identify common psychological pitfalls in trading',
      'Learn the basics of emotional awareness in trading',
      'Develop a foundation for psychological self-assessment'
    ],
    modules: [
      {
        id: 'TPF-001-M1',
        title: 'Welcome to Trading Psychology',
        description: 'Course overview and introduction to key concepts',
        duration: 15,
        type: 'video',
        videoUrl: '/videos/tpf-001-m1.mp4',
        isRequired: true
      },
      {
        id: 'TPF-001-M2',
        title: 'The Psychology-Performance Connection',
        description: 'How psychological factors directly impact trading performance',
        duration: 25,
        type: 'video',
        videoUrl: '/videos/tpf-001-m2.mp4',
        isRequired: true
      },
      {
        id: 'TPF-001-M3',
        title: 'Common Psychological Traps',
        description: 'Reading material covering the most frequent mental pitfalls',
        duration: 20,
        type: 'reading',
        content: `# Common Psychological Traps in Trading

## 1. Overconfidence Bias
Overconfidence leads traders to take excessive risks and ignore warning signs...

## 2. Loss Aversion
The tendency to feel losses more acutely than equivalent gains...

## 3. Confirmation Bias
Seeking information that confirms existing beliefs while ignoring contradictory evidence...`,
        isRequired: true
      },
      {
        id: 'TPF-001-M4',
        title: 'Self-Assessment Exercise',
        description: 'Evaluate your current psychological tendencies',
        duration: 30,
        type: 'exercise',
        exercises: [{
          id: 'TPF-001-E1',
          title: 'Trading Psychology Self-Assessment',
          description: 'Complete a comprehensive assessment of your trading psychology',
          instructions: [
            'Answer all questions honestly',
            'Reflect on your past trading experiences',
            'Identify your strongest psychological tendencies',
            'Note areas for improvement'
          ],
          timeEstimate: 30
        }],
        isRequired: true
      },
      {
        id: 'TPF-001-M5',
        title: 'Knowledge Check',
        description: 'Test your understanding of trading psychology fundamentals',
        duration: 15,
        type: 'quiz',
        quiz: {
          id: 'TPF-001-Q1',
          title: 'Trading Psychology Fundamentals Quiz',
          passingScore: 80,
          questions: [
            {
              id: 'Q1',
              question: 'What is the primary factor that distinguishes successful traders from unsuccessful ones?',
              type: 'multiple_choice',
              options: [
                'Technical analysis skills',
                'Market knowledge',
                'Psychological discipline',
                'Capital amount'
              ],
              correctAnswer: 2,
              explanation: 'Psychological discipline is the key differentiator, as it affects all other aspects of trading.'
            },
            {
              id: 'Q2',
              question: 'Loss aversion means traders feel losses more strongly than equivalent gains.',
              type: 'true_false',
              correctAnswer: 'true',
              explanation: 'Loss aversion is a well-documented psychological bias where losses feel approximately twice as powerful as gains.'
            }
          ]
        },
        isRequired: true
      }
    ]
  },
  {
    id: 'TPF-002',
    title: 'Understanding Your Trading Personality',
    description: 'Discover your unique trading personality type and how to leverage your psychological strengths.',
    instructor: 'Dr. Sarah Chen',
    duration: 4,
    level: 'beginner',
    rating: 4.7,
    students: 2891,
    subject: 'trading_psychology_fundamentals',
    subjectDisplayName: 'Trading Psychology Fundamentals',
    order: 2,
    isPremium: false,
    thumbnail: '/course-thumbnails/tpf-002.jpg',
    certificate: true,
    prerequisites: ['TPF-001'],
    objectives: [
      'Identify your trading personality type',
      'Understand your psychological strengths and weaknesses',
      'Learn to adapt strategies to your personality',
      'Develop personalized psychological approaches'
    ],
    modules: [
      {
        id: 'TPF-002-M1',
        title: 'Trading Personality Types',
        description: 'Overview of different trading personality types',
        duration: 30,
        type: 'video',
        videoUrl: '/videos/tpf-002-m1.mp4',
        isRequired: true
      },
      {
        id: 'TPF-002-M2',
        title: 'Personality Assessment',
        description: 'Complete a comprehensive trading personality assessment',
        duration: 45,
        type: 'exercise',
        exercises: [{
          id: 'TPF-002-E1',
          title: 'Trading Personality Assessment',
          description: 'Discover your trading personality type through detailed assessment',
          instructions: [
            'Complete all assessment questions',
            'Be honest about your preferences and tendencies',
            'Review your personality profile results',
            'Note key insights about your trading style'
          ],
          timeEstimate: 45
        }],
        isRequired: true
      }
    ]
  },
  {
    id: 'TPF-003',
    title: 'Cognitive Biases in Trading',
    description: 'Learn to identify and overcome the cognitive biases that sabotage trading performance.',
    instructor: 'Dr. Michael Torres',
    duration: 5,
    level: 'intermediate',
    rating: 4.9,
    students: 2156,
    subject: 'trading_psychology_fundamentals',
    subjectDisplayName: 'Trading Psychology Fundamentals',
    order: 3,
    isPremium: true,
    thumbnail: '/course-thumbnails/tpf-003.jpg',
    certificate: true,
    prerequisites: ['TPF-001', 'TPF-002'],
    objectives: [
      'Identify 15+ cognitive biases affecting trading',
      'Understand the neuroscience behind biases',
      'Learn practical techniques to overcome biases',
      'Develop bias-resistant trading processes'
    ],
    modules: [
      {
        id: 'TPF-003-M1',
        title: 'The Science of Cognitive Biases',
        description: 'Understanding how biases form and affect decision-making',
        duration: 35,
        type: 'video',
        videoUrl: '/videos/tpf-003-m1.mp4',
        isRequired: true
      },
      {
        id: 'TPF-003-M2',
        title: 'Major Trading Biases',
        description: 'Deep dive into the most impactful biases for traders',
        duration: 40,
        type: 'reading',
        content: `# Major Cognitive Biases in Trading

## Confirmation Bias
The tendency to search for, interpret, and recall information that confirms pre-existing beliefs...

## Anchoring Bias
Over-reliance on the first piece of information encountered...

## Availability Heuristic
Overestimating the likelihood of events based on their memorability...`,
        isRequired: true
      }
    ]
  },
  {
    id: 'TPF-004',
    title: 'Building Mental Resilience',
    description: 'Develop unshakeable mental resilience to handle market volatility and trading stress.',
    instructor: 'Dr. Sarah Chen',
    duration: 4,
    level: 'intermediate',
    rating: 4.8,
    students: 1834,
    subject: 'trading_psychology_fundamentals',
    subjectDisplayName: 'Trading Psychology Fundamentals',
    order: 4,
    isPremium: true,
    thumbnail: '/course-thumbnails/tpf-004.jpg',
    certificate: true,
    prerequisites: ['TPF-001', 'TPF-002', 'TPF-003'],
    objectives: [
      'Build psychological resilience for trading',
      'Develop stress management techniques',
      'Learn recovery strategies from losses',
      'Create sustainable trading mindset'
    ],
    modules: [
      {
        id: 'TPF-004-M1',
        title: 'Understanding Mental Resilience',
        description: 'What resilience means in trading context',
        duration: 25,
        type: 'video',
        videoUrl: '/videos/tpf-004-m1.mp4',
        isRequired: true
      }
    ]
  },

  // Risk Management Psychology (4 courses)
  {
    id: 'RMP-001',
    title: 'Psychology of Risk Perception',
    description: 'Understand how psychological factors influence risk perception and decision-making in trading.',
    instructor: 'Marcus Rodriguez',
    duration: 4,
    level: 'beginner',
    rating: 4.7,
    students: 2543,
    subject: 'risk_management_psychology',
    subjectDisplayName: 'Risk Management Psychology',
    order: 1,
    isPremium: false,
    thumbnail: '/course-thumbnails/rmp-001.jpg',
    certificate: true,
    objectives: [
      'Understand psychological aspects of risk',
      'Learn how emotions affect risk assessment',
      'Develop objective risk evaluation skills',
      'Create personal risk tolerance framework'
    ],
    modules: [
      {
        id: 'RMP-001-M1',
        title: 'Introduction to Risk Psychology',
        description: 'How psychology shapes our perception of risk',
        duration: 30,
        type: 'video',
        videoUrl: '/videos/rmp-001-m1.mp4',
        isRequired: true
      }
    ]
  },
  {
    id: 'RMP-002',
    title: 'Position Sizing Mindset',
    description: 'Master the psychological aspects of position sizing and capital allocation.',
    instructor: 'Marcus Rodriguez',
    duration: 3,
    level: 'intermediate',
    rating: 4.8,
    students: 1987,
    subject: 'risk_management_psychology',
    subjectDisplayName: 'Risk Management Psychology',
    order: 2,
    isPremium: false,
    thumbnail: '/course-thumbnails/rmp-002.jpg',
    certificate: true,
    prerequisites: ['RMP-001'],
    objectives: [
      'Understand position sizing psychology',
      'Overcome fear-based sizing decisions',
      'Develop systematic sizing approach',
      'Balance risk and opportunity'
    ],
    modules: [
      {
        id: 'RMP-002-M1',
        title: 'Position Sizing Psychology',
        description: 'How emotions affect position sizing decisions',
        duration: 25,
        type: 'video',
        videoUrl: '/videos/rmp-002-m1.mp4',
        isRequired: true
      }
    ]
  },
  {
    id: 'RMP-003',
    title: 'Stop Loss Psychology',
    description: 'Learn to set and honor stop losses without emotional interference.',
    instructor: 'Dr. Lisa Wang',
    duration: 3,
    level: 'intermediate',
    rating: 4.9,
    students: 2234,
    subject: 'risk_management_psychology',
    subjectDisplayName: 'Risk Management Psychology',
    order: 3,
    isPremium: true,
    thumbnail: '/course-thumbnails/rmp-003.jpg',
    certificate: true,
    prerequisites: ['RMP-001', 'RMP-002'],
    objectives: [
      'Understand stop loss psychology',
      'Overcome emotional stop loss interference',
      'Develop systematic stop loss strategies',
      'Learn to honor predetermined exits'
    ],
    modules: [
      {
        id: 'RMP-003-M1',
        title: 'The Psychology of Stop Losses',
        description: 'Why traders struggle with stop losses',
        duration: 30,
        type: 'video',
        videoUrl: '/videos/rmp-003-m1.mp4',
        isRequired: true
      }
    ]
  },
  {
    id: 'RMP-004',
    title: 'Portfolio Risk Psychology',
    description: 'Master the psychological aspects of portfolio-level risk management.',
    instructor: 'Marcus Rodriguez',
    duration: 5,
    level: 'advanced',
    rating: 4.8,
    students: 1456,
    subject: 'risk_management_psychology',
    subjectDisplayName: 'Risk Management Psychology',
    order: 4,
    isPremium: true,
    thumbnail: '/course-thumbnails/rmp-004.jpg',
    certificate: true,
    prerequisites: ['RMP-001', 'RMP-002', 'RMP-003'],
    objectives: [
      'Understand portfolio risk psychology',
      'Learn correlation and diversification psychology',
      'Develop portfolio-level risk awareness',
      'Master advanced risk management mindset'
    ],
    modules: [
      {
        id: 'RMP-004-M1',
        title: 'Portfolio Risk Psychology',
        description: 'Understanding risk at the portfolio level',
        duration: 40,
        type: 'video',
        videoUrl: '/videos/rmp-004-m1.mp4',
        isRequired: true
      }
    ]
  },

  // Emotional Control & Regulation (4 courses)
  {
    id: 'ECR-001',
    title: 'Understanding Trading Emotions',
    description: 'Learn to identify, understand, and work with your trading emotions effectively.',
    instructor: 'Emma Thompson',
    duration: 3,
    level: 'beginner',
    rating: 4.6,
    students: 3156,
    subject: 'emotional_control_regulation',
    subjectDisplayName: 'Emotional Control & Regulation',
    order: 1,
    isPremium: false,
    thumbnail: '/course-thumbnails/ecr-001.jpg',
    certificate: true,
    objectives: [
      'Identify key trading emotions',
      'Understand emotional triggers',
      'Learn emotional awareness techniques',
      'Develop emotional intelligence for trading'
    ],
    modules: [
      {
        id: 'ECR-001-M1',
        title: 'The Emotional Trader',
        description: 'Understanding the role of emotions in trading',
        duration: 25,
        type: 'video',
        videoUrl: '/videos/ecr-001-m1.mp4',
        isRequired: true
      }
    ]
  },
  {
    id: 'ECR-002',
    title: 'Fear and Greed Management',
    description: 'Master the two most powerful emotions in trading: fear and greed.',
    instructor: 'Emma Thompson',
    duration: 4,
    level: 'intermediate',
    rating: 4.8,
    students: 2789,
    subject: 'emotional_control_regulation',
    subjectDisplayName: 'Emotional Control & Regulation',
    order: 2,
    isPremium: false,
    thumbnail: '/course-thumbnails/ecr-002.jpg',
    certificate: true,
    prerequisites: ['ECR-001'],
    objectives: [
      'Understand fear and greed in trading',
      'Learn to recognize fear/greed signals',
      'Develop management strategies',
      'Create emotional balance'
    ],
    modules: [
      {
        id: 'ECR-002-M1',
        title: 'The Fear-Greed Cycle',
        description: 'How fear and greed drive market cycles',
        duration: 30,
        type: 'video',
        videoUrl: '/videos/ecr-002-m1.mp4',
        isRequired: true
      }
    ]
  },
  {
    id: 'ECR-003',
    title: 'Stress Management for Traders',
    description: 'Learn effective stress management techniques specifically designed for traders.',
    instructor: 'Dr. James Wilson',
    duration: 4,
    level: 'intermediate',
    rating: 4.7,
    students: 2234,
    subject: 'emotional_control_regulation',
    subjectDisplayName: 'Emotional Control & Regulation',
    order: 3,
    isPremium: true,
    thumbnail: '/course-thumbnails/ecr-003.jpg',
    certificate: true,
    prerequisites: ['ECR-001', 'ECR-002'],
    objectives: [
      'Understand trading stress sources',
      'Learn stress management techniques',
      'Develop stress resilience',
      'Create stress prevention strategies'
    ],
    modules: [
      {
        id: 'ECR-003-M1',
        title: 'Trading Stress Sources',
        description: 'Identifying what causes stress in trading',
        duration: 25,
        type: 'video',
        videoUrl: '/videos/ecr-003-m1.mp4',
        isRequired: true
      }
    ]
  },
  {
    id: 'ECR-004',
    title: 'Emotional Intelligence in Trading',
    description: 'Develop high emotional intelligence to enhance your trading performance.',
    instructor: 'Emma Thompson',
    duration: 5,
    level: 'advanced',
    rating: 4.9,
    students: 1567,
    subject: 'emotional_control_regulation',
    subjectDisplayName: 'Emotional Control & Regulation',
    order: 4,
    isPremium: true,
    thumbnail: '/course-thumbnails/ecr-004.jpg',
    certificate: true,
    prerequisites: ['ECR-001', 'ECR-002', 'ECR-003'],
    objectives: [
      'Develop emotional intelligence',
      'Learn advanced emotional regulation',
      'Master emotional decision-making',
      'Create emotional mastery'
    ],
    modules: [
      {
        id: 'ECR-004-M1',
        title: 'Emotional Intelligence Fundamentals',
        description: 'Building emotional intelligence for trading',
        duration: 35,
        type: 'video',
        videoUrl: '/videos/ecr-004-m1.mp4',
        isRequired: true
      }
    ]
  },

  // Behavioral Patterns & Habits (3 courses)
  {
    id: 'BPH-001',
    title: 'Identifying Trading Patterns',
    description: 'Learn to identify and analyze your behavioral patterns in trading.',
    instructor: 'Dr. Alex Kumar',
    duration: 3,
    level: 'beginner',
    rating: 4.5,
    students: 2456,
    subject: 'behavioral_patterns_habits',
    subjectDisplayName: 'Behavioral Patterns & Habits',
    order: 1,
    isPremium: false,
    thumbnail: '/course-thumbnails/bph-001.jpg',
    certificate: true,
    objectives: [
      'Identify personal trading patterns',
      'Understand pattern formation',
      'Learn pattern analysis techniques',
      'Develop pattern awareness'
    ],
    modules: [
      {
        id: 'BPH-001-M1',
        title: 'Understanding Trading Patterns',
        description: 'What are behavioral patterns in trading',
        duration: 25,
        type: 'video',
        videoUrl: '/videos/bph-001-m1.mp4',
        isRequired: true
      }
    ]
  },
  {
    id: 'BPH-002',
    title: 'Breaking Bad Trading Habits',
    description: 'Learn systematic approaches to identify and break destructive trading habits.',
    instructor: 'Dr. Alex Kumar',
    duration: 4,
    level: 'intermediate',
    rating: 4.7,
    students: 1987,
    subject: 'behavioral_patterns_habits',
    subjectDisplayName: 'Behavioral Patterns & Habits',
    order: 2,
    isPremium: false,
    thumbnail: '/course-thumbnails/bph-002.jpg',
    certificate: true,
    prerequisites: ['BPH-001'],
    objectives: [
      'Identify destructive trading habits',
      'Learn habit-breaking techniques',
      'Develop replacement behaviors',
      'Create sustainable change'
    ],
    modules: [
      {
        id: 'BPH-002-M1',
        title: 'The Science of Habit Change',
        description: 'How habits form and how to change them',
        duration: 30,
        type: 'video',
        videoUrl: '/videos/bph-002-m1.mp4',
        isRequired: true
      }
    ]
  },
  {
    id: 'BPH-003',
    title: 'Building Winning Routines',
    description: 'Create powerful daily and weekly routines that support trading success.',
    instructor: 'Dr. Alex Kumar',
    duration: 4,
    level: 'intermediate',
    rating: 4.8,
    students: 1654,
    subject: 'behavioral_patterns_habits',
    subjectDisplayName: 'Behavioral Patterns & Habits',
    order: 3,
    isPremium: true,
    thumbnail: '/course-thumbnails/bph-003.jpg',
    certificate: true,
    prerequisites: ['BPH-001', 'BPH-002'],
    objectives: [
      'Design effective trading routines',
      'Learn routine optimization',
      'Develop consistency habits',
      'Create sustainable practices'
    ],
    modules: [
      {
        id: 'BPH-003-M1',
        title: 'The Power of Routines',
        description: 'How routines support trading success',
        duration: 25,
        type: 'video',
        videoUrl: '/videos/bph-003-m1.mp4',
        isRequired: true
      }
    ]
  },

  // Market Psychology & Sentiment (3 courses)
  {
    id: 'MPS-001',
    title: 'Understanding Market Psychology',
    description: 'Learn how collective psychology drives market movements and price action.',
    instructor: 'Dr. Rachel Green',
    duration: 4,
    level: 'intermediate',
    rating: 4.6,
    students: 2134,
    subject: 'market_psychology_sentiment',
    subjectDisplayName: 'Market Psychology & Sentiment',
    order: 1,
    isPremium: false,
    thumbnail: '/course-thumbnails/mps-001.jpg',
    certificate: true,
    objectives: [
      'Understand collective market psychology',
      'Learn market sentiment indicators',
      'Develop market psychology awareness',
      'Apply psychology to market analysis'
    ],
    modules: [
      {
        id: 'MPS-001-M1',
        title: 'Market Psychology Fundamentals',
        description: 'How psychology drives market movements',
        duration: 30,
        type: 'video',
        videoUrl: '/videos/mps-001-m1.mp4',
        isRequired: true
      }
    ]
  },
  {
    id: 'MPS-002',
    title: 'Crowd Psychology and Contrarian Thinking',
    description: 'Master the art of contrarian thinking and understanding crowd behavior.',
    instructor: 'Dr. Rachel Green',
    duration: 5,
    level: 'advanced',
    rating: 4.8,
    students: 1456,
    subject: 'market_psychology_sentiment',
    subjectDisplayName: 'Market Psychology & Sentiment',
    order: 2,
    isPremium: true,
    thumbnail: '/course-thumbnails/mps-002.jpg',
    certificate: true,
    prerequisites: ['MPS-001'],
    objectives: [
      'Understand crowd psychology',
      'Learn contrarian thinking',
      'Develop independent analysis',
      'Master sentiment timing'
    ],
    modules: [
      {
        id: 'MPS-002-M1',
        title: 'The Psychology of Crowds',
        description: 'How crowds behave in financial markets',
        duration: 35,
        type: 'video',
        videoUrl: '/videos/mps-002-m1.mp4',
        isRequired: true
      }
    ]
  },
  {
    id: 'MPS-003',
    title: 'Market Sentiment Analysis',
    description: 'Learn to analyze and interpret market sentiment for trading advantage.',
    instructor: 'Dr. Rachel Green',
    duration: 4,
    level: 'advanced',
    rating: 4.7,
    students: 1234,
    subject: 'market_psychology_sentiment',
    subjectDisplayName: 'Market Psychology & Sentiment',
    order: 3,
    isPremium: true,
    thumbnail: '/course-thumbnails/mps-003.jpg',
    certificate: true,
    prerequisites: ['MPS-001', 'MPS-002'],
    objectives: [
      'Learn sentiment analysis techniques',
      'Understand sentiment indicators',
      'Develop sentiment timing skills',
      'Apply sentiment to trading decisions'
    ],
    modules: [
      {
        id: 'MPS-003-M1',
        title: 'Sentiment Analysis Tools',
        description: 'Tools and techniques for sentiment analysis',
        duration: 30,
        type: 'video',
        videoUrl: '/videos/mps-003-m1.mp4',
        isRequired: true
      }
    ]
  },

  // Advanced Trading Psychology (2 courses)
  {
    id: 'ATP-001',
    title: 'Advanced Psychological Strategies',
    description: 'Master advanced psychological strategies used by professional traders.',
    instructor: 'Dr. Michael Torres',
    duration: 6,
    level: 'advanced',
    rating: 4.9,
    students: 987,
    subject: 'advanced_trading_psychology',
    subjectDisplayName: 'Advanced Trading Psychology',
    order: 1,
    isPremium: true,
    thumbnail: '/course-thumbnails/atp-001.jpg',
    certificate: true,
    prerequisites: ['TPF-004', 'RMP-004', 'ECR-004'],
    objectives: [
      'Master advanced psychological strategies',
      'Learn professional trading psychology',
      'Develop elite mindset',
      'Apply advanced techniques'
    ],
    modules: [
      {
        id: 'ATP-001-M1',
        title: 'Professional Trading Psychology',
        description: 'How professional traders think differently',
        duration: 40,
        type: 'video',
        videoUrl: '/videos/atp-001-m1.mp4',
        isRequired: true
      }
    ]
  },
  {
    id: 'ATP-002',
    title: 'Psychology of Professional Trading',
    description: 'Learn the psychological frameworks used by institutional and professional traders.',
    instructor: 'Dr. Michael Torres',
    duration: 7,
    level: 'advanced',
    rating: 4.9,
    students: 654,
    subject: 'advanced_trading_psychology',
    subjectDisplayName: 'Advanced Trading Psychology',
    order: 2,
    isPremium: true,
    thumbnail: '/course-thumbnails/atp-002.jpg',
    certificate: true,
    prerequisites: ['ATP-001'],
    objectives: [
      'Understand institutional psychology',
      'Learn professional frameworks',
      'Develop institutional mindset',
      'Master elite trading psychology'
    ],
    modules: [
      {
        id: 'ATP-002-M1',
        title: 'Institutional Trading Psychology',
        description: 'How institutions approach trading psychology',
        duration: 45,
        type: 'video',
        videoUrl: '/videos/atp-002-m1.mp4',
        isRequired: true
      }
    ]
  }
];

// Helper functions
export const getCoursesBySubject = (subjectId: string) => {
  return courses.filter(course => course.subject === subjectId).sort((a, b) => a.order - b.order);
};

export const getSubjectById = (subjectId: string) => {
  return subjects.find(subject => subject.id === subjectId);
};

export const getNextCourseInSubject = (currentCourseId: string) => {
  const currentCourse = courses.find(course => course.id === currentCourseId);
  if (!currentCourse) return null;
  
  const subjectCourses = getCoursesBySubject(currentCourse.subject);
  const currentIndex = subjectCourses.findIndex(course => course.id === currentCourseId);
  
  return currentIndex < subjectCourses.length - 1 ? subjectCourses[currentIndex + 1] : null;
};

export const getPrerequisiteCourses = (courseId: string) => {
  const course = courses.find(c => c.id === courseId);
  if (!course?.prerequisites) return [];
  
  return course.prerequisites.map(prereqId => courses.find(c => c.id === prereqId)).filter(Boolean);
};
