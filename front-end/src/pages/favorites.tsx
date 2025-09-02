import { withAuth } from "@/hocs";
import Head from "next/head";
import { Activity, EmptyData, PageTitle } from "@/components";
import { Grid, Group } from "@mantine/core";
import { useQuery, useMutation } from "@apollo/client";
import GetFavorites from "@/graphql/queries/auth/getFavorites";
import UpdateFavorite from "@/graphql/mutations/user/updateFavorites";
import ReorderFavorites from "@/graphql/mutations/user/reorderFavorites";
import { Reorder, useDragControls } from "framer-motion";
import { useState, useEffect } from "react";
import { IconGripVertical } from "@tabler/icons-react";

const Favorites = () => {

  const controls = useDragControls();

  const [items, setItems] = useState([]);

  const { data, loading, error, refetch } = useQuery(GetFavorites, {
    fetchPolicy: "network-only",
  });

  const [updateFavorite] = useMutation(UpdateFavorite, {
    onCompleted: () => {
      refetch();
    },
  });

  const [reorderFavorites] = useMutation(ReorderFavorites, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleFavoriteClick = (activityId: string) => {
    updateFavorite({ variables: { activityId } });
  };

  const handleReorder = (newOrder: string[]) => {
    setItems(newOrder);
    reorderFavorites({ variables: { favorites: newOrder.map((activity) => activity.id) } });
  };

  useEffect(() => {
    if (data?.getFavorites) {
      setItems(data.getFavorites);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Mes favoris | CDTR</title>
      </Head>
      <Group position="apart">
        <PageTitle title="Mes favoris" />
      </Group>
      <Grid>
        <Reorder.Group values={items} onReorder={handleReorder}>
          {items.length > 0 ? (
            items.map((activity) => (
              <Reorder.Item
              style={{width: "100%"}}
                key={activity.id}
                value={activity}
                dragListener={true}
                dragControls={controls}
                as="div"
                className="reorder-handle"
                onPointerDown={(e) => controls.start(e)}
              >
              <Activity
                activity={activity}
                key={activity.id}
                onFavoriteClick={() => handleFavoriteClick(activity.id)}
              />
              </Reorder.Item>
            ))
          ) : (
            <EmptyData />
          )}
        </Reorder.Group>
      </Grid>
    </>
  );
};

export default withAuth(Favorites);
