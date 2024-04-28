import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Navbar from '../ShoppingCart/Navbar/navbar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createClient } from '@supabase/supabase-js';
// import React from "react";

const supabaseUrl = 'https://bqqnvlfkizbqxhgzhlij.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxcW52bGZraXpicXhoZ3pobGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwMTkzMjEsImV4cCI6MjAyOTU5NTMyMX0.QPUDZt2fQwZOt8cjQqd-6UTBPFu2gEfVHoNB5weFl20';
export const supabase = createClient(supabaseUrl, supabaseKey);

interface HomeProps {
  getShopping: () => void;
  shopping: any[];
}

const Home: React.FC<HomeProps> = ({ getShopping, shopping }) => {
  const [items, setItems] = React.useState(shopping);

  React.useEffect(() => {
    getShopping();
    setItems(shopping);
  }, [getShopping, shopping]);

  //delete the items from home page
  const handleDelete = async (itemName: string) => {
    const { data, error } = await supabase
      .from('shoppingcart')
      .delete()
      .eq('name', itemName);

    if (error) {
      console.error('Error deleting:', error);
    } else {
      console.log('Deleted:', data);
      setItems(items.filter(item => item.name !== itemName));
    }
  };
  return (
    <>
      <Navbar />
      <Grid
        container
        spacing={-1}
        sx={{ paddingLeft: 8, rowGap: '20px' }}
        textAlign="center"
      >
        {shopping.map((item, index) => (
          <Grid item xs={10} sm={4} key={index}>
            <Card sx={{ maxWidth: 345, backgroundColor: '#EEF5FF' }}>
              <Typography variant="h6" component="div">
                <p>{item.name}</p>
              </Typography>
              <CardMedia
                component="img"
                height="400"
                image={item.image}
                alt="img"
              />
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <Button variant="contained">Add to cart</Button>
                  <Button
                    variant="contained"
                    onClick={() => handleDelete(item.name)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
