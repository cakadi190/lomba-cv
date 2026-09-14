/* groovylint-disable CompileStatic */
// Jenkins Pipeline DSL is evaluated dynamically by Jenkins, so static compilation is inapplicable.

void deployImage() {
  withCredentials([
    file(credentialsId: env.ENV_FILE_CRED_ID, variable: 'ENV_FILE'),
    sshUserPrivateKey(credentialsId: env.DEPLOY_SSH_CRED_ID, keyFileVariable: 'SSH_KEY')
  ]) {
    sh """#!/usr/bin/env bash
      set -euo pipefail

      SSH_OPTS=(-o StrictHostKeyChecking=accept-new -o ConnectTimeout=10 -o ConnectionAttempts=3 -o ServerAliveInterval=15 -o ServerAliveCountMax=3 -i "\$SSH_KEY")

      scp_retry() {
        local src="\$1" dest="\$2" attempt delay
        local delays=(5 15 30 60)
        for attempt in 1 2 3 4 5; do
          if scp "\${SSH_OPTS[@]}" "\$src" "\$dest"; then
            return 0
          fi
          if [ "\$attempt" -eq 5 ]; then
            break
          fi
          delay="\${delays[\$((attempt - 1))]}"
          echo "scp failed (attempt \$attempt/5) for \$src -> \$dest, retrying in \${delay}s..." >&2
          sleep "\$delay"
        done
        echo "scp failed after 5 attempts for \$src -> \$dest" >&2
        return 1
      }

      scp_retry ${IMAGE_ARCHIVE} ${DEPLOY_HOST}:${DEPLOY_PATH}/${IMAGE_ARCHIVE}
      scp_retry "\$ENV_FILE" ${DEPLOY_HOST}:${DEPLOY_PATH}/.env
      scp_retry compose.yaml ${DEPLOY_HOST}:${DEPLOY_PATH}/compose.yaml
      scp_retry scripts/deploy-bluegreen.sh ${DEPLOY_HOST}:${DEPLOY_PATH}/deploy-bluegreen.sh
      scp_retry deploy/nginx/cakadi.web.id.conf ${DEPLOY_HOST}:${DEPLOY_PATH}/cakadi.web.id.conf

      ssh "\${SSH_OPTS[@]}" ${DEPLOY_HOST} bash -c '
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
    DEPLOY_HOST = 'root@103.245.39.22'
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

    stage('Debug Network') {
      steps {
        sh '''
          echo "NODE_NAME=${NODE_NAME}"
          hostname
          timeout 5 bash -c "cat < /dev/null > /dev/tcp/103.245.39.22/22" && echo "PORT OPEN" || echo "PORT TIMEOUT"
        '''
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
