import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

export function UserTable() {
  function getUserDetail() {
    return axios.get("https://jsonplaceholder.typicode.com/users");
  }

  const { data, isLoading, error } = useQuery({
    queryKey: "GetUser",
    queryFn: getUserDetail,
    staleTime: Infinity,
    retry: 5,
    retryDelay: 2000 * 60,
  });

  if (isLoading) {
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <span className="loader"></span>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>User Name</Table.HeadCell>
          <Table.HeadCell>website</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell>Edit</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data?.data?.map((user) => (
            <Table.Row
              key={user?.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {user?.name}
              </Table.Cell>
              <Table.Cell>{user?.username}</Table.Cell>
              <Table.Cell>{user?.website}</Table.Cell>
              <Table.Cell>{user?.address?.city}</Table.Cell>
              <Table.Cell>
                <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  Edit
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
