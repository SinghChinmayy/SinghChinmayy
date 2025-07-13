---
layout: default
title: "Chinmay Singh - Student Developer"
description: "Student developer from Bangalore specializing in AI, exploring backend development and DevOps."
---

<div class="hero-section">
  <div class="profile-image">
    <img src="/assets/images/profile.png" alt="Chinmay Singh" class="profile-photo">
  </div>
  
  <h1 class="hero-title">Hi, I'm Chinmay Singh</h1>
</div>

Student developer from Bangalore specializing in AI, exploring backend development, DevOps, and cloud infrastructure.

## About

I'm currently a student specializing in AI at university, but my real passion lies in backend development and cloud infrastructure. I love diving deep into Linux systems, containerization, and building robust backend solutions.

When I'm not coding or studying, you'll find me at the gym lifting weights or experimenting with my home lab setup.

## What I'm Learning

- **Programming**: Python, C, C++, Java, SQL
- **DevOps & Cloud**: Docker, Linux, AWS, Home Lab
- **Academic Focus**: AI/ML, Data Structures, Digital Electronics

## Projects

### Home Lab Infrastructure
My personal infrastructure playground with Docker containers, Linux servers, and cloud services for learning and experimentation.

### BookBot - Text Analysis Tool
A command-line tool to analyze book text, calculate word counts, and generate character statistics.

### ESSH - CLI Utility Tool
A custom command-line utility for SSH management and automation.

---

<br>

# Recent Blog Posts

{% assign posts = site.posts | slice: 0, 3 %}
{% for post in posts %}
### [{{ post.title }}]({{ post.url }})

*{{ post.date | date: "%B %d, %Y" }}*

{{ post.excerpt | strip_html | truncatewords: 30 }}

{% endfor %}

[View all posts →](/blog)

---

*Available for interesting projects and collaborations.*
