# fetch-assignment-backend

### After cloning the git repository, open your favorite code editor. 
### Open the terminal and enter the following command to run the Docker file.
1. docker build -t your-image-name .
2. docker run -p 3000:3000 -d your-image-name

### The above steps will create a docker container running on your localhost port 3000

### Now open Postman, and create a new workspace and follow the steps below-
1. For a POST request, we will enter the following path 'http://localhost:3000/receipts/process'
2. In the Body, select raw followed by JSON and paste in the receipt you wish to process.
3. After successfully, running the POST request, you will get a JSON object with a ID generated.
4. Now in a new Postman tab, we will create a GET request.
5. Enter the following path 'http://localhost:3000/receipts/{id}/points'. You will enter the
id generated from the POST request in the {id} field of your path.
6. On a successful GET request, you will get a JSON object containing the number of points awarded.

### You can experiment with various receipts and generate points for them.
