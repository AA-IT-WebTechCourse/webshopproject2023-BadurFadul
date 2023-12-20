import React from 'react'
import {
    Box,
    IconButton,
    Typography
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box sx={{marginTop:"70px", padding:"40px 0", backgroundColor:"lightgray"}} >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
          >
            E-Commerce
          </Typography>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </div>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Me
          </Typography>
          <IconButton aria-label="github" component="a" href="https://github.com/BadurFadul" target='_blank'>
                <GitHubIcon fontSize='large'/>
            </IconButton>
            
            <IconButton aria-label="email" component="a" href="mailto:badoryousif.by@gmail.com" target='_blank'>
                <EmailIcon fontSize='large' />
            </IconButton>
            <IconButton aria-label="linkedin" component="a" href="https://www.linkedin.com/in/badreldin-fadul-821bb512b/" target='_blank'>
                <LinkedInIcon  fontSize='large'/>
            </IconButton>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="30px">Help Center</Typography>
          <Typography mb="30px">Track Your Order</Typography>
          <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
          <Typography mb="30px">Returns & Refunds</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer