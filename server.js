const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const mongo = require('mongoose');
const app = express();
const cors = require('cors');
// Allow cross-origin
app.use(cors());


app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// mongo.connect('mongodb://usercpm:usercpm@cluster-shard-00-00-mt0bh.gcp.mongodb.net:27017,cluster-shard-00-01-mt0bh.gcp.mongodb.net:27017,cluster-shard-00-02-mt0bh.gcp.mongodb.net:27017/collaborative-project-management?ssl=true&replicaSet=Cluster-shard-0&authSource=admin&retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
mongo.connect('mongodb://usereventmgmt:usereventmgmt@cluster0-shard-00-00-wn3yl.mongodb.net:27017,cluster0-shard-00-01-wn3yl.mongodb.net:27017,cluster0-shard-00-02-wn3yl.mongodb.net:27017/eventmgmtdb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})

mongo.connection.once('open', () => { console.log('Conneted to MongoDB Cloud\n') })

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static(path.join(__dirname, 'client/public')));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
  });
}