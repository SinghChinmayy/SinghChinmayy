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
  AI • Backend • DevOps • Gym • Home Lab
</div>

## About

I'm currently a student specializing in AI at university, but my real passion lies in backend development and cloud infrastructure. I love diving deep into Linux systems, containerization, and building robust backend solutions.

When I'm not coding or studying, you'll find me at the gym lifting weights or experimenting with my home lab setup.

## What I'm Learning

- **Programming**: Python, C, C++, Java, SQL
- **DevOps & Cloud**: Docker, Linux, AWS, Home Lab
- **Academic Focus**: AI/ML, Data Structures, Digital Electronics

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

<div style="text-align: center; margin: 1.5em 0 1em 0;">
  <span style="background: #ff0; color: #000; padding: 0.15em 0.5em; border-radius: 6px; font-weight: bold; box-shadow: 1px 1px 0 #ccc; display: inline-block;">👉 <a href="/projects" style="color: #000; text-decoration: underline;">Check out my projects!</a> 👈</span>
</div>

*Available for interesting projects and collaborations.*
