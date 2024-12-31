---
layout: post
title: a guide to jekyll al-folio
date: 2024-12-31 11:59:00-0400
description: An example of a blog post with Disqus comments in Jekyll using the al-folio theme
tags: comments
categories: guides tutorials
disqus_comments: true
related_posts: true
---

In this guide, we will walk through the steps to add DISQUS comments to your Jekyll site using the al-folio theme.

## Step 1: Sign Up for DISQUS
First, you need to create an account on [DISQUS](https://disqus.com/). Once you have signed up, you will need to register your website.

## Step 2: Configure DISQUS in Jekyll
After registering your website, you will receive a shortname from DISQUS. This shortname is used to identify your website in the DISQUS system.

Open your `_config.yml` file and add the following configuration:

```yaml
disqus:
  shortname: your-disqus-shortname
```

Replace `your-disqus-shortname` with the shortname provided by DISQUS.

## Step 3: Enable DISQUS Comments in Your Posts
To enable DISQUS comments for a specific post, add the following front matter to your post's markdown file:

```yaml
disqus_comments: true
```

This will enable DISQUS comments for that post.

## Step 4: Customize the Comments Section
You can customize the appearance and behavior of the comments section by modifying the DISQUS embed code in your theme's layout files. Refer to the [DISQUS documentation](https://help.disqus.com/) for more details.

By following these steps, you can easily integrate DISQUS comments into your Jekyll site using the al-folio theme.

---

