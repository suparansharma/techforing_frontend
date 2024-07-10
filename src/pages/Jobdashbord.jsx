import React, { useState, useEffect } from "react";
import AuthUser from "../components/AuthUser";
import { Card, CardContent, Typography, Grid, CircularProgress, Box, TextField } from "@mui/material";

const JobDashboard = () => {
  const { http } = AuthUser();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await http.get('/showAlljobs');
      setJobs(response?.data);
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredJobs = jobs.filter((job) =>
    job.dept.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Typography variant="h4" gutterBottom component="div" sx={{ marginBottom: 3 }}>
        Active Jobs: {jobs?.length}
      </Typography>
     


      <TextField
        label="Search by Department"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ marginBottom: 3 }}
      />
      

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredJobs.map((job, index) => (
            <Grid item key={job.id} xs={12} sm={4}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Department: {job.dept}
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body1" color="textSecondary">
                        Category: {job.category}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" color="textSecondary">
                        Vacancy: {job.vacancy}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" color="textSecondary">
                        Company: {job.company_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" color="textSecondary">
                        Location: {job.area}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default JobDashboard;
