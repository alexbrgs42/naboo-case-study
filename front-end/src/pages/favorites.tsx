import { withAuth } from "@/hocs";
import Head from "next/head";
import { PageTitle } from "@/components";
import { Group } from "@mantine/core";

const Favorites = () => {
  return (
    <>
      <Head>
          <title>Mes favoris | CDTR</title>
      </Head>
      <Group position="apart">
          <PageTitle title="Mes favoris" />
      </Group>
    </>
  );
};

export default withAuth(Favorites);
