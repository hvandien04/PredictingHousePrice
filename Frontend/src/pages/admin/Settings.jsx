import { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Box,
  Divider,
} from "@mui/material";
import MDBox from "../../components/MDBox";

function Settings() {
  const [settings, setSettings] = useState({
    siteName: "Hệ thống dự đoán giá nhà",
    siteDescription: "Hệ thống dự đoán giá nhà thông minh sử dụng AI",
    emailNotifications: true,
    maintenanceMode: false,
    apiKey: "sk_test_123456789",
    maxPredictionsPerDay: 100,
  });

  const handleChange = (field) => (event) => {
    setSettings({
      ...settings,
      [field]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
    });
  };

  return (
    <MDBox>
      <Grid container spacing={3}>
        {/* Cài đặt chung */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cài đặt chung
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tên hệ thống"
                    value={settings.siteName}
                    onChange={handleChange("siteName")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Mô tả"
                    value={settings.siteDescription}
                    onChange={handleChange("siteDescription")}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Cài đặt thông báo */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cài đặt thông báo
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={handleChange("emailNotifications")}
                  />
                }
                label="Bật thông báo qua email"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Cài đặt hệ thống */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cài đặt hệ thống
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.maintenanceMode}
                        onChange={handleChange("maintenanceMode")}
                      />
                    }
                    label="Chế độ bảo trì"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="API Key"
                    value={settings.apiKey}
                    onChange={handleChange("apiKey")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Số lượng dự đoán tối đa mỗi ngày"
                    value={settings.maxPredictionsPerDay}
                    onChange={handleChange("maxPredictionsPerDay")}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Nút lưu */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary">
              Lưu cài đặt
            </Button>
          </Box>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Settings; 