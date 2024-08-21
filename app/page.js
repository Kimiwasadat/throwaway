
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import {SignedIn, SignedOut, UserButton} from '@clerk/nextjs'
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid, Link} from '@mui/material'

import Head from "next/head";

export default function Home() {
    return(
      <Container maxWidth="100vw">
        <Head>
          <title>Flshcard SaaS</title>
          <meta name="description" content="Create Flashcard From your text" />
          </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>Flashcard Saas</Typography>
          <SignedOut>
          <Link color="#FFFFFF" href='/sign-in' passHref> 
            <Button color="inherit">Login
                    </Button></Link>
                    <Link color="#FFFFFF" href='/sign-up' passHref>         
            <Button color="inherit">
            Sign Up</Button>
          </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box sx = {{textAlign: 'center', my: 4}}>
        <Typography variant="h1">Welcome to Flashcard SaaS</Typography>
        <Typography variant="h5">{' '}
         The easiest way to create Flashcard From your text
          </Typography>
        <Button variant="contained" color="primary" sx= {{marginTop: 2}}>Get Started</Button>
      </Box>
      <Box sx={{my: 6}}>
        <Typography variant="h4" align="left" gutterBottom>Features</Typography>
        <Grid container spacing={4} justifyContent="flex-start">
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Easy Text Input</Typography>
            <Typography variant="body1">
              You can easily input your text and create flashcards from it
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Smart Flashcards</Typography>
            <Typography variant="body1">
              Our AI-powered system creates intelligent and effective flashcards
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Better Flashcards</Typography>
            <Typography variant="body1">
              We&apos;re like Quizlet but with advanced features and a modern approach
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{my:6}}>
        <Typography variant="h4" align="center" gutterBottom>Pricing</Typography>
        <Grid container spacing={4} justifyContent="flex-start">
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor:'gray.300',
              borderRadius: 2,
              textAlign: 'center',
            }}>
              <Typography variant="h5">Basic Plan</Typography>
              <Typography variant="h6" gutterBottom sx={{fontWeight: 'italics'}}>Free</Typography>
              <Typography variant="body1">
                Perfect for beginners. Gives access to basic flashcard creation.
              </Typography>
              <Button variant="contained" color="primary" sx= {{marginTop: 2}}>Go Basic</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor:'gray.300',
              borderRadius: 2,
              textAlign: 'center',
            }}>
              <Typography variant="h5">Pro Plan</Typography>
              <Typography variant="h6" sx={{fontWeight: 'italics'}}>$10/month</Typography>
              <Typography variant="body1">
                For serious learners. Gives access to all flashcard creation.
              </Typography>
              <Button variant="contained" color="primary" sx= {{marginTop: 2}}>Go Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      </Container>
    ) 
}
