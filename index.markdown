---
layout: default
title: "Chinmay Singh - Student Developer"
description: "Student developer from Bangalore specializing in AI, exploring backend development and DevOps."
---

<div class="hero-section">
  <div class="profile-image">
    <img src="/assets/images/dp.webp" alt="Chinmay Singh" class="profile-photo">
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
- **Academic Focus**: AI/ML, Data Structures 

---

<br>

# What's going on recently

<div class="recent-split-section" style="display: flex; flex-wrap: wrap; gap: 2em; justify-content: space-between; align-items: flex-start; margin-bottom: 2em;">
  <div class="recent-column" style="flex: 1 1 300px; min-width: 0;">
    <h3 style="margin-top:0; font-family: 'Source Serif Pro', serif; color: #8b4513;">Recent Blog Posts</h3>
    {% assign now = site.time | date: '%s' %}
    {% assign posts = site.posts | slice: 0, 3 %}
    {% for post in posts %}
      {% assign post_time = post.date | date: '%s' %}
      {% assign post_age = now | minus: post_time | divided_by: 86400 %}
    <div style="margin-bottom: 1.2em;">
      <a href="{{ post.url }}" style="font-weight:600; color:#1565c0; text-decoration:underline; font-size:1.08em;">{{ post.title }}</a>

      <br>
      <span style="color:#888; font-size:0.98em;">{{ post.date | date: "%B %d, %Y" }}</span>
      <div style="color:#333; font-size:0.98em; margin-top:0.2em;">{{ post.excerpt | strip_html | truncatewords: 22 }}</div>
    </div>
    {% endfor %}
    <a href="/blog" style="color:#8b4513; text-decoration:underline; font-weight:500;">View all posts →</a>
  </div>
  <div class="recent-column" style="flex: 1 1 300px; min-width: 0;">
    <h3 style="margin-top:0; font-family: 'Source Serif Pro', serif; color: #1565c0;">Recent TILs</h3>
    {% assign tils = site.til | sort: 'date' | reverse | slice: 0, 3 %}
    {% for til in tils %}
      {% assign til_time = til.date | date: '%s' %}
      {% assign til_age = now | minus: til_time | divided_by: 86400 %}
    <div style="margin-bottom: 1.2em;">
      <a href="{{ til.url }}" style="font-weight:600; color:#8b4513; text-decoration:underline; font-size:1.08em;">{{ til.title }}</a>

      <br>
      <span style="color:#888; font-size:0.98em;">{{ til.date | date: "%B %d, %Y" }}</span>
      <div style="color:#333; font-size:0.98em; margin-top:0.2em;">{{ til.excerpt | strip_html | truncatewords: 22 }}</div>
    </div>
    {% endfor %}
    <a href="/til/" style="color:#1565c0; text-decoration:underline; font-weight:500;">View all TILs →</a>
  </div>
</div>

---

<div style="text-align: center; margin: 1.5em 0 1em 0;">
  <span style="background: #ff0; color: #000; padding: 0.15em 0.5em; border-radius: 6px; font-weight: bold; box-shadow: 1px 1px 0 #ccc; display: inline-block;">👉 <a href="/projects" style="color: #000; text-decoration: underline;">Check out my projects!</a> 👈</span>
</div>

*Available for interesting projects and collaborations.*
