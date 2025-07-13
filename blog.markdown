---
layout: page
title: "Blog Posts"
description: "Thoughts and learnings by Chinmay Singh"
permalink: /blog/
---

{% for post in site.posts %}
### [{{ post.title }}]({{ post.url }})

*{{ post.date | date: "%B %d, %Y" }}*

{% if post.description %}
{{ post.description }}
{% else %}
{{ post.excerpt | strip_html | truncatewords: 30 }}
{% endif %}

{% endfor %}

---

*More posts coming soon as I continue learning and sharing.*

 