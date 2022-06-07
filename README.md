# NusaL-CC
Bangkit 2022 Product-based Capstone Project - NusaL - CC

This is Cloud Computing repository for NusaL application.

# Introduction
NusaL is an Android application supported with a REST API using the ExpressJs Framework for Node.js and MongoDB as the database. This API is then being deployed using Google App Engine (GAE) with its database (MongoDB) using a Virtual Machine from Google Compute Engine (GCE).

# Deployment
* **Google Cloud Platform (GCP)**
  * **Prerequisites** <br>
    Here are several points to consider before proceeding:
   * Install or update to the latest version of the **Google Cloud CLI**
   * Set a default region and zone `asia-southeast2-a`
   * Enable **Compute Engine** and **App Engine** APIs
    <br>
  * **Google Compute Engine (GCE)** <br>
      Before deploying the application to cloud, we have to make sure that we have the database ready—where in this case we are using MongoDB. To achieve this, we are using GCE to initiate a Virtual Machine (VM) that will run on cloud. <br>
      To initiate a VM,
     * On GCP console, go to **Navigation Menu -> Compute Engine -> VM instances**
      * Click on **Create Instance**
      * Specify a VM name `mongo-nusal`
      * Use the previously set region and zone `asia-southeast2-a`
      * Select Machine Configuration using series `E2` and machine type `e2-medium` <br>
        > Since need it for general purposes only, E2 machines offers a good balance of price and performance, and are suitable for a wide variety of common workloads including databases.
      * In the **Boot disk** section, click **Change**, and then do the following:
        1. On the Public images tab, choose the following:
         * Operating System `Ubuntu`
         * OS version `18.04`
         * Boot disk type `Balanced persistent disk`
         * Boot disk size `10GB`
        2. For advanced configuration options, click **Show advanced configuration**
         
    <br>
  * **Google App Engine (GAE)**
 
* **Heroku: Cloud Application Platform**

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
