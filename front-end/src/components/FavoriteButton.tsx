import UpdateFavorite from "@/graphql/mutations/user/updateFavorites";
import { useMutation } from "@apollo/client";
import { Image } from "@mantine/core";
import { useEffect, useState } from "react";

interface FavoriteButtonProps {
  id: string;
  size: number;
  isFavorite: string[];
  onClick: (activityId: string) => void;
}

export function FavoriteButton({ id, size, isFavorite, onClick }: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  const [updateFavorite] = useMutation(UpdateFavorite);
  

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const handleClick = async () => {
    const result = await updateFavorite({ variables: { activityId: id.toString() } });
    const newFavorites = [... result.data.updateFavorite.favorites];
    setFavorite(newFavorites);
    console.log(`Favorites: ${result.data.updateFavorite.favorites}`);
  };

  return (
    <Image
      src={favorite?.map(String).includes(String(id)) ? "/images/fullStar.png" : "/images/emptyStar.png"}
      fit="contain"
      height={size}
      width={size}
      alt="favorite"
      style={{
        position: "absolute",
        top: 10,
        right: 10,
      }}
      onClick={onClick || handleClick}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    />
  );
}
