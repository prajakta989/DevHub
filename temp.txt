pipeline{
    agent any 
    tools {
        nodejs "NODEJS18"
    }

    stages{
        stage('checkout code'){
            steps{
                git "https://github.com/prajakta989/DevHub.git"
            }
        }
        stage('install dependancies'){
            steps{
                sh 'npm install'
            }
        }

        stage('Build step'){
            steps{
                sh 'npm run build || echo "No build step"'
            }
        }
    }
}