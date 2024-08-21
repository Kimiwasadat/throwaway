'use client'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Container, Box, Typography, TextField, Paper, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Card, CardContent, CardActionArea } from '@mui/material'
import { writeBatch, doc, collection, getDoc } from 'firebase/firestore'
import { useState } from 'react'
import OpenAI from 'openai'; // Import OpenAI module
import { db } from '@/firebase'

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        fetch('api/generate', {
            method: 'POST',
            body: text,
        })
        .then((res) => res.json())
        .then((data) => setFlashcards(data)) // Fixed: Changed '>' to '=>'
    }
    
        const handleCardClick = (id) => {
            setFlipped((prev) => ({
                ...prev,
                [id]: !prev[id],
            }))
        }
    
        const handleOpen = () => {
            setOpen(true)
        }
    
        const handleClose = () => {
            setOpen(false)
        }
    
        const saveFlashcards = async () => {
            if(!name){
                alert('Please enter a name for the flashcard set')
                return
            }
            const batch = writeBatch(db)
            const userDocRef = doc(collection(db, 'users'),user.id)
            const docSnap = await getDoc(userDocRef)

            if (docSnap.exists()){
                const collections= docSnap.data().flashcards || []
                if (collections.find((f) => f.name === name)){
                    alert('A flashcard set with this name already exists')
                    return
    
                }else {
                    collections.push({name})
                    batch.set(userDocRef, {flashcards: collections}, {merge: true})
                }
            }
            else {
                batch.set(userDocRef, {flashcards: [{name}]})
            }
            const colRef = collection(userDocRef, name)
            flashcards.forEach((flashcard) => {
                const cardDocRef = doc(colRef)
                batch.set(cardDocRef, flashcard)
            })
            await batch.commit()
            handleClose()
            router.push('/flashcards')
        }
        return (
        <Container maxWidth='md'>
            <Box sx={{
                mt:4, mv:0, display:'flex', flexDirection:'column', alignItems:'center' 
            }}>
                <Typography variant='h4' component='h1'>
                    Generate Flashcards
                </Typography>
                <Paper sx={{p:4, width:'100%'}}>
                    <TextField value = {text} onChange = {(e) => setText(e.target.value)} fullWidth multiline rows={4} variant = "outlined"label='Enter text to generate flashcards' sx={{mb:2}}/>
                    <Button onClick={handleSubmit} variant='contained' color='primary' fullWidth> submit</Button>
                </Paper>
            </Box>
            {flashcards.length > 0 &&  <Box sx={{mt:4}}>
        <Typography variant="h4" sx={{fontWeight: 'italics', mt:"15px",}}>Flashcards Preview</Typography>
        <Grid container spacing={3}>
            {flashcards.map((flashcard,index)=>(
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card><CardActionArea onClick= {()=> {handleCardClick(index)}}> {/* Fixed: Changed 'onclick' to 'onClick' */}
                        <CardContent>
                            <Box sx={{ 
                                perspective: '1000px', 
                                '& > div':{
                                    transition: 'transform 0.7s',
                                    transformStyle: 'preserve-3d',
                                    position: 'relative',
                                    width: '100%',
                                    height:'200px',
                                    boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                                    transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)'},
                                '& > div > div:nth-of-type(2)':{ 
                                    transform: 'rotateY(180deg)'
                                },
                                '& > div > div':{
                                    transition: 'transform 0.7s',
                                    transformStyle: 'preserve-3d',
                                    position: 'absolute',
                                    width: '100%',
                                    height:'100%',
                                    backfaceVisibility: 'hidden',
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    padding:2,
                                    boxSizing:'border-box',
                                }
                                }}>
                                <div> 
                                    <div> 
                                        <Typography variant="h5" component="div">{flashcard.front}</Typography>
                                    </div>
                                    <div> 
                                        <Typography variant="h5" component="div">{flashcard.back}</Typography>
                                    </div>
                                </div>
                            </Box>
                        </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </Box>} {/* Fixed: Moved closing tag to the correct position */}
    <Box  sx={{mt:4, display:'flex', justifyContent:'center'}}>
        <Button variant="contained" color="secondary" onClick={handleOpen}>
            Save
        </Button>
    </Box>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Flashcards</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please enter a name for your flashcard deck
            </DialogContentText>
            <TextField autoFocus margin="dense" id="name" label="Collection Name" type ='text' value = {name} onChange={(e)=>setName(e.target.value)} 
            fullWidth
            variant="outlined"/>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={saveFlashcards}>Save</Button> {/* Fixed: Changed 'handleSave' to 'saveFlashcards' */}
        </DialogActions>
    </Dialog>    
        </Container>
        )
    }