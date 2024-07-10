// AddJobModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import AuthUser from '../AuthUser';
import toast from "../Toast/index";

const AddJobModal = ({ open, onClose, onJobAdded, editJob }) => {
    const { http } = AuthUser();
    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);
    const initialState = {
        dept: '',
        category: '',
        vacancy: '',
        area: '',
        company_name: '',
    };
    const [job, setJob] = useState(initialState);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (editJob) {
            setJob({
                dept: editJob?.dept,
                category: editJob?.category,
                vacancy: editJob?.vacancy,
                area: editJob?.area,
                company_name: editJob?.company_name,
            });
            setIsEditMode(true);
        } else {
            setJob(initialState);
            setIsEditMode(false);
        }
    }, [editJob]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob({
            ...job,
            [name]: value
        });
    };

    const submitForm = async () => {
        try {
            if (isEditMode) {
                const res = await http.put(`/updateJob/${editJob.id}`, job);
                if (res?.status === 200) {
                    notify("success", "Job updated successfully");
                    onClose();
                    onJobAdded();
                } else {
                    notify("error", "Failed to update job");
                }
            } else {
                const res = await http.post('/addJob', job);
                if (res?.status === 201) {
                    notify("success", "Job added successfully");
                    onClose();
                    onJobAdded();
                } else {
                    notify("error", "Failed to add job");
                }
            }
        } catch (error) {
            notify("error", "Something went wrong: " + error.message);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                }}
            >
                <h2>Add Job</h2>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Enter the dept"
                    name="dept"
                    value={job.dept}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Enter the category"
                    name="category"
                    value={job.category}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Enter the Location"
                    name="area"
                    value={job.area}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Enter the Company Name"
                    name="company_name"
                    value={job.company_name}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Enter the vacancy"
                    name="vacancy"
                    type="number"
                    value={job.vacancy}
                    onChange={handleChange}
                />
                <Button variant="contained" color="primary" onClick={submitForm}>
                    Submit
                </Button>
            </Box>
        </Modal>
    );
};

export default AddJobModal;
