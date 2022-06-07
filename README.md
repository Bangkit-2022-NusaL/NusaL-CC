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
             > Since its for general purposes only, E2 machines offers a good balance of price and performance, and are suitable for a wide variety of common workloads including databases.
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
    * On GCP console, go to **Navigation Menu -> Compute Engine -> VM instances**
    * Copy and save the `mongo-nusal` instance **External IP Address**
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
    * Open the **Editor** through the Cloud Shell Window toolbar
    * Set the mongoose.connect in the `app.js` using the `mongo-nusal` instance **External IP Address**. For example:
      ````Javascript
      mongoose.connect('mongodb://nusalUser:'+ process.env.MONGO_PW +'@YOUR_EXTERNAL_IP_ADDRESS:27017/nusal').then(res => console.log("Connected to DB")).catch(err => console.log(err));
      ````
    * On the **Cloud Shell**, deploy GAE
      ````
      gcloud app deploy
      ````
    * Input `y` if necessary
      <br><br>
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
