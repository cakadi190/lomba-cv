/* groovylint-disable CompileStatic */
// Jenkins Pipeline DSL is evaluated dynamically by Jenkins, so static compilation is inapplicable.

void deployImage() {
  withCredentials([
    file(credentialsId: env.ENV_FILE_CRED_ID, variable: 'ENV_FILE'),
    sshUserPrivateKey(credentialsId: env.DEPLOY_SSH_CRED_ID, keyFileVariable: 'SSH_KEY')
  ]) {
    sh """#!/usr/bin/env bash
      scp -o StrictHostKeyChecking=accept-new -i "\$SSH_KEY" ${IMAGE_ARCHIVE} ${DEPLOY_HOST}:${DEPLOY_PATH}/${IMAGE_ARCHIVE}
      scp -o StrictHostKeyChecking=accept-new -i "\$SSH_KEY" "\$ENV_FILE" ${DEPLOY_HOST}:${DEPLOY_PATH}/.env
      scp -o StrictHostKeyChecking=accept-new -i "\$SSH_KEY" compose.yaml ${DEPLOY_HOST}:${DEPLOY_PATH}/compose.yaml
      scp -o StrictHostKeyChecking=accept-new -i "\$SSH_KEY" scripts/deploy-bluegreen.sh ${DEPLOY_HOST}:${DEPLOY_PATH}/deploy-bluegreen.sh
      scp -o StrictHostKeyChecking=accept-new -i "\$SSH_KEY" deploy/nginx/cakadi.web.id.conf ${DEPLOY_HOST}:${DEPLOY_PATH}/cakadi.web.id.conf

      ssh -o StrictHostKeyChecking=accept-new -i "\$SSH_KEY" ${DEPLOY_HOST} bash -c '
        set -e
        cd ${DEPLOY_PATH}
        gunzip -c ${IMAGE_ARCHIVE} | docker load
        chmod +x deploy-bluegreen.sh

        NGINX_SITE_FILE="\${NGINX_SITE_FILE:-/etc/nginx/sites-available/cakadi.web.id}"
        if [ ! -f "\$NGINX_SITE_FILE" ]; then
          echo "==> Provisioning Nginx site \$NGINX_SITE_FILE (first deploy)"
          cp cakadi.web.id.conf "\$NGINX_SITE_FILE"
          ln -sf "\$NGINX_SITE_FILE" /etc/nginx/sites-enabled/cakadi.web.id
          nginx -t
          systemctl reload nginx
        fi

        ./deploy-bluegreen.sh ${DEPLOY_PATH}
        rm -f ${IMAGE_ARCHIVE} cakadi.web.id.conf
        docker image prune -f
      '
    """
  }
}

pipeline {
  agent any

  options {
    disableConcurrentBuilds()
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }

  environment {
    IMAGE_NAME     = 'lombacv'
    IMAGE_TAG      = 'latest'
    IMAGE_ARCHIVE  = "${IMAGE_NAME}-${env.BUILD_NUMBER}.tar.gz"

    // Kredensial SSH (Jenkins: "SSH Username with private key")
    DEPLOY_SSH_CRED_ID = 'lombacv-deploy-server-ssh'
    // Kredensial file .env produksi (Jenkins: "Secret file")
    ENV_FILE_CRED_ID = 'lombacv-env'
    // Server tujuan — sama dengan vettrak (satu VPS, satu mongod native)
    DEPLOY_HOST = 'root@103.235.72.17'
    // Folder di server yang berisi compose.yaml untuk service ini
    DEPLOY_PATH = '/www/lombacv'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        sh "docker build --pull --tag ${IMAGE_NAME}:${IMAGE_TAG} ."
      }
    }

    stage('Save Image to Archive') {
      steps {
        sh "docker save ${IMAGE_NAME}:${IMAGE_TAG} | gzip > ${IMAGE_ARCHIVE}"
      }
    }

    stage('Ship & Deploy') {
      steps {
        script {
          deployImage()
        }
      }
    }
  }

  post {
    always {
      sh "rm -f ${IMAGE_ARCHIVE}"
      sh "docker image rm ${IMAGE_NAME}:${IMAGE_TAG} || true"
    }
  }
}
