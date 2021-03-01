import React from 'react';
import { Pintrest, LinkedIn, Facebook, Twitter } from './icons';
import { Outer, Btn } from './styles';

export default function SocialBar() {
  return (
    <Outer>
      <Btn>
        <Facebook />
      </Btn>
    </Outer>
  );
}