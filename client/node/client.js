const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

// Lokasi file proto
const PROTO_PATH = path.resolve(__dirname, "../../proto/user.proto");

// Membaca definisi layanan gRPC
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

// Memuat layanan gRPC
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const userPackage = protoDescriptor.user;

// Membuat koneksi ke Go gRPC Server
const client = new userPackage.UserService(
    "localhost:50051",
    grpc.credentials.createInsecure()
);

// Meminta profil pengguna
client.getUserProfile(
    { user_id: "123" },
    (error, response) => {
        if (error) {
            console.error("Gagal mengambil data:", error.message);
            client.close();
            process.exitCode = 1;
            return;
        }

        console.log("Respons dari Go gRPC Server:");
        console.log(`Nama  : ${response.name}`);
        console.log(`Email : ${response.email}`);

        client.close();
    }
);
