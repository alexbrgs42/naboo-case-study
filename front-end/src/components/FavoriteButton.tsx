import { Image } from "@mantine/core";
import { useState } from "react";

interface FavoriteButtonProps {
  id: string;
  size: number;
  isFavorite: boolean;
}

export function FavoriteButton({ id, size, isFavorite }: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleClick = () => {
    setFavorite(!favorite);
  };

  return (
    <Image
      src={favorite ? "/images/fullStar.png" : "/images/emptyStar.png"}
      fit="contain"
      height={size}
      width={size}
      alt="favorite"
      style={{
        position: "absolute",
        top: 10,
        right: 10,
      }}
      onClick={handleClick}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    />
  );
}
