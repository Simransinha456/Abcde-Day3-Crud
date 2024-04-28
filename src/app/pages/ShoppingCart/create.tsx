import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from './Navbar/navbar';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const supabaseUrl = 'https://bqqnvlfkizbqxhgzhlij.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxcW52bGZraXpicXhoZ3pobGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwMTkzMjEsImV4cCI6MjAyOTU5NTMyMX0.QPUDZt2fQwZOt8cjQqd-6UTBPFu2gEfVHoNB5weFl20';
export const supabase = createClient(supabaseUrl, supabaseKey);

const Create: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Insert data into supabase
    const { data, error } = await supabase
      .from('shoppingcart')
      .insert([{ name, image: imageUrl }]);

    if (error) {
      console.error('Error inserting:', error);
    } else {
      console.log('Inserted:', data);
      navigate('/home');
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <h1 style={{ textAlign: 'center' }}>Create item</h1>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& .MuiTextField-root': { m: 1, width: '40ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="filled-search"
            label="Item name"
            type="search"
            variant="filled"
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <TextField
            id="filled-search"
            label="image-url"
            type="search"
            variant="filled"
            value={imageUrl}
            onChange={event => setImageUrl(event.target.value)}
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Create;
