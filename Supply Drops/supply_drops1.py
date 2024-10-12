from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Set up Selenium WebDriver
driver = webdriver.Chrome(service=Service('/Users/ns/Downloads/chromedriver-mac-arm64/chromedriver'))

# Navigate to the page containing food distribution information
driver.get("https://uwcf.org/initiatives/endhunger/schedule/#toggle-id-1")  # Replace with the actual URL

# Allow time for the page to load
time.sleep(3)

# Initialize list to hold food distribution information
food_distribution_info = []

# Find all the toggle sections for food distribution sites
toggle_sections = driver.find_elements(By.CLASS_NAME, "av_toggle_section")

# Loop through each toggle section to extract information
for section in toggle_sections:
    try:
        # Find the title (location name)
        location_name_element = section.find_element(By.CLASS_NAME, "toggler")
        location_name = location_name_element.text.strip()

        # Use JavaScript to click on the toggle to expand it
        driver.execute_script("arguments[0].click();", location_name_element)

        # Wait for the toggle content to be visible
        WebDriverWait(driver, 10).until(
            EC.visibility_of(section.find_element(By.CLASS_NAME, "toggle_content"))
        )

        # Find the toggle content
        toggle_content = section.find_element(By.CLASS_NAME, "toggle_content")

        # Extract details such as address and hours of service
        paragraphs = toggle_content.find_elements(By.TAG_NAME, "p")

        # Initialize address and hours of service
        address_text = "No address listed"
        hours_of_service = "No hours listed"

        # Check the number of paragraphs and extract information accordingly
        if paragraphs:
            # Try to get the address if available
            if len(paragraphs) > 0:
                address_text = paragraphs[0].text.strip() if paragraphs[0].text.strip() else address_text
            # Try to get the hours of service if available
            if len(paragraphs) > 1:
                hours_of_service = paragraphs[1].text.strip() if paragraphs[1].text.strip() else hours_of_service

        # Append the extracted information to the list
        food_distribution_info.append({
            "location_name": location_name,
            "address": address_text,
            "hours_of_service": hours_of_service
        })

        # Optional: Wait a bit before clicking the next toggle
        time.sleep(1)

    except Exception as e:
        print(f"Error extracting information from section '{location_name}': {e}")

# Close the browser
driver.quit()

# Output the collected food distribution information
if not food_distribution_info:
    print("No food distribution information found.")
else:
    print("\n--- Food Distribution Information ---")
    for food_drop in food_distribution_info:
        print(f"Location: {food_drop['location_name']}")
        print(f"Address: {food_drop['address']}")
        print(f"Hours of Service: {food_drop['hours_of_service']}\n")