import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

export function ProductsTable() {
  function getProductsDetail() {
    return axios.get("https://fakestoreapi.com/products");
  }

  const { data, isLoading, error } = useQuery({
    queryKey: "GetProducts",
    queryFn: getProductsDetail,
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
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Count</Table.HeadCell>
          <Table.HeadCell>Rate</Table.HeadCell>
          <Table.HeadCell>Edit</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data?.data?.map((product) => (
            <Table.Row
              key={product?.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <img
                  className="w-28"
                  src={product?.image}
                  alt={product.category}
                  loading="lazy"
                />
              </Table.Cell>
              <Table.Cell>{product.category}</Table.Cell>
              <Table.Cell>{product.rating.count}</Table.Cell>
              <Table.Cell>{product.rating.rate}</Table.Cell>
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
