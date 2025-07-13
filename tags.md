---
layout: default
title: "Tags"
permalink: /tags/
---

# 🏷️ Tags

<div style="max-width:700px;margin:2rem auto;">
  {% for tag in site.tags %}
    <a href="/tag/{{ tag[0] | downcase | replace: ' ', '-' }}/" style="display:inline-block;margin:0.3rem 0.6rem;padding:0.4rem 1rem;background:#f0f8ff;color:#8b4513;border:1px solid #b0c4de;font-family:'Courier New',monospace;text-decoration:none;box-shadow:2px 2px 0px #000;">
      {{ tag[0] }} <span style="color:#696969;font-size:0.9em;">({{ tag[1].size }})</span>
    </a>
  {% endfor %}
</div> 