import React, { useState, useEffect, useRef } from "react";
import { createRoot } from 'react-dom/client';
import { Observable, interval, map } from "rxjs";

import * as echarts from "echarts/lib/echarts.js";
import "echarts/lib/chart/line.js";
import "echarts/lib/component/title.js";
import "echarts/lib/component/tooltip.js";
import "echarts/lib/component/legend.js";
import "echarts/lib/component/dataZoom.js";
import "echarts/lib/component/grid.js";


const RealTimeChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // const chart = ECharts.init(document.getElementById("chart"));

    const dataStream = new Observable((observer) => {
      const intervalId = setInterval(() => {
        const newData = Math.random() * 100;
        observer.next(newData);
      }, 1000);

      return () => clearInterval(intervalId);
    });

    dataStream.subscribe((newData) => {
      setData((prevData) => [...prevData, newData]);
    });
  }, []);

  useEffect(() => {
    // const chart = ECharts.getInstanceByDom(document.getElementById("chart"));
    const chart = echarts.init(document.getElementById("chart"));
    chart.setOption({
      xAxis: {
        type: "category",
        data: data.map((_, index) => index),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: data,
          type: "line",
        },
      ],
    });
  }, [data]);

  return <div id="chart" style={{ width: "100%", height: "400px" }}></div>;
};

// export default RealTimeChart;

const root = createRoot(document.getElementById('root'));
root.render(<RealTimeChart />);