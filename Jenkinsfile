pipeline {
    agent {
        label 'dev-server'
    }
    environment {
        appUser = "computer"
        appName = "computer-app"
        buildScript = "npm install"
        runScript = "npm start"
        createEnvFile = "echo 'DATABASE=mongodb+srv://constantlypeaceinside:tZ1buG5ZEI4t7jH2@cluster0.q3ydroc.mongodb.net/tmobile  SESSION_KEY=secretkey  VIEW_ENGINE=ejs' > .env"
    }
    stages {
        stage('build') {
            steps {
                sh(script: """ ${buildScript} """, label: "build with npm")
            }
        }
        stage('deploy') {
            steps {
                sh(script: """ ${createEnvFile} """, label: "create .env file")
                sh(script: """ ${runScript} """, label: "run with npm")
            }
        }
    }
}