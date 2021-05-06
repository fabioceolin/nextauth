import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/apiClient";
import { setupAPIClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";
import { useCan } from "../hooks/useCan";
import { Can } from "../components/Can";

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  const userCanSeeMetrics = useCan({ permissions: ['metrics.list']});

  useEffect(() => {
    api.get("me").then((response) => console.log(response));
  }, []);

  return (
    <>
    <h1>Dashboard: {user?.email}</h1>

    { userCanSeeMetrics && <div>Métricas</div>}
    <Can permissions={['users.list']}>
      <div>Users</div>
    </Can>

    <button onClick={signOut}>Sign out</button>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("me");

  console.log(response);

  return {
    props: {},
  };
});
