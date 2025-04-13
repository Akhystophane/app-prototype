import json
from googletrans import Translator

# 1. Load existing JSON data
with open("french_esg_results.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# 2. Setup translator
translator = Translator()

# 3. Recursive translation helper
def translate_recursive(obj):
    if isinstance(obj, dict):
        return {translate_recursive(k): translate_recursive(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [translate_recursive(item) for item in obj]
    elif isinstance(obj, str):
        return translator.translate(obj, dest="fr").text
    else:
        return obj

# 4. Translate each firm’s data
translated_data = {}
for firm, content in data.items():
    translated_data[firm] = translate_recursive(content)

# 5. Save to a new JSON file
with open("french_esg_results_fr.json", "w", encoding="utf-8") as f:
    json.dump(translated_data, f, ensure_ascii=False, indent=2)

print("Translation complete ✅ -> Saved to french_esg_results_fr.json")