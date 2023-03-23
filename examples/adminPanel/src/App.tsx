import {
  Stack,
  Table,
  Text,
  Title,
  useComponentState,
  TableState,
  Card,
  Button,
} from "@airplane/views";
import { XMarkIconMini } from "@airplane/views/icons";

import {
  ListTeamsOutputs,
  ListTeamsParams,
  ListUsersOutputs,
  ListUsersParams,
} from "./types";

const AdminPanelApp = () => {
  const teamsTableState = useComponentState<TableState<ListTeamsOutputs>>();
  const selectedTeamID = teamsTableState.selectedRow?.id;
  const usersTableState = useComponentState<TableState<ListUsersOutputs>>();
  const selectedUsers = usersTableState.selectedRows;

  return (
    <>
      <Title>Admin Panel</Title>
      <Text>Manage our teams and users</Text>
      <Stack direction="column" spacing="xl">
        <Table<ListTeamsOutputs, ListTeamsParams, ListTeamsOutputs[]>
          id={teamsTableState.id}
          title="Teams"
          task="list_teams"
          columns={[
            { accessor: "signup_date", label: "Signup date", type: "datetime" },
            { accessor: "company_name", label: "Company name", canEdit: true },
            {
              accessor: "is_suspended",
              canEdit: true,
              type: "boolean",
              label: "Suspended",
            },
            {
              accessor: "country",
              label: "Country",
              canEdit: true,
              type: "select",
              typeOptions: {
                selectData: [
                  "Brazil",
                  "Canada",
                  "USA",
                  "Mexico",
                  "France",
                  "India",
                ],
              },
            },
          ]}
          rowSelection="single"
          rowActions={{ slug: "update_team", confirm: true }}
          noData="No teams"
        />

        {selectedTeamID !== undefined && (
          <Table<ListUsersOutputs, ListUsersParams, ListUsersOutputs[]>
            id={usersTableState.id}
            title="Users"
            task={{
              slug: "list_team_users",
              params: { account_id: selectedTeamID },
            }}
            rowSelection="checkbox"
          />
        )}
        {selectedUsers.map((user) => (
          <Card key={user.id}>
            <Text>{`His name was ${user.name}`}</Text>
          </Card>
        ))}

        {!!selectedUsers.length && (
          <Button
            onClick={() => usersTableState.clearSelection()}
            confirm={{
              title: "Clear selected users",
              body: <Text>Are you sure you want to clear users?</Text>,
              confirmText: "Clear the users",
            }}
            leftIcon={<XMarkIconMini />}
          >
            Clear users
          </Button>
        )}
      </Stack>
    </>
  );
};

export default AdminPanelApp;
