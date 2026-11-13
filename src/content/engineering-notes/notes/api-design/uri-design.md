---
title: URI design and resource naming
subject: api-design
summary: How to name and structure REST URIs so they identify resources clearly, consistently and safely.
tags: [api-design, rest, uri, resource-naming, resource-modeling]
status: learning
created: 2026-11-13
updated: 2026-11-13
aliases: [url design, rest endpoint naming, resource modelling]
---

**In one line:** A URI names a *thing* (a resource), never an action; keep it lowercase, hierarchical with `/`, hyphenated, free of file extensions, and above all consistent.

## Explanation

### What a URI identifies

In REST, the core unit is the **resource**: anything worth naming, such as a customer, an order or a device. A **URI** (Uniform Resource Identifier) is the resource's name. The client acts on the resource with an HTTP method (`GET`, `POST`, `PUT`, `DELETE`); the URI only says *which* resource.

Strictly, URIs are **opaque**: a client should not need to parse them. Conventions still matter, because conventional URIs:

- are easier to debug, read in logs and manage;
- let the server extract IDs and parameters with one central piece of routing code;
- save the time of inventing new rules for every service;
- can be split across domains, subdomains and paths, which helps load distribution, routing, monitoring and security.

Don't spend long on URI design. **Consistency matters more than any single rule.**

### Model resources before naming them

Decide *what the resources are* before writing endpoints. Each resource falls into one **archetype**, and its name follows from that:

| Archetype | What it is | Name | Example |
|---|---|---|---|
| Document | One item, like a database row. Has fields and links to related resources. | singular noun or ID | `/user-management/users/{id}`, `/user-management/users/admin` |
| Collection | A server-managed directory of items. The server decides whether a new item is created and what URI it gets. | plural noun | `/user-management/users` |
| Store | A client-managed repository. The client chooses the URI when it puts an item in, and decides when to delete it. | plural noun | `/song-management/users/{id}/playlists` |

Pick one archetype per resource; don't mix them.

Collections can nest **sub-collections**:

```text
/customers                                  collection
/customers/{customerId}                     one customer
/customers/{customerId}/accounts            that customer's accounts
/customers/{customerId}/accounts/{accountId} one of those accounts
```

## The rules

### 1. Use nouns, not verbs

The HTTP method is the verb. Putting the verb in the path turns the API into RPC (remote procedure calls) dressed up as REST.

```text
GET    /device-management/managed-devices        list devices
POST   /device-management/managed-devices        create a device
GET    /device-management/managed-devices/{id}   read one device
PUT    /device-management/managed-devices/{id}   replace one device
DELETE /device-management/managed-devices/{id}   delete one device
```

Not `/getDevices`, `/createDevice` or `/deleteDevice/{id}`.

When an operation really is an action, model its *result* as a resource. Instead of `POST .../scripts/{id}/execute`, `POST` to `.../scripts/{id}/status` with the action in the body, or create an item in an "executions" collection. Some APIs (Google Cloud, for example) use custom methods with a colon, like `/scripts/{id}:execute`; it is a known convention, though many see it as breaking REST style.

### 2. `/` shows hierarchy

The forward slash is the only character RFC 3986 treats as showing hierarchy, and people read it that way:

```text
http://www.example.org/customer/orders/order1
http://www.example.org/earth/north-america/canada/manitoba
```

**No trailing slash.** `/managed-devices/` adds no meaning, and frameworks disagree on whether to add or strip it during normalization, so `/managed-devices` and `/managed-devices/` may end up treated as different resources.

### 3. Hyphens for readability, lowercase only

- Separate words in a long segment: `/device-management/managed-devices`, not `/devicemanagement/manageddevices` or `/managedDevices`.
- Hyphen or underscore both work technically. Prefer hyphens: underscores can disappear under link underlines in some fonts. Whatever you pick, use it everywhere.
- **Lowercase only.** RFC 3986 makes the scheme and host case-insensitive but the path case-sensitive:

```text
http://api.example.org/my-folder/my-doc    (1)
HTTP://API.EXAMPLE.ORG/my-folder/my-doc    (2) same as 1
http://api.example.org/My-Folder/my-doc    (3) a different URI
```

Some servers (Windows ones serving from a filesystem) treat 1 and 3 as the same and others don't, so mixed case causes bugs.

### 4. No file extensions

`/report-summary.jsp`, `/report-summary.aspx` and `/report-summary.xml` leak the implementation technology, and the URI must change when the technology changes. The format is the job of HTTP headers (the client asks with `Accept`; the server answers with `Content-Type`), not the URI. Guessing format from an extension ("sniffing") has also caused security holes in browsers. Avoid extra periods in paths too: `this.is.my.post.html` confuses libraries that treat the first `.` as the start of an extension.

### 5. Query string for filtering, sorting, paging

Don't create a new endpoint for each view of a collection. Keep one collection URI and add query parameters, separated by `&`:

```text
/device-management/managed-devices
/device-management/managed-devices?region=USA
/device-management/managed-devices?region=USA&brand=XYZ
/device-management/managed-devices?region=USA&brand=XYZ&sort=installation-date
```

### 6. Comma and semicolon for non-hierarchical parts

When path parts are not parent and child, `,` and `;` can join them. Semicolon-separated parts are called **matrix parameters**:

```text
http://www.example.org/co-ordinates;w=39.001409,z=-84.578201
```

Many libraries don't parse these out of the box, so expect custom code.

### 7. Domains and subdomains to partition

Subdomains split resources for operational reasons, with logical names:

```text
http://en.example.org/book/1234     localization
http://fr.example.org/book/1234
http://www.example.org/book/1234    browsers (HTML)
http://api.example.org/book/1234    programmatic clients
```

Each subdomain can get its own hardware, routing, monitoring or security policy.

## Example: spaces are encoded two ways

RFC 3986 encodes a space as `%20`, but HTML forms (`application/x-www-form-urlencoded`) encode it as `+`. Code that decodes with the wrong rule reads the wrong value. In Python:

```python
from urllib.parse import quote, urlencode, unquote, unquote_plus

print(urlencode({'phrase': 'Hadron Supercollider'}))  # form encoding
print(quote('Hadron Supercollider'))                  # RFC 3986 encoding
print(unquote('Hadron+Supercollider'))                # RFC 3986 decoding of a form value
print(unquote_plus('Hadron+Supercollider'))           # form decoding
```

Output:

```text
phrase=Hadron+Supercollider
Hadron%20Supercollider
Hadron+Supercollider
Hadron Supercollider
```

The third line is the bug: a server that decodes a form-made URI with RFC 3986 rules keeps the `+`. That is one reason to keep spaces out of path segments: use hyphens instead.

## Common mistakes

- Verbs in paths (`/getUser`, `/users/{id}/delete`). The method already says what happens.
- Mixing singular and plural for the same collection (`/user/{id}` and `/users`).
- A new endpoint per filter (`/devices/usa`, `/devices/usa/xyz`) instead of query parameters.
- Mixed case or camelCase segments, which fail on case-sensitive servers.
- Extensions such as `.json` or `.php` that tie the URI to a format or technology.
- Hiding long-lived meaning in the URI's shape and then expecting clients to build URIs by hand. URIs are still opaque identifiers: give clients links.

## Resources I used

- Book: [RESTful Web Services Cookbook](https://openlibrary.org/isbn/9780596801687) by Subbu Allamaraju (O'Reilly, 2010), Recipe 4.1 "How to Design URIs" (pp. 75–79): the conventions above for domains, separators, extensions, spaces and case.
- Article: [REST API URI Naming Conventions and Best Practices](https://restfulapi.net/resource-naming/) by Lokesh Gupta (restfulapi.net), the whole page: archetypes, nouns over verbs, hyphens, lowercase, query parameters.
- Article: [Resource modelling: think before you start coding](https://medium.com/abn-amro-developer/resource-modelling-think-before-you-start-coding-a421357e9756) (ABN AMRO Developer blog on Medium), the whole article: on modelling resources before writing endpoints.
- Video: [Modeling RESTful API Resources](https://www.youtube.com/watch?v=E7WSBLHEvbI) by Scott Wiersdorf, the whole video: on modelling REST resources.

## Revision

### Key takeaways

- A URI names a resource; the HTTP method is the action.
- Collections are plural nouns; one item is `/collection/{id}`; nest with `/` only for real parent-child relations.
- Lowercase, hyphens, no trailing slash, no file extensions.
- Filter, sort and page with query parameters on one collection URI.
- Consistency across the API beats any individual naming rule.

### Check yourself

<details>
<summary>Why is <code>POST /createOrder</code> poor REST design, and what replaces it?</summary>

The verb duplicates the HTTP method and makes the URI name an action, not a resource. Use `POST /orders`: the collection is the resource, and `POST` means "create an item in it".

</details>

<details>
<summary>Are <code>http://api.example.org/Users</code> and <code>http://api.example.org/users</code> the same URI?</summary>

No. RFC 3986 makes only the scheme and host case-insensitive; the path is case-sensitive. Some servers treat them as the same anyway, which is why lowercase-only avoids bugs.

</details>

<details>
<summary>How should a client get only USA devices sorted by installation date?</summary>

`GET /device-management/managed-devices?region=USA&sort=installation-date`. One collection URI, with query parameters for the filter and sort; no new endpoint.

</details>

<details>
<summary>What's the difference between a collection and a store?</summary>

In a collection the server decides whether to create an item and assigns its URI (usually `POST` to the collection). In a store the client picks the URI and puts the item there (usually `PUT /store/{name}`), and the client decides when to delete it.

</details>

<details>
<summary>Why avoid <code>/report.jsp</code> or <code>/report.json</code>?</summary>

The extension ties the URI to a technology or format, so it has to change when either changes. Formats are negotiated with `Accept` and `Content-Type` headers.

</details>

## History

- 2026-11-13: First notes, from Recipe 4.1 of the RESTful Web Services Cookbook and the restfulapi.net naming guide.
