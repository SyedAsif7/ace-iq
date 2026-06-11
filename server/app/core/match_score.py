class MatchScoreEngine:
    @staticmethod
    def calculate_score(user_profile, event):
        """
        Calculates a match percentage between a user profile and an event.
        Profile: {branch, year, city, interests: []}
        Event: {category, location, tags: []}
        """
        score = 0
        total_weight = 0
        
        # Interest/Category match (High weight)
        weight_interests = 0.5
        total_weight += weight_interests
        if any(interest.lower() in event.get('description', '').lower() for interest in user_profile.get('interests', [])):
            score += weight_interests
        elif user_profile.get('branch', '').lower() in event.get('category', '').lower():
            score += weight_interests * 0.8
            
        # City/Location match (Medium weight)
        weight_city = 0.3
        total_weight += weight_city
        if user_profile.get('city', '').lower() == event.get('location', '').lower():
            score += weight_city
        elif event.get('location', '').lower() == 'online':
            score += weight_city * 0.9
            
        # Year match (Low weight)
        weight_year = 0.2
        total_weight += weight_year
        # Assuming event has target_years or similar
        score += weight_year # Default for now
        
        match_percentage = (score / total_weight) * 100
        return round(match_percentage, 2)

if __name__ == "__main__":
    engine = MatchScoreEngine()
    profile = {"branch": "CSE", "city": "Mumbai", "interests": ["Coding", "AI"]}
    event = {"title": "AI Hackathon", "description": "A coding competition for AI enthusiasts", "location": "Mumbai", "category": "Tech"}
    print(f"Match Score: {engine.calculate_score(profile, event)}%")
