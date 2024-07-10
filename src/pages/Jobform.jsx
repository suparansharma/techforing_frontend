import React, { useState, useEffect } from "react"
import AuthUser from "../components/AuthUser";
import DataTable from 'react-data-table-component';
import { IconButton, Button } from '@mui/material';
import AddJobModal from "../components/Jobform/Jobform";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteConfirmationModal from "../components/Jobform/DeleteConfirmationModal";
import ViewJobModal from "../components/Jobform/ViewJobModal";


const Jobform = () => {
  const { http } = AuthUser();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [editJob, setEditJob] = useState(null);
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await http.get('/jobs');
      setJobs(response?.data);
      setJobList(response?.data)
    } catch (error) {
      setError('Failed to fetch jobs.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const columns = [
    {
      name: 'Department',
      selector: row => row?.dept,
      sortable: true,
    },
    {
      name: 'Vacancy',
      selector: row => row?.vacancy,
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row?.category,
      sortable: true,
    },
    {
      name: 'Location',
      selector: row => row?.area,
      sortable: true,
    },
    {
      name: 'Company',
      selector: row => row?.company_name,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => actionButton(row.id),
    },
  ];


  const actionButton = (id) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <IconButton aria-label="view" color="primary" onClick={() => handleView(id)}>
          <VisibilityIcon />
        </IconButton>
        <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(id)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" color="secondary" onClick={() => handleOpenDeleteModal(id)}>
          <DeleteIcon />
        </IconButton>
      </div>
    );
  };


  const handleOpenDeleteModal = (jobId) => {
    setSelectedJobId(jobId);
    setOpenDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await http.delete(`/deleteJob/${selectedJobId}`); // Replace with your API endpoint
      fetchJobs(); // Refresh the jobs list after a job is deleted
      setOpenDeleteModal(false);
      setSelectedJobId(null);
    } catch (error) {
      console.error('Failed to delete job', error);
    }
  };

  const handleEdit = (jobId) => {
    const jobToEdit = jobs.find(job => job.id === jobId);
    if (jobToEdit) {
        setEditJob(jobToEdit);
        setOpen(true);
    } else {
        console.error(`Job with ID ${jobId} not found.`);
    }
};

  const handleView = (jobId) => {
    setSelectedJobId(jobId);
    setOpenViewModal(true);
};


  useEffect(() => {
    let controller = new AbortController();
    const result = jobList?.filter((job) => {
      return (
        job?.dept?.toLowerCase().includes(search.toLocaleLowerCase()) ||
        job?.category?.includes(search)
      );
    });
    setJobs(result);
    return () => controller.abort();
  }, [search]);

  const handleJobAdded = () => {
    fetchJobs();
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 p-xs-2">
          <div className="card shadow">
            <div className="d-flex border-bottom title-part-padding align-items-center p-3">
              <div>
                <h4 className="card-title mb-0">All Jobs</h4>
              </div>
              <div className="ms-auto flex-shrink-0">
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                  Add Jobs
                </Button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <div style={{ width: '16%', paddingTop: '10px' }}>
                  {/* Additional Filters or Search */}
                </div>
                <div>
                  {loading ? (
                    <h6>loading</h6>
                  ) : (
                    <DataTable
                      columns={columns}
                      data={jobs}
                      pagination
                      highlightOnHover
                      subHeader
                      striped
                      subHeaderComponent={
                        <div style={{ display: 'flex' }}>
                          <input
                            type="text"
                            placeholder="search by dept and category"
                            className="form-control"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </div>
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddJobModal open={open}  onClose={() => {setOpen(false);setEditJob(null);}}onJobAdded={handleJobAdded}  editJob={editJob} />
      <DeleteConfirmationModal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)} onConfirm={handleDelete} />
      <ViewJobModal open={openViewModal} onClose={() => setOpenViewModal(false)} jobId={selectedJobId}/>
    </div>
  );
}

export default Jobform