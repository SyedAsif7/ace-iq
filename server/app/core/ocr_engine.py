from PIL import Image
import io
import re

class OCREngine:
    def __init__(self, tesseract_path=None):
        try:
            import pytesseract
            if tesseract_path:
                pytesseract.pytesseract.tesseract_cmd = tesseract_path
            self.pytesseract = pytesseract
        except ImportError:
            self.pytesseract = None

    def extract_text(self, image_content):
        """
        Extracts text from image content (bytes).
        """
        try:
            if not self.pytesseract:
                return "OCR Engine (Tesseract) not installed. Please install pytesseract."
            image = Image.open(io.BytesIO(image_content))
            text = self.pytesseract.image_to_string(image)
            return text
        except Exception as e:
            print(f"Error in OCR extraction: {e}")
            return ""

    def parse_event_details(self, text):
        """
        Uses basic NLP/Regex to extract event details from raw text.
        In a real scenario, this would use a more sophisticated NLP model.
        """
        details = {
            "title": "",
            "date": "",
            "venue": "",
            "description": text[:200] + "..." if len(text) > 200 else text,
            "confidence": 0.0
        }
        
        # Simple regex for date
        date_pattern = r'\d{1,2}(?:st|nd|rd|th)?\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}'
        dates = re.findall(date_pattern, text, re.IGNORECASE)
        if dates:
            details["date"] = dates[0]
            details["confidence"] += 0.3

        # Simple logic for title (usually first few lines)
        lines = [line.strip() for line in text.split('\n') if line.strip()]
        if lines:
            details["title"] = lines[0]
            details["confidence"] += 0.2

        if details["date"] and details["title"]:
            details["confidence"] += 0.35 # Higher confidence if both found

        return details

if __name__ == "__main__":
    # Test with a dummy image if needed
    engine = OCREngine()
    print("OCR Engine initialized.")
