import grpc
import user_pb2
import user_pb2_grpc


def run():
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = user_pb2_grpc.UserServiceStub(channel)

        request = user_pb2.UserRequest(user_id="123")
        response = stub.GetUserProfile(request)

        print("Respons dari Go gRPC Server:")
        print(f"Nama    : {response.name}")
        print(f"Email   : {response.email}")
        print(f"Telepon : {response.phone}")


if __name__ == "__main__":
    run()
