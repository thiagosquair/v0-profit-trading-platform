"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "pt" | "es" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Complete translations object with ALL content
const translations = {
  en: {
    // Navigation
    "nav.overview": "Overview",
    "nav.aiCoach": "AI Coach",
    "nav.analysis": "Screenshot Analysis",
    "nav.progress": "Progress Tracking",
    "nav.exercises": "Interactive Exercises",
    "nav.patterns": "Behavioral Patterns",
    "nav.courses": "Psychology Courses",
    "nav.journal": "Reflection Journal",
    "nav.insights": "Coaching Insights",
    "nav.tradeBuilder": "Trade Builder",
    "nav.marketInsights": "Market Insights",
    "nav.settings": "Settings",

    // Common
    "common.signOut": "Sign Out",
    "common.profile": "Profile Settings",
    "common.welcome": "Welcome back",
    "common.loading": "Loading...",

    // Dashboard - Simple keys without prefix
    welcome: "Welcome back",
    subtitle: "Ready to enhance your trading psychology today?",
    psychologyScore: "Psychology Score",
    exercisesCompleted: "Exercises Completed",
    coachingSessions: "Coaching Sessions",
    achievements: "Achievements",
    thisWeek: "This week",
    thisMonth: "This month",
    badgesEarned: "Badges earned",
    quickActions: "Quick Actions",
    recentActivity: "Recent Activity",
    currentGoals: "Current Goals",
    psychologyTrend: "Psychology Score Trend",
    tradingSkills: "Trading Psychology Skills",
    weeklyPerformance: "Your weekly psychology performance",
    skillLevels: "Your current skill levels across key areas",
    jumpInto: "Jump into your most used features",
    latestActivities: "Your latest psychology training activities",
    developmentObjectives: "Track your psychology development objectives",

    // Progress Tracking - Flat structure
    "progressTracking.title": "Progress Tracking",
    "progressTracking.subtitle": "Monitor your trading psychology development over time",
    "progressTracking.analytics": "Analytics",
    "progressTracking.psychologyScore": "Psychology Score",
    "progressTracking.exercisesCompleted": "Exercises Completed",
    "progressTracking.coachSessions": "Coach Sessions",
    "progressTracking.reflectionEntries": "Reflection Entries",
    "progressTracking.fromLastWeek": "from last week",
    "progressTracking.tabs.overview": "Overview",
    "progressTracking.tabs.psychology": "Psychology",
    "progressTracking.tabs.exercises": "Exercises",
    "progressTracking.tabs.patterns": "Patterns",
    "progressTracking.tabs.milestones": "Milestones",
    "progressTracking.charts.psychologyTrend": "Psychology Score Trend",
    "progressTracking.charts.psychologyTrendDesc": "Your overall psychology score development over time",
    "progressTracking.charts.skillsRadar": "Skills Radar",
    "progressTracking.charts.skillsRadarDesc": "Current vs target performance across key areas",
    "progressTracking.charts.psychologyComponents": "Psychology Components",
    "progressTracking.charts.psychologyComponentsDesc": "Detailed breakdown of your psychology score components",
    "progressTracking.charts.exerciseCompletion": "Exercise Completion Rate",
    "progressTracking.charts.exerciseCompletionDesc": "Weekly exercise completion vs targets",
    "progressTracking.charts.patternDistribution": "Behavioral Pattern Distribution",
    "progressTracking.charts.patternDistributionDesc": "Frequency of identified behavioral patterns",
    "progressTracking.charts.patternImprovement": "Pattern Improvement",
    "progressTracking.charts.patternImprovementDesc": "Progress in reducing negative patterns",
    "progressTracking.skills.emotionalControl": "Emotional Control",
    "progressTracking.skills.discipline": "Discipline",
    "progressTracking.skills.riskManagement": "Risk Management",
    "progressTracking.skills.patternRecognition": "Pattern Recognition",
    "progressTracking.skills.consistency": "Consistency",
    "progressTracking.skills.confidence": "Confidence",
    "progressTracking.milestones.title": "Achievement Milestones",
    "progressTracking.milestones.description": "Track your progress through key psychology development milestones",
    "progressTracking.milestones.firstAssessment": "First Psychology Assessment",
    "progressTracking.milestones.firstAssessmentDesc": "Completed initial trading psychology evaluation",
    "progressTracking.milestones.tenExercises": "10 Exercises Completed",
    "progressTracking.milestones.tenExercisesDesc": "Reached milestone of 10 completed psychology exercises",
    "progressTracking.milestones.score70": "Psychology Score 70+",
    "progressTracking.milestones.score70Desc": "Achieved psychology score above 70 for the first time",
    "progressTracking.milestones.firstCourse": "First Course Completion",
    "progressTracking.milestones.firstCourseDesc": "Complete your first trading psychology course",
    "progressTracking.milestones.score85": "Psychology Score 85+",
    "progressTracking.milestones.score85Desc": "Target: Achieve psychology score above 85",
    "progressTracking.milestones.status.completed": "completed",
    "progressTracking.milestones.status.inprogress": "in progress",
    "progressTracking.milestones.status.upcoming": "upcoming",
    "progressTracking.improvements.significantImprovement":
      "Significant improvement in managing emotions during trading sessions",
    "progressTracking.improvements.excellentAdherence": "Excellent adherence to trading rules and strategies",
    "progressTracking.improvements.goodProgress": "Good progress in position sizing and stop loss management",
    "progressTracking.improvements.greatProgress": "Great progress!",
    "progressTracking.improvements.goodImprovement": "Good improvement",
    "progressTracking.improvements.needsFocus": "Needs focus",

    // AI Coach
    "aiCoach.subtitle": "Get personalized guidance for your trading psychology",
    "aiCoach.activeSession": "Active Session",
    "aiCoach.quickTopics": "Quick Topics",
    "aiCoach.startConversation": "Start a conversation about common trading psychology challenges",
    "aiCoach.yourProfile": "Your Profile",
    "aiCoach.experience": "Experience",
    "aiCoach.style": "Style",
    "aiCoach.riskTolerance": "Risk Tolerance",
    "aiCoach.mainChallenges": "Main Challenges",
    "aiCoach.emotionalControl": "Emotional Control",
    "aiCoach.fomoManagement": "FOMO Management",
    "aiCoach.tradingDiscipline": "Trading Discipline",
    "aiCoach.riskPsychology": "Risk Psychology",
    "aiCoach.emotionalControlDesc": "Learn to manage emotions during trading",
    "aiCoach.fomoDesc": "Overcome fear of missing out",
    "aiCoach.disciplineDesc": "Build consistent trading habits",
    "aiCoach.riskPsychologyDesc": "Improve risk management mindset",
    "aiCoach.specialized": "Specialized in trading psychology and behavioral finance",
    "aiCoach.placeholder": "Ask about trading psychology, share your challenges, or describe a situation...",
    "aiCoach.thinking": "Coach is thinking...",
    "aiCoach.welcomeMessage":
      "Hello! I'm your AI Psychology Coach. I'm here to help you develop better trading psychology and overcome mental barriers. What would you like to work on today?",
    "aiCoach.errorMessage": "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
    "aiCoach.emotionalControlPrompt":
      "I'm struggling with emotional control while trading. Can you help me develop better emotional regulation strategies?",
    "aiCoach.fomoPrompt":
      "I often experience FOMO and enter trades impulsively. How can I better manage this fear of missing out?",
    "aiCoach.disciplinePrompt":
      "I have trouble sticking to my trading plan and rules. Can you help me develop better discipline?",
    "aiCoach.riskPrompt":
      "I struggle with proper risk management and position sizing. Can you help me understand the psychology behind risk?",
  },
  pt: {
    // Navigation
    "nav.overview": "Visão Geral",
    "nav.aiCoach": "Coach IA",
    "nav.analysis": "Análise de Screenshot",
    "nav.progress": "Acompanhamento de Progresso",
    "nav.exercises": "Exercícios Interativos",
    "nav.patterns": "Padrões Comportamentais",
    "nav.courses": "Cursos de Psicologia",
    "nav.journal": "Diário de Reflexão",
    "nav.insights": "Insights de Coaching",
    "nav.tradeBuilder": "Construtor de Trade",
    "nav.marketInsights": "Insights de Mercado",
    "nav.settings": "Configurações",

    // Common
    "common.signOut": "Sair",
    "common.profile": "Configurações do Perfil",
    "common.welcome": "Bem-vindo de volta",
    "common.loading": "Carregando...",

    // Dashboard - Simple keys without prefix
    welcome: "Bem-vindo de volta",
    subtitle: "Pronto para melhorar sua psicologia de trading hoje?",
    psychologyScore: "Pontuação de Psicologia",
    exercisesCompleted: "Exercícios Completados",
    coachingSessions: "Sessões de Coaching",
    achievements: "Conquistas",
    thisWeek: "Esta semana",
    thisMonth: "Este mês",
    badgesEarned: "Distintivos conquistados",
    quickActions: "Ações Rápidas",
    recentActivity: "Atividade Recente",
    currentGoals: "Objetivos Atuais",
    psychologyTrend: "Tendência da Pontuação de Psicologia",
    tradingSkills: "Habilidades de Psicologia de Trading",
    weeklyPerformance: "Seu desempenho psicológico semanal",
    skillLevels: "Seus níveis atuais de habilidade em áreas-chave",
    jumpInto: "Acesse seus recursos mais utilizados",
    latestActivities: "Suas últimas atividades de treinamento psicológico",
    developmentObjectives: "Acompanhe seus objetivos de desenvolvimento psicológico",

    // Progress Tracking - Flat structure
    "progressTracking.title": "Acompanhamento de Progresso",
    "progressTracking.subtitle": "Monitore o desenvolvimento de sua psicologia de trading ao longo do tempo",
    "progressTracking.analytics": "Análises",
    "progressTracking.psychologyScore": "Pontuação de Psicologia",
    "progressTracking.exercisesCompleted": "Exercícios Completados",
    "progressTracking.coachSessions": "Sessões de Coaching",
    "progressTracking.reflectionEntries": "Entradas de Reflexão",
    "progressTracking.fromLastWeek": "da semana passada",
    "progressTracking.tabs.overview": "Visão Geral",
    "progressTracking.tabs.psychology": "Psicologia",
    "progressTracking.tabs.exercises": "Exercícios",
    "progressTracking.tabs.patterns": "Padrões",
    "progressTracking.tabs.milestones": "Marcos",
    "progressTracking.charts.psychologyTrend": "Tendência da Pontuação de Psicologia",
    "progressTracking.charts.psychologyTrendDesc":
      "Desenvolvimento geral de sua pontuação de psicologia ao longo do tempo",
    "progressTracking.charts.skillsRadar": "Radar de Habilidades",
    "progressTracking.charts.skillsRadarDesc": "Performance atual vs meta em áreas-chave",
    "progressTracking.charts.psychologyComponents": "Componentes de Psicologia",
    "progressTracking.charts.psychologyComponentsDesc": "Detalhamento de sua pontuação de psicologia",
    "progressTracking.charts.exerciseCompletion": "Taxa de Conclusão de Exercícios",
    "progressTracking.charts.exerciseCompletionDesc": "Conclusão semanal de exercícios vs metas",
    "progressTracking.charts.patternDistribution": "Distribuição de Padrões Comportamentais",
    "progressTracking.charts.patternDistributionDesc": "Frequência de padrões comportamentais identificados",
    "progressTracking.charts.patternImprovement": "Melhoria de Padrões",
    "progressTracking.charts.patternImprovementDesc": "Progresso na redução de padrões negativos",
    "progressTracking.skills.emotionalControl": "Controle Emocional",
    "progressTracking.skills.discipline": "Disciplina",
    "progressTracking.skills.riskManagement": "Gestão de Risco",
    "progressTracking.skills.patternRecognition": "Reconhecimento de Padrões",
    "progressTracking.skills.consistency": "Consistência",
    "progressTracking.skills.confidence": "Confiança",
    "progressTracking.milestones.title": "Marcos de Conquista",
    "progressTracking.milestones.description":
      "Acompanhe seu progresso através de marcos-chave de desenvolvimento psicológico",
    "progressTracking.milestones.firstAssessment": "Primeira Avaliação Psicológica",
    "progressTracking.milestones.firstAssessmentDesc": "Avaliação inicial de psicologia de trading concluída",
    "progressTracking.milestones.tenExercises": "10 Exercícios Completados",
    "progressTracking.milestones.tenExercisesDesc": "Alcançou marco de 10 exercícios de psicologia completados",
    "progressTracking.milestones.score70": "Pontuação de Psicologia 70+",
    "progressTracking.milestones.score70Desc": "Alcançou pontuação de psicologia acima de 70 pela primeira vez",
    "progressTracking.milestones.firstCourse": "Primeira Conclusão de Curso",
    "progressTracking.milestones.firstCourseDesc": "Complete seu primeiro curso de psicologia de trading",
    "progressTracking.milestones.score85": "Pontuação de Psicologia 85+",
    "progressTracking.milestones.score85Desc": "Meta: Alcançar pontuação de psicologia acima de 85",
    "progressTracking.milestones.status.completed": "concluído",
    "progressTracking.milestones.status.inprogress": "em progresso",
    "progressTracking.milestones.status.upcoming": "próximo",
    "progressTracking.improvements.significantImprovement":
      "Melhoria significativa no gerenciamento de emoções durante sessões de trading",
    "progressTracking.improvements.excellentAdherence": "Excelente aderência às regras e estratégias de trading",
    "progressTracking.improvements.goodProgress": "Bom progresso no dimensionamento de posição e gestão de stop loss",
    "progressTracking.improvements.greatProgress": "Ótimo progresso!",
    "progressTracking.improvements.goodImprovement": "Boa melhoria",
    "progressTracking.improvements.needsFocus": "Precisa de foco",

    // AI Coach
    "aiCoach.subtitle": "Obtenha orientação personalizada para sua psicologia de trading",
    "aiCoach.activeSession": "Sessão Ativa",
    "aiCoach.quickTopics": "Tópicos Rápidos",
    "aiCoach.startConversation": "Inicie uma conversa sobre desafios comuns de psicologia de trading",
    "aiCoach.yourProfile": "Seu Perfil",
    "aiCoach.experience": "Experiência",
    "aiCoach.style": "Estilo",
    "aiCoach.riskTolerance": "Tolerância ao Risco",
    "aiCoach.mainChallenges": "Principais Desafios",
    "aiCoach.emotionalControl": "Controle Emocional",
    "aiCoach.fomoManagement": "Gestão de FOMO",
    "aiCoach.tradingDiscipline": "Disciplina de Trading",
    "aiCoach.riskPsychology": "Psicologia de Risco",
    "aiCoach.emotionalControlDesc": "Aprenda a gerenciar emoções durante o trading",
    "aiCoach.fomoDesc": "Supere o medo de perder oportunidades",
    "aiCoach.disciplineDesc": "Construa hábitos consistentes de trading",
    "aiCoach.riskPsychologyDesc": "Melhore a mentalidade de gestão de risco",
    "aiCoach.specialized": "Especializado em psicologia de trading e finanças comportamentais",
    "aiCoach.placeholder":
      "Pergunte sobre psicologia de trading, compartilhe seus desafios ou descreva uma situação...",
    "aiCoach.thinking": "Coach está pensando...",
    "aiCoach.welcomeMessage":
      "Olá! Sou seu Coach de Psicologia IA. Estou aqui para ajudá-lo a desenvolver uma melhor psicologia de trading e superar barreiras mentais. No que gostaria de trabalhar hoje?",
    "aiCoach.errorMessage":
      "Peço desculpas, mas estou tendo problemas para responder agora. Tente novamente em um momento.",
    "aiCoach.emotionalControlPrompt":
      "Estou lutando com o controle emocional durante o trading. Você pode me ajudar a desenvolver melhores estratégias de regulação emocional?",
    "aiCoach.fomoPrompt":
      "Frequentemente experimento FOMO e entro em trades impulsivamente. Como posso gerenciar melhor esse medo de perder oportunidades?",
    "aiCoach.disciplinePrompt":
      "Tenho problemas para seguir meu plano e regras de trading. Você pode me ajudar a desenvolver melhor disciplina?",
    "aiCoach.riskPrompt":
      "Luto com a gestão adequada de risco e dimensionamento de posição. Você pode me ajudar a entender a psicologia por trás do risco?",
  },
  es: {
    // Navigation
    "nav.overview": "Resumen",
    "nav.aiCoach": "Coach IA",
    "nav.analysis": "Análisis de Captura",
    "nav.progress": "Seguimiento de Progreso",
    "nav.exercises": "Ejercicios Interactivos",
    "nav.patterns": "Patrones Conductuales",
    "nav.courses": "Cursos de Psicología",
    "nav.journal": "Diario de Reflexión",
    "nav.insights": "Insights de Coaching",
    "nav.tradeBuilder": "Constructor de Trade",
    "nav.marketInsights": "Insights de Mercado",
    "nav.settings": "Configuración",

    // Common
    "common.signOut": "Cerrar Sesión",
    "common.profile": "Configuración del Perfil",
    "common.welcome": "Bienvenido de vuelta",
    "common.loading": "Cargando...",

    // Dashboard - Simple keys without prefix
    welcome: "Bienvenido de vuelta",
    subtitle: "¿Listo para mejorar tu psicología de trading hoy?",
    psychologyScore: "Puntuación de Psicología",
    exercisesCompleted: "Ejercicios Completados",
    coachingSessions: "Sesiones de Coaching",
    achievements: "Logros",
    thisWeek: "Esta semana",
    thisMonth: "Este mes",
    badgesEarned: "Distintivos ganados",
    quickActions: "Acciones Rápidas",
    recentActivity: "Actividad Reciente",
    currentGoals: "Objetivos Actuales",
    psychologyTrend: "Tendencia de Puntuación de Psicología",
    tradingSkills: "Habilidades de Psicología de Trading",
    weeklyPerformance: "Tu rendimiento psicológico semanal",
    skillLevels: "Tus niveles actuales de habilidad en áreas clave",
    jumpInto: "Accede a tus características más utilizadas",
    latestActivities: "Tus últimas actividades de entrenamiento psicológico",
    developmentObjectives: "Seguimiento de tus objetivos de desarrollo psicológico",

    // Progress Tracking - Flat structure
    "progressTracking.title": "Seguimiento de Progreso",
    "progressTracking.subtitle": "Monitorea el desarrollo de tu psicología de trading a lo largo del tiempo",
    "progressTracking.analytics": "Análisis",
    "progressTracking.psychologyScore": "Puntuación de Psicología",
    "progressTracking.exercisesCompleted": "Ejercicios Completados",
    "progressTracking.coachSessions": "Sesiones de Coaching",
    "progressTracking.reflectionEntries": "Entradas de Reflexión",
    "progressTracking.fromLastWeek": "de la semana pasada",
    "progressTracking.tabs.overview": "Resumen",
    "progressTracking.tabs.psychology": "Psicología",
    "progressTracking.tabs.exercises": "Ejercicios",
    "progressTracking.tabs.patterns": "Patrones",
    "progressTracking.tabs.milestones": "Hitos",
    "progressTracking.charts.psychologyTrend": "Tendencia de Puntuación de Psicología",
    "progressTracking.charts.psychologyTrendDesc":
      "Desarrollo general de tu puntuación de psicología a lo largo del tiempo",
    "progressTracking.charts.skillsRadar": "Radar de Habilidades",
    "progressTracking.charts.skillsRadarDesc": "Rendimiento actual vs objetivo en áreas clave",
    "progressTracking.charts.psychologyComponents": "Componentes de Psicología",
    "progressTracking.charts.psychologyComponentsDesc": "Desglose detallado de tu puntuación de psicología",
    "progressTracking.charts.exerciseCompletion": "Tasa de Finalización de Ejercicios",
    "progressTracking.charts.exerciseCompletionDesc": "Finalización semanal de ejercicios vs objetivos",
    "progressTracking.charts.patternDistribution": "Distribución de Patrones Conductuales",
    "progressTracking.charts.patternDistributionDesc": "Frecuencia de patrones conductuales identificados",
    "progressTracking.charts.patternImprovement": "Mejora de Patrones",
    "progressTracking.charts.patternImprovementDesc": "Progreso en la reducción de patrones negativos",
    "progressTracking.skills.emotionalControl": "Control Emocional",
    "progressTracking.skills.discipline": "Disciplina",
    "progressTracking.skills.riskManagement": "Gestión de Riesgo",
    "progressTracking.skills.patternRecognition": "Reconocimiento de Patrones",
    "progressTracking.skills.consistency": "Consistencia",
    "progressTracking.skills.confidence": "Confianza",
    "progressTracking.milestones.title": "Hitos de Logro",
    "progressTracking.milestones.description": "Rastrea tu progreso a través de hitos clave de desarrollo psicológico",
    "progressTracking.milestones.firstAssessment": "Primera Evaluación Psicológica",
    "progressTracking.milestones.firstAssessmentDesc": "Evaluación inicial de psicología de trading completada",
    "progressTracking.milestones.tenExercises": "10 Ejercicios Completados",
    "progressTracking.milestones.tenExercisesDesc": "Alcanzó hito de 10 ejercicios de psicología completados",
    "progressTracking.milestones.score70": "Puntuación de Psicología 70+",
    "progressTracking.milestones.score70Desc": "Alcanzó puntuación de psicología por encima de 70 por primera vez",
    "progressTracking.milestones.firstCourse": "Primera Finalización de Curso",
    "progressTracking.milestones.firstCourseDesc": "Completa tu primer curso de psicología de trading",
    "progressTracking.milestones.score85": "Puntuación de Psicología 85+",
    "progressTracking.milestones.score85Desc": "Objetivo: Alcanzar puntuación de psicología por encima de 85",
    "progressTracking.milestones.status.completed": "completado",
    "progressTracking.milestones.status.inprogress": "en progreso",
    "progressTracking.milestones.status.upcoming": "próximo",
    "progressTracking.improvements.significantImprovement":
      "Mejora significativa en el manejo de emociones durante sesiones de trading",
    "progressTracking.improvements.excellentAdherence": "Excelente adherencia a las reglas y estrategias de trading",
    "progressTracking.improvements.goodProgress":
      "Buen progreso en el dimensionamiento de posición y gestión de stop loss",
    "progressTracking.improvements.greatProgress": "¡Gran progreso!",
    "progressTracking.improvements.goodImprovement": "Buena mejora",
    "progressTracking.improvements.needsFocus": "Necesita enfoque",

    // AI Coach
    "aiCoach.subtitle": "Obtén orientación personalizada para tu psicología de trading",
    "aiCoach.activeSession": "Sesión Activa",
    "aiCoach.quickTopics": "Temas Rápidos",
    "aiCoach.startConversation": "Inicia una conversación sobre desafíos comunes de psicología de trading",
    "aiCoach.yourProfile": "Tu Perfil",
    "aiCoach.experience": "Experiencia",
    "aiCoach.style": "Estilo",
    "aiCoach.riskTolerance": "Tolerancia al Riesgo",
    "aiCoach.mainChallenges": "Desafíos Principales",
    "aiCoach.emotionalControl": "Control Emocional",
    "aiCoach.fomoManagement": "Gestión de FOMO",
    "aiCoach.tradingDiscipline": "Disciplina de Trading",
    "aiCoach.riskPsychology": "Psicología de Riesgo",
    "aiCoach.emotionalControlDesc": "Aprende a gestionar emociones durante el trading",
    "aiCoach.fomoDesc": "Supera el miedo a perder oportunidades",
    "aiCoach.disciplineDesc": "Construye hábitos consistentes de trading",
    "aiCoach.riskPsychologyDesc": "Mejora la mentalidad de gestión de riesgo",
    "aiCoach.specialized": "Especializado en psicología de trading y finanzas comportamentales",
    "aiCoach.placeholder": "Pregunta sobre psicología de trading, comparte tus desafíos o describe una situación...",
    "aiCoach.thinking": "El coach está pensando...",
    "aiCoach.welcomeMessage":
      "¡Hola! Soy tu Coach de Psicología IA. Estoy aquí para ayudarte a desarrollar una mejor psicología de trading y superar barreras mentales. ¿En qué te gustaría trabajar hoy?",
    "aiCoach.errorMessage": "Me disculpo, pero tengo problemas para responder ahora. Inténtalo de nuevo en un momento.",
    "aiCoach.emotionalControlPrompt":
      "Estoy luchando con el control emocional durante el trading. ¿Puedes ayudarme a desarrollar mejores estrategias de regulación emocional?",
    "aiCoach.fomoPrompt":
      "A menudo experimento FOMO y entro en trades impulsivamente. ¿Cómo puedo gestionar mejor este miedo a perder oportunidades?",
    "aiCoach.disciplinePrompt":
      "Tengo problemas para seguir mi plan y reglas de trading. ¿Puedes ayudarme a desarrollar mejor disciplina?",
    "aiCoach.riskPrompt":
      "Lucho con la gestión adecuada de riesgo y dimensionamiento de posición. ¿Puedes ayudarme a entender la psicología detrás del riesgo?",
  },
  fr: {
    // Navigation
    "nav.overview": "Aperçu",
    "nav.aiCoach": "Coach IA",
    "nav.analysis": "Analyse de Capture",
    "nav.progress": "Suivi des Progrès",
    "nav.exercises": "Exercices Interactifs",
    "nav.patterns": "Modèles Comportementaux",
    "nav.courses": "Cours de Psychologie",
    "nav.journal": "Journal de Réflexion",
    "nav.insights": "Insights de Coaching",
    "nav.tradeBuilder": "Constructeur de Trade",
    "nav.marketInsights": "Insights de Marché",
    "nav.settings": "Paramètres",

    // Common
    "common.signOut": "Se Déconnecter",
    "common.profile": "Paramètres du Profil",
    "common.welcome": "Bon retour",
    "common.loading": "Chargement...",

    // Dashboard - Simple keys without prefix
    welcome: "Bon retour",
    subtitle: "Prêt à améliorer votre psychologie du trading aujourd'hui ?",
    psychologyScore: "Score de Psychologie",
    exercisesCompleted: "Exercices Complétés",
    coachingSessions: "Sessions de Coaching",
    achievements: "Réalisations",
    thisWeek: "Cette semaine",
    thisMonth: "Ce mois-ci",
    badgesEarned: "Badges gagnés",
    quickActions: "Actions Rapides",
    recentActivity: "Activité Récente",
    currentGoals: "Objectifs Actuels",
    psychologyTrend: "Tendance du Score de Psychologie",
    tradingSkills: "Compétences de Psychologie du Trading",
    weeklyPerformance: "Votre performance psychologique hebdomadaire",
    skillLevels: "Vos niveaux actuels de compétence dans les domaines clés",
    jumpInto: "Accédez à vos fonctionnalités les plus utilisées",
    latestActivities: "Vos dernières activités de formation psychologique",
    developmentObjectives: "Suivez vos objectifs de développement psychologique",

    // Progress Tracking - Flat structure
    "progressTracking.title": "Suivi des Progrès",
    "progressTracking.subtitle": "Surveillez le développement de votre psychologie du trading au fil du temps",
    "progressTracking.analytics": "Analyses",
    "progressTracking.psychologyScore": "Score de Psychologie",
    "progressTracking.exercisesCompleted": "Exercices Complétés",
    "progressTracking.coachSessions": "Sessions de Coaching",
    "progressTracking.reflectionEntries": "Entrées de Réflexion",
    "progressTracking.fromLastWeek": "de la semaine dernière",
    "progressTracking.tabs.overview": "Aperçu",
    "progressTracking.tabs.psychology": "Psychologie",
    "progressTracking.tabs.exercises": "Exercices",
    "progressTracking.tabs.patterns": "Modèles",
    "progressTracking.tabs.milestones": "Jalons",
    "progressTracking.charts.psychologyTrend": "Tendance du Score de Psychologie",
    "progressTracking.charts.psychologyTrendDesc": "Développement global de votre score de psychologie au fil du temps",
    "progressTracking.charts.skillsRadar": "Radar des Compétences",
    "progressTracking.charts.skillsRadarDesc": "Performance actuelle vs objectif dans les domaines clés",
    "progressTracking.charts.psychologyComponents": "Composants de Psychologie",
    "progressTracking.charts.psychologyComponentsDesc": "Répartition détaillée de votre score de psychologie",
    "progressTracking.charts.exerciseCompletion": "Taux de Completion d'Exercices",
    "progressTracking.charts.exerciseCompletionDesc": "Completion hebdomadaire d'exercices vs objectifs",
    "progressTracking.charts.patternDistribution": "Distribution des Modèles Comportementaux",
    "progressTracking.charts.patternDistributionDesc": "Fréquence des modèles comportementaux identifiés",
    "progressTracking.charts.patternImprovement": "Amélioration des Modèles",
    "progressTracking.charts.patternImprovementDesc": "Progrès dans la réduction des modèles négatifs",
    "progressTracking.skills.emotionalControl": "Contrôle Émotionnel",
    "progressTracking.skills.discipline": "Discipline",
    "progressTracking.skills.riskManagement": "Gestion des Risques",
    "progressTracking.skills.patternRecognition": "Reconnaissance de Modèles",
    "progressTracking.skills.consistency": "Cohérence",
    "progressTracking.skills.confidence": "Confiance",
    "progressTracking.milestones.title": "Jalons de Réalisation",
    "progressTracking.milestones.description":
      "Suivez votre progrès à travers les jalons clés de développement psychologique",
    "progressTracking.milestones.firstAssessment": "Première Évaluation Psychologique",
    "progressTracking.milestones.firstAssessmentDesc": "Évaluation initiale de psychologie du trading terminée",
    "progressTracking.milestones.tenExercises": "10 Exercices Complétés",
    "progressTracking.milestones.tenExercisesDesc": "Atteint le jalon de 10 exercices de psychologie complétés",
    "progressTracking.milestones.score70": "Score de Psychologie 70+",
    "progressTracking.milestones.score70Desc": "Atteint un score de psychologie au-dessus de 70 pour la première fois",
    "progressTracking.milestones.firstCourse": "Première Completion de Cours",
    "progressTracking.milestones.firstCourseDesc": "Terminez votre premier cours de psychologie du trading",
    "progressTracking.milestones.score85": "Score de Psychologie 85+",
    "progressTracking.milestones.score85Desc": "Objectif: Atteindre un score de psychologie au-dessus de 85",
    "progressTracking.milestones.status.completed": "terminé",
    "progressTracking.milestones.status.inprogress": "en cours",
    "progressTracking.milestones.status.upcoming": "à venir",
    "progressTracking.improvements.significantImprovement":
      "Amélioration significative dans la gestion des émotions pendant les sessions de trading",
    "progressTracking.improvements.excellentAdherence": "Excellente adhérence aux règles et stratégies de trading",
    "progressTracking.improvements.goodProgress":
      "Bon progrès dans le dimensionnement de position et la gestion des stop loss",
    "progressTracking.improvements.greatProgress": "Excellent progrès !",
    "progressTracking.improvements.goodImprovement": "Bonne amélioration",
    "progressTracking.improvements.needsFocus": "Nécessite de l'attention",

    // AI Coach
    "aiCoach.subtitle": "Obtenez une orientation personnalisée pour votre psychologie du trading",
    "aiCoach.activeSession": "Session Active",
    "aiCoach.quickTopics": "Sujets Rapides",
    "aiCoach.startConversation": "Démarrez une conversation sur les défis courants de la psychologie du trading",
    "aiCoach.yourProfile": "Votre Profil",
    "aiCoach.experience": "Expérience",
    "aiCoach.style": "Style",
    "aiCoach.riskTolerance": "Tolérance au Risque",
    "aiCoach.mainChallenges": "Défis Principaux",
    "aiCoach.emotionalControl": "Contrôle Émotionnel",
    "aiCoach.fomoManagement": "Gestion de FOMO",
    "aiCoach.tradingDiscipline": "Discipline du Trading",
    "aiCoach.riskPsychology": "Psychologie du Risque",
    "aiCoach.emotionalControlDesc": "Apprenez à gérer les émotions lors du trading",
    "aiCoach.fomoDesc": "Surmontez la peur de manquer des opportunités",
    "aiCoach.disciplineDesc": "Construisez des habitudes de trading cohérentes",
    "aiCoach.riskPsychologyDesc": "Améliorez votre mentalité de gestion de risque",
    "aiCoach.specialized": "Spécialisé en psychologie du trading et en finance comportementale",
    "aiCoach.placeholder":
      "Posez des questions sur la psychologie du trading, partagez vos défis ou décrivez une situation...",
    "aiCoach.thinking": "Le coach réfléchit...",
    "aiCoach.welcomeMessage":
      "Bonjour ! Je suis votre Coach de Psychologie IA. Je suis là pour vous aider à développer une meilleure psychologie du trading et à surmonter les barrières mentales. Sur quoi aimeriez-vous travailler aujourd'hui ?",
    "aiCoach.errorMessage":
      "Je m'excuse, mais j'ai des difficultés à répondre maintenant. Veuillez réessayer dans un moment.",
    "aiCoach.emotionalControlPrompt":
      "Je lutte avec le contrôle émotionnel pendant le trading. Pouvez-vous m'aider à développer de meilleures stratégies de régulation émotionnelle ?",
    "aiCoach.fomoPrompt":
      "J'éprouve souvent du FOMO et j'entre dans des trades impulsivement. Comment puis-je mieux gérer cette peur de manquer des opportunités ?",
    "aiCoach.disciplinePrompt":
      "J'ai du mal à suivre mon plan et mes règles de trading. Pouvez-vous m'aider à développer une meilleure discipline ?",
    "aiCoach.riskPrompt":
      "Je lutte avec une gestion appropriée du risque et le dimensionnement des positions. Pouvez-vous m'aider à comprendre la psychologie derrière le risque ?",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("profitz-language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("profitz-language", lang)
    console.log("Language changed to:", lang) // Debug log
  }

  const t = (key: string, params?: Record<string, string>): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    // Navigate through nested keys
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        // Fallback to English if key not found
        value = translations.en
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            console.warn(`Translation key not found: ${key}`)
            return key
          }
        }
        break
      }
    }

    if (typeof value !== "string") {
      console.warn(`Translation key not found: ${key}`)
      return key
    }

    // Replace parameters if provided
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] || match
      })
    }

    return value
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  // During static-generation there is no provider – return a safe fallback.
  if (context === undefined) {
    return {
      language: "en",
      setLanguage: () => {}, // no-op
      t: (key: string) => key, // show raw key during build
    } as const
  }

  return context
}
