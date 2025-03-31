import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Typography,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import MDBox from "../../components/MDBox";

function HousePosts() {
  const [posts] = useState([
    {
      id: 1,
      title: "Nhà phố 3 tầng Quận 7",
      price: "5.5 tỷ",
      address: "123 Nguyễn Văn Linh, Quận 7, TP.HCM",
      seller: "Nguyễn Văn A",
      status: "Đang bán",
      createdAt: "2024-03-31",
      views: 156,
    },
    {
      id: 2,
      title: "Biệt thự vườn Thủ Đức",
      price: "12 tỷ",
      address: "456 Võ Văn Ngân, TP Thủ Đức, TP.HCM",
      seller: "Trần Thị B",
      status: "Đã bán",
      createdAt: "2024-03-30",
      views: 234,
    },
    {
      id: 3,
      title: "Căn hộ cao cấp Quận 2",
      price: "3.8 tỷ",
      address: "789 Mai Chí Thọ, Quận 2, TP.HCM",
      seller: "Lê Văn C",
      status: "Đang xét duyệt",
      createdAt: "2024-03-29",
      views: 89,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleViewDetails = (post) => {
    setSelectedPost(post);
    setOpenDialog(true);
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
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.price}</TableCell>
                <TableCell>{post.address}</TableCell>
                <TableCell>{post.seller}</TableCell>
                <TableCell>
                  <Chip
                    label={post.status}
                    color={getStatusColor(post.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{post.createdAt}</TableCell>
                <TableCell>{post.views}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleViewDetails(post)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog chi tiết bài đăng */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        {selectedPost && (
          <>
            <DialogTitle>Chi tiết bài đăng</DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Tiêu đề"
                  value={selectedPost.title}
                  margin="normal"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Giá"
                  value={selectedPost.price}
                  margin="normal"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  value={selectedPost.address}
                  margin="normal"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Người bán"
                  value={selectedPost.seller}
                  margin="normal"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  select
                  label="Trạng thái"
                  value={selectedPost.status}
                  margin="normal"
                >
                  <MenuItem value="Đang bán">Đang bán</MenuItem>
                  <MenuItem value="Đã bán">Đã bán</MenuItem>
                  <MenuItem value="Đang xét duyệt">Đang xét duyệt</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  label="Ngày đăng"
                  value={selectedPost.createdAt}
                  margin="normal"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Lượt xem"
                  value={selectedPost.views}
                  margin="normal"
                  InputProps={{ readOnly: true }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Đóng</Button>
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