---
layout: post
title: "How scripting affects my workflow"
date: 2025-07-13 10:00:00
categories: []
tags: []
author: Chinmay Singh
description: ""
published: true
---
## Automating My Git Backups with a Simple Bash Script

Working on personal projects, I found myself constantly running the same set of Git commands every time I made a change. It got repetitive really fast:

```bash
git add .
git commit -m "<your message>"
git push origin
```

So I thought—why not automate this little chore?

I wrote a **basic Bash script** that wraps this process into a single command: `gitbackup`. Now, all I have to do is run `gitbackup` in my terminal, type in the commit message, hit **Enter**—and boom, it's pushed!

---

### Best thing about it

- It saves your time by not rewriting `git add .` and `git push origin` every single time.
- Your workflow will get cleaner and one automation at a time. 
- I was even getting annoyed with writing Y for confirmation of message so I made Y (which is default)
- And Every commit is timestamped in the message which is easier for me to view.
  You can remove it if you like.
---
# The Script

Here's the full script:

```bash
#!/bin/bash

# Simple script to do git backups without repeating commands
# Save this script as ~/bin/gitbackup and make it executable with chmod +x ~/bin/gitbackup

echo -e "\n\033[1mCommitting git backup\033[0m\n"

cd "${PWD}"
git add .

read -p "Enter your commit message: " commit_message

echo
echo "Your commit message is: $commit_message"

read -p "Should we proceed (Y/n): " yn
case "$yn" in 
    "" | [Yy]*)
        echo "Committing..."
        git commit -m "$commit_message | backup -> $(date)"
        git push origin
        ;;
    [Nn]*)
        echo "Aborted."
        exit 1
        ;;
    *)
        echo "Invalid response. Please enter Y or n."
        exit 1
        ;;
esac
```

---

### How to Use It

1. Save the script as `gitbackup` in your `~/bin` directory.
    
2. Make it executable:
    
    ```bash
    chmod +x ~/bin/gitbackup
    ```
    
3. Make sure `~/bin` is in your `PATH`. You can add this to your `.bashrc` or `.zshrc`:
    
    ```bash
    export PATH="$HOME/bin:$PATH"
    ```
    
4. From any Git-tracked project directory, just run:
    
    ```bash
    gitbackup
    ```
    

---

### Final Thoughts

The script is by no means very fancy or anything but it is perfect for me and works for me so I thought of sharing, and I got to learn a bit of scripting too.

---
# Few Screenshots

- Here as you can see when I type git, it gives me option to autofill with gitbackup

![](/assets/attachments/Screenshot%20from%202025-07-14%2016-47-22.png)

- After running the script it will show you what commit message you want to write

![](/assets/attachments/Pasted%20image%2020250714165004.png)

- Then you get a confirmation dialogue, where the default option (when hit enter) is yes to make lives even easier.

![](/assets/attachments/Pasted%20image%2020250714165040.png)