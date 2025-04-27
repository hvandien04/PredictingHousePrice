import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import MDBox from "../../components/MDBox";
import axios from "axios"; 
import { adminService } from "../../utils/adminAPI";

function HousePosts() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllHouses();
      setHouses(response);
      console.log(response);
    } catch (err) {
      setError("Không thể tải dữ liệu nhà bán.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (house) => {
    setSelectedHouse(house);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedHouse(null);
  };

  const handleDeleteHouse = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài đăng này?")) {
      try {
        await axios.delete(`/api/admin/delete-sellinghouses/${id}`);
        fetchHouses(); // reload lại danh sách sau khi xóa
      } catch (err) {
        console.error("Lỗi khi xóa nhà:", err);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Đang bán":
        return "success";
      case "Đã bán":
        return "error";
      case "Đang xét duyệt":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <MDBox>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Quản lý bài đăng bán nhà</Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Tiêu đề</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Người bán</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Ngày đăng</TableCell>
                <TableCell>Lượt xem</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {houses.map((house,index) => (
                <TableRow key={house.id||index}>
                  <TableCell>{house.phouseID}</TableCell>
                  <TableCell>{house.title}</TableCell>
                  <TableCell>{house.price}</TableCell>
                  <TableCell>{house.address}</TableCell>
                  <TableCell>{house.sellerName}</TableCell>
                  <TableCell>
                    <Chip
                      label={house.status}
                      color={getStatusColor(house.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{house.createdAt}</TableCell>
                  <TableCell>{house.views}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleViewDetails(house)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteHouse(house.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog Chi tiết nhà bán */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedHouse && (
          <>
            <DialogTitle>Chi tiết bài đăng</DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Tiêu đề"
                  value={selectedHouse.title || ""}
                  margin="normal"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Giá"
                  value={selectedHouse.price || ""}
                  margin="normal"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  value={selectedHouse.address || ""}
                  margin="normal"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Người bán"
                  value={selectedHouse.sellerName || ""}
                  margin="normal"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  select
                  label="Trạng thái"
                  value={selectedHouse.status || ""}
                  margin="normal"
                  InputProps={{ readOnly: true }}
                >
                  <MenuItem value="Đang bán">Đang bán</MenuItem>
                  <MenuItem value="Đã bán">Đã bán</MenuItem>
                  <MenuItem value="Đang xét duyệt">Đang xét duyệt</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  label="Ngày đăng"
                  value={selectedHouse.createdAt || ""}
                  margin="normal"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Lượt xem"
                  value={selectedHouse.views || ""}
                  margin="normal"
                  InputProps={{ readOnly: true }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Đóng</Button>
              <Button variant="contained" color="primary">
                Cập nhật
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </MDBox>
  );
}

export default HousePosts;
