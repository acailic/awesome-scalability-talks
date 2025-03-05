## Core Definition

A distributed system is a collection of independent computers that appear as a single system to users, characterized by:

- **Concurrent operation**
- **Independent failure modes**
- **No global clock synchronization**

## Three Key Challenges

### Storage

- Scaling single-server databases leads to consistency issues with read replicas.
- Sharding breaks data model capabilities (joins, transactions).
- **Cassandra's solution:** Consistent hashing ring with tunable consistency (W + R > N).
- **CAP Theorem tradeoffs:** Choose 2 of Consistency, Availability, Partition Tolerance.

### Computation

- **MapReduce pattern** (Hadoop) vs. **Spark's RDD/Dataset abstractions**.
- Evolution from batch processing to stream processing (Kafka Streams).
- **Key insight:** "Bring computation to the data" in distributed systems.
- Modern approaches focus on developer-friendly APIs over raw distribution.

### Messaging

- **Kafka's architecture:** Topics with partitions across brokers.
- Ordered messages within partitions, no global ordering.
- Producer hashing determines partition assignment.
- Enables event-driven architectures and microservices communication.
- Avoid Lambda Architecture duplication with stream processing.

## Key Takeaways

- Distributed systems require sacrificing some single-system guarantees.
- Consistency models become probabilistic rather than absolute.
- Modern tools (Cassandra, Spark, Kafka) provide better abstractions but still require tradeoffs.
- Stream processing enables real-time architectures but changes system design paradigms.
- "If you can avoid building a distributed system, do - but if you must, understand the fundamental tradeoffs."

The talk emphasizes that distributed systems solve scale problems but introduce complexity that requires careful consideration of consistency, failure modes, and data locality.
