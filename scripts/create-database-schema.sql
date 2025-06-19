-- ProFitz Trading Psychology Lab Database Schema

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    preferred_language VARCHAR(5) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles table
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    trading_experience VARCHAR(50),
    trading_style VARCHAR(50),
    risk_tolerance VARCHAR(50),
    primary_markets TEXT[],
    psychological_challenges TEXT[],
    goals TEXT[],
    psychology_score INTEGER DEFAULT 0,
    consistency_rating INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI coach sessions table
CREATE TABLE coach_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_type VARCHAR(50) DEFAULT 'general',
    messages JSONB NOT NULL,
    session_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Screenshot analyses table
CREATE TABLE screenshot_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    trading_context TEXT,
    ai_analysis TEXT NOT NULL,
    technical_score INTEGER,
    psychological_score INTEGER,
    risk_assessment VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Behavioral patterns table
CREATE TABLE behavioral_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    pattern_type VARCHAR(100) NOT NULL,
    pattern_description TEXT,
    frequency INTEGER DEFAULT 1,
    severity VARCHAR(20),
    identified_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_occurrence TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exercises table
CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    exercise_type VARCHAR(50),
    difficulty_level VARCHAR(20),
    estimated_duration INTEGER, -- in minutes
    instructions JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User exercise completions table
CREATE TABLE user_exercise_completions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
    completion_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    score INTEGER,
    feedback TEXT,
    time_spent INTEGER -- in minutes
);

-- Courses table
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    course_level VARCHAR(20),
    estimated_duration INTEGER, -- in hours
    modules JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User course progress table
CREATE TABLE user_course_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    current_module INTEGER DEFAULT 1,
    completion_percentage INTEGER DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Achievements table
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    achievement_type VARCHAR(50),
    criteria JSONB,
    badge_icon VARCHAR(100),
    points INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User achievements table
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    earned_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    progress INTEGER DEFAULT 100
);

-- Reflections/Journal entries table
CREATE TABLE reflections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200),
    content TEXT NOT NULL,
    reflection_type VARCHAR(50) DEFAULT 'general',
    mood_rating INTEGER, -- 1-10 scale
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Progress tracking table
CREATE TABLE progress_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    metric_type VARCHAR(50) NOT NULL,
    metric_value DECIMAL(10,2) NOT NULL,
    recorded_date DATE DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_coach_sessions_user_id ON coach_sessions(user_id);
CREATE INDEX idx_screenshot_analyses_user_id ON screenshot_analyses(user_id);
CREATE INDEX idx_behavioral_patterns_user_id ON behavioral_patterns(user_id);
CREATE INDEX idx_user_exercise_completions_user_id ON user_exercise_completions(user_id);
CREATE INDEX idx_user_course_progress_user_id ON user_course_progress(user_id);
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_reflections_user_id ON reflections(user_id);
CREATE INDEX idx_progress_metrics_user_id ON progress_metrics(user_id);
CREATE INDEX idx_progress_metrics_date ON progress_metrics(recorded_date);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE coach_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE screenshot_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE behavioral_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_exercise_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_metrics ENABLE ROW LEVEL SECURITY;
