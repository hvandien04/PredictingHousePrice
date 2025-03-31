import { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import MDBox from "../../components/MDBox";

const data = [
  { name: "T1", value: 400 },
  { name: "T2", value: 300 },
  { name: "T3", value: 200 },
  { name: "T4", value: 278 },
  { name: "T5", value: 189 },
  { name: "T6", value: 239 },
];

const reportData = [
  {
    id: 1,
    type: "Báo cáo tháng",
    date: "2024-03-31",
    status: "Hoàn thành",
    download: "PDF",
  },
  {
    id: 2,
    type: "Báo cáo quý",
    date: "2024-03-31",
    status: "Đang xử lý",
    download: "Excel",
  },
  {
    id: 3,
    type: "Báo cáo năm",
    date: "2024-03-31",
    status: "Chờ duyệt",
    download: "PDF",
  },
];

function Reports() {
  const [selectedReport] = useState("monthly");

  return (
    <MDBox>
      <Grid container spacing={3}>
        {/* Biểu đồ */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thống kê theo tháng
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Danh sách báo cáo */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h6">Danh sách báo cáo</Typography>
                <Button variant="contained" color="primary">
                  Tạo báo cáo mới
                </Button>
              </Box>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Loại báo cáo</TableCell>
                      <TableCell>Ngày tạo</TableCell>
                      <TableCell>Trạng thái</TableCell>
                      <TableCell>Định dạng</TableCell>
                      <TableCell>Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reportData.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.id}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.status}</TableCell>
                        <TableCell>{report.download}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                          >
                            Tải xuống
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Reports; 