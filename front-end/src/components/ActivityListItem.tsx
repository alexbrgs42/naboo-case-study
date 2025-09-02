import { ActivityFragment } from "@/graphql/generated/types";
import { useGlobalStyles } from "@/utils";
import { Box, Button, Flex, Image, Text } from "@mantine/core";
import Link from "next/link";
import { FavoriteButton } from "./FavoriteButton";
import { CreationDate } from "./CreationDate";
import { useAuth } from "@/hooks/useAuth";

interface ActivityListItemProps {
  activity: ActivityFragment;
}

export function ActivityListItem({ activity }: ActivityListItemProps) {
  const { classes } = useGlobalStyles();
  const { user } = useAuth();

  return (
    <Flex align="center" justify="space-between">
      <Flex gap="md" align="center">
        <Box sx={{ position: "relative" }}>
          <Image
            src="https://dummyimage.com/125"
            radius="md"
            alt="random image of city"
            height="125"
            width="125"
            style={{ display: "block" }}
          />
            {user &&
              <FavoriteButton id={activity.id} size={37} isFavorite={user.favorites} />
            }
        </Box>
        <Box sx={{ maxWidth: "300px" }}>
          <Text className={classes.ellipsis}>{activity.city}</Text>
          <Text className={classes.ellipsis}>{activity.name}</Text>
          <Text className={classes.ellipsis}>{activity.description}</Text>
          <Text
            weight="bold"
            className={classes.ellipsis}
          >{`${activity.price}€/j`}</Text>
          <CreationDate createdAt={activity.createdAt} />
        </Box>
      </Flex>
      <Link href={`/activities/${activity.id}`} className={classes.link}>
        <Button variant="outline" color="dark">
          Voir plus
        </Button>
      </Link>
    </Flex>
  );
}
