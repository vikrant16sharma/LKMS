# AlgoAtlas project documentation

## 1. Project overview

AlgoAtlas is a learning and revision platform for algorithmic problem solving. It combines a Spring Boot backend with a React + TypeScript frontend to let users register, log in, track solved coding questions, and revisit them on a spaced-repetition schedule.

## 2. System architecture

```mermaid
flowchart LR
    User[User / Browser] --> Frontend[React Frontend\nVite + TypeScript]
    Frontend --> API[REST API\nSpring Boot]
    API --> Auth[Auth Module]
    API --> Questions[Question Module]
    API --> Revision[Revision Module]
    API --> Analytics[Analytics Module]
    API --> DB[(PostgreSQL)]
```

## 3. Backend module map

```text
backend/
├── src/main/java/com/algoatlas/
│   ├── auth/
│   │   ├── controller/AuthController.java
│   │   ├── service/AuthService.java
│   │   ├── service/AuthServiceImpl.java
│   │   ├── repository/UserRepository.java
│   │   ├── entity/User.java
│   │   ├── entity/UserProfile.java
│   │   ├── dto/*
│   │   └── exception/*
│   ├── config/
│   │   ├── JwtProperties.java
│   │   └── SecurityConfig.java
│   ├── question/
│   │   └── entity/Question.java
│   ├── security/
│   │   ├── JwtService.java
│   │   ├── JwtAuthenticationFilter.java
│   │   ├── CustomUserDetailsService.java
│   │   └── JwtAuthenticationEntryPoint.java
│   ├── common/entity/BaseEntity.java
│   └── AlgoAtlasApplication.java
└── src/main/resources/application.yml
```

## 4. Frontend module map

```text
frontend/src/
├── components/
│   ├── dashboard/
│   ├── layout/
│   ├── questions/
│   └── ui/
├── hooks/
│   └── useAuth.ts
├── pages/
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── DashboardPage.tsx
│   ├── QuestionsPage.tsx
│   ├── RevisionPage.tsx
│   └── AnalyticsPage.tsx
├── routes/
│   └── AppRoutes.tsx
├── services/
│   ├── api.ts
│   ├── auth.ts
│   ├── questions.ts
│   └── analytics.ts
├── types/
│   ├── auth.ts
│   ├── question.ts
│   └── analytics.ts
├── App.tsx
└── main.tsx
```

## 5. Authentication flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as AuthController
    participant S as AuthServiceImpl
    participant R as UserRepository
    participant J as JwtService
    participant P as PostgreSQL

    U->>F: Enter email/password
    F->>A: POST /api/auth/login
    A->>S: login(request)
    S->>R: findByEmail(email)
    R->>P: SELECT user by email
    P-->>R: User
    S->>S: Validate password hash
    S->>J: generateToken(userDetails)
    J-->>S: JWT
    S-->>A: AuthenticationResponse
    A-->>F: 200 OK + token
    F->>F: Store JWT in localStorage
```

## 6. Question lifecycle workflow

```mermaid
flowchart TD
    Start[User adds a question] --> Save[Store in database]
    Save --> Review[Track difficulty, topic, pattern]
    Review --> Solve[Solved date + notes + mistakes]
    Solve --> Revision[Schedule revision rounds]
    Revision --> Dashboard[Dashboard and analytics]
    Dashboard --> Improve[Better retention and learning]
```

## 7. Class diagram

```mermaid
classDiagram
    class User {
        +Long id
        +String fullName
        +String email
        +String passwordHash
        +Role role
        +Boolean enabled
        +List~Question~ questions
        +setProfile(UserProfile)
    }

    class UserProfile {
        +Long id
        +String bio
        +String avatarUrl
        +String timezone
        +String preferredRevisionTime
        +String preferredLanguage
        +Boolean darkMode
    }

    class Question {
        +Long id
        +String title
        +String leetcodeUrl
        +Difficulty difficulty
        +String topic
        +String pattern
        +Status status
        +String notes
        +String mistakes
        +LocalDate solvedDate
        +Integer revisionCount
        +Boolean favorite
    }

    class AuthController {
        +register(RegisterRequest)
        +login(LoginRequest)
    }

    class AuthServiceImpl {
        +register(RegisterRequest)
        +login(LoginRequest)
    }

    class JwtService {
        +generateToken(UserDetails)
        +extractUsername(token)
        +isTokenValid(token, userDetails)
    }

    class SecurityConfig {
        +passwordEncoder()
        +authenticationProvider()
        +securityFilterChain()
    }

    class JwtAuthenticationFilter {
        +doFilterInternal()
    }

    User "1" --> "1" UserProfile
    User "1" --> "0..*" Question
    AuthController --> AuthServiceImpl
    AuthServiceImpl --> JwtService
    AuthServiceImpl --> User
    SecurityConfig --> JwtAuthenticationFilter
    JwtAuthenticationFilter --> JwtService
```

## 8. Key design principles

- Clear separation of concerns between controllers, services, repositories, DTOs, and security.
- JWT-based stateless authentication for API access.
- Database entity fields keep business data independent from presentation concerns.
- Frontend keeps auth state in a single hook and stores token in local storage.
- The app is designed around a spaced-repetition learning loop rather than a simple task tracker.

## 9. Current status and priorities

The project is already structured around the key learning modules: authentication, question tracking, revision planning, dashboard, and analytics.

Recommended next steps:

1. Complete full question CRUD and revision scheduling endpoints.
2. Add global exception handlers for validation and auth errors.
3. Standardize frontend state management around a shared auth utility and route guards.
4. Add tests for auth, question APIs, and route behavior.

## 10. How to run

Backend:

```bash
cd backend
mvn spring-boot:run
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## 11. Typical request flow

1. User signs in from the frontend.
2. Backend validates email/password and returns a JWT.
3. Frontend stores JWT and adds it to the Authorization header.
4. Protected routes call secure API endpoints.
5. The backend verifies the token in the security filter before processing requests.
6. The app loads dashboard, question, revision, and analytics data from the database.
