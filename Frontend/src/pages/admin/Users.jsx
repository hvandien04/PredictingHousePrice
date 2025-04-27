import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, IconButton, Typography, Box, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import MDBox from "../../components/MDBox";
import { adminService } from "../../utils/adminAPI";

function Users() {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await adminService.getAllUsers();
      setUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleOpenAddUser = () => {
    setCurrentUser({ name: '', email: '', role: '0', status: 'Hoạt động', password: '', phone: '' });
    setIsEditMode(false);
    setOpenDialog(true);
  };
  
  const handleOpenEditUser = (user) => {
    setCurrentUser(user);
    setIsEditMode(true);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentUser(null);
  };
  
  const handleSaveUser = async () => {
    try {
      if (isEditMode) {
        // Sử dụng PUT để cập nhật người dùng
        await adminService.updateUser(currentUser.id, currentUser);
      } else {
        // Sử dụng POST để thêm người dùng mới
        await adminService.createUser(currentUser);
      }
  
      handleCloseDialog();
      loadUsers(); // Tải lại danh sách người dùng
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };
  
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Bạn có chắc muốn xóa người dùng này?')) return;
  
    try {
      // Gọi API để xóa người dùng
      await adminService.deleteUser(userId);
      loadUsers(); // Tải lại danh sách người dùng sau khi xóa
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  return (
    <MDBox>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Quản lý người dùng</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAddUser}
        >
          Thêm người dùng
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.userID}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.state}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenEditUser(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Thêm/Sửa User */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditMode ? 'Chỉnh sửa người dùng' : 'Thêm người dùng'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên"
            value={currentUser?.name || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={currentUser?.email || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Vai trò"
            value={currentUser?.role || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mật khẩu"
            value={currentUser?.password || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Trạng thái"
            value={currentUser?.status || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, status: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSaveUser} variant="contained" color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
}

export default Users;
