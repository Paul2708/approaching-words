FROM maven:3.9.4-eclipse-temurin-21-alpine AS builder
WORKDIR /app
COPY ./pom.xml ./pom.xml
COPY ./src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-alpine
WORKDIR /app
COPY --from=builder /app/target/app.jar ./app.jar
CMD ["java", "-jar", "app.jar"]