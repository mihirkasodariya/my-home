import React, { useState } from "react";
import { useFetchData } from "../../../hooks/useFetchData";
import { AdminLayout } from "../../components/AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

export const ViewBrochure = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/brochures/`;
  const { data, loading, error, refetch } = useFetchData(apiUrl);

  const brochures = data.brochure;

  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  // Handle pagination change (page number)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (brochureId) => {
    try {
      const deleteUrl = apiUrl + `/${brochureId}`;
      const response = await axios.delete(deleteUrl);

      if (response.data.success) {
        refetch(); 
        toast.success(response.data.message);
      } else {
        toast.error("Failed to delete brochure");
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
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20">
          <h2 className="text-xl font-bold p-2 text-center sm:text-left">
            View Brochures
          </h2>
          <Paper sx={{ marginTop: "20px" }}>
            {loading && (
              <div className="flex justify-center">
                <CircularProgress size="large" color="secondary" />{" "}
                {/* Show loading state */}
              </div>
            )}
            {error && <p>{error}</p>} {/* Show error message */}
            {brochures && (
              <>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>S No.</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>PDF</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {brochures
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((brochure, i) => (
                          <TableRow key={brochure._id}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>
                              {brochure.name.length > 20
                                ? brochure.name.slice(0, 20) + "..."
                                : brochure.name}
                            </TableCell>
                            <TableCell>
                              {brochure.location.length > 80
                                ? brochure.location.slice(0, 80) + "...."
                                : brochure.location}
                            </TableCell>
                            <TableCell>
                              <img
                                src={`${process.env.BASE_URL}/${brochure.image}`}
                                alt={brochure.name}
                                style={{
                                  height: "100px",
                                  width: "200px",
                                  objectFit: "contain",
                                  objectPosition: "center",
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              {
                                brochure.pdf.split("\\")[
                                  brochure.pdf.split("\\").length - 1
                                ]
                              }
                            </TableCell>
                            <TableCell>
                              <div className="flex sm:block">
                                <Link
                                  to={`/admin/dashboard/update-brochure/${brochure._id}`}
                                >
                                  <Button
                                    onClick={() => handleEdit(brochure._id)}
                                    endIcon={<EditIcon />}
                                    variant="outlined"
                                    size="small"
                                    color="success"
                                    style={{
                                      textTransform: "none",
                                      marginRight: "20px",
                                    }}
                                  >
                                    Edit
                                  </Button>
                                </Link>
                                <Button
                                  onClick={() => handleDelete(brochure._id)}
                                  endIcon={<DeleteIcon />}
                                  variant="contained"
                                  size="small"
                                  color="error"
                                  style={{ textTransform: "none" }}
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
                  count={brochures.length} // Total number of contacts
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
