# NusaL-CC
Bangkit 2022 Product-based Capstone Project - NusaL - CC

This is Cloud Computing repository for NusaL application.

# Introduction
NusaL is an Android application supported with a REST API using the ExpressJs Framework for Node.js and MongoDB as the database to **store the user data**. This API is then being deployed using Google App Engine (GAE) with its database (MongoDB) using a Virtual Machine from Google Compute Engine (GCE).

# Deployment
* **Google Cloud Platform (GCP)**
  * **Prerequisites** 
    <br>
    Here are several points to consider before proceeding:
    * Install or update to the latest version of the **Google Cloud CLI**
    * Set a default region and zone `asia-southeast2-a`
    * Enable **Compute Engine** and **App Engine** APIs 
      <br><br>
  * **Google Compute Engine (GCE)** 
      <br>
      * **Create Virtual Machine (VM)**
          <br>
          Before deploying the application to cloud, we have to make sure that we have the database ready—where in this case we are using MongoDB. To achieve this, we are using GCE to initiate a Virtual Machine (VM) that will run on cloud. 
          <br><br>
          To initiate a VM,
           * On GCP console, go to **Navigation Menu -> Compute Engine -> VM instances**
           * Click on **Create Instance**
           * Specify a VM name `mongo-nusal`
           * Use the previously set region and zone `asia-southeast2-a`
           * Select Machine Configuration using series `E2` and machine type `e2-medium` 
             <br>
             > Since need it for general purposes only, E2 machines offers a good balance of price and performance, and are suitable for a wide variety of common workloads including databases.
           * In the **Boot disk** section, click **Change**, and then do the following:
             * On the Public images tab, choose the following:
         
         * Operating System `Ubuntu`
                * OS version `18.04`
                * Boot disk type `Balanced persistent disk`
                * Boot disk size `10GB`
           * Allow both `HTTP Traffic` and `HTTPS Traffic` Firewalls
           * Click on the **Management, security, disks, sole tenancy** section, go to the **Networking** tab and do the following:
             1. Add a new network tag `mongo`
             2. On **Network Interfaces**, edit the `default` and make sure its external IP address is **Ephemeral** 
           * Leave everything else as default
           * Click **Create** instance
         <br><br>
     * **Create Firewall**
         <br>
         After Creating the VM, we have to make another Firewall is response to the `mongo` network tag to enable a default port number for MongoDB instances.
         <br><br>
         To create a new Firewall,
          * On GCP console, go to **Navigation Menu -> VPC Networks -> Firewall**
          * Click on **Create Firewall**
          * Specify a Firewall name `default-mongo-port`
          * Set target tags `mongo`
          * Set source IP ranges `0.0.0.0/0`
          * In the **Protocols and ports** section, Click on **Specified protocols and ports** and do the following:
            - Check `tcp`
            - Set the port number to be `27017`
               > Port 27017 is the default port number for mongod and mongos instances
          <br>
  * **Google App Engine (GAE)**
    <br>
    The Google App Engine (GAE) is a Platform-as-a-Service (PaaS) is a GCP service used to deploy the REST API that has been previously configured using the ExpressJs and many other dependencies. Unlike GCE or Kubernetes Engines, GAE offers the flexibility to focus on other concurrent web applications and processes without the need to configure the architecture of the instance. Using the previously created and deployed virtual machine `mongo-nusal`, we will use the **External IP Address** for GAE to access the MongoDB.
    <br><br>
    To deploy an application through GAE,
    * On GCP console, go to **Navigation Menu -> App Engine**
    * Click **Create Application**
    * Activate **Cloud Shell**
    * Clone NusaL-CC git repository
      ````
      git clone https://github.com/Bangkit-2022-NusaL/NusaL-CC.git
      ````
    * Go to the NusaL-CC folder
      ````
      cd NusaL-CC
      ````
    * Make sure that you have a `app.yaml` file using the `ls` command on **Cloud Shell**
    * Example app.yaml file
      ````
      runtime: nodejs14

      env_variables:
        JWT_KEY: "secret"
        MONGO_PW: "database_password"
        EMAIL_PW: "email_password"
      ````
     * Deploy app to App Engine
       ```
       gcloud app deploy
       ```
     * If any prompt shown press `Y` and click enter
     * View Deployed App after successfully deployed
       ```
       gcloud app browse
       ```

# Library
Libraries used for developing NusaL :
* ExpressJs
* Mongoose
* bcrypt
* Embedded JavaScript (EJS)
* Jsonwebtoken (JWT)
* Nodemailer
* Nodemon
* SwaggerUI - Express

# API Endpoint
* App Engine Backend:
  * https://nusal-352008.et.r.appspot.com
* Swagger 3.0 API Documentation and Testing can be accessed here:
  * https://nusal-352008.et.r.appspot.com/api-docs/

# API List
## User Sign Up
- URL
  - /user/signup
- Method
  - POST
- Request body
  - name (string)
  - email (string)
  - password (string)
- Response
```
{
    "message": "string",
}
```

## User Login
- URL
  - /user/login
- Method
  - POST
- Request body
  - email (string)
  - password (string)
- Response
```
{
    "message": "string",
}
```

## User Delete
- URL
  - /user/{userId}
- Method
  - DELETE
- Parameter
  - userId (string)
- Request Header
  - Authorization (JWT Token)
- Response
```
{
    "message": "string",
}
```

## Password Reset Request
- URL
  - /password-reset
- Method
  - POST
- Request body
  - email (string)
  - password (string)
- Response
```
{
    "message": "string",
}
```
- Reset Link sent to email
<img src=https://storage.googleapis.com/nusal_resource/readme_cc/reset_email_ken.jpeg>

## Password Reset Confirmation
- URL
  - /password-reset/{userId}/{token}/{encryptedPassword}
- Method
  - GET
- Parameter
  - userId (string)
  - token (string) *One Time Use*
  - encryptedPassword (string)
- Response
```
<html>HTML page</html>
```
- Example Page
<img src=https://storage.googleapis.com/nusal_resource/readme_cc/reset_confirm.jpeg>

## Password Reset Completed
- URL
  - /password-reset/{userId}/{token}/{encryptedPassword}
- Method
  - POST
- Parameter
  - userId (string)
  - token (string) *One Time Use*
  - encryptedPassword (string)
- Response
```
{
    "message": "string",
}
```
```
<html>HTML page</html>
```
- Example Page
<img src=https://storage.googleapis.com/nusal_resource/readme_cc/reset_success.jpg>

## Swagger 3.0 API Documentation
- URL
  - /api-docs
- Method
  - GET
- Response
```
<html>HTML page</html>
```
- Example Page
<img src=https://storage.googleapis.com/nusal_resource/readme_cc/swagger.jpg>
