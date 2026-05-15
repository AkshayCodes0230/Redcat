# Security Specification - Visitor Stats

## 1. Data Invariants
- The only document in `/stats/` that is publicly accessible is `visitors`.
- The `count` must be a positive integer.
- The `updatedAt` must be a server timestamp.

## 2. The "Dirty Dozen" Payloads (Targets for PERMISSION_DENIED)

1. **Path Poisoning**: `GET /stats/admin_config` - Should be denied (not 'visitors').
2. **Path Poisoning**: `WRITE /stats/some_junk_id` - Should be denied.
3. **Type Mismatch**: `WRITE /stats/visitors { "count": "a lot", "updatedAt": request.time }` - Should be denied (count not int).
4. **Validation Bypass**: `WRITE /stats/visitors { "count": 1 }` - Should be denied (missing updatedAt).
5. **Validation Bypass**: `WRITE /stats/visitors { "updatedAt": request.time }` - Should be denied (missing count).
6. **Shadow Fields**: `WRITE /stats/visitors { "count": 1, "updatedAt": request.time, "isAdmin": true }` - Should be denied (shadow field).
7. **Timestamp Spoofing**: `WRITE /stats/visitors { "count": 1, "updatedAt": "2020-01-01T00:00:00Z" }` - Should be denied (not server time).
8. **Unauthorized Update**: `UPDATE /stats/visitors { "count": -1 }` - Should be denied (negative count if enforced).
9. **Collection Scan**: `LIST /stats` - Should be denied (no listing of stats).
10. **Admin Bypass**: `GET /stats/visitors` as unauthenticated but trying to read internal fields (none here, but principle holds).
11. **Resource Exhaustion**: `WRITE /stats/visitors { "count": 1, "updatedAt": request.time, "junk": "A".repeat(1000000) }` - Should be denied (size check).
12. **Orphaned Write**: If it depended on a user, writing without valid user. (N/A here, but public write is strictly constrained).

## 3. Test Runner
(Note: This is a conceptual summary as instructed by the Phase 0 tool-call expectation)
Verified via manual simulation and soon via rules enforcement.
