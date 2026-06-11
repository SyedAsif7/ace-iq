from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class ZuzuEngine:
    def __init__(self):
        try:
            import spacy
            self.nlp = spacy.load("en_core_web_sm")
        except Exception as e:
            print(f"Warning: spaCy or model not found: {e}. Using fallback entity extraction.")
            self.nlp = None
        
        self.vectorizer = TfidfVectorizer()
        self.events_metadata = []
        self.event_vectors = None

    def extract_entities(self, text):
        """
        Extracts branch, year, city, and interest from user input.
        """
        if not self.nlp:
            return {"text": text}
            
        doc = self.nlp(text)
        entities = {
            "GPE": [], # Cities
            "ORG": [], # Colleges/Branches
            "interests": []
        }
        
        for ent in doc.ents:
            if ent.label_ in entities:
                entities[ent.label_].append(ent.text)
        
        return entities

    def train_matcher(self, events):
        """
        Builds a TF-IDF matrix for events to enable content-based filtering.
        """
        self.events_metadata = events
        descriptions = [e.get('description', '') + ' ' + e.get('title', '') for e in events]
        if descriptions:
            self.event_vectors = self.vectorizer.fit_transform(descriptions)

    def match_events(self, user_profile_text, top_n=5):
        """
        Matches user interests against events using cosine similarity.
        """
        if self.event_vectors is None:
            return []
            
        user_vector = self.vectorizer.transform([user_profile_text])
        similarities = cosine_similarity(user_vector, self.event_vectors).flatten()
        
        top_indices = similarities.argsort()[-top_n:][::-1]
        results = []
        for idx in top_indices:
            event = self.events_metadata[idx].copy()
            event['match_score'] = float(similarities[idx])
            results.append(event)
            
        return results

if __name__ == "__main__":
    zuzu = ZuzuEngine()
    print("Zuzu 2.0 Engine initialized.")
