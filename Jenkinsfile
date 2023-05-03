pipeline {
    agent any

    stages {
        stage('Git pull'){
            steps {
                git branch: 'main', credentialsId: 'Github_Jenkins', url: 'git@github.com:TstTeam/docker-pipeline-test.git'
            }
        }
        stage('Stop docker container that running and remove docker image') {
            steps {
               script {
                   try {
                        sh 'docker container stop wdio-testing'
                    }catch(Exception e1) {
                        println("wdio-testing container is not running")
                    }
                    try { 
                        sh 'docker image rm wdio-testing'
                    }catch(Exception e1) {
                        println("wdio-testing image is not found")
                    }
               }
            }
        }
        stage('Build docker image from wdio-testing repository') {
            steps{
                sh 'docker build -t wdio-testing -f docker/Dockerfile .'
            }
        }
        stage('Running wdio-testing image') {
             steps{
              sh 'docker run --rm -d --name wdio-testing --network host wdio-testing'
            }
        }
    }
}
