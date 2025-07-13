---
layout: default
title: "Categories"
permalink: /categories/
---

# 📂 Categories

<div style="max-width:700px;margin:2rem auto;">
  {% for category in site.categories %}
    <a href="/category/{{ category[0] | downcase | replace: ' ', '-' }}/" style="display:inline-block;margin:0.3rem 0.6rem;padding:0.4rem 1rem;background:#f5f5dc;color:#8b4513;border:1px solid #d4d4d4;font-family:'Courier New',monospace;text-decoration:none;box-shadow:2px 2px 0px #000;">
      {{ category[0] }} <span style="color:#696969;font-size:0.9em;">({{ category[1].size }})</span>
    </a>
  {% endfor %}
</div> 