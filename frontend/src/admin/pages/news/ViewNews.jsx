import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AdminLayout } from "../../components/AdminLayout";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFetchData } from "../../../hooks/useFetchData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const ViewNews = () => {
  document.title = "View News";
  const apiUrl = `${process.env.BASE_URL}/api/v1/news`;

  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const news = data.news;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (newsId) => {
    try {
      const deleteUrl = apiUrl + `/${newsId}`;
      const response = await axios.delete(deleteUrl);

      if (response.data.success) {
        refetch();
        toast.success(response.data.message);
      } else {
        toast.error("Failed to delete news");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while deleting");
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200 mt-20">
          <div className="flex items-center justify-between pb-6 border-b">
            <h2 className="text-2xl font-bold text-center p-2 sm:text-left text-blue-600">
              View News
            </h2>
            <div className="flex gap-4">
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={refetch}
                sx={{ textTransform: "none" }}
              >
                Refresh
              </Button>
            </div>
          </div>

          <Paper sx={{ marginTop: "20px" }}>
            {loading && (
              <div className="flex justify-center py-10">
                <CircularProgress size="large" color="secondary" />
              </div>
            )}
            {error && (
              <div className="text-center text-red-500 py-4">
                <Typography variant="h6">Error: {error}</Typography>
              </div>
            )}
            {news && (
              <>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow className="bg-gray-100">
                        <TableCell>S No.</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>URL</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {news
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((article, i) => (
                          <TableRow
                            key={article._id}
                            sx={{
                              "&:hover": {
                                backgroundColor: "#f1f1f1",
                              },
                            }}
                          >
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>
                              {article.title.slice(0, 20) + "..."}
                            </TableCell>
                            <TableCell>{article.url}</TableCell>
                            <TableCell>
                              <img
                                src={`${process.env.BASE_URL}/${article.image}`}
                                alt={article.title}
                                style={{
                                  height: "100px",
                                  width: "150px",
                                  objectFit: "contain",
                                  borderRadius: "8px",
                                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              {new Date(article.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2 justify-center">
                                <Link
                                  to={`/admin/update-news/${article._id}`}
                                >
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    startIcon={<EditIcon />}
                                    sx={{ textTransform: "none" }}
                                  >
                                    Edit
                                  </Button>
                                </Link>
                                <Button
                                  onClick={() => handleDelete(article._id)}
                                  variant="contained"
                                  size="small"
                                  color="error"
                                  startIcon={<DeleteIcon />}
                                  sx={{ textTransform: "none" }}
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={news.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
          </Paper>
        </div>
      </div>
    </>
  );
};
