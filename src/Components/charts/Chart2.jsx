import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Chart2 = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const products = response.data;
        setLoading(false);
        const categories = {};
        products.forEach((product) => {
          categories[product.category] =
            (categories[product.category] || 0) + 1;
        });

        setChartData({
          labels: Object.keys(categories),
          datasets: [
            {
              label: "Products by Category",
              data: Object.values(categories),
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Product Categories Distribution",
      },
    },
  };

  if (loading) {
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="md:w-8/12 w-[100%] mx-auto">
      <h2>Pie Chart</h2>
      {chartData ? (
        <Pie data={chartData} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Chart2;
