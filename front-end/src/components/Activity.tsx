import { ActivityFragment } from "@/graphql/generated/types";
import { useGlobalStyles } from "@/utils";
import { Badge, Button, Card, Grid, Group, Image, Text, Box } from "@mantine/core";
import Link from "next/link";
import { FavoriteButton } from "./FavoriteButton";
import { CreationDate } from "./CreationDate";
import { useAuth } from "@/hooks/useAuth";

interface ActivityProps {
  activity: ActivityFragment;
  onFavoriteClick: (activityId: string) => void;
}

export function Activity({ activity , onFavoriteClick}: ActivityProps) {
  const { classes } = useGlobalStyles();
  const { user } = useAuth();

  return (
    <Grid.Col span={4}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Box sx={{ position: "relative" }}>
            <Image
              src="https://dummyimage.com/480x4:3"
              height={160}
              alt="random image of city"
              style={{ display: "block" }}
            />
            {user &&
              <FavoriteButton id={activity.id} size={40} isFavorite={user.favorites} onClick={onFavoriteClick} />
            }
          </Box>
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500} className={classes.ellipsis}>
            {activity.name}
          </Text>
        </Group>

        <Group mt="md" mb="xs">
          <Badge color="pink" variant="light">
            {activity.city}
          </Badge>
          <Badge color="yellow" variant="light">
            {`${activity.price}€/j`}
          </Badge>
        </Group>

        <Text size="sm" color="dimmed" className={classes.ellipsis}>
          {activity.description}
        </Text>
        <CreationDate createdAt={activity.createdAt}/>

        <Link href={`/activities/${activity.id}`} className={classes.link}>
          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Voir plus
          </Button>
        </Link>
      </Card>
    </Grid.Col>
  );
}
