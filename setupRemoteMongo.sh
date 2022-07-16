# Setup file template to upload data to MongoDB Atlas
mongoimport --uri "mongodb+srv://sarangan365:sECURE2711@qkart-node.akwure3.mongodb.net/qkart?retryWrites=true&w=majority" --drop --collection videos --file data/data.json
