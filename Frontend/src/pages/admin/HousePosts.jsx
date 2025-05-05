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
  TablePagination,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import MDBox from "../../components/MDBox";
import { adminService } from "../../utils/adminAPI";

function HousePosts() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [updatedHouse, setUpdatedHouse] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

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

  const handleEditPost = (house) => {
    setUpdatedHouse({ ...house }); // Tạo một bản sao của house để chỉnh sửa
    setSelectedHouse(house);
    setOpenDialog(true);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedHouse(null);
    setUpdatedHouse(null);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await adminService.updateHouse(selectedHouse.pHouseID, updatedHouse); 
      fetchHouses(); // Gọi lại hàm fetchHouses() sau khi lưu thay đổi
      console.log("Cập nhật thành công:", response.data);
      handleCloseDialog(); // Đóng dialog
    } catch (err) {
      console.error("Lỗi khi cập nhật bài đăng", err);
    }
  };
  
  

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setUpdatedHouse((prev) => ({
      ...prev,
      [name]: value,
    }));
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
                <TableCell>Diện tích</TableCell>
                <TableCell>Loại nhà</TableCell>
                <TableCell>ID Người bán</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {houses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((house, index) => (
                  <TableRow key={house.id || index}>
                    <TableCell>{house.pHouseID}</TableCell>
                    <TableCell>{house.title}</TableCell>
                    <TableCell>{house.price}</TableCell>
                    <TableCell>{house.address}</TableCell>
                    <TableCell>{house.area}</TableCell>
                    <TableCell>{house.houseType}</TableCell>
                    <TableCell>{house.userID}</TableCell>
                    <TableCell>
                      <Chip
                        label={house.state}
                        color={getStatusColor(house.state)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditPost(house)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 15, 25, 50]}
            component="div"
            count={houses.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số hàng mỗi trang:"
            labelDisplayedRows={({ from, to, count }) => 
              `${from}-${to} trong ${count !== -1 ? count : `nhiều hơn ${to}`}`
            }
          />

        </TableContainer>
      )}

      {/* Dialog Chỉnh sửa bài đăng */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {updatedHouse && (
          <>
            <DialogTitle>Chỉnh sửa bài đăng</DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                {/* Các trường cần hiển thị và chỉnh sửa */}
                <TextField
                  fullWidth
                  label="ID"
                  name="pHouseID"
                  value={updatedHouse.pHouseID || ""}
                  onChange={handleFieldChange}
                  margin="normal"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Tiêu đề"
                  name="title"
                  value={updatedHouse.title || ""}
                  onChange={handleFieldChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Giá"
                  name="price"
                  value={updatedHouse.price || ""}
                  onChange={handleFieldChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  name="address"
                  value={updatedHouse.address || ""}
                  onChange={handleFieldChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Diện tích"
                  name="area"
                  value={updatedHouse.area || ""}
                  onChange={handleFieldChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Loại nhà"
                  name="houseType"
                  value={updatedHouse.houseType || ""}
                  onChange={handleFieldChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="ID Người bán"
                  name="userID"
                  value={updatedHouse.userID || ""}
                  onChange={handleFieldChange}
                  margin="normal"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  select
                  label="Trạng thái"
                  name="state"
                  value={updatedHouse.state || ""}
                  onChange={handleFieldChange}
                  margin="normal"
                >
                  <MenuItem value="Đang bán">Đang bán</MenuItem>
                  <MenuItem value="Đã bán">Đã bán</MenuItem>
                  <MenuItem value="Đang xét duyệt">Đang xét duyệt</MenuItem>
                </TextField>
                
                {/* Các trường mới thêm vào */}
                <TextField
                  fullWidth
                  label="Số phòng ngủ"
                  name="bedrooms"
                  value={updatedHouse.bedrooms || ""}
                  onChange={handleFieldChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Số tầng"
                  name="floors"
                  value={updatedHouse.floors || ""}
                  onChange={handleFieldChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Số phòng tắm"
                  name="bathrooms"
                  value={updatedHouse.bathrooms || ""}
                  onChange={handleFieldChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Tình trạng pháp lý"
                  name="legalStatus"
                  value={updatedHouse.legalStatus || ""}
                  onChange={handleFieldChange}
                  margin="normal"
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Đóng</Button>
              <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                Lưu thay đổi
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </MDBox>
  );
}

export default HousePosts;
