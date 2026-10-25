const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '..', '..', 'proto', 'user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const client = new userProto.UserService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

client.GetUserProfile({ user_id: '123' }, (error, response) => {
  if (error) {
    console.error('Terjadi error:', error);
  } else {
    console.log('Respons dari Go gRPC Server:');
    console.log(`Nama    : ${response.name}`);
    console.log(`Email   : ${response.email}`);
    console.log(`Telepon : ${response.phone}`);
  }
  client.close();
});
