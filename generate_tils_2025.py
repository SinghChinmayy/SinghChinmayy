import os
from datetime import date, timedelta

TIL_ROOT = "_til"
YEAR = 2025

boilerplate = """---
layout: til
title: ""
date: {date}
summary: ""
tags: []
published: false
---

<!-- Write your TIL note here -->

"""

def main():
    start = date(YEAR, 1, 1)
    end = date(YEAR, 12, 31)
    delta = timedelta(days=1)
    current = start

    while current <= end:
        y = current.strftime("%Y")
        m = current.strftime("%m")
        d = current.strftime("%d")
        folder = os.path.join(TIL_ROOT, y, m, d)
        os.makedirs(folder, exist_ok=True)
        filename = f"{y}-{m}-{d}-til.md"
        filepath = os.path.join(folder, filename)
        with open(filepath, "w") as f:
            f.write(boilerplate.format(date=current.isoformat()))
        current += delta

if __name__ == "__main__":
    main() 