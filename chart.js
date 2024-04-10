const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
         x: {
          beginAtZero: true,
          display: false,
          drawTicks: false,
          color: 'rgb(255, 255, 255)',
                  grid: {
                    display: false
          }
        },
        y: {
           display: false,
          drawTicks: false,
          color: 'rgb(255, 255, 255)',
          grid: {
            display: false
          }
        }
        },
     indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          display: false,
        },
        title: {
          display: false,
          text: 'Chart.js Bar Chart'
        },
      }
    },
  };


  const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

const labels = ['HP', 'ATK', 'DEF', 40, 50, 60, 70];
const data = {
  labels: labels,
  datasets: [
    {
      label: '',
      data: [10, 20, 30, 40, 50, 60, 70],
      borderColor: Utils.CHART_COLORS.red,
      borderColor: 'rgb(255, 255, 0)',
      backgroundColor: 'rgb(25, 125, 255)',
      borderWidth: 3,
      borderRadius: Number.MAX_VALUE,
      borderSkipped: false,
      
    },
    {
      label: '',
      data: [100, 100, 100, 100, 100, 100, 100],
      grouped: false,
      borderColor: 'rgba(255, 255, 0, 1)',
      backgroundColor: 'rgba(25, 125, 255, 0.2)',
      borderWidth: 3,
      borderRadius: Number.MAX_VALUE,
      borderSkipped: false,
    }
  ]
};


const actions = [
    {
      name: 'Randomize',
      handler(chart) {
        chart.data.datasets.forEach(dataset => {
          dataset.data = Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});
        });
        chart.update();
      }
    },
  ];