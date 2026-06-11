import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { Button, Card, cn } from '../../components/ui';
import { UserProfile } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingQuizProps {
  onComplete: (profile: UserProfile) => void;
}

const OnboardingQuiz = ({ onComplete }: OnboardingQuizProps) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    branch: '',
    year: '',
    city: '',
    interests: []
  });

  const steps = [
    {
      title: "What's your branch?",
      field: 'branch',
      options: ['CSE', 'ECE', 'Mechanical', 'Civil', 'Design', 'Arts', 'Commerce']
    },
    {
      title: "Which year are you in?",
      field: 'year',
      options: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate']
    },
    {
      title: "Where are you based?",
      field: 'city',
      options: ['Mumbai', 'Pune', 'Delhi', 'Bangalore', 'Hyderabad', 'Remote']
    },
    {
      title: "What interests you?",
      field: 'interests',
      options: ['Coding', 'Music', 'Photography', 'Business', 'AI/ML', 'Design', 'Sports'],
      multi: true
    }
  ];

  const handleSelect = (value: string) => {
    if (steps[step].multi) {
      const current = profile.interests;
      const updated = current.includes(value) 
        ? current.filter(i => i !== value) 
        : [...current, value];
      setProfile({ ...profile, interests: updated });
    } else {
      setProfile({ ...profile, [steps[step].field]: value });
      if (step < steps.length - 1) setStep(step + 1);
    }
  };

  const isComplete = profile.branch && profile.year && profile.city && profile.interests.length > 0;

  return (
    <Card className="p-8 max-w-lg w-full shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1.5 w-8 rounded-full transition-all duration-500",
                i <= step ? 'bg-indigo-600' : 'bg-slate-100'
              )} 
            />
          ))}
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step {step + 1} of 4</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-slate-800">{steps[step].title}</h3>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {steps[step].options.map((option) => {
              const isSelected = steps[step].multi 
                ? profile.interests.includes(option) 
                : profile[steps[step].field as keyof UserProfile] === option;
              
              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all text-sm font-semibold flex items-center justify-between",
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-100 hover:border-slate-200 text-slate-600'
                  )}
                >
                  {option}
                  {isSelected && <CheckCircle2 className="w-4 h-4" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between items-center mt-4">
        {step > 0 && (
          <button 
            onClick={() => setStep(step - 1)}
            className="text-slate-400 font-bold hover:text-slate-600 transition-colors text-sm"
          >
            Back
          </button>
        )}
        <div className="flex-1" />
        {step === steps.length - 1 ? (
          <Button
            onClick={() => onComplete(profile)}
            disabled={!isComplete}
            className="flex items-center gap-2"
          >
            Finish & Match
            <Sparkles className="w-4 h-4" />
          </Button>
        ) : (
          profile[steps[step].field as keyof UserProfile] && !steps[step].multi && (
            <button 
              onClick={() => setStep(step + 1)}
              className="text-indigo-600 font-bold flex items-center gap-1 hover:gap-2 transition-all text-sm"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )
        )}
      </div>
    </Card>
  );
};

export default OnboardingQuiz;
