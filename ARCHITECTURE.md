# 📐 Architecture du Projet Encadri

## 🎯 Vue d'ensemble du Projet

**Nom:** Encadri - Système de Gestion de Projets Académiques
**Type:** Application Web Full-Stack
**Objectif:** Gérer les projets académiques (PFA, PFE, Stages) entre étudiants et encadrants

---

## 🏗️ Architecture Technique

### Architecture 3-Tier (Trois Couches)

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                        │
│              (Angular - Port 4200)                       │
│              [À DÉVELOPPER]                              │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP/REST API
                     │ (JSON)
                     ▼
┌─────────────────────────────────────────────────────────┐
│                    API LAYER (Backend)                   │
│              ASP.NET Core 6.0 Web API                    │
│              Ports: 5040 (HTTP), 7225 (HTTPS)            │
│                                                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │        Controllers (8 endpoints)                 │   │
│  │  - AuthController                                │   │
│  │  - ProjectsController                            │   │
│  │  - SubmissionsController                         │   │
│  │  - MeetingsController                            │   │
│  │  - EvaluationsController                         │   │
│  │  - MessagesController                            │   │
│  │  - NotificationsController                       │   │
│  │  - MilestonesController                          │   │
│  └────────────────┬────────────────────────────────┘   │
│                   │                                      │
│                   ▼                                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │     ApplicationDbContext (EF Core 6.0)          │   │
│  │     - DbSet<User>                                │   │
│  │     - DbSet<Project>                             │   │
│  │     - DbSet<Submission>                          │   │
│  │     - DbSet<Meeting>                             │   │
│  │     - DbSet<Evaluation>                          │   │
│  │     - DbSet<Message>                             │   │
│  │     - DbSet<Notification>                        │   │
│  │     - DbSet<Milestone>                           │   │
│  └────────────────┬────────────────────────────────┘   │
└──────────────────┬──────────────────────────────────────┘
                   │
                   │ Pomelo.EntityFrameworkCore.MySql
                   │ (ORM - Mapping Objet-Relationnel)
                   ▼
┌─────────────────────────────────────────────────────────┐
│                    DATA LAYER                            │
│              MySQL Database (XAMPP)                      │
│              Base de données: encadri_db                 │
│              Port: 3306                                  │
│                                                           │
│  Tables (8):                                             │
│  - Users                                                 │
│  - Projects                                              │
│  - Submissions                                           │
│  - Meetings                                              │
│  - Evaluations                                           │
│  - Messages                                              │
│  - Notifications                                         │
│  - Milestones                                            │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Stack Technologique

### Backend
| Technologie | Version | Rôle |
|------------|---------|------|
| **ASP.NET Core** | 6.0 | Framework Web API |
| **Entity Framework Core** | 6.0.36 | ORM (Object-Relational Mapping) |
| **Pomelo.EntityFrameworkCore.MySql** | 6.0.3 | Provider MySQL pour EF Core |
| **Swashbuckle (Swagger)** | 6.5.0 | Documentation API automatique |
| **C#** | 11.0 | Langage de programmation |

### Base de Données
| Technologie | Version | Rôle |
|------------|---------|------|
| **MySQL** | 10.4.28 (MariaDB) | Système de gestion de base de données |
| **XAMPP** | - | Serveur local MySQL + phpMyAdmin |

### Frontend (À développer)
| Technologie | Rôle |
|------------|------|
| **Angular** | Framework frontend SPA |
| **TypeScript** | Langage de programmation |
| **RxJS** | Programmation réactive |

---

## 📁 Structure du Projet Backend

```
Encadri-Backend/
│
├── Controllers/                    # Endpoints API REST
│   ├── AuthController.cs          # Authentification (Login/Register)
│   ├── ProjectsController.cs      # Gestion des projets
│   ├── SubmissionsController.cs   # Soumissions des étudiants
│   ├── MeetingsController.cs      # Réunions étudiant-encadrant
│   ├── EvaluationsController.cs   # Évaluations des projets
│   ├── MessagesController.cs      # Messagerie
│   ├── NotificationsController.cs # Notifications
│   └── MilestonesController.cs    # Jalons du projet
│
├── Models/                         # Modèles de données (Entités)
│   ├── User.cs                    # Utilisateurs (étudiants/encadrants)
│   ├── Project.cs                 # Projets (PFA/PFE/Stage)
│   ├── Submission.cs              # Soumissions
│   ├── Meeting.cs                 # Réunions
│   ├── Evaluation.cs              # Évaluations
│   ├── Message.cs                 # Messages
│   ├── Notification.cs            # Notifications
│   └── Milestone.cs               # Jalons
│
├── Data/                           # Contexte de base de données
│   └── ApplicationDbContext.cs    # Configuration EF Core
│
├── Migrations/                     # Migrations de base de données
│   ├── 20251130140947_InitialCreate.cs
│   └── ApplicationDbContextModelSnapshot.cs
│
├── Properties/
│   └── launchSettings.json        # Configuration de lancement
│
├── appsettings.json               # Configuration globale
├── appsettings.Development.json   # Configuration développement
├── Program.cs                     # Point d'entrée de l'application
└── Encadri-Backend.csproj        # Fichier projet .NET

```

---

## 🗄️ Schéma de Base de Données

### Tables et Relations

#### 1. **Users** (Utilisateurs)
```sql
- Id (PK, VARCHAR(255))
- Email (UNIQUE, NOT NULL)
- FullName
- UserRole (student/supervisor)
- Password
- AvatarUrl
- CreatedDate
- UpdatedDate
```

#### 2. **Projects** (Projets)
```sql
- Id (PK, VARCHAR(255))
- Title (NOT NULL)
- Type (PFA/PFE/Internship)
- Description
- StudentEmail (FK → Users)
- StudentName
- SupervisorEmail (FK → Users)
- SupervisorName
- Status (proposed/in_progress/under_review/completed/archived)
- StartDate
- EndDate
- Company
- FinalGrade
- ProgressPercentage
- CreatedDate
- UpdatedDate
```

#### 3. **Submissions** (Soumissions)
```sql
- Id (PK, VARCHAR(255))
- ProjectId (FK → Projects)
- Title (NOT NULL)
- Description
- Type (report/presentation/code/documentation/other)
- FileUrl
- SubmittedBy
- Status (pending/reviewed/approved/needs_revision)
- Feedback
- Grade
- DueDate
- CreatedDate
- UpdatedDate
```

#### 4. **Meetings** (Réunions)
```sql
- Id (PK, VARCHAR(255))
- ProjectId (FK → Projects)
- Title
- ScheduledAt
- DurationMinutes
- Location
- Status (pending/confirmed/completed/cancelled)
- Agenda
- Notes
- RequestedBy
- CreatedDate
- UpdatedDate
```

#### 5. **Evaluations** (Évaluations)
```sql
- Id (PK, VARCHAR(255))
- ProjectId (FK → Projects)
- EvaluatorEmail
- EvaluatorName
- ReportQualityScore
- TechnicalImplementationScore
- PresentationScore
- ProfessionalConductScore
- FinalGrade
- Comments
- DefenseDate
- CreatedDate
- UpdatedDate
```

#### 6. **Messages** (Messages)
```sql
- Id (PK, VARCHAR(255))
- ProjectId (FK → Projects)
- SenderEmail
- SenderName
- Content (NOT NULL)
- IsRead
- CreatedDate
- UpdatedDate
```

#### 7. **Notifications** (Notifications)
```sql
- Id (PK, VARCHAR(255))
- UserEmail
- Title (NOT NULL)
- Message (NOT NULL)
- Type (info/warning/success/error)
- IsRead
- Link
- Priority (low/medium/high)
- CreatedDate
- UpdatedDate
```

#### 8. **Milestones** (Jalons)
```sql
- Id (PK, VARCHAR(255))
- ProjectId (FK → Projects)
- Title (NOT NULL)
- Description
- DueDate
- Status (pending/in_progress/completed)
- CompletedDate
- Order
- CreatedDate
- UpdatedDate
```

---

## 🔌 API Endpoints

### Base URL
- **HTTP:** `http://localhost:5040/api`
- **HTTPS:** `https://localhost:7225/api`

### 1. Authentication (`/api/Auth`)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/register` | Inscription d'un nouvel utilisateur |
| POST | `/login` | Connexion (retourne un token) |
| GET | `/me` | Obtenir l'utilisateur actuel |

### 2. Projects (`/api/Projects`)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Liste tous les projets (filtrable par email, status) |
| GET | `/{id}` | Obtenir un projet par ID |
| POST | `/` | Créer un nouveau projet |
| PUT | `/{id}` | Mettre à jour un projet |
| DELETE | `/{id}` | Supprimer un projet |

### 3. Submissions (`/api/Submissions`)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Liste toutes les soumissions (filtrable par projectId) |
| GET | `/{id}` | Obtenir une soumission par ID |
| POST | `/` | Créer une nouvelle soumission |
| PUT | `/{id}` | Mettre à jour une soumission |
| DELETE | `/{id}` | Supprimer une soumission |

### 4. Meetings (`/api/Meetings`)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Liste toutes les réunions (filtrable par projectId) |
| GET | `/{id}` | Obtenir une réunion par ID |
| POST | `/` | Créer une nouvelle réunion |
| PUT | `/{id}` | Mettre à jour une réunion |
| DELETE | `/{id}` | Supprimer une réunion |

### 5. Evaluations (`/api/Evaluations`)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Liste toutes les évaluations (filtrable par projectId) |
| GET | `/{id}` | Obtenir une évaluation par ID |
| POST | `/` | Créer une nouvelle évaluation |
| PUT | `/{id}` | Mettre à jour une évaluation |
| DELETE | `/{id}` | Supprimer une évaluation |

### 6. Messages (`/api/Messages`)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Liste tous les messages (filtrable par projectId) |
| GET | `/{id}` | Obtenir un message par ID |
| POST | `/` | Créer un nouveau message |
| PUT | `/{id}/read` | Marquer un message comme lu |
| DELETE | `/{id}` | Supprimer un message |

### 7. Notifications (`/api/Notifications`)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Liste toutes les notifications (filtrable par userEmail, isRead) |
| GET | `/{id}` | Obtenir une notification par ID |
| POST | `/` | Créer une nouvelle notification |
| PUT | `/{id}/read` | Marquer une notification comme lue |
| DELETE | `/{id}` | Supprimer une notification |

### 8. Milestones (`/api/Milestones`)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Liste tous les jalons (filtrable par projectId) |
| GET | `/{id}` | Obtenir un jalon par ID |
| POST | `/` | Créer un nouveau jalon |
| PUT | `/{id}` | Mettre à jour un jalon |
| DELETE | `/{id}` | Supprimer un jalon |

---

## 🔄 Flow de Données

### Exemple: Création d'un Projet

```
1. Frontend (Angular)
   └─> HTTP POST /api/Projects
       Body: { title: "Mon Projet", type: "PFE", ... }

2. Backend (ASP.NET Core)
   └─> ProjectsController.Create()
       ├─> Génère un ID unique (Guid)
       ├─> Ajoute timestamps (CreatedDate, UpdatedDate)
       └─> _context.Projects.Add(project)
           └─> _context.SaveChangesAsync()

3. Entity Framework Core
   └─> Génère requête SQL
       INSERT INTO Projects VALUES (...)

4. MySQL Database
   └─> Stocke les données
       └─> Retourne confirmation

5. Retour au Frontend
   └─> HTTP 201 Created
       Body: { id: "abc-123", title: "Mon Projet", ... }
```

---

## 🔐 Sécurité (Implémenté)

### CORS (Cross-Origin Resource Sharing)
```csharp
Origines autorisées:
- http://localhost:4200 (Angular)
- http://localhost:5040 (Swagger HTTP)
- https://localhost:7225 (Swagger HTTPS)
```

### Validation
- Email unique pour les utilisateurs
- Champs obligatoires (Title, Email, etc.)
- Format JSON pour tous les échanges

---

## 🔐 Sécurité (À Implémenter)

### À Ajouter
- ❌ **JWT Authentication** - Tokens sécurisés
- ❌ **Password Hashing** - BCrypt pour les mots de passe
- ❌ **Authorization** - Contrôle d'accès basé sur les rôles
- ❌ **Input Validation** - Validation côté serveur
- ❌ **HTTPS Only** - Forcer HTTPS en production

---

## 📊 État du Projet

### ✅ Complété (60%)
- ✅ Structure backend ASP.NET Core
- ✅ Base de données MySQL (8 tables)
- ✅ Entity Framework Core configuré
- ✅ 8 Controllers avec CRUD complet
- ✅ Connexion base de données fonctionnelle
- ✅ Migrations appliquées
- ✅ Swagger UI pour tests
- ✅ CORS configuré

### 🔄 En Cours
- 🔄 Tests des endpoints API

### ❌ À Faire
- ❌ Frontend Angular
- ❌ Authentification JWT
- ❌ Hachage des mots de passe
- ❌ Upload de fichiers
- ❌ Relations de base de données (Foreign Keys)
- ❌ Tests unitaires
- ❌ Déploiement

---

## 🚀 Comment Démarrer le Projet

### Prérequis
- .NET SDK 6.0 ou supérieur
- XAMPP (MySQL)
- Visual Studio / VS Code
- Node.js (pour Angular - futur)

### Étapes

1. **Démarrer MySQL (XAMPP)**
   ```
   Ouvrir XAMPP Control Panel
   Start MySQL
   ```

2. **Démarrer le Backend**
   ```bash
   cd Encadri-Backend/Encadri-Backend
   dotnet run
   ```

3. **Accéder à Swagger UI**
   ```
   http://localhost:5040
   ```

4. **Accéder à phpMyAdmin**
   ```
   http://localhost/phpmyadmin
   Base de données: encadri_db
   ```

---

## 📝 Points Techniques Importants

### 1. Entity Framework Core - Code First
- Les modèles C# génèrent automatiquement le schéma de base de données
- Migrations pour versionner les changements de schéma
- Pas besoin de créer les tables manuellement

### 2. Async/Await Pattern
- Toutes les opérations de base de données sont asynchrones
- Meilleure performance et scalabilité
- Exemple: `await _context.SaveChangesAsync()`

### 3. Dependency Injection
- `ApplicationDbContext` injecté dans les controllers
- Pattern standard ASP.NET Core
- Facilite les tests et la maintenabilité

### 4. RESTful API Design
- GET pour récupérer
- POST pour créer
- PUT pour mettre à jour
- DELETE pour supprimer
- Codes HTTP standards (200, 201, 404, 500)

---

## 🎓 Cas d'Usage Principaux

### 1. Gestion des Projets
- Un étudiant crée un projet
- Un encadrant est assigné
- Suivi du statut et de la progression

### 2. Soumissions
- L'étudiant soumet des livrables
- L'encadrant évalue et donne un feedback
- Attribution de notes

### 3. Réunions
- Planification de réunions
- Notes de réunion
- Historique des rencontres

### 4. Communication
- Messages entre étudiant et encadrant
- Notifications automatiques
- Système de messagerie intégré

### 5. Évaluation
- Grille d'évaluation structurée
- Note finale calculée
- Commentaires détaillés

---

## 🔮 Évolutions Futures

### Phase 2
- Frontend Angular complet
- Authentification JWT
- Upload de fichiers
- Notifications en temps réel (SignalR)

### Phase 3
- Rapports et statistiques
- Export PDF
- Calendrier intégré
- Dashboard analytics

### Phase 4
- Application mobile
- Intégration email
- Système de rappels
- API publique

---

## 📚 Ressources et Documentation

### Technologies Utilisées
- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core)
- [Entity Framework Core](https://docs.microsoft.com/ef/core)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Swagger/OpenAPI](https://swagger.io/docs/)

### Bonnes Pratiques
- RESTful API Design
- Clean Code Principles
- SOLID Principles
- Repository Pattern (recommandé pour futures améliorations)

---

**Document créé le:** 01/12/2025
**Version:** 1.0
**Auteur:** Projet Encadri
**Technologies:** ASP.NET Core 6.0 + MySQL + Entity Framework Core
