import { AppBar, Container, Toolbar, Typography, Button, Link, Box } from '@mui/material'
import { SignIn } from '@clerk/nextjs'
export default function SignInPage() {
    return <Container maxWidth="100vw">
        <AppBar position="static" sx={{backgroundColor: '#3f51b5'}}>
            <Toolbar>
                <Typography variant="h6"sx={{flexGrow:1}}>
                    Flashcard SaaS
                </Typography>
                <Link color="#FFFFFF" href='/sign-in' passHref>
                    <Button color="inherit">
                        Sign In
                    </Button>
                </Link>
                <Link color="#FFFFFF" href='/sign-up' passHref>
                    <Button color="inherit">
                        Sign Up
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"> 
            <Typography variant="h4" sx={{fontWeight: 'italics', mt:"15px",}}>Sign In</Typography></Box>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
    <SignIn/>
    </Box>
    </Container>

}