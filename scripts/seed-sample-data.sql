-- Seed sample data for ProFitz Trading Psychology Lab

-- Insert sample exercises
INSERT INTO exercises (title, description, exercise_type, difficulty_level, estimated_duration, instructions) VALUES
('Emotional State Check-in', 'A quick assessment of your current emotional state before trading', 'assessment', 'beginner', 5, '{"steps": ["Rate your current stress level (1-10)", "Identify any strong emotions", "Note any physical sensations", "Set an intention for your trading session"]}'),
('Risk Tolerance Visualization', 'Visualize different risk scenarios to understand your comfort level', 'visualization', 'intermediate', 15, '{"steps": ["Close your eyes and relax", "Imagine a trade with 2% risk", "Notice your body response", "Gradually increase risk percentage", "Identify your comfort threshold"]}'),
('FOMO Response Training', 'Practice managing Fear of Missing Out in trading situations', 'simulation', 'intermediate', 20, '{"steps": ["Review a missed opportunity scenario", "Identify FOMO triggers", "Practice alternative responses", "Develop a FOMO action plan"]}'),
('Mindful Trading Meditation', 'A guided meditation specifically designed for traders', 'meditation', 'beginner', 10, '{"steps": ["Find a quiet space", "Focus on breathing", "Visualize successful trading", "Set positive intentions", "Return to awareness slowly"]}'),
('Loss Acceptance Exercise', 'Learn to accept and process trading losses healthily', 'cognitive', 'advanced', 25, '{"steps": ["Reflect on a recent loss", "Identify emotional responses", "Challenge negative thoughts", "Find learning opportunities", "Practice self-compassion"]}');

-- Insert sample courses
INSERT INTO courses (title, description, course_level, estimated_duration, modules) VALUES
('Trading Psychology Fundamentals', 'Master the basics of trading psychology and emotional control', 'beginner', 8, '{"modules": [{"title": "Understanding Trading Psychology", "duration": 60}, {"title": "Emotional Awareness", "duration": 90}, {"title": "Cognitive Biases in Trading", "duration": 120}, {"title": "Building Discipline", "duration": 90}, {"title": "Risk Psychology", "duration": 60}, {"title": "Developing Routines", "duration": 90}, {"title": "Stress Management", "duration": 60}, {"title": "Putting It All Together", "duration": 90}]}'),
('Advanced Risk Management Psychology', 'Deep dive into the psychological aspects of risk management', 'advanced', 12, '{"modules": [{"title": "Risk Perception Psychology", "duration": 90}, {"title": "Position Sizing Psychology", "duration": 120}, {"title": "Stop Loss Psychology", "duration": 90}, {"title": "Portfolio Psychology", "duration": 120}, {"title": "Drawdown Management", "duration": 90}, {"title": "Recovery Psychology", "duration": 90}, {"title": "Long-term Thinking", "duration": 120}, {"title": "Risk-Reward Optimization", "duration": 90}]}'),
('Overcoming Trading Fears', 'Identify and overcome common trading fears and phobias', 'intermediate', 6, '{"modules": [{"title": "Fear Identification", "duration": 60}, {"title": "Fear of Loss", "duration": 90}, {"title": "Fear of Missing Out", "duration": 90}, {"title": "Fear of Success", "duration": 60}, {"title": "Exposure Therapy Techniques", "duration": 120}, {"title": "Building Confidence", "duration": 90}]}');

-- Insert sample achievements
INSERT INTO achievements (title, description, achievement_type, criteria, badge_icon, points) VALUES
('First Steps', 'Complete your first psychology assessment', 'milestone', '{"requirement": "complete_assessment", "count": 1}', 'star', 100),
('Consistent Learner', 'Complete 5 exercises in a week', 'consistency', '{"requirement": "exercises_per_week", "count": 5}', 'target', 250),
('Course Graduate', 'Complete your first psychology course', 'education', '{"requirement": "complete_course", "count": 1}', 'graduation-cap', 500),
('Self-Aware Trader', 'Log 30 reflection entries', 'reflection', '{"requirement": "reflection_entries", "count": 30}', 'brain', 300),
('Pattern Spotter', 'Identify 10 behavioral patterns', 'analysis', '{"requirement": "patterns_identified", "count": 10}', 'search', 400),
('AI Coach Regular', 'Have 20 sessions with the AI coach', 'engagement', '{"requirement": "coach_sessions", "count": 20}', 'message-circle', 350),
('Screenshot Analyst', 'Analyze 15 trading screenshots', 'analysis', '{"requirement": "screenshot_analyses", "count": 15}', 'camera', 300),
('Psychology Master', 'Achieve a psychology score of 90+', 'mastery', '{"requirement": "psychology_score", "threshold": 90}', 'crown', 1000);

-- Insert sample behavioral patterns (these would typically be identified by AI)
INSERT INTO behavioral_patterns (pattern_type, pattern_description, frequency, severity) VALUES
('Revenge Trading', 'Tendency to increase position size after losses to recover quickly', 3, 'high'),
('FOMO Entry', 'Entering trades late due to fear of missing out on price movements', 5, 'medium'),
('Profit Taking Too Early', 'Closing profitable positions prematurely due to fear of giving back gains', 7, 'medium'),
('Analysis Paralysis', 'Over-analyzing setups and missing trading opportunities', 4, 'low'),
('Weekend Gap Anxiety', 'Excessive worry about market gaps over weekends', 2, 'low'),
('Overconfidence After Wins', 'Increasing risk after a series of winning trades', 3, 'high'),
('Emotional Stop Moving', 'Moving stop losses when trades go against initial plan', 6, 'high');
