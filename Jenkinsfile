pipeline {
    agent {
        label 'dev-server'
    }
    environment {
        appUser = "computer"
        appName = "computer-app"
        buildScript = "npm install"
        runScript = "npm start"
        createEnvFile = "echo -e 'PORT=6868\\nDATABASE=mongodb+srv://constantlypeaceinside:tZ1buG5ZEI4t7jH2@cluster0.q3ydroc.mongodb.net/tmobile\\nSESSION_KEY=secretkey\\nVIEW_ENGINE=ejs' > config.env"
    }
    stages {
        stage('Build') {
            steps {
                sh(script: """ ${buildScript} """, label: "Install dependencies")
            }
        }
        stage('Deploy') {
            steps {
                sh(script: """ ${createEnvFile} """, label: "Create .env file")
                sh(script: """ ${runScript} """, label: "Start application")
            }
        }
    }
}
