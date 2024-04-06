from fastapi import FastAPI
import uvicorn
import pickle
import dill
import pandas as pd
import re
# import requests
# import sklearn
import string
import nltk
import urllib
# ! pip install emoji
import emoji
# !pip install contractions
import contractions
# !pip install stanza
import stanza
import warnings

from Review import Review

app = FastAPI()

def preprocess_data(input_review):
  paragraph_lists = [[input_review]]

  warnings.filterwarnings('ignore')
  period_contractions = {
          "Mr.": "Mister",
          "Dr.": "Doctor",
          "Ms.": "Miss",
          "Mrs.": "Mistress",
          "Prof.": "Professor",
          "Hon.": "Honorable",
          "St.": "Saint",
          "Co.": "Company",
          "Ltd.": "Limited",
          "Inc.": "Incorporated",
          "e.g.": "for example",
          "i.e.": "that is",
          "a.m.": "ante meridiem",
          "p.m.": "post meridiem",
          "A.D.": "Anno Domini",
          "B.C.": "Before Christ",
          "U.S.A.": "United States of America",
          "U.K.": "United Kingdom",
          "EU": "European Union",
          "etc.": "et cetera",
          "'o clock" : "",
          "km": "kilometers",
          "mi": "miles",
          "ft": "feet",
          "m": "meters",
        "min" : "minimum",
        "temp" : "temperature",
        # Temperature
        "°c": "degrees celsius",
        "°f": "degrees fahrenheit",
        "c" : "degrees celsius",
        "f" : "degrees fahrenheit",

        # Currency
        "usd": "united_states_dollar",
        "eur": "euro",
        "gbp": "british_pound",
        "cad": "canadian_dollar",
        "aud": "australian_dollar",
        "jpy": "japanese_yen",
        "cny": "chinese_yuan",

        # Speed
        "mph": "miles per hour",
        "km/h": "kilometers per hour",

        # Accommodation
        "ppl": "people",
        "sq ft": "square feet",
        "sqm": "square meters",

        # Other
        "l": "liters",
        "ml": "milliliters",
        "g": "grams",
        "kg": "kilograms",
        "mbps": "megabits per second",
        "min walk": "minutes walk",
        "min drive": "minutes drive",

        # Context-specific
        "bb": "bed and breakfast",
        "hh": "housekeeping hour (hotel)",
        "eta": "estimated time of arrival",
        "atm": "automated teller machine",

        # Additional units you requested
        "gal": "gallons",
        "oz": "ounces",
        "lb": "pounds",
        "cm": "centimeters",
        "kw": "kilowatts",
        "kwh": "kilowatt-hours",
        "sq mi": "square miles",
        "Mr.": "Mister",
        "Dr.": "Doctor",
        "Ms.": "Miss",
        "Mrs.": "Mistress",
        "Prof.": "Professor",
        "Hon.": "Honorable",
        "St.": "Saint",
        "Co.": "Company",
        "Ltd.": "Limited",
        "Inc.": "Incorporated",
        "e.g.": "for example",
        "i.e.": "that is",
        "a.m.": "ante meridiem",
        "p.m.": "post meridiem",
        "A.D.": "Anno Domini",
        "B.C.": "Before Christ",
        "U.S.A.": "United States of America",
        "U.K.": "United Kingdom",
        "EU": "European Union",
        "etc.": "et cetera",

      # Solving the period problem
      "o clock.": ".",
      "km.": "kilometers.",
      "mi.": "miles.",
      "ft.": "feet.",
      "m.": "meters.",
      "min.": "minimum.",
      "temp.": "temperature.",
      "°c.": "degrees celsius.",
      "°f.": "degrees fahrenheit.",
      "c.": "degrees celsius.",
      "f.": "degrees fahrenheit.",
      "usd.": "united_states_dollar.",
      "eur.": "euro.",
      "gbp.": "british_pound.",
      "cad.": "canadian_dollar.",
      "aud.": "australian_dollar.",
      "jpy.": "japanese_yen.",
      "cny.": "chinese_yuan.",
      "mph.": "miles per hour.",
      "km/h.": "kilometers per hour.",
      "ppl.": "people.",
      "sq ft.": "square feet.",
      "sqm.": "square meters.",
      "l.": "liters.",
      "ml.": "milliliters.",
      "g.": "grams.",
      "kg.": "kilograms.",
      "mbps.": "megabits per second.",
      "min walk.": "minutes walk.",
      "min drive.": "minutes drive.",
      "bb.": "bed and breakfast.",
      "hh.": "housekeeping hour (hotel).",
      "eta.": "estimated time of arrival.",
      "atm.": "automated teller machine.",
      "gal.": "gallons.",
      "oz.": "ounces.",
      "lb.": "pounds.",
      "cm.": "centimeters.",
      "kw.": "kilowatts.",
      "kwh.": "kilowatt-hours.",
      "sq mi.": "square miles."
  }
    # Text Preprocessing
  # Simple Preprocessing
  def preprocess(q):
      # q = str(q).lower().strip()
      # Replace certain Special Charachters with their String Equivalents
      q = q.replace('%','precent')
      q = q.replace('$','dollar')
      q= q.replace('₹','rupee')
      q = q.replace('€','euros')
      q =q.replace('@','at')

      # the pattern '[math]' appears around 900 times in whole dataset
      q = q.replace('[math]','')

      # Replacing some numbers with strign Equivalents (not perfect could be improved)
      q = q.replace(',000,000,000 ' ,'b ')
      q = q.replace(',000,000, ','m ')
      q = q.replace(',000 ','k ')
      q = re.sub(r'([0-9]+)000000000',r'\1b',q)
      q = re.sub(r'([0-9]+)000000',r'\1m',q)
      q = re.sub(r'([0-9]+)000',r'\1k',q)

      # Contracting words
      contractions = {

      "ain't": "am not / are not / is not",
      "aren't": "are not",
      "can't": "cannot",
      "can't've": "cannot have",
      "'cause": "because",
      "could've": "could have",
      "couldn't": "could not",
      "couldn't've": "could not have",
      "didn't": "did not",
      "doesn't": "does not",
      "don't": "do not",
      "hadn't": "had not",
      "hadn't've": "had not have",
      "hasn't": "has not",
      "haven't": "have not",
      "he'd": "he would",
      "he'd've": "he would have",
      "he'll": "he will",
      "he'll've": "he shall have",
      "he's": "he is",
      "how'd": "how did",
      "how'd'y": "how do you",
      "how'll": "how will",
      "how's": "how is ",
      "I'd": "I would",
      "I'd've": "I would have",
      "I'll": "I will",
      "I'll've": "I will have",
      "I'm": "I am",
      "I've": "I have",
      "isn't": "is not",
      "it'd": "it would",
      "it'd've": "it would have",
      "it'll": "it will",
      "it'll've": "it will have",
      "it's": "it is",
      "let's": "let us",
      "ma'am": "madam",
      "mayn't": "may not",
      "might've": "might have",
      "mightn't": "might not",
      "mightn't've": "might not have",
      "must've": "must have",
      "mustn't": "must not",
      "mustn't've": "must not have",
      "needn't": "need not",
      "needn't've": "need not have",
      "o'clock": "of the clock",
      "oughtn't": "ought not",
      "oughtn't've": "ought not have",
      "shan't": "shall not",
      "sha'n't": "shall not",
      "shan't've": "shall not have",
      "she'd": "she would",
      "she'd've": "she would have",
      "she'll": "she will",
      "she'll've": "she will have",
      "she's": "she is",
      "should've": "should have",
      "shouldn't": "should not",
      "shouldn't've": "should not have",
      "so've": "so have",
      "so's": "so is",
      "that'd": "that would",
      "that'd've": "that would have",
      "that's": "that is",
      "there'd": "there would",
      "there'd've": "there would have",
      "there's": "there is",
      "they'd": "they would",
      "they'd've": "they would have",
      "they'll": "they will",
      "they'll've": "they will have",
      "they're": "they are",
      "they've": "they have",
      "to've": "to have",
      "wasn't": "was not",
      "we'd": "we would",
      "we'd've": "we would have",
      "we'll": "we will",
      "we'll've": "we will have",
      "we're": "we are",
      "we've": "we have",
      "weren't": "were not",
      "what'll": "what will",
      "what'll've": "what will have",
      "what're": "what are",
      "what's": "what is",
      "what've": "what have",
      "when's": "when is",
      "when've": "when have",
      "where'd": "where did",
      "where's": "where is",
      "where've": "where have",
      "who'll": "who will",
      "who'll've": "who will have",
      "who's": "who is",
      "who've": "who have",
      "why's": "why is",
      "why've": "why have",
      "will've": "will have",
      "won't": "will not",
      "won't've": "will not have",
      "would've": "would have",
      "wouldn't": "would not",
      "wouldn't've": "would not have",
      "y'all": "you all",
      "y'all'd": "you all would",
      "y'all'd've": "you all would have",
      "y'all're": "you all are",
      "y'all've": "you all have",
      "you'd": "you would",
      "you'd've": "you would have",
      "you'll": " you will",
      "you'll've": "you will have",
      "you're": "you are",
      "you've": "you have",
      "mr" : "mister",
      "ms" : "misses",
      "mrs" : "misses",
      "nd" : " ",
      'th' : " ",
      'rd' : ' ',
      'st' : ' ',
       }

      q_decontracted = []
      for word in q.split():
        if word in contractions:
          word = contractions[word]
        q_decontracted.append(word)

      q = ' '.join(q_decontracted)
      q = q.replace("'ve"," have")
      q = q.replace("n't"," not")
      q = q.replace(" 're","are")
      q = q.replace("'ll"," will")
      return q
  # For identifying urls
  def is_link(text):
      # Regular expression pattern to match URLs
      url_pattern = r'https?://\S+'

      # Search for the URL pattern in the text
      if re.search(url_pattern, text):
          return True
      else:
          return False

  def extracting_info_urls(paragraphs):
    """
    This function extracts information from a list of lists of sentences.

    Args:
        paragraphs: A list of lists of sentences, where each inner list represents a paragraph.

    Returns:
        A modified list where each sentence has processed information.
    """
    modified_paragraphs = []
    for paragraph in paragraphs:
      processed_paragraph = []
      for sentence in paragraph:
        index=0
        processed_sentence = process_sentence(sentence,index)
        processed_paragraph.append(processed_sentence)
      modified_paragraphs.append(processed_paragraph)
    return modified_paragraphs

  def process_sentence(sentence,index):
    """
    This function processes a single sentence.

    Args:
        sentence: A single sentence string.

    Returns:
        The modified sentence with information extracted.
    """
    text = sentence.split()
    new_sentence = ""
    for word in text:
      if word.startswith("http://") or word.startswith("https://"):
        parsed_url = urllib.parse.urlparse(word)
        word = parsed_url.netloc
        word = word[4:]
        new_word = ""
        for char in word:
          if char != ".":
            new_word += char
          else:
            new_word += " "
        word = new_word
      elif re.match(r'\d+\.', word) and index <= 3:  # Removed unnecessary line
        word = ""
      new_sentence += (word + " ")
    return new_sentence.strip()  # Remove trailing whitespace
  # 1.) Removing URLS
  modified_paragraphs = extracting_info_urls(paragraph_lists)

  paragraph_lists =modified_paragraphs


  def add_period_after_exclamation(text):
    # Use regular expression to find exclamation marks (one or consecutive)
    # and replace them with an exclamation mark followed by a period
    modified_text = re.sub(r'!+', '!.', text)
    return modified_text
  def add_period_after_question(text):
      modified_text = re.sub(r'\?+', '?.', text)
      return modified_text
  # 2.) Split Paragraph into sentences
  # Split the paragraph into sentences
  for i in range(len(paragraph_lists)):
    for j in range(len(paragraph_lists[i])):
      paragraph_lists[i][j] = add_period_after_exclamation( paragraph_lists[i][j])
  for i in range(len(paragraph_lists)):
    for j in range(len(paragraph_lists[i])):
      paragraph_lists[i][j] = add_period_after_question( paragraph_lists[i][j])

  print("After splitting sentences:")

  print('Step 2 success')

  # lowercasing the conractions
  lowercase_contractions = {key.lower(): value.lower() for key, value in period_contractions.items()}

  def has_both_chars_and_numbers(text):
    has_chars = False
    has_numbers = False
    for char in text:
      if char.isalpha():
        has_chars = True
      if char.isdigit():
        has_numbers = True

      if has_chars and has_numbers:
        return True
    return False

  def expand_period_contractions(q):
    q_decontracted = []
    for word in q.split():
      if has_both_chars_and_numbers(word) == True:
        # print(word)
        index=0
        while  index < len(word) and word[index].isdigit():
          index+=1
        if index< len(word):
          char_word = word[index:]
          if char_word.lower() in lowercase_contractions:
            word = f"{word[:index]} {lowercase_contractions[char_word.lower()]}"
      else:
        if word.lower() in lowercase_contractions:
            word =lowercase_contractions[word.lower()]
      q_decontracted.append(word)
    return ' '.join(q_decontracted)

  # 3.)  Expanding the contractions
  for i in range(len(paragraph_lists)):
    for j in range(len(paragraph_lists[i])):
      paragraph_lists[i][j] = expand_period_contractions(paragraph_lists[i][j])

  print("After Expanding sentences:")
  print('Step 3 success')

  # 4.) Expand full form of Countries
  def expand_countries(text):
    text = text.replace('US','United States of America')
    new_text = text.replace('IN','India')
    return new_text
  for i in range(len(paragraph_lists)):
    for j in range(len(paragraph_lists[i])):
      paragraph_lists[i][j] = expand_countries(paragraph_lists[i][j])
  print("After Expanding Countries:")
  for sentence in paragraph_lists:
    print(sentence)
  print('Step 4 success')

  # 5.)  Adding Spaces around periods

  def add_spaces_around_expected_periods(text):
    decimal_pattern = r"\d+(?:\.\d+)?"  # Matches any decimal format

    words = text.split()
    for i, word in enumerate(words):
        if not re.match(decimal_pattern, words[i]):

            # Check if period exists and handle internal periods only
            if "." in word and len(word) >= 2:
                period_index = word.index(".")
                if(word.count(".")>1):

                  count=word.count(".")
                  index = period_index
                  print(words[i],count,period_index)
                  while count > 1:
                    period_index +=1
                    count -= 1
                  print(period_index)
                  if period_index < len(word):
                    words[i] = f"{word[:index]} {word[period_index+1:]}"
                  else :
                    words[i] = f"{word[:period_index]}"

                elif word.startswith('.'):
                   words[i] = f"{word[period_index]} {word[period_index+1:]}"
                elif word.endswith('.'):
                   words[i] = f"{word[:period_index]} {word[period_index]}"
                else:
                # Add space before and after the period
                  words[i] = f"{word[:period_index]} {word[period_index]} {word[period_index+1:]}"


    return " ".join(words)
  for i in range(len(paragraph_lists)):
    for j in range(len(paragraph_lists[i])):
      paragraph_lists[i][j] = add_spaces_around_expected_periods(paragraph_lists[i][j])

  print("Adding Spaces around periods:")
  for sentence in paragraph_lists:
    print(sentence)
  print('Step 5 success')

  #6.)
  def add_left_space_to_hashtags(text):

    result = []
    for i, char in enumerate(text):
      if char == "#" and i > 0 and text[i-1] != " ":  # Check for hash and previous character
        result.append(" ")
      result.append(char)
    return "".join(result)
  for i in range(len(paragraph_lists)):
    for j in range(len(paragraph_lists[i])):
      paragraph_lists[i][j] = add_left_space_to_hashtags(paragraph_lists[i][j])

  print("Adding Spaces around hashtags:")
  for sentence in paragraph_lists:
    print(sentence)
  print('Step 6 success')

  punctuations = (list(string.punctuation))
  punctuations.remove('!')
  punctuations.remove('-')
  punctuations.remove('?')

  punctuations.append('“')
  punctuations.append('”')
  punctuations = ''.join(punctuations)


  #7.)
  def remove_emojis(sentences):
    clean_sentences = []
    for sentence_list in sentences:
        clean_sentence_list = []
        for sentence in sentence_list:
            # Remove emojis from the sentence
            clean_sentence = ''.join(c for c in sentence if not emoji.is_emoji(c))
            clean_sentence_list.append(clean_sentence)
        clean_sentences.append(clean_sentence_list)
    return clean_sentences

  paragraph_lists = remove_emojis(paragraph_lists)

  print("Removing Emojis:")
  for sentence in paragraph_lists:
    print(sentence)
  print('Step 7 success')

  #8.)
  def remove_hashtags(sentences):
    clean_sentences = []
    for sentence_list in sentences:
        clean_sentence_list = []
        for sentence in sentence_list:
            # Remove emojis, \u200d characters, and hashtagged words
            clean_sentence = ' '.join(word for word in sentence.split() if not ( '\u200d' in word or word == '\u200d' or word.startswith('#')))
            clean_sentence_list.append(clean_sentence)
        clean_sentences.append(clean_sentence_list)
    return clean_sentences
  paragraph_lists = remove_hashtags(paragraph_lists)

  print("Removing hashtags:")
  print('Step 8 success')


  # Punctuations
  exclude = punctuations
  combined_list = [' '.join(paragraph) for paragraph in paragraph_lists]
  paragraph_lists = combined_list

  def remove_punc1(text):

     translation_table = str.maketrans({char: ' ' if char == "'" else " " for char in exclude})  # Create translation table
     translation_table[ord("'")] = None
     text_without_punc = text.translate(translation_table)  # Remove punctuation and replace hyphens with whitespace
     return text_without_punc

  def remove_em_dashes(text):
    cleaned_text = text.replace('—', ' ')
    return cleaned_text
  def remove_hyphen_dashes(text):
      cleaned_text = text.replace('-', ' ')  # Replace em dashes with whitespace
      return cleaned_text
  def replace_apostrophe(text):
      cleaned_text = text.replace("'", '')  # Replace em dashes with whitespace
      return cleaned_text
  def remove_hashtag_dashes(text):
      cleaned_text = text.replace('hashtag', '')  # Replace em dashes with whitespace
      return cleaned_text

  #9.) Make new_list
  # i=0
  def make_new_list(paragraph_lists):
    new_list = []
    sentences = paragraph_lists[0]
    sentences = sentences.split(' . ')
    for i in range(len(sentences)):
        sentences[i] = sentences[i].lower()
        sentences[i] = preprocess(sentences[i])
        sentences[i] = replace_apostrophe(sentences[i])
        sentences[i] = remove_punc1(sentences[i])
        sentences[i] = remove_em_dashes(sentences[i])
        sentences[i] = remove_hyphen_dashes(sentences[i])
        sentences[i] = remove_hashtag_dashes(sentences[i])
    new_list.append(sentences)
    return new_list

  new_list = make_new_list(paragraph_lists)


  print("Additional preprocessing")
  print('Step 9 success')


  # 10.) Remove consecutive whitespaces
  def remove_consecutive_whitespaces(text):
    return re.sub(r"\s+", " ", text)
  for reviews in new_list:
    for i in range(len(reviews)):
      reviews[i] = remove_consecutive_whitespaces(reviews[i])
  print("removing consecutive whitespaces")
  print('Step 10 success')


  #  making the para_df and indiv_sentence_df
  new_combined_list = new_list
  combined_new_list = [' '.join(paragraph) for paragraph in new_list]
  para_df = pd.DataFrame(combined_new_list)
  para_df['Average_Sentiment'] = None
  sentences_df =pd.DataFrame({'Value': new_list[0]})
  sentences_df['Sentiment']= None

  nlp = stanza.Pipeline(lang="en")
  sentiment_stanza = []
  for paras in new_list:
    curr_sentiment = []
    for sentence in paras:
      if (len(sentence)==0):
        curr_sentiment.append('NA')
        continue
      doc =nlp(sentence)
      for sent in doc.sentences:
        sentiment = sent.sentiment
        if(sentiment ==2):
          sentiment = 'pos'
        elif (sentiment == 1):
          sentiment = 'neu'
        else:
          sentiment ='neg'

        curr_sentiment.append(sentiment)
    sentiment_stanza.append(curr_sentiment)
    sentiment_stanza =sentiment_stanza[0]
  overall_sentiment_stanza=[]

  from collections import Counter

  overall_sentiment_stanza.append((Counter(sentiment_stanza)).most_common(1)[0][0])

  return overall_sentiment_stanza[0]

@app.post('/')
def index(data: Review):
    review = data.review
    sentiment = preprocess_data(review)
    print(sentiment)
    return {'sentiment':sentiment}

if __name__ =='__main__':
    uvicorn.run(app, host='localhost', port=5000)
    


