---
title: Histogram of Tweets
subject: sql
kind: practice
summary: Count tweets per user in 2022, then count users per tweet count.
tags: [sql, cte, group-by, date-range]
difficulty: easy
created: 2026-10-04
updated: 2026-10-27
related: [filtering-groups-with-having]
---

## Question

Given a `tweets` table, write a query that produces a histogram of tweets posted per user in 2022.

First, count each user's tweets in 2022. Then group users by that per-user count. Return:

- `tweet_bucket`: the number of tweets posted by a user in 2022.
- `users_num`: the number of users in that bucket.

### `tweets` table

| Column | Type |
| --- | --- |
| `tweet_id` | integer |
| `user_id` | integer |
| `msg` | string |
| `tweet_date` | timestamp |

### Example input

| tweet_id | user_id | msg | tweet_date |
| --- | --- | --- | --- |
| 214252 | 111 | Am considering taking Tesla private at $420. Funding secured. | 2021-12-30 00:00:00 |
| 739252 | 111 | Despite the constant negative press covfefe | 2022-01-01 00:00:00 |
| 846402 | 111 | Following @NickSinghTech on Twitter changed my life! | 2022-02-14 00:00:00 |
| 241425 | 254 | If the salary is so competitive why won't you tell me what it is? | 2022-03-01 00:00:00 |
| 231574 | 148 | I no longer have a manager. I can't be managed | 2022-03-23 00:00:00 |

### Expected output

| tweet_bucket | users_num |
| --- | --- |
| 1 | 2 |
| 2 | 1 |

User `111` posted two tweets in 2022, while users `254` and `148` each posted one. Therefore, two users belong to bucket `1`, and one user belongs to bucket `2`.

## Solution

```sql
WITH user_tweet_counts AS (
  SELECT
    user_id,
    COUNT(*) AS tweet_count
  FROM tweets
  WHERE tweet_date >= '2022-01-01'
    AND tweet_date < '2023-01-01'
  GROUP BY user_id
)
SELECT
  tweet_count AS tweet_bucket,
  COUNT(*) AS users_num
FROM user_tweet_counts
GROUP BY tweet_count
ORDER BY tweet_bucket;
```

## What this demonstrates

- A common table expression (CTE) separates the two aggregation steps: tweets per user, then users per tweet-count bucket.
- The half-open date range includes every timestamp in 2022 without relying on a time component at the end of the year.
- The outer `COUNT(*)` counts user rows, not tweets, because the CTE contains one row per user.

## Related note

- [Filtering grouped results with HAVING](../../notes/sql/filtering-groups-with-having.md)
