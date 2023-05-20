import { useState, useEffect, useRef } from 'react';
import { interval } from 'rxjs';
import { Chart } from 'chart.js';

const data$ = interval(1000).pipe(
    map(() => Math.random())
);

function RealtimeLineChart() {
  const chartRef = useRef();
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Realtime Data',
          data: [],
          backgroundColor: 'rgba(0, 0, 255, 0.5)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              displayFormats: {
                second: 'h:mm:ss a'
              }
            }
          }]
        }
      }
    });

    setChart(newChart);

    return () => {
      newChart.destroy();
    };
  }, []);

  useEffect(() => {
    const subscription = data$.subscribe(newData => {
      const newLabels = chart.data.labels.concat(new Date());
      const newDataPoints = chart.data.datasets[0].data.concat(newData);
      chart.data.labels = newLabels;
    //   chart.data.datasets[0];
    });
});
}