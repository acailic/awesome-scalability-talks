# Building a Distributed Build System at Google Scale

In her insightful talk, Aysylu Greenberg takes us on a journey through Google's evolution of build systems at massive scale. She walks through the fascinating challenges of supporting 30,000 engineers across 40 offices who collectively make 45,000 commits per day to a two-billion-line codebase. The story unfolds with the transition from a simple push-based architecture to a more resilient pull-based system called "Build Service" that gracefully handles the immense scale of Google's monolithic repository.

Greenberg illustrates how Google's distributed build system, "Build Rabbit," sits at the heart of their developer infrastructure, orchestrating five million daily builds that generate petabytes of build artifacts. She shares the careful migration strategy that allowed the team to transition between architectures with zero downtime - an impressive feat given the system's critical position in Google's development workflow. The tale is not just about technical architecture but about thoughtful system design that balances centralized versus distributed control planes, making it possible to evolve complex systems while continuously serving users.

## Key Points
1. **Google Scale Challenges**: Operating at Google scale means supporting 30,000 engineers making 15,000 commits daily (plus 30,000 automated commits), working on a 2-billion-line monolithic codebase where half the code changes daily.

2. **Monolithic Repository Benefits**: Despite industry trends, Google uses a monolithic repository, which offers advantages like linear revision history, simplified dependency management, easier large-scale refactoring, and predictable repeatable builds.

3. **Build System Evolution**: As projects grow from individual efforts to team projects to company-wide infrastructure, build systems naturally evolve from local builds to dedicated build boxes to a centralized distributed build system.

4. **Architecture Transition**: Google migrated from a "push" architecture (client directly pushing work to workers) to a "pull" architecture (workers pulling work from a persistent queue) to improve system resilience and reliability.

5. **Zero-Downtime Migration**: The team successfully performed a complex migration between architectures with no downtime by migrating backends first, supporting mixed modes, targeting launch-friendly clients, decoupling service launches, and practicing extensively.

6. **Distributed vs. Centralized Control**: The new architecture centralized control logic that was previously distributed across client libraries, making the system more maintainable and easier to evolve over time.

## Practical Takeaways
- When evolving architectures, consider whether to distribute control logic or centralize it based on your development and operational constraints
- Planning large-scale migrations requires careful consideration of mixed-mode operation during transition periods
- Building observability into systems is crucial for successful large-scale changes
- Practice launches extensively when coordinating complex changes across multiple teams
- Have solid rollback plans at every step of a complex migration

The journey of Google's build system offers valuable insights for any engineering team facing growth challenges, demonstrating how thoughtful architectural evolution can support massive scale while improving system resilience and maintainability.