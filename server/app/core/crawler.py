import requests
import time
import re

class EventCrawler:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }

    def scrape_university_events(self, url):
        """
        Scrapes events from a given university portal.
        """
        try:
            from bs4 import BeautifulSoup
            response = requests.get(url, headers=self.headers)
            if response.status_code != 200:
                return []

            soup = BeautifulSoup(response.text, 'html.parser')
            events = []
            
            # Example logic: look for common event patterns
            # This would be customized per target site or use a generic selector
            for item in soup.find_all(['div', 'article'], class_=re.compile(r'event|calendar', re.I)):
                title = item.find(['h2', 'h3', 'a']).text.strip() if item.find(['h2', 'h3', 'a']) else "Unknown Event"
                link = item.find('a')['href'] if item.find('a') else ""
                
                events.append({
                    "title": title,
                    "link": link,
                    "source": url
                })
            
            return events
        except Exception as e:
            print(f"Error scraping {url}: {e}")
            return []

    def run_seeder(self, target_urls):
        all_events = []
        for url in target_urls:
            print(f"Crawling {url}...")
            events = self.scrape_university_events(url)
            all_events.extend(events)
            time.sleep(1) # Be respectful
        return all_events

if __name__ == "__main__":
    crawler = EventCrawler()
    # Example target
    targets = ["https://www.unstop.com/events"] # Just an example
    # events = crawler.run_seeder(targets)
    # print(f"Found {len(events)} events.")
