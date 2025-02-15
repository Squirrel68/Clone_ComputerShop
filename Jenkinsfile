pipeline {
    agent { label 'dev-server' }
    
    environment {
        appUser = "computer"
        appName = "computer-app"
        buildScript = "npm install"
        runScript = "nohup npm start &"
        createEnvFile = "echo -e 'PORT=6868\\nDATABASE=mongodb+srv://constantlypeaceinside:tZ1buG5ZEI4t7jH2@cluster0.q3ydroc.mongodb.net/tmobile\\nSESSION_KEY=secretkey\\nVIEW_ENGINE=ejs' > config.env"
        deployDir = "/var/www/${appName}"   
        backupDir = "/var/www/${appName}_backup" 
        versionFile = "/var/www/${appName}/VERSION" 
        timestamp = sh(script: "date +%Y%m%d%H%M%S", returnStdout: true).trim()
    }
    
    stages {
        stage('Build') {
            steps {
                sh(script: """ ${buildScript} """, label: "Install dependencies")
            }
        }
        
        stage('Backup Old Version') {
            steps {
                sh """
                    if [ -d ${deployDir} ]; then
                        echo "Backing up old version..."
                        mkdir -p ${backupDir}
                        tar -czf ${backupDir}/${appName}_${timestamp}.tar.gz -C ${deployDir} .
                        echo "Backup done: ${backupDir}/${appName}_${timestamp}.tar.gz"
                    fi
                """
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    echo "Deploying new version..."
                    rm -rf ${deployDir}
                    mkdir -p ${deployDir}
                    cp -r * ${deployDir}
                    cd ${deployDir}
                    ${createEnvFile}
                    ${runScript}
                    echo ${timestamp} > ${versionFile}
                """
            }
        }
    }
    
    post {
        success {
            echo "✅ Deployment successful!"
        }
        
        failure {
            echo "❌ Deployment failed! Rolling back..."
            sh """
                if [ -f ${backupDir}/${appName}_${timestamp}.tar.gz ]; then
                    rm -rf ${deployDir}
                    mkdir -p ${deployDir}
                    tar -xzf ${backupDir}/${appName}_${timestamp}.tar.gz -C ${deployDir}
                    echo "Rollback to previous version done!"
                else
                    echo "No backup found, rollback failed!"
                fi
            """
        }
    }
}
