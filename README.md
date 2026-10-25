# GRPC Polyglot

Proyek praktikum gRPC lintas bahasa (polyglot). Server ditulis dalam **Go**, sedangkan client ditulis dalam **Python** dan **Node.js**. Ketiganya berkomunikasi melalui satu kontrak `proto/user.proto` yang sama, dengan layanan `UserService` dan method `GetUserProfile` yang mengembalikan `name`, `email`, dan `phone`.

## Struktur Proyek

- `proto/user.proto`: kontrak layanan (Protocol Buffers)
- `server/`: server gRPC Go, port 50051
- `client/python/`: client Python
- `client/node/`: client Node.js

## Analisis Pendekatan Kompilasi

Pada Go dan Python, kode gRPC dihasilkan secara **statis** (static code generation). File `.proto` dikompilasi terlebih dahulu dengan `protoc` (plugin `protoc-gen-go` dan `protoc-gen-go-grpc` untuk Go, serta `grpc_tools.protoc` untuk Python) menjadi file kode seperti `user.pb.go`, `user_grpc.pb.go`, `user_pb2.py`, dan `user_pb2_grpc.py`. File tersebut ikut disimpan di proyek, sehingga setiap perubahan `.proto`, misalnya penambahan field `phone`, mengharuskan proses generate ulang agar kode ikut diperbarui. Keuntungannya adalah pengecekan tipe saat kompilasi dan performa yang baik, tetapi ada langkah build tambahan. Pada Node.js, kode dibuat secara **dinamis saat runtime** (dynamic code generation). Library `@grpc/proto-loader` membaca file `user.proto` langsung ketika program dijalankan dan membentuk definisi layanannya di memori, sehingga tidak ada file hasil generate dan tidak perlu menjalankan `protoc`. Perubahan pada `.proto` langsung terbaca saat client dijalankan ulang. Kelebihannya adalah alur kerja lebih sederhana dan fleksibel, tetapi kesalahan tipe baru ketahuan saat program berjalan.
