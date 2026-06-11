import React from 'react';
import { MapPin, Calendar, Sparkles } from 'lucide-react';
import { Card, Button, cn } from '../../components/ui';
import { Event } from '../../types';
import { motion } from 'framer-motion';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="p-5 group h-full flex flex-col hover:border-indigo-200 transition-colors">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-slate-100 rounded-xl w-12 h-12 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all duration-300">
            <Calendar className="w-6 h-6" />
          </div>
          <div className={cn(
            "px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1 border animate-pulse",
            event.matchScore > 90 
              ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
              : "bg-indigo-50 text-indigo-700 border-indigo-100"
          )}>
            <Sparkles className="w-3 h-3" />
            {event.matchScore}% Match
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2 text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-slate-500 mb-6 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 pt-4 border-t border-slate-50 uppercase tracking-wider">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-indigo-400" />
            {event.location}
          </div>
          <div className="text-slate-500">{event.date}</div>
        </div>
        
        <Button variant="outline" className="w-full mt-4 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600">
          Register Now
        </Button>
      </Card>
    </motion.div>
  );
};

export default EventCard;
