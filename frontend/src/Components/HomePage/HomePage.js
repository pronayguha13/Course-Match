import React, { useEffect, useState } from "react";
import { getUserCount } from "../../helperMethods";

const HomePage = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getUserCount(setCount);
  }, []);

  return (
    <div>
      <p>HomePage</p>
      <p>Total number of students: {count}</p>
    </div>
  );
};

export default HomePage;
