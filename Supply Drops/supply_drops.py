from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from geopy.geocoders import Nominatim

# Initialize geocoder
geolocator = Nominatim(user_agent="myUniqueGeocoderAppName")

# Define latitude and longitude for New Orleans, LA
latitude = 29.9511
longitude = -90.0715

# Reverse geocoding to get location name
try:
    location = geolocator.reverse((latitude, longitude), exactly_one=True)
    if location:
        location_name = location.address
        print("Location found:", location_name)
    else:
        print("No location found for the given coordinates.")
        exit()
except Exception as e:
    print("Error during geocoding:", e)
    exit()

# Set up Selenium WebDriver to search for supply drops
driver = webdriver.Chrome(service=Service('/Users/ns/Downloads/chromedriver-mac-arm64/chromedriver'))
driver.get("https://www.google.com")

# Search for supply drops near the location
search_query = f"supply drop relief near {location_name}"
print("Search Query:", search_query)
search_box = driver.find_element(By.NAME, "q")
search_box.send_keys(search_query)
search_box.submit()

# Wait for the results to load
try:
    WebDriverWait(driver, 20).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.g")))
except Exception as e:
    print("Error waiting for search results:", e)
    driver.quit()
    exit()

results = driver.find_elements(By.CSS_SELECTOR, "div.g")

# Initialize list to hold relevant donation link
nola_donation_link = None

# Loop through results and find the relevant NOLA link
for result in results:
    try:
        link = result.find_element(By.TAG_NAME, "a").get_attribute("href")
        if "ready.nola.gov" in link:
            nola_donation_link = link
            print(f"Found NOLA donation link: {nola_donation_link}")
            break  # Stop searching once we find the relevant link
    except Exception as e:
        print("Debug: An error occurred while processing a result:", e)

if nola_donation_link is None:
    print("No NOLA donation link found.")
    driver.quit()
    exit()

# Navigate to the NOLA donation page
driver.get(nola_donation_link)
time.sleep(3)  # Allow time for the page to load

# Initialize list to hold supply drop information
supply_drop_info = []

# Find elements containing donation information

try:
    try:
        elements = driver.find_element(By.ID, "p_lt_zoneContent_pageplaceholder_p_lt_ctl07_sys_pnlUpdate")

    except Exception as e:
        print("Error locating donation information on the page:", e)
        driver.quit()
        exit()
    location_elements = elements.find_elements(By.CLASS_NAME, "col-sm-6")
    for element in location_elements:
        locations = element.find_elements(By.TAG_NAME, "h4")
        for l in locations:
            try:
                # Extract location name
                location_name = l.text

                # Extract all list items (assuming they are in <li> tags within a <ul>)
                hours_element = element.find_elements(By.TAG_NAME, "li")

                # Ensure we have at least three items
                address = hours_element[0].text if len(hours_element) > 0 else "No address listed"
                hours_of_service = hours_element[1].text if len(hours_element) > 1 else "No hours listed"
                utilities = hours_element[2].text if len(hours_element) > 2 else "No utilities listed"

                # Append extracted information to the list
                supply_drop_info.append({
                    "location_name": location_name,
                    "address": address,
                    "hours_of_service": hours_of_service,
                    "utilities": utilities
                })

            except Exception as e:
                print("Error extracting information from the element:", e)

except Exception as e:
    print("Error locating donation information on the page:", e)

# Close the browser
driver.quit()

# Output the collected supply drop information in a refined format
if not supply_drop_info:
    print("No supply drops information found.")
else:
    print("\n--- Supply Drop Information ---")
    for drop in supply_drop_info:
        print(f"Location: {drop['location_name']}")
        print(f"Address: {drop['address']}")
        print(f"Hours of Service: {drop['hours_of_service']}")
        print(f"Utilities: {drop['utilities']}\n")