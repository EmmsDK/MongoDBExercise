# MongoDB Sharding Assignment

## Assignment Answers

### a) What is sharding in MongoDB?

Sharding is a method MongoDB uses to horizontally scale data by distributing it across multiple servers. Instead of storing all data on a single machine, MongoDB splits the data into smaller, manageable pieces called shards, which are stored across multiple machines or containers. This makes it possible to handle very large datasets and maintain high performance under heavy read/write workloads. Sharding helps reduce bottlenecks by balancing the data and load across the system.

---

### b) What are the different components required to implement sharding?

MongoDB sharding requires three core components:

1. **Shard Servers (`mongod` with `--shardsvr`)**  
   These are the actual data-bearing nodes. Each shard can be a single node or a replica set for redundancy.

2. **Config Servers (`mongod` with `--configsvr`)**  
   These store metadata about the cluster, such as the location of data chunks and shard status. A minimum of three config servers is recommended in production.

3. **Query Router (`mongos`)**  
   This is the interface between the client and the sharded cluster. It routes queries and write operations to the appropriate shard(s) based on the cluster metadata stored in the config servers.

---

### c) Explain architecture of sharding in MongoDB

In a sharded MongoDB setup:

- The client application connects to the `mongos` query router.
- The `mongos` consults the config servers to determine which shard(s) hold the data being requested.
- It then forwards the query to the relevant shard(s).
- Each shard server contains a subset of the overall dataset, and ideally the data is evenly distributed using a shard key.
- Shard servers can be deployed as replica sets to provide high availability and fault tolerance.
- The config servers act like the brain of the cluster, keeping track of all metadata, and ensuring the router knows where every piece of data is located.

This architecture ensures that:
- The system scales horizontally as data and traffic grow
- Load is balanced across shards
- Failure of a single shard does not bring down the whole system (if replicas are used)


d,e,f) Are all in the code.
