import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import MDBox from "../../components/MDBox";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { adminService } from "../../utils/adminAPI"; // Import adminService

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const predictionOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      align: "start",
      labels: {
        boxWidth: 15,
        usePointStyle: true,
        pointStyle: "line",
      },
    },
    title: {
      display: true,
      text: "Thống kê dự đoán giá nhà (Admin)",
      align: "start",
      font: {
        size: 16,
        weight: "normal",
      },
      padding: {
        bottom: 30,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
        color: "rgba(0, 0, 0, 0.1)",
      },
      ticks: {
        color: "#666",
      },
      title: {
        display: true,
        text: "Tháng",
        color: "#666",
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
    y: {
      min: 0,
      ticks: {
        stepSize: 5,
        color: "#666",
      },
      grid: {
        display: true,
        color: "rgba(0, 0, 0, 0.1)",
      },
      title: {
        display: true,
        text: "Số lượng dự đoán",
        color: "#666",
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 3,
      borderWidth: 2,
      backgroundColor: "white",
    },
  },
};

const performanceOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      align: "start",
      labels: {
        boxWidth: 15,
        usePointStyle: true,
        pointStyle: "rect",
      },
    },
    title: {
      display: true,
      text: "Hiệu suất dự đoán của người dùng (7 ngày gần nhất)",
      align: "start",
      font: {
        size: 16,
        weight: "normal",
      },
      padding: {
        bottom: 30,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
        color: "rgba(0, 0, 0, 0.1)",
      },
      ticks: {
        color: "#666",
        callback: function (value, index, values) {
          // Định dạng ngày thành DD/MM
          const date = this.getLabelForValue(value);
          const [year, month, day] = date.split("-");
          return `${day}/${month}`;
        },
      },
      title: {
        display: true,
        text: "Ngày",
        color: "#666",
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
    y: {
      min: 0,
      ticks: {
        stepSize: 1,
        color: "#666",
      },
      grid: {
        display: true,
        color: "rgba(0, 0, 0, 0.1)",
      },
      title: {
        display: true,
        text: "Số lượng dự đoán",
        color: "#666",
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
  },
  elements: {
    bar: {
      borderWidth: 1,
    },
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 3,
      borderWidth: 2,
      backgroundColor: "white",
    },
  },
};

const labels = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];

function Dashboard() {
  const [stats, setStats] = useState({
    totalPredictions: 0,
    totalUsers: 0,
    accuracy: "0%",
    averagePrice: "0B",
  });
  const [predictionChartData, setPredictionChartData] = useState({
    labels,
    datasets: [
      {
        label: "Số lượng dự đoán",
        data: Array(12).fill(0),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });
  const [performanceChartData, setPerformanceChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const data = await adminService.getDashboardData(); // Gọi API getDashboardData

      console.log("Total users received:", data.totalUsers);
      console.log("User performance:", data.userPerformance);

      setStats({
        totalPredictions: data.totalPredictions || 0,
        totalUsers: data.totalUsers || 0,
        accuracy: data.accuracy || "0%",
        averagePrice: data.averagePrice || "0B",
      });

      // Biểu đồ dự đoán theo tháng
      const monthlyCounts = data.monthlyPredictions.map((item) => item.count);
      setPredictionChartData({
        labels,
        datasets: [
          {
            label: "Số lượng dự đoán",
            data: monthlyCounts,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });

      // Biểu đồ hiệu suất user
      if (data.userPerformance && data.userPerformance.length > 0) {
        const dates = data.userPerformance[0].predictionsByDate.map((d) => d.date);
        const colors = ["#4BC0C0", "#FF6384", "#36A2EB", "#FFCE56", "#E7E9ED"];

        // Dataset cho column chart
        const userDatasets = data.userPerformance.map((user, index) => ({
          type: "bar",
          label: user.name,
          data: user.predictionsByDate.map((d) => d.count),
          backgroundColor: colors[index % colors.length],
          borderColor: colors[index % colors.length],
          borderWidth: 1,
        }));

        // Dataset cho line chart
        const avgCounts = dates.map((_, dateIndex) => {
          const total = data.userPerformance.reduce((sum, user) => sum + user.predictionsByDate[dateIndex].count, 0);
          return total / data.userPerformance.length;
        });
        userDatasets.push({
          type: "line",
          label: "Trung bình",
          data: avgCounts,
          borderColor: "#000000",
          backgroundColor: "#000000",
          borderWidth: 2,
          fill: false,
          tension: 0.1,
        });

        setPerformanceChartData({
          labels: dates,
          datasets: userDatasets,
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError(error.message || "Đã xảy ra lỗi khi lấy dữ liệu");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    console.log("Stats:", stats);
    console.log("Performance chart data:", performanceChartData);
  }, [stats, performanceChartData]);

  if (error) {
    return (
      <MDBox>
        <Typography color="error">{error}</Typography>
      </MDBox>
    );
  }

  return (
    <MDBox>
      <Grid container spacing={4} justifyContent="center">
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
                Độ chính xác
              </Typography>
              <Typography variant="h4">{stats.accuracy}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ height: 600, p: 2 }}>
                <Chart type="line" options={predictionOptions} data={predictionChartData} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ height: 600, p: 2 }}>
                <Chart options={performanceOptions} data={performanceChartData} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Dashboard;