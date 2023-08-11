'use client';
import Image from 'next/image';
import React from 'react';

type Props = {};

function HeaderNav({}: Props) {
  return (
    <header className="relative flex items-center justify-center p-3 sm:px-0">
      <h1 className="font-bold text-lg">Books</h1>
    </header>
  );
}

export default HeaderNav;
