import { Box, Stack, TextField, Typography, Button } from '@mui/material';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollBar from './HorizontalScrollBar';
import React, {useEffect, useState} from 'react';



const SearchExercises = () => {

  const [search, setSearch] = useState('');
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() =>{
    const fetchExerciseData = async () =>{
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions)

      setBodyParts(['all', ...bodyPartsData]);
    }

    fetchExerciseData(); 

  },[])

  const handleSearch =async () =>{
    if(search){
      const exerciseDate = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions)
      
      const searchedExercises = exerciseDate.filter(
        (exercise) => exercise.name.toLowerCase().includes(search)
        || exercise.target.toLowerCase().includes(search)
        || exercise.equipment.toLowerCase().includes(search)
        || exercise.bodyPart.toLowerCase().includes(search))

        setSearch('')
        setExercises(searchedExercises)
    }
  }

  return (
    <Stack alignItems='center' mt='37px' justifyContent='center' p='20px'>
      <Typography fontWeight='700' sx={{fontSize:{lg: '44px', xs: '30px'}}} mb='50px' textAlign='center'>
        Awesome exercises you <br/> should know
      </Typography>
      <Box position='relative' mb='72px'
        sx={{
          display: 'flex', justifyContent: 'flex-end'
        }}
      >
        <TextField
          sx={{ 
            input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, 
            width: { lg: '1170px', xs: '350px' }, 
            backgroundColor: '#fff', borderRadius: '40px' }}
            
            height='76px'
            value={search}
            onChange={(e) =>setsearch(e.target.value.toLowerCase())}
            placeholder='Search Exercises'
            type='text'
        />
        <Button className='search-btn'
          sx={{
            bgcolor: '#FF2625',
            color: '#FFF',
            textTransform: 'none',
            width: {lg: '100px', xs: '80px'},
            fontFamily: {lg : '20px', xs: '14px'},
            height: '56px',
            position: 'absolute',
            right: '0'
          }}

          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box
        sx={{position: 'relative', width: '100%', p:'20px'}}
      >
        <HorizontalScrollBar data={bodyParts}/>

      </Box>

    </Stack>
  )
}

export default SearchExercises