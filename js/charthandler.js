var highCorrChart = new Chart(document.getElementById("chart1"), {
  type: 'line',
  data: {
    labels: [2013, 2014, 2015],
    datasets: []
  },
  options: {
    title: {
      display: true,
      text: '% Per State vs. Time'
    }
  }
});

var medCorrChart = new Chart(document.getElementById("chart2"), {
  type: 'line',
  data: {
    labels: [2013, 2014, 2015],
    datasets: []
  },
  options: {
    title: {
      display: true,
      text: '% Per State vs. Time'
    }
  }
});

var lowCorrChart = new Chart(document.getElementById("chart3"), {
  type: 'line',
  data: {
    labels: [2013, 2014, 2015],
    datasets: []
  },
  options: {
    title: {
      display: true,
      text: '% Per State vs. Time'
    }
  }
});