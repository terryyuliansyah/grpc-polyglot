package main

import (
	"context"
	"log"
	"net"

	pb "grpc-polyglot-lab/server/pb"
	"google.golang.org/grpc"
)

type userServer struct {
	pb.UnimplementedUserServiceServer
}

func (s *userServer) GetUserProfile(
	ctx context.Context,
	req *pb.UserRequest,
) (*pb.UserResponse, error) {
	log.Printf("Request received for user_id: %s", req.GetUserId())

	return &pb.UserResponse{
		Name:  "Terry",
		Email: "terry@example.com",
	}, nil
}

func main() {
	listener, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	pb.RegisterUserServiceServer(grpcServer, &userServer{})

	log.Println("gRPC server running on port 50051")

	if err := grpcServer.Serve(listener); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
