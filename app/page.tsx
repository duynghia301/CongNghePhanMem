import React from 'react';
import { Metadata } from 'next';
import Housess from './(site)/home/page'; // Adjust the import path if necessary
import Navbar from './components/navbar/Navbar';

export const metadata: Metadata = {
  title: "Trang chủ | Fast Home",
  description: "Đồ Án Group 6",
};

export default function Home({ searchParams }: { searchParams: Record<string, string> }) {
  return (
    <div>
      <div className="header">
      <Navbar/> 
        <Housess searchParams={searchParams} />
   
      </div>
    </div>
  );
}
