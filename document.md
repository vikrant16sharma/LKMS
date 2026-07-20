                    React + TypeScript
                           │
                    Authentication
                           │
                    Protected Routes
                           │
      ┌────────────────────┼────────────────────┐
      │                    │                    │
 Dashboard            Questions            Revisions
      │                    │                    │
      └────────────── REST APIs ────────────────┘
                           │
                    Spring Boot Backend
                           │
 ┌──────────────┬──────────────┬──────────────┬──────────────┐
 │ Auth Module  │ Question     │ Revision     │ Analytics    │
 │              │ Module       │ Module       │ Module       │
 └──────────────┴──────────────┴──────────────┴──────────────┘
                           │
                     PostgreSQL


Current:
controller
service
repository
model

com.algoatlas

├── auth
│   ├── controller
│   ├── service
│   ├── dto
│   ├── repository
│   └── entity
│
├── question
│   ├── controller
│   ├── service
│   ├── repository
│   ├── dto
│   └── entity
│
├── revision
│
├── analytics
│
├── dashboard
│
├── common
│
├── config
│
├── security
│
└── exception

This scales much better.

Modules
1. Authentication
Register

Login

JWT

Refresh Token

Forgot Password

Email Verification
2. Question Module

Entity

Question

id

title

leetcodeUrl

difficulty

topic

pattern

status

notes

mistakes

solvedDate

revisionCount

favorite
3. Revision Module

Instead of manually revising,

store

Question

↓

Solved Today

↓

Revise

1 day

↓

3 days

↓

7 days

↓

15 days

↓

30 days

↓

90 days

This is spaced repetition.

4. Analytics

Charts

Questions solved

Difficulty

Topic wise

Pattern wise

Weekly

Monthly

Heatmap

Average solving time

Acceptance rate

Revision completion
5. Dashboard
Today's revision

Today's goal

Current streak

Contest rating

Questions remaining

Pattern progress
Database
User
id

name

email

passwordHash
Question
id

title

difficulty

topic

pattern

status

notes

mistakes

revisionCount
Revision
id

questionId

scheduledDate

completed

revisionNumber
Tags
Arrays

Trees

DP

Graph

Sliding Window

Trie
Frontend

Instead of

pages

components

I'd organize it as:

src

features

    auth

    dashboard

    questions

    revision

    analytics

shared

components

hooks

layouts

api

context

types

utils

Feature-first architecture.

APIs

Authentication

POST /auth/register

POST /auth/login

POST /auth/refresh

Questions

GET /questions

POST /questions

PUT /questions/{id}

DELETE /questions/{id}

Revision

GET /revisions/today

POST /revisions/complete

Analytics

GET /analytics/dashboard

GET /analytics/topics

GET /analytics/streak
AI Features

This is where your project becomes unique.

AI Mistake Analyzer

Paste code

↓

AI says

Pattern missed

Time complexity issue

Better approach

Related problems

Common interview mistakes
AI Revision
Today revise

Problem 45

↓

AI asks

Explain Sliding Window

↓

You answer

↓

AI evaluates
AI Roadmap
Solved 300 questions

↓

Weak in

Graphs

DP

Trie

↓

AI generates next month's plan
AI Interview
Mock interview

↓

Voice

↓

Coding

↓

Feedback

↓

Score
Advanced Features
Contest Tracker
LeetCode Contest History

Rating

Ranking

Performance
Company Tag
Amazon

Google

Microsoft

Uber

Filter questions.

Calendar
GitHub contribution style

Solved

Revised

Missed
Notes

Markdown

Observation

Mistakes

Dry run

Patterns

Interview tips
Code Storage

Store multiple solutions.

Java

Python

C++

Optimal

Brute Force

Better
Video Links
NeetCode

Striver

TakeUForward

Personal Notes
Tech Stack
Frontend
React
TypeScript
Tailwind CSS
React Router
React Query (TanStack Query)
React Hook Form
Zod
Backend
Java 21
Spring Boot
Spring Security
JWT
Spring Data JPA
PostgreSQL
Flyway (database migrations)
MapStruct (DTO mapping)
Infrastructure
Docker
GitHub Actions
AWS EC2
Nginx
AI
OpenAI / Gemini
LangChain4j
Spring AI
pgvector (or another vector database if you add semantic search)
Development Roadmap

Given your current progress, I'd build it in phases:

Phase 1 — Foundation
Authentication (JWT)
User profile
Question CRUD
Notes
Search & filters

Phase 2 — Interview Prep
Revision scheduler
Dashboard
Analytics
Streaks
Progress tracking

Phase 3 — Intelligence
AI mistake analyzer
AI revision coach
AI roadmap generator
Semantic search over notes

Phase 4 — Platform
Contest tracker
Company-wise preparation
Mock interviews
Collaboration and sharing
Mobile app

This progression gives you a portfolio-quality project after Phase 1, a highly practical interview preparation tool after Phase 2, and a differentiated AI-powered product in later phases.

Phase 1 Deliverables

By the end of the authentication phase, you should have:

✅ User registration
✅ User login
✅ BCrypt password hashing
✅ JWT generation and validation
✅ Protected routes
✅ JWT filter
✅ React login/register pages
✅ AuthContext
✅ Persistent login (reload keeps the user logged in)
✅ Logout
✅ Global exception handling
✅ Request validation





User table 
User
-----------------------------------------------------
UUID id

String fullName

String email

String passwordHash

Role role

Boolean enabled

LocalDateTime createdAt

LocalDateTime updatedAt



algoatlas-backend
│
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com.algoatlas
│   │   │
│   │   │── AlgoAtlasApplication.java
│   │   │
│   │   │── config
│   │   │   ├── SecurityConfig.java
│   │   │   ├── CorsConfig.java
│   │   │   ├── JacksonConfig.java
│   │   │   └── OpenApiConfig.java
│   │   │
│   │   │── common
│   │   │   ├── dto
│   │   │   ├── exception
│   │   │   ├── response
│   │   │   ├── mapper
│   │   │   ├── util
│   │   │   └── constants
│   │   │
│   │   │── security
│   │   │   ├── JwtService.java
│   │   │   ├── JwtAuthenticationFilter.java
│   │   │   ├── CustomUserDetailsService.java
│   │   │   ├── JwtAuthenticationEntryPoint.java
│   │   │   └── SecurityConstants.java
│   │   │
│   │   │────────────────────────────────────
│   │   │ Authentication Feature
│   │   │────────────────────────────────────
│   │   │
│   │   │── auth
│   │   │   ├── controller
│   │   │   │     AuthController.java
│   │   │   │
│   │   │   ├── service
│   │   │   │     AuthService.java
│   │   │   │
│   │   │   ├── repository
│   │   │   │     UserRepository.java
│   │   │   │
│   │   │   ├── entity
│   │   │   │     User.java
│   │   │   │     UserProfile.java
│   │   │   │     Role.java
│   │   │   │
│   │   │   ├── dto
│   │   │   │     RegisterRequest.java
│   │   │   │     LoginRequest.java
│   │   │   │     AuthenticationResponse.java
│   │   │   │     UserResponse.java
│   │   │   │
│   │   │   ├── mapper
│   │   │   │     UserMapper.java
│   │   │   │
│   │   │   └── validation
│   │   │
│   │   │────────────────────────────────────
│   │   │ Question Feature
│   │   │────────────────────────────────────
│   │   │
│   │   │── question
│   │   │   ├── controller
│   │   │   ├── service
│   │   │   ├── repository
│   │   │   ├── entity
│   │   │   ├── dto
│   │   │   ├── mapper
│   │   │   └── validation
│   │   │
│   │   │────────────────────────────────────
│   │   │ Revision Feature
│   │   │────────────────────────────────────
│   │   │
│   │   │── revision
│   │   │   ├── controller
│   │   │   ├── service
│   │   │   ├── repository
│   │   │   ├── entity
│   │   │   ├── dto
│   │   │   └── mapper
│   │   │
│   │   │────────────────────────────────────
│   │   │ Notes Feature
│   │   │────────────────────────────────────
│   │   │
│   │   │── note
│   │   │   ├── controller
│   │   │   ├── service
│   │   │   ├── repository
│   │   │   ├── entity
│   │   │   ├── dto
│   │   │   └── mapper
│   │   │
│   │   │────────────────────────────────────
│   │   │ Analytics Feature
│   │   │────────────────────────────────────
│   │   │
│   │   │── analytics
│   │   │   ├── controller
│   │   │   ├── service
│   │   │   ├── dto
│   │   │   └── mapper
│   │   │
│   │   │────────────────────────────────────
│   │   │ Dashboard Feature
│   │   │────────────────────────────────────
│   │   │
│   │   │── dashboard
│   │   │   ├── controller
│   │   │   ├── service
│   │   │   └── dto
│   │   │
│   │   │────────────────────────────────────
│   │   │ AI Feature
│   │   │────────────────────────────────────
│   │   │
│   │   │── ai
│   │   │   ├── controller
│   │   │   ├── service
│   │   │   ├── dto
│   │   │   ├── prompt
│   │   │   └── provider
│   │   │
│   │   └── resources
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       ├── application-prod.yml
│   │       └── db
│   │           └── migration
│   │               ├── V1__create_users.sql
│   │               ├── V2__create_questions.sql
│   │               └── ...
│   │
│   └── test




main authentication part is like this
auth
│
├── controller
│   └── AuthController.java
│
├── dto
│   ├── LoginRequest.java
│   ├── RegisterRequest.java
│   ├── AuthenticationResponse.java
│   └── UserResponse.java
│
├── entity
│   ├── User.java
│   ├── UserProfile.java
│   └── Role.java
│
├── repository
│   └── UserRepository.java
│
├── service
│   ├── AuthService.java
│   └── AuthServiceImpl.java
│
├── mapper
│   └── UserMapper.java
│
└── validation

Development Order

Now we stop creating folders and start implementing functionality.

Step 1 (Current Sprint)

Authentication Domain

✅ Package structure
⬜ Role
⬜ BaseEntity
⬜ User
⬜ UserProfile
⬜ UserRepository
Step 2

DTOs

RegisterRequest
LoginRequest
UserResponse
AuthenticationResponse
Step 3

Service Layer

AuthService
AuthServiceImpl
Step 4

Security

JWT
Spring Security
Filter
AuthenticationManager
Step 5

Controller

Register
Login
/me
One Change I'd Make Before Writing Code

I would move BaseEntity into a shared package:

common
└── entity
    └── BaseEntity.java
_____________________________________________________________________
Reason:

Every entity in your application (User, Question, Revision, Note, Contest, etc.) will likely need createdAt and updatedAt. Keeping BaseEntity in common.entity avoids duplication and keeps it reusable across features without coupling it specifically to authentication.

After that, we can start writing the actual code, beginning with Role.java, followed by BaseEntity.java, and then refactoring User and UserProfile to use it.
_____________________________________________________________________
This is where beginners often make a mistake by using the User entity directly in controllers. We won't do that.

We'll use DTOs (Data Transfer Objects).
_____________________________________________________________________
Perfect. We have completed:

✅ Entities
✅ Repository
✅ DTOs

Now we reach the Business Layer, which is the heart of the authentication module.
_____________________________________________________________________
Controllers should only:

Receive Request

↓

Call Service

↓

Return Response
_____________________________________________________________________
Service Architecture

AuthController
        │
        ▼
AuthService (Interface)
        │
        ▼
AuthServiceImpl
        │
        ▼
UserRepository
_____________________________________________________________________
Many beginners ask:

"Why not just write AuthServiceImpl?"

Because we program against abstractions, not implementations.

Later you can have

AuthService

      ▲

      │

----------------------------

LocalAuthService

OAuthAuthService

FirebaseAuthService

The controller never changes.

_____________________________________________________________________
we only need for now is skeleton of AuthServiceImpl.java
in the time of production we will use give it a real 
_____________________________________________________________________
Registration Workflow

We're not coding it yet.

First understand it.

Register Request

↓

Email Exists?

↓

YES

↓

Throw Exception

↓

NO

↓

Map DTO → User

↓

Hash Password

↓

Set Role(USER)

↓

Set Enabled(true)

↓

Create Profile

↓

Save User

↓

Generate JWT

↓

Return AuthenticationResponse
Login Workflow
Login Request

↓

Find User By Email

↓

User Found?

↓

NO

↓

Throw Exception

↓

YES

↓

Password Matches?

↓

NO

↓

Throw Exception

↓

YES

↓

Generate JWT

↓

Return AuthenticationResponse
_____________________________________________________________________
Why @Configuration?

It tells Spring:

"This class contains bean definitions."

When the application starts, Spring scans it automatically.
_____________________________________________________________________

Next Step — Implement register()

Now we have everything needed to build a working registration flow.

The method will:

Register Request
        │
        ▼
Validate email uniqueness
        │
        ▼
Map DTO → User
        │
        ▼
Encode password
        │
        ▼
Save user
        │
        ▼
Convert User → UserResponse
        │
        ▼
Return AuthenticationResponse
_____________________________________________________________________

JWT Authentication Flow
                Register/Login
                      │
                      ▼
             AuthService.login()
                      │
                      ▼
           AuthenticationManager
                      │
        Username + Password Valid?
              │               │
             NO              YES
              │               │
        Exception        Generate JWT
                              │
                              ▼
                      Return Token
                              │
                              ▼
               React stores token
                              │
                              ▼
      Authorization: Bearer eyJhbGciOiJIUzI1Ni...
                              │
                              ▼
               JwtAuthenticationFilter
                              │
                      Validate Token
                              │
                              ▼
                  SecurityContext
                              │
                              ▼
                      Protected API
_____________________________________________________________________

                      REGISTER

React
   │
   ▼
AuthController
   │
   ▼
AuthService
   │
   ├────────► UserRepository.existsByEmail()
   │
   ├────────► UserMapper.toEntity()
   │
   ├────────► PasswordEncoder.encode()
   │
   ├────────► UserRepository.save()
   │
   ├────────► JwtService.generateToken()
   │
   └────────► UserMapper.toResponse()
               │
               ▼
AuthenticationResponse
               │
               ▼
React



-----------------------------------------------------------



                         LOGIN

React
   │
   ▼
AuthController
   │
   ▼
AuthService
   │
   ├────────► UserRepository.findByEmail()
   │
   ├────────► PasswordEncoder.matches()
   │
   ├────────► JwtService.generateToken()
   │
   └────────► UserMapper.toResponse()
               │
               ▼
AuthenticationResponse
               │
               ▼
React



-----------------------------------------------------------



                  EVERY PROTECTED REQUEST

React
   │
Authorization: Bearer JWT
   │
   ▼
Security Filter Chain
   │
   ▼
JwtAuthenticationFilter
   │
   ▼
JwtService
   │
   ▼
CustomUserDetailsService
   │
   ▼
UserRepository
   │
   ▼
PostgreSQL
   │
   ▼
SecurityContextHolder
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
Database
   │
   ▼
JSON Response

Responsibilities of JwtAuthenticationFilter

It has exactly five responsibilities:

1. Read Authorization header

2. Check if it starts with "Bearer "

3. Extract JWT

4. Validate JWT

5. Store Authentication inside SecurityContext

Nothing else.
Complete Execution Flow

Suppose React sends:

GET /api/questions

Authorization: Bearer eyJhbGciOiJIUzI1Ni...

Execution:

Incoming Request

↓

JwtAuthenticationFilter

↓

Read Header

↓

Authorization exists?

↓

NO -------------------------> Continue

↓

YES

↓

Starts with Bearer?

↓

NO -------------------------> Continue

↓

YES

↓

Extract Token

↓

JwtService.extractUsername()

↓

Username

↓

CustomUserDetailsService

↓

UserRepository

↓

Database

↓

UserDetails

↓

JwtService.isTokenValid()

↓

Valid?

↓

NO -------------------------> Continue (unauthenticated)

↓

YES

↓

UsernamePasswordAuthenticationToken

↓

SecurityContextHolder

↓

Continue Filter Chain

↓

Controller
Why Store It in SecurityContext?

Without this line:

SecurityContextHolder.getContext().setAuthentication(authentication);

Spring has no idea who the current user is.

After it's stored:

Authentication auth =
SecurityContextHolder.getContext().getAuthentication();

works anywhere.

Even inside a controller:

@GetMapping("/me")
public String me(Authentication authentication) {

    return authentication.getName();
}

Spring automatically injects the authenticated user