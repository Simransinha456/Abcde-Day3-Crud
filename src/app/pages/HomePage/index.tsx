import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import React from 'react';

const supabaseUrl = 'https://bqqnvlfkizbqxhgzhlij.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxcW52bGZraXpicXhoZ3pobGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwMTkzMjEsImV4cCI6MjAyOTU5NTMyMX0.QPUDZt2fQwZOt8cjQqd-6UTBPFu2gEfVHoNB5weFl20';

export const supabase = createClient(supabaseUrl, supabaseKey);

function Supabase() {
  const [countries, setCountries] = useState([]);

  async function getCountries() {
    const { data, error } = await supabase.from('countries').select();
    if (error) {
      console.error('Error fetching countries: ', error);
      return;
    }
    if (data) {
      setCountries(data as never[]);
      // console.log(countries,"fghjk")
    }
  }
  useEffect(() => {
    getCountries();
  }, []);

  return (
    <ul>
      {countries.length > 0 ? (
        countries.map((country: { name: string }) => (
          <li key={country.name}>{country.name}</li>
        ))
      ) : (
        <li>Loading countries...</li>
      )}
    </ul>
  );
}

export default Supabase;
