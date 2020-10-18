import React from 'react'
import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { formatDate } from '../../../helpers/format'

const defaultData = {
  datasets: [
    {
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    },
  ],
}

export default function HistoriesChart() {
  const { editingProduct } = useSelector((state) => state.user)
  const { product_histories } = editingProduct || {}
  const chartRef = React.useRef()

  const historyChart = React.useMemo(() => {
    const label = 'Price'
    const labels = product_histories?.map((_history) =>
      formatDate(_history.updated_at)
    )
    const data = product_histories?.map((_history) => _history.price / 1000)

    defaultData.labels = labels
    defaultData.datasets[0].label = label
    defaultData.datasets[0].data = data

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return `${value}k`
              },
            },
          },
        ],
      },
    }

    return <Line ref={chartRef} data={defaultData} options={options} />
  }, [product_histories])

  return (
    <div>
      <h2>History Prices</h2>
      {historyChart}
    </div>
  )
}
