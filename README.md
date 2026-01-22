# STEMulate Quiz App

 An interactive science and math platform designed for ESL learners, combining engaging UI with real-time data, personalization, and user-friendly design. 

 Live Demo: netlify link
 Screenshots:2-4 images 

 # Why this project matters
 STEmulate quiz is designed to encourage regular practice, helping learners build confidence in science and math over time. 

 As a Grade 8 Math & Science teacher, I built this app to:
 -support ESL students with clear language and feedback
 -help learners practice science & math concepts interactively
 -demonstrate how front-end development can solve real classroom problems

 This project reflects my interest in EdTech, accessible UI, and learner-centered design. 

 # Features
 **User authentication** : Secure sign up, log in and log out using Firebase Authentication. 
 **Customizable Quizzes** : Users can select the topic, difficulty level, and number of questions before starting a quiz. 
 **Score Tracking** : Quiz results are displayed at the end of each session. 
 **Responsive Design** : Fully responsive layout optimized for mobile, tablet, and desktop using Tailwind CSS. 
 **Global State Management** : Application state is managed with Zustand for clean, predictable, and scalable state handling.  

 # Teach Stack
 **Frontend** : React, Vite, Tailwind CSS
 **State Management** : Zustand
 **Backend / Baas** : Firebase (Authentication, Firestore)
 **API** : Open Trivia Database (OpenTDB)
 **Routing** : React Router
 
 # What I learned
 Managing **global state** with Zustand to avoid prop drilling
 Structuring a React application for **clarity and scalability**
 Integrating **Firebase Authentication + Firestore** into a front-end app
 Designing user interfaces for **ESL learners and educators**
 Handling **async data**, loading states, and error states effectively

 # Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/matshidisolp/stemulate-quiz.git
cd stemulate-quiz

2️⃣ Install dependencies
npm install

3️⃣ Environment variables
Create a .env file in the root directory using the template below:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

4️⃣ Run the app
npm run dev

# Future Improvements
Custom quiz creation for teachers
Accessibility improvements (screen reader support)
Offline quiz mode

# About the developer
I'm a Math and Science teacher turned Front-End Developer, passionate about building accessible, meaningful EdTech tools that support real classroom learning. 

Front-end focus: React, Zustand, Tailwind CSS
Education background: Secondary school Math & Science
Interests: EdTech, curriculum-aligned platforms, learner-centered UI
    
    Matshidiso Pitswane
    LinkedIn: https://www.linkedin.com/in/matshidiso-pitswane/
    Github:   https://github.com/matshidisolp




