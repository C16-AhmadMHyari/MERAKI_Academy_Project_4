import { useState } from "react";

const UserChart = () => {
  const [chart, setChart] = useState(() => {
    const saved = localStorage.getItem("Chart");
    return saved
      ? JSON.parse(saved)
      : ["There no donations created, please add donation."];
  });

  return (
    <div>
      {chart.map((donation,i) => {
        return (
          <div key={i} >
            <img src={donation.imgSource} />
            <br />
            <p>{donation.packageName}</p><br />
            <p>{donation.categoryName}</p><br />
            <p>{donation.amount}</p><br />
            <button>Remove</button>
          </div>
        );
      })}
      <button>Complete and Pay</button>
    </div>
  );
};
export default UserChart;
