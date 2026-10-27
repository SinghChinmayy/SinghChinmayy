---
title: Data Science Skills
subject: sql
kind: practice
summary: "Find candidates who have every required skill: Python, Tableau and PostgreSQL."
tags: [sql, having, count-distinct]
difficulty: easy
created: 2026-10-04
updated: 2026-10-27
related: [filtering-groups-with-having]
---

## Question

Given a table of candidates and their skills, list the candidates qualified for an open Data Science role. A qualified candidate has all of these skills: Python, Tableau, and PostgreSQL. Sort the result by `candidate_id` in ascending order.

Assume there are no duplicate rows in the `candidates` table.

### `candidates` table

| Column | Type |
| --- | --- |
| `candidate_id` | `integer` |
| `skill` | `varchar` |

### Example input

| candidate_id | skill |
| --- | --- |
| 123 | Python |
| 123 | Tableau |
| 123 | PostgreSQL |
| 234 | R |
| 234 | PowerBI |
| 234 | SQL Server |
| 345 | Python |
| 345 | Tableau |

### Expected output

| candidate_id |
| --- |
| 123 |

## Solution

```sql
SELECT candidate_id
FROM candidates
WHERE skill IN ('Python', 'Tableau', 'PostgreSQL')
GROUP BY candidate_id
HAVING COUNT(DISTINCT skill) = 3
ORDER BY candidate_id ASC;
```

## What this demonstrates

- `WHERE` filters eligible skill rows before `GROUP BY`.
- `COUNT(DISTINCT skill)` counts how many required skills each candidate has.
- `HAVING` keeps only candidates whose distinct required-skill count is three.

## Related note

- [Filtering grouped results with HAVING](../../notes/sql/filtering-groups-with-having.md)
