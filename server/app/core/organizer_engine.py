from .ocr_engine import OCREngine

class OrganizerEngine:
    def __init__(self):
        self.ocr = OCREngine()

    def scrape_google_form(self, url):
        """
        Scrapes a Google Form to extract event details.
        """
        try:
            import requests
            from bs4 import BeautifulSoup
            response = requests.get(url)
            if response.status_code != 200:
                return {}

            soup = BeautifulSoup(response.text, 'html.parser')
            # Extract title and description from common Google Form selectors
            title = soup.title.string.replace(' - Google Forms', '') if soup.title else "New Event"
            
            # Very basic extraction - in reality, we'd look for specific form fields
            return {
                "title": title,
                "source_url": url,
                "confidence": 0.6
            }
        except Exception as e:
            print(f"Error scraping form: {e}")
            return {}

    def process_poster_upload(self, image_content):
        """
        Uses OCR to extract all fields from an event poster.
        """
        text = self.ocr.extract_text(image_content)
        details = self.ocr.parse_event_details(text)
        return details

if __name__ == "__main__":
    engine = OrganizerEngine()
    print("Organizer Growth Engine initialized.")
