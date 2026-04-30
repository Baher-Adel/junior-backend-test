# Challenge 2: Database query optimization

Reference implementations: [`query.sql`](query.sql) (PostgreSQL), [`query.js`](query.js) (MongoDB).

---

## Optimization question (assessment)

**How would you optimize the queries for high traffic scenarios (e.g., indexing, caching)?**

Optimizing database queries for high-traffic scenarios is all about reducing the amount of work the database has to do for each request. When traffic scales, unoptimized queries don't just slow down; they consume CPU and memory until the entire system cascades into failure. 

To handle high throughput, you generally attack the problem on three fronts: **Indexing**, **Caching**, and **Query Tuning**.

---

## 1. Indexing: Structuring Data for Fast Retrieval

An index is like the table of contents in a book it prevents the database from having to read every single row (a "Full Table Scan") to find what it's looking for. 

* **Target the `WHERE`, `JOIN`, and `ORDER BY` clauses:** Indexes should be applied to the columns most frequently used to filter, connect, or sort data.
* **Use Composite Indexes:** If you frequently query by multiple columns (e.g., `last_name` and `first_name`), a combined index on both is significantly faster than two separate indexes. Order matters here put the most selective column (the one that narrows down the results the most) first.
* **Leverage Covering Indexes:** If an index contains all the columns requested in your `SELECT` statement, the database can return the result directly from the index without ever reading the actual data table.
* **Beware the Write Penalty:** Indexes speed up reads but slow down `INSERT`, `UPDATE`, and `DELETE` operations, because the index must be updated every time the data changes. Avoid the temptation to index every column.

## 2. Caching: Avoiding the Database Entirely

The fastest database query is the one you never make. Caching stores the results of frequent, expensive queries in high-speed, in-memory datastores (like Redis or Memcached).

* **The Cache-Aside Pattern:** This is the most common approach. The application first checks the cache. If the data is there (Cache Hit), it returns it immediately. If not (Cache Miss), it queries the database, stores the result in the cache, and then returns the data.
* **Set Time-to-Live (TTL):** Data naturally becomes stale. Setting a TTL ensures that cached items expire after a certain period, forcing the application to fetch fresh data from the database.
* **Cache Invalidation:** This is notoriously difficult. When data in your database is updated, you must explicitly delete or update the corresponding data in the cache to prevent users from seeing outdated information.
* **Query Result Caching vs. Object Caching:** You can cache the exact JSON response of an API endpoint, or you can cache the individual user objects. Object caching is generally more reusable across different parts of your application.

## 3. Query Level Optimizations

Even with perfect indexes and caching, poorly written queries will bottleneck your system.

* **Select Only What You Need:** Never use `SELECT *`. Fetching unneeded columns wastes memory, increases network latency, and prevents the use of covering indexes.
* **Solve the N+1 Problem:** This happens when an application executes one query to fetch a list of items, and then executes *N* additional queries to fetch related data for each item. Use `JOIN`s or eager loading in your ORM to fetch all necessary data in a single round trip.
* **Offload Heavy Analytics:** Don't run massive aggregation queries (`GROUP BY`, `SUM`) on your primary transactional database during peak traffic. Offload these to a Read Replica or a dedicated data warehouse.