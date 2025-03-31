import { useState } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import MDBox from "../../components/MDBox";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      align: "start",
      labels: {
        boxWidth: 15,
        usePointStyle: true,
        pointStyle: "line"
      }
    },
    title: {
      display: true,
      text: "Thống kê dự đoán giá nhà",
      align: "start",
      font: {
        size: 16,
        weight: "normal"
      },
      padding: {
        bottom: 30
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: true,
        color: "rgba(0, 0, 0, 0.1)"
      },
      ticks: {
        color: "#666"
      }
    },
    y: {
      min: 40,
      max: 85,
      ticks: {
        stepSize: 5,
        color: "#666"
      },
      grid: {
        display: true,
        color: "rgba(0, 0, 0, 0.1)"
      }
    }
  },
  elements: {
    line: {
      borderWidth: 2
    },
    point: {
      radius: 3,
      borderWidth: 2,
      backgroundColor: "white"
    }
  }
};

const labels = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];

const data = {
  labels,
  datasets: [
    {
      label: "Số lượng dự đoán",
      data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    }
  ],
};

function Dashboard() {
  const [stats] = useState({
    totalPredictions: 1234,
    accuracy: "95%",
    totalUsers: 567,
    averagePrice: "2.5B",
  });

  return (
    <MDBox>
      <Grid container spacing={3}>
        {/* Thống kê tổng quan */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Tổng số dự đoán
              </Typography>
              <Typography variant="h4">{stats.totalPredictions}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Độ chính xác
              </Typography>
              <Typography variant="h4">{stats.accuracy}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Tổng số người dùng
              </Typography>
              <Typography variant="h4">{stats.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Giá trung bình
              </Typography>
              <Typography variant="h4">{stats.averagePrice}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Biểu đồ */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ height: 600, p: 2 }}>
                <Line options={options} data={data} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Dashboard; 