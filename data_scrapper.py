import json
import os
import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from selenium.webdriver.chrome.options import Options


# -----------------------------------------------------------------------
# 1) Your smaller "scrape_esg_profile" method
#    from the previous example (or you can inline the scraping logic).
# -----------------------------------------------------------------------

def scrape_esg_profile(driver):
    """
    Scrapes the MSCI ESG snippet from the given URL (or from an already loaded page),
    extracts key data into a Python dict, and returns that dict.
    Hardcoded approach for controversies: we map the English name to French.
    """
    wait = WebDriverWait(driver, 20)  # Adjust timeout as necessary

    # Wait for the main ESG container to load
    container = wait.until(
        EC.presence_of_element_located(
            (By.ID, "_esgratingsprofile_esg-ratings-profile-container")
        )
    )

    data = {}
    data["company_info"] = {}

    # (1) Company title
    try:
        title_el = driver.find_element(By.CSS_SELECTOR, ".header-company-title")
        data["company_info"]["name"] = title_el.text.strip()
    except:
        data["company_info"]["name"] = None

    # (2) Ticker
    try:
        ticker_el = driver.find_element(By.CSS_SELECTOR, ".header-company-ticker")
        data["company_info"]["ticker"] = ticker_el.text.strip().replace("(", "").replace(")", "")
    except:
        data["company_info"]["ticker"] = None

    # (3) Industry
    try:
        industry_el = driver.find_element(By.CSS_SELECTOR, ".header-esg-industry b")
        parent_text = industry_el.find_element(By.XPATH, "..").text
        data["company_info"]["industry"] = parent_text.replace("Industry:", "").strip()
    except:
        data["company_info"]["industry"] = None

    # (4) Country
    try:
        country_el = driver.find_element(By.CSS_SELECTOR, ".header-country b")
        parent_text = country_el.find_element(By.XPATH, "..").text
        data["company_info"]["country"] = parent_text.replace("Country/Region:", "").strip()
    except:
        data["company_info"]["country"] = None

    # (5) Expand / scrape decarbonization target
    try:
        commitment_toggle = wait.until(
            EC.element_to_be_clickable((By.ID, "esg-commitment-toggle-link"))
        )
        driver.execute_script("arguments[0].click();", commitment_toggle)
        time.sleep(1)
    except:
        pass

    data["decarbonization_target"] = {}
    try:
        decarb_table = driver.find_element(By.CSS_SELECTOR, ".decarbonization-target-table")
        rows = decarb_table.find_elements(By.CSS_SELECTOR, ".decarbonization-target-row")
        for row in rows:
            ps = row.find_elements(By.TAG_NAME, "p")
            if len(ps) == 2:
                question = ps[0].text.strip()
                answer = ps[1].text.strip()
                data["decarbonization_target"][question] = answer
            else:
                pass
    except:
        pass

    # (6) Expand / scrape implied temperature rise
    try:
        climate_toggle = wait.until(
            EC.element_to_be_clickable((By.ID, "esg-climate-toggle-link"))
        )
        driver.execute_script("arguments[0].click();", climate_toggle)
        time.sleep(1)
    except:
        pass

    data["implied_temperature_rise"] = {}
    try:
        itr_element = driver.find_element(By.CSS_SELECTOR, ".implied-temp-rise-value")
        data["implied_temperature_rise"]["value"] = itr_element.text.strip()
    except:
        data["implied_temperature_rise"]["value"] = None

    try:
        explanation_el = driver.find_element(By.CSS_SELECTOR, ".explanatory-sentence")
        data["implied_temperature_rise"]["explanation"] = explanation_el.text.strip()
    except:
        data["implied_temperature_rise"]["explanation"] = None

    # (7) Grab raw SVG for 2°C alignment chart
    data["charts"] = {}
    try:
        chart_div = driver.find_element(By.CSS_SELECTOR, "#_esgratingsprofile_esg-rating-2c-trajectory svg")
        data["charts"]["2c_trajectory_svg"] = chart_div.get_attribute("outerHTML")
    except:
        data["charts"]["2c_trajectory_svg"] = None

    # (8) ESG Ratings
    data["esg_ratings"] = {}
    try:
        rating_circle = driver.find_element(By.CSS_SELECTOR, ".ratingdata-company-rating")
        class_list = rating_circle.get_attribute("class").split()
        rating_letter = None
        for c in class_list:
            if c.startswith("esg-rating-circle-"):
                rating_letter = c.replace("esg-rating-circle-", "").upper()
        data["esg_ratings"]["overall"] = rating_letter
    except:
        data["esg_ratings"]["overall"] = None

    try:
        dist_svg = driver.find_element(By.CSS_SELECTOR, "#_esgratingsprofile_esg-rating-distribution svg")
        data["charts"]["esg_rating_distribution_svg"] = dist_svg.get_attribute("outerHTML")
    except:
        data["charts"]["esg_rating_distribution_svg"] = None

    try:
        hist_svg = driver.find_element(By.CSS_SELECTOR, "#_esgratingsprofile_esg-rating-history svg")
        data["charts"]["esg_rating_history_svg"] = hist_svg.get_attribute("outerHTML")
    except:
        data["charts"]["esg_rating_history_svg"] = None

    # (9) Hardcode translations for controversies
    CONTROVERSY_TRANSLATIONS = {
        "Environment": "Environnement",
        "Biodiversity & Land Use": "Biodiversité & Utilisation des terres",
        "Energy & Climate Change": "Énergie & Changement climatique",
        "Operational Waste (Non-Hazardous)": "Déchets Opérationnels (non dangereux)",
        "Supply Chain Management": "Gestion de la chaîne d'approvisionnement",
        "Toxic Emissions & Waste": "Émissions toxiques & Déchets",
        "Water Stress": "Stress Hydrique",
        "Other": "Autre",
        "Social": "Social",
        "Customers": "Clients",
        "Anticompetitive Practices": "Pratiques anticoncurrentielles",
        "Customer Relations": "Relations Clients",
        "Marketing & Advertising": "Marketing & Publicité",
        "Privacy & Data Security": "Vie privée & Sécurité des données",
        "Product Safety & Quality": "Sécurité & Qualité des produits",
        "Human Rights & Community": "Droits humains & Communauté",
        "Civil Liberties": "Libertés civiles",
        "Human Rights Concerns": "Préoccupations en matière de droits humains",
        "Impact on Local Communities": "Impact sur les communautés locales",
        "Labor Rights & Supply Chain": "Droits du travail & Chaîne d'approvisionnement",
        "Child Labor": "Travail des enfants",
        "Collective Bargaining & Union": "Négociation collective & Syndicat",
        "Discrimination & Workforce Diversity": "Discrimination & Diversité",
        "Health & Safety": "Santé & Sécurité",
        "Labor Management Relations": "Relations Employeur-Salariés",
        "Supply Chain Labor Standards": "Normes de travail dans la chaîne d'approvisionnement",
        "Governance": "Gouvernance",
        "Bribery & Fraud": "Corruption & Fraude",
        "Controversial Investments": "Investissements controversés",
        "Governance Structures": "Structures de gouvernance",
    }

    data["controversies"] = {}
    try:
        controversies_table = driver.find_element(By.ID, "controversies-table")
        items = controversies_table.find_elements(
            By.CSS_SELECTOR, ".column-controversy, .subcolumn-controversy, .controversy"
        )

        controversy_list = []
        for it in items:
            text_val = it.get_attribute("textContent").strip()
            classes = it.get_attribute("class").split()
            color_flag = None
            for c in classes:
                if c.startswith("with-performance-flag-"):
                    color_flag = c.replace("with-performance-flag-", "")
                    break

            # Hardcode translation here
            if text_val in CONTROVERSY_TRANSLATIONS:
                text_val = CONTROVERSY_TRANSLATIONS[text_val]

            controversy_list.append({
                "name": text_val,
                "flag": color_flag
            })

        data["controversies"]["list"] = controversy_list
    except:
        data["controversies"]["list"] = []

    return data

# -----------------------------------------------------------------------
# 2) The function to input a ticker in the search bar, click the
#    result, wait for the new page, then scrape.
# -----------------------------------------------------------------------
def search_and_scrape(driver, ticker):
    """
    1. Type `ticker` into the search input.
    2. Wait for the autocomplete result to appear and click the correct one.
    3. Wait for navigation to the new ESG page.
    4. Call scrape_esg_profile(driver).
    5. Return the scraped data dict.
    """
    wait = WebDriverWait(driver, 20)

    # Clear input and type the ticker
    search_input = wait.until(
        EC.presence_of_element_located((By.ID, "_esgratingsprofile_keywords"))
    )
    search_input.clear()
    search_input.send_keys(ticker)

    # Wait for the autocomplete <ul> to show up with <li> items
    # The container is id="_esgratingsprofile_autocomplete-results-container"
    # The <ul> might have id="ui-id-1", etc. Adjust as needed
    time.sleep(1)  # small sleep to let suggestions appear
    ul_locator = (By.CSS_SELECTOR, "#_esgratingsprofile_autocomplete-results-container ul.ui-autocomplete")
    wait.until(EC.visibility_of_element_located(ul_locator))

    # Potentially there may be multiple <li> items. We can:
    #   - either pick the first one
    #   - or check the text to match the ticker we typed
    # For demonstration, let's just click the first <li>.
    li_results = driver.find_elements(By.CSS_SELECTOR, "#_esgratingsprofile_autocomplete-results-container li")
    if not li_results:
        raise Exception(f"No autocomplete results found for {ticker}")

    # If you need to find the EXACT match, you'd loop or check .text:
    #   for li in li_results:
    #       if "some condition" in li.text: ...
    # But let's assume the top result is correct:
    first_li = li_results[0]
    driver.execute_script("arguments[0].click();", first_li)
    
    # Wait for page to load or main container to appear
    # For example, wait on ID '_esgratingsprofile_esg-ratings-profile-container'
    try:
        wait.until(
            EC.presence_of_element_located(
                (By.ID, "_esgratingsprofile_esg-ratings-profile-container")
            )
        )
    except TimeoutException:
        raise Exception(f"Timed out waiting for ESG page to load for {ticker}")

    # Now run the actual scraping of that page
    data = scrape_esg_profile(driver)
    data["ticker"] = ticker  # keep track of which ticker we scraped

    return data

# -----------------------------------------------------------------------
# 3) Putting it all together in the main routine
# -----------------------------------------------------------------------
if __name__ == "__main__":
    # The 20 or so French tickers you want to scrape:
    french_tickers= [
    "LVMH Moet Hennessy Louis Vuitton",
    "L'Oreal",
    "TotalEnergies",
    "Airbus",
    "Schneider Electric",
    "BNP Paribas",
    "Kering",
    "Air Liquide",
    "AXA",
    "Hermès International",
    "Danone",
    "Veolia Environnement",
    "Saint-Gobain",
    "Capgemini",
    "Legrand",
    "Michelin",
    "Renault",
    "Engie",
    "Thales"
]

    # Where we store partial results
    results_file = "french_esg_results.json"

    # Load existing results if they exist, so we can resume
    if os.path.exists(results_file):
        with open(results_file, "r", encoding="utf-8") as f:
            results = json.load(f)
    else:
        results = {}

    # Initialize driver & open the main page that has the search bar
    # (You must adjust this to the actual URL of the MSCI page with the search box.)
    chrome_options = Options()
    # 1) Set the interface language to French
    chrome_options.add_argument("--lang=fr")

    # 2) For some sites, you may also want to set accept-languages
    chrome_options.add_experimental_option("prefs", {
        "intl.accept_languages": "fr"
    })



    # Iterate over each ticker
    for t in french_tickers:
        driver = webdriver.Chrome(options=chrome_options)
        driver.get("https://www.msci.com/our-solutions/esg-investing/esg-ratings-climate-search-tool/issuer/nike-inc/IID000000002144314f")  
        if t in results:
            print(f"Already scraped {t} => skipping")
            continue

        try:
            print(f"Scraping {t} ...")
            record = search_and_scrape(driver, t)
            # Save in 'results' dict
            results[t] = record

            # Write out to JSON after each success to preserve state
            print(results_file)
            with open(results_file, "w", encoding="utf-8") as f:
                json.dump(results, f, indent=2, ensure_ascii=False)

        except Exception as e:
            print(f"[ERROR] Failed on {t}: {repr(e)}")
            # We continue to the next ticker, so at least partial data is saved
            continue
        driver.quit()


    print("Scraping complete.")