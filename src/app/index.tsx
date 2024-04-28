/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';
import { useTranslation } from 'react-i18next';
import Create from './pages/ShoppingCart/create';
import { ShoppingCart } from './pages/ShoppingCart';
import Home from './pages/ShoppingCart/home';
import Signin from './pages/HomePage/Signin';
import AddToCart from './pages/ShoppingCart/add_to_cart';
import Signup from './pages/HomePage/Signup';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bqqnvlfkizbqxhgzhlij.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxcW52bGZraXpicXhoZ3pobGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwMTkzMjEsImV4cCI6MjAyOTU5NTMyMX0.QPUDZt2fQwZOt8cjQqd-6UTBPFu2gEfVHoNB5weFl20';
export const supabase = createClient(supabaseUrl, supabaseKey);

export function App() {
  const { i18n } = useTranslation();
  const [shopping, setShopping] = useState([]);

  async function getShopping() {
    const { data, error } = await supabase.from('shoppingcart').select();
    // console.log(data)
    if (error) {
      console.error('Error fetching shopping data: ', error);
      return;
    }
    if (data) {
      // console.log(data)
      setShopping(data as never[]);
      // console.log(shopping,"fghjk")
    }
  }
  useEffect(() => {
    getShopping();
  }, []);

  useEffect(() => {
    // console.log(shopping,"all items");
  }, [shopping]);

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/shopping_cart" element={<ShoppingCart />} />
        <Route
          path="/home"
          element={<Home getShopping={getShopping} shopping={shopping} />}
        />
        <Route path="/create-item" element={<Create />} />
        <Route path="/shopping" element={<Create />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add_to_cart" element={<AddToCart />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
