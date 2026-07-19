pipeline {
    agent any

    // Defining environment variables explicitly
    environment {
        FRONTEND_PORT = '3001'
        // This tells Jenkins not to kill PM2 processes after the job ends
        JENKINS_NODE_COOKIE = 'dontKillMe' 
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out features branch from Git...'
                git branch: 'features', url: 'https://github.com/apanaTimeWeb/library-management.git'
            }
        }

        // ==========================================
        // FRONTEND STAGES (Next.js)
        // ==========================================
        stage('Frontend: Install & Build') {
            steps {
                dir('libraryManagementFrontendNextJs/my-app') {
                    echo 'Installing Next.js dependencies...'
                    sh 'npm install'
                    
                    echo 'Building Next.js for production...'
                    sh 'npm run build' 
                }
            }
        }

        stage('Deploy: Frontend (PM2)') {
            steps {
                dir('libraryManagementFrontendNextJs/my-app') {
                    echo "Deploying Next.js Frontend to PM2 on Port ${FRONTEND_PORT}..."
                    // PORT variable forces Next.js to run on port 3001
                    sh 'PORT=$FRONTEND_PORT pm2 restart library-frontend || PORT=$FRONTEND_PORT pm2 start npm --name "library-frontend" -- run start'
                }
            }
        }

        // ==========================================
        // SAVE SERVER STATE
        // ==========================================
        stage('Save PM2 State') {
            steps {
                echo 'Saving PM2 process list so they auto-start on server reboot...'
                sh 'pm2 save'
            }
        }
    }
}
