import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
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

import DeleteIcon from "@mui/icons-material/Delete";
import { useFetchData } from "../hooks/useFetchData"; // Import your hook
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { AdminLayout } from "./components/AdminLayout";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  useEffect(() => {
    document.title = "Admin Dashboard";
    const token = Cookies.get("adminToken");
    if (token) {
      toast.success("Login Successfully!");
    }
  }, []);

  const apiUrl = `${process.env.BASE_URL}/api/v1/contact`;

  const { data, loading, error, refetch } = useFetchData(apiUrl); // Use the custom hook

  const contacts = data.contact;

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

  const handleDelete = async (contactId) => {
    try {
      const deleteUrl = apiUrl + `/${contactId}`;
      const response = await axios.delete(deleteUrl);

      if (response.data.success) {
        refetch(); // Refetch data after deletion
        toast.success(response.data.message);
      } else {
        toast.error("Failed to delete contact");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while deleting");
    }
  };

  const apiUrl1 = `${process.env.BASE_URL}/api/v1/property/total-properties`;
  const apiUrl2 = `${process.env.BASE_URL}/api/v1/property-enquiry/total-enquiry`;
  const apiUrl3 = `${process.env.BASE_URL}/api/v1/news/total-news`;

  const {
    data: propertyData,
    loading: propertyLoading,
    error: propertyError,
    refetch: propertyRefetch,
  } = useFetchData(apiUrl1);

  const {
    data: propertyEnquiryData,
    loading: propertyEnquiryLoading,
    error: propertyEnquiryError,
    refetch: propertyEnquiryRefetch,
  } = useFetchData(apiUrl2);

  const {
    data: newsData,
    loading: newsLoading,
    error: newsError,
    refetch: newsRefetch,
  } = useFetchData(apiUrl3);

  const totalProperties = propertyData.totalProperties;
  const totalNews = newsData.totalNews;
  const totalPropertyEnquiry = propertyEnquiryData.totalPropertyEnquiry;

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="mt-20">
          <div className="grid sm:grid-cols-12 gap-4 mb-4">
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="flex flex-col items-center justify-center h-[160px] rounded-lg shadow-lg bg-white border-t-4 border-blue-500 p-6">
                <div className="flex flex-col gap-2 items-center justify-center">
                  <h5 className="text-md lg:text-lg font-semibold text-gray-700">
                    Total Property Listed
                  </h5>
                  <p className="text-xl lg:text-2xl font-bold text-blue-500">
                    {totalProperties}
                  </p>
                </div>
                <div>
                  <Link to="/admin/view-property">
                    <button className="px-3 py-1.5 mt-3 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition duration-300">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="flex flex-col items-center justify-center h-[160px] rounded-lg shadow-lg bg-white border-t-4 border-green-500 p-6">
                <div className="flex flex-col gap-2 items-center justify-center">
                  <h5 className="text-md lg:text-lg font-semibold text-gray-700">
                    Total Contact Enquiries
                  </h5>
                  <p className="text-xl lg:text-2xl font-bold text-green-500">
                    {contacts && contacts.length}
                  </p>
                </div>
                <div>
                  <Link to="/admin/view-contact">
                    <button className="px-3 py-1.5 mt-3 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition duration-300">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="flex flex-col items-center justify-center h-[160px] rounded-lg shadow-lg bg-white border-t-4 border-purple-500 p-6">
                <div className="flex flex-col gap-2 items-center justify-center">
                  <h5 className="text-md lg:text-lg font-semibold text-gray-700">
                    Total Property Enquiries
                  </h5>
                  <p className="text-xl lg:text-2xl font-bold text-purple-500">
                    {totalPropertyEnquiry}
                  </p>
                </div>
                <div>
                  <Link to="/admin/view-property-enquiry">
                    <button className="px-3 py-1.5 mt-3 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition duration-300">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="flex flex-col items-center justify-center h-[160px] rounded-lg shadow-lg bg-white border-t-4 border-yellow-500 p-6">
                <div className="flex flex-col gap-2 items-center justify-center">
                  <h5 className="text-md lg:text-lg font-semibold text-gray-700">
                    Total News
                  </h5>
                  <p className="text-xl lg:text-2xl font-bold text-yellow-500">
                    {totalNews}
                  </p>
                </div>
                <div>
                  <Link to="/admin/view-news">
                    <button className="px-3 py-1.5 mt-3 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition duration-300">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden lg:block col-span-12">
              <div className="flex items-center justify-center h-auto mb-4 bg-gray-100">
                <div className="ml-0 w-full">
                  <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300 w-full">
                    <h2 className="text-2xl font-bold text-center sm:text-left text-blue-600 mb-6">
                      View Contact Enquiries
                    </h2>
                    <Paper sx={{ marginTop: "20px" }}>
                      {/* Loading State */}
                      {loading && (
                        <div className="flex justify-center py-10">
                          <CircularProgress size="large" color="secondary" />
                        </div>
                      )}

                      {/* Error Message */}
                      {error && (
                        <div className="text-center text-red-500 py-4">
                          <p>{error}</p>
                        </div>
                      )}

                      {/* Table Content */}
                      {contacts && (
                        <>
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow className="bg-blue-100">
                                  <TableCell className="font-semibold">
                                    S No.
                                  </TableCell>
                                  <TableCell className="font-semibold">
                                    Name
                                  </TableCell>
                                  <TableCell className="font-semibold">
                                    Email
                                  </TableCell>
                                  <TableCell className="font-semibold">
                                    Phone
                                  </TableCell>
                                  <TableCell className="font-semibold">
                                    Message
                                  </TableCell>
                                  <TableCell className="font-semibold">
                                    Date
                                  </TableCell>
                                  <TableCell className="font-semibold">
                                    Action
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {contacts
                                  .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                  .map((contact, i) => (
                                    <TableRow
                                      key={contact._id}
                                      className={`${
                                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                                      } hover:bg-gray-200`}
                                    >
                                      <TableCell>{i + 1}</TableCell>
                                      <TableCell>{contact.name}</TableCell>
                                      <TableCell>{contact.email}</TableCell>
                                      <TableCell>{contact.phone}</TableCell>
                                      <TableCell>{contact.message}</TableCell>
                                      <TableCell>
                                        {new Date(
                                          contact.createdAt
                                        ).toLocaleDateString()}
                                      </TableCell>
                                      <TableCell>
                                        <Button
                                          onClick={() =>
                                            handleDelete(contact._id)
                                          }
                                          endIcon={<DeleteIcon />}
                                          variant="contained"
                                          size="small"
                                          color="error"
                                          sx={{
                                            textTransform: "none",
                                            backgroundColor: "#ff4d4f",
                                            "&:hover": {
                                              backgroundColor: "#ff7875",
                                            },
                                          }}
                                        >
                                          Delete
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                          </TableContainer>

                          {/* Pagination */}
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={contacts.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{
                              ".MuiTablePagination-toolbar": {
                                justifyContent: "center",
                              },
                              ".MuiTablePagination-selectLabel, .MuiTablePagination-input":
                                {
                                  fontSize: "0.9rem",
                                },
                            }}
                          />
                        </>
                      )}
                    </Paper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
