#
FROM openjdk:11-jre-slim
WORKDIR /var/jenkins_home/workspace/rnasterpiece/backend
ARG JAR_FILE=build/libs/backend-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","/app.jar"]