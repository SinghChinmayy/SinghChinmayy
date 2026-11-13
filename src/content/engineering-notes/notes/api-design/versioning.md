---
title: API versioning
subject: api-design
summary: Why APIs get versions, the main ways to carry a version (URI, header, body), and how to change an API without breaking clients.
tags: [api-design, rest, versioning, backward-compatibility]
status: learning
created: 2026-11-13
updated: 2026-11-13
aliases: [rest api versioning, breaking changes]
---

**In one line:** Version an API only when a breaking change can't be avoided; until then, add things without removing or renaming anything, and old clients keep working.

## Explanation

### What versioning is for

An API is a contract. Clients you don't control (mobile apps, partner systems) are built against it and upgrade on their own schedule. **Versioning** gives each version of the contract an identifier, so a client can keep calling the one it was built for while new clients use the new one.

For example, `v1` of `GET /users` returns name and email; `v2` also returns phone number and role, in a shape `v1` clients don't expect.

### Breaking vs non-breaking changes

A **breaking change** makes an existing, correct client fail or misbehave:

- removing or renaming a resource, method, parameter, header or field;
- changing a field's meaning, type or format (a date string becomes a timestamp);
- changing behaviour or business logic clients rely on;
- tightening security or authentication requirements;
- adding a new *required* request parameter.

A **non-breaking change** is additive: a new endpoint, a new optional parameter, a new response field. Well-behaved clients ignore fields they don't know.

Versioning has a cost: every live version must be maintained, tested, secured and documented; clients get confused about which to use; and clients must know the exact identifier to find anything. So the first rule is **design so you rarely need a new version**: consistent resource names, standard HTTP methods and media types, optional features as query parameters or headers, and meaningful status codes and errors.

## Where the version goes

| Strategy | Example | For | Against |
|---|---|---|---|
| URI path | `GET https://example.com/v1/users` | Visible, simple to route, easy to test in a browser and to cache | Clutters URIs; the same resource gets several URIs, against the idea that a URI names one resource |
| Query parameter | `GET https://example.com/users?v=1` | Simple; easy to default when missing | Mixes versioning with filtering parameters; easy to forget |
| Custom header | `X-API-Version: 1` | Keeps URIs clean and stable | Hidden; caches must vary on the header; harder to try by hand |
| Media type (content negotiation) | `Accept: application/json;version=1` | Uses HTTP as designed; can version each representation | Most complex for clients and docs; caches must vary on `Accept` |
| Body | `{ "version": 1, "users": [...] }` | Fine-grained, explicit | Server must parse the body before routing; changes the payload |

No strategy is the best one. URI versioning is the most common in public APIs because it's visible; header and media-type versioning keep URIs clean. Pick one and use it for the whole API.

## How to change an API safely

1. **Prefer additive changes.** Add resources, parameters, headers or fields; don't remove or rename existing ones.
2. **Default the new.** New optional inputs get defaults so old requests still mean the same thing.
3. **Alias renames.** If a name must change, accept both names for a while and mark the old one deprecated.
4. **Bump the version only for a breaking change**, and bump the major number: under semantic versioning (`MAJOR.MINOR.PATCH`), major is breaking, minor is additive, patch is a fix.
5. **Publish a support policy:** how often versions ship, how long old ones live, how clients are told. Tell clients about a deprecation ahead of time, before removing the old version.
6. **Document every version** with a changelog and examples, and **test every live version**, including that the old ones still behave as before.
7. **Secure every live version.** An old version that nobody patches is an open door.

## Example

The `users` resource gains `phone` and `role`.

- **Additive:** add both fields to the existing response. `v1` clients ignore the new fields. No new version.
- **Breaking:** split `name` into `firstName` and `lastName`. `v1` clients read `name` and get nothing, so this ships as `/v2/users` while `/v1/users` keeps returning `name` until its retirement date.

## Common mistakes

- Creating a new version for an additive change.
- Changing a field's type or meaning in place, without a version.
- Mixing strategies (some endpoints versioned in the path, others in a header).
- Versioning without a deprecation policy, so old versions live forever and nobody patches them.
- Forgetting caches: with header or media-type versioning, the response must send `Vary` on that header, or a cache can serve a `v1` body to a `v2` client.

## Resources I used

- Article: [4 API Versioning Best Practices in 2023](https://kodekloud.com/blog/api-versioning-best-practices/) by Barry Ugochukwu (KodeKloud), the whole article: when to version, URI, header and body strategies, and the backward-compatibility, documentation, policy and security practices.
- Video: [Versioning Your API](https://www.youtube.com/watch?v=Np_Jr6AvCOc) by Udacity, the whole video.

## Revision

### Key takeaways

- Version only for breaking changes; additive changes keep the same version.
- Breaking means removing, renaming, or changing the meaning or type of anything clients use, or adding a required input.
- The version can live in the URI, a query parameter, a header, the media type or the body; choose one and use it everywhere.
- Every live version costs maintenance, testing and security: publish a deprecation policy.

### Check yourself

<details>
<summary>Is adding a new field to a JSON response a breaking change?</summary>

Usually not. Clients should ignore fields they don't know, so an added response field is additive. Adding a new *required* request field is breaking.

</details>

<details>
<summary>Give one advantage and one drawback of putting the version in the URI path.</summary>

Advantage: visible and simple to route, test and cache. Drawback: the same resource gets several URIs (`/v1/users/7`, `/v2/users/7`), and the URI space gets cluttered.

</details>

<details>
<summary>With header versioning, what must a cached response tell caches?</summary>

It must send `Vary: X-API-Version` (or `Vary: Accept` for media-type versioning), so a cache stores a separate copy per version and doesn't serve a v1 body to a v2 client.

</details>

<details>
<summary>You must rename <code>name</code> to <code>fullName</code>. How do you do it without breaking anyone right away?</summary>

Return both fields (alias), document `name` as deprecated with a removal date, and remove `name` only in the next major version, after clients have had time to switch.

</details>

## History

- 2026-11-13: First notes, from the KodeKloud versioning article.
