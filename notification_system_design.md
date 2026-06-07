# Stage 1

## Core Actions

1. Get all notifications
2. Get unread notifications
3. Mark notification as read
4. Mark all notifications as read
5. Delete notification
6. Receive real-time notifications

---

## API Contracts

### Get Notifications

GET /api/notifications

Headers:
Authorization: Bearer <token>

Response:
{
  "notifications": [
    {
      "id": 1,
      "title": "Placement Drive",
      "message": "Microsoft hiring",
      "type": "Placement",
      "isRead": false,
      "createdAt": "2025-06-07T10:00:00Z"
    }
  ]
}

---

### Get Unread Notifications

GET /api/notifications/unread

Response:
{
  "count": 5,
  "notifications": []
}

---

### Mark Notification Read

PATCH /api/notifications/:id/read

Response:
{
  "success": true
}

---

### Mark All Read

PATCH /api/notifications/read-all

Response:
{
  "success": true
}

---

### Delete Notification

DELETE /api/notifications/:id

Response:
{
  "success": true
}

---

## Real Time Notifications

Use WebSockets (Socket.IO)

Event:
notification_received

Payload:
{
  "id": 1,
  "title": "Placement Drive",
  "message": "Microsoft hiring"
}
# Stage 2

## Database Choice

PostgreSQL

Reasons:
- Structured data
- ACID compliance
- Fast indexing
- Reliable querying

## Schema

Students

studentId (PK)
name
email

Notifications

id (PK)
studentId (FK)
title
message
notificationType
isRead
createdAt

## Indexes

(studentId)
(studentId, isRead)
(createdAt)

## Problems at Scale

1. Large table size
2. Slow queries
3. High read load

## Solutions

1. Proper indexing
2. Pagination
3. Partitioning
4. Read replicas

## Sample Query

Unread Notifications

SELECT *
FROM notifications
WHERE studentId = 1042
AND isRead = false;

# Stage 3

Problem:

SELECT *
FROM notifications
WHERE studentId = 1042
AND isRead = false
ORDER BY createdAt ASC;


---

# Stage 4

Add:

```md
# Stage 4

Problem:
Database hit on every page load.

Solutions:

1. Redis Cache
2. Pagination
3. Lazy Loading
4. Read Replicas

Tradeoffs:

Redis:
+ Faster reads
- Extra infrastructure

Read Replica:
+ Reduces primary DB load
- Replication lag

Pagination:
+ Smaller queries
- More API calls

# Stage 5

## Problems With Current Approach

Current code processes students one by one.

Problems:

1. Very slow for 50,000 students
2. Email API failure can stop execution
3. No retry mechanism
4. High chance of timeout
5. Not scalable

## Should DB Save And Email Be Together?

No.

Email sending should be asynchronous.

Database write should succeed independently.

## Better Design

Use Message Queue:

HR Request
    |
    V
Notification Service
    |
    +--> Save Notification
    |
    +--> Push Job To Queue
              |
              V
        Worker Processes
              |
              +--> Send Email
              +--> Send Push Notification

Benefits:

- Faster response
- Retry support
- Fault tolerance
- Horizontal scalability

## Revised Pseudocode

function notify_all(student_ids, message) {

    for each student_id {

        save_notification(student_id, message)

        queue.push({
            studentId: student_id,
            message: message
        })
    }
}

worker() {

    while(queue not empty) {

        job = queue.pop()

        send_email(job.studentId, job.message)

        send_push(job.studentId, job.message)
 
   }
}

# Stage 6

Priority Formula

Placement = 3
Result = 2
Event = 1

Notifications are sorted by:

1. Priority score descending
2. Timestamp descending

Approach:
- Fetch notifications from API
- Assign priority weights
- Sort notifications
- Return top 10 notifications

Time Complexity:
O(n log n)

Space Complexity:
O(n)

Future Optimization:
Use Min Heap of size 10 to maintain top notifications in O(n log 10).