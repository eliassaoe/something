#!/bin/bash

# Check if attranslate is installed
if ! command -v attranslate &> /dev/null; then
    echo "Error: attranslate is not installed."
    echo "Please install it with: npm install --global attranslate"
    exit 1
fi

# Ask for OpenAI API key (don't store it in the file)
echo "Enter your OpenAI API key:"
read -s OPENAI_API_KEY
export OPENAI_API_KEY

# Define your source HTML file
SOURCE_FILE="$1"

if [ -z "$SOURCE_FILE" ]; then
  echo "Please provide a source HTML file as an argument"
  echo "Example: ./translate-web.sh spintax-generator.html"
  exit 1
fi

# Make sure the file exists
if [ ! -f "$SOURCE_FILE" ]; then
  echo "Error: File '$SOURCE_FILE' not found."
  exit 1
fi

# Define languages to translate to
TARGET_LANGUAGES=("fr" "es" "de" "pt" "ar" "nl")
TARGET_NAMES=("French" "Spanish" "German" "Portuguese" "Arabic" "Dutch")

# Common arguments for attranslate
COMMON_ARGS=("--srcLng=en" "--srcFormat=xml" "--targetFormat=xml" "--service=openai")

# Add a custom prompt for better HTML translation
PROMPT="Translate this HTML content while preserving all HTML tags. Keep the structure intact. Translate title tags, meta tags, and all visible text. Maintain the natural flow of the language. For URLs and specific technical terms, keep them in their original form."

echo "Starting translation of $SOURCE_FILE..."

# Loop through languages and translate
for i in "${!TARGET_LANGUAGES[@]}"; do
  LANG_CODE="${TARGET_LANGUAGES[$i]}"
  LANG_NAME="${TARGET_NAMES[$i]}"
  
  # Create language directory if it doesn't exist
  mkdir -p "$LANG_CODE"
  
  echo "Translating to $LANG_NAME..."
  
  # Run attranslate
  attranslate --srcFile="$SOURCE_FILE" \
              --targetFile="$LANG_CODE/$SOURCE_FILE" \
              --targetLng="$LANG_NAME" \
              --prompt="$PROMPT" \
              "${COMMON_ARGS[@]}"
  
  echo "✅ Completed translation to $LANG_NAME"
done

echo "Translation complete! Do you want to commit these changes to GitHub? (y/n)"
read answer

if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
  echo "Committing changes to GitHub..."
  git add .
  git commit -m "Translate $SOURCE_FILE to multiple languages"
  
  echo "Enter your GitHub username:"
  read username
  
  echo "Enter your GitHub Personal Access Token:"
  read -s token
  
  # Use the token directly in the URL
  git push https://$username:$token@github.com/eliassaoe/something.git main
  
  if [ $? -eq 0 ]; then
    echo "Changes pushed to GitHub successfully!"
  else
    echo "There was an error pushing to GitHub. Please check your credentials."
  fi
else
  echo "Changes are saved locally but not pushed to GitHub."
fi
