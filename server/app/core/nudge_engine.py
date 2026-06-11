from datetime import datetime, timedelta

class NudgeEngine:
    def __init__(self):
        self.triggers = {
            "view_no_register": "We noticed you liked {event_title}. Ready to secure your spot?",
            "profile_incomplete": "Complete your profile to unlock a 100% Match Score on all events!",
            "idle_7_days": "New events in {city} match your interests! Don't miss out.",
            "search_no_click": "Can't find what you're looking for? Ask Zuzu for help!",
            "registered_no_attend": "See you tomorrow at {event_title}! Here's your entry pass."
        }

    def evaluate_signals(self, user_behavior, user_profile):
        """
        Evaluates behavioral signals and returns a nudge if a trigger matches.
        user_behavior: {last_active, views: [], registrations: [], searches: []}
        """
        now = datetime.now()
        
        # Rule 1: Idle 7 days
        if (now - user_behavior.get('last_active', now)).days >= 7:
            return {
                "type": "idle_7_days",
                "message": self.triggers["idle_7_days"].format(city=user_profile.get('city', 'your area'))
            }
            
        # Rule 2: Profile incomplete
        if not user_profile.get('interests') or not user_profile.get('branch'):
            return {
                "type": "profile_incomplete",
                "message": self.triggers["profile_incomplete"]
            }
            
        # Rule 3: View no register
        if user_behavior.get('views') and not user_behavior.get('registrations'):
            last_viewed = user_behavior['views'][-1]
            return {
                "type": "view_no_register",
                "message": self.triggers["view_no_register"].format(event_title=last_viewed.get('title'))
            }
            
        return None

if __name__ == "__main__":
    engine = NudgeEngine()
    profile = {"city": "Mumbai", "interests": []}
    behavior = {"last_active": datetime.now() - timedelta(days=8)}
    print(engine.evaluate_signals(behavior, profile))
