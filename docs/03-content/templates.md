# Content Templates

Copy-paste templates for quickly creating new content.

## Project Template

`src/content/projects/your-project-name.mdx`

```yaml
---
title: "Project Title"
role: "Your Role"
year: 2024
outcomeSummary: "One sentence describing the key outcome"
overview: "2-3 sentences explaining what this project was about"
problem: "What problem were you solving? What was broken or missing?"
constraints:
  - "First constraint (time, budget, team size, etc.)"
  - "Second constraint"
approach: "How did you approach solving this problem?"
keyDecisions:
  - decision: "A key technical or architectural decision"
    reasoning: "Why you made this decision"
    alternatives:
      - "Alternative option you considered"
techStack:
  - "Technology 1"
  - "Technology 2"
impact:
  metrics:
    - label: "Metric Name"
      value: "Metric Value (e.g., 50% improvement)"
  qualitative: "Broader impact beyond the numbers"
learnings:
  - "Key lesson learned from this project"
featured: false
order: 10
---

Optional additional content goes here.
```

## Decision Template

`src/content/decisions/your-decision-name.mdx`

```yaml
---
title: "Decision Title"
date: 2024-01-15
context: "What situation or problem required this decision?"
decision: "What did you decide to do?"
alternatives:
  - option: "First alternative considered"
    pros:
      - "Advantage of this option"
    cons:
      - "Disadvantage of this option"
  - option: "Second alternative considered"
    pros:
      - "Advantage of this option"
    cons:
      - "Disadvantage of this option"
reasoning: "Why did you choose this option over the alternatives?"
tags:
  - "architecture"
---

Optional additional context.
```

## Writing (Blog) Template

`src/content/writing/your-article-name.mdx`

```yaml
---
title: "Article Title"
description: "Brief description for SEO (150-160 characters)"
publishDate: 2024-01-15
tags:
  - "topic1"
  - "topic2"
draft: false
---

Your article content in Markdown.

## First Section

Content here...
```

## Testimonial Template

`src/content/testimonials/person-name.mdx`

```yaml
---
name: "Person's Full Name"
role: "Their Job Title"
company: "Their Company"
relationship: "How you worked together (e.g., 'Direct manager at Company X')"
quote: "Their testimonial text. Keep it concise and specific."
date: 2024-01-15
linkedin: "https://linkedin.com/in/their-username"
featured: false
---
```

## Uses Template

`src/content/uses/my-setup.mdx`

```yaml
---
category: "tools"
items:
  - name: "Tool Name"
    description: "What you use it for"
    url: "https://tool-website.com"
  - name: "Another Tool"
    description: "What you use it for"
order: 1
---

Optional additional notes.
```

**Category options:** `tools`, `stack`, `environment`

---

## Quick Reference

| Content Type | Location | Key Required Fields |
|--------------|----------|---------------------|
| Project | `projects/` | title, role, year, outcomeSummary, problem, keyDecisions, impact |
| Decision | `decisions/` | title, date, context, decision, alternatives, reasoning |
| Writing | `writing/` | title, description, publishDate |
| Testimonial | `testimonials/` | name, role, company, quote, date |
| Uses | `uses/` | category, items, order |
