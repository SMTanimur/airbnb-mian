'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { IUser } from '../types';
import useFavorite from '../hooks/useFavorite';

interface HeartButtonProps {
  listingId: string;
  currentUser?: IUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className='
        relative
        hover:opacity-80
        transition
        cursor-pointer
    '
    >
      <AiOutlineHeart
        size={28}
        className='
            fill-white
            absolute
            -top-[2px]
            -right-[2px]
        '
      />
      <AiFillHeart
        size={25}
        className={
          hasFavorited
            ? 'fill-rose-500 -top-[2px] -right-[2px]'
            : 'fill-neutral-500/70 -top-[2px] -right-[2px]'
        }
      />
    </div>
  );
};

export default HeartButton;
