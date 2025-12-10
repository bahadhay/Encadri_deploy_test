# 🧪 Guide de Tests Swagger - Projet Encadri

## 📋 Table des Matières
1. [Accès à Swagger](#accès-à-swagger)
2. [Tests Authentication](#1-authentication-apiauth)
3. [Tests Projects](#2-projects-apiprojects)
4. [Tests Submissions](#3-submissions-apisubmissions)
5. [Tests Meetings](#4-meetings-apimeetings)
6. [Tests Evaluations](#5-evaluations-apievaluations)
7. [Tests Messages](#6-messages-apimessages)
8. [Tests Notifications](#7-notifications-apinotifications)
9. [Tests Milestones](#8-milestones-apimilestones)
10. [Scénario de Test Complet](#scénario-de-test-complet)

---

## 🌐 Accès à Swagger

### URLs Disponibles
- **HTTP:** http://localhost:5040
- **HTTPS:** https://localhost:7225

### Comment Tester
1. Ouvrir le navigateur
2. Aller sur http://localhost:5040
3. Voir tous les endpoints disponibles
4. Cliquer sur un endpoint → "Try it out" → Entrer les données → "Execute"

---

## 1. Authentication (`/api/Auth`)

### ✅ Test 1.1: Inscription d'un Étudiant

**Endpoint:** `POST /api/Auth/register`

**JSON à utiliser:**
```json
{
  "email": "etudiant1@example.com",
  "fullName": "Ahmed Benali",
  "userRole": "student",
  "password": "password123"
}
```

**Résultat attendu:**
- Code: `200` ou `201`
- Retourne l'utilisateur créé (sans le mot de passe)

---

### ✅ Test 1.2: Inscription d'un Encadrant

**Endpoint:** `POST /api/Auth/register`

**JSON à utiliser:**
```json
{
  "email": "prof.supervisor@example.com",
  "fullName": "Dr. Sara Alami",
  "userRole": "supervisor",
  "password": "supervisor123"
}
```

**Résultat attendu:**
- Code: `200` ou `201`
- Utilisateur encadrant créé

---

### ✅ Test 1.3: Login

**Endpoint:** `POST /api/Auth/login`

**JSON à utiliser:**
```json
{
  "email": "etudiant1@example.com",
  "password": "password123"
}
```

**Résultat attendu:**
- Code: `200`
- Retourne un token et les infos utilisateur

---

### ✅ Test 1.4: Obtenir l'utilisateur actuel

**Endpoint:** `GET /api/Auth/me`

**Aucun paramètre requis**

**Résultat attendu:**
- Code: `200`
- Retourne les infos du premier utilisateur

---

## 2. Projects (`/api/Projects`)

### ✅ Test 2.1: Créer un Projet PFE

**Endpoint:** `POST /api/Projects`

**JSON à utiliser:**
```json
{
  "title": "Développement d'une plateforme e-learning",
  "type": "PFE",
  "description": "Création d'une plateforme complète de formation en ligne avec Angular et ASP.NET Core",
  "studentEmail": "etudiant1@example.com",
  "studentName": "Ahmed Benali",
  "supervisorEmail": "prof.supervisor@example.com",
  "supervisorName": "Dr. Sara Alami",
  "status": "in_progress",
  "company": "TechnoSoft",
  "progressPercentage": 30
}
```

**Résultat attendu:**
- Code: `201`
- Projet créé avec ID généré

---

### ✅ Test 2.2: Créer un Projet PFA

**Endpoint:** `POST /api/Projects`

**JSON à utiliser:**
```json
{
  "title": "Application mobile de gestion de tâches",
  "type": "PFA",
  "description": "Développement d'une application mobile native avec React Native",
  "studentEmail": "etudiant1@example.com",
  "studentName": "Ahmed Benali",
  "supervisorEmail": "prof.supervisor@example.com",
  "supervisorName": "Dr. Sara Alami",
  "status": "proposed",
  "progressPercentage": 0
}
```

**Résultat attendu:**
- Code: `201`
- Nouveau projet PFA créé

---

### ✅ Test 2.3: Créer un Stage

**Endpoint:** `POST /api/Projects`

**JSON à utiliser:**
```json
{
  "title": "Stage en développement web full-stack",
  "type": "Internship",
  "description": "Stage de 3 mois chez une startup technologique",
  "studentEmail": "etudiant1@example.com",
  "studentName": "Ahmed Benali",
  "supervisorEmail": "prof.supervisor@example.com",
  "supervisorName": "Dr. Sara Alami",
  "status": "in_progress",
  "company": "StartupHub",
  "startDate": "2025-06-01T00:00:00",
  "endDate": "2025-08-31T00:00:00",
  "progressPercentage": 50
}
```

**Résultat attendu:**
- Code: `201`
- Stage créé avec dates

---

### ✅ Test 2.4: Lister tous les Projets

**Endpoint:** `GET /api/Projects`

**Paramètres optionnels:**
- `userEmail`: Filtrer par email utilisateur
- `status`: Filtrer par statut

**Résultat attendu:**
- Code: `200`
- Liste de tous les projets

---

### ✅ Test 2.5: Obtenir un Projet par ID

**Endpoint:** `GET /api/Projects/{id}`

**Note:** Utilisez l'ID d'un projet créé précédemment

**Résultat attendu:**
- Code: `200`
- Détails du projet

---

### ✅ Test 2.6: Mettre à jour un Projet

**Endpoint:** `PUT /api/Projects/{id}`

**JSON à utiliser:**
```json
{
  "title": "Développement d'une plateforme e-learning (Mise à jour)",
  "type": "PFE",
  "description": "Plateforme e-learning avec gamification et IA",
  "studentEmail": "etudiant1@example.com",
  "studentName": "Ahmed Benali",
  "supervisorEmail": "prof.supervisor@example.com",
  "supervisorName": "Dr. Sara Alami",
  "status": "in_progress",
  "company": "TechnoSoft",
  "progressPercentage": 75
}
```

**Résultat attendu:**
- Code: `200`
- Projet mis à jour

---

### ✅ Test 2.7: Supprimer un Projet

**Endpoint:** `DELETE /api/Projects/{id}`

**Résultat attendu:**
- Code: `204` (No Content)
- Projet supprimé

---

## 3. Submissions (`/api/Submissions`)

### ✅ Test 3.1: Créer une Soumission - Rapport

**Endpoint:** `POST /api/Submissions`

**JSON à utiliser:**
```json
{
  "projectId": "REMPLACER_PAR_ID_PROJET",
  "title": "Rapport de conception",
  "description": "Document détaillant l'architecture et la conception du système",
  "type": "report",
  "fileUrl": "https://drive.google.com/file/d/rapport-conception.pdf",
  "submittedBy": "etudiant1@example.com",
  "status": "pending",
  "dueDate": "2025-12-15T23:59:59"
}
```

**Résultat attendu:**
- Code: `201`
- Soumission créée

---

### ✅ Test 3.2: Créer une Soumission - Code Source

**Endpoint:** `POST /api/Submissions`

**JSON à utiliser:**
```json
{
  "projectId": "REMPLACER_PAR_ID_PROJET",
  "title": "Code source du backend",
  "description": "API REST complète développée avec ASP.NET Core",
  "type": "code",
  "fileUrl": "https://github.com/username/projet-backend",
  "submittedBy": "etudiant1@example.com",
  "status": "pending",
  "dueDate": "2025-12-20T23:59:59"
}
```

**Résultat attendu:**
- Code: `201`
- Code source soumis

---

### ✅ Test 3.3: Créer une Soumission - Présentation

**Endpoint:** `POST /api/Submissions`

**JSON à utiliser:**
```json
{
  "projectId": "REMPLACER_PAR_ID_PROJET",
  "title": "Présentation finale du projet",
  "description": "Slides PowerPoint pour la soutenance",
  "type": "presentation",
  "fileUrl": "https://drive.google.com/file/d/presentation-finale.pptx",
  "submittedBy": "etudiant1@example.com",
  "status": "pending",
  "dueDate": "2025-12-25T23:59:59"
}
```

**Résultat attendu:**
- Code: `201`
- Présentation soumise

---

### ✅ Test 3.4: Lister les Soumissions d'un Projet

**Endpoint:** `GET /api/Submissions?projectId={id}`

**Résultat attendu:**
- Code: `200`
- Liste des soumissions du projet

---

### ✅ Test 3.5: Mettre à jour une Soumission (Évaluation)

**Endpoint:** `PUT /api/Submissions/{id}`

**JSON à utiliser:**
```json
{
  "projectId": "REMPLACER_PAR_ID_PROJET",
  "title": "Rapport de conception",
  "description": "Document détaillant l'architecture et la conception du système",
  "type": "report",
  "fileUrl": "https://drive.google.com/file/d/rapport-conception.pdf",
  "submittedBy": "etudiant1@example.com",
  "status": "approved",
  "feedback": "Excellent travail! Architecture bien pensée et documentation claire.",
  "grade": 18.5,
  "dueDate": "2025-12-15T23:59:59"
}
```

**Résultat attendu:**
- Code: `200`
- Soumission évaluée

---

## 4. Meetings (`/api/Meetings`)

### ✅ Test 4.1: Planifier une Réunion

**Endpoint:** `POST /api/Meetings`

**JSON à utiliser:**
```json
{
  "projectId": "REMPLACER_PAR_ID_PROJET",
  "title": "Réunion de suivi hebdomadaire",
  "scheduledAt": "2025-12-10T14:00:00",
  "durationMinutes": 60,
  "location": "Bureau 305, Département Informatique",
  "status": "pending",
  "agenda": "- Point sur l'avancement\n- Revue du code\n- Planning de la semaine prochaine",
  "requestedBy": "etudiant1@example.com"
}
```

**Résultat attendu:**
- Code: `201`
- Réunion planifiée

---

### ✅ Test 4.2: Réunion en Ligne

**Endpoint:** `POST /api/Meetings`

**JSON à utiliser:**
```json
{
  "projectId": "REMPLACER_PAR_ID_PROJET",
  "title": "Revue de mi-parcours",
  "scheduledAt": "2025-12-12T10:00:00",
  "durationMinutes": 90,
  "location": "Google Meet: https://meet.google.com/abc-defg-hij",
  "status": "confirmed",
  "agenda": "- Présentation des résultats intermédiaires\n- Discussion des difficultés rencontrées\n- Ajustements du planning",
  "requestedBy": "prof.supervisor@example.com"
}
```

**Résultat attendu:**
- Code: `201`
- Réunion en ligne créée

---

### ✅ Test 4.3: Mettre à jour une Réunion (Ajouter des Notes)

**Endpoint:** `PUT /api/Meetings/{id}`

**JSON à utiliser:**
```json
{
  "projectId": "REMPLACER_PAR_ID_PROJET",
  "title": "Réunion de suivi hebdomadaire",
  "scheduledAt": "2025-12-10T14:00:00",
  "durationMinutes": 60,
  "location": "Bureau 305, Département Informatique",
  "status": "completed",
  "agenda": "- Point sur l'avancement\n- Revue du code\n- Planning de la semaine prochaine",
  "notes": "- Base de données bien structurée\n- Besoin d'améliorer la sécurité (JWT)\n- Prochaine réunion: démo du frontend",
  "requestedBy": "etudiant1@example.com"
}
```

**Résultat attendu:**
- Code: `200`
- Notes de réunion ajoutées

---

### ✅ Test 4.4: Lister les Réunions d'un Projet

**Endpoint:** `GET /api/Meetings?projectId={id}`

**Résultat attendu:**
- Code: `200`
- Liste des réunions

---

## 5. Evaluations (`/api/Evaluations`)

### ✅ Test 5.1: Créer une Évaluation Complète

**Endpoint:** `POST /api/Evaluations`

**JSON à utiliser:**
```json
{
  "projectId": "REMPLACER_PAR_ID_PROJET",
  "evaluatorEmail": "prof.supervisor@example.com",
  "evaluatorName": "Dr. Sara Alami",
  "reportQualityScore": 17.5,
  "technicalImplementationScore": 18.0,
  "presentationScore": 16.5,
  "professionalConductScore": 19.0,
  "finalGrade": 17.75,
  "comments": "Excellent projet avec une implémentation technique solide. La documentation est claire et complète. Très bonne présentation orale. L'étudiant a fait preuve de professionnalisme tout au long du projet.",
  "defenseDate": "2025-12-28T09:00:00"
}
```

**Résultat attendu:**
- Code: `201`
- Évaluation créée

---

### ✅ Test 5.2: Évaluation Partielle (En cours)

**Endpoint:** `POST /api/Evaluations`

**JSON à utiliser:**
```json
{
  "projectId": "REMPLACER_PAR_ID_PROJET",
  "evaluatorEmail": "prof.supervisor@example.com",
  "evaluatorName": "Dr. Sara Alami",
  "reportQualityScore": 15.0,
  "technicalImplementationScore": 16.0,
  "comments": "Évaluation intermédiaire - Bon travail jusqu'à présent. Continuer sur cette lancée."
}
```

**Résultat attendu:**
- Code: `201`
- Évaluation partielle créée

---

### ✅ Test 5.3: Lister les Évaluations d'un Projet

**Endpoint:** `GET /api/Evaluations?projectId={id}`

**Résultat attendu:**
- Code: `200`
- Liste des évaluations

---

## 6. Messages (`/api/Messages`)

### ✅ Test 6.1: Envoyer un Message (Étudiant → Encadrant)

**Endpoint:** `POST /api/Messages`

**JSON à utiliser:**
```json
{
  "projectId": "REMPLACER_PAR_ID_PROJET",
  "senderEmail": "etudiant1@example.com",
  "senderName": "Ahmed Benali",
  "content": "Bonjour Dr. Alami, j'ai terminé la première version du backend. Pourriez-vous me donner votre avis sur l'architecture choisie? Merci!",
  "isRead": false
}
```

**Résultat attendu:**
- Code: `201`
- Message envoyé

---

### ✅ Test 6.2: Répondre à un Message (Encadrant → Étudiant)

**Endpoint:** `POST /api/Messages`

**JSON à utiliser:**
```json
{
  "projectId": "REMPLACER_PAR_ID_PROJET",
  "senderEmail": "prof.supervisor@example.com",
  "senderName": "Dr. Sara Alami",
  "content": "Bonjour Ahmed, excellent travail! L'architecture est solide. Je vous suggère d'ajouter une couche de services pour séparer la logique métier. Planifions une réunion cette semaine pour en discuter.",
  "isRead": false
}
```

**Résultat attendu:**
- Code: `201`
- Réponse envoyée

---

### ✅ Test 6.3: Message Urgent

**Endpoint:** `POST /api/Messages`

**JSON à utiliser:**
```json
{
  "projectId": "REMPLACER_PAR_ID_PROJET",
  "senderEmail": "etudiant1@example.com",
  "senderName": "Ahmed Benali",
  "content": "URGENT: J'ai rencontré un problème bloquant avec la connexion à la base de données. Pouvez-vous m'aider s'il vous plaît?",
  "isRead": false
}
```

**Résultat attendu:**
- Code: `201`
- Message urgent envoyé

---

### ✅ Test 6.4: Marquer un Message comme Lu

**Endpoint:** `PUT /api/Messages/{id}/read`

**Aucun body requis**

**Résultat attendu:**
- Code: `200`
- Message marqué comme lu

---

### ✅ Test 6.5: Lister les Messages d'un Projet

**Endpoint:** `GET /api/Messages?projectId={id}`

**Résultat attendu:**
- Code: `200`
- Liste des messages (ordonnés par date)

---

## 7. Notifications (`/api/Notifications`)

### ✅ Test 7.1: Notification - Nouveau Projet

**Endpoint:** `POST /api/Notifications`

**JSON à utiliser:**
```json
{
  "userEmail": "prof.supervisor@example.com",
  "title": "Nouveau projet assigné",
  "message": "Vous avez été assigné comme encadrant pour le projet 'Plateforme e-learning' de Ahmed Benali",
  "type": "info",
  "isRead": false,
  "link": "/projects/REMPLACER_PAR_ID_PROJET",
  "priority": "medium"
}
```

**Résultat attendu:**
- Code: `201`
- Notification créée

---

### ✅ Test 7.2: Notification - Soumission en Attente

**Endpoint:** `POST /api/Notifications`

**JSON à utiliser:**
```json
{
  "userEmail": "prof.supervisor@example.com",
  "title": "Nouvelle soumission à évaluer",
  "message": "Ahmed Benali a soumis 'Rapport de conception' - En attente de votre évaluation",
  "type": "warning",
  "isRead": false,
  "link": "/submissions/REMPLACER_PAR_ID_SOUMISSION",
  "priority": "high"
}
```

**Résultat attendu:**
- Code: `201`
- Notification d'alerte créée

---

### ✅ Test 7.3: Notification - Réunion Confirmée

**Endpoint:** `POST /api/Notifications`

**JSON à utiliser:**
```json
{
  "userEmail": "etudiant1@example.com",
  "title": "Réunion confirmée",
  "message": "Votre réunion du 10/12/2025 à 14h00 a été confirmée par Dr. Sara Alami",
  "type": "success",
  "isRead": false,
  "link": "/meetings/REMPLACER_PAR_ID_REUNION",
  "priority": "medium"
}
```

**Résultat attendu:**
- Code: `201`
- Notification de succès créée

---

### ✅ Test 7.4: Notification - Erreur Système

**Endpoint:** `POST /api/Notifications`

**JSON à utiliser:**
```json
{
  "userEmail": "etudiant1@example.com",
  "title": "Échec de l'upload",
  "message": "L'upload de votre fichier a échoué. Veuillez réessayer.",
  "type": "error",
  "isRead": false,
  "link": "/submissions/upload",
  "priority": "high"
}
```

**Résultat attendu:**
- Code: `201`
- Notification d'erreur créée

---

### ✅ Test 7.5: Lister les Notifications Non Lues

**Endpoint:** `GET /api/Notifications?userEmail=etudiant1@example.com&isRead=false`

**Résultat attendu:**
- Code: `200`
- Liste des notifications non lues

---

### ✅ Test 7.6: Marquer une Notification comme Lue

**Endpoint:** `PUT /api/Notifications/{id}/read`

**Aucun body requis**

**Résultat attendu:**
- Code: `200`
- Notification marquée comme lue

---

## 8. Milestones (`/api/Milestones`)

### ✅ Test 8.1: Créer un Jalon - Analyse

**Endpoint:** `POST /api/Milestones`

**JSON à utiliser:**
```json
{
  "projectId": "REMPLACER_PAR_ID_PROJET",
  "title": "Phase d'analyse et spécifications",
  "description": "Rédaction du cahier des charges et analyse des besoins",
  "dueDate": "2025-11-30T23:59:59",
  "status": "completed",
  "completedDate": "2025-11-28T18:00:00",
  "order": 1
}
```

**Résultat attendu:**
- Code: `201`
- Jalon créé (complété)

---

### ✅ Test 8.2: Créer un Jalon - Conception

**Endpoint:** `POST /api/Milestones`

**JSON à utiliser:**
```json
{
  "projectId": "REMPLACER_PAR_ID_PROJET",
  "title": "Conception de l'architecture",
  "description": "Modélisation UML, schéma de base de données, architecture système",
  "dueDate": "2025-12-10T23:59:59",
  "status": "completed",
  "completedDate": "2025-12-09T16:30:00",
  "order": 2
}
```

**Résultat attendu:**
- Code: `201`
- Jalon de conception créé

---

### ✅ Test 8.3: Créer un Jalon - Développement Backend

**Endpoint:** `POST /api/Milestones`

**JSON à utiliser:**
```json
{
  "projectId": "REMPLACER_PAR_ID_PROJET",
  "title": "Développement du Backend",
  "description": "API REST avec ASP.NET Core, base de données MySQL, Entity Framework",
  "dueDate": "2025-12-20T23:59:59",
  "status": "in_progress",
  "order": 3
}
```

**Résultat attendu:**
- Code: `201`
- Jalon en cours créé

---

### ✅ Test 8.4: Créer un Jalon - Développement Frontend

**Endpoint:** `POST /api/Milestones`

**JSON à utiliser:**
```json
{
  "projectId": "REMPLACER_PAR_ID_PROJET",
  "title": "Développement du Frontend",
  "description": "Interface utilisateur avec Angular, intégration des API",
  "dueDate": "2026-01-15T23:59:59",
  "status": "pending",
  "order": 4
}
```

**Résultat attendu:**
- Code: `201`
- Jalon à venir créé

---

### ✅ Test 8.5: Créer un Jalon - Tests et Déploiement

**Endpoint:** `POST /api/Milestones`

**JSON à utiliser:**
```json
{
  "projectId": "REMPLACER_PAR_ID_PROJET",
  "title": "Tests et Déploiement",
  "description": "Tests unitaires, tests d'intégration, déploiement sur serveur",
  "dueDate": "2026-01-25T23:59:59",
  "status": "pending",
  "order": 5
}
```

**Résultat attendu:**
- Code: `201`
- Jalon final créé

---

### ✅ Test 8.6: Lister les Jalons d'un Projet

**Endpoint:** `GET /api/Milestones?projectId={id}`

**Résultat attendu:**
- Code: `200`
- Liste des jalons (ordonnés par `order`)

---

### ✅ Test 8.7: Mettre à jour un Jalon (Marquer comme Complété)

**Endpoint:** `PUT /api/Milestones/{id}`

**JSON à utiliser:**
```json
{
  "projectId": "REMPLACER_PAR_ID_PROJET",
  "title": "Développement du Backend",
  "description": "API REST avec ASP.NET Core, base de données MySQL, Entity Framework",
  "dueDate": "2025-12-20T23:59:59",
  "status": "completed",
  "completedDate": "2025-12-19T20:00:00",
  "order": 3
}
```

**Résultat attendu:**
- Code: `200`
- Jalon marqué comme complété

---

## 🎬 Scénario de Test Complet

### Workflow Réaliste: De la Création à l'Évaluation

#### Étape 1: Préparation
1. Créer un étudiant (Test 1.1)
2. Créer un encadrant (Test 1.2)
3. Tester le login (Test 1.3)

#### Étape 2: Création du Projet
4. Créer un projet PFE (Test 2.1)
5. **Noter l'ID du projet** pour les tests suivants

#### Étape 3: Planification
6. Créer 5 jalons (Tests 8.1 à 8.5)
7. Planifier une réunion de lancement (Test 4.1)

#### Étape 4: Communication Initiale
8. Message étudiant → encadrant (Test 6.1)
9. Notification nouvelle assignation (Test 7.1)

#### Étape 5: Travail et Suivi
10. Compléter jalon 1 (Test 8.7)
11. Compléter jalon 2 (Test 8.7)
12. Réunion de suivi avec notes (Test 4.3)

#### Étape 6: Soumissions
13. Soumettre rapport de conception (Test 3.1)
14. Soumettre code source (Test 3.2)
15. Notification nouvelle soumission (Test 7.2)

#### Étape 7: Évaluation
16. Évaluer les soumissions (Test 3.5)
17. Créer évaluation complète (Test 5.1)

#### Étape 8: Finalisation
18. Compléter jalon 3 (Test 8.7)
19. Réunion finale (Test 4.2)
20. Mettre à jour le statut du projet (Test 2.6)

---

## ✅ Checklist de Tests

### Authentication ✓
- [ ] Inscription étudiant
- [ ] Inscription encadrant
- [ ] Login
- [ ] Get current user

### Projects ✓
- [ ] Créer projet PFE
- [ ] Créer projet PFA
- [ ] Créer stage
- [ ] Lister projets
- [ ] Obtenir projet par ID
- [ ] Mettre à jour projet
- [ ] Supprimer projet

### Submissions ✓
- [ ] Créer soumission rapport
- [ ] Créer soumission code
- [ ] Créer soumission présentation
- [ ] Lister soumissions
- [ ] Évaluer soumission

### Meetings ✓
- [ ] Planifier réunion
- [ ] Réunion en ligne
- [ ] Ajouter notes
- [ ] Lister réunions

### Evaluations ✓
- [ ] Créer évaluation complète
- [ ] Créer évaluation partielle
- [ ] Lister évaluations

### Messages ✓
- [ ] Envoyer message
- [ ] Répondre
- [ ] Message urgent
- [ ] Marquer comme lu
- [ ] Lister messages

### Notifications ✓
- [ ] Notification info
- [ ] Notification warning
- [ ] Notification success
- [ ] Notification error
- [ ] Lister non lues
- [ ] Marquer comme lue

### Milestones ✓
- [ ] Créer 5 jalons
- [ ] Lister jalons
- [ ] Marquer comme complété

---

## 📊 Vérification dans phpMyAdmin

Après chaque série de tests:

1. Ouvrir http://localhost/phpmyadmin
2. Sélectionner `encadri_db`
3. Parcourir chaque table:
   - Users → Voir les utilisateurs
   - Projects → Voir les projets
   - Submissions → Voir les soumissions
   - Meetings → Voir les réunions
   - Evaluations → Voir les évaluations
   - Messages → Voir les messages
   - Notifications → Voir les notifications
   - Milestones → Voir les jalons

---

## 🐛 Résolution de Problèmes

### Erreur: "Load failed" dans Swagger
**Solution:** C'est normal, l'API fonctionne. Vérifiez le code de réponse.

### Erreur: "CORS policy"
**Solution:** Backend déjà configuré pour autoriser localhost:5040

### Erreur: "Connection failed"
**Solution:** Vérifier que XAMPP MySQL est démarré

### Erreur: "Duplicate email"
**Solution:** Utiliser un email différent ou changer l'email dans les tests

---

## 📝 Notes Importantes

1. **IDs Dynamiques**: Remplacez `REMPLACER_PAR_ID_PROJET` par l'ID réel du projet créé
2. **Dates**: Utilisez des dates futures pour les échéances
3. **Emails**: Utilisez des emails uniques pour chaque utilisateur
4. **Ordre**: Suivez l'ordre des tests pour un scénario cohérent

---

**Document créé le:** 01/12/2025
**Version:** 1.0
**Pour:** Tests Swagger - Projet Encadri
