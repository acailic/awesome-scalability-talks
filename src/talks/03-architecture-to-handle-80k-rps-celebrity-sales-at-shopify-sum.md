# Architecture to Handle 80K RPS Celebrity Sales at Shopify

## Summary
Shopify's infrastructure evolved to handle massive flash sales (80k requests/sec) through a pod-based architecture with global traffic management, OpenResty edge processing, and automated failover strategies.

## Key Points

### Traffic Layer Architecture
1. **Global Routing**: Uses BGP Anycast for IP propagation and OpenResty (NGINX + Lua) for edge logic
2. **Bot Mitigation**: Real-time Kafka stream analysis with automated IP banning
3. **Edge Caching**: Serves cached responses directly at load balancers
4. **Checkout Throttling**: Queue system with customizable waiting pages

### Application/Data Tier
1. **Pod Architecture**: Isolated units containing shops with dedicated MySQL/Redis instances
2. **Dynamic Sharding**: Automated pod balancing based on shop size/traffic
3. **Stateful vs Stateless**: Isolated data per pod, shared worker pool for horizontal scaling
4. **Load Testing**: Genghis tool with Lua-scripted traffic patterns

### Failure Handling
1. **Regional Failover**: Hot replica pods with zero-downtime migration
2. **Binlog Tailing**: For live data migration between pods
3. **Request Pausing**: Holds requests during failover to prevent errors

## Real-Life Tips

1. **Edge Processing**:
```lua
-- Sample OpenResty Lua throttling
location /checkout {
    access_by_lua_block {
        local shop_id = get_shop_id()
        if is_overloaded(shop_id) then
            ngx.redirect("/waiting-room")
        end
    }
}
```
*Implement critical path logic (auth, throttling) at edge using OpenResty*

2. **Sharding Strategy**:
- Maintain shop isolation principle
- Use composite keys: `SELECT * FROM orders WHERE shop_id = X AND id = Y`
- Migrate shops during low traffic with binlog tailing

3. **Failure Preparation**:
- Maintain hot replica regions
- Test regional failovers monthly
- Implement request buffering during database promotions

4. **Load Testing**:
```bash
# Sample Genghis load test command
/genghis run --script checkout_flow.lua --rate 10000/min --duration 30m
```
- Test beyond expected peaks (2-3x)
- Simulate real user behavior with think times

5. **Bot Defense**:
- Layer 1: Rate limiting at edge
- Layer 2: Behavioral analysis (mouse movements, API timing)
- Layer 3: Challenge systems (CAPTCHA) as last resort

## Additional Notes

- **Critical Path Optimization**: Checkout flow must be <300ms
- **Observability**: Per-pod metrics with 10s granularity during peaks
- **Culture**: Treat outages as learning opportunities ("chaos engineering")
- **Cloud Strategy**: Gradual pod migration to cloud providers with hot standby
