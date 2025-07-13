---
layout: post
title: "BookBot: A Simple Python Tool for Book Text Analysis"
date: 2024-07-14 10:00:00
categories: [projects, python, cli]
tags: [python, cli, text-analysis, open-source]
author: Chinmay Singh
description: "Introducing BookBot, a command-line tool to analyze book text, count words and characters, and generate simple reports. Built for learning and fun!"
---

## BookBot: Analyze Your Books with Python

Ever wondered how many words are in your favorite book? Or which character appears most often? As part of my journey into Python and CLI tools, I built **BookBot**—a simple command-line tool that analyzes the text of any book and gives you quick stats.

---

### Why I Built BookBot

As a student developer, I’m always looking for small, practical projects to sharpen my skills. I love reading, and I wanted a tool that could quickly break down the text of any book—word counts, character stats, and more. BookBot was born out of this curiosity and my desire to get better at Python scripting and working with files.

---

### What BookBot Does

- **Counts total words** in a book
- **Counts each character’s frequency**
- **Generates a simple report** in your terminal

It’s lightweight, fast, and perfect for anyone who wants to peek under the hood of their favorite stories.

---

### How It Works

BookBot is written in Python and runs right from your terminal. Here’s how you use it:

```bash
python main.py /path/to/your/book.txt
```

For example:
```bash
python main.py ./books/frankenstein.txt
```

You’ll get a report like:
```
Total words: 78,432
Character counts:
a: 4,321
b: 1,234
...
```

---

### Key Features

- **Simple CLI interface**: Just run and get results
- **Fast text processing**: Handles large files easily
- **Clear output**: Easy-to-read stats for quick insights

---

### The Code

BookBot is split into two main files:
- `main.py`: Handles file input and output
- `stats.py`: Contains the logic for counting words and characters

Here’s a quick peek at the core logic:

```python
def count_words(text):
    return len(text.split())

def count_characters(text):
    stats = {}
    for char in text:
        if char.isalpha():
            stats[char.lower()] = stats.get(char.lower(), 0) + 1
    return stats
```

---

### What I Learned

- **File handling in Python**
- **Building CLI tools**
- **Basic text processing and statistics**
- **How to structure a small project for open source**

---

### Try It Yourself!

BookBot is open source and available on GitHub:  
[https://github.com/SinghChinmayy/bookbot](https://github.com/SinghChinmayy/bookbot)

Feel free to fork it, suggest improvements, or use it for your own book analysis!

---

### Final Thoughts

BookBot is a small project, but it taught me a lot about Python, the command line, and open source workflows. If you’re learning to code, I highly recommend building little tools like this—they’re fun, practical, and a great way to learn by doing.

---

*Thanks for reading! If you have questions or want to collaborate, connect with me on [GitHub](https://github.com/SinghChinmayy) or [LinkedIn](https://linkedin.com/in/singhchinmay).* 