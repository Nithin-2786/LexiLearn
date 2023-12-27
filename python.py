import re
import json
import random
from collections import OrderedDict

def parse_questions(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    questions = []
    current_question = None

    for line in lines:
        line = line.strip()
        if line:
            if line.startswith("Answer:"):
                # Process the answer
                answer = line.split(":")[1].strip()
                if current_question:
                    current_question["answer"] = answer
                    questions.append(current_question)
                current_question = None
            elif re.match(r'^\d+\.', line):
                # Start of a new question
                if current_question:
                    questions.append(current_question)
                _, text = re.split(r'\s+', line, 1)
                current_question = OrderedDict({"language": None, "level": None, "question": text.strip(), "options": []})
            elif re.match(r'^[A-C]\.', line):
                # Options for the current question
                _, text = re.split(r'\.\s+', line, 1)
                current_question["options"].append(text.strip())

    # Add the last question if any
    if current_question:
        questions.append(current_question)

    return questions

def convert_to_json(input_file, output_file, language, level):
    questions = parse_questions(input_file)
    levels=["Beginner","Intermediate"]
    for question in questions:
        question["language"] = language
        question["level"] = random.choice(levels)

    with open(output_file, 'w', encoding='utf-8') as json_file:
        json.dump(questions, json_file, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    input_file_path = "data.txt"
    output_file_path = "output_file.json"
    language = "English"
    level = "Beginner"
    convert_to_json(input_file_path, output_file_path, language, level)
