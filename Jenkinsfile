pipeline {
    agent {
        label 'dev-server'
    }
pipeline {
    agent {
        label 'lab-server'
    }
    environment {
        appUser = "computer"
        appName = "computer-app"
        buildScript = "npm install"
        runScript = "npm start"
    }
    stages {
        stage('build') {
            steps {
                sh(script: """ ${buildScript} """, label: "build with npm")
            }
        }
        stage('deploy') {
            steps {
                sh(script: """ ${runScript} """, label: "run with npm")
            }
        }
    }
}

}
