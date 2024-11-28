import Chart from "../../Components/charts/chart";
import Chart2 from "../../Components/charts/chart2";

export default function Home() {
  return (
    <>
      <div className="my-5 ">
        {" "}
        <Chart />
      </div>
      <div className="mt-20">
        {" "}
        <Chart2 />
      </div>
    </>
  );
}
