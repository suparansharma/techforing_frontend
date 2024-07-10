import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, CircularProgress } from '@mui/material';
import AuthUser from '../AuthUser';

const ViewJobModal = ({ open, onClose, jobId }) => {
    const { http } = AuthUser();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (jobId) {
            fetchJobInfo();
        }
    }, [jobId]);

    const fetchJobInfo = async () => {
        try {
            const response = await http.get(`/job/${jobId}`);
            setJob(response.data.job);
        } catch (error) {
            console.error('Failed to fetch job info', error);
        } finally {
            setLoading(false);
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
                    borderRadius: 2,
                }}
            >
                {loading ? (
                    <CircularProgress />
                ) : (
                    job && (
                        <>
                            <Typography variant="h6" component="h2">
                                Job Info
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                <strong>Department:</strong> {job.dept}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                <strong>Category:</strong> {job.category}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                <strong>Vacancy:</strong> {job.vacancy}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                <strong>Location:</strong> {job.area}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                <strong>Company:</strong> {job.company_name}
                            </Typography>
                        </>
                    )
                )}
            </Box>
        </Modal>
    );
};

export default ViewJobModal;
